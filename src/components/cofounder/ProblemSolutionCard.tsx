
import SectionCard from './SectionCard';

const ProblemSolutionCard = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="p-6 rounded-lg border-2 border-destructive">
        <h4 className="font-bold text-xl mb-3 text-destructive">The Problem</h4>
        <p>{data.problem}</p>
      </div>
      <div className="p-6 rounded-lg border-2 border-accent">
        <h4 className="font-bold text-xl mb-3 text-accent">Our Solution</h4>
        <p>{data.solution}</p>
      </div>
    </div>
  </SectionCard>
);

export default ProblemSolutionCard;
