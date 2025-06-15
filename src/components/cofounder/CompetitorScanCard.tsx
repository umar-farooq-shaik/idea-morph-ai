
import SectionCard from './SectionCard';
import { Badge } from '@/components/ui/badge';

const CompetitorScanCard = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
    <p className="mb-6">{data.content}</p>
    <div className="grid md:grid-cols-3 gap-6">
      {data.competitors.map((c, i) => (
        <div key={i} className="p-6 rounded-lg bg-secondary">
          <h4 className="font-bold text-xl mb-2">{c.name}</h4>
          <p className="text-sm text-muted-foreground mb-3"><strong>Strength:</strong> {c.strength}</p>
          <Badge className="bg-accent text-accent-foreground">Gap: {c.gap}</Badge>
        </div>
      ))}
    </div>
  </SectionCard>
);

export default CompetitorScanCard;
