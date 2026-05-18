import type { SectionTranslation } from '@/types/curriculum-i18n';

export const generativeAiPtBR: SectionTranslation = {
  title: 'IA Generativa',
  description: 'LLMs, engenharia de prompts, RAG, fine-tuning e agentes de IA.',
  longDescription:
    'A IA generativa está remodelando todos os setores. Esta seção cobre como os grandes modelos de linguagem funcionam, como usá-los de forma eficaz e como construir sistemas de produção ao redor deles.',
  tags: ['LLM', 'Engenharia de Prompts', 'RAG', 'Fine-tuning', 'Agentes', 'Embeddings'],
  modules: {
    'large-language-models': {
      title: 'Grandes Modelos de Linguagem',
      description: 'Como os LLMs funcionam por dentro — tokenização, pré-treinamento e capacidades emergentes.',
      lessons: {
        'how-llms-work': {
          title: 'Como Grandes Modelos de Linguagem Funcionam',
          description: 'Tokenização, predição do próximo token, leis de escalonamento e capacidades emergentes.',
          blocks: {
            0: {
              content:
                '## O que é um Modelo de Linguagem?\n\nNo seu núcleo, um modelo de linguagem é um sistema que atribui probabilidades a sequências de tokens. Um **grande modelo de linguagem (LLM)** é um Transformer treinado em escala massiva para prever o próximo token dados todos os tokens anteriores:\n\n$$P(w_t \\mid w_1, w_2, \\ldots, w_{t-1})$$\n\nDurante o pré-treinamento, o modelo vê centenas de bilhões de tokens da internet, livros e código, e aprende a comprimir uma enorme quantidade de conhecimento em seus pesos.',
            },
            1: {
              content:
                '## Tokenização\n\nOs LLMs não processam caracteres brutos ou palavras — eles processam **tokens**. Tokenizadores (por exemplo, Byte-Pair Encoding / BPE) dividem o texto em unidades subpalavra que equilibram tamanho do vocabulário com comprimento de sequência.\n\nInsight principal: *"ChatGPT"* pode ser 1 token; *"supercalifragilisticexpialidocious"* pode ser 4-5 tokens; palavras raras e código são frequentemente divididos em muitos tokens. Isso afeta tanto o custo quanto o comportamento do modelo.',
            },
            2: {
              title: 'Fatos Práticos sobre Tokenização',
              content:
                '1 token ≈ 4 caracteres ou ¾ de uma palavra em inglês. GPT-4 usa ~100.000 tokens de vocabulário. Línguas não inglesas são frequentemente menos eficientes: 1 caractere chinês = 1-2 tokens, mas 1 palavra em inglês ≈ 1 token. Prompts mais longos = maior custo e inferência mais lenta.',
            },
            3: {
              content:
                '## Pré-treinamento, Fine-tuning e RLHF\n\nLLMs modernos como GPT-4 e Claude são treinados em etapas:\n\n1. **Pré-treinamento**: predição do próximo token em um corpus massivo da web. O modelo aprende linguagem, fatos e raciocínio.\n2. **Fine-tuning Supervisionado (SFT)**: treinamento em pares instrução-resposta selecionados para seguir instruções.\n3. **RLHF** (Aprendizado por Reforço com Feedback Humano): avaliadores humanos classificam saídas, um modelo de recompensa é treinado nessas classificações e o LLM é ajustado com PPO (ou DPO) para maximizar a recompensa. Isso alinha o modelo com as preferências humanas.',
            },
            4: {
              title: 'Pipeline de Treinamento de LLM',
              lines: [
                '  1. Pré-treinamento  → Web + Livros + Código (T tokens)',
                '     Objetivo: minimizar a perda de predição do próximo token',
                '',
                '  2. SFT              → Pares (instrução, resposta) selecionados',
                '     Objetivo: seguir instruções corretamente',
                '',
                '  3. RLHF / DPO      → Dados de preferência humana',
                '     Objetivo: alinhar com valores e utilidade humanos',
              ],
            },
            5: {
              content:
                '## Leis de Escalonamento e Capacidades Emergentes\n\nKaplan et al. (OpenAI, 2020) mostraram que o desempenho dos LLMs melhora **previsivelmente** com:\n- Tamanho do modelo (número de parâmetros)\n- Tamanho do conjunto de dados (número de tokens)\n- Orçamento computacional\n\nSurpreendentemente, muitas capacidades (raciocínio de múltiplas etapas, programação, tradução) emergem repentinamente em limiares de escala — não estão presentes em modelos menores. Isso é chamado de **emergência** e é um dos fenômenos mais estudados em IA.',
            },
            6: {
              content:
                "**Um LLM é como um autocompletar incrivelmente bem-lido.** Imagine que você leu todos os livros, artigos e sites que já existiram. Agora alguém lhe dá o início de uma frase e pede para completá-la. Você usaria todo esse conhecimento para prever a próxima palavra mais sensata, depois a próxima, e assim por diante. É exatamente o que o GPT faz — exceto que prevê no nível de token, e foi treinado para prever trilhões dessas continuações. A 'inteligência' emerge desse enorme reconhecimento de padrões no texto.",
            },
            7: { caption: 'Usando a API OpenAI e explorando a tokenização' },
            8: {
              items: [
                'LLMs preveem o próximo token dado o contexto — treinados em escala, isso produz inteligência geral notável.',
                'A tokenização divide o texto em unidades subpalavra; 1 token ≈ 4 caracteres em inglês.',
                'Treinamento em três etapas: Pré-treinamento (dados da web) → SFT (instruções) → RLHF (preferências humanas).',
                'O desempenho escala previsivelmente com tamanho do modelo, dados e computação (leis de escalonamento).',
                'Capacidades emergentes aparecem repentinamente em escala — não presentes em modelos menores.',
              ],
            },
          },
        },
      },
    },
    'prompt-engineering': {
      title: 'Engenharia de Prompts',
      description: 'A arte e a ciência de se comunicar efetivamente com LLMs.',
      lessons: {
        'prompt-engineering-techniques': {
          title: 'Técnicas de Engenharia de Prompts',
          description: 'Zero-shot, few-shot, cadeia de pensamento e estratégias avançadas de prompts.',
          blocks: {
            0: {
              content:
                '## O que é Engenharia de Prompts?\n\nA engenharia de prompts é a prática de **projetar entradas para LLMs** para obter as melhores saídas possíveis. É tanto uma arte (intuição, criatividade) quanto uma ciência (avaliação sistemática, iteração).\n\nBons prompts podem melhorar dramaticamente a qualidade da saída sem nenhum treinamento do modelo. Prompts ruins levam a saídas vagas, incorretas ou prejudiciais.',
            },
            1: {
              content:
                '## Prompts Zero-Shot\n\nSimplismente declare a tarefa sem exemplos. Funciona bem para tarefas comuns que o modelo viu frequentemente durante o pré-treinamento.',
            },
            2: { caption: 'Exemplo de prompt zero-shot' },
            3: {
              content:
                '## Prompts Few-Shot\n\nForneça alguns exemplos de entrada-saída no prompt. Isso "mostra" ao modelo o formato desejado e o estilo de raciocínio — particularmente útil para tarefas incomuns ou formatos de saída específicos.',
            },
            4: {
              content:
                '## Prompts com Cadeia de Pensamento (CoT)\n\nAdicione "Vamos pensar passo a passo" ou mostre explicitamente as etapas de raciocínio em exemplos few-shot. Isso melhora dramaticamente o desempenho em tarefas de raciocínio de múltiplas etapas (matemática, lógica, planejamento). O modelo gera seu raciocínio antes da resposta final.',
            },
            5: {
              title: 'Quando Usar Cadeia de Pensamento',
              content:
                'CoT é mais valioso para tarefas que exigem raciocínio de múltiplas etapas: problemas matemáticos em palavras, dedução lógica, depuração de código e planejamento. Para consultas factuais simples, pode adicionar comprimento desnecessário. Use quando a tarefa exige mais de uma etapa de raciocínio.',
            },
            6: {
              content:
                '## Técnicas Avançadas\n\n- **Auto-consistência**: amostre múltiplas saídas CoT, tome a resposta majoritária\n- **Árvore de Pensamentos (ToT)**: explore múltiplos caminhos de raciocínio, retroceda de becos sem saída\n- **ReAct**: alterne entre raciocínio (Pensamento) e ação (chamadas de ferramentas, pesquisa)\n- **Atribuição de papel**: "Você é um estatístico especialista com 20 anos de experiência..."\n- **Restrições de saída**: "Responda apenas com JSON válido. Sem outro texto."\n- **IA Constitucional / meta-prompting**: inclua diretrizes sobre segurança, precisão e formato',
            },
            7: { caption: 'Templates de prompt estruturados com Python' },
            8: {
              items: [
                'A engenharia de prompts molda as saídas dos LLMs sem alterar os pesos do modelo — alto impacto, baixo custo.',
                'Zero-shot: apenas declare a tarefa. Few-shot: forneça exemplos. CoT: mostre etapas de raciocínio.',
                'A cadeia de pensamento melhora dramaticamente o desempenho em raciocínio de múltiplas etapas.',
                'Seja explícito sobre formato de saída, papel, restrições e profundidade de raciocínio desejada.',
                'Avalie prompts sistematicamente em um conjunto de teste rotulado — não apenas em alguns exemplos manuais.',
              ],
            },
          },
        },
      },
    },
    'rag-agents': {
      title: 'RAG e Agentes de IA',
      description: 'Geração Aumentada por Recuperação, bancos de dados vetoriais e sistemas de agentes autônomos.',
      lessons: {
        'rag-systems': {
          title: 'Geração Aumentada por Recuperação (RAG)',
          description: 'Como dar aos LLMs acesso ao seu conhecimento privado sem fine-tuning.',
          blocks: {
            0: {
              content:
                '## O Problema que o RAG Resolve\n\nOs LLMs têm duas limitações principais para uso empresarial:\n1. **Corte de conhecimento**: eles não sabem sobre eventos após seus dados de treinamento\n2. **Alucinação**: eles podem inventar fatos de forma confiante\n\n**RAG** (Lewis et al., 2020) resolve ambos recuperando dinamicamente documentos relevantes no momento da inferência e injetando-os no contexto. O LLM então gera respostas fundamentadas em fatos recuperados.',
            },
            1: {
              title: 'Pipeline RAG',
              lines: [
                '  INDEXAÇÃO (offline):',
                '  Documentos → Divisão → Embedding → Banco Vetorial',
                '',
                '  RECUPERAÇÃO (online):',
                '  Consulta do Usuário → Embedding → Busca por Similaridade → Top-K Chunks',
                '                                    ↓',
                '  GERAÇÃO:',
                '  [Prompt do Sistema + Chunks Recuperados + Consulta] → LLM → Resposta',
              ],
            },
            2: {
              content:
                '## Embeddings e Bancos de Dados Vetoriais\n\nEmbeddings são representações numéricas densas de texto. Textos semanticamente similares têm embeddings próximos no espaço vetorial. Medimos proximidade com **similaridade cosseno**.\n\n**Bancos de dados vetoriais** (Pinecone, Weaviate, Chroma, Qdrant, pgvector) armazenam embeddings e suportam busca por Vizinhos Aproximados (ANN) — encontrando os vetores mais similares entre milhões em milissegundos.',
            },
            3: { caption: 'Similaridade cosseno varia de -1 (oposto) a 1 (direção idêntica). Usada para busca semântica.' },
            4: {
              content:
                '## Agentes de IA\n\nUm **agente de IA** é um LLM que pode usar **ferramentas** (funções, APIs, execução de código) para agir no mundo, não apenas gerar texto. O loop do agente:\n1. O LLM raciocina sobre a tarefa atual\n2. Decide qual ferramenta chamar e com quais argumentos\n3. A ferramenta executa e retorna resultados\n4. O LLM incorpora os resultados e continua raciocinando\n5. Repita até a tarefa ser concluída\n\nFrameworks populares: **LangChain**, **LlamaIndex**, **CrewAI**, **AutoGen**.',
            },
            5: { caption: 'Construindo um sistema RAG simples com ChromaDB' },
            6: {
              items: [
                'RAG recupera documentos relevantes no momento da inferência, fundamentando as saídas dos LLMs em fontes factuais.',
                'Embeddings transformam texto em vetores; a similaridade cosseno mede proximidade semântica.',
                'Bancos de dados vetoriais (Chroma, Pinecone, Weaviate) habilitam busca semântica em milissegundos sobre milhões de chunks.',
                'O pipeline RAG: Dividir → Incorporar → Armazenar (offline) | Consultar → Recuperar → Gerar (online).',
                'Agentes de IA usam ferramentas (busca, código, APIs) em um loop de raciocínio para completar tarefas de múltiplas etapas autonomamente.',
              ],
            },
          },
        },
      },
    },
  },
};
