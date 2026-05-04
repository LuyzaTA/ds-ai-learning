import type { Section } from '@/types/curriculum';

export const generativeAiSection: Section = {
  id: 'generative-ai',
  title: 'Generative AI',
  description: 'LLMs, prompt engineering, RAG, fine-tuning, and AI agents.',
  longDescription:
    'Generative AI is reshaping every industry. This section covers how large language models work, how to use them effectively, and how to build production systems around them.',
  icon: '✨',
  color: 'amber',
  tags: ['LLM', 'Prompt Engineering', 'RAG', 'Fine-tuning', 'Agents', 'Embeddings'],
  modules: [
    {
      id: 'large-language-models',
      title: 'Large Language Models',
      description: 'How LLMs work under the hood — tokenization, pretraining, and emergent abilities.',
      lessons: [
        {
          id: 'how-llms-work',
          title: 'How Large Language Models Work',
          description: 'Tokenization, next-token prediction, scaling laws, and emergent capabilities.',
          duration: '55 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## What Is a Language Model?\n\nAt its core, a language model is a system that assigns probabilities to sequences of tokens. A **large language model (LLM)** is a Transformer trained at massive scale to predict the next token given all previous tokens:\n\n$$P(w_t \\mid w_1, w_2, \\ldots, w_{t-1})$$\n\nDuring pretraining, the model sees hundreds of billions of tokens from the internet, books, and code, and learns to compress an enormous amount of knowledge into its weights.',
            },
            {
              type: 'text',
              content:
                '## Tokenization\n\nLLMs do not process raw characters or words — they process **tokens**. Tokenizers (e.g., Byte-Pair Encoding / BPE) split text into subword units that balance vocabulary size with sequence length.\n\nKey insight: *"ChatGPT"* might be 1 token; *"supercalifragilistic"* might be 4-5 tokens; rare words and code are often split into many tokens. This affects both cost and model behaviour.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Practical Tokenization Facts',
              content:
                '1 token ≈ 4 characters or ¾ of a word in English. GPT-4 uses ~100,000 token vocabulary (tiktoken, cl100k_base). Non-English languages are often less efficient: 1 Chinese character = 1-2 tokens, but 1 English word ≈ 1 token. Longer prompts = higher cost and slower inference.',
            },
            {
              type: 'text',
              content:
                '## Pretraining, Fine-tuning, and RLHF\n\nModern LLMs like GPT-4 and Claude are trained in stages:\n\n1. **Pretraining**: next-token prediction on a massive web corpus. The model learns language, facts, and reasoning.\n2. **Supervised Fine-tuning (SFT)**: train on curated instruction-response pairs to follow instructions.\n3. **RLHF** (Reinforcement Learning from Human Feedback): human raters rank outputs, a reward model is trained on these rankings, and the LLM is fine-tuned with PPO (or DPO) to maximise the reward. This aligns the model with human preferences.',
            },
            {
              type: 'diagram',
              title: 'LLM Training Pipeline',
              lines: [
                '  1. Pretraining     → Web + Books + Code (T tokens)',
                '     Objective: minimize next-token prediction loss',
                '',
                '  2. SFT             → Curated (instruction, response) pairs',
                '     Objective: follow instructions correctly',
                '',
                '  3. RLHF / DPO     → Human preference data',
                '     Objective: align with human values & helpfulness',
              ],
            },
            {
              type: 'text',
              content:
                '## Scaling Laws and Emergent Abilities\n\nKaplan et al. (OpenAI, 2020) showed that LLM performance improves **predictably** with:\n- Model size (number of parameters)\n- Dataset size (number of tokens)\n- Compute budget\n\nSurprisingly, many abilities (multi-step reasoning, coding, translation) emerge suddenly at scale thresholds — they are not present in smaller models. This is called **emergence** and is one of the most studied phenomena in AI.',
            },
            {
              type: 'eli5',
              content:
                "**An LLM is like an incredibly well-read autocomplete.** Imagine you've read every book, article, and website that ever existed. Now someone gives you the beginning of a sentence and asks you to complete it. You'd draw on all that knowledge to predict the most sensible next word, then the next, and so on. That's exactly what GPT does — except it predicts at the token level, and it's trained to predict trillions of such continuations. The 'intelligence' emerges from this massive pattern-matching over text.",
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Using the OpenAI API and exploring tokenization',
              code: `# pip install openai tiktoken
import tiktoken

# Explore tokenization
enc = tiktoken.get_encoding("cl100k_base")  # GPT-4 tokenizer

texts = [
    "Hello, world!",
    "ChatGPT is a large language model.",
    "The transformer architecture uses self-attention.",
    "中文的词通常占多个 token",
]

for text in texts:
    tokens = enc.encode(text)
    print(f"'{text}'")
    print(f"  → {len(tokens)} tokens: {tokens[:5]}...")
    print()

# --- Using OpenAI API ---
# from openai import OpenAI
# client = OpenAI(api_key="your-key")

# response = client.chat.completions.create(
#     model="gpt-4o",
#     messages=[
#         {"role": "system", "content": "You are a helpful data science tutor."},
#         {"role": "user",   "content": "Explain overfitting in simple terms."},
#     ],
#     temperature=0.7,
#     max_tokens=200,
# )
# print(response.choices[0].message.content)
# print(f"Usage: {response.usage}")  # prompt_tokens, completion_tokens, total_tokens`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'LLMs predict the next token given context — trained at scale, this produces remarkably general intelligence.',
                'Tokenization splits text into subword units; 1 token ≈ 4 characters in English.',
                'Three-stage training: Pretraining (web data) → SFT (instructions) → RLHF (human preferences).',
                'Performance scales predictably with model size, data, and compute (scaling laws).',
                'Emergent abilities appear suddenly at scale — not present in smaller models.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      description: 'The art and science of communicating effectively with LLMs.',
      lessons: [
        {
          id: 'prompt-engineering-techniques',
          title: 'Prompt Engineering Techniques',
          description: 'Zero-shot, few-shot, chain-of-thought, and advanced prompting strategies.',
          duration: '50 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## What Is Prompt Engineering?\n\nPrompt engineering is the practice of **designing inputs to LLMs** to elicit the best possible outputs. It is both an art (intuition, creativity) and a science (systematic evaluation, iteration).\n\nGood prompts can dramatically improve output quality without any model training. Poor prompts lead to vague, incorrect, or harmful outputs.',
            },
            {
              type: 'text',
              content:
                '## Zero-Shot Prompting\n\nSimply state the task with no examples. Works well for common tasks that the model has seen frequently in pretraining.',
            },
            {
              type: 'code',
              language: 'text',
              caption: 'Zero-shot prompt example',
              code: `System: You are a sentiment analysis expert.
User: Classify the sentiment of this review as Positive, Negative, or Neutral:

"The product arrived quickly and works perfectly. However, the packaging was damaged."

Response: Mixed (partially Positive, partially Negative)`,
            },
            {
              type: 'text',
              content:
                '## Few-Shot Prompting\n\nProvide a few input-output examples in the prompt. This "shows" the model the desired format and reasoning style — particularly useful for unusual tasks or specific output formats.',
            },
            {
              type: 'text',
              content:
                '## Chain-of-Thought (CoT) Prompting\n\nAdd "Let\'s think step by step" or explicitly show reasoning steps in few-shot examples. This dramatically improves performance on multi-step reasoning tasks (math, logic, planning). The model generates its reasoning before the final answer.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'When to Use Chain-of-Thought',
              content:
                'CoT is most valuable for tasks requiring multi-step reasoning: math word problems, logical deduction, code debugging, and planning. For simple factual lookups, it may add unnecessary length. Use it when the task requires more than one reasoning step.',
            },
            {
              type: 'text',
              content:
                '## Advanced Techniques\n\n- **Self-consistency**: sample multiple CoT outputs, take the majority answer\n- **Tree of Thoughts (ToT)**: explore multiple reasoning paths, backtrack from dead ends\n- **ReAct**: alternate between reasoning (Thought) and acting (tool calls, search)\n- **Role assignment**: "You are an expert statistician with 20 years of experience..."\n- **Output constraints**: "Respond only with valid JSON. No other text."\n- **Constitutional AI / meta-prompting**: include guidelines about safety, accuracy, and format',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Structured prompt templates with Python',
              code: `from string import Template
from textwrap import dedent

# Few-shot classification prompt template
FEW_SHOT_SENTIMENT = Template(dedent("""
    You are a sentiment analysis expert. Classify customer reviews as:
    POSITIVE, NEGATIVE, NEUTRAL, or MIXED.

    Examples:
    Review: "Absolutely love this product! Works great."
    Sentiment: POSITIVE

    Review: "Terrible quality. Broke after one day."
    Sentiment: NEGATIVE

    Review: "It works as described, nothing special."
    Sentiment: NEUTRAL

    Review: "Great features but terrible customer service."
    Sentiment: MIXED

    Now classify this review:
    Review: "$review"
    Sentiment:
""").strip())

# Chain-of-thought math prompt
COT_MATH = Template(dedent("""
    Solve this problem step by step, then give the final answer.

    Problem: $problem

    Solution:
    Step 1:
""").strip())

# Example usage
reviews = [
    "Shipping was slow but the product quality is excellent.",
    "I want my money back. Complete waste.",
]

for review in reviews:
    prompt = FEW_SHOT_SENTIMENT.substitute(review=review)
    print(f"\\nReview: {review}")
    print(f"Prompt length: {len(prompt.split())} words")
    # In practice, send prompt to LLM API here`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Prompt engineering shapes LLM outputs without changing model weights — high impact, low cost.',
                'Zero-shot: just state the task. Few-shot: provide examples. CoT: show reasoning steps.',
                'Chain-of-thought dramatically improves multi-step reasoning performance.',
                'Be explicit about output format, role, constraints, and desired reasoning depth.',
                'Evaluate prompts systematically on a labelled test set — not just on a few manual examples.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'rag-agents',
      title: 'RAG & AI Agents',
      description: 'Retrieval-Augmented Generation, vector databases, and autonomous agent systems.',
      lessons: [
        {
          id: 'rag-systems',
          title: 'Retrieval-Augmented Generation (RAG)',
          description: 'How to give LLMs access to your private knowledge without fine-tuning.',
          duration: '60 min',
          difficulty: 'advanced',
          blocks: [
            {
              type: 'text',
              content:
                '## The Problem RAG Solves\n\nLLMs have two major limitations for enterprise use:\n1. **Knowledge cutoff**: they don\'t know about events after their training data\n2. **Hallucination**: they can confidently make up facts\n\n**RAG** (Lewis et al., 2020) solves both by dynamically retrieving relevant documents at inference time and injecting them into the context. The LLM then generates answers grounded in retrieved facts.',
            },
            {
              type: 'diagram',
              title: 'RAG Pipeline',
              lines: [
                '  INDEXING (offline):',
                '  Documents → Chunk → Embed → Vector Store',
                '',
                '  RETRIEVAL (online):',
                '  User Query → Embed → Similarity Search → Top-K Chunks',
                '                                    ↓',
                '  GENERATION:',
                '  [System Prompt + Retrieved Chunks + User Query] → LLM → Answer',
              ],
            },
            {
              type: 'text',
              content:
                '## Embeddings and Vector Databases\n\nEmbeddings are dense numerical representations of text. Semantically similar texts have embeddings that are close together in vector space. We measure closeness with **cosine similarity**.\n\n**Vector databases** (Pinecone, Weaviate, Chroma, Qdrant, pgvector) store embeddings and support Approximate Nearest Neighbour (ANN) search — finding the most similar vectors among millions in milliseconds.',
            },
            {
              type: 'math',
              latex:
                '\\text{cosine\\_sim}(\\mathbf{a}, \\mathbf{b}) = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\| \\|\\mathbf{b}\\|}',
              displayMode: true,
              caption: 'Cosine similarity ranges from -1 (opposite) to 1 (identical direction). Used for semantic search.',
            },
            {
              type: 'text',
              content:
                '## AI Agents\n\nAn **AI agent** is an LLM that can use **tools** (functions, APIs, code execution) to act on the world, not just generate text. The agent loop:\n1. The LLM reasons about the current task\n2. It decides which tool to call and with what arguments\n3. The tool executes and returns results\n4. The LLM incorporates results and continues reasoning\n5. Repeat until the task is complete\n\nPopular frameworks: **LangChain**, **LlamaIndex**, **CrewAI**, **AutoGen**.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Building a simple RAG system with ChromaDB',
              code: `# pip install chromadb sentence-transformers
import chromadb
from chromadb.utils import embedding_functions

# --- Setup ChromaDB (in-memory for this example) ---
client = chromadb.Client()
ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)
collection = client.create_collection("ds_knowledge", embedding_function=ef)

# --- Index documents ---
documents = [
    "Gradient descent is an optimization algorithm that iteratively moves in the direction of steepest descent.",
    "Random forests are ensemble methods that combine many decision trees using bagging and random feature selection.",
    "The attention mechanism allows transformers to weigh the importance of different tokens in a sequence.",
    "Cross-validation estimates model performance by training and evaluating on multiple data splits.",
    "Regularization adds a penalty term to the loss function to prevent overfitting.",
]

collection.add(
    documents=documents,
    ids=[f"doc_{i}" for i in range(len(documents))]
)

print(f"Indexed {collection.count()} documents")

# --- Retrieve relevant chunks for a query ---
def retrieve(query: str, n: int = 2):
    results = collection.query(query_texts=[query], n_results=n)
    return results['documents'][0]

query = "How do neural networks avoid overfitting?"
chunks = retrieve(query)
print(f"\\nQuery: {query}")
print("\\nRetrieved chunks:")
for i, chunk in enumerate(chunks, 1):
    print(f"  [{i}] {chunk}")

# --- RAG prompt construction ---
context = "\\n".join(f"[{i+1}] {c}" for i, c in enumerate(chunks))
rag_prompt = f"""Answer the question using ONLY the provided context.
If the context doesn't contain the answer, say "I don't know."

Context:
{context}

Question: {query}
Answer:"""

print(f"\\nRAG Prompt sent to LLM:\\n{rag_prompt}")`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'RAG retrieves relevant documents at inference time, grounding LLM outputs in factual sources.',
                'Embeddings turn text into vectors; cosine similarity measures semantic closeness.',
                'Vector databases (Chroma, Pinecone, Weaviate) enable millisecond semantic search over millions of chunks.',
                'The RAG pipeline: Chunk → Embed → Store (offline) | Query → Retrieve → Generate (online).',
                'AI agents use tools (search, code, APIs) in a reasoning loop to complete multi-step tasks autonomously.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
