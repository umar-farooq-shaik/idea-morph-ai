
import { CofounderResponse } from '@/pages/Index';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2, Bot, BrainCircuit, Briefcase, FileText, Flag, Landmark, Lightbulb, Target, Users
} from 'lucide-react';

import IdeaValidationCard from './IdeaValidationCard';
import FounderFitCard from './FounderFitCard';
import CompetitorScanCard from './CompetitorScanCard';
import TargetAudienceCard from './TargetAudienceCard';
import ProblemSolutionCard from './ProblemSolutionCard';
import RoadmapTimeline from './RoadmapTimeline';
import DocumentsGrid from './DocumentsGrid';
import FundingStrategyAccordion from './FundingStrategyAccordion';
import NameAndDomainsList from './NameAndDomainsList';
import BusinessModelCard from './BusinessModelCard';
import ChatbotSimulation from './ChatbotSimulation';
import ExecutionScoreCircle from './ExecutionScoreCircle';

interface ResultsDisplayProps {
  response: CofounderResponse;
}

const sectionMap = {
  ideaValidation: { component: IdeaValidationCard, icon: Lightbulb },
  founderFit: { component: FounderFitCard, icon: Users },
  competitorScan: { component: CompetitorScanCard, icon: Target },
  targetAudience: { component: TargetAudienceCard, icon: Users },
  problemSolution: { component: ProblemSolutionCard, icon: CheckCircle2 },
  roadmap: { component: RoadmapTimeline, icon: Flag },
  documentsNeeded: { component: DocumentsGrid, icon: FileText },
  fundingStrategy: { component: FundingStrategyAccordion, icon: Landmark },
  nameAndDomains: { component: NameAndDomainsList, icon: Briefcase },
  businessModel: { component: BusinessModelCard, icon: BrainCircuit },
  chatbotSetup: { component: ChatbotSimulation, icon: Bot },
  executionScore: { component: ExecutionScoreCircle, icon: BrainCircuit },
};

const sectionOrder: Array<keyof CofounderResponse> = [
  'ideaValidation',
  'problemSolution',
  'targetAudience',
  'founderFit',
  'competitorScan',
  'businessModel',
  'nameAndDomains',
  'roadmap',
  'fundingStrategy',
  'documentsNeeded',
  'chatbotSetup',
  'executionScore',
];

const ResultsDisplay = ({ response }: ResultsDisplayProps) => {
  const sections = sectionOrder
    .filter(key => response[key])
    .map(key => [key, response[key]]);

  if (!sections.length) {
    return null;
  }

  return (
    <Tabs
      defaultValue={sections[0][0]}
      orientation="vertical"
      className="w-full flex flex-col md:flex-row md:gap-6"
      onValueChange={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
    >
      <TabsList className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-col md:w-[280px] md:flex-shrink-0 md:bg-secondary md:p-2 md:rounded-lg md:space-y-1 h-auto bg-transparent p-0">
        {sections.map(([key, value]) => {
          const Icon = sectionMap[key as keyof typeof sectionMap]?.icon || Lightbulb;
          return (
            <TabsTrigger
              key={key}
              value={key as string}
              className="w-full flex gap-2 justify-start p-3 text-foreground rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm hover:bg-muted data-[state=active]:hover:bg-primary/90"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{value.title}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      
      <div className="flex-grow mt-4 md:mt-0">
        {sections.map(([key, value]) => {
          const Component = sectionMap[key as keyof typeof sectionMap]?.component;
          if (!Component) return null;
          
          return (
            <TabsContent key={key} value={key as string} className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <Component data={value} />
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};

export default ResultsDisplay;
