import type { SectionTranslation } from '@/types/curriculum-i18n';

export const foundationsPtBR: SectionTranslation = {
  title: 'Fundamentos',
  description: 'Matemática, estatística e programação essenciais para ciência de dados.',
  longDescription:
    'Uma base sólida em álgebra linear, probabilidade, estatística e Python é o alicerce de todos os tópicos avançados em ciência de dados e IA. Esta seção constrói essa intuição do zero.',
  tags: ['Matemática', 'Estatística', 'Python', 'Álgebra Linear', 'Probabilidade'],
  modules: {
    'linear-algebra': {
      title: 'Álgebra Linear',
      description: 'Escalares, vetores, matrizes e as operações que impulsionam o aprendizado de máquina.',
      lessons: {
        'scalars-vectors-matrices': {
          title: 'Escalares, Vetores e Matrizes',
          description: 'Os três objetos fundamentais da álgebra linear — e por que eles importam para todo modelo de ML.',
          blocks: {
            0: {
              content:
                '## Por que Álgebra Linear?\n\nTodo modelo de aprendizado de máquina — desde uma simples regressão linear até um transformer de bilhões de parâmetros — é construído sobre um pequeno conjunto de objetos matemáticos: **escalares**, **vetores** e **matrizes**. Compreender esses objetos profundamente significa entender *por que* os modelos funcionam, não apenas *como* usá-los.\n\nPense na álgebra linear como a gramática do aprendizado de máquina. Assim como você precisa de gramática para construir frases, você precisa de álgebra linear para construir modelos.',
            },
            1: {
              title: 'Conexão com o mundo real',
              content:
                'Uma imagem em escala de cinza é uma matriz de intensidades de pixel. Uma imagem colorida é um tensor 3D (altura × largura × 3 canais). Um lote de imagens alimentado em uma rede neural é um tensor 4D. A álgebra linear está em todos os lugares.',
            },
            2: {
              content:
                '## Escalares\n\nUm **escalar** é simplesmente um único número. Possui magnitude, mas não direção. Exemplos: temperatura (23°C), preço (R$49,99), a acurácia de um modelo (0,94).\n\nNa notação, escalares geralmente são escritos em itálico minúsculo: *x*, *α*, *λ*.',
            },
            3: { caption: 'Escalares pertencem ao conjunto dos números reais ℝ.' },
            4: {
              content:
                '## Vetores\n\nUm **vetor** é uma lista ordenada de números. Possui magnitude e direção. Em ciência de dados, um vetor frequentemente representa um único **ponto de dados** (uma linha de features) ou uma lista de **pesos** dentro de um modelo.\n\nVetores são escritos em negrito minúsculo: **v**, **w**, **x**.',
            },
            5: { caption: 'Um vetor coluna no espaço n-dimensional.' },
            6: {
              content:
                '**Imagine que você está descrevendo uma casa.** Você poderia dizer: "Ela tem 3 quartos, 2 banheiros e custa R$900.000." Isso é um vetor: [3, 2, 900000]. Cada número captura uma característica da casa. Quando um modelo de aprendizado de máquina lê isso, ele vê um ponto no espaço 3D das "casas". Casas semelhantes estarão próximas; casas muito diferentes estarão longe.',
            },
            7: {
              content:
                '## Matrizes\n\nUma **matriz** é uma grade 2D de números — linhas e colunas. Em ciência de dados, uma matriz **A** de formato m×n pode representar:\n- Um conjunto de dados com m amostras e n features\n- Os pesos que conectam duas camadas em uma rede neural\n- Uma transformação que rotaciona, escala ou projeta vetores',
            },
            8: { caption: 'Uma matriz 3×3. O elemento a_{ij} está na linha i, coluna j.' },
            9: {
              content:
                '## Tensores\n\nUm **tensor** generaliza escalares, vetores e matrizes para qualquer número de dimensões (chamado de *rank* ou *ordem*):\n- Rank 0 → escalar\n- Rank 1 → vetor\n- Rank 2 → matriz\n- Rank 3+ → tensor\n\nFrameworks de aprendizado profundo como PyTorch e TensorFlow levam o nome de tensores porque todos os dados e parâmetros do modelo são armazenados e manipulados como tensores.',
            },
            10: { title: 'Hierarquia de Objetos Matemáticos' },
            11: { caption: 'Criando escalares, vetores, matrizes e tensores com NumPy' },
            12: {
              items: [
                'Um **escalar** é um único número; um **vetor** é uma lista ordenada; uma **matriz** é uma grade 2D.',
                'Tensores generalizam os três — rank 0 = escalar, rank 1 = vetor, rank 2 = matriz.',
                'Em ciência de dados, as linhas de um conjunto de dados são vetores; o conjunto inteiro é uma matriz.',
                'Os pesos de redes neurais são armazenados como matrizes (e tensores de rank maior).',
                'NumPy é a biblioteca Python padrão para trabalhar com esses objetos de forma eficiente.',
              ],
            },
            13: {
              quizTitle: 'Verificação Rápida',
              questions: [
                {
                  question: 'Uma imagem colorida de 256×256 pixels com canais RGB tem qual formato de tensor?',
                  options: ['(256, 256)', '(256, 256, 3)', '(3, 256)', '(256, 3, 3)'],
                  explanation: 'Uma imagem colorida tem altura × largura × canais = (256, 256, 3). Os 3 canais são Vermelho, Verde e Azul.',
                },
                {
                  question: 'Qual dos seguintes é um vetor?',
                  options: ['42', '[[1,2],[3,4]]', '[0.8, 0.1, 0.1]', 'np.zeros((5,5,5))'],
                  explanation: '[0.8, 0.1, 0.1] é um array 1D com 3 elementos — um vetor. 42 é um escalar; [[1,2],[3,4]] é uma matriz; np.zeros((5,5,5)) é um tensor de rank 3.',
                },
                {
                  question: 'Em um conjunto de dados com 1000 pacientes e 20 features médicas cada, a matriz de dados tem formato:',
                  options: ['(20, 1000)', '(1000, 20)', '(1000,)', '(20,)'],
                  explanation: 'Convenção: linhas = amostras, colunas = features. Portanto, 1000 pacientes × 20 features = formato (1000, 20).',
                },
              ],
            },
          },
        },
        'vector-operations': {
          title: 'Operações com Vetores',
          description: 'Adição, produto interno, normas — as operações fundamentais que aparecem em todo lugar no ML.',
          blocks: {
            0: {
              content:
                '## Operando com Vetores\n\nVetores não são apenas contêineres de números — eles suportam operações poderosas que formam a espinha dorsal dos algoritmos de aprendizado de máquina. Nesta lição, cobrimos as quatro operações que você encontrará em todo modelo: adição, multiplicação por escalar, produto interno e normas.',
            },
            1: {
              content:
                '### Adição de Vetores\n\nDois vetores da mesma dimensão podem ser somados elemento a elemento. Geometricamente, é "seguir uma seta e depois outra."',
            },
            3: {
              content:
                '### Multiplicação por Escalar\n\nMultiplicar um vetor por um escalar o estica ou o comprime (e inverte sua direção se o escalar for negativo).',
            },
            5: {
              content:
                '### O Produto Interno (Dot Product)\n\nO **produto interno** (produto escalar) de dois vetores produz um único escalar. Ele mede o quanto dois vetores apontam na mesma direção.\n\nNo ML, o produto interno aparece em:\n- Predições de regressão linear: **w**·**x**\n- Similaridade cosseno em PLN\n- Cada computação de neurônio em uma rede neural',
            },
            6: { caption: 'O produto interno é igual a |u||v|cos(θ), onde θ é o ângulo entre os vetores.' },
            7: {
              title: 'Intuição Geométrica do Produto Interno',
              content:
                'Quando **u**·**v** > 0, os vetores apontam em direções semelhantes. Quando **u**·**v** = 0, eles são *ortogonais* (perpendiculares). Quando **u**·**v** < 0, apontam em direções opostas. Essa é a base da **similaridade cosseno** usada em sistemas de recomendação e PLN.',
            },
            8: {
              content:
                '### Normas de Vetores\n\nUma **norma** mede o "comprimento" ou "magnitude" de um vetor. Normas diferentes enfatizam propriedades diferentes:\n\n- **Norma L1** (Manhattan): soma dos valores absolutos\n- **Norma L2** (Euclidiana): raiz quadrada da soma dos quadrados — a mais comum\n- **Norma L∞** (Máximo): o maior valor absoluto\n\nNormas aparecem na regularização (L1 = Lasso, L2 = Ridge) e no cálculo de distâncias entre pontos de dados.',
            },
            10: {
              content:
                '**O produto interno é como perguntar "você concorda comigo?"** Imagine as opiniões de duas pessoas representadas como vetores. Se elas concordam principalmente (mesma direção), o produto interno é grande e positivo. Se discordam completamente (direções opostas), é negativo. Se suas visões são totalmente não relacionadas (perpendiculares), é zero. Exatamente assim funciona a busca por similaridade no Google ou nas recomendações da Netflix.',
            },
            11: { caption: 'Operações com vetores no NumPy' },
            12: {
              items: [
                'Adição de vetores e multiplicação por escalar são operações elemento a elemento.',
                'O **produto interno** mede similaridade direcional — negativo quando os vetores se opõem, zero quando ortogonais, positivo quando alinhados.',
                'A **norma L2** é o comprimento euclidiano de um vetor; **L1** e **L2** são usadas na regularização para evitar overfitting.',
                'Similaridade cosseno = produto interno ÷ (produto das normas) — usada em tarefas de texto e recomendação.',
              ],
            },
            13: {
              questions: [
                {
                  question: 'Se u = [1, 0] e v = [0, 1], qual é u · v?',
                  options: ['1', '0', '√2', '2'],
                  explanation: 'u · v = 1×0 + 0×1 = 0. Os vetores são ortogonais (perpendiculares), portanto seu produto interno é 0.',
                },
                {
                  question: 'Qual é a norma L2 de v = [3, 4]?',
                  options: ['7', '25', '5', '3,5'],
                  explanation: '‖v‖₂ = √(3² + 4²) = √(9 + 16) = √25 = 5. Este é o clássico triângulo retângulo 3-4-5.',
                },
                {
                  question: 'Qual técnica de regularização usa a penalidade da norma L1?',
                  options: ['Ridge', 'Dropout', 'Lasso', 'Batch Norm'],
                  explanation: 'A regressão Lasso adiciona uma penalidade igual a λ‖w‖₁ (norma L1 dos pesos). Ridge usa L2. L1 tende a produzir pesos esparsos (muitos zeros), realizando seleção de features.',
                },
              ],
            },
          },
        },
        'matrix-operations': {
          title: 'Operações com Matrizes e Decomposições',
          description: 'Multiplicação, transposta, inversa, autovalores e SVD — os motores da redução de dimensionalidade.',
          blocks: {
            0: {
              content:
                '## Multiplicação de Matrizes\n\nA multiplicação de matrizes **não** é elemento a elemento — é uma série de produtos internos. Se **A** é m×k e **B** é k×n, seu produto **C** = **AB** é m×n, onde cada elemento é:\n\n$$C_{ij} = \\sum_{k} A_{ik} B_{kj}$$\n\nEssa operação é a computação central em redes neurais, onde cada passagem direta multiplica vetores de entrada por matrizes de pesos.',
            },
            1: { caption: 'As dimensões internas devem coincidir (ambas iguais a k). O resultado herda as dimensões externas.' },
            2: {
              title: 'Multiplicação de matrizes NÃO é comutativa',
              content: 'AB ≠ BA em geral. Sempre verifique se os formatos são compatíveis: para AB, o número de colunas de A deve ser igual ao número de linhas de B.',
            },
            3: {
              content:
                '## Transposta\n\nA **transposta** de uma matriz a vira ao longo de sua diagonal — linhas viram colunas. Notação: **A**ᵀ. Propriedades:\n- (Aᵀ)ᵀ = A\n- (AB)ᵀ = BᵀAᵀ (observe a inversão!)\n- Uma matriz simétrica satisfaz A = Aᵀ',
            },
            4: {
              content:
                '## Autovalores e Autovetores\n\nUm **autovetor** da matriz **A** é um vetor especial **v** que, quando multiplicado por **A**, é apenas escalado (sem rotação). O fator de escala é o **autovalor** λ:\n\nA decomposição espectral revela as "direções principais" e "magnitudes" de uma transformação linear. Essa é a base do **PCA** (Análise de Componentes Principais).',
            },
            5: { caption: 'A mapeia o autovetor v para λv — mesma direção, escalado por λ.' },
            6: { caption: 'A equação característica. Suas soluções são os autovalores.' },
            7: {
              content:
                '## Decomposição em Valores Singulares (SVD)\n\nA SVD é indiscutivelmente a decomposição de matrizes mais importante em ciência de dados. Toda matriz **A** (mesmo não quadrada) pode ser decomposta como:\n\n$$A = U \\Sigma V^T$$\n\n- **U** (m×m): Vetores singulares à esquerda — ortogonais, representam direções de "saída"\n- **Σ** (m×n): Matriz diagonal de valores singulares (não negativos), ordenados em ordem decrescente\n- **Vᵀ** (n×n): Vetores singulares à direita — ortogonais, representam direções de "entrada"\n\nAplicações: **PCA**, **compressão de imagens**, **sistemas de recomendação** (filtragem colaborativa), **LSA em PLN**.',
            },
            8: { caption: 'Truncar para os k maiores valores singulares dá a melhor aproximação de rank k (teorema de Eckart–Young).' },
            9: {
              content:
                '**A SVD é como encontrar a melhor forma de resumir um livro.** Imagine uma enorme tabela de avaliações "quem assistiu qual filme". A SVD encontra temas ocultos (gêneros como Ação, Romance, Comédia) que explicam a maioria das avaliações. Você pode então descrever cada usuário e cada filme por apenas alguns scores de tema — muito mais compacto que a tabela original. É exatamente assim que a filtragem colaborativa estilo Netflix funciona.',
            },
            10: { caption: 'Operações com matrizes e SVD no NumPy' },
            11: {
              items: [
                'A multiplicação de matrizes exige que as dimensões internas coincidam; o formato resultante é (dimensões externas).',
                'Autovetores mostram as direções que uma matriz "estica"; autovalores mostram o quanto.',
                'A SVD decompõe *qualquer* matriz em U·Σ·Vᵀ — a base do PCA e da filtragem colaborativa.',
                'Uma aproximação de rank k usando os k maiores valores singulares dá o melhor ajuste de baixo rank.',
                'Essas decomposições nos permitem comprimir dados e descobrir estrutura oculta.',
              ],
            },
          },
        },
      },
    },
    'probability-statistics': {
      title: 'Probabilidade e Estatística',
      description: 'Dos axiomas básicos de probabilidade até Bayes — a linguagem da incerteza.',
      lessons: {
        'probability-fundamentals': {
          title: 'Fundamentos de Probabilidade',
          description: 'Espaços amostrais, eventos, probabilidade condicional e os axiomas que unem tudo.',
          blocks: {
            0: {
              content:
                '## O que é Probabilidade?\n\nProbabilidade é a **linguagem matemática da incerteza**. Todo modelo de aprendizado de máquina faz previsões sob incerteza — um classificador diz "este e-mail tem 94% de probabilidade de ser spam" em vez de um sim/não definitivo. Compreender probabilidade é, portanto, essencial para entender *o que um modelo realmente está dizendo*.\n\nA probabilidade atribui um número entre 0 e 1 a eventos:\n- **P(A) = 0** → o evento A é impossível\n- **P(A) = 1** → o evento A é certo\n- **P(A) = 0,7** → o evento A acontece 70% das vezes em média',
            },
            1: {
              content:
                '## Os Três Axiomas (Kolmogorov)\n\nToda a teoria da probabilidade repousa em três regras simples:\n1. **Não-negatividade**: P(A) ≥ 0 para todos os eventos A\n2. **Normalização**: P(Ω) = 1 (algo sempre acontece)\n3. **Aditividade**: Se A e B são mutuamente exclusivos, P(A ∪ B) = P(A) + P(B)',
            },
            2: {
              content:
                '## Probabilidade Condicional\n\nA probabilidade condicional pergunta: **"Qual é a probabilidade de A, dado que B já ocorreu?"** Ela atualiza nossa crença com base em novas informações.',
            },
            3: { caption: 'Restringimos nosso foco ao universo onde B ocorreu e perguntamos com que frequência A acontece lá.' },
            4: {
              content:
                "## Teorema de Bayes\n\nO teorema de Bayes é uma das ideias mais poderosas da estatística. Ele nos diz como **reverter** probabilidades condicionais — para atualizar nossas crenças com base em novas evidências.",
            },
            5: { caption: 'Posterior = (Verossimilhança × Priori) / Evidência' },
            6: {
              title: 'Teorema de Bayes em Linguagem Simples',
              content:
                '**Priori** P(A): o que acreditávamos antes de ver B. **Verossimilhança** P(B|A): quão provável é a evidência se A é verdadeiro. **Posterior** P(A|B): nossa crença atualizada após ver B. O raciocínio bayesiano é como filtros de spam, ferramentas de diagnóstico médico e modelos de linguagem funcionam em sua essência.',
            },
            7: {
              content:
                '**Pense no Teorema de Bayes como um médico atualizando um diagnóstico.** O médico começa com uma crença prévia: "5% das pessoas com este sintoma têm a Doença X." Então um exame volta positivo. O exame tem 90% de precisão. Agora o médico atualiza: "Dado o teste positivo, quais são as chances de Doença X?" A resposta NÃO é 90% — depende de quão rara é a doença (a priori). O teorema de Bayes dá a fórmula exata para essa atualização.',
            },
            8: { caption: 'Teorema de Bayes: o clássico exemplo do exame médico' },
            9: {
              items: [
                'Probabilidade é um número em [0, 1] que mede a probabilidade de um evento.',
                'Probabilidade condicional P(A|B) restringe o espaço amostral ao universo onde B ocorreu.',
                'O teorema de Bayes inverte o condicionamento: P(A|B) a partir de P(B|A), P(A) e P(B).',
                'Uma doença rara + alta precisão do teste ainda pode gerar muitos falsos positivos — considere sempre a priori.',
                'O raciocínio bayesiano é a base de filtros de spam, classificadores Naïve Bayes e ML probabilístico.',
              ],
            },
            10: {
              questions: [
                {
                  question: 'P(A|B) = 0 significa:',
                  options: [
                    'A e B são independentes',
                    'A não pode ocorrer quando B ocorreu',
                    'B não pode ocorrer',
                    'A sempre ocorre quando B ocorre',
                  ],
                  explanation: 'P(A|B) = 0 significa que a probabilidade de A dado B é zero — A nunca acontece no universo onde B ocorreu.',
                },
                {
                  question: "No teorema de Bayes P(A|B) = P(B|A)·P(A) / P(B), o que é P(A) chamado?",
                  options: ['Verossimilhança', 'Posterior', 'Priori', 'Evidência'],
                  explanation: 'P(A) é a **priori** — nossa crença sobre A antes de observar B. P(B|A) é a verossimilhança, P(B) é a evidência e P(A|B) é a posterior.',
                },
              ],
            },
          },
        },
        'probability-distributions': {
          title: 'Distribuições de Probabilidade',
          description: 'A Gaussiana, Bernoulli, Binomial e mais — e o Teorema Central do Limite.',
          blocks: {
            0: {
              content:
                '## O que é uma Distribuição?\n\nUma distribuição de probabilidade nos diz quão provável é cada valor possível de uma variável aleatória. Existem duas famílias principais:\n\n- **Distribuições discretas**: para resultados contáveis (lançamentos de moeda, contagens de palavras)\n- **Distribuições contínuas**: para resultados de valor real (altura, temperatura, confiança do modelo)',
            },
            1: {
              content:
                '## A Distribuição Normal (Gaussiana)\n\nA distribuição mais importante de toda a estatística. Ela aparece naturalmente quando muitos efeitos aleatórios pequenos e independentes se somam — alturas, erros de medição, resíduos na regressão linear. Caracterizada inteiramente por sua **média μ** e **desvio padrão σ**.',
            },
            2: { caption: 'A função densidade de probabilidade (PDF) da distribuição gaussiana.' },
            3: {
              title: 'A Regra 68-95-99,7',
              content:
                'Para uma distribuição gaussiana: 68% dos dados caem dentro de 1σ da média, 95% dentro de 2σ e 99,7% dentro de 3σ. Essa regra é usada constantemente em detecção de anomalias e testes A/B.',
            },
            4: {
              content:
                '## As Distribuições Bernoulli e Binomial\n\n**Bernoulli(p)**: modela um único resultado binário (sucesso/fracasso) com probabilidade p de sucesso. Usada para alvos de classificação binária.\n\n**Binomial(n, p)**: modela o número de sucessos em n tentativas independentes de Bernoulli.',
            },
            5: { caption: 'PMF Binomial: probabilidade de exatamente k sucessos em n tentativas.' },
            6: {
              content:
                '## O Teorema Central do Limite (TCL)\n\nTalvez o teorema mais importante da estatística: **independentemente da distribuição original**, a distribuição amostral da média de n variáveis aleatórias independentes se aproxima de uma gaussiana quando n → ∞.\n\nIsso justifica o uso da distribuição gaussiana para modelar médias e fundamenta testes de hipótese, intervalos de confiança e testes A/B.',
            },
            7: { caption: 'A média amostral converge em distribuição para uma gaussiana, independentemente da distribuição populacional.' },
            8: {
              content:
                "**Por que tantas coisas seguem uma curva em sino?** Role um dado: você obtém uma distribuição plana (cada valor de 1 a 6 igualmente provável). Role dois dados e some-os: você começa a ver uma forma de tenda. Role dez dados e some-os: você obtém uma curva em sino quase perfeita. Esse é o Teorema Central do Limite — some variáveis aleatórias suficientes e você sempre obtém uma curva em sino. É por isso que alturas, notas de provas e erros de modelos tendem a parecer gaussianos.",
            },
            9: { caption: 'Trabalhando com distribuições usando NumPy e SciPy' },
            10: {
              items: [
                'Distribuições descrevem a probabilidade de cada valor possível de uma variável aleatória.',
                'A Gaussiana (Normal) é parametrizada por μ (média) e σ (desvio padrão); 68/95/99,7% dos dados caem dentro de 1/2/3 desvios padrão.',
                'Bernoulli modela resultados binários; Binomial conta sucessos em n tentativas.',
                'O **Teorema Central do Limite** garante que as médias amostrais são aproximadamente gaussianas — a pedra angular da inferência estatística.',
                'O módulo `stats` do SciPy fornece PDF, CDF e amostragem para todas as distribuições comuns.',
              ],
            },
          },
        },
      },
    },
    'optimization': {
      title: 'Cálculo e Otimização',
      description: 'Gradientes, gradiente descendente e como modelos aprendem minimizando a perda.',
      lessons: {
        'gradient-descent': {
          title: 'Gradiente Descendente',
          description: 'Como os modelos de aprendizado de máquina encontram seus parâmetros ótimos seguindo a inclinação ladeira abaixo.',
          blocks: {
            0: {
              content:
                '## O Problema de Otimização\n\nTodo modelo de aprendizado de máquina tem uma **função de perda** (também chamada de função de custo ou objetivo) que mede o quão erradas são suas previsões. Treinar um modelo significa encontrar o conjunto de **parâmetros** (pesos) que minimiza essa perda.\n\nIsso é um problema de otimização. Para a maioria dos modelos de ML, não podemos resolvê-lo analiticamente (de forma fechada), então usamos métodos numéricos iterativos — o mais fundamental dos quais é o **gradiente descendente**.',
            },
            1: {
              content:
                '## Derivadas e Gradientes\n\nA **derivada** de uma função nos diz sua inclinação em cada ponto. Para uma função de múltiplas variáveis (como uma função de perda com milhões de parâmetros), a generalização é o **gradiente** — um vetor de derivadas parciais, uma para cada parâmetro.',
            },
            2: { caption: 'O gradiente ∇J(θ) aponta na direção de maior inclinação ascendente.' },
            3: {
              content:
                '## A Regra de Atualização do Gradiente Descendente\n\nO gradiente descendente dá pequenos passos **opostos** ao gradiente (ladeira abaixo). O tamanho do passo é controlado pela **taxa de aprendizado** α (alfa). Após cada passo, recomputamos o gradiente na nova posição e damos outro passo.',
            },
            4: { caption: 'A atualização de parâmetros: mova-se na direção de maior descida com tamanho de passo α.' },
            5: {
              title: 'Escolhendo a Taxa de Aprendizado',
              content:
                'Muito grande → o algoritmo ultrapassa e diverge. Muito pequena → o treinamento é extremamente lento. Otimizadores adaptativos (Adam, RMSprop) ajustam automaticamente a taxa de aprendizado por parâmetro, por isso são preferidos no aprendizado profundo.',
            },
            6: {
              content:
                '## Variantes do Gradiente Descendente\n\n- **GD em Lote (Batch GD)**: usa todos os dados de treinamento para computar o gradiente a cada passo. Estável, mas lento para grandes conjuntos de dados.\n- **GD Estocástico (SGD)**: usa uma amostra aleatória por passo. Rápido, mas ruidoso.\n- **GD de Mini-Lote (Mini-batch GD)**: usa um pequeno lote (32–512 amostras). O melhor dos dois mundos — o padrão no aprendizado profundo.\n\n**Adam** (Estimativa de Momento Adaptativo) é o otimizador mais popular: mantém taxas de aprendizado por parâmetro usando estimativas do primeiro e segundo momentos dos gradientes.',
            },
            7: { caption: 'Adam: m é o primeiro momento (momentum), v é o segundo momento (escala adaptativa).' },
            8: {
              content:
                "**O gradiente descendente é como encontrar o fundo de um vale com os olhos vendados.** Você só pode sentir a inclinação sob seus pés. Então dá um pequeno passo na direção descendente, para, sente a inclinação novamente e dá outro passo. Se seus passos são muito grandes, você pode saltar o vale e pousar em outra colina. Se são muito pequenos, levará uma eternidade para chegar ao fundo. Uma boa taxa de aprendizado é um tamanho de passo que é exatamente certo. Adam é como um caminhante inteligente que ajusta seu comprimento de passada com base no terreno.",
            },
            9: { caption: 'Implementando gradiente descendente do zero para regressão linear' },
            10: {
              items: [
                'O gradiente aponta na direção de maior inclinação ascendente; o gradiente descendente move-se na direção *oposta*.',
                'A taxa de aprendizado α controla o tamanho do passo — muito grande diverge, muito pequena é lenta.',
                'O gradiente descendente de mini-lote (tamanho de lote 32-512) é o padrão no aprendizado profundo.',
                'Adam adapta a taxa de aprendizado por parâmetro usando momentum do gradiente — o otimizador padrão para redes neurais.',
                'O gradiente descendente encontra um mínimo *local*; para perdas convexas (como MSE), o mínimo local é o global.',
              ],
            },
            11: {
              questions: [
                {
                  question: 'Se o gradiente no ponto atual é positivo, o gradiente descendente irá:',
                  options: [
                    'Aumentar θ',
                    'Diminuir θ',
                    'Parar de atualizar θ',
                    'Dobrar a taxa de aprendizado',
                  ],
                  explanation: 'θ ← θ - α·∇J(θ). Se ∇J(θ) > 0, então θ diminui. Movemo-nos ladeira abaixo — oposto ao gradiente.',
                },
                {
                  question: 'O que o otimizador Adam adapta?',
                  options: [
                    'O tamanho do lote',
                    'O número de camadas',
                    'A taxa de aprendizado por parâmetro',
                    'A função de perda',
                  ],
                  explanation: 'Adam mantém taxas de aprendizado por parâmetro usando estimativas do primeiro e segundo momentos dos gradientes, tornando-o adaptativo e geralmente mais robusto que o SGD com taxa de aprendizado fixa.',
                },
              ],
            },
          },
        },
      },
    },
    'python-data-science': {
      title: 'Python para Ciência de Dados',
      description: 'NumPy, Pandas e Matplotlib — o kit de ferramentas essencial.',
      lessons: {
        'numpy-pandas-essentials': {
          title: 'Essenciais de NumPy e Pandas',
          description: 'Domine as duas bibliotecas mais importantes para manipulação de dados em Python.',
          blocks: {
            0: {
              content:
                '## NumPy: Python Numérico\n\nNumPy fornece o `ndarray` — um array multidimensional eficiente otimizado para computação numérica. Operações em arrays NumPy são implementadas em C, tornando-as 10–100× mais rápidas que loops Python puros.\n\nConceitos-chave: **broadcasting**, **vetorização**, **indexação sofisticada**.',
            },
            1: { caption: 'Fundamentos de NumPy' },
            2: {
              content:
                '## Pandas: Biblioteca de Análise de Dados\n\nPandas fornece duas estruturas principais:\n- **Series**: um array rotulado 1D\n- **DataFrame**: uma tabela 2D com colunas nomeadas — o principal instrumento de análise de dados\n\nPense em um DataFrame como uma planilha ou tabela SQL, mas com todo o poder do Python.',
            },
            3: { caption: 'Fundamentos de Pandas' },
            4: {
              items: [
                'Arrays NumPy são 10-100× mais rápidos que listas Python para computação numérica via vetorização.',
                'Broadcasting permite operações entre arrays de formas diferentes, mas compatíveis.',
                'DataFrames do Pandas são a estrutura de dados primária para dados tabulares em Python.',
                '`.groupby()` + funções de agregação (mean, sum, count) são essenciais para sumarização de dados.',
                'Sempre verifique valores ausentes com `.isnull().sum()` antes da modelagem.',
              ],
            },
          },
        },
      },
    },
  },
};
