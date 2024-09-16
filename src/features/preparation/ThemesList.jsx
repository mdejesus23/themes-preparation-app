import themes from '../../data/themesData';
import ThemeItem from './ThemeItem';

function ThemesList() {
  return (
    <ul className="my-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">
      {themes.map((theme, ind) => (
        <ThemeItem theme={theme} key={ind} />
      ))}
    </ul>
  );
}

export default ThemesList;
