import {
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCog6Tooth,
  HiOutlineMusicalNote,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineEnvelope,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';

// Shared catechism book id (used across the app's nav links).
export const CCC_BOOK_ID = '68b45c9e3d17dcca0c489c85';

// Navigation for the logged-out shell. Icons mirror the authenticated sidebar
// so the public and in-app navigation feel like one system. `shortLabel` is
// what the mobile tab bar shows, where the full labels don't fit.
export const publicLinks = [
  {
    to: '/song-book',
    label: 'Song Book',
    shortLabel: 'Songs',
    icon: HiOutlineMusicalNote,
  },
  {
    to: '/public/liturgy-of-the-hours',
    label: 'Office of Readings',
    shortLabel: 'Breviary',
    icon: HiOutlineClock,
  },
  {
    to: `/public/catechism-of-the-catholic-church/${CCC_BOOK_ID}`,
    label: 'CCC',
    shortLabel: 'CCC',
    icon: HiOutlineBookOpen,
  },
];

// Grouped navigation used by the sidebar. Each group renders a small
// uppercase label followed by its links.
export const navGroups = [
  {
    label: 'Preparation',
    items: [
      {
        to: '/themes',
        label: 'All Themes',
        icon: HiOutlineSquares2X2,
        end: true,
      },
      { to: '/themes', label: 'Reading Votes', icon: HiOutlineChartBar },
    ],
  },
  {
    label: 'Admin',
    items: [
      { to: '/admin-themes', label: 'My Themes', icon: HiOutlineBookOpen },
      {
        to: '/admin-results',
        label: 'My Results',
        icon: HiOutlineClipboardDocumentCheck,
      },
      {
        to: '/admin-user',
        label: 'Account Settings',
        icon: HiOutlineCog6Tooth,
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      { to: '/songs', label: 'Psalms / Song Book', icon: HiOutlineMusicalNote },
      {
        to: '/liturgy-of-the-hours',
        label: 'Office of Readings',
        icon: HiOutlineClock,
      },
      {
        to: `/catechism-of-the-catholic-church/${CCC_BOOK_ID}`,
        label: 'Catechism',
        icon: HiOutlineBookOpen,
      },
    ],
  },
  {
    label: 'Support',
    items: [
      { to: '/contact', label: 'Contact', icon: HiOutlineEnvelope },
      {
        to: '/terms-of-service',
        label: 'Terms of Service',
        icon: HiOutlineDocumentText,
      },
      {
        to: '/privacy-policy',
        label: 'Privacy Policy',
        icon: HiOutlineShieldCheck,
      },
    ],
  },
];
