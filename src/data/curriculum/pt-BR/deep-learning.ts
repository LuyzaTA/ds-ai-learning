import type { SectionTranslation } from '@/types/curriculum-i18n';

export const deepLearningPtBR: SectionTranslation = {
  title: 'Aprendizado Profundo',
  description: 'Redes neurais, backpropagation, CNNs, RNNs e a arquitetura Transformer.',
  longDescription:
    'O aprendizado profundo está por trás de cada grande avanço moderno: reconhecimento de imagens, modelos de linguagem, síntese de voz e IA generativa. Esta seção constrói sua compreensão desde um único neurônio até o Transformer.',
  tags: ['Redes Neurais', 'PyTorch', 'CNN', 'LSTM', 'Transformer', 'Backpropagation'],
  modules: {
    'neural-networks': {
      title: 'Fundamentos de Redes Neurais',
      description: 'Do perceptron a redes multicamadas profundas.',
      lessons: {
        'neural-network-basics': {
          title: 'Como Redes Neurais Funcionam',
          description: 'Neurônios, camadas, ativações, passagem direta e backpropagation explicados desde os primeiros princípios.',
          blocks: {
            0: {
              content:
                '## O Neurônio Artificial\n\nUm neurônio artificial recebe um vetor de entradas, computa uma soma ponderada, adiciona um viés e aplica uma **função de ativação não linear**. Essa não-linearidade é o que torna as redes profundas poderosas — sem ela, empilhar camadas é equivalente a uma única transformação linear.',
            },
            1: { caption: 'Neurônio único: soma ponderada + viés, passada pela função de ativação f.' },
            2: {
              content:
                '## Funções de Ativação\n\nFunções de ativação introduzem não-linearidade. As mais importantes:\n\n- **Sigmoide**: σ(z) = 1/(1+e⁻ᶻ) — comprime para (0,1). Usada na camada de saída para classificação binária. Sofre de gradientes que desaparecem em redes profundas.\n- **Tanh**: comprime para (-1,1). Centrada em zero, ligeiramente melhor que sigmoide para camadas ocultas.\n- **ReLU** (Unidade Linear Retificada): f(z) = max(0, z) — o padrão para camadas ocultas. Rápida, evita gradientes que desaparecem.\n- **Leaky ReLU / ELU**: abordam o problema de "ReLU morta" (neurônios presos em 0).\n- **Softmax**: vetor → distribuição de probabilidade. Usada na camada de saída para classificação multi-classe.',
            },
            4: {
              content:
                '## Passagem Direta e Reversa\n\nTreinar uma rede neural envolve duas passagens:\n\n1. **Passagem direta (forward pass)**: a entrada flui por todas as camadas para produzir previsões e calcular a perda\n2. **Passagem reversa (backpropagation)**: a regra da cadeia computa os gradientes da perda em relação a cada parâmetro, fluindo da saída para a entrada\n\nA regra da cadeia é o coração matemático da backpropagation.',
            },
            5: { caption: 'Regra da cadeia: os gradientes são multiplicados camada por camada da saída de volta ao parâmetro.' },
            6: {
              title: 'Gradientes que Desaparecem',
              content:
                "Ao usar ativações sigmoide em redes profundas, os gradientes encolhem exponencialmente ao se propagar por muitas camadas (pois σ'(z) ≤ 0,25). Camadas próximas à entrada mal se atualizam. A ReLU resolve em grande parte esse problema; a Normalização em Lote (Batch Normalisation) estabiliza ainda mais o treinamento.",
            },
            7: {
              content:
                '**Uma rede neural é como uma linha de montagem de fábrica.** Cada trabalhador (neurônio) recebe materiais da estação anterior, aplica uma transformação e passa o resultado adiante. Após concluir um produto, um inspetor (função de perda) mede o quão ruim ele é. A fábrica então ajusta as instruções de cada trabalhador, começando da última estação e trabalhando para trás, para que o próximo produto seja melhor. Esse processo de ajuste reverso é a backpropagation.',
            },
            8: { caption: 'Construindo e treinando uma rede neural com PyTorch' },
            9: {
              items: [
                'Um neurônio computa: ativação = f(soma ponderada + viés). Funções de ativação não lineares são essenciais.',
                'ReLU é a ativação padrão para camadas ocultas: rápida, evita gradientes que desaparecem.',
                'Backpropagation aplica a regra da cadeia para calcular gradientes da perda em relação a todos os parâmetros.',
                'Batch Normalisation estabiliza o treinamento; Dropout previne overfitting.',
                'O otimizador Adam adapta as taxas de aprendizado por parâmetro e converge mais rápido que o SGD simples.',
              ],
            },
          },
        },
      },
    },
    'cnn': {
      title: 'Redes Neurais Convolucionais',
      description: 'Como as CNNs processam imagens usando conexões locais e pesos compartilhados.',
      lessons: {
        'cnn-fundamentals': {
          title: 'Arquitetura CNN e Visão Computacional',
          description: 'Convolução, pooling, aprendizado por transferência e arquiteturas CNN modernas.',
          blocks: {
            0: {
              content:
                '## Por que Não Usar MLPs Simples para Imagens?\n\nUma imagem RGB de 224×224 tem 224×224×3 = 150.528 entradas. Uma camada totalmente conectada com 1000 unidades ocultas precisaria de 150 milhões de parâmetros — apenas para a primeira camada. Isso gera overfitting facilmente e ignora a estrutura espacial das imagens.\n\nAs CNNs resolvem isso com duas ideias principais:\n- **Conectividade local**: cada neurônio conecta-se a um pequeno campo receptivo, não a todas as entradas\n- **Compartilhamento de pesos**: o mesmo filtro (kernel) é aplicado por toda a imagem',
            },
            1: {
              content:
                '## A Operação de Convolução\n\nUma camada convolucional desliza um pequeno **filtro** (kernel) pela entrada, calculando produtos internos em cada posição para produzir um **mapa de features**. Cada filtro detecta um padrão específico (bordas, texturas, etc.).\n\nUma camada de convolução com F filtros produz F mapas de features — cada um destacando diferentes padrões espaciais.',
            },
            2: { caption: 'Convolução: deslize o kernel K pela imagem I, calculando produtos elemento a elemento e somando.' },
            3: {
              content:
                '## Pooling e Arquitetura\n\n**Camadas de pooling** fazem downsampling dos mapas de features para reduzir as dimensões espaciais e adicionar invariância à translação. **Max pooling** pega o valor máximo em cada janela de pooling.\n\nUma arquitetura CNN típica empilha:\n- Conv → ReLU → Pool (repetido)\n- Flatten\n- Camadas totalmente conectadas\n- Saída Softmax\n\nArquiteturas modernas (ResNet, EfficientNet) usam **conexões residuais** (skip connections) que permitem que os gradientes fluam diretamente entre as camadas, possibilitando o treinamento de redes muito profundas (100+ camadas).',
            },
            4: {
              content:
                '## Aprendizado por Transferência\n\nTreinar uma CNN do zero requer milhões de imagens rotuladas e dias de computação. O **aprendizado por transferência** reutiliza uma rede pré-treinada no ImageNet (por exemplo, ResNet50), substituindo apenas a cabeça de classificação final:\n\n1. **Extração de features**: congele todas as camadas, treine apenas a cabeça. Rápido, bom quando seu conjunto de dados é pequeno e similar ao ImageNet.\n2. **Fine-tuning**: descongele algumas camadas superiores e treine com uma pequena taxa de aprendizado. Melhor quando você tem mais dados.',
            },
            5: { caption: 'Aprendizado por transferência com ResNet pré-treinado em PyTorch' },
            6: {
              items: [
                'CNNs usam conectividade local e compartilhamento de pesos — dramaticamente menos parâmetros que camadas totalmente conectadas.',
                'Filtros deslizam pela imagem, criando mapas de features que detectam bordas, texturas e formas.',
                'MaxPooling reduz as dimensões espaciais e adiciona invariância à translação.',
                'Conexões residuais (ResNet) permitem o treinamento de redes com 100+ camadas.',
                'O aprendizado por transferência reutiliza pesos pré-treinados no ImageNet — use-o sempre que tiver < 100k exemplos rotulados.',
              ],
            },
          },
        },
      },
    },
    'transformers': {
      title: 'Atenção e Transformers',
      description: 'A arquitetura que alimenta o GPT, BERT e todos os grandes modelos de linguagem modernos.',
      lessons: {
        'attention-mechanism': {
          title: 'O Mecanismo de Atenção e a Arquitetura Transformer',
          description: 'Autoatenção, atenção multi-cabeça, codificação posicional e o Transformer completo.',
          blocks: {
            0: {
              content:
                '## O Problema com as RNNs\n\nAntes dos Transformers, o processamento de sequências dependia de RNNs e LSTMs. Esses modelos processam tokens um a um, dificultando a captura de **dependências de longo alcance** — uma palavra na posição 1 é difícil de conectar a uma palavra na posição 500. Eles também não podem ser paralelizados, tornando o treinamento lento.\n\nO Transformer (Vaswani et al., 2017) substituiu a recorrência inteiramente pela **autoatenção**: cada token atende diretamente a todos os outros tokens da sequência.',
            },
            1: {
              content:
                '## Atenção de Produto Interno Escalonado\n\nPara cada token em uma sequência, a autoatenção computa:\n- **Query (Q)**: "o que estou procurando?"\n- **Key (K)**: "o que tenho a oferecer?"\n- **Value (V)**: "que informação carrego?"\n\nO score de atenção entre uma query e todas as keys determina quanto de cada value coletar.',
            },
            2: { caption: 'Atenção de produto interno escalonado. O escalonamento √d_k previne gradientes que desaparecem quando d_k é grande.' },
            3: {
              content:
                '## Atenção Multi-Cabeça\n\nEm vez de calcular uma única função de atenção, o Transformer executa **h "cabeças" de atenção em paralelo**, cada uma com diferentes projeções aprendidas. As saídas são concatenadas e projetadas. Isso permite que o modelo atenda a diferentes posições de diferentes subespaços de representação simultaneamente.',
            },
            4: {
              content:
                '## O Bloco Transformer\n\nUm bloco Transformer consiste em:\n1. **Autoatenção Multi-Cabeça** com conexão residual e Layer Norm\n2. **Rede Feed-Forward** (duas camadas lineares com ReLU) com conexão residual e Layer Norm\n\nO Transformer completo empilha N desses blocos (tipicamente 6–96). A pilha **encoder** processa a entrada; a pilha **decoder** gera a saída autoregressivamente.',
            },
            5: {
              title: 'Bloco Transformer (Encoder)',
              lines: [
                '  Tokens de Entrada',
                '      ↓',
                '  + Codificação Posicional',
                '      ↓',
                '  ┌─────────────────────┐  ←── repetido N vezes',
                '  │  Autoatenção        │',
                '  │  Multi-Cabeça       │',
                '  │  + Residual + LN    │',
                '  │         ↓           │',
                '  │  Rede              │',
                '  │  Feed-Forward       │',
                '  │  + Residual + LN    │',
                '  └─────────────────────┘',
                '      ↓',
                '  Representações de Saída',
              ],
            },
            6: {
              content:
                "**Atenção é como uma discussão em grupo onde todos podem ouvir todos ao mesmo tempo.** Em uma RNN, a informação passa como num jogo de telefone sem fio — sussurrada de pessoa a pessoa, perdendo qualidade ao longo das distâncias. Em um Transformer, todos falam simultaneamente e cada pessoa pode ouvir diretamente todos os outros, ponderados pela relevância para o tópico atual. A 'query' é 'sobre o que estou perguntando?', as 'keys' são 'que tópicos cada pessoa conhece?' e os 'values' são 'o que cada pessoa realmente diz?'",
            },
            7: { caption: 'Atenção de produto interno escalonado do zero em PyTorch' },
            8: {
              items: [
                'A autoatenção permite que cada token atenda diretamente a todos os outros tokens — resolvendo o problema de dependência de longo alcance das RNNs.',
                'As matrizes Q/K/V permitem ao modelo perguntar "o que preciso?" (Q), "o que tenho?" (K) e "o que devo compartilhar?" (V).',
                'A atenção multi-cabeça executa h cabeças de atenção em paralelo, capturando diferentes tipos de relações.',
                'Conexões residuais + Layer Norm em cada bloco permitem treinamento estável de Transformers muito profundos.',
                'GPT usa Transformers somente-decoder (mascaramento causal); BERT usa somente-encoder; T5 usa encoder-decoder completo.',
              ],
            },
          },
        },
      },
    },
  },
};
