import { NavLink } from 'react-router-dom';
import { navGroups } from './navConfig';

function MainNav({ onNavigate }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      {navGroups.map((group) => (
        <div key={group.label} className="mb-5 last:mb-0">
          <p className="px-3 pb-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-textSecondary/70">
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
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-sidebarActive text-sidebarActiveText'
                          : 'text-textSecondary hover:bg-bgSecondary hover:text-textPrimary'
                      }`
                    }
                  >
                    <Icon size={19} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
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
