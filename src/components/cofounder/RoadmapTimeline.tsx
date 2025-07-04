
import SectionCard from './SectionCard';
import { CheckCircle } from 'lucide-react';

const RoadmapTimeline = ({ data }) => {
  const colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary))'];
  return (
    <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
      <p className="mb-8">{data.content}</p>
      <div className="relative border-l-2 border-border pl-8 space-y-12">
        {data.timeline.map((item, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[42px] top-1 h-4 w-4 rounded-full" style={{ backgroundColor: colors[i % colors.length] }}></div>
            <p className="font-bold text-sm" style={{ color: colors[i % colors.length] }}>{item.period}</p>
            <h4 className="font-bold text-xl mt-1">{item.title}</h4>
            <ul className="mt-4 space-y-2">
              {item.tasks.map((task, j) => (
                <li key={j} className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-accent" /> {task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default RoadmapTimeline;
