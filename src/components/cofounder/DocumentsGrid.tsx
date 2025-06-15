
import SectionCard from './SectionCard';
import { Button } from '@/components/ui/button';
import { Download, FileText, Grid2x2, BookOpen } from 'lucide-react';

const iconMap = {
  'file-text': FileText,
  'grid-2x2': Grid2x2,
  'book-open': BookOpen,
};

const DocumentsGrid = ({ data }) => (
  <SectionCard title={data.title} summary={data.summary} cta={data.cta}>
    <p className="mb-6">{data.content}</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.documents.map((doc, i) => {
        const Icon = iconMap[doc.icon] || FileText;
        return (
          <div key={i} className="p-6 rounded-lg flex flex-col items-center text-center" style={{ backgroundColor: data.colors.card }}>
            <Icon className="h-12 w-12 mb-4" style={{ color: data.colors.icon }} />
            <h4 className="font-bold text-lg">{doc.name}</h4>
            <p className="text-sm text-muted-foreground mt-1 mb-4 flex-grow">{doc.description}</p>
            <Button style={{ backgroundColor: data.colors.button }}>
              <Download className="mr-2 h-4 w-4" /> Download Template
            </Button>
          </div>
        );
      })}
    </div>
  </SectionCard>
);

export default DocumentsGrid;
