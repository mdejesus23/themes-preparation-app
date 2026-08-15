import { NavLink } from 'react-router-dom';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { publicLinks } from './navConfig';

// Mirrors MobileNav's bottom tab bar (see AppLayout) so navigation sits in the
// same thumb-reachable place whether or not the visitor is logged in.
function PublicMobileNav() {
  const tabClasses = ({ isActive }) =>
    `flex flex-1 flex-col items-center gap-0.5 py-2 text-[0.7rem] font-medium transition-colors ${
      isActive ? 'text-green' : 'text-textSecondary'
    }`;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-borderColor bg-headerBg md:hidden">
      {publicLinks.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink key={link.label} to={link.to} className={tabClasses}>
            <Icon size={22} />
            {link.shortLabel}
          </NavLink>
        );
      })}
      <NavLink to="/login" className={tabClasses}>
        <HiOutlineArrowRightOnRectangle size={22} />
        Log in
      </NavLink>
    </nav>
  );
}

export default PublicMobileNav;
