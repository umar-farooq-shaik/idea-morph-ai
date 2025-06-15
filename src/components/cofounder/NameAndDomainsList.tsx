
import SectionCard from './SectionCard';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const NameAndDomainsList = ({ data }) => {
  const { toast } = useToast();

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name);
    toast({ title: "Copied to clipboard!", description: name });
  };
  
  return (
    <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
      <p className="mb-6">{data.content}</p>
      <ul className="space-y-3">
        {data.names.map((item, i) => (
          <li key={i} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <span className="font-bold text-lg">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono p-1 rounded ${item.com ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'}`}>.com</span>
              <span className={`text-xs font-mono p-1 rounded ${item.ai ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'}`}>.ai</span>
              <span className={`text-xs font-mono p-1 rounded ${item.xyz ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'}`}>.xyz</span>
              <Button variant="ghost" size="icon" onClick={() => handleCopy(item.name)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};

export default NameAndDomainsList;
