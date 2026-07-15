import {
  HiOutlineSun,
  HiOutlineClock,
  HiOutlineMoon,
  HiChevronRight,
} from 'react-icons/hi2';

// Static "Hours" overview card. The Liturgy of the Hours prayers themselves
// live in the table below; these rows are section signposts.
const HOURS = [
  { label: 'Morning Prayer', icon: HiOutlineSun },
  { label: 'Daytime Prayer', icon: HiOutlineSun },
  { label: 'Evening Prayer', icon: HiOutlineClock },
  { label: 'Night Prayer', icon: HiOutlineMoon },
];

function HoursCard() {
  return (
    <div className="rounded-2xl border border-borderColor bg-bgPrimary p-5 shadow-sm">
      <h2 className="mb-3 font-headfont text-lg font-bold text-textPrimary">
        Hours
      </h2>
      <ul className="flex flex-col gap-1">
        {HOURS.map((hour) => {
          const Icon = hour.icon;
          return (
            <li key={hour.label}>
              <a
                href="#liturgy-readings"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-textPrimary transition-colors hover:bg-bgSecondary"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-yellow" />
                  {hour.label}
                </span>
                <HiChevronRight size={16} className="text-textSecondary" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HoursCard;
