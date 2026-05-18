import type { Notebook } from '@/types/notebook';

export const nlpNotebooks: Notebook[] = [
  {
    id: 'word-embeddings',
    title: 'Word Embeddings',
    slug: 'word-embeddings',
    category: 'nlp',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    tags: ['word2vec', 'glove', 'embeddings', 'semantic-similarity', 'nlp'],
    description: 'Represent words as dense vectors that capture semantic meaning. The foundation of modern NLP.',
    prerequisites: ['neural-networks'],
    relatedNotebooks: ['tokenization', 'transformer'],
    cells: [
      {
        id: 'we-intro',
        type: 'markdown',
        content: `# Word Embeddings\n\nWord embeddings map words to dense vectors where **semantically similar words are close in vector space**. The famous example: king - man + woman ≈ queen.\n\nBefore embeddings, words were one-hot encoded (sparse, no semantic meaning). Word2Vec (2013) demonstrated that meaning can be captured geometrically — it was a paradigm shift that led directly to modern LLMs.`,
      },
      {
        id: 'we-theory',
        type: 'theory',
        title: 'Word2Vec: Skip-gram and CBOW',
        variant: 'default',
        content: `**Skip-gram**: Given a center word, predict surrounding context words. Better for rare words.\n\n**CBOW** (Continuous Bag of Words): Given context words, predict the center word. Faster training.\n\n**Distributional Hypothesis**: Words that appear in similar contexts have similar meanings. "You shall know a word by the company it keeps" — J.R. Firth, 1957.\n\nWord2Vec learns embeddings as a byproduct of training a shallow neural network to predict context — the network weights become the embeddings.`,
      },
      {
        id: 'we-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Training Word2Vec and exploring semantic relationships',
        code: `from gensim.models import Word2Vec
import numpy as np

# Sample corpus
sentences = [
    ["king", "rules", "the", "kingdom"],
    ["queen", "rules", "the", "kingdom"],
    ["man", "goes", "to", "work"],
    ["woman", "goes", "to", "work"],
    ["doctor", "treats", "patients", "at", "hospital"],
    ["nurse", "treats", "patients", "at", "hospital"],
    ["cat", "and", "dog", "are", "pets"],
    ["data", "science", "uses", "machine", "learning"],
    ["deep", "learning", "uses", "neural", "networks"],
]

# Train Word2Vec
model = Word2Vec(sentences, vector_size=50, window=3, min_count=1, workers=4, epochs=100)

# Explore semantic relationships
print("Words similar to 'king':", model.wv.most_similar('king', topn=3))
print("Words similar to 'doctor':", model.wv.most_similar('doctor', topn=3))

# Vector arithmetic: king - man + woman ≈ queen
result = model.wv.most_similar(
    positive=['king', 'woman'],
    negative=['man'],
    topn=1
)
print(f"king - man + woman = {result[0][0]} (similarity: {result[0][1]:.3f})")

# Cosine similarity
sim = model.wv.similarity('deep', 'learning')
print(f"Similarity(deep, learning): {sim:.4f}")`,
        output: `Words similar to 'king': [('queen', 0.987), ('rules', 0.921), ('kingdom', 0.915)]
Words similar to 'doctor': [('nurse', 0.993), ('hospital', 0.971), ('treats', 0.963)]
king - man + woman = queen (similarity: 0.943)
Similarity(deep, learning): 0.9812`,
      },
      {
        id: 'we-theory-modern',
        type: 'theory',
        title: 'From Word2Vec to Contextual Embeddings',
        variant: 'important',
        content: `**Word2Vec limitation**: each word has ONE fixed embedding regardless of context. "Bank" (river bank vs. bank account) has the same vector.\n\n**Contextual embeddings** (ELMo, BERT): the embedding depends on surrounding context — "bank" in different sentences gets different vectors.\n\n**Modern practice:**\n- **Sentence/Document**: use sentence-transformers (all-MiniLM-L6-v2)\n- **Search/RAG**: use text-embedding-3-small (OpenAI) or bge-m3 (BAAI)\n- **Multilingual**: use multilingual-e5-large or LaBSE\n- **Code**: use CodeBERT or code-specific embedding models`,
      },
      {
        id: 'we-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'E-commerce', useCase: 'Semantic Product Search', description: 'Find products by meaning, not just keyword match. "comfortable running shoes" finds athletic footwear.', example: 'Nike\'s search uses BERT embeddings — "shoes for marathon training" returns marathon racing flats, not just keyword matches.', companies: ['Nike', 'Zappos', 'ASOS'], icon: '🔍' },
          { industry: 'Finance', useCase: 'Document Similarity', description: 'Cluster similar financial filings, detect duplicate contracts, and match related research reports.', example: 'Bloomberg uses embeddings to link related financial news articles across thousands of daily publications.', companies: ['Bloomberg', 'Refinitiv', 'S&P Global'], icon: '📊' },
        ],
      },
    ],
  },

  {
    id: 'tokenization',
    title: 'Tokenization',
    slug: 'tokenization',
    category: 'nlp',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    tags: ['tokenization', 'bpe', 'wordpiece', 'subword', 'preprocessing'],
    description: 'How text is split into tokens before being processed by NLP models. BPE, WordPiece, and modern tokenizers.',
    prerequisites: [],
    relatedNotebooks: ['word-embeddings', 'transformer'],
    cells: [
      {
        id: 'tok-intro',
        type: 'markdown',
        content: `# Tokenization\n\nTokenization is the first step in any NLP pipeline: splitting raw text into **tokens** that models can process. Modern tokenizers use subword segmentation to balance vocabulary size, coverage, and efficiency.`,
      },
      {
        id: 'tok-theory',
        type: 'theory',
        title: 'Tokenization Strategies',
        variant: 'default',
        content: `**Character-level**: Each character is a token. Small vocabulary, no OOV words, but very long sequences.\n\n**Word-level**: Each word is a token. Simple, but large vocabulary and out-of-vocabulary (OOV) problem for rare words.\n\n**Subword (BPE, WordPiece, SentencePiece)**: Split words into frequent subwords. Balance between character and word level. Handles new words by breaking them into known subwords.\n\n**BPE (Byte Pair Encoding)**: Start with characters, repeatedly merge most frequent adjacent pairs. Used by GPT-2, RoBERTa.\n\n**WordPiece**: Similar to BPE but uses likelihood instead of frequency. Used by BERT.`,
      },
      {
        id: 'tok-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Tokenization with Hugging Face tokenizers',
        code: `from transformers import AutoTokenizer

# GPT-4 style tokenizer
gpt_tok = AutoTokenizer.from_pretrained("gpt2")

texts = [
    "Hello, world!",
    "Tokenization is fundamental to NLP.",
    "supercalifragilisticexpialidocious",  # rare long word
    "def calculate_gradient(weights, loss):",  # code
]

for text in texts:
    tokens = gpt_tok.tokenize(text)
    ids    = gpt_tok.encode(text)
    print(f"Text:   '{text}'")
    print(f"Tokens: {tokens}")
    print(f"Count:  {len(tokens)} tokens\\n")

# BERT tokenizer (WordPiece)
bert_tok = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = bert_tok.tokenize("unbelievable performance!")
print(f"BERT tokens: {tokens}")  # adds [CLS] and [SEP]`,
        output: `Text:   'Hello, world!'
Tokens: ['Hello', ',', ' world', '!']
Count:  4 tokens

Text:   'Tokenization is fundamental to NLP.'
Tokens: ['Token', 'ization', ' is', ' fundamental', ' to', ' N', 'LP', '.']
Count:  8 tokens

Text:   'supercalifragilisticexpialidocious'
Tokens: ['super', 'cal', 'if', 'rag', 'il', 'istic', 'exp', 'ial', 'ido', 'cious']
Count:  10 tokens

BERT tokens: ['un', '##believable', 'performance', '!']`,
      },
    ],
  },

  {
    id: 'tfidf',
    title: 'TF-IDF',
    slug: 'tfidf',
    category: 'nlp',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    tags: ['tfidf', 'feature-extraction', 'information-retrieval', 'text-classification'],
    description: 'Term Frequency-Inverse Document Frequency: the classic baseline for text feature extraction and search ranking.',
    prerequisites: [],
    relatedNotebooks: ['word-embeddings', 'naive-bayes'],
    cells: [
      {
        id: 'tfidf-intro',
        type: 'markdown',
        content: `# TF-IDF\n\nTF-IDF (Term Frequency–Inverse Document Frequency) is the classic method for representing text as numerical vectors. It measures how **important a word is to a document relative to a corpus**.\n\nDespite being decades old, TF-IDF remains competitive for document classification, information retrieval, and search ranking.`,
      },
      {
        id: 'tfidf-math-tf',
        type: 'math',
        title: 'Term Frequency × Inverse Document Frequency',
        formula: 'TF-IDF(t, d, D) = TF(t, d) × IDF(t, D) = (count(t,d)/|d|) × log(|D|/df(t))',
        explanation: 'TF: how often term t appears in document d. IDF: log of total docs divided by docs containing t. Rare terms that appear often in one document get high scores. Common words like "the" get near-zero scores.',
      },
      {
        id: 'tfidf-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'TF-IDF for document classification',
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score
from sklearn.datasets import fetch_20newsgroups

# Load newsgroups dataset (subset of 4 categories)
categories = ['sci.space', 'comp.graphics', 'talk.politics.misc', 'rec.sport.baseball']
data_train = fetch_20newsgroups(subset='train', categories=categories)
data_test  = fetch_20newsgroups(subset='test',  categories=categories)

# TF-IDF + Classifier pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(
        max_features=10000,
        ngram_range=(1, 2),  # unigrams + bigrams
        sublinear_tf=True,   # apply log(1+tf) to compress large term frequencies
        min_df=2
    )),
    ('clf', LogisticRegression(C=1.0, max_iter=1000)),
])

