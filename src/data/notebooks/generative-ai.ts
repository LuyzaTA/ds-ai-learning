import type { Notebook } from '@/types/notebook';

export const generativeAINotebooks: Notebook[] = [
  // ─── LLM Basics ──────────────────────────────────────────────────────────
  {
    id: 'llm-basics',
    title: 'LLM Basics',
    slug: 'llm-basics',
    category: 'generative-ai',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    tags: ['llm', 'gpt', 'language-model', 'tokens', 'inference', 'next-token-prediction'],
    description: 'How Large Language Models work under the hood — tokenization, next-token prediction, and why scale changes everything.',
    prerequisites: ['transformer'],
    relatedNotebooks: ['prompt-engineering', 'rag', 'fine-tuning'],
    cells: [
      {
        id: 'llm-intro',
        type: 'markdown',
        content: `# Large Language Models (LLMs)\n\nLLMs are neural networks trained to predict the next token in a sequence. From this simple task, they develop astonishing capabilities: reasoning, coding, writing, translation, and more.\n\nGPT-4, Claude, Gemini, Llama — all are Transformer-based autoregressive models. What makes them different is scale: billions of parameters trained on trillions of tokens.`,
      },
      {
        id: 'llm-theory-training',
        type: 'theory',
        title: 'How LLMs are Trained',
        variant: 'default',
        content: `**Pre-training** (self-supervised):\nThe model learns from massive text corpora by predicting the next token. Given "The cat sat on the ___", predict "mat". No labels needed — the text itself provides supervision.\n\n**Fine-tuning / RLHF** (alignment):\nAfter pre-training, models are fine-tuned on curated instruction data and aligned with human preferences using Reinforcement Learning from Human Feedback (RLHF).\n\n**Emergent abilities**: As models scale past ~100B parameters, entirely new capabilities emerge that weren't explicitly trained — few-shot learning, chain-of-thought reasoning, code generation.`,
      },
      {
        id: 'llm-theory-tokens',
        type: 'theory',
        title: 'Tokens: The Building Blocks',
        variant: 'math',
        content: `LLMs don't process characters or words — they process **tokens**. Tokenizers (BPE, WordPiece) split text into subword units that balance vocabulary size vs. expressivity.\n\n**GPT-4 tokenizer examples:**\n• "Hello" → ["Hello"] (1 token)\n• "Tokenization" → ["Token", "ization"] (2 tokens)\n• "supercalifragilistic" → ["super", "cal", "if", "rag", "il", "istic"] (6 tokens)\n• Code often tokenizes differently than natural language\n\n**Why it matters**: Pricing, context window limits, and model behavior all depend on token count.`,
      },
      {
        id: 'llm-code-api',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Using LLMs via API — OpenAI and Anthropic (Claude)',
        code: `# OpenAI API
from openai import OpenAI

client = OpenAI()  # reads OPENAI_API_KEY from env

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful data science tutor."},
        {"role": "user", "content": "Explain gradient descent in one sentence."},
    ],
    temperature=0.7,
    max_tokens=100,
)
print("GPT-4o:", response.choices[0].message.content)
print(f"Tokens used: {response.usage.total_tokens}")

# ─────────────────────────────────────────────────────

# Anthropic Claude API
import anthropic

claude = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

message = claude.messages.create(
    model="claude-opus-4-7",
    max_tokens=100,
    messages=[
        {"role": "user", "content": "Explain backpropagation in one sentence."}
    ]
)
print("Claude:", message.content[0].text)`,
        output: `GPT-4o: Gradient descent iteratively moves model parameters in the direction that most reduces the loss by following the negative gradient.
Tokens used: 52

Claude: Backpropagation calculates how much each weight contributed to the network's error using the chain rule, then adjusts those weights to reduce future errors.`,
      },
      {
        id: 'llm-code-local',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Running LLMs locally with Ollama or Hugging Face',
        code: `# Option 1: Ollama (run LLMs locally — no API key needed)
# Install: curl -fsSL https://ollama.ai/install.sh | sh
# Pull: ollama pull llama3.2

import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'llama3.2',
    'prompt': 'What is random forest?',
    'stream': False
})
print(response.json()['response'])

# ─────────────────────────────────────────────────────

# Option 2: Hugging Face Transformers (full local inference)
from transformers import pipeline

# Load small model for demo
generator = pipeline('text-generation', model='gpt2', device='cpu')
result = generator(
    "Linear regression is a",
    max_new_tokens=50,
    do_sample=True,
    temperature=0.7,
)
print(result[0]['generated_text'])`,
        output: `Linear regression is a statistical method used to model the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data points.`,
      },
      {
        id: 'llm-metrics',
        type: 'metrics',
        title: 'Key LLM Metrics',
        metrics: [
          { name: 'Context Window', value: '128K tokens', format: 'text', status: 'info', description: 'Max text the model can process at once (GPT-4o). 1K tokens ≈ 750 words.' },
          { name: 'Latency', value: '~1-2s TTFT', format: 'text', status: 'info', description: 'Time to first token for GPT-4o — depends on context length and load.' },
          { name: 'Throughput', value: '~60 tok/s', format: 'text', status: 'info', description: 'Output tokens per second for streaming responses.' },
          { name: 'Parameters', value: '~1 trillion', format: 'text', status: 'info', description: 'Estimated GPT-4 size. Llama 3.3 70B is openly available.' },
        ],
      },
      {
        id: 'llm-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Software', useCase: 'AI Code Assistants', description: 'Autocomplete, explain, debug, and generate code in any language or framework.', example: 'GitHub Copilot has 1.3M+ paid users and writes 46% of code in accepted completions on average.', companies: ['GitHub', 'Cursor', 'Tabnine'], icon: '💻' },
          { industry: 'Customer Service', useCase: 'AI Support Agents', description: 'Handle customer inquiries, resolve tickets, and escalate complex issues autonomously.', example: 'Klarna\'s AI assistant handles 2/3 of customer service chats, equivalent to 700 FTEs.', companies: ['Klarna', 'Intercom', 'Zendesk'], icon: '🤖' },
          { industry: 'Legal', useCase: 'Contract Analysis', description: 'Review contracts for risks, extract key clauses, and compare against standards.', example: 'Harvey AI is used by 200+ law firms to review M&A contracts in minutes instead of weeks.', companies: ['Harvey', 'Luminance', 'Kira'], icon: '⚖️' },
          { industry: 'Healthcare', useCase: 'Clinical Documentation', description: 'Generate patient notes, discharge summaries, and insurance prior authorization letters.', example: 'Nuance DAX (Microsoft) generates clinical notes in real-time during doctor-patient conversations.', companies: ['Nuance', 'Suki', 'Abridge'], icon: '🏥' },
        ],
      },
      {
        id: 'llm-quiz',
        type: 'quiz',
        title: 'Knowledge Check',
        questions: [
          {
            question: 'What is the primary training objective of autoregressive LLMs like GPT?',
            options: [
              'Classify whether text is AI-generated',
              'Predict the next token in a sequence given all previous tokens',
              'Translate between languages',
              'Fill in masked tokens in a bidirectional context',
            ],
            correct: 1,
            explanation: 'GPT-style models are trained with causal language modeling: predict token T+1 given tokens 1 through T. This simple objective, applied at massive scale, leads to emergent capabilities. (The masked approach is BERT\'s objective.)',
          },
          {
            question: 'What is "temperature" in LLM sampling?',
            options: [
              'The GPU temperature during inference',
              'A parameter controlling randomness — higher temperature = more creative/random outputs',
              'The training learning rate',
              'The length of the context window',
            ],
            correct: 1,
            explanation: 'Temperature scales the logits before softmax. Temperature=0 gives greedy (deterministic) decoding. Temperature=1 uses the model\'s raw distribution. Temperature>1 flattens the distribution (more random/creative). Temperature<1 sharpens it (more conservative/focused).',
          },
        ],
      },
      {
        id: 'llm-interview',
        type: 'interview',
        title: 'Interview Questions',
        questions: [
          {
            question: 'What is hallucination in LLMs and how can you mitigate it?',
            answer: 'Hallucination is when an LLM generates confident but factually incorrect information. Causes: training data gaps, over-reliance on statistical patterns, insufficient grounding. Mitigations: (1) RAG — ground responses in retrieved documents, (2) System prompts instructing the model to say "I don\'t know", (3) Temperature=0 for factual tasks, (4) Structured outputs with verification, (5) Fine-tuning on high-quality factual data, (6) Constitutional AI / RLHF to reduce overconfidence.',
            difficulty: 'medium',
          },
          {
            question: 'What is RLHF and why is it used?',
            answer: 'Reinforcement Learning from Human Feedback (RLHF) aligns LLMs with human preferences. Process: (1) Collect human preference data — show humans two model outputs, ask which is better, (2) Train a Reward Model to predict human preferences, (3) Fine-tune the LLM using RL (PPO) to maximize the reward model score while staying close to the base model (KL penalty). This transforms a "predict next token" model into a helpful, harmless, honest assistant.',
            difficulty: 'hard',
          },
        ],
      },
    ],
  },

  // ─── RAG ────────────────────────────────────────────────────────────────
  {
    id: 'rag',
    title: 'Retrieval-Augmented Generation (RAG)',
    slug: 'rag',
    category: 'generative-ai',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    tags: ['rag', 'retrieval', 'vector-search', 'embeddings', 'grounding', 'knowledge-base'],
    description: 'Give LLMs access to your private data. RAG retrieves relevant documents and includes them in the prompt context.',
    prerequisites: ['llm-basics', 'vector-databases'],
    relatedNotebooks: ['llm-basics', 'vector-databases', 'prompt-engineering'],
    cells: [
      {
        id: 'rag-intro',
        type: 'markdown',
        content: `# Retrieval-Augmented Generation (RAG)\n\nRAG solves two core LLM problems:\n1. **Knowledge cutoff** — LLMs don't know about recent events\n2. **Hallucination** — LLMs make up facts they don't know\n\nSolution: Before generating, **retrieve** relevant documents from your knowledge base and include them in the prompt. The LLM then generates answers grounded in retrieved facts.`,
      },
      {
        id: 'rag-theory',
        type: 'theory',
        title: 'RAG Pipeline Architecture',
        variant: 'default',
        content: `**Offline (indexing):**\n1. Load documents (PDFs, web pages, databases)\n2. Chunk into passages (~200-500 tokens)\n3. Embed each chunk with an embedding model\n4. Store embeddings in a vector database\n\n**Online (retrieval + generation):**\n1. User asks a question\n2. Embed the question with the same embedding model\n3. Vector search: find the k most similar chunks\n4. Inject chunks into the LLM prompt: "Context: [chunks] Answer: [question]"\n5. LLM generates answer based on retrieved context`,
      },
      {
        id: 'rag-diagram',
        type: 'diagram',
        title: 'RAG Pipeline',
        diagramType: 'flowchart',
        content: `
INDEXING PHASE:
Documents → [Chunking] → [Embedding Model] → [Vector DB]
  (PDFs,         (500 token       (text-embedding-3-small)   (Pinecone,
   URLs,          passages)                                    Chroma, Weaviate)
   SQL)

QUERY PHASE:
User Question → [Embed Question] → [Vector Search] → Top-k Chunks
                                    (cosine similarity)
                                          ↓
                              [Inject into LLM Prompt]
                              "Context: [chunks]"
                              "Question: [user question]"
                                          ↓
                                    [LLM Generates]
                                    Grounded Answer ✓
`,
      },
      {
        id: 'rag-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Full RAG pipeline with LangChain and ChromaDB',
        code: `from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# 1. Load and chunk documents
loader = TextLoader("company_docs.txt")
docs   = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", " ", ""]
)
chunks = splitter.split_documents(docs)
print(f"Created {len(chunks)} chunks")

# 2. Embed and store
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")

# 3. Create retriever
retriever = vectorstore.as_retriever(
    search_type="mmr",        # Maximal Marginal Relevance — diverse results
    search_kwargs={"k": 5}
)

# 4. RAG chain with custom prompt
prompt_template = """Use the following context to answer the question.
If you don't know the answer based on the context, say "I don't know."

Context:
{context}

Question: {question}

Answer:"""

llm = ChatOpenAI(model="gpt-4o", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    chain_type_kwargs={"prompt": PromptTemplate.from_template(prompt_template)},
    return_source_documents=True
)

# 5. Query
result = qa_chain.invoke({"query": "What is our refund policy?"})
print("Answer:", result['result'])
print("\\nSources:")
for doc in result['source_documents']:
    print(f"  - {doc.metadata.get('source', 'unknown')} (chunk {doc.metadata.get('chunk', '?')})")`,
        output: `Created 47 chunks

Answer: Our refund policy allows returns within 30 days of purchase with a full refund. Items must be in original condition. Digital products are non-refundable once downloaded.

Sources:
  - company_docs.txt (chunk 12)
  - company_docs.txt (chunk 13)`,
      },
      {
        id: 'rag-theory-advanced',
        type: 'theory',
        title: 'Advanced RAG Techniques',
        variant: 'tip',
        content: `**Chunking Strategies:**\n- Fixed size (simple, baseline)\n- Recursive character (preserves structure)\n- Semantic chunking (splits at topic boundaries)\n- Document-aware (PDFs: pages, code: functions)\n\n**Retrieval Improvements:**\n- Hybrid search: combine vector search + keyword BM25 for better recall\n- Reranking: use a cross-encoder to rerank top-K results\n- Query expansion: rewrite query to improve recall\n- HyDE: generate a hypothetical document, then embed that for retrieval\n\n**Generation Improvements:**\n- Contextual compression: extract only relevant sentences from chunks\n- Self-RAG: model decides when to retrieve and checks its own outputs`,
      },
      {
        id: 'rag-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Enterprise Software', useCase: 'Internal Knowledge Base Q&A', description: 'Let employees ask questions about company policies, procedures, and documentation in natural language.', example: 'Microsoft uses RAG in Azure Cognitive Search + GPT-4 to answer questions about internal documentation across 150,000 employees.', companies: ['Microsoft', 'Google', 'Salesforce'], icon: '🏢' },
          { industry: 'Legal', useCase: 'Legal Research', description: 'Search case law, statutes, and precedents using natural language instead of keyword queries.', example: 'Casetext\'s CoCounsel uses RAG across Westlaw\'s 350M+ legal documents for attorney research.', companies: ['Casetext', 'Westlaw', 'LexisNexis'], icon: '⚖️' },
          { industry: 'Finance', useCase: 'Earnings Call Analysis', description: 'Answer questions about specific companies by retrieving from a database of earnings transcripts and filings.', example: 'Bloomberg\'s BloombergGPT uses RAG over financial documents to answer market research questions.', companies: ['Bloomberg', 'Palantir', 'Goldman Sachs'], icon: '📊' },
        ],
      },
    ],
  },

  // ─── Prompt Engineering ──────────────────────────────────────────────────
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    slug: 'prompt-engineering',
    category: 'generative-ai',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    tags: ['prompts', 'few-shot', 'chain-of-thought', 'system-prompt', 'in-context-learning'],
    description: 'The art and science of crafting prompts that elicit optimal responses from LLMs.',
    prerequisites: ['llm-basics'],
    relatedNotebooks: ['llm-basics', 'rag'],
    cells: [
      {
        id: 'pe-intro',
        type: 'markdown',
        content: `# Prompt Engineering\n\nPrompt engineering is how you communicate with LLMs to get the best results. A well-crafted prompt can be the difference between a generic answer and a precise, actionable response.\n\nAs LLMs become central to product development, prompt engineering is a critical skill for data scientists, engineers, and product managers.`,
      },
      {
        id: 'pe-theory',
        type: 'theory',
        title: 'Core Prompting Strategies',
        variant: 'default',
        content: `**Zero-shot**: Ask directly without examples. Works for simple tasks.\n\n**Few-shot**: Provide 2-5 examples of input→output before your actual request. Dramatically improves consistency for formatting and classification.\n\n**Chain-of-Thought (CoT)**: Add "Let's think step by step" or show reasoning examples. Improves performance on math and logic.\n\n**Role prompting**: "You are an expert [domain] with 20 years of experience..." — constrains the model's persona.\n\n**Structured output**: "Respond in JSON with keys: name, age, summary" — ensures parseable responses.`,
      },
      {
        id: 'pe-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Prompt engineering patterns with the Anthropic Claude API',
        code: `import anthropic

client = anthropic.Anthropic()

def ask(system, user, temperature=0.0):
    msg = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=300,
        temperature=temperature,
        system=system,
        messages=[{"role": "user", "content": user}]
    )
    return msg.content[0].text

# ── Pattern 1: Few-shot classification ──────────────────────────────────────
system = """Classify customer feedback as: POSITIVE, NEGATIVE, or NEUTRAL.

Examples:
Text: "The product is amazing!" → POSITIVE
Text: "Delivery was delayed but ok" → NEUTRAL
Text: "Broken on arrival, terrible quality" → NEGATIVE

Respond with only the label."""

print("Few-shot classification:")
for text in ["Love this product!", "Eh, it's fine.", "Worst purchase ever."]:
    label = ask(system, f"Text: {text}")
    print(f"  '{text}' → {label}")

# ── Pattern 2: Chain-of-thought reasoning ────────────────────────────────────
system = "You are a data science expert. Think step by step."
question = "A model has 95% accuracy but only 30% precision on fraud detection. What's likely happening?"
print("\nChain-of-thought:")
print(ask(system, f"{question}\nThink step by step."))`,
        output: `Few-shot classification:
  'Love this product!' → POSITIVE
  'Eh, it\'s fine.' → NEUTRAL
  'Worst purchase ever.' → NEGATIVE

Chain-of-thought:
Step 1: 95% accuracy means the model correctly classifies 95% of all transactions.
Step 2: But 30% precision on fraud means only 30% of flagged fraud cases are actually fraud — 70% are false positives.
Step 3: If fraud is rare (e.g., 1% of transactions), a model predicting "not fraud" for everything achieves 99% accuracy!
Step 4: This is the class imbalance problem — the model is biased toward the majority class (legitimate transactions).
Recommendation: Use F1-score, AUC-ROC, or weighted metrics instead of raw accuracy. Resample training data or use class weights.`,
      },
      {
        id: 'pe-table',
        type: 'table',
        title: 'Prompt Engineering Techniques Reference',
        headers: ['Technique', 'When to Use', 'Example Trigger'],
        rows: [
          ['Zero-shot', 'Simple, clear tasks', '"Summarize this text:"'],
          ['Few-shot', 'Specific output format needed', '"Input: X → Output: Y"'],
          ['Chain-of-Thought', 'Math, logic, multi-step reasoning', '"Think step by step"'],
          ['Self-consistency', 'High-stakes reasoning', 'Sample N times, take majority'],
          ['ReAct', 'Tool use, agentic tasks', '"Thought: Action: Observation:"'],
          ['Role prompting', 'Domain expertise needed', '"You are an expert in..."'],
          ['Structured output', 'Parsing needed', '"Respond in JSON format"'],
          ['Constrained generation', 'Controlled vocabulary', '"Answer only Yes or No"'],
        ],
      },
      {
        id: 'pe-callout',
        type: 'callout',
        variant: 'tip',
        title: 'Prompt Engineering Best Practices',
        content: `• **Be specific**: vague prompts → vague answers. Give context, constraints, and examples.\n• **Specify the format**: JSON, markdown, numbered list, max length — don't leave it to chance.\n• **Use system prompts**: set persistent behavior, persona, and constraints in the system role.\n• **Iterate**: test against a diverse set of inputs — edge cases reveal prompt brittleness.\n• **Temperature**: set to 0 for deterministic/factual tasks; 0.7-1.0 for creative tasks.\n• **Test adversarially**: try to break your prompt with tricky inputs before shipping.`,
      },
      {
        id: 'pe-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'E-commerce', useCase: 'Product Description Generation', description: 'Generate SEO-optimized product descriptions from structured data.', example: 'Shopify uses prompt engineering to auto-generate listing descriptions for 2M+ merchants.', companies: ['Shopify', 'Amazon', 'eBay'], icon: '🛒' },
          { industry: 'Education', useCase: 'Personalized Tutoring', description: 'Adjust explanation depth, style, and examples based on student level.', example: 'Khan Academy\'s Khanmigo uses system prompts to maintain Socratic tutoring style across subjects.', companies: ['Khan Academy', 'Duolingo', 'Coursera'], icon: '📚' },
        ],
      },
    ],
  },

  // ─── AI Agents ───────────────────────────────────────────────────────────
  {
    id: 'ai-agents',
    title: 'AI Agents',
    slug: 'ai-agents',
    category: 'generative-ai',
    difficulty: 'advanced',
    estimatedMinutes: 50,
    tags: ['agents', 'tools', 'function-calling', 'multi-agent', 'autonomous', 'planning'],
    description: 'Build AI systems that can plan, use tools, and execute multi-step tasks autonomously.',
    prerequisites: ['llm-basics', 'prompt-engineering'],
    relatedNotebooks: ['llm-basics', 'rag'],
    cells: [
      {
        id: 'agent-intro',
        type: 'markdown',
        content: `# AI Agents\n\nAI agents extend LLMs from answering questions to **taking actions**. An agent can:\n- **Plan** a sequence of steps to achieve a goal\n- **Use tools** (web search, code execution, APIs, databases)\n- **Observe** results and adapt its approach\n- **Execute** until the task is complete\n\nThis transforms LLMs from chatbots into autonomous assistants capable of multi-hour tasks.`,
      },
      {
        id: 'agent-theory',
        type: 'theory',
        title: 'Agent Architecture: Perceive → Plan → Act',
        variant: 'default',
        content: `**Core Loop:**\n1. **Perceive**: observe current state (user request, tool outputs, context)\n2. **Think/Plan**: LLM reasons about next action (using Chain-of-Thought or ReAct)\n3. **Act**: execute a tool call (web search, code, API)\n4. **Observe**: receive tool output\n5. **Repeat** until goal achieved or max steps reached\n\n**Key components:**\n- **Tools**: Python functions the LLM can call (search, calculator, file I/O)\n- **Memory**: short-term (context window) + long-term (vector store)\n- **Planner**: structured reasoning (ReAct, Tree-of-Thought)\n- **Executor**: handles tool calls, error recovery`,
      },
      {
        id: 'agent-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Building an AI Agent with function calling — Anthropic Claude',
        code: `import anthropic
import json

client = anthropic.Anthropic()

# Define tools
tools = [
    {
        "name": "calculate",
        "description": "Perform mathematical calculations",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {"type": "string", "description": "Math expression to evaluate"}
            },
            "required": ["expression"]
        }
    },
    {
        "name": "get_stock_price",
        "description": "Get current stock price for a ticker symbol",
        "input_schema": {
            "type": "object",
            "properties": {
                "ticker": {"type": "string", "description": "Stock ticker (e.g., AAPL)"}
            },
            "required": ["ticker"]
        }
    }
]

# Tool implementations
def execute_tool(name, inputs):
    if name == "calculate":
        result = eval(inputs["expression"])
        return str(result)
    elif name == "get_stock_price":
        # Mock — in production, call a real API
        prices = {"AAPL": 189.25, "GOOGL": 175.50, "MSFT": 415.80}
        return str(prices.get(inputs["ticker"], "Unknown ticker"))

# Agent loop
def run_agent(query: str, max_turns: int = 10):
    messages = [{"role": "user", "content": query}]

    for turn in range(max_turns):
        response = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=1000,
            tools=tools,
            messages=messages
        )

        if response.stop_reason == "end_turn":
            # Extract final text response
            for block in response.content:
                if hasattr(block, 'text'):
                    return block.text
            return "Done"

        # Process tool calls
        messages.append({"role": "assistant", "content": response.content})
        tool_results = []

        for block in response.content:
            if block.type == "tool_use":
                print(f"  Calling tool: {block.name}({block.input})")
                result = execute_tool(block.name, block.input)
                print(f"  Result: {result}")
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": result
                })

        messages.append({"role": "user", "content": tool_results})

# Run
result = run_agent("What is the combined value of 100 AAPL shares and 50 MSFT shares?")
print(f"\\nFinal answer: {result}")`,
        output: `  Calling tool: get_stock_price({'ticker': 'AAPL'})
  Result: 189.25
  Calling tool: get_stock_price({'ticker': 'MSFT'})
  Result: 415.80
  Calling tool: calculate({'expression': '100 * 189.25 + 50 * 415.80'})
  Result: 39815.0

Final answer: The combined value is $39,815.00 — 100 AAPL shares at $189.25 each plus 50 MSFT shares at $415.80 each.`,
      },
      {
        id: 'agent-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Software Development', useCase: 'Autonomous Coding Agents', description: 'Write, test, debug, and deploy code with minimal human intervention.', example: 'Devin (Cognition), SWE-agent, and OpenDevin can resolve GitHub issues end-to-end, scoring 14-50% on SWE-bench.', companies: ['Cognition', 'GitHub', 'Cursor'], icon: '🤖' },
          { industry: 'Research', useCase: 'Automated Research Workflows', description: 'Search literature, synthesize findings, generate hypotheses, and design experiments.', example: 'Turing Award winner Yoshua Bengio\'s group uses LLM agents for automated scientific discovery.', companies: ['Google DeepMind', 'Sakana AI', 'FutureHouse'], icon: '🔬' },
          { industry: 'Finance', useCase: 'Automated Analysis', description: 'Pull financial data, run analysis, and generate reports with tool-calling agents.', example: 'Morgan Stanley uses OpenAI-powered assistants that access 100,000+ research documents for wealth advisors.', companies: ['Morgan Stanley', 'JPMorgan', 'Goldman Sachs'], icon: '📊' },
        ],
      },
    ],
  },

  // ─── Vector Databases ─────────────────────────────────────────────────────
  {
    id: 'vector-databases',
    title: 'Vector Databases',
    slug: 'vector-databases',
    category: 'generative-ai',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    tags: ['vector-store', 'embeddings', 'similarity-search', 'ann', 'faiss', 'pinecone'],
    description: 'Store and search embeddings at scale. The critical infrastructure layer for RAG, semantic search, and recommendation systems.',
    prerequisites: ['llm-basics'],
    relatedNotebooks: ['rag', 'llm-basics'],
    cells: [
      {
        id: 'vdb-intro',
        type: 'markdown',
        content: `# Vector Databases\n\nVector databases store **embeddings** — high-dimensional numerical representations of text, images, or audio — and retrieve them by **semantic similarity** rather than exact keyword match.\n\nThey are the backbone of RAG systems, semantic search, recommendation engines, and duplicate detection at scale.`,
      },
      {
        id: 'vdb-theory',
        type: 'theory',
        title: 'How Vector Search Works',
        variant: 'default',
        content: `**Similarity Metrics:**\n- Cosine similarity: angle between vectors (most common for text)\n- Euclidean distance: geometric distance in embedding space\n- Dot product: used in some trained retrieval models\n\n**Approximate Nearest Neighbor (ANN):**\nBrute-force search is O(n) per query — too slow for millions of vectors.\nANN algorithms trade a small accuracy loss for massive speed gains:\n- **HNSW** (Hierarchical Navigable Small World): graph-based, fast queries\n- **IVF** (Inverted File Index): cluster vectors, search only nearest clusters\n- **FAISS**: Facebook's highly optimized ANN library`,
      },
      {
        id: 'vdb-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Vector search with ChromaDB and OpenAI embeddings',
        code: `import chromadb
from openai import OpenAI

openai_client = OpenAI()

def embed(texts):
    res = openai_client.embeddings.create(
        model="text-embedding-3-small", input=texts
    )
    return [e.embedding for e in res.data]

# Create a local ChromaDB collection
chroma = chromadb.Client()
collection = chroma.create_collection("ml_concepts")

# Index documents
docs = [
    "Linear regression fits a line to minimize squared residuals",
    "Decision trees split data by asking yes/no questions about features",
    "Neural networks learn by adjusting weights through backpropagation",
    "K-means clusters data points by minimizing within-cluster variance",
    "Random forests combine many decision trees by averaging predictions",
    "Gradient boosting trains trees sequentially to correct previous errors",
]

collection.add(
    documents=docs,
    embeddings=embed(docs),
    ids=[f"doc_{i}" for i in range(len(docs))]
)

# Semantic search
query = "how do ensemble methods work?"
results = collection.query(
    query_embeddings=embed([query]),
    n_results=3
)

print(f"Query: '{query}'\\n")
for doc, dist in zip(results['documents'][0], results['distances'][0]):
    print(f"  Score: {1-dist:.3f} | {doc[:80]}...")`,
        output: `Query: 'how do ensemble methods work?'

  Score: 0.892 | Random forests combine many decision trees by averaging predictions...
  Score: 0.847 | Gradient boosting trains trees sequentially to correct previous errors...
  Score: 0.721 | Decision trees split data by asking yes/no questions about features...`,
      },
      {
        id: 'vdb-table',
        type: 'table',
        title: 'Popular Vector Databases Comparison',
        headers: ['Database', 'Type', 'Scale', 'Best For'],
        rows: [
          ['Pinecone', 'Managed Cloud', 'Billions', 'Production RAG, managed service'],
          ['Weaviate', 'Open Source / Cloud', 'Billions', 'Multi-modal, GraphQL interface'],
          ['Qdrant', 'Open Source / Cloud', 'Hundreds of M', 'Rust-based, fast, flexible filtering'],
          ['ChromaDB', 'Open Source', 'Millions', 'Local dev, prototyping, embedded'],
          ['pgvector', 'PostgreSQL Extension', 'Millions', 'Existing Postgres users'],
          ['FAISS', 'Library (Facebook)', 'Billions', 'Custom pipelines, research'],
          ['Redis VSS', 'In-Memory', 'Millions', 'Low-latency, existing Redis users'],
        ],
      },
    ],
  },

  // ─── Fine-Tuning ──────────────────────────────────────────────────────────
  {
    id: 'fine-tuning',
    title: 'Fine-Tuning LLMs',
    slug: 'fine-tuning',
    category: 'generative-ai',
    difficulty: 'advanced',
    estimatedMinutes: 50,
    tags: ['fine-tuning', 'lora', 'sft', 'qlora', 'instruction-tuning', 'peft'],
    description: 'Adapt pre-trained LLMs to your specific domain and task with supervised fine-tuning and parameter-efficient methods.',
    prerequisites: ['llm-basics', 'transformer'],
    relatedNotebooks: ['llm-basics', 'rag'],
    cells: [
      {
        id: 'ft-intro',
        type: 'markdown',
        content: `# Fine-Tuning LLMs\n\nFine-tuning adapts a pre-trained LLM to a specific domain, task, or format by continuing training on task-specific data. When should you fine-tune instead of prompt engineering?\n\n**Use fine-tuning when:**\n- Prompt engineering can't achieve desired quality/consistency\n- You need a specific output format reliably\n- You want to inject domain knowledge (medical, legal, internal)\n- Latency or cost requires a smaller specialized model`,
      },
      {
        id: 'ft-theory-lora',
        type: 'theory',
        title: 'LoRA — Low-Rank Adaptation',
        variant: 'math',
        content: `Full fine-tuning updates all parameters (billions!) — expensive and risky. LoRA is a parameter-efficient approach:\n\n**Key idea**: Instead of updating weight matrix W (m×n), learn two small matrices A (m×r) and B (r×n) where r << min(m,n).\n\nThe update is: ΔW = BA (low-rank decomposition)\nFull model: W' = W + αBA\n\n**Why it works**: Empirically, weight updates during fine-tuning have intrinsic low rank. LoRA captures this efficiently.\n\n**Savings**: Fine-tuning LLaMA-7B requires ~28GB VRAM normally. With LoRA (rank=8): ~8GB. With QLoRA (4-bit quantization): ~5GB — fits on a single consumer GPU!`,
      },
      {
        id: 'ft-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Fine-tuning LLM with LoRA using HuggingFace + PEFT',
        code: `from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer
from datasets import Dataset

# Load base model (use smaller model for demo)
model_name = "microsoft/phi-2"  # 2.7B — good for fine-tuning experiments
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name, torch_dtype="auto", device_map="auto"
)

# Configure LoRA
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,              # rank — lower = fewer params, faster; higher = more capacity
    lora_alpha=32,     # scaling factor
    target_modules=["q_proj", "v_proj"],  # which layers to adapt
    lora_dropout=0.05,
    bias="none",
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# Training data (instruction format)
data = [
    {"text": "### Instruction: Explain overfitting.\\n### Response: Overfitting occurs when..."},
    {"text": "### Instruction: What is gradient descent?\\n### Response: Gradient descent is..."},
    # ... more examples
]
dataset = Dataset.from_list(data)

# Train
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=TrainingArguments(
        output_dir="./fine-tuned-model",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        fp16=True,
        logging_steps=10,
    ),
    dataset_text_field="text",
    max_seq_length=512,
)
trainer.train()
model.save_pretrained("./fine-tuned-lora-adapter")`,
        output: `trainable params: 2,097,152 || all params: 2,779,683,840 || trainable%: 0.075
Loading checkpoint shards: 100%

Training complete. Adapter saved to ./fine-tuned-lora-adapter
Trainable parameters: 2M (0.075% of 2.7B total — massive efficiency!)`,
      },
      {
        id: 'ft-comparison',
        type: 'comparison',
        title: 'Fine-Tuning vs RAG vs Prompt Engineering',
        items: [
          {
            label: 'Prompt Engineering',
            pros: ['No training cost', 'Instant iteration', 'No infra needed'],
            cons: ['Limited consistency', 'Prompt token costs accumulate', 'Can\'t deeply modify behavior'],
            whenToUse: 'Start here. Works for 80% of use cases.',
          },
          {
            label: 'RAG',
            pros: ['Knowledge always fresh', 'Cite sources', 'No training needed'],
            cons: ['Retrieval latency', 'Quality depends on chunking', 'Hallucinations still possible'],
            whenToUse: 'When you need up-to-date info from large private knowledge bases.',
          },
          {
            label: 'Fine-Tuning',
            pros: ['Deeply customized behavior', 'Faster/cheaper at inference', 'Domain expertise'],
            cons: ['Training cost and time', 'Knowledge can become stale', 'Requires curated dataset'],
            whenToUse: 'When format consistency, domain expertise, or latency/cost is critical.',
          },
        ],
      },
    ],
  },
];
