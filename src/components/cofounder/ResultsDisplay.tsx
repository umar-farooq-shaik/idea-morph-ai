
import { CofounderResponse } from '@/pages/Index';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, CheckCircle2, Bot, BrainCircuit, Briefcase, Calendar, ClipboardList,
  FileText, Flag, Landmark, Lightbulb, Target, Users
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

const ResultsDisplay = ({ response }: ResultsDisplayProps) => {
  const sections = Object.entries(response);

  return (
    <Tabs defaultValue={sections[0][0]} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 h-auto">
        {sections.map(([key, value]) => {
          const Icon = sectionMap[key as keyof typeof sectionMap]?.icon || Lightbulb;
          return (
            <TabsTrigger key={key} value={key} className="flex gap-2 justify-start p-3">
              <Icon className="h-5 w-5" />
              <span>{value.title}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      
      {sections.map(([key, value]) => {
        const Component = sectionMap[key as keyof typeof sectionMap]?.component;
        if (!Component) return null;
        
        return <TabsContent key={key} value={key}><Component data={value} /></TabsContent>;
      })}
    </Tabs>
  );
};

export default ResultsDisplay;
