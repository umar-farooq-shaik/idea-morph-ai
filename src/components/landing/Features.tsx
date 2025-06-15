
const featuresList: { title: string }[] = [
    { title: "Idea Validation" },
    { title: "Problem–Solution Fit" },
    { title: "Target Audience" },
    { title: "Founder Fit" },
    { title: "Competitor Scan" },
    { title: "Business Model" },
    { title: "Name & Domain Suggestions" },
    { title: "Roadmap" },
    { title: "Funding Strategy" },
    { title: "Documents You Need" },
    { title: "Chatbot FAQ Setup" },
    { title: "Execution Score" },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What You Get – 12 AI-Generated Sections</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete, expert-level business plan covering every critical area of your startup.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {featuresList.map((feature, index) => (
            <div key={feature.title} className="bg-card border border-border rounded-lg p-4 flex items-center transition-all hover:shadow-md">
              <span className="text-primary font-bold mr-4 text-lg">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-semibold text-foreground">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
