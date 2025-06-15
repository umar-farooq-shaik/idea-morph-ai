
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is this free?",
    answer: "Yes, Cofounder AI is completely free to use. You can generate a full business blueprint without any cost or sign-up required."
  },
  {
    question: "Do I own the idea?",
    answer: "Absolutely. You retain 100% ownership of your idea and all the content generated. We do not store your ideas or claim any rights to them."
  },
  {
    question: "What if I want to pivot?",
    answer: "Pivoting is a natural part of the startup journey. You can refine your idea and generate a new blueprint as many times as you need."
  },
  {
    question: "Is it private?",
    answer: "Yes, your session is private. We don't save your data on our servers. The blueprint is generated in your browser."
  },
  {
    question: "Do I need to sign up?",
    answer: "No signup is required to get started. You can enter your idea and receive your full startup plan instantly."
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-secondary py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
