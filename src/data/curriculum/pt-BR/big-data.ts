import type { SectionTranslation } from '@/types/curriculum-i18n';

export const bigDataPtBR: SectionTranslation = {
  title: 'Big Data e Engenharia',
  description: 'Arquitetura de dados, computação distribuída com Spark e pipelines de dados modernos.',
  longDescription:
    'Sistemas de dados modernos processam petabytes de dados em clusters distribuídos. Esta seção cobre as arquiteturas, ferramentas e padrões usados por engenheiros de dados em escala.',
  tags: ['Spark', 'Data Warehouse', 'Data Lake', 'ETL', 'Airflow', 'SQL', 'Cloud'],
  modules: {
    'data-architecture': {
      title: 'Arquitetura de Dados',
      description: 'Warehouses, lakes, lakehouses e como os dados fluem pelas organizações.',
      lessons: {
        'warehouse-vs-lake': {
          title: 'Data Warehouse vs. Data Lake vs. Lakehouse',
          description: 'Compreendendo arquiteturas modernas de armazenamento de dados e quando usar cada uma.',
          blocks: {
            0: {
              content:
                '## A Evolução do Armazenamento de Dados\n\nOrganizações enfrentam um desafio fundamental: como armazenar, organizar e acessar dados que chegam em muitos formatos (tabelas estruturadas, texto não estruturado, imagens, logs) em escala massiva.\n\nTrês padrões arquiteturais principais surgiram, cada um com diferentes trade-offs.',
            },
            1: {
              compareTitle: 'Data Warehouse vs. Data Lake',
              left: {
                label: 'Data Warehouse',
                items: [
                  'Schema-on-write (estruturado no carregamento)',
                  'Otimizado para análises SQL',
                  'Alto custo por GB (armazenamento colunar)',
                  'Melhor para BI e relatórios',
                  'Exemplos: Snowflake, BigQuery, Redshift',
                ],
              },
              right: {
                label: 'Data Lake',
                items: [
                  'Schema-on-read (estruturado na consulta)',
                  'Armazena dados brutos em qualquer formato',
                  'Baixo custo (armazenamento de objetos: S3, GCS)',
                  'Melhor para ML e análise exploratória',
                  'Exemplos: S3 + Athena, GCS + Dataproc',
                ],
              },
            },
            2: {
              content:
                '## A Arquitetura Lakehouse\n\nO **Lakehouse** (Databricks, 2021) combina o melhor dos dois:\n- **Armazenamento de baixo custo** do data lake (armazenamento de objetos)\n- **Análises SQL e transações ACID** do warehouse\n- Formatos abertos: **Delta Lake**, **Apache Iceberg**, **Apache Hudi**\n\nO Delta Lake adiciona versionamento (viagem no tempo), transações ACID e upserts eficientes a arquivos Parquet no armazenamento de objetos — habilitando tanto análises quanto ML nos mesmos dados.',
            },
            3: {
              content:
                '## Stack de Dados Moderno\n\nO "Stack de Dados Moderno" refere-se a ferramentas nativas da nuvem que se compõem bem:\n- **Ingestão**: Fivetran, Airbyte, Kafka\n- **Armazenamento**: Snowflake, BigQuery, Databricks Lakehouse\n- **Transformação**: dbt (data build tool)\n- **Orquestração**: Apache Airflow, Prefect, Dagster\n- **BI**: Tableau, Looker, Metabase\n- **ML**: MLflow, Vertex AI, SageMaker',
            },
            4: {
              items: [
                'Data Warehouses se destacam em análises SQL estruturadas; Data Lakes armazenam dados brutos de forma econômica.',
                'O Lakehouse combina ambos: armazenamento barato com governança e SQL de nível warehouse.',
                'Delta Lake, Iceberg e Hudi trazem transações ACID para o armazenamento de objetos.',
                'dbt transforma dados dentro do warehouse usando SQL, com controle de versão e testes.',
                'Escolha a arquitetura com base em: variedade de dados, padrões de consulta, habilidades da equipe e restrições de custo.',
              ],
            },
          },
        },
      },
    },
    'distributed-computing': {
      title: 'Apache Spark e Computação Distribuída',
      description: 'Processando dados em escala com DataFrames Spark, SQL e MLlib.',
      lessons: {
        'spark-fundamentals': {
          title: 'Fundamentos do Apache Spark',
          description: 'O motor de computação distribuída usado por todas as principais empresas intensivas em dados.',
          blocks: {
            0: {
              content:
                '## Por que Spark?\n\nUma única máquina pode processar gigabytes de dados com pandas — mas e terabytes ou petabytes? O **Apache Spark** distribui a computação por um cluster de máquinas, processando dados em paralelo.\n\nAs principais inovações do Spark em relação ao seu predecessor (Hadoop MapReduce):\n- **Processamento em memória**: os dados ficam na RAM entre as transformações (100× mais rápido)\n- **Avaliação preguiçosa**: o Spark planeja toda a computação antes de executar\n- **API unificada**: SQL, DataFrames, Streaming, ML em um único framework',
            },
            1: {
              content:
                '## Arquitetura do Spark\n\n- **Driver**: coordena a computação, executa a SparkSession\n- **Executors**: processos de trabalho nos nós do cluster que executam tarefas\n- **Gerenciador de Cluster**: YARN, Kubernetes ou Spark Standalone aloca recursos\n- **RDD** (Resilient Distributed Dataset): a abstração fundamental de dados — uma coleção tolerante a falhas particionada entre nós\n- **DataFrame/Dataset**: API de nível superior com schema, otimizada pelo planejador de consultas Catalyst',
            },
            2: {
              content:
                '## Transformações vs. Ações\n\nAs operações do Spark são:\n- **Transformações**: preguiçosas — retornam um novo DataFrame (select, filter, groupBy, join)\n- **Ações**: disparam a execução — retornam resultados (show, count, collect, write)\n\nO Spark constrói um **DAG** (Grafo Acíclico Direcionado) de transformações e só executa quando uma ação é chamada. Isso permite ao otimizador Catalyst reordenar e otimizar as operações.',
            },
            3: { caption: 'Operações com DataFrames PySpark' },
            4: {
              items: [
                'Spark distribui dados por um cluster, habilitando o processamento em memória de conjuntos de dados na escala de terabytes.',
                'Transformações são preguiçosas; ações disparam a execução — o Spark otimiza todo o DAG primeiro.',
                'DataFrames fornecem uma API similar ao SQL; sempre os prefira aos RDDs brutos por desempenho.',
                'O otimizador Catalyst e o motor de execução Tungsten tornam as operações com DataFrames altamente eficientes.',
                'Use `.explain()` para ver o plano de consulta físico e identificar gargalos de desempenho.',
              ],
            },
          },
        },
      },
    },
  },
};
