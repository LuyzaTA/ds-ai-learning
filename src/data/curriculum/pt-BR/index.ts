import type { SectionTranslation } from '@/types/curriculum-i18n';
import { foundationsPtBR }      from './foundations';
import { machineLearningPtBR }  from './machine-learning';
import { deepLearningPtBR }     from './deep-learning';
import { generativeAiPtBR }     from './generative-ai';
import { dataAnalysisPtBR }     from './data-analysis';
import { bigDataPtBR }          from './big-data';
import { mlopsPtBR }            from './mlops';
import { ethicsPtBR }           from './ethics';

export const ptBRCurriculum: Record<string, SectionTranslation> = {
  foundations:      foundationsPtBR,
  'machine-learning': machineLearningPtBR,
  'deep-learning':  deepLearningPtBR,
  'generative-ai':  generativeAiPtBR,
  'data-analysis':  dataAnalysisPtBR,
  'big-data':       bigDataPtBR,
  mlops:            mlopsPtBR,
  ethics:           ethicsPtBR,
};
