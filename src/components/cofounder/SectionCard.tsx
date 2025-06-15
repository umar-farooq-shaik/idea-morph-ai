
import React from 'react';

interface SectionCardProps {
  title: string;
  summary: string;
  cta: string;
  children: React.ReactNode;
  backgroundColor?: string;
}

const SectionCard = ({ title, summary, cta, children, backgroundColor }: SectionCardProps) => {
  return (
    <div className="mt-6 p-6 md:p-8 rounded-lg border border-border bg-card" style={{ backgroundColor }}>
      <div className="mb-6 border-b border-border pb-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground mt-1">{summary}</p>
      </div>
      
      <div className="prose max-w-none prose-p:text-muted-foreground prose-li:text-muted-foreground">
        {children}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-lg font-semibold text-foreground">Next Step:</p>
        <p className="text-primary">{cta}</p>
      </div>
    </div>
  );
};

export default SectionCard;
