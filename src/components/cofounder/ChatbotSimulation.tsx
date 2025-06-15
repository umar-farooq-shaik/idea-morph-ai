
import SectionCard from './SectionCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

const ChatbotSimulation = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
    <p className="mb-6">{data.content}</p>
    <div className="p-6 rounded-lg space-y-6 bg-secondary">
      {data.faqs.map((faq, i) => (
        <div key={i}>
          <div className="flex items-start gap-3 justify-end">
            <div className="p-3 rounded-lg max-w-sm bg-primary text-primary-foreground">
              {faq.user}
            </div>
            <Avatar>
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-3 mt-4">
            <Avatar>
              <AvatarFallback><Bot /></AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-lg max-w-sm bg-card border">
              {faq.bot}
            </div>
          </div>
        </div>
      ))}
    </div>
  </SectionCard>
);

export default ChatbotSimulation;
