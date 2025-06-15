
import SectionCard from './SectionCard';

const BusinessModelCard = ({ data }) => {
  const colorMap = {
    'Freemium SaaS': data.colors.freemium,
    'Pure Subscription': data.colors.saas,
    'Marketplace': data.colors.b2b,
  };

  return (
    <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
      <p className="mb-6">{data.content}</p>
      <div className="space-y-6">
        {data.models.map((model, i) => (
          <div key={i} className="p-6 rounded-lg border-l-4 bg-secondary" style={{ borderColor: colorMap[model.name] || 'hsl(var(--foreground))' }}>
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-xl">{model.name}</h4>
              {model.recommended && <span className="text-xs font-bold py-1 px-3 rounded-full" style={{ backgroundColor: colorMap[model.name], color: '#111' }}>Recommended</span>}
            </div>
            <p className="mt-2 text-muted-foreground">{model.description}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default BusinessModelCard;
