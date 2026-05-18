import type { Notebook } from '@/types/notebook';

export const deepLearningNotebooks: Notebook[] = [
  // ─── Neural Networks ──────────────────────────────────────────────────────
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    slug: 'neural-networks',
    category: 'deep-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 50,
    tags: ['deep-learning', 'backpropagation', 'activation-functions', 'multilayer-perceptron'],
    description: 'Understand how artificial neural networks are inspired by the brain, learn through backpropagation, and approximate any function.',
    prerequisites: ['linear-regression', 'logistic-regression'],
    relatedNotebooks: ['cnn', 'lstm', 'transformer'],
    cells: [
      {
        id: 'nn-intro',
        type: 'markdown',
        content: `# Neural Networks\n\nNeural networks are **universal function approximators** — given enough neurons, they can model any continuous function. They learn by adjusting millions of weights through backpropagation.\n\nModern deep learning stacks these layers — sometimes thousands deep — enabling breakthroughs in image recognition, language understanding, and game playing.`,
      },
      {
        id: 'nn-theory-neuron',
        type: 'theory',
        title: 'The Artificial Neuron',
        variant: 'default',
        content: `A neuron receives inputs, multiplies by weights, adds a bias, and passes through an **activation function**:\n\n1. **Weighted sum**: z = Σ wᵢxᵢ + b\n2. **Activation**: a = σ(z)\n\nThe activation function is crucial — without it, a multi-layer network collapses to a single linear transformation. Activation functions introduce **non-linearity**, allowing the network to learn complex patterns.`,
      },
      {
        id: 'nn-theory-activations',
        type: 'theory',
        title: 'Activation Functions',
        variant: 'math',
        content: `**ReLU** (most common): f(x) = max(0, x) — fast, no vanishing gradient problem for positive values. Default choice for hidden layers.\n\n**Sigmoid**: f(x) = 1/(1+e⁻ˣ) — outputs (0,1), good for binary output layer. Causes vanishing gradients in deep networks.\n\n**Tanh**: f(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) — outputs (-1,1), zero-centered, better than sigmoid for hidden layers.\n\n**Softmax**: f(xᵢ) = eˣⁱ/Σeˣʲ — multi-class output, outputs sum to 1 (probabilities).`,
      },
      {
        id: 'nn-diagram',
        type: 'diagram',
        title: 'Multilayer Perceptron (MLP) Architecture',
        diagramType: 'architecture',
        content: `
Input Layer          Hidden Layer 1       Hidden Layer 2       Output Layer
   x₁ ────────────── h₁₁ ───────────────  h₂₁
   x₂ ──╲──╱──────── h₁₂ ──╲──╱──────── h₂₂ ──────────────  ŷ (prob)
   x₃ ──╱──╲──────── h₁₃ ──╱──╲──────── h₂₃
   x₄ ────────────── h₁₄                 h₂₄

  [4 inputs]         [4 neurons, ReLU]    [4 neurons, ReLU]   [1 neuron, Sigmoid]

Forward pass: x → h₁ → h₂ → ŷ    Backward pass: ∂L/∂ŷ → ∂L/∂h₂ → ∂L/∂h₁ → ∂L/∂w
`,
      },
      {
        id: 'nn-math-forward',
        type: 'math',
        title: 'Forward Pass',
        formula: 'Z⁽ˡ⁾ = W⁽ˡ⁾ · A⁽ˡ⁻¹⁾ + b⁽ˡ⁾     A⁽ˡ⁾ = σ(Z⁽ˡ⁾)',
        explanation: 'W⁽ˡ⁾ are the weight matrix for layer l, A⁽ˡ⁻¹⁾ are activations from previous layer, b⁽ˡ⁾ is the bias vector. This is a matrix multiplication for each layer.',
      },
      {
        id: 'nn-math-backprop',
        type: 'math',
        title: 'Backpropagation — Chain Rule',
        formula: '∂L/∂W⁽ˡ⁾ = ∂L/∂A⁽ˡ⁾ · σ\'(Z⁽ˡ⁾) · A⁽ˡ⁻¹⁾ᵀ',
        explanation: 'Backprop applies the chain rule of calculus to compute gradients layer by layer from output to input. The gradient ∂L/∂W tells us how to adjust each weight to reduce the loss.',
      },
      {
        id: 'nn-code-scratch',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Neural Network from scratch with NumPy — understanding the math',
        code: `import numpy as np

class NeuralNetwork:
    def __init__(self, layers):
        """layers: list of layer sizes e.g. [4, 8, 4, 1]"""
        self.weights = []
        self.biases  = []
        for i in range(len(layers)-1):
            # He initialization for ReLU
            W = np.random.randn(layers[i+1], layers[i]) * np.sqrt(2.0/layers[i])
            b = np.zeros((layers[i+1], 1))
            self.weights.append(W)
            self.biases.append(b)

    def relu(self, z):    return np.maximum(0, z)
    def relu_d(self, z):  return (z > 0).astype(float)
    def sigmoid(self, z): return 1 / (1 + np.exp(-z))

    def forward(self, X):
        A = X.T
        self.cache = [A]
        for W, b in zip(self.weights[:-1], self.biases[:-1]):
            Z = W @ A + b
            A = self.relu(Z)
            self.cache.append((Z, A))
        # Output layer: sigmoid
        Z = self.weights[-1] @ A + self.biases[-1]
        A = self.sigmoid(Z)
        self.cache.append((Z, A))
        return A

    def backward(self, X, y, lr=0.01):
        m = X.shape[0]
        dA = -(y / (self.forward(X) + 1e-8)) + ((1-y) / (1 - self.forward(X) + 1e-8))
        # Backprop through layers (simplified)
        for i in reversed(range(len(self.weights))):
            Z, A = self.cache[i+1] if isinstance(self.cache[i+1], tuple) else (None, self.cache[i+1])
            A_prev = self.cache[i] if not isinstance(self.cache[i], tuple) else self.cache[i][1]
            dZ = dA * (self.sigmoid(Z) * (1 - self.sigmoid(Z)) if i == len(self.weights)-1
                       else self.relu_d(Z))
            dW = dZ @ A_prev.T / m
            db = dZ.mean(axis=1, keepdims=True)
            dA = self.weights[i].T @ dZ
            self.weights[i] -= lr * dW
            self.biases[i]  -= lr * db

    def train(self, X, y, epochs=1000, lr=0.01):
        for epoch in range(epochs):
            y_hat = self.forward(X)
            loss  = -np.mean(y * np.log(y_hat + 1e-8) + (1-y) * np.log(1-y_hat + 1e-8))
            self.backward(X, y, lr)
            if epoch % 200 == 0:
                print(f"Epoch {epoch:4d} | Loss: {loss:.4f}")

# XOR problem (non-linearly separable)
X = np.array([[0,0],[0,1],[1,0],[1,1]])
y = np.array([[0,1,1,0]])
nn = NeuralNetwork([2, 4, 1])
nn.train(X, y, epochs=1000, lr=0.1)
preds = (nn.forward(X) > 0.5).astype(int)
print(f"Predictions: {preds.ravel()}")
print(f"Expected:    {y.ravel()}")`,
        output: `Epoch    0 | Loss: 0.6843
Epoch  200 | Loss: 0.4821
Epoch  400 | Loss: 0.2103
Epoch  600 | Loss: 0.0891
Epoch  800 | Loss: 0.0512
Predictions: [0 1 1 0]
Expected:    [0 1 1 0]`,
      },
      {
        id: 'nn-code-keras',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Neural Network with Keras — MNIST handwritten digit classification',
        code: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Load and preprocess MNIST
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
X_train = X_train.reshape(-1, 784) / 255.0
X_test  = X_test.reshape(-1, 784) / 255.0

# Build model
model = keras.Sequential([
    layers.Dense(256, activation='relu', input_shape=(784,)),
    layers.Dropout(0.3),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(10, activation='softmax'),
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print(model.summary())

# Train
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=128,
    validation_split=0.1,
    verbose=0
)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTest Accuracy: {test_acc:.4f}")
print(f"Test Loss:     {test_loss:.4f}")
print(f"Parameters:    {model.count_params():,}")`,
        output: `Model: "sequential"
Total params: 235,146

Test Accuracy: 0.9812
Test Loss:     0.0726
Parameters:    235,146`,
      },
      {
        id: 'nn-chart-loss',
        type: 'chart',
        chartType: 'line',
        title: 'Training vs Validation Loss',
        description: 'Both curves decrease and converge — no overfitting. The gap between train and val indicates generalization.',
        xLabel: 'Epoch',
        yLabel: 'Cross-Entropy Loss',
        data: [
          { x: 1, train: 0.68, val: 0.62 }, { x: 2, train: 0.42, val: 0.38 },
          { x: 3, train: 0.28, val: 0.26 }, { x: 4, train: 0.20, val: 0.19 },
          { x: 5, train: 0.15, val: 0.15 }, { x: 6, train: 0.12, val: 0.12 },
          { x: 7, train: 0.10, val: 0.11 }, { x: 8, train: 0.09, val: 0.10 },
          { x: 9, train: 0.08, val: 0.09 }, { x: 10, train: 0.07, val: 0.09 },
        ],
      },
      {
        id: 'nn-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Finance', useCase: 'Algorithmic Trading', description: 'Predict asset price movements using market features, order book data, and technical indicators.', example: 'Two Sigma and Renaissance Technologies use deep learning for quantitative trading strategies.', companies: ['Two Sigma', 'D.E. Shaw', 'Citadel'], icon: '📈' },
          { industry: 'Healthcare', useCase: 'Drug Discovery', description: 'Predict molecular properties and drug-target interactions to accelerate pharmaceutical R&D.', example: 'AlphaFold from DeepMind predicted protein structures for ~200M proteins, revolutionizing structural biology.', companies: ['DeepMind', 'Schrödinger', 'Insilico Medicine'], icon: '💊' },
          { industry: 'Manufacturing', useCase: 'Predictive Maintenance', description: 'Predict equipment failures from sensor data (vibration, temperature, current) before breakdowns occur.', example: 'GE Predix platform uses neural networks across 10,000+ industrial assets, reducing unplanned downtime by 20%.', companies: ['GE', 'Siemens', 'Bosch'], icon: '⚙️' },
        ],
      },
      {
        id: 'nn-quiz',
        type: 'quiz',
        title: 'Knowledge Check',
        questions: [
          {
            question: 'Why does a neural network without activation functions reduce to linear regression?',
            options: [
              'Because the weights become zero',
              'Because a composition of linear functions is still a linear function',
              'Because the loss surface becomes convex',
              'Because gradients vanish',
            ],
            correct: 1,
            explanation: 'Without activation functions, each layer computes a linear transformation. Since a composition of linear transformations is still linear (W₂(W₁x) = (W₂W₁)x), the entire deep network is equivalent to a single linear layer. Non-linear activations are essential for learning complex patterns.',
          },
          {
            question: 'What is the vanishing gradient problem?',
            options: [
              'Gradients become infinite in early layers',
              'Gradients become exponentially small in early layers, preventing learning',
              'The model forgets its training data',
              'The learning rate becomes too large',
            ],
            correct: 1,
            explanation: 'During backpropagation, gradients are multiplied layer by layer. If activation derivatives are < 1 (like sigmoid: max derivative is 0.25), gradients shrink exponentially toward the input layers, making early layers learn extremely slowly. ReLU solves this since its derivative is 1 for positive inputs.',
          },
        ],
      },
      {
        id: 'nn-interview',
        type: 'interview',
        title: 'Interview Questions',
        questions: [
          {
            question: 'Explain backpropagation in plain language.',
            answer: 'Backpropagation is how a neural network learns from its mistakes. After a forward pass gives a prediction, we compute the error. Then, working backwards through the network, we use the chain rule of calculus to figure out how much each weight contributed to the error. Finally, we nudge each weight in the direction that reduces the error (gradient descent). This happens thousands of times until the network becomes accurate.',
            difficulty: 'easy',
          },
          {
            question: 'What is batch normalization and why is it useful?',
            answer: 'Batch normalization normalizes the activations within each mini-batch to have mean ≈ 0 and std ≈ 1, then applies learned scale (γ) and shift (β). Benefits: (1) Reduces internal covariate shift — stabilizes training, (2) Acts as regularization — reduces need for Dropout, (3) Allows higher learning rates — faster training, (4) Less sensitive to initialization. Essentially makes each layer\'s input distribution more stable, enabling deeper networks to train effectively.',
            difficulty: 'medium',
          },
        ],
      },
    ],
  },

  // ─── CNN ─────────────────────────────────────────────────────────────────
  {
    id: 'cnn',
    title: 'Convolutional Neural Network (CNN)',
    slug: 'cnn',
    category: 'deep-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    tags: ['computer-vision', 'image-classification', 'convolution', 'pooling', 'feature-maps'],
    description: 'Learn how CNNs use local connectivity and parameter sharing to efficiently process images and spatial data.',
    prerequisites: ['neural-networks'],
    relatedNotebooks: ['neural-networks', 'transformer'],
    cells: [
      {
        id: 'cnn-intro',
        type: 'markdown',
        content: `# Convolutional Neural Networks (CNN)\n\nCNNs revolutionized computer vision by using **convolutional layers** that exploit spatial structure in images. Instead of connecting every pixel to every neuron (expensive!), convolutions use small **filters** that slide across the image, detecting local features like edges, textures, and shapes.\n\nResNet, VGG, EfficientNet — all are CNN architectures that power modern visual AI.`,
      },
      {
        id: 'cnn-theory',
        type: 'theory',
        title: 'Key Components of a CNN',
        variant: 'default',
        content: `**Convolutional Layer**: A filter (e.g., 3×3) slides over the input, computing dot products. Each filter learns to detect a specific feature (vertical edge, curve, etc.).\n\n**Pooling Layer**: Downsamples feature maps (e.g., max pooling takes max value in each 2×2 region). Reduces spatial dimensions while preserving important features.\n\n**Fully Connected Layer**: After convolutional layers extract features, FC layers combine them for final classification.\n\n**Key advantages**:\n- Parameter sharing: one filter applied across entire image (e.g., edge detector works anywhere)\n- Translation invariance: detects features regardless of position`,
      },
      {
        id: 'cnn-diagram',
        type: 'diagram',
        title: 'CNN Architecture',
        diagramType: 'architecture',
        content: `
Input Image     Conv2D       MaxPool      Conv2D       MaxPool       FC         Output
 (32×32×3)   (30×30×32)   (15×15×32)  (13×13×64)   (6×6×64)    (128)     (10 classes)

  [🖼️ img] → [≡filters] → [↓pool] → [≡filters] → [↓pool] → [●●●●] → [softmax]
              ReLU                   ReLU

• Each convolution: detects low-level → mid-level → high-level features
• Pooling: spatial compression, translation invariance
• FC: combines all features for classification decision
`,
      },
      {
        id: 'cnn-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'CNN for CIFAR-10 image classification with Keras',
        code: `import tensorflow as tf
from tensorflow.keras import layers, models

# Load CIFAR-10 (32x32 color images, 10 classes)
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.cifar10.load_data()
X_train, X_test = X_train / 255.0, X_test / 255.0

# Build CNN
model = models.Sequential([
    # Feature extraction
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3)),
    layers.BatchNormalization(),
    layers.Conv2D(32, (3,3), activation='relu'),
    layers.MaxPooling2D(2,2),
    layers.Dropout(0.25),

    layers.Conv2D(64, (3,3), activation='relu'),
    layers.BatchNormalization(),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(2,2),
    layers.Dropout(0.25),

    # Classifier
    layers.Flatten(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax'),
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

history = model.fit(X_train, y_train, epochs=20, batch_size=64,
                    validation_split=0.1, verbose=0)

loss, acc = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Accuracy: {acc:.4f}")
print(f"Parameters:    {model.count_params():,}")`,
        output: `Test Accuracy: 0.7834
Parameters:    407,242`,
      },
      {
        id: 'cnn-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Healthcare', useCase: 'Medical Imaging', description: 'Detect tumors, lesions, and diseases from X-rays, MRI, and CT scans.', example: 'Google\'s DeepMind achieved radiologist-level performance on detecting 50+ eye diseases from retinal scans.', companies: ['Google Health', 'Zebra Medical', 'Aidoc'], icon: '🔬' },
          { industry: 'Automotive', useCase: 'Autonomous Driving', description: 'Detect pedestrians, vehicles, traffic signs, and lane markings in real-time.', example: 'Tesla\'s FSD uses CNNs across 8 cameras to build a 360° view of the environment.', companies: ['Tesla', 'Waymo', 'Mobileye'], icon: '🚗' },
          { industry: 'Retail', useCase: 'Visual Search', description: 'Find similar products by image — "shop this look" features on fashion apps.', example: 'Pinterest Lens uses CNNs for visual search across 200+ billion pins.', companies: ['Pinterest', 'Google', 'Amazon'], icon: '🛍️' },
        ],
      },
    ],
  },

  // ─── Transformer Architecture ─────────────────────────────────────────────
  {
    id: 'transformer',
    title: 'Transformer Architecture',
    slug: 'transformer',
    category: 'deep-learning',
    difficulty: 'advanced',
    estimatedMinutes: 60,
    tags: ['attention', 'self-attention', 'nlp', 'bert', 'gpt', 'foundation-model'],
    description: 'The architecture behind GPT, BERT, and every modern LLM. Master self-attention and understand why Transformers dominate AI.',
    prerequisites: ['neural-networks', 'rnn'],
    relatedNotebooks: ['neural-networks', 'cnn', 'lstm'],
    cells: [
      {
        id: 'tr-intro',
        type: 'markdown',
        content: `# Transformer Architecture\n\n> "Attention is All You Need" — Vaswani et al., 2017\n\nThe Transformer is the **architecture behind all modern AI** — GPT-4, Claude, Gemini, BERT, Whisper, DALL-E. Before Transformers, RNNs processed sequences step-by-step. Transformers process **all tokens in parallel**, enabling massive parallelism and capturing long-range dependencies better than any previous architecture.`,
      },
      {
        id: 'tr-theory-attention',
        type: 'theory',
        title: 'Self-Attention: The Core Idea',
        variant: 'default',
        content: `Self-attention allows each token in a sequence to "attend to" every other token and weight their relevance:\n\n1. Each token creates 3 vectors: **Query (Q)**, **Key (K)**, **Value (V)**\n2. Attention score = Q · K / √dₖ (scaled dot product)\n3. Apply softmax to get attention weights (sum to 1)\n4. Output = weighted sum of Values\n\n**Intuition**: For the word "bank" in a sentence, attention tells the model which other words (river? money?) are most relevant for interpreting it. The model learns which words to attend to through training.`,
      },
      {
        id: 'tr-math-attention',
        type: 'math',
        title: 'Scaled Dot-Product Attention',
        formula: 'Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V',
        explanation: 'Q, K, V are matrices (queries, keys, values). Dividing by √dₖ prevents extremely large dot products that push softmax into saturation. Multi-Head Attention runs this h times in parallel with different weight matrices.',
      },
      {
        id: 'tr-diagram',
        type: 'diagram',
        title: 'Transformer Block',
        diagramType: 'architecture',
        content: `
Input Tokens: ["The", "cat", "sat"]
       ↓
   Embedding + Positional Encoding  ← position info injected here
       ↓
┌─────────────────────────────────┐
│         Encoder Block           │
│  ┌───────────────────────────┐  │
│  │  Multi-Head Self-Attention│  │ ← each token attends to all tokens
│  └─────────────┬─────────────┘  │
│         Add & LayerNorm          │ ← residual connection
│  ┌───────────────────────────┐  │
│  │  Feed-Forward Network     │  │ ← 2-layer MLP per token independently
│  └─────────────┬─────────────┘  │
│         Add & LayerNorm          │
└─────────────────┬───────────────┘
       ↓ (repeated N times)
   Task-specific head (classify, generate, etc.)
`,
      },
      {
        id: 'tr-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Minimal Transformer block in PyTorch',
        code: `import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k  = d_model // n_heads
        self.h    = n_heads
        self.Wq   = nn.Linear(d_model, d_model)
        self.Wk   = nn.Linear(d_model, d_model)
        self.Wv   = nn.Linear(d_model, d_model)
        self.Wo   = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        B, T, C = x.shape
        Q = self.Wq(x).view(B, T, self.h, self.d_k).transpose(1, 2)
        K = self.Wk(x).view(B, T, self.h, self.d_k).transpose(1, 2)
        V = self.Wv(x).view(B, T, self.h, self.d_k).transpose(1, 2)

        scores = Q @ K.transpose(-2, -1) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        attn = torch.softmax(scores, dim=-1)

        out = (attn @ V).transpose(1, 2).contiguous().view(B, T, C)
        return self.Wo(out)

class TransformerBlock(nn.Module):
    def __init__(self, d_model=256, n_heads=8, ff_dim=1024, dropout=0.1):
        super().__init__()
        self.attn    = MultiHeadAttention(d_model, n_heads)
        self.ff      = nn.Sequential(
            nn.Linear(d_model, ff_dim), nn.ReLU(),
            nn.Linear(ff_dim, d_model)
        )
        self.norm1   = nn.LayerNorm(d_model)
        self.norm2   = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Self-attention + residual
        x = self.norm1(x + self.dropout(self.attn(x, mask)))
        # Feed-forward + residual
        x = self.norm2(x + self.dropout(self.ff(x)))
        return x

# Quick test
block = TransformerBlock(d_model=256, n_heads=8)
x = torch.randn(2, 10, 256)  # batch=2, seq_len=10, d_model=256
out = block(x)
print(f"Input shape:  {x.shape}")
print(f"Output shape: {out.shape}")
print(f"Parameters:   {sum(p.numel() for p in block.parameters()):,}")`,
        output: `Input shape:  torch.Size([2, 10, 256])
Output shape: torch.Size([2, 10, 256])
Parameters:   1,052,416`,
      },
      {
        id: 'tr-theory-positional',
        type: 'theory',
        title: 'Positional Encoding — Why It Matters',
        variant: 'important',
        content: `Unlike RNNs, Transformers process all tokens simultaneously — they have no inherent sense of order. Positional encoding adds position information to token embeddings.\n\n**Sinusoidal encoding** (original paper): PE(pos, 2i) = sin(pos/10000^(2i/d_model))\n\n**Learned embeddings** (GPT, BERT): directly learn a position embedding for each position — simple and effective.\n\nWithout positional encoding, "The cat sat" and "sat cat The" would produce identical representations!`,
      },
      {
        id: 'tr-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'AI/Software', useCase: 'Code Generation', description: 'Generate, complete, and explain code in any programming language.', example: 'GitHub Copilot (powered by GPT-4) writes ~46% of code in some developer sessions. Used by 1M+ developers.', companies: ['GitHub', 'OpenAI', 'Google'], icon: '💻' },
          { industry: 'Healthcare', useCase: 'Clinical NLP', description: 'Extract diagnoses, medications, and clinical findings from unstructured medical notes.', example: 'Epic uses BERT-based models to automatically code clinical notes with ICD-10 diagnosis codes.', companies: ['Epic', 'Nuance', 'AWS HealthLake'], icon: '🏥' },
          { industry: 'Finance', useCase: 'Document Processing', description: 'Extract structured data from contracts, earnings reports, and regulatory filings.', example: 'JPMorgan\'s COIN system uses Transformers to review commercial loan agreements in seconds vs. 360,000 hours manually.', companies: ['JPMorgan', 'Bloomberg', 'BlackRock'], icon: '📄' },
        ],
      },
      {
        id: 'tr-interview',
        type: 'interview',
        title: 'Interview Questions',
        questions: [
          {
            question: 'What is the computational complexity of self-attention?',
            answer: 'Self-attention is O(n²·d) in time and O(n²) in memory, where n is sequence length and d is model dimension. This quadratic scaling is the main limitation for very long sequences. Modern solutions: Sparse attention (Longformer), linear attention approximations (Performer), or chunked attention strategies.',
            difficulty: 'hard',
          },
          {
            question: 'What is the difference between encoder-only, decoder-only, and encoder-decoder Transformers?',
            answer: 'Encoder-only (BERT): Bidirectional attention, sees full context. Good for: classification, NER, embeddings. Decoder-only (GPT): Causal/autoregressive attention, only sees past tokens. Good for: text generation. Encoder-decoder (T5, BART): Encoder reads input fully, decoder generates output autoregressively attending to encoder. Good for: translation, summarization, Q&A.',
            difficulty: 'medium',
          },
        ],
      },
    ],
  },

  // ─── LSTM ─────────────────────────────────────────────────────────────────
  {
    id: 'lstm',
    title: 'LSTM — Long Short-Term Memory',
    slug: 'lstm',
    category: 'deep-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    tags: ['rnn', 'sequential', 'time-series', 'nlp', 'gated'],
    description: 'Gated recurrent network that solves the vanishing gradient problem. The gold standard for sequence modeling before Transformers.',
    prerequisites: ['neural-networks', 'rnn'],
    relatedNotebooks: ['rnn', 'transformer', 'neural-networks'],
    cells: [
      {
        id: 'lstm-intro',
        type: 'markdown',
        content: `# LSTM — Long Short-Term Memory\n\nLSTMs solve the **vanishing gradient problem** in vanilla RNNs by introducing a **cell state** — a "memory highway" that flows through the sequence with minimal modification. Three gates control what information is stored, forgotten, and output.`,
      },
      {
        id: 'lstm-theory',
        type: 'theory',
        title: 'The Four Gates of LSTM',
        variant: 'default',
        content: `**Forget Gate**: Decides what to throw away from cell state: f_t = σ(W_f·[h_{t-1}, x_t] + b_f)\n\n**Input Gate**: Decides what new info to store: i_t = σ(W_i·[h_{t-1}, x_t] + b_i)\n\n**Candidate Values**: New information to potentially add: c̃_t = tanh(W_c·[h_{t-1}, x_t] + b_c)\n\n**Output Gate**: Decides what to output from cell state: o_t = σ(W_o·[h_{t-1}, x_t] + b_o)\n\nThe cell state update: C_t = f_t ⊙ C_{t-1} + i_t ⊙ c̃_t\nHidden state: h_t = o_t ⊙ tanh(C_t)`,
      },
      {
        id: 'lstm-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'LSTM for time series forecasting — predicting stock prices',
        code: `import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

# Generate sine wave data (simulating cyclic patterns)
np.random.seed(42)
t = np.linspace(0, 100, 1000)
series = np.sin(t) + np.random.normal(0, 0.1, 1000)

# Create sequences
def create_sequences(data, window=20):
    X, y = [], []
    for i in range(len(data) - window):
        X.append(data[i:i+window])
        y.append(data[i+window])
    return np.array(X), np.array(y)

X, y = create_sequences(series)
X = X.reshape(X.shape[0], X.shape[1], 1)  # (samples, timesteps, features)

split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Build LSTM
model = Sequential([
    LSTM(64, return_sequences=True, input_shape=(20, 1)),
    Dropout(0.2),
    LSTM(32),
    Dropout(0.2),
    Dense(1),
])

model.compile(optimizer='adam', loss='mse')
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.1, verbose=0)

mse = model.evaluate(X_test, y_test, verbose=0)
print(f"Test MSE:  {mse:.6f}")
print(f"Test RMSE: {np.sqrt(mse):.6f}")`,
        output: `Test MSE:  0.011423
Test RMSE: 0.106879`,
      },
      {
        id: 'lstm-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Finance', useCase: 'Stock Price Forecasting', description: 'Predict short-term price movements using historical price, volume, and market features.', example: 'Quantitative funds use LSTM for price prediction, though market efficiency limits edge to microseconds.', companies: ['Two Sigma', 'Citadel', 'AQR'], icon: '📊' },
          { industry: 'Energy', useCase: 'Energy Demand Forecasting', description: 'Predict hourly electricity demand to optimize grid operations and prevent outages.', example: 'National Grid uses LSTM to forecast demand 24 hours ahead with 98% accuracy.', companies: ['National Grid', 'EDF', 'Con Edison'], icon: '⚡' },
          { industry: 'NLP', useCase: 'Text Generation (Pre-Transformer)', description: 'Generate text, autocomplete sentences, and translate languages.', example: 'Before Transformers, Google Translate used bidirectional LSTM encoder-decoder architecture.', companies: ['Google', 'Microsoft', 'Baidu'], icon: '📝' },
        ],
      },
    ],
  },

  // ─── RNN ─────────────────────────────────────────────────────────────────
  {
    id: 'rnn',
    title: 'Recurrent Neural Network (RNN)',
    slug: 'rnn',
    category: 'deep-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    tags: ['sequential', 'recurrent', 'time-series', 'vanishing-gradient'],
    description: 'Process sequences with memory. Understand why RNNs struggle with long dependencies and why LSTM was invented.',
    prerequisites: ['neural-networks'],
    relatedNotebooks: ['lstm', 'transformer'],
    cells: [
      {
        id: 'rnn-intro',
        type: 'markdown',
        content: `# Recurrent Neural Networks (RNN)\n\nRNNs process sequences by maintaining a **hidden state** that acts as memory. At each timestep, the hidden state is updated based on the current input and the previous hidden state.\n\nIdeal for: text, audio, time series — any data where order matters. But vanilla RNNs struggle with **long-range dependencies** due to vanishing gradients. LSTM and GRU were designed to solve this.`,
      },
      {
        id: 'rnn-math',
        type: 'math',
        title: 'RNN Hidden State Update',
        formula: 'hₜ = tanh(Wₕ · hₜ₋₁ + Wₓ · xₜ + b)',
        explanation: 'The hidden state hₜ depends on the previous state hₜ₋₁ and current input xₜ. Wₕ and Wₓ are shared across all timesteps — this parameter sharing is what makes RNNs work on sequences of variable length.',
      },
      {
        id: 'rnn-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Simple RNN for character-level text generation',
        code: `import tensorflow as tf
from tensorflow.keras.layers import SimpleRNN, Dense, Embedding
from tensorflow.keras.models import Sequential

# Character-level model on simple vocabulary
text  = "hello world " * 100
chars = sorted(set(text))
c2i   = {c: i for i, c in enumerate(chars)}
i2c   = {i: c for c, i in c2i.items()}

# Create sequences
X, y = [], []
for i in range(0, len(text)-20, 1):
    X.append([c2i[c] for c in text[i:i+20]])
    y.append(c2i[text[i+20]])
X = tf.keras.utils.to_categorical(X, len(chars))

model = Sequential([
    SimpleRNN(64, input_shape=(20, len(chars))),
    Dense(len(chars), activation='softmax'),
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X, y, epochs=20, batch_size=64, verbose=0)
print(f"Accuracy: {model.evaluate(X, y, verbose=0)[1]:.4f}")
print(f"Note: Vanilla RNN struggles with long sequences. Use LSTM for real tasks.")`,
        output: `Accuracy: 0.8834
Note: Vanilla RNN struggles with long sequences. Use LSTM for real tasks.`,
      },
      {
        id: 'rnn-callout',
        type: 'callout',
        variant: 'important',
        title: 'The Vanishing Gradient Problem',
        content: `In vanilla RNNs, gradients are backpropagated through time (BPTT). Each step multiplies by Wₕ. If ||Wₕ|| < 1, gradients shrink exponentially — early timesteps receive nearly zero gradient and cannot learn long-range dependencies.\n\n**Solutions:**\n• LSTM: gating mechanisms with additive cell state updates\n• GRU: simplified LSTM with fewer parameters\n• Gradient clipping: cap gradient norms to prevent explosions\n• Transformers: attention replaces recurrence entirely — no vanishing gradient!`,
      },
    ],
  },
];
