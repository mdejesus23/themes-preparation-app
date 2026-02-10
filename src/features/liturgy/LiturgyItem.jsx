import { useParams, useNavigate } from 'react-router-dom';
import { useLiturgyItem } from './useLiturgyItem';
import Loader from '../../ui/Loader';
import { HiArrowSmallLeft } from 'react-icons/hi2';

function LiturgyItem() {
  const { liturgyId } = useParams();
  const navigate = useNavigate();
  const { isPending, data, error } = useLiturgyItem(liturgyId);

  if (isPending) return <Loader />;
  if (error) {
    console.error('Error fetching liturgy item:', error);
    return <p className="text-red-500">Failed to load reading.</p>;
  }

  const reading = data?.data;

  if (!reading) {
    return <p className="text-textSecondary">Reading not found.</p>;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 rounded-lg border border-borderColor bg-bgPrimary px-3 py-2 text-sm text-textPrimary transition-colors hover:bg-borderColor active:scale-95"
        >
          <HiArrowSmallLeft size={18} />
          Back
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-textPrimary">
            {reading.title}
          </h1>
          <span className="text-sm text-textSecondary">
            {reading.season} &mdash; Week {reading.week}, {reading.day}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-lg border border-borderColor bg-bgSecondary shadow-sm">
        <div
          className="reading-content px-4 py-6 md:px-8"
          dangerouslySetInnerHTML={{ __html: reading.htmlContent }}
        />
      </div>
    </div>
  );
}

export default LiturgyItem;
