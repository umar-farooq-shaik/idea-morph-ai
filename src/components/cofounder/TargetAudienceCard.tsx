
import SectionCard from './SectionCard';

const TargetAudienceCard = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta} backgroundColor={data.colors.card}>
    <p className="mb-6">{data.content}</p>
    {data.personas.map((p, i) => (
      <div key={i} className="p-6 rounded-lg grid md:grid-cols-3 gap-6" style={{ backgroundColor: data.colors.background }}>
        <div>
          <h4 className="font-bold text-xl mb-2">{p.name}</h4>
          <p className="text-muted-foreground">Ideal Customer Profile</p>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div>
            <h5 className="font-semibold mb-2">Pain Points</h5>
            <div className="flex flex-wrap gap-2">
              {p.pain_points.map((tag, j) => <span key={j} className="text-xs font-medium px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: data.colors.tags }}>{tag}</span>)}
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Habits</h5>
            <ul className="list-disc list-inside text-gray-300">
              {p.habits.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
           <div>
            <h5 className="font-semibold mb-2">Needs</h5>
            <ul className="list-disc list-inside text-gray-300">
              {p.needs.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    ))}
  </SectionCard>
);

export default TargetAudienceCard;
