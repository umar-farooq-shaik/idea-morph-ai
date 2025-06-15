import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

const navLinks = [
  { title: 'Features', href: '#features' },
  { title: 'How It Works', href: '#how-it-works' },
  { title: 'Testimonials', href: '#testimonials' },
  { title: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Logo />
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:underline"
            >
              {link.title}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex ml-6">
          <Button asChild>
            <Link to="/app">Try Cofounder AI</Link>
          </Button>
        </div>
        <div className="md:hidden ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-lg font-medium text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
            <Button asChild className="mt-2">
              <Link to="/app">Try Cofounder AI</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
