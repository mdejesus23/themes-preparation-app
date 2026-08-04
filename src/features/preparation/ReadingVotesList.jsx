import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { HiOutlineUsers, HiOutlineCheckCircle, HiOutlineStar } from 'react-icons/hi2';

import ReadingVoteItem from './ReadingVoteItem';
import Button from '../../ui/Button';
import CategoryMenu from '../../ui/CategoryMenu';
import Modal from '../../ui/Modal';
import ResultForm from '../admin/ResultForm';
import SongsModal from '../song/SongsModal';
import useThemeStore from '../../store/themeStore';

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-borderColor bg-bgPrimary p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sidebarActive text-sidebarActiveText">
        {icon}
      </span>
      <div>
        <p className="text-lg font-bold text-textPrimary">{value}</p>
        <p className="text-xs text-textSecondary">{label}</p>
      </div>
    </div>
  );
}

function ReadingVotesList({ themeWithReadingsVotes }) {
  const [isCategoryShow, setIsCategoryShow] = useState('all');
  const [firstReading, setFirstReading] = useState(null);
  const [secondReading, setSecondReading] = useState(null);
  const [thirdReading, setThirdReading] = useState(null);
  const [gospel, setGospel] = useState(null);

  const [draftResult, setDraftResult] = useState({
    entranceSong: '',
    firstPsalm: '',
    secondPsalm: '',
    thirdPsalm: '',
    finalSong: '',
  });

  const finalReadings = { firstReading, secondReading, thirdReading, gospel };
  const selectedCount = Object.values(finalReadings).filter(Boolean).length;

  const readings = themeWithReadingsVotes.readings;
  const storeReadings = useThemeStore((s) => s.themeWithReadings.readings);

  // Live max vote count for scaling the vote bars.
  const maxVotes = Math.max(
    1,
    ...readings.map((r) => {
      const extra =
        storeReadings.find((s) => s._id === r._id)?.additionalVotes || 0;
      return (r.voteCount || 0) + extra;
    }),
  );

  const filtered =
    isCategoryShow === 'all'
      ? readings
      : readings.filter((r) => r.category.toLowerCase() === isCategoryShow);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-headfont text-2xl font-bold text-textPrimary md:text-3xl">
          Reading Votes
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          {themeWithReadingsVotes.title} &middot;{' '}
          {formatDate(themeWithReadingsVotes.createdAt)}
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 sm:gap-4">
        <StatCard
          icon={<HiOutlineUsers size={20} />}
          label="Total Members"
          value={23}
        />
        <StatCard
          icon={<HiOutlineCheckCircle size={20} />}
          label="Voted"
          value={16}
        />
        <StatCard
          icon={<HiOutlineStar size={20} />}
          label="Selected"
          value={`${selectedCount}/4`}
        />
      </div>

      {/* Tabs */}
      <CategoryMenu
        setIsCategoryShow={setIsCategoryShow}
        active={isCategoryShow}
      />

      {/* Mobile: stacked cards */}
      <div className="mt-5 sm:hidden">
        {filtered.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {filtered.map((reading) => (
              <ReadingVoteItem
                key={reading._id || reading.id}
                reading={reading}
                maxVotes={maxVotes}
                finalReadings={finalReadings}
                setFirstReading={setFirstReading}
                setSecondReading={setSecondReading}
                setThirdReading={setThirdReading}
                setGospel={setGospel}
                variant="card"
              />
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-borderColor bg-bgPrimary py-10 text-center text-textSecondary">
            No readings in this category.
          </p>
        )}
      </div>

      {/* Desktop: votes table */}
      <div className="mt-5 hidden overflow-hidden rounded-2xl border border-borderColor bg-bgPrimary shadow-sm sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-borderColor bg-bgSecondary text-left text-xs font-semibold uppercase tracking-wide text-textSecondary">
                <th className="py-3 pl-4 pr-3">Reading</th>
                <th className="px-3 py-3">Votes</th>
                <th className="py-3 pl-3 pr-4 text-right">Choose as</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((reading) => (
                  <ReadingVoteItem
                    key={reading._id || reading.id}
                    reading={reading}
                    maxVotes={maxVotes}
                    finalReadings={finalReadings}
                    setFirstReading={setFirstReading}
                    setSecondReading={setSecondReading}
                    setThirdReading={setThirdReading}
                    setGospel={setGospel}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-textSecondary">
                    No readings in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <div className="w-full sm:w-auto">
          <Modal>
            <Modal.Open opens="songsm">
              <Button design="outline">Song Book</Button>
            </Modal.Open>
            <Modal.Window name="songsm">
              <SongsModal />
            </Modal.Window>
          </Modal>
        </div>

        <div className="w-full sm:w-auto">
          <Modal>
            <Modal.Open opens="result-form">
              <Button design="secondary">Save Final Result</Button>
            </Modal.Open>
            <Modal.Window name="result-form">
              <ResultForm
                finalReadings={finalReadings}
                title={themeWithReadingsVotes.title}
                draftResult={draftResult}
                onDraftChange={setDraftResult}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ReadingVotesList;
