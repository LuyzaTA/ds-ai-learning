import type { SectionTranslation } from '@/types/curriculum-i18n';

export const mlopsPtBR: SectionTranslation = {
  title: 'MLOps e Sistemas de IA',
  description: 'Implantando, monitorando e mantendo modelos de ML em produção.',
  longDescription:
    'Construir um modelo representa 10% do trabalho. Implantá-lo de forma confiável, monitorá-lo e mantê-lo preciso ao longo do tempo representa os outros 90%. Esta seção cobre a disciplina de engenharia de sistemas de ML em produção.',
  tags: ['MLOps', 'Docker', 'FastAPI', 'MLflow', 'Monitoramento', 'CI/CD', 'Feature Store'],
  modules: {
    'model-deployment': {
      title: 'Implantação de Modelos',
      description: 'Servindo modelos de ML como APIs com FastAPI, Docker e Kubernetes.',
      lessons: {
        'serving-with-fastapi': {
          title: 'Servindo Modelos de ML com FastAPI e Docker',
          description: 'Construa uma API REST pronta para produção para seu modelo e containerize-a.',
          blocks: {
            0: {
              content:
                '## O Desafio da Implantação\n\nUm modelo que existe apenas como um Jupyter notebook não gera valor de negócio. A implantação em produção significa:\n- Tornar o modelo acessível via uma API\n- Garantir que ele lide com requisições concorrentes com eficiência\n- Torná-lo reproduzível (mesma previsão em qualquer máquina)\n- Habilitar versionamento, rollback e testes A/B\n\nO stack padrão: **FastAPI** (API REST) + **Docker** (containerização) + **Kubernetes** (orquestração).',
            },
            1: {
              content:
                '## FastAPI para Servir Modelos\n\nFastAPI é o padrão moderno para APIs Python: é rápido (construído sobre ASGI), gera documentação OpenAPI automaticamente e tem excelente integração com Pydantic para validação de requisição/resposta.',
            },
            2: { caption: 'Endpoint de servir modelo com FastAPI' },
            3: { caption: 'Dockerfile para a API de servir modelo' },
            4: {
              items: [
                'FastAPI + Pydantic fornece APIs REST tipo-seguras e auto-documentadas para modelos de ML.',
                'Carregue modelos na inicialização, não por requisição — custo de inicialização uma vez vs. penalidade de latência por chamada.',
                'Docker garante reproduzibilidade: o mesmo container roda em qualquer máquina ou nuvem.',
                'Sempre inclua um endpoint /health para balanceadores de carga e sistemas de monitoramento.',
                'Kubernetes (k8s) orquestra múltiplos containers Docker, gerenciando escalonamento e failover.',
              ],
            },
          },
        },
      },
    },
    'ml-monitoring': {
      title: 'Monitoramento de ML e Rastreamento de Experimentos',
      description: 'MLflow, detecção de drift de dados e mantendo modelos precisos ao longo do tempo.',
      lessons: {
        'mlflow-monitoring': {
          title: 'Rastreamento de Experimentos com MLflow',
          description: 'Rastreie, compare e gerencie experimentos e versões de modelos de ML.',
          blocks: {
            0: {
              content:
                '## O Problema do Rastreamento de Experimentos\n\nSem ferramentas, experimentos de ML são caóticos: você executa 50 combinações diferentes de hiperparâmetros e não consegue lembrar qual produziu qual resultado, nem qual versão de código e dados foi usada. **MLflow** é o padrão open-source para resolver isso.',
            },
            1: {
              content:
                '## Componentes do MLflow\n\n- **MLflow Tracking**: registre parâmetros, métricas e artefatos para cada execução\n- **MLflow Models**: empacote modelos em um formato padrão (MLmodel) que pode ser servido em qualquer lugar\n- **MLflow Model Registry**: versione, gerencie estágios e promova modelos (Staging → Production → Archived)\n- **MLflow Projects**: execuções de treinamento reproduzíveis com dependências definidas',
            },
            2: { caption: 'Rastreamento de experimentos com MLflow' },
            3: {
              content:
                '## Drift de Dados e Monitoramento de Modelos\n\nModelos degradam ao longo do tempo à medida que a distribuição de dados do mundo real muda. **Drift de dados** é quando as distribuições das features de entrada mudam; **drift de conceito** é quando a relação entre features e alvos muda.\n\nSoluções de monitoramento: **Evidently AI**, **WhyLogs**, **Arize**, **Fiddler**. Métricas principais a rastrear:\n- Testes estatísticos de drift (divergência KL, PSI, Jensen-Shannon)\n- Mudança na distribuição de previsões\n- Desempenho do modelo em amostras rotuladas\n- Verificações de qualidade de dados (taxas de nulo, faixas de valores)',
            },
            4: {
              items: [
                'MLflow rastreia parâmetros, métricas e artefatos para cada execução de experimento — habilitando reproduzibilidade.',
                'O Model Registry gerencia versões e estágios de promoção (Staging → Production).',
                'Drift de dados (mudanças na distribuição de entrada) e drift de conceito (mudanças na relação) degradam modelos com o tempo.',
                'Configure monitoramento automatizado com testes estatísticos e alertas sobre degradação de desempenho.',
                'Pipelines de retreinamento devem ser acionados automaticamente quando o drift ou desempenho cair abaixo do limite.',
              ],
            },
          },
        },
      },
    },
  },
};
