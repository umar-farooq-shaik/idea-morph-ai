
import SectionCard from './SectionCard';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const ExecutionScoreCircle = ({ data }) => {
  const getScoreColor = (score: number) => {
    if (score < 50) return 'hsl(var(--destructive))';
    if (score < 80) return 'hsl(var(--primary))';
    return 'hsl(var(--accent))';
  }
  
  const scoreColor = getScoreColor(data.score);
  const chartData = [{ name: 'Execution Score', value: data.score, fill: scoreColor }];

  return (
    <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              innerRadius="70%" 
              outerRadius="100%" 
              barSize={30} 
              data={chartData} 
              startAngle={90} 
              endAngle={-270}
            >
              <RadialBar
                background
                dataKey="value"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-5xl font-bold"
                fill={scoreColor}
              >
                {data.score}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="font-bold text-xl mb-4">Score Breakdown</h4>
          <p className="mb-6">{data.content}</p>
          <ul className="space-y-3">
            {data.breakdown.map((item, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{item.metric}</span>
                <span className="font-bold">{item.score}/100</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
};

export default ExecutionScoreCircle;
