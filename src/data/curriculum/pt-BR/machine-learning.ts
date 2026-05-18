import type { SectionTranslation } from '@/types/curriculum-i18n';

export const machineLearningPtBR: SectionTranslation = {
  title: 'Aprendizado de Máquina',
  description: 'Algoritmos supervisionados e não supervisionados, avaliação de modelos e engenharia de features.',
  longDescription:
    'Da regressão linear ao gradient boosting, esta seção cobre os principais algoritmos de ML usados na indústria todos os dias. Você aprenderá não apenas como usar esses algoritmos, mas POR QUE eles funcionam — e quando escolher um em vez de outro.',
  tags: ['Aprendizado Supervisionado', 'Aprendizado Não Supervisionado', 'Scikit-learn', 'XGBoost', 'Engenharia de Features'],
  modules: {
    'supervised-learning': {
      title: 'Aprendizado Supervisionado',
      description: 'Algoritmos que aprendem com exemplos rotulados para fazer previsões.',
      lessons: {
        'linear-regression': {
          title: 'Regressão Linear',
          description: 'Prevendo valores contínuos ajustando a melhor reta (ou hiperplano) aos dados.',
          blocks: {
            0: {
              content:
                '## O Problema de Regressão\n\nA regressão linear responde a uma questão fundamental: **dado um conjunto de features X, podemos prever um resultado contínuo y?** Exemplos:\n- Prever o preço de uma casa a partir de metragem quadrada, localização, idade\n- Prever a pressão arterial de um paciente a partir de variáveis de estilo de vida\n- Prever as vendas do próximo mês a partir de tendências históricas\n\nA hipótese principal: a relação entre X e y é aproximadamente **linear**.',
            },
            1: { caption: 'O modelo linear: w são pesos (inclinações), b é o viés (intercepto).' },
            2: {
              content:
                '## A Função de Perda: Erro Quadrático Médio\n\nTreinamos o modelo encontrando pesos **w** e viés *b* que minimizam o **Erro Quadrático Médio (MSE)** — a diferença média ao quadrado entre previsões e valores reais. Elevar ao quadrado torna a perda sempre positiva e penaliza mais os erros grandes.',
            },
            3: { caption: 'Perda MSE (o ½ é uma conveniência que cancela com o 2 da diferenciação).' },
            4: {
              content:
                '## A Equação Normal (Solução Analítica)\n\nPara regressão linear, podemos derivar os pesos ótimos exatos analiticamente — sem gradiente descendente iterativo. Isso funciona bem para conjuntos de dados pequenos, mas se torna impraticável quando n (features) ou m (amostras) é muito grande devido à inversão da matriz.',
            },
            5: { caption: 'A Equação Normal fornece os pesos ótimos exatos em um único cálculo.' },
            6: {
              content:
                '## Regularização: Ridge e Lasso\n\nQuando um modelo tem muitas features ou as features são correlacionadas, ele pode fazer **overfitting** — memorizar os dados de treino em vez de aprender padrões gerais. A regularização adiciona um termo de penalidade à perda para encolher os pesos:\n\n- **Ridge (L2)**: penaliza a soma dos pesos ao quadrado → encolhe todos os pesos levemente\n- **Lasso (L1)**: penaliza a soma dos valores absolutos dos pesos → leva alguns pesos exatamente a zero (seleção de features)',
            },
            7: { caption: 'λ controla a força da regularização. λ maior = modelo mais simples.' },
            8: {
              content:
                "**A regressão linear é como desenhar a melhor reta em um gráfico de dispersão.** Imagine plotar horas de estudo (eixo x) vs. nota no exame (eixo y). A 'melhor reta' é aquela que fica o mais próxima possível de todos os pontos ao mesmo tempo. O MSE mede a distância média ao quadrado de cada ponto até a reta. O gradiente descendente ajusta a inclinação e o intercepto da reta pouco a pouco até não conseguir mais melhorar.",
            },
            9: { caption: 'Regressão linear com scikit-learn' },
            10: {
              items: [
                'A regressão linear prevê saídas contínuas como uma soma ponderada de features de entrada.',
                'O MSE é a função de perda padrão; minimizá-lo produz a melhor reta/hiperplano de ajuste.',
                'A Equação Normal fornece uma solução analítica; o gradiente descendente escala para conjuntos de dados maiores.',
                'Ridge (L2) encolhe todos os pesos; Lasso (L1) zera features irrelevantes — útil para seleção de features.',
                'Sempre escale as features antes de aplicar regularização (Ridge/Lasso).',
              ],
            },
            11: {
              questions: [
                {
                  question: 'O que significa R² = 1,0?',
                  options: [
                    'O modelo tem erro zero',
                    'O modelo explica toda a variância no alvo — ajuste perfeito',
                    'O modelo faz overfitting nos dados de treino',
                    'O intercepto é igual a 1',
                  ],
                  explanation: 'R² (coeficiente de determinação) mede a proporção de variância em y explicada pelo modelo. R²=1 significa previsão perfeita no conjunto de teste.',
                },
                {
                  question: 'A regressão Lasso é preferida à Ridge quando você deseja:',
                  options: [
                    'Lidar com multicolinearidade',
                    'Realizar seleção automática de features',
                    'Aumentar a complexidade do modelo',
                    'Acelerar o treinamento',
                  ],
                  explanation: 'Lasso usa uma penalidade L1 que leva alguns pesos exatamente a zero, removendo efetivamente essas features do modelo. Ridge encolhe os pesos, mas raramente os define como zero.',
                },
              ],
            },
          },
        },
        'logistic-regression': {
          title: 'Regressão Logística',
          description: 'Classificação via fronteiras de decisão probabilísticas.',
          blocks: {
            0: {
              content:
                '## Da Regressão à Classificação\n\nA regressão logística é o algoritmo padrão para **classificação binária** (spam/não-spam, doença/sem-doença, clique/sem-clique). Apesar do nome, ela prevê **probabilidades**, não valores contínuos.\n\nO truque: aplique a **função sigmoide** a um modelo linear para comprimir qualquer valor real no intervalo (0, 1), tornando-o interpretável como uma probabilidade.',
            },
            1: { caption: 'A função sigmoide mapeia qualquer número real para (0, 1). ŷ > 0,5 → classe 1.' },
            2: {
              content:
                '## Perda de Entropia Cruzada Binária\n\nPara classificação, o MSE não é ideal — usamos **entropia cruzada binária** (log loss). Ela penaliza severamente previsões confidentes erradas.',
            },
            3: { caption: 'Perda de entropia cruzada binária. Minimizá-la maximiza a verossimilhança dos dados sob o modelo.' },
            4: {
              content:
                '## Múltiplas Classes com Softmax\n\nPara K > 2 classes, usamos a **função softmax**, que estende a sigmoide para produzir uma distribuição de probabilidade sobre todas as K classes. Esta é a saída de praticamente todo classificador multi-classe e classificador de rede neural.',
            },
            5: { caption: 'Regressão logística e avaliação com scikit-learn' },
            6: {
              items: [
                'A regressão logística prevê probabilidades passando um modelo linear pela função sigmoide.',
                'A entropia cruzada binária é a perda apropriada para classificação (não o MSE).',
                'O limiar de decisão (padrão 0,5) pode ser ajustado para equilibrar precisão vs. revocação.',
                'Softmax generaliza a regressão logística para K > 2 classes.',
                'ROC-AUC é uma métrica de avaliação independente de limiar para classificadores.',
              ],
            },
          },
        },
        'decision-trees-random-forests': {
          title: 'Árvores de Decisão e Random Forests',
          description: 'De árvores simples a poderosos ensembles — o algoritmo dominante para dados tabulares.',
          blocks: {
            0: {
              content:
                '## Árvores de Decisão\n\nUma árvore de decisão aprende uma sequência de **regras se-então** a partir dos dados. Em cada nó interno, ela divide os dados na feature e limiar que melhor separa as classes. O resultado é uma árvore de decisões que pode ser visualizada e interpretada.\n\n**Critério de divisão** — como medimos a "melhor divisão":\n- **Impureza de Gini** (padrão no sklearn): mede com que frequência um elemento escolhido aleatoriamente seria classificado incorretamente\n- **Ganho de informação / Entropia**: mede a redução na incerteza',
            },
            1: { caption: 'Medidas de impureza em um nó t. Ambas são 0 para um nó puro e máximas quando as classes são igualmente divididas.' },
            2: {
              content:
                '## Métodos de Ensemble: Random Forests\n\nUma única árvore de decisão é propensa a overfitting. **Random Forests** resolvem isso:\n1. Treinando muitas árvores em diferentes **amostras bootstrap** dos dados (bagging)\n2. Em cada divisão, considerando apenas um **subconjunto aleatório de features**\n3. **Calculando a média das previsões** (regressão) ou **votação por maioria** (classificação) em todas as árvores\n\nA combinação de diversidade (dados diferentes + features diferentes) e média reduz dramaticamente a variância mantendo o viés baixo.',
            },
            3: {
              content:
                '## Gradient Boosting: XGBoost e LightGBM\n\nO gradient boosting constrói árvores **sequencialmente** — cada nova árvore corrige os erros de todas as árvores anteriores. É atualmente o algoritmo mais poderoso para **dados tabulares** e domina competições do Kaggle.\n\n- **XGBoost**: implementa gradient boosting com regularização e poda\n- **LightGBM**: ainda mais rápido, crescimento de árvore leaf-wise, lida bem com grandes conjuntos de dados\n- **CatBoost**: tratamento nativo de features categóricas',
            },
            4: { caption: 'Comparação entre Árvore de Decisão, Random Forest e XGBoost' },
            5: {
              items: [
                'Árvores de decisão dividem os dados em features usando medidas de impureza (Gini, entropia).',
                'Random Forests combinam muitas árvores treinadas em amostras bootstrap com subconjuntos aleatórios de features — reduzindo o overfitting.',
                'Gradient Boosting (XGBoost, LightGBM) constrói árvores sequencialmente, corrigindo erros anteriores — estado da arte para dados tabulares.',
                'Importância de features do Random Forest/XGBoost identifica quais entradas orientam as previsões.',
                'Use validação cruzada (não apenas uma divisão treino/teste) para comparar modelos de forma confiável.',
              ],
            },
          },
        },
      },
    },
    'model-evaluation': {
      title: 'Avaliação e Validação de Modelos',
      description: 'Métricas, validação cruzada, o trade-off viés-variância e como evitar vazamento de dados.',
      lessons: {
        'evaluation-metrics': {
          title: 'Métricas de Classificação e Regressão',
          description: 'Precisão, revocação, F1, ROC-AUC, RMSE, MAE — escolhendo a métrica certa para o trabalho.',
          blocks: {
            0: {
              content:
                '## Por que a Acurácia Geralmente Não é Suficiente\n\nImagine um modelo de detecção de fraudes. 99,9% das transações são legítimas. Um modelo que **sempre** prevê "não é fraude" alcançaria 99,9% de acurácia — porém é completamente inútil. Este é o **problema de desequilíbrio de classes**. Precisamos de métricas que exponham o desempenho real em cada classe.',
            },
            1: {
              content:
                '## A Matriz de Confusão\n\nPara classificação binária, todos os quatro resultados são capturados em uma matriz de confusão 2×2:\n\n- **Verdadeiros Positivos (VP)**: corretamente previsto como positivo\n- **Verdadeiros Negativos (VN)**: corretamente previsto como negativo\n- **Falsos Positivos (FP)**: incorretamente previsto como positivo (Erro Tipo I)\n- **Falsos Negativos (FN)**: incorretamente previsto como negativo (Erro Tipo II)',
            },
            2: {
              title: 'Matriz de Confusão',
              lines: [
                '               Previsto: Positivo    Previsto: Negativo',
                '  Real: Pos    |   VP (correto)    |   FN (perdido)    |',
                '  Real: Neg    |   FP (falso alarme)|   VN (correto)    |',
              ],
            },
            3: { caption: 'Precisão: "das previsões positivas, quantas estavam corretas?" Revocação: "dos positivos reais, quantos capturei?"' },
            4: {
              title: 'Trade-off Precisão vs. Revocação',
              content:
                'Aumentar o limiar de decisão aumenta a precisão (menos alarmes falsos), mas reduz a revocação (mais positivos perdidos). Diminuí-lo faz o oposto. O F1 é a média harmônica — use-o quando quiser uma única métrica equilibrada. Use precisão quando falsos positivos são custosos (filtro de spam); use revocação quando falsos negativos são custosos (triagem de câncer).',
            },
            5: {
              content:
                '## Curva ROC e AUC\n\nA **curva ROC** plota a Taxa de Verdadeiros Positivos (revocação) vs. Taxa de Falsos Positivos a cada limiar possível. A **AUC (Área Sob a Curva)** resume em um único número: 0,5 = aleatório, 1,0 = perfeito.\n\nAUC é independente de limiar e robusta ao desequilíbrio de classes — preferida para comparar classificadores em geral.',
            },
            6: {
              content:
                '## Métricas de Regressão\n\n- **MAE**: Erro Absoluto Médio — intuitivo, robusto a outliers\n- **RMSE**: Raiz do Erro Quadrático Médio — penaliza mais os erros grandes, mesmas unidades de y\n- **R²**: proporção da variância explicada (1 = perfeito, 0 = prevê a média, pode ser negativo)',
            },
            8: {
              items: [
                'Acurácia é enganosa para conjuntos de dados desequilibrados — prefira Precisão, Revocação, F1 e AUC.',
                'Precisão: qualidade das previsões positivas. Revocação: cobertura dos positivos reais. F1: média harmônica.',
                'ROC-AUC é independente de limiar e a métrica padrão para comparar classificadores.',
                'RMSE e MAE são as métricas de regressão mais comuns; RMSE é mais sensível a outliers.',
                'Sempre combine a métrica com o custo de negócio de FP vs. FN.',
              ],
            },
          },
        },
        'bias-variance-cv': {
          title: 'Trade-off Viés-Variância e Validação Cruzada',
          description: 'Compreendendo overfitting, underfitting e como estimar o desempenho real do modelo.',
          blocks: {
            0: {
              content:
                '## A Decomposição Viés-Variância\n\nO erro de previsão esperado de qualquer modelo pode ser decomposto em três termos:\n\n- **Viés**: erro de suposições excessivamente simplistas (underfitting)\n- **Variância**: erro de sensibilidade às flutuações nos dados de treinamento (overfitting)\n- **Ruído irredutível**: aleatoriedade inerente nos dados — não pode ser reduzida\n\nO objetivo é encontrar o ponto ideal que minimiza o erro total.',
            },
            2: {
              compareTitle: 'Underfitting vs. Overfitting',
              left: {
                label: 'Underfitting (Alto Viés)',
                items: [
                  'Modelo é muito simples',
                  'Alto erro de treino',
                  'Alto erro de teste',
                  'Solução: modelo mais complexo, mais features',
                ],
              },
              right: {
                label: 'Overfitting (Alta Variância)',
                items: [
                  'Modelo é muito complexo',
                  'Baixo erro de treino',
                  'Alto erro de teste',
                  'Solução: regularização, mais dados, modelo mais simples',
                ],
              },
            },
            3: {
              content:
                '## Validação Cruzada K-Fold\n\nUma única divisão treino/teste fornece uma estimativa ruidosa do desempenho do modelo. A **validação cruzada K-fold** fornece uma estimativa mais confiável:\n1. Dividindo os dados em K folds iguais\n2. Treinando em K-1 folds, avaliando no fold restante\n3. Repetindo K vezes (cada fold serve como conjunto de teste uma vez)\n4. Calculando a média dos K scores\n\nValores típicos de K: 5 ou 10. A **K-fold estratificada** preserva as proporções de classes em cada fold.',
            },
            4: { caption: 'Validação cruzada e curvas de aprendizado com scikit-learn' },
            5: {
              items: [
                'Erro de previsão total = Viés² + Variância + Ruído irredutível.',
                'Underfitting (alto viés): modelo muito simples; corrija com mais complexidade ou features.',
                'Overfitting (alta variância): modelo muito complexo; corrija com regularização ou mais dados.',
                'A validação cruzada K-fold fornece uma estimativa de desempenho mais confiável que uma única divisão treino/teste.',
                'Curvas de aprendizado (erro de treino vs. validação vs. tamanho do conjunto de dados) revelam se você tem um problema de viés ou variância.',
              ],
            },
          },
        },
      },
    },
    'unsupervised-learning': {
      title: 'Aprendizado Não Supervisionado',
      description: 'Agrupamento, redução de dimensionalidade e descoberta de estrutura oculta sem rótulos.',
      lessons: {
        'clustering-pca': {
          title: 'Agrupamento e PCA',
          description: 'K-Means, agrupamento hierárquico, DBSCAN e Análise de Componentes Principais.',
          blocks: {
            0: {
              content:
                '## Agrupamento: Encontrando Grupos Naturais\n\nAgrupamento é a tarefa de agrupar pontos de dados de forma que os pontos do mesmo grupo sejam mais similares entre si do que a pontos de outros grupos — **sem nenhum rótulo**.\n\nAplicações: segmentação de clientes, agrupamento de documentos, detecção de anomalias, análise de expressão gênica.',
            },
            1: {
              content:
                '## Algoritmo K-Means\n\nK-Means particiona n pontos em K clusters alternando entre dois passos:\n1. **Atribuição**: atribua cada ponto ao centroide mais próximo\n2. **Atualização**: recompute cada centroide como a média de seus pontos atribuídos\n\nConverge para um mínimo local da soma dos quadrados dentro do cluster (WCSS). Execute múltiplas vezes com diferentes inicializações (k-means++) para encontrar uma boa solução.',
            },
            2: { caption: 'Objetivo do K-Means: minimize a soma dos quadrados das distâncias dentro do cluster aos centroides.' },
            3: {
              content:
                '## Análise de Componentes Principais (PCA)\n\nO PCA encontra as direções de máxima variância nos dados e os projeta em um subespaço de dimensão menor. É a técnica de redução de dimensionalidade mais amplamente usada:\n\n1. Centralize os dados (subtraia a média)\n2. Compute a matriz de covariância\n3. Encontre autovalores e autovetores da matriz de covariância\n4. Projete os dados nos k principais autovetores (componentes principais)\n\nO primeiro CP explica a maior variância, o segundo explica a próxima maior (e é ortogonal ao primeiro), e assim por diante.',
            },
            4: { caption: 'Projete os dados nos k principais componentes (autovetores).' },
            5: { caption: 'K-Means e PCA com scikit-learn' },
            6: {
              items: [
                'K-Means alterna entre atribuir pontos ao centroide mais próximo e recomputar os centroides.',
                'Use o Método do Cotovelo (WCSS vs. K) ou Pontuação de Silhueta para escolher o número de clusters.',
                'DBSCAN encontra clusters de formas arbitrárias e é robusto a outliers.',
                'PCA encontra direções de máxima variância e projeta os dados em menos dimensões.',
                'Sempre escale os dados antes do agrupamento ou PCA — ambos são sensíveis às escalas das features.',
              ],
            },
          },
        },
      },
    },
  },
};
