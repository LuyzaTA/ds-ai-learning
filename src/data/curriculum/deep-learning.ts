import type { Section } from '@/types/curriculum';

export const deepLearningSection: Section = {
  id: 'deep-learning',
  title: 'Deep Learning',
  description: 'Neural networks, backpropagation, CNNs, RNNs, and the Transformer architecture.',
  longDescription:
    'Deep learning is behind every modern breakthrough: image recognition, language models, speech synthesis, and generative AI. This section builds your understanding from a single neuron all the way to the Transformer.',
  icon: '🧠',
  color: 'violet',
  tags: ['Neural Networks', 'PyTorch', 'CNN', 'LSTM', 'Transformer', 'Backpropagation'],
  modules: [
    {
      id: 'neural-networks',
      title: 'Neural Network Fundamentals',
      description: 'From the perceptron to deep multilayer networks.',
      lessons: [
        {
          id: 'neural-network-basics',
          title: 'How Neural Networks Work',
          description: 'Neurons, layers, activations, forward pass, and backpropagation explained from first principles.',
          duration: '65 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## The Artificial Neuron\n\nAn artificial neuron takes a vector of inputs, computes a weighted sum, adds a bias, and applies a **nonlinear activation function**. This nonlinearity is what makes deep networks powerful — without it, stacking layers is equivalent to a single linear transformation.',
            },
            {
              type: 'math',
              latex:
                'a = f\\!\\left( \\mathbf{w}^T \\mathbf{x} + b \\right) = f\\!\\left( \\sum_{i} w_i x_i + b \\right)',
              displayMode: true,
              caption: 'Single neuron: weighted sum + bias, passed through activation function f.',
            },
            {
              type: 'text',
              content:
                '## Activation Functions\n\nActivation functions introduce nonlinearity. The most important ones:\n\n- **Sigmoid**: σ(z) = 1/(1+e⁻ᶻ) — squashes to (0,1). Used in output layer for binary classification. Suffers from vanishing gradients in deep networks.\n- **Tanh**: squashes to (-1,1). Zero-centred, slightly better than sigmoid for hidden layers.\n- **ReLU** (Rectified Linear Unit): f(z) = max(0, z) — the default for hidden layers. Fast, avoids vanishing gradients.\n- **Leaky ReLU / ELU**: address the "dying ReLU" problem (neurons stuck at 0).\n- **Softmax**: vector → probability distribution. Used in output layer for multi-class classification.',
            },
            {
              type: 'math',
              latex:
                '\\text{ReLU}(z) = \\max(0, z) \\qquad \\text{Sigmoid}(z) = \\frac{1}{1+e^{-z}} \\qquad \\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}',
              displayMode: true,
            },
            {
              type: 'text',
              content:
                '## Forward and Backward Pass\n\nTraining a neural network involves two passes:\n\n1. **Forward pass**: input flows through all layers to produce predictions and compute loss\n2. **Backward pass (backpropagation)**: the chain rule computes gradients of the loss w.r.t. every parameter, flowing from output to input\n\nThe chain rule is the mathematical heart of backpropagation.',
            },
            {
              type: 'math',
              latex:
                '\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a^{[L]}} \\cdot \\frac{\\partial a^{[L]}}{\\partial z^{[L]}} \\cdot \\frac{\\partial z^{[L]}}{\\partial a^{[L-1]}} \\cdots \\frac{\\partial a^{[1]}}{\\partial w}',
              displayMode: true,
              caption: 'Chain rule: gradients are multiplied layer by layer from output back to the parameter.',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Vanishing Gradients',
              content:
                'When using sigmoid activations in deep networks, gradients shrink exponentially as they propagate back through many layers (because σ\'(z) ≤ 0.25). Layers near the input barely update. ReLU largely solves this; Batch Normalisation further stabilises training.',
            },
            {
              type: 'eli5',
              content:
                "**A neural network is like a factory assembly line.** Each worker (neuron) takes materials from the previous station, applies a transformation, and passes the result forward. After finishing a product, an inspector (loss function) measures how bad it is. The factory then adjusts every worker's instructions, starting from the last station and working backwards, so the next product is better. That backward adjustment process is backpropagation.",
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Building and training a neural network with PyTorch',
              code: `import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.datasets import make_moons
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import numpy as np

# --- Data ---
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
scaler = StandardScaler()
X_train = torch.FloatTensor(scaler.fit_transform(X_train))
X_test  = torch.FloatTensor(scaler.transform(X_test))
y_train = torch.FloatTensor(y_train)
y_test  = torch.FloatTensor(y_test)

# --- Model ---
class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(2, 64),
            nn.ReLU(),
            nn.BatchNorm1d(64),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1),
            nn.Sigmoid(),
        )
    def forward(self, x):
        return self.net(x).squeeze()

model    = MLP()
optimizer = optim.Adam(model.parameters(), lr=0.01)
criterion = nn.BCELoss()

# --- Training loop ---
model.train()
for epoch in range(200):
    optimizer.zero_grad()         # reset gradients
    y_pred = model(X_train)       # forward pass
    loss = criterion(y_pred, y_train)  # compute loss
    loss.backward()               # backward pass (backprop)
    optimizer.step()              # update weights

    if epoch % 50 == 0:
        print(f"Epoch {epoch:3d} | Loss: {loss.item():.4f}")

# --- Evaluation ---
model.eval()
with torch.no_grad():
    test_pred = (model(X_test) > 0.5).float()
    acc = (test_pred == y_test).float().mean()
    print(f"\\nTest Accuracy: {acc:.4f}")`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'A neuron computes: activation = f(weighted sum + bias). Nonlinear activation functions are essential.',
                'ReLU is the default hidden-layer activation: fast, avoids vanishing gradients.',
                'Backpropagation applies the chain rule to compute gradients of the loss w.r.t. all parameters.',
                'Batch Normalisation stabilises training; Dropout prevents overfitting.',
                'Adam optimizer adapts learning rates per parameter and converges faster than plain SGD.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cnn',
      title: 'Convolutional Neural Networks',
      description: 'How CNNs process images using local connections and shared weights.',
      lessons: [
        {
          id: 'cnn-fundamentals',
          title: 'CNN Architecture and Computer Vision',
          description: 'Convolution, pooling, transfer learning, and modern CNN architectures.',
          duration: '60 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Why Not Plain MLPs for Images?\n\nA 224×224 RGB image has 224×224×3 = 150,528 inputs. A fully connected layer with 1000 hidden units would need 150 million parameters — just for the first layer. This overfits easily and ignores the spatial structure of images.\n\nCNNs solve this with two key ideas:\n- **Local connectivity**: each neuron connects to a small receptive field, not all inputs\n- **Weight sharing**: the same filter (kernel) is applied across the entire image',
            },
            {
              type: 'text',
              content:
                '## The Convolution Operation\n\nA convolutional layer slides a small **filter** (kernel) across the input, computing dot products at each position to produce a **feature map**. Each filter detects a specific pattern (edges, textures, etc.).\n\nA convolution layer with F filters produces F feature maps — each highlighting different spatial patterns.',
            },
            {
              type: 'math',
              latex:
                '(I * K)[i,j] = \\sum_{m}\\sum_{n} I[i+m,\\, j+n] \\cdot K[m,n]',
              displayMode: true,
              caption: 'Convolution: slide kernel K over image I, computing element-wise products and summing.',
            },
            {
              type: 'text',
              content:
                '## Pooling and Architecture\n\n**Pooling layers** downsample feature maps to reduce spatial dimensions and add translation invariance. **Max pooling** takes the maximum value in each pool window.\n\nA typical CNN architecture stacks:\n- Conv → ReLU → Pool (repeated)\n- Flatten\n- Fully connected layers\n- Softmax output\n\nModern architectures (ResNet, EfficientNet) use **residual connections** (skip connections) that allow gradients to flow directly across layers, enabling training of very deep networks (100+ layers).',
            },
            {
              type: 'text',
              content:
                '## Transfer Learning\n\nTraining a CNN from scratch requires millions of labelled images and days of compute. **Transfer learning** reuses a network pre-trained on ImageNet (e.g., ResNet50), replacing only the final classification head:\n\n1. **Feature extraction**: freeze all layers, train only the head. Fast, good when your dataset is small and similar to ImageNet.\n2. **Fine-tuning**: unfreeze some top layers and train with a small learning rate. Better when you have more data.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Transfer learning with a pretrained ResNet in PyTorch',
              code: `import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from torch.utils.data import DataLoader

# Load pretrained ResNet-50
model = models.resnet50(weights='IMAGENET1K_V2')

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace final classification head
num_features = model.fc.in_features    # 2048 for ResNet50
num_classes  = 5                        # your dataset's classes
model.fc = nn.Sequential(
    nn.Dropout(0.3),
    nn.Linear(num_features, 256),
    nn.ReLU(),
    nn.Linear(256, num_classes)
)

# Only the new head has trainable parameters
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total     = sum(p.numel() for p in model.parameters())
print(f"Trainable: {trainable:,} / Total: {total:,} ({100*trainable/total:.1f}%)")

# Standard ImageNet preprocessing
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std= [0.229, 0.224, 0.225])
])

# Fine-tuning: unfreeze the last residual block
for param in model.layer4.parameters():
    param.requires_grad = True

optimizer = torch.optim.Adam([
    {'params': model.layer4.parameters(), 'lr': 1e-4},
    {'params': model.fc.parameters(),     'lr': 1e-3},
])
criterion = nn.CrossEntropyLoss()
print("Model ready for fine-tuning!")`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'CNNs use local connectivity and weight sharing — dramatically fewer parameters than fully connected layers.',
                'Filters slide across the image, creating feature maps that detect edges, textures, and shapes.',
                'MaxPooling reduces spatial dimensions and adds translation invariance.',
                'Residual connections (ResNet) enable training of 100+ layer networks.',
                'Transfer learning re-uses ImageNet-pretrained weights — use it whenever you have < 100k labelled examples.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'transformers',
      title: 'Attention & Transformers',
      description: 'The architecture powering GPT, BERT, and all modern large language models.',
      lessons: [
        {
          id: 'attention-mechanism',
          title: 'The Attention Mechanism and Transformer Architecture',
          description: 'Self-attention, multi-head attention, positional encoding, and the full Transformer.',
          duration: '75 min',
          difficulty: 'advanced',
          blocks: [
            {
              type: 'text',
              content:
                '## The Problem with RNNs\n\nBefore Transformers, sequence processing relied on RNNs and LSTMs. These process tokens one by one, making it hard to capture **long-range dependencies** — a word at position 1 is hard to connect to a word at position 500. They also cannot be parallelised, making training slow.\n\nThe Transformer (Vaswani et al., 2017) replaced recurrence entirely with **self-attention**: every token directly attends to every other token in the sequence.',
            },
            {
              type: 'text',
              content:
                '## Scaled Dot-Product Attention\n\nFor each token in a sequence, self-attention computes:\n- **Query (Q)**: "what am I looking for?"\n- **Key (K)**: "what do I have to offer?"\n- **Value (V)**: "what information do I carry?"\n\nThe attention score between a query and all keys determines how much of each value to gather.',
            },
            {
              type: 'math',
              latex:
                '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V',
              displayMode: true,
              caption: 'Scaled dot-product attention. √d_k scaling prevents vanishing gradients when d_k is large.',
            },
            {
              type: 'text',
              content:
                '## Multi-Head Attention\n\nInstead of computing one attention function, the Transformer runs **h attention "heads" in parallel**, each with different learned projections. The outputs are concatenated and projected. This allows the model to attend to different positions from different representation subspaces simultaneously.',
            },
            {
              type: 'math',
              latex:
                '\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h) W^O',
              displayMode: true,
            },
            {
              type: 'text',
              content:
                '## The Transformer Block\n\nA Transformer block consists of:\n1. **Multi-Head Self-Attention** with residual connection and Layer Norm\n2. **Feed-Forward Network** (two linear layers with ReLU) with residual connection and Layer Norm\n\nThe full Transformer stacks N such blocks (typically 6–96). The **encoder** stack processes the input; the **decoder** stack generates the output autoregressively.',
            },
            {
              type: 'diagram',
              title: 'Transformer Block (Encoder)',
              lines: [
                '  Input Tokens',
                '      ↓',
                '  + Positional Encoding',
                '      ↓',
                '  ┌─────────────────────┐  ←── repeated N times',
                '  │  Multi-Head         │',
                '  │  Self-Attention     │',
                '  │  + Residual + LN    │',
                '  │         ↓           │',
                '  │  Feed-Forward       │',
                '  │  Network            │',
                '  │  + Residual + LN    │',
                '  └─────────────────────┘',
                '      ↓',
                '  Output Representations',
              ],
            },
            {
              type: 'eli5',
              content:
                "**Attention is like a group discussion where everyone can hear everyone else at once.** In an RNN, information passes like a game of telephone — whispered from person to person, losing quality over long distances. In a Transformer, everyone speaks simultaneously and each person can directly hear everyone else, weighted by how relevant they are to the current topic. The 'query' is 'what am I asking about?', the 'keys' are 'what topics does each person know?', and the 'values' are 'what does each person actually say?'",
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Scaled dot-product attention from scratch in PyTorch',
              code: `import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class ScaledDotProductAttention(nn.Module):
    def forward(self, Q, K, V, mask=None):
        d_k = Q.size(-1)
        # Attention scores: (batch, heads, seq_len, seq_len)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn_weights = F.softmax(scores, dim=-1)
        output = torch.matmul(attn_weights, V)
        return output, attn_weights

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        assert d_model % num_heads == 0
        self.d_k      = d_model // num_heads
        self.h        = num_heads
        self.W_Q = nn.Linear(d_model, d_model)
        self.W_K = nn.Linear(d_model, d_model)
        self.W_V = nn.Linear(d_model, d_model)
        self.W_O = nn.Linear(d_model, d_model)
        self.attn = ScaledDotProductAttention()

    def split_heads(self, x):
        B, T, D = x.shape
        return x.view(B, T, self.h, self.d_k).transpose(1, 2)

    def forward(self, Q, K, V, mask=None):
        B = Q.size(0)
        Q, K, V = self.split_heads(self.W_Q(Q)), self.split_heads(self.W_K(K)), self.split_heads(self.W_V(V))
        out, attn = self.attn(Q, K, V, mask)
        out = out.transpose(1, 2).contiguous().view(B, -1, self.h * self.d_k)
        return self.W_O(out)

# Test
mha = MultiHeadAttention(d_model=512, num_heads=8)
x = torch.randn(2, 20, 512)  # batch=2, seq_len=20, d_model=512
out = mha(x, x, x)
print(f"Input shape:  {x.shape}")    # (2, 20, 512)
print(f"Output shape: {out.shape}")  # (2, 20, 512)`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Self-attention allows every token to directly attend to every other token — solving the long-range dependency problem of RNNs.',
                'Q/K/V matrices let the model ask "what do I need?" (Q), "what do I have?" (K), and "what should I share?" (V).',
                'Multi-head attention runs h parallel attention heads, capturing different relationship types.',
                'Residual connections + Layer Norm in each block allow stable training of very deep Transformers.',
                'GPT uses decoder-only Transformers (causal masking); BERT uses encoder-only; T5 uses full encoder-decoder.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
