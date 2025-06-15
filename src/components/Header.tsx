
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 border-b mb-8">
      <Logo />
      <ThemeToggle />
    </header>
  );
};

export default Header;
