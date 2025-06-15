
import SectionCard from './SectionCard';
import { Check, AlertTriangle } from 'lucide-react';

const IdeaValidationCard = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
    <div className="text-center mb-8">
      <span className="text-2xl font-bold py-2 px-4 rounded-full bg-accent text-accent-foreground">
        {data.verdict}
      </span>
    </div>
    <p className="mb-6">{data.content}</p>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 bg-secondary rounded-lg">
        <h4 className="font-bold text-lg mb-2 text-accent">Strengths</h4>
        <ul className="space-y-2">
          {data.strengths.map((item, i) => (
            <li key={i} className="flex items-start"><Check className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-accent" /> <span>{item}</span></li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-secondary rounded-lg">
        <h4 className="font-bold text-lg mb-2 text-destructive">Risks</h4>
        <ul className="space-y-2">
          {data.risks.map((item, i) => (
            <li key={i} className="flex items-start"><AlertTriangle className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-destructive" /> <span>{item}</span></li>
          ))}
        </ul>
      </div>
    </div>
  </SectionCard>
);

export default IdeaValidationCard;
