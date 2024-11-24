import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import { formatDate } from '../../utils/formatDate';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import ResultForm from './ResultForm';
import { useAdminResults } from './useAdminResults';
import Loader from '../../ui/Loader';

function Results() {
  const { isPending, data, error } = useAdminResults();

  if (isPending) return <Loader />;

  if (error) return <p>{error.message}</p>;

  const resultArray = data?.data || []; // Default to an empty array

  console.log('resultArray', resultArray);

  return (
    <ul className="my-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
      {resultArray.map((item) => {
        const { _id: id, title, createdAt } = item;
        return (
          <li
            key={id}
            className="flex transform cursor-pointer flex-col items-center gap-y-5 border border-lightGrey bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="mb-5 flex w-full justify-between">
              <div>
                <h2 className="font-headfont text-xl font-semibold">
                  {item.title}
                </h2>
                <p className="text-xs text-grey">
                  {formatDate(item.createdAt)}
                </p>
              </div>
              <Modal>
                <Menus>
                  <Menus.Toggle id={id} />

                  <Menus.List id={id}>
                    <Modal.Open opens="edit">
                      <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                    </Modal.Open>

                    <Modal.Open opens="delete">
                      <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                    </Modal.Open>
                  </Menus.List>

                  <Modal.Window name="delete">
                    <ConfirmDelete resourceName="Prep result" />
                  </Modal.Window>

                  <Modal.Window name="edit">
                    <ResultForm resultToEdit={item} />
                  </Modal.Window>
                </Menus>
              </Modal>
            </div>

            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Entrance Song:</p>
              <p>{item.entranceSong}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">First reading:</p>
              <p>{item.firstReading}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">First psalm:</p>
              <p>{item.firstPsalm}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Second reading:</p>
              <p>{item.secondReading}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Second psalm:</p>
              <p>{item.secondPsalm}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Third reading:</p>
              <p>{item.thirdReading}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Third psalm:</p>
              <p>{item.thirdPsalm}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Gospel:</p>
              <p>{item.gospel}</p>
            </div>
            <div className="flex w-full gap-x-2">
              <p className="font-headfont">Final song:</p>
              <p>{item.finalSong}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Results;
