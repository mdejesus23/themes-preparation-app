import { NavLink } from 'react-router-dom';
import { navGroups } from './navConfig';

function MainNav({ onNavigate }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 md:px-2 lg:px-3">
      {navGroups.map((group, groupIndex) => (
        <div
          key={group.label}
          className={`mb-5 last:mb-0 ${
            groupIndex > 0
              ? 'md:mt-3 md:border-t md:border-borderColor md:pt-3 lg:mt-0 lg:border-t-0 lg:pt-0'
              : ''
          }`}
        >
          <p className="text-textSecondary/70 px-3 pb-1.5 text-[0.7rem] font-semibold uppercase tracking-wider md:hidden lg:block">
            {group.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onNavigate}
                    title={item.label}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:justify-center md:px-0 lg:justify-start lg:px-3 ${
                        isActive
                          ? 'bg-sidebarActive text-sidebarActiveText'
                          : 'text-textSecondary hover:bg-bgSecondary hover:text-textPrimary'
                      }`
                    }
                  >
                    <Icon size={19} className="shrink-0" />
                    <span className="truncate md:hidden lg:inline">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default MainNav;