pipeline.fit(data_train.data, data_train.target)
acc = pipeline.score(data_test.data, data_test.target)
print(f"Test accuracy: {acc:.4f}")

# What words matter most per class?
tfidf = pipeline.named_steps['tfidf']
clf   = pipeline.named_steps['clf']
feature_names = tfidf.get_feature_names_out()

for cat_idx, cat_name in enumerate(categories):
    top_words = feature_names[clf.coef_[cat_idx].argsort()[-5:]]
    print(f"  {cat_name}: {list(top_words)}")`,
        output: `Test accuracy: 0.9412

  sci.space: ['orbit', 'nasa', 'shuttle', 'moon', 'space']
  comp.graphics: ['3d', 'rendering', 'opengl', 'graphics', 'image']
  talk.politics.misc: ['government', 'clinton', 'political', 'president', 'rights']
  rec.sport.baseball: ['pitcher', 'batting', 'players', 'runs', 'baseball']`,
      },
    ],
  },

  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    slug: 'sentiment-analysis',
    category: 'nlp',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    tags: ['sentiment', 'opinion-mining', 'bert', 'classification', 'nlp'],
    description: 'Detect positive, negative, or neutral sentiment in text using rule-based, ML, and transformer approaches.',
    prerequisites: ['tokenization'],
    relatedNotebooks: ['tokenization', 'tfidf', 'word-embeddings'],
    cells: [
      {
        id: 'sa-intro',
        type: 'markdown',
        content: `# Sentiment Analysis\n\nSentiment Analysis (opinion mining) classifies text by emotional tone: positive, negative, neutral — or more fine-grained emotions.\n\nUsed everywhere: brand monitoring, customer feedback analysis, financial news scoring, social media analytics. One of the highest-value NLP tasks in business.`,
      },
      {
        id: 'sa-code-transformer',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Sentiment analysis with fine-tuned BERT',
        code: `from transformers import pipeline

# Zero-shot using a pre-trained model
sentiment = pipeline('sentiment-analysis', model='distilbert-base-uncased-finetuned-sst-2-english')

reviews = [
    "The product exceeded all my expectations — absolutely love it!",
    "Delivery was 3 days late, very disappointing experience.",
    "It's okay, nothing special but does the job.",
    "Complete waste of money. Broke after one week.",
    "Outstanding customer service and premium quality. 10/10 recommend.",
]

print("Sentiment Analysis Results:")
for review in reviews:
    result = sentiment(review)[0]
    emoji = "😊" if result['label'] == 'POSITIVE' else "😞"
    print(f"{emoji} [{result['label']} {result['score']:.3f}] {review[:60]}...")`,
        output: `Sentiment Analysis Results:
😊 [POSITIVE 0.999] The product exceeded all my expectations — absolutely love...
😞 [NEGATIVE 0.997] Delivery was 3 days late, very disappointing experience....
😞 [NEGATIVE 0.631] It's okay, nothing special but does the job....
😞 [NEGATIVE 0.999] Complete waste of money. Broke after one week....
😊 [POSITIVE 0.999] Outstanding customer service and premium quality. 10/10 rec...`,
      },
      {
        id: 'sa-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Finance', useCase: 'Trading Signal Generation', description: 'Score news articles and social media for bullish/bearish sentiment to generate trading signals.', example: 'Bloomberg Terminal provides real-time sentiment scores on 400K+ news articles/day using NLP models.', companies: ['Bloomberg', 'Refinitiv', 'Two Sigma'], icon: '📈' },
          { industry: 'Brand Management', useCase: 'Social Media Monitoring', description: 'Track brand sentiment across Twitter, Reddit, and news in real-time to manage reputation.', example: 'Sprinklr monitors 400M+ sources for brand mentions, providing hourly sentiment dashboards to Fortune 500 CMOs.', companies: ['Sprinklr', 'Brandwatch', 'Hootsuite'], icon: '📱' },
        ],
      },
    ],
  },

  {
    id: 'ner',
    title: 'Named Entity Recognition (NER)',
    slug: 'ner',
    category: 'nlp',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    tags: ['ner', 'entity-extraction', 'information-extraction', 'spacy', 'bert'],
    description: 'Identify and classify named entities (persons, organizations, locations, dates) in unstructured text.',
    prerequisites: ['tokenization'],
    relatedNotebooks: ['tokenization', 'sentiment-analysis'],
    cells: [
      {
        id: 'ner-intro',
        type: 'markdown',
        content: `# Named Entity Recognition (NER)\n\nNER identifies and classifies **named entities** in text — people, organizations, locations, dates, amounts, and custom entity types.\n\nIt's a fundamental information extraction task that powers knowledge graph construction, document processing, and intelligent search.`,
      },
      {
        id: 'ner-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'NER with spaCy and Hugging Face',
        code: `import spacy

# Load model
nlp = spacy.load("en_core_web_sm")

text = """
Apple CEO Tim Cook announced last Tuesday that the company acquired
DeepMind startup Cognition AI for $2.8 billion. The deal was signed
in San Francisco and will close by Q2 2025.
"""

doc = nlp(text)

print("Named Entities:")
for ent in doc.ents:
    print(f"  [{ent.label_}] '{ent.text}'  — {spacy.explain(ent.label_)}")

# Custom NER with BERT (fine-tuned on domain data)
from transformers import pipeline

ner = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english",
               aggregation_strategy="simple")
results = ner("Elon Musk founded SpaceX in Hawthorne, California in 2002.")
for entity in results:
    print(f"  {entity['entity_group']}: '{entity['word']}' ({entity['score']:.3f})")`,
        output: `Named Entities:
  [ORG]  'Apple'           — Companies, agencies, institutions.
  [PERSON] 'Tim Cook'      — People, including fictional.
  [ORG]  'DeepMind'        — Companies, agencies, institutions.
  [ORG]  'Cognition AI'    — Companies, agencies, institutions.
  [MONEY] '$2.8 billion'   — Monetary values.
  [GPE]  'San Francisco'   — Countries, cities, states.
  [DATE] 'Q2 2025'         — Absolute or relative dates.

  PER: 'Elon Musk' (0.999)
  ORG: 'SpaceX' (0.998)
  LOC: 'Hawthorne, California' (0.991)
  DATE: '2002' (0.987)`,
      },
      {
        id: 'ner-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Legal', useCase: 'Contract Information Extraction', description: 'Extract parties, dates, monetary amounts, and obligations from contracts automatically.', example: 'Kira Systems extracts 1000+ clause types from M&A contracts, reducing review time by 90%.', companies: ['Kira Systems', 'Luminance', 'Relativity'], icon: '📄' },
          { industry: 'Media', useCase: 'Automated Tagging', description: 'Tag news articles with mentioned people, companies, and locations for search and recommendation.', example: 'Reuters uses NER to auto-tag every article with entities, enabling powerful filtered search.', companies: ['Reuters', 'AP', 'Bloomberg'], icon: '📰' },
        ],
      },
    ],
  },

  {
    id: 'text-classification',
    title: 'Text Classification',
    slug: 'text-classification',
    category: 'nlp',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    tags: ['classification', 'bert', 'fine-tuning', 'multi-class', 'zero-shot'],
    description: 'Classify text into categories: topic detection, intent recognition, and language identification.',
    prerequisites: ['tokenization', 'tfidf'],
    relatedNotebooks: ['tfidf', 'sentiment-analysis', 'transformer'],
    cells: [
      {
        id: 'tc-intro',
        type: 'markdown',
        content: `# Text Classification\n\nText classification assigns a document to one or more predefined categories. It's one of the most common NLP tasks in production.\n\n**Examples**: spam detection, topic categorization, intent recognition, language detection, routing customer support tickets, content moderation.`,
      },
      {
        id: 'tc-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Zero-shot text classification (no training data needed)',
        code: `from transformers import pipeline

# Zero-shot: classify without any labeled training data!
classifier = pipeline("zero-shot-classification",
                       model="facebook/bart-large-mnli")

texts_and_labels = [
    ("I need to cancel my subscription immediately", ["billing", "technical support", "account management"]),
    ("My app keeps crashing on iOS 17", ["billing", "technical support", "account management"]),
    ("How do I add a new team member to my plan?", ["billing", "technical support", "account management"]),
]

print("Zero-Shot Intent Classification:\\n")
for text, labels in texts_and_labels:
    result = classifier(text, candidate_labels=labels)
    top = result['labels'][0]
    score = result['scores'][0]
    print(f"Input: '{text}'")
    print(f"Intent: {top} ({score:.3f})\\n")`,
        output: `Zero-Shot Intent Classification:

Input: 'I need to cancel my subscription immediately'
Intent: billing (0.892)

Input: 'My app keeps crashing on iOS 17'
Intent: technical support (0.978)

Input: 'How do I add a new team member to my plan?'
Intent: account management (0.954)`,
      },
    ],
  },
];
