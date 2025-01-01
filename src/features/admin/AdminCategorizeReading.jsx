import { HiTrash } from 'react-icons/hi2';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteReading } from './useDeleteReading';

function AdminCatogirzeReadings({ themeId, readings }) {
  const { isDeleting, deleteReading } = useDeleteReading(themeId);

  if (readings.length === 0) {
    return <p className="text-center">No readings available</p>;
  }

  return (
    <ul className="w-full">
      <h2 className="text-center font-headfont text-xl font-bold">
        {readings[0].category}
      </h2>
      {readings.map((reading) => (
        <li
          key={reading._id}
          className="mt-4 flex w-full items-center justify-between gap-x-1 rounded-xl border p-2"
        >
          <p className="font-bodyFont font-semibold">{reading.reading}</p>
          <div className="flex items-center gap-x-2">
            <Modal>
              <Modal.Open opens="delete-reading">
                <Button type="danger">
                  <HiTrash />
                </Button>
              </Modal.Open>

              <Modal.Window name="delete-reading">
                <ConfirmDelete
                  disabled={isDeleting}
                  resourceName="Reading"
                  onConfirm={() => deleteReading(reading._id)}
                />
              </Modal.Window>
            </Modal>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AdminCatogirzeReadings;
