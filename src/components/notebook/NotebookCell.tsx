import type { NotebookCell as NotebookCellType } from '@/types/notebook';
import { MarkdownCell }       from './cells/MarkdownCell';
import { CodeCell }           from './cells/CodeCell';
import { TheoryCell }         from './cells/TheoryCell';
import { MathCell }           from './cells/MathCell';
import { BusinessUseCaseCell } from './cells/BusinessUseCaseCell';
import { MetricsCell }        from './cells/MetricsCell';
import { QuizCell }           from './cells/QuizCell';
import { DiagramCell }        from './cells/DiagramCell';
import { ChartCell }          from './cells/ChartCell';
import { TableCell }          from './cells/TableCell';
import { CalloutCell }        from './cells/CalloutCell';
import { StepsCell }          from './cells/StepsCell';
import { InterviewCell }      from './cells/InterviewCell';
import { ComparisonCell }     from './cells/ComparisonCell';

interface Props {
  cell: NotebookCellType;
  index: number;
}

export function NotebookCell({ cell, index }: Props) {
  switch (cell.type) {
    case 'markdown':   return <MarkdownCell cell={cell} />;
    case 'code':       return <CodeCell cell={cell} index={index} />;
    case 'theory':     return <TheoryCell cell={cell} />;
    case 'math':       return <MathCell cell={cell} />;
    case 'business':   return <BusinessUseCaseCell cell={cell} />;
    case 'metrics':    return <MetricsCell cell={cell} />;
    case 'quiz':       return <QuizCell cell={cell} />;
    case 'diagram':    return <DiagramCell cell={cell} />;
    case 'chart':      return <ChartCell cell={cell} />;
    case 'table':      return <TableCell cell={cell} />;
    case 'callout':    return <CalloutCell cell={cell} />;
    case 'steps':      return <StepsCell cell={cell} />;
    case 'interview':  return <InterviewCell cell={cell} />;
    case 'comparison': return <ComparisonCell cell={cell} />;
    default:           return null;
  }
}
