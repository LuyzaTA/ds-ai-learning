import type { SectionTranslation } from '@/types/curriculum-i18n';

export const ethicsPtBR: SectionTranslation = {
  title: 'Ética e Governança',
  description: 'Viés em IA, explicabilidade, privacidade e as regulamentações que moldam a IA responsável.',
  longDescription:
    'À medida que os sistemas de IA tomam decisões consequentes em contratação, crédito, saúde e justiça criminal, as dimensões éticas, legais e sociais da IA tornam-se tão importantes quanto as técnicas.',
  tags: ['Ética em IA', 'Equidade', 'Explicabilidade', 'GDPR', 'LGPD', 'Privacidade', 'IA Responsável'],
  modules: {
    'ai-ethics-fairness': {
      title: 'Ética em IA e Equidade Algorítmica',
      description: 'Fontes de viés, métricas de equidade e ferramentas de explicabilidade.',
      lessons: {
        'bias-and-fairness': {
          title: 'Viés, Equidade e Explicabilidade',
          description: 'Como o viés entra nos sistemas de ML, como medir a equidade e como explicar as decisões do modelo.',
          blocks: {
            0: {
              content:
                '## De onde Vem o Viés?\n\nSistemas de ML podem ser injustos ou discriminatórios não por intenção maliciosa, mas por causa do **viés incorporado nos dados e processos**. Principais fontes:\n\n1. **Viés histórico**: os dados de treinamento refletem discriminação histórica (por exemplo, dados de aprovação de empréstimos que subaprovaram mulheres)\n2. **Viés de representação**: certos grupos são sub-representados nos dados de treinamento\n3. **Viés de medição**: features proxy correlacionam com atributos protegidos (CEP correlaciona com raça)\n4. **Loops de feedback**: previsões tendenciosas levam a ações tendenciosas, que criam dados futuros tendenciosos\n5. **Viés de agregação**: um modelo para grupos heterogêneos ignora diferenças intragrupo',
            },
            1: {
              title: 'Caso Real: Algoritmo COMPAS de Reincidência',
              content:
                'O algoritmo COMPAS usado em tribunais dos EUA para prever reincidência foi descoberto pela ProPublica (2016) como sinalizando incorretamente réus negros como de alto risco a quase o dobro da taxa de réus brancos com histórico criminal semelhante. Isso gerou um debate global sobre equidade algorítmica na justiça criminal.',
            },
            2: {
              content:
                '## Métricas de Equidade\n\nExistem múltiplas definições de equidade — e elas são matematicamente incompatíveis. Escolha com base no contexto e no dano a ser prevenido:\n\n- **Paridade Demográfica**: taxas iguais de previsão positiva entre grupos\n- **Igualdade de Oportunidade**: taxas iguais de verdadeiros positivos entre grupos\n- **Paridade Preditiva**: precisão igual (VPP) entre grupos\n- **Calibração**: probabilidades previstas correspondem a resultados reais em todos os grupos\n\nO "teorema da impossibilidade" mostra que esses critérios não podem ser todos satisfeitos simultaneamente quando as taxas base diferem entre grupos.',
            },
            3: {
              content:
                '## Explicabilidade: SHAP e LIME\n\nModelos de caixa preta (aprendizado profundo, XGBoost) podem ter precisão muito alta, mas são opacos. Métodos de **explicabilidade** respondem: "por que o modelo fez essa previsão específica?"\n\n- **SHAP** (SHapley Additive exPlanations): atribuição fundamentada na teoria dos jogos da contribuição de cada feature. Consistente e localmente preciso.\n- **LIME** (Local Interpretable Model-agnostic Explanations): ajusta um modelo linear simples localmente em torno de cada previsão.\n- **Integrated Gradients**: para redes neurais, atribui importância às features de entrada via gradientes.',
            },
            4: { caption: 'Explicações SHAP para um modelo Random Forest' },
            5: {
              content:
                '## Framework de IA Responsável\n\nOrganizações líderes usam frameworks com pilares como:\n- **Equidade**: teste disparidades demográficas antes da implantação\n- **Confiabilidade e Segurança**: red-team, teste casos extremos, defina modos de falha\n- **Privacidade**: minimize a coleta de dados, anonimize, implemente privacidade diferencial\n- **Inclusividade**: projete para todos os usuários, especialmente grupos marginalizados\n- **Transparência**: documente model cards, dados de treinamento, limitações conhecidas\n- **Responsabilidade**: mantenha trilhas de auditoria, supervisão humana para decisões de alto risco',
            },
            6: {
              items: [
                'O viés entra nos sistemas de ML por meio de dados históricos, sub-representação e loops de feedback — não apenas por código.',
                'Múltiplas definições de equidade existem e são matematicamente incompatíveis — escolha com base no contexto de dano.',
                'SHAP fornece atribuições de features baseadas em teoria dos jogos e consistentes; LIME fornece aproximações locais.',
                'A Lei de IA da UE (2024) exige explicabilidade e testes de viés para sistemas de IA de alto risco.',
                'Model cards e data sheets são o padrão para documentação transparente de sistemas de IA.',
              ],
            },
          },
        },
      },
    },
    'privacy-governance': {
      title: 'Privacidade e Conformidade Regulatória',
      description: 'GDPR, LGPD, privacidade diferencial e a Lei de IA da UE.',
      lessons: {
        'gdpr-lgpd': {
          title: 'Privacidade de Dados: GDPR, LGPD e a Lei de IA da UE',
          description: 'As regulamentações que todo cientista de dados deve conhecer e como elas moldam o design de modelos.',
          blocks: {
            0: {
              content:
                '## Por que a Lei de Privacidade Importa para Cientistas de Dados\n\nCientistas de dados trabalham com dados pessoais — nomes, localizações, registros médicos, comportamentos. Dois regulamentos marcos governam isso:\n\n- **GDPR** (Regulamento Geral de Proteção de Dados da UE, 2018): aplica-se globalmente a qualquer pessoa que lide com dados de residentes da UE\n- **LGPD** (Lei Geral de Proteção de Dados, Brasil, 2020): espelha de perto o GDPR, aplica-se a dados pessoais brasileiros\n\nViolações podem custar até 4% do faturamento anual global ou €20 milhões (GDPR). Compreender essas leis molda como coletamos, armazenamos e processamos dados.',
            },
            1: {
              content:
                '## Princípios Fundamentais do GDPR / LGPD\n\n1. **Licitude, Lealdade, Transparência**: os titulares dos dados devem saber como seus dados são usados\n2. **Limitação de Finalidade**: dados coletados para uma finalidade não podem ser reutilizados para outra\n3. **Minimização de Dados**: colete apenas o estritamente necessário\n4. **Exatidão**: mantenha os dados atualizados\n5. **Limitação de Armazenamento**: exclua os dados quando não forem mais necessários\n6. **Segurança**: medidas técnicas e organizacionais adequadas\n7. **Responsabilidade**: demonstre conformidade proativamente',
            },
            2: {
              content:
                '## A Lei de IA da UE (2024)\n\nA Lei de IA da UE é o primeiro regulamento abrangente de IA do mundo. Ela classifica os sistemas de IA por risco:\n\n- **Risco inaceitável** (proibido): pontuação social, manipulação subliminar, vigilância biométrica em tempo real\n- **Alto risco**: triagem de currículos, pontuação de crédito, diagnóstico médico, infraestrutura crítica — exige avaliações de conformidade, testes de viés, supervisão humana\n- **Risco limitado**: chatbots — devem ser transparentes sobre ser IA\n- **Risco mínimo**: filtros de spam, IA em jogos — sem regulamentação',
            },
            3: {
              content:
                '## Privacidade Diferencial\n\nA **Privacidade Diferencial (DP)** fornece uma garantia matematicamente rigorosa: adicionar ou remover os dados de qualquer indivíduo de um conjunto de dados altera a saída por no máximo um pequeno fator ε. Isso protege a privacidade individual enquanto permite análises estatísticas.\n\nUsada por: Apple (telemetria iOS), Google (estatísticas do Chrome), US Census Bureau. Aplicada em ML via **DP-SGD** (perturbação de gradiente durante o treinamento).',
            },
            4: { caption: 'Privacidade diferencial ε-δ: saídas em conjuntos de dados vizinhos D e D\' são indistinguíveis.' },
            5: {
              items: [
                'GDPR e LGPD aplicam-se sempre que você processa dados pessoais de residentes da UE ou do Brasil — independentemente de onde sua empresa está.',
                'Princípios fundamentais: minimize os dados coletados, obtenha consentimento explícito, exclua quando terminar, documente tudo.',
                'A Lei de IA da UE classifica a IA por risco; sistemas de alto risco (crédito, contratação, médico) exigem conformidade rigorosa.',
                'A privacidade diferencial fornece garantias matemáticas contra a re-identificação individual em conjuntos de dados.',
                'O aprendizado federado treina modelos em dados descentralizados sem que os dados brutos saiam dos dispositivos.',
              ],
            },
          },
        },
      },
    },
  },
};
