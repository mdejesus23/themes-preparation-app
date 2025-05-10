import { formatDate } from '../../utils/formatDate';
import AdminCatogirzeReadings from './AdminCategorizeReading';
import { useState } from 'react';
import CategoryMenu from '../../ui/CategoryMenu';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import AddReadingForm from './AddReadingForm';
import { useAdminThemesWithReadings } from './useAdminThemesWithReadings';
import Loader from '../../ui/Loader';
import { useParams } from 'react-router-dom';

function AdminThemeWithReadings() {
  const { themeId } = useParams();
  const { isPending, data, error } = useAdminThemesWithReadings(themeId);
  const [isCategoryShow, setIsCategoryShow] = useState('all');

  if (isPending) return <Loader />;

  if (error) return <p>{error.message}</p>;

  const myThemesWithReadings = data?.data;

  let noReadingsElement;
  if (myThemesWithReadings.readings.length === 0) {
    noReadingsElement = (
      <h2 className="mt-10 font-semibold">No readings available</h2>
    );
  }

  const historical = myThemesWithReadings.readings.filter(
    (reading) => reading.category === 'Historical',
  );

  const prophetical = myThemesWithReadings.readings.filter(
    (reading) => reading.category === 'Prophetical',
  );

  const epistle = myThemesWithReadings.readings.filter(
    (reading) => reading.category === 'Epistle',
  );

  const gospel = myThemesWithReadings.readings.filter(
    (reading) => reading.category === 'Gospel',
  );

  const showAllReadings = isCategoryShow === 'all';
  const showHistoricalReadings = isCategoryShow === 'historical';
  const showPropheticalReadings = isCategoryShow === 'prophetical';
  const showEpistleReadings = isCategoryShow === 'epistle';
  const showGospelReadings = isCategoryShow === 'gospel';

  return (
    <div className="w-full">
      <h1 className="text-center font-headfont text-3xl font-bold md:text-4xl">
        {myThemesWithReadings.title}
      </h1>
      <p className="text-center text-xs text-grey">
        {formatDate(myThemesWithReadings.createdAt)}
      </p>
      <CategoryMenu setIsCategoryShow={setIsCategoryShow} />

      <div className="my-10 flex items-center justify-center">
        <Modal>
          <Modal.Open opens="add-reading-form">
            <Button design="secondary">Add reading</Button>
          </Modal.Open>

          <Modal.Window name="add-reading-form">
            <AddReadingForm myThemesWithReadings={myThemesWithReadings} />
          </Modal.Window>
        </Modal>
      </div>

      {noReadingsElement ? (
        noReadingsElement
      ) : (
        <div className="my-11 grid w-full border-spacing-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {showAllReadings && (
            <>
              {' '}
              <AdminCatogirzeReadings
                themeId={myThemesWithReadings.themeId}
                readings={historical}
              />
              <AdminCatogirzeReadings
                themeId={myThemesWithReadings.themeId}
                readings={prophetical}
              />
              <AdminCatogirzeReadings
                themeId={myThemesWithReadings.themeId}
                readings={epistle}
              />
              <AdminCatogirzeReadings
                themeId={myThemesWithReadings.themeId}
                readings={gospel}
              />
            </>
          )}

          {showHistoricalReadings && (
            <AdminCatogirzeReadings
              themeId={myThemesWithReadings.themeId}
              readings={historical}
            />
          )}
          {showPropheticalReadings && (
            <AdminCatogirzeReadings
              themeId={myThemesWithReadings.themeId}
              readings={prophetical}
            />
          )}
          {showEpistleReadings && (
            <AdminCatogirzeReadings
              themeId={myThemesWithReadings.themeId}
              readings={epistle}
            />
          )}
          {showGospelReadings && (
            <AdminCatogirzeReadings
              themeId={myThemesWithReadings.themeId}
              readings={gospel}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AdminThemeWithReadings;
