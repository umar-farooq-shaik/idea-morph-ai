
import SectionCard from './SectionCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FundingStrategyAccordion = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
    <p className="mb-6">{data.content}</p>
    <Accordion type="single" collapsible className="w-full">
      {data.strategies.map((s, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-lg font-bold">{s.name}</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            {s.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </SectionCard>
);

export default FundingStrategyAccordion;
