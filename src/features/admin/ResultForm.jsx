import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import Button from '../../ui/Button';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateResult } from './useCreateResult';
import { useEditResult } from './useEditResult';

// source: where a new result gets its initial value from
// notes: the field's matching notes field in the result schema
const FIELDS = [
  { name: 'title', label: 'Title', source: 'title', notes: 'titleNotes' },
  { name: 'entranceSong', label: 'Entrance Song', source: 'draft', notes: 'entranceSongNotes' },
  { name: 'firstReading', label: 'First Reading', source: 'reading', notes: 'firstReadingNotes' },
  { name: 'firstPsalm', label: 'First Psalm', source: 'draft', notes: 'firstPsalmNotes' },
  { name: 'secondReading', label: 'Second Reading', source: 'reading', notes: 'secondReadingNotes' },
  { name: 'secondPsalm', label: 'Second Psalm', source: 'draft', notes: 'secondPsalmNotes' },
  { name: 'thirdReading', label: 'Third Reading', source: 'reading', notes: 'thirdReadingNotes' },
  { name: 'thirdPsalm', label: 'Third Psalm', source: 'draft', notes: 'thirdPsalmNotes' },
  { name: 'gospel', label: 'Gospel Reading', source: 'reading', notes: 'gospelNotes' },
  { name: 'finalSong', label: 'Final Song', source: 'draft', notes: 'finalNotes' },
];

// Fields that persist in the parent's draft while the modal is closed
const DRAFT_FIELDS = [
  ...FIELDS.filter((field) => field.source === 'draft').map(
    (field) => field.name,
  ),
  ...FIELDS.map((field) => field.notes),
];

function NotesField({ id, label, defaultOpen, disabled, register }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={id}
        className="text-xs font-medium text-textSecondary hover:text-textPrimary"
      >
        {isOpen ? '− Hide notes' : '+ Add notes'}
      </button>
      {isOpen && (
        <div className="mt-2">
          <Textarea
            disabled={disabled}
            id={id}
            name={id}
            rows={3}
            placeholder={`Notes for ${label.toLowerCase()}`}
            register={{ ...register(id) }}
          />
        </div>
      )}
    </div>
  );
}

function ResultForm({
  onCloseModal,
  title,
  finalReadings,
  resultToEdit = {},
  draftResult = {},
  onDraftChange,
}) {
  const { isCreating, createPrepResult } = useCreateResult();
  const { isEditing, editResult } = useEditResult();
  const isWorking = isCreating || isEditing;
  const navigate = useNavigate();

  const { _id: editId } = resultToEdit;
  const isEditSession = Boolean(editId);

  function getDefaultValue({ name, source }) {
    if (isEditSession) return resultToEdit[name] || '';
    if (source === 'title') return title || '';
    if (source === 'reading') return finalReadings?.[name] || '';
    return draftResult[name] || '';
  }

  const notesSource = isEditSession ? resultToEdit : draftResult;
  const defaultValues = Object.fromEntries(
    FIELDS.flatMap((field) => [
      [field.name, getDefaultValue(field)],
      [field.notes, notesSource[field.notes] || ''],
    ]),
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  // Watch specific fields that need to persist
  const watchedFields = useWatch({ control, name: DRAFT_FIELDS });

  // Sync draft fields back to parent when they change
  useEffect(() => {
    if (onDraftChange && !isEditSession) {
      onDraftChange(
        Object.fromEntries(
          DRAFT_FIELDS.map((name, i) => [name, watchedFields[i] || '']),
        ),
      );
    }
  }, [watchedFields, onDraftChange, isEditSession]);

  function onSubmit(data) {
    if (isEditSession) {
      editResult(
        { newResultData: data, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        },
      );
    } else {
      createPrepResult(data, {
        onSuccess: () => {
          onCloseModal?.();
          reset();
          navigate('/admin-results');
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="tertiary">
      {FIELDS.map(({ name, label, notes }) => (
        <FormRow
          key={name}
          name={name}
          label={label}
          error={errors?.[name]?.message}
        >
          <Input
            disabled={isWorking}
            type="text"
            id={name}
            name={name}
            placeholder={label}
            register={{
              ...register(name, {
                required: 'This field is required',
              }),
            }}
          />
          <NotesField
            id={notes}
            label={label}
            defaultOpen={Boolean(defaultValues[notes])}
            disabled={isWorking}
            register={register}
          />
        </FormRow>
      ))}
      <div>
        <Button type="submit" design="primary">
          Create Preparation Result
        </Button>
      </div>
    </Form>
  );
}

export default ResultForm;
