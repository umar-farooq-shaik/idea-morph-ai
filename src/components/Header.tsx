
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="border-b mb-8">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
