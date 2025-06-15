
import React from 'react';

const tips = [
  { emoji: '✅', title: 'Be Clear and Simple', text: 'Describe your product in one sentence.' },
  { emoji: '🎯', title: 'Include Target User', text: "Say who it's for — students, remote workers, etc." },
  { emoji: '🚫', title: 'Avoid Buzzwords', text: "Skip vague words like 'next-gen synergy'." },
  { emoji: '💡', title: 'Use Action Words', text: "Start with verbs like ‘helps’, ‘builds’, ‘automates’." }
];

const WritingTips = () => {
  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <hr className="my-10 border-border" />
      <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
          📝 How to Write a Great Startup Idea
        </h2>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="flex-shrink-0 bg-primary text-primary-foreground p-2 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-lg">{tip.emoji}</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-foreground">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WritingTips;
