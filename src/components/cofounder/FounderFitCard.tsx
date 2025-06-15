
import SectionCard from './SectionCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckSquare } from 'lucide-react';

const FounderFitCard = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
    <div className="grid md:grid-cols-3 gap-8 items-center">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-32 h-32 border-4 border-primary">
          <AvatarImage src="https://github.com/shadcn.png" alt="Founder" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
        <h4 className="font-bold text-xl mt-4">Ideal Founder Profile</h4>
      </div>
      <div className="md:col-span-2 p-6 rounded-lg bg-secondary">
        <h4 className="font-bold text-lg mb-4">Key Traits & Skills:</h4>
        <ul className="space-y-3">
          {data.checklist.map((item, i) => (
            <li key={i} className="flex items-center"><CheckSquare className="h-5 w-5 mr-3 flex-shrink-0 text-primary" /> <span>{item}</span></li>
          ))}
        </ul>
      </div>
    </div>
     <p className="mt-6">{data.content}</p>
  </SectionCard>
);

export default FounderFitCard;
