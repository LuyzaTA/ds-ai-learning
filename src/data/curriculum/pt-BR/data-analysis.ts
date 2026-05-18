import type { SectionTranslation } from '@/types/curriculum-i18n';

export const dataAnalysisPtBR: SectionTranslation = {
  title: 'Análise de Dados e Visualização',
  description: 'EDA, testes estatísticos e comunicação de insights por meio de gráficos e dashboards.',
  longDescription:
    'A análise de dados é a ponte entre dados brutos e decisões acionáveis. Esta seção cobre como explorar, entender e comunicar dados de forma eficaz.',
  tags: ['EDA', 'Pandas', 'Matplotlib', 'Seaborn', 'Estatística', 'Visualização'],
  modules: {
    'exploratory-data-analysis': {
      title: 'Análise Exploratória de Dados',
      description: 'Técnicas para compreender os dados antes da modelagem.',
      lessons: {
        'eda-fundamentals': {
          title: 'Fundamentos da Análise Exploratória de Dados',
          description: 'Distribuições, correlações, outliers e o fluxo de trabalho sistemático de EDA.',
          blocks: {
            0: {
              content:
                '## O que é EDA?\n\nA Análise Exploratória de Dados (EDA), cunhada pelo estatístico John Tukey, é a prática de **resumir visual e estatisticamente os dados** antes de aplicar qualquer modelo. Ela responde perguntas como:\n- Qual é a distribuição de cada variável?\n- Há valores ausentes? Outliers?\n- Quais features são correlacionadas?\n- Há problemas de qualidade de dados?\n\nPular a EDA é um dos erros mais comuns em ciência de dados — leva a modelos incorretos e conclusões erradas.',
            },
            1: {
              content:
                '## Análise Univariada\n\nPara cada variável independentemente:\n- **Numéricas**: média, mediana, desvio padrão, mín/máx, quartis, histograma, box plot, gráfico KDE\n- **Categóricas**: contagem de valores, gráfico de barras, gráfico de pizza (com moderação)\n\nQuestão principal: a distribuição é normal, assimétrica, bimodal ou uniforme? Tem outliers?',
            },
            2: {
              content:
                '## Análise Bivariada e Multivariada\n\n- **Numérica vs Numérica**: gráfico de dispersão, coeficiente de correlação, gráfico conjunto\n- **Numérica vs Categórica**: box plot, violin plot, point plot\n- **Categórica vs Categórica**: mapa de calor de contagens, gráfico de barras agrupado\n- **Todas vs Todas**: `sns.pairplot()`, mapa de calor de correlação',
            },
            3: { caption: 'Coeficiente de correlação de Pearson r ∈ [-1, 1]. Mede apenas associação linear.' },
            4: {
              title: 'Correlação ≠ Causalidade',
              content:
                'Duas variáveis podem ser altamente correlacionadas sem que uma cause a outra. Sempre procure variáveis de confusão e razões de domínio antes de interpretar correlação como causalidade. O exemplo clássico: vendas de sorvete e taxas de afogamento são correlacionadas com o verão — a variável de confusão é a temperatura.',
            },
            5: { caption: 'Fluxo de trabalho completo de EDA com Pandas e Seaborn' },
            6: {
              items: [
                'Sempre realize EDA antes da modelagem — problemas de qualidade de dados encontrados cedo economizam enorme tempo.',
                'Verifique distribuições (histograma, KDE, box plot) para cada feature numérica individualmente.',
                'Use mapas de calor de correlação e gráficos de dispersão para entender as relações entre features.',
                'A correlação de Pearson mede apenas relações lineares — use Spearman para não-lineares.',
                'Documente todas as descobertas e problemas de qualidade de dados antes de prosseguir para engenharia de features.',
              ],
            },
          },
        },
      },
    },
    'statistical-testing': {
      title: 'Testes Estatísticos e Testes A/B',
      description: 'Testes de hipóteses, intervalos de confiança e design rigoroso de experimentos.',
      lessons: {
        'hypothesis-testing': {
          title: 'Testes de Hipóteses e Testes A/B',
          description: 'p-valores, teste t, qui-quadrado e design de experimentos válidos.',
          blocks: {
            0: {
              content:
                '## Estrutura de Testes de Hipóteses\n\nOs testes de hipóteses são uma estrutura formal para tomar decisões baseadas em dados:\n\n1. **H₀** (hipótese nula): a suposição padrão ("sem efeito", "sem diferença")\n2. **H₁** (hipótese alternativa): o que queremos mostrar ("novo botão aumenta cliques")\n3. Escolha o nível de significância **α** (geralmente 0,05 ou 0,01)\n4. Colete dados, calcule a **estatística de teste**\n5. Calcule o **p-valor**: probabilidade de observar esses dados (ou mais extremos) se H₀ for verdadeira\n6. Se p-valor < α → **rejeite H₀**; caso contrário, não rejeite H₀',
            },
            1: {
              title: 'Interpretando o p-valor',
              content:
                'Um p-valor de 0,03 NÃO significa "há 3% de chance de H₀ ser verdadeira." Significa "se H₀ fosse verdadeira, veríamos dados tão extremos apenas 3% das vezes." Significância estatística ≠ significância prática. Uma amostra muito grande pode tornar efeitos triviais estatisticamente significativos.',
            },
            2: {
              content:
                '## Testes Comuns\n\n- **Teste t (independente)**: compara médias de dois grupos independentes\n- **Teste t (pareado)**: compara médias de duas medições relacionadas nos mesmos sujeitos\n- **ANOVA**: compara médias de 3+ grupos\n- **Teste Qui-quadrado**: testa associação entre duas variáveis categóricas\n- **Mann-Whitney U**: alternativa não paramétrica ao teste t (sem suposição de normalidade)',
            },
            3: { caption: 'Análise de teste A/B com scipy' },
            4: {
              items: [
                'Teste de hipóteses: declare H₀, escolha α, calcule p-valor, decida se rejeita ou não.',
                'p-valor < α significa que o resultado é estatisticamente significativo — não necessariamente praticamente importante.',
                'Testes A/B requerem: atribuição aleatória, tamanho de amostra suficiente, métrica única e regra de parada pré-definida.',
                'Sempre calcule intervalos de confiança, não apenas p-valores — eles mostram magnitude, não apenas direção.',
                'Verifique as suposições do teste (normalidade, independência) antes de aplicar testes paramétricos.',
              ],
            },
          },
        },
      },
    },
  },
};
