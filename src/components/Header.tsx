
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <SidebarTrigger className="md:hidden" />
      <ThemeToggle />
    </header>
  );
};

export default Header;
