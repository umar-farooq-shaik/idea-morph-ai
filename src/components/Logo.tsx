
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Rocket size={28} className="text-primary" />
      <span className="font-heading text-2xl font-bold text-foreground">
        Cofounder AI
      </span>
    </Link>
  );
};

export default Logo;
