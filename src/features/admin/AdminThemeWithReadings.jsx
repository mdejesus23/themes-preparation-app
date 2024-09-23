import { formatDate } from '../../utils/formatDate';

import ThemeWithReading from '../../data/themeWithReadings';
import AdminCatogirzeReadings from './AdminCategorizeReading';
import { useState } from 'react';
import CategoryMenu from '../../ui/CategoryMenu';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import AddReadingForm from './AddReadingForm';

const historical = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Historical',
);

const prophetical = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Prophetical',
);

const epistle = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Epistle',
);

const gospel = ThemeWithReading.readings.filter(
  (reading) => reading.category === 'Gospel',
);

function AdminThemeWithReadings() {
  const [isCategoryShow, setIsCategoryShow] = useState('all');

  const showAllReadings = isCategoryShow === 'all';
  const showHistoricalReadings = isCategoryShow === 'historical';
  const showPropheticalReadings = isCategoryShow === 'prophetical';
  const showEpistleReadings = isCategoryShow === 'epistle';
  const showGospelReadings = isCategoryShow === 'gospel';

  return (
    <div className="w-full">
      <h1 className="text-center font-headfont text-3xl font-bold md:text-4xl">
        {ThemeWithReading.title}
      </h1>
      <p className="text-center text-xs text-grey">
        {formatDate(ThemeWithReading.createdAt)}
      </p>
      <CategoryMenu setIsCategoryShow={setIsCategoryShow} />

      <div className="flex items-center justify-center">
        <Modal>
          <Modal.Open opens="add-reading-form">
            <Button type="secondary">Add reading</Button>
          </Modal.Open>

          <Modal.Window name="add-reading-form">
            <AddReadingForm />
          </Modal.Window>
        </Modal>
      </div>

      <div className="my-11 grid w-full border-spacing-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {showAllReadings && (
          <>
            {' '}
            <AdminCatogirzeReadings readings={historical} />
            <AdminCatogirzeReadings readings={prophetical} />
            <AdminCatogirzeReadings readings={epistle} />
            <AdminCatogirzeReadings readings={gospel} />
          </>
        )}

        {showHistoricalReadings && (
          <AdminCatogirzeReadings readings={historical} />
        )}
        {showPropheticalReadings && (
          <AdminCatogirzeReadings readings={prophetical} />
        )}
        {showEpistleReadings && <AdminCatogirzeReadings readings={epistle} />}
        {showGospelReadings && <AdminCatogirzeReadings readings={gospel} />}
      </div>
    </div>
  );
}

export default AdminThemeWithReadings;
