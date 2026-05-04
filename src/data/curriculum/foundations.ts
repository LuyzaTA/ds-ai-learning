import type { Section } from '@/types/curriculum';

export const foundationsSection: Section = {
  id: 'foundations',
  title: 'Foundations',
  description: 'Math, statistics, and programming essentials for data science.',
  longDescription:
    'A solid foundation in linear algebra, probability, statistics, and Python is the bedrock of every advanced topic in data science and AI. This section builds that intuition from the ground up.',
  icon: '📐',
  color: 'blue',
  tags: ['Math', 'Statistics', 'Python', 'Linear Algebra', 'Probability'],
  modules: [
    // ═══════════════════════════════════════════════════════════════
    // MODULE 1: Linear Algebra
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'linear-algebra',
      title: 'Linear Algebra',
      description: 'Scalars, vectors, matrices, and the operations that power ML.',
      lessons: [
        // ─── LESSON 1 ────────────────────────────────────────────
        {
          id: 'scalars-vectors-matrices',
          title: 'Scalars, Vectors, and Matrices',
          description: 'The three fundamental objects of linear algebra — and why they matter for every ML model.',
          duration: '40 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## Why Linear Algebra?\n\nEvery machine learning model — from simple linear regression to a billion-parameter transformer — is built on a small set of mathematical objects: **scalars**, **vectors**, and **matrices**. Understanding these objects deeply means you will understand *why* models work, not just *how* to use them.\n\nThink of linear algebra as the grammar of machine learning. Just as you need grammar to build sentences, you need linear algebra to build models.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Real-world connection',
              content:
                'A grayscale image is a matrix of pixel intensities. A colour image is a 3D tensor (height × width × 3 channels). A batch of images fed into a neural network is a 4D tensor. Linear algebra is everywhere.',
            },
            {
              type: 'text',
              content:
                '## Scalars\n\nA **scalar** is simply a single number. It has magnitude but no direction. Examples: temperature (23°C), price ($49.99), a model\'s accuracy (0.94).\n\nIn notation, scalars are usually written in lowercase italic: *x*, *α*, *λ*.',
            },
            {
              type: 'math',
              latex: 'x \\in \\mathbb{R}, \\quad \\alpha = 3.14, \\quad \\lambda > 0',
              displayMode: true,
              caption: 'Scalars belong to the set of real numbers ℝ.',
            },
            {
              type: 'text',
              content:
                '## Vectors\n\nA **vector** is an ordered list of numbers. It has both magnitude and direction. In data science, a vector often represents a single **data point** (a row of features) or a **weight** list inside a model.\n\nVectors are written in bold lowercase: **v**, **w**, **x**.',
            },
            {
              type: 'math',
              latex:
                '\\mathbf{x} = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{bmatrix} \\in \\mathbb{R}^n',
              displayMode: true,
              caption: 'A column vector in n-dimensional space.',
            },
            {
              type: 'eli5',
              content:
                '**Imagine you\'re describing a house.** You could say: "It has 3 bedrooms, 2 bathrooms, and costs $300,000." That\'s a vector: [3, 2, 300000]. Each number captures one feature of the house. When a machine learning model reads this, it sees a point in 3-dimensional "house space." Similar houses will be nearby; very different houses will be far away.',
            },
            {
              type: 'text',
              content:
                '## Matrices\n\nA **matrix** is a 2-dimensional grid of numbers — rows and columns. In data science, a matrix **A** of shape m×n might represent:\n- A dataset with m samples and n features\n- The weights connecting two layers in a neural network\n- A transformation that rotates, scales, or projects vectors',
            },
            {
              type: 'math',
              latex:
                'A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} \\in \\mathbb{R}^{3 \\times 3}',
              displayMode: true,
              caption: 'A 3×3 matrix. Element a_{ij} is in row i, column j.',
            },
            {
              type: 'text',
              content:
                '## Tensors\n\nA **tensor** generalises scalars, vectors, and matrices to any number of dimensions (called *rank* or *order*):\n- Rank 0 → scalar\n- Rank 1 → vector\n- Rank 2 → matrix\n- Rank 3+ → tensor\n\nDeep learning frameworks like PyTorch and TensorFlow are named after tensors because all data and model parameters are stored and manipulated as tensors.',
            },
            {
              type: 'diagram',
              title: 'Hierarchy of Mathematical Objects',
              lines: [
                '  Scalar      →    single number         e.g., 5.0',
                '  Vector      →    1-D array             e.g., [1, 2, 3]',
                '  Matrix      →    2-D array             e.g., [[1,2],[3,4]]',
                '  Tensor      →    N-D array             e.g., shape (32,224,224,3)',
              ],
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Creating scalars, vectors, matrices, and tensors with NumPy',
              code: `import numpy as np

# Scalar (rank 0)
x = np.float32(3.14)
print(f"Scalar: {x}, shape: {x.shape}, ndim: {x.ndim}")

# Vector (rank 1)
v = np.array([1.0, 2.0, 3.0])
print(f"Vector: {v}, shape: {v.shape}, ndim: {v.ndim}")

# Matrix (rank 2)
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]], dtype=float)
print(f"Matrix shape: {A.shape}, ndim: {A.ndim}")

# Tensor (rank 3) — e.g., a batch of 4 grayscale 28×28 images
images = np.zeros((4, 28, 28))
print(f"Image tensor shape: {images.shape}, ndim: {images.ndim}")

# Accessing elements
print(f"A[1,2] = {A[1,2]}")   # row 1, col 2 → 6.0
print(f"v[0]   = {v[0]}")     # first element → 1.0`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'A **scalar** is a single number; a **vector** is an ordered list; a **matrix** is a 2-D grid.',
                'Tensors generalise all three — rank 0 = scalar, rank 1 = vector, rank 2 = matrix.',
                'In data science, rows of a dataset are vectors; the whole dataset is a matrix.',
                'Neural network weights are stored as matrices (and higher-rank tensors).',
                'NumPy is the standard Python library for working with these objects efficiently.',
              ],
            },
            {
              type: 'quiz',
              title: 'Quick Check',
              questions: [
                {
                  id: 'sv1',
                  question: 'A colour image of size 256×256 pixels with RGB channels has what tensor shape?',
                  options: ['(256, 256)', '(256, 256, 3)', '(3, 256)', '(256, 3, 3)'],
                  correctIndex: 1,
                  explanation: 'A colour image has height × width × channels = (256, 256, 3). The 3 channels are Red, Green, and Blue.',
                },
                {
                  id: 'sv2',
                  question: 'Which of the following is a vector?',
                  options: ['42', '[[1,2],[3,4]]', '[0.8, 0.1, 0.1]', 'np.zeros((5,5,5))'],
                  correctIndex: 2,
                  explanation: '[0.8, 0.1, 0.1] is a 1-D array with 3 elements — a vector. 42 is a scalar; [[1,2],[3,4]] is a matrix; np.zeros((5,5,5)) is a rank-3 tensor.',
                },
                {
                  id: 'sv3',
                  question: 'In a dataset of 1000 patients with 20 medical features each, the data matrix has shape:',
                  options: ['(20, 1000)', '(1000, 20)', '(1000,)', '(20,)'],
                  correctIndex: 1,
                  explanation: 'Convention: rows = samples, columns = features. So 1000 patients × 20 features = shape (1000, 20).',
                },
              ],
            },
          ],
        },
        // ─── LESSON 2 ────────────────────────────────────────────
        {
          id: 'vector-operations',
          title: 'Vector Operations',
          description: 'Addition, dot product, norms — the core operations that appear everywhere in ML.',
          duration: '45 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## Operating on Vectors\n\nVectors are not just containers for numbers — they support powerful operations that form the backbone of machine learning algorithms. In this lesson we cover the four operations you will encounter in every model: addition, scalar multiplication, the dot product, and norms.',
            },
            {
              type: 'text',
              content:
                '### Vector Addition\n\nTwo vectors of the same dimension can be added element-by-element. Geometrically, this is "following one arrow then another."',
            },
            {
              type: 'math',
              latex:
                '\\mathbf{u} + \\mathbf{v} = \\begin{bmatrix} u_1 + v_1 \\\\ u_2 + v_2 \\\\ \\vdots \\\\ u_n + v_n \\end{bmatrix}',
              displayMode: true,
            },
            {
              type: 'text',
              content:
                '### Scalar Multiplication\n\nMultiplying a vector by a scalar stretches or shrinks it (and flips its direction if the scalar is negative).',
            },
            {
              type: 'math',
              latex:
                'c\\mathbf{v} = \\begin{bmatrix} cv_1 \\\\ cv_2 \\\\ \\vdots \\\\ cv_n \\end{bmatrix}',
              displayMode: true,
            },
            {
              type: 'text',
              content:
                '### The Dot Product\n\nThe **dot product** (inner product) of two vectors produces a single scalar. It measures how much two vectors point in the same direction.\n\nIn ML, the dot product appears in:\n- Linear regression predictions: **w**·**x**\n- Cosine similarity in NLP\n- Every neuron computation in a neural network',
            },
            {
              type: 'math',
              latex:
                '\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^{n} u_i v_i = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta',
              displayMode: true,
              caption: 'The dot product equals |u||v|cos(θ), where θ is the angle between the vectors.',
            },
            {
              type: 'callout',
              variant: 'important',
              title: 'Geometric Intuition of the Dot Product',
              content:
                'When **u**·**v** > 0, the vectors point in similar directions. When **u**·**v** = 0, they are *orthogonal* (perpendicular). When **u**·**v** < 0, they point in opposite directions. This is the basis of **cosine similarity** used in recommendation systems and NLP.',
            },
            {
              type: 'text',
              content:
                '### Vector Norms\n\nA **norm** measures the "length" or "magnitude" of a vector. Different norms emphasise different properties:\n\n- **L1 norm** (Manhattan): sum of absolute values\n- **L2 norm** (Euclidean): square root of sum of squares — most common\n- **L∞ norm** (Max): the largest absolute value\n\nNorms appear in regularisation (L1 = Lasso, L2 = Ridge) and in computing distances between data points.',
            },
            {
              type: 'math',
              latex:
                '\\|\\mathbf{v}\\|_1 = \\sum_i |v_i| \\qquad \\|\\mathbf{v}\\|_2 = \\sqrt{\\sum_i v_i^2} \\qquad \\|\\mathbf{v}\\|_\\infty = \\max_i |v_i|',
              displayMode: true,
            },
            {
              type: 'eli5',
              content:
                '**The dot product is like asking "do you agree with me?"** Imagine two people\'s opinions represented as vectors. If they mostly agree (same direction), the dot product is large and positive. If they completely disagree (opposite directions), it\'s negative. If their views are totally unrelated (perpendicular), it\'s zero. This is exactly how similarity search works in Google or Netflix recommendations.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Vector operations in NumPy',
              code: `import numpy as np

u = np.array([3.0, 1.0, 4.0])
v = np.array([1.0, 5.0, 9.0])

# Addition
w = u + v
print(f"u + v = {w}")          # [4. 6. 13.]

# Scalar multiplication
scaled = 2.5 * u
print(f"2.5 * u = {scaled}")   # [7.5 2.5 10.]

# Dot product (three equivalent ways)
dot1 = np.dot(u, v)
dot2 = u @ v                   # @ operator (Python 3.5+)
dot3 = sum(u_i * v_i for u_i, v_i in zip(u, v))
print(f"u · v = {dot1}")       # 44.0

# Norms
l1 = np.linalg.norm(u, ord=1)
l2 = np.linalg.norm(u)        # default is L2
linf = np.linalg.norm(u, ord=np.inf)
print(f"‖u‖₁ = {l1:.2f}")     # 8.00
print(f"‖u‖₂ = {l2:.4f}")     # 5.0990
print(f"‖u‖∞ = {linf:.2f}")   # 4.00

# Cosine similarity (u and v)
cos_sim = dot1 / (np.linalg.norm(u) * np.linalg.norm(v))
print(f"cos_similarity = {cos_sim:.4f}")  # 0.8132`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Vector addition and scalar multiplication are element-wise operations.',
                'The **dot product** measures directional similarity — it is negative when vectors oppose, zero when orthogonal, positive when aligned.',
                'The **L2 norm** is the Euclidean length of a vector; **L1** and **L2** are used in regularisation to prevent overfitting.',
                'Cosine similarity = dot product ÷ (product of norms) — used in text and recommendation tasks.',
              ],
            },
            {
              type: 'quiz',
              questions: [
                {
                  id: 'vo1',
                  question: 'If u = [1, 0] and v = [0, 1], what is u · v?',
                  options: ['1', '0', '√2', '2'],
                  correctIndex: 1,
                  explanation: 'u · v = 1×0 + 0×1 = 0. The vectors are orthogonal (perpendicular), so their dot product is 0.',
                },
                {
                  id: 'vo2',
                  question: 'What is the L2 norm of v = [3, 4]?',
                  options: ['7', '25', '5', '3.5'],
                  correctIndex: 2,
                  explanation: '‖v‖₂ = √(3² + 4²) = √(9 + 16) = √25 = 5. This is the classic 3-4-5 right triangle.',
                },
                {
                  id: 'vo3',
                  question: 'Which regularisation technique uses the L1 norm penalty?',
                  options: ['Ridge', 'Dropout', 'Lasso', 'Batch Norm'],
                  correctIndex: 2,
                  explanation: 'Lasso regression adds a penalty equal to λ‖w‖₁ (L1 norm of weights). Ridge uses L2. L1 tends to produce sparse weights (many zeros), effectively performing feature selection.',
                },
              ],
            },
          ],
        },
        // ─── LESSON 3 ────────────────────────────────────────────
        {
          id: 'matrix-operations',
          title: 'Matrix Operations & Decompositions',
          description: 'Multiplication, transpose, inverse, eigenvalues, and SVD — the engines of dimensionality reduction.',
          duration: '60 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Matrix Multiplication\n\nMatrix multiplication is **not** element-wise — it is a series of dot products. If **A** is m×k and **B** is k×n, their product **C** = **AB** is m×n, where each element is:\n\n$$C_{ij} = \\sum_{k} A_{ik} B_{kj}$$\n\nThis operation is the core computation in neural networks, where each forward pass multiplies input vectors by weight matrices.',
            },
            {
              type: 'math',
              latex:
                '\\underbrace{A}_{m \\times k} \\cdot \\underbrace{B}_{k \\times n} = \\underbrace{C}_{m \\times n}',
              displayMode: true,
              caption: 'The inner dimensions must match (both equal k). The result inherits the outer dimensions.',
            },
            {
              type: 'callout',
              variant: 'warning',
              title: 'Matrix multiplication is NOT commutative',
              content: 'AB ≠ BA in general. Always check that the shapes are compatible: for AB, the number of columns in A must equal the number of rows in B.',
            },
            {
              type: 'text',
              content:
                '## Transpose\n\nThe **transpose** of a matrix flips it along its diagonal — rows become columns. Notation: **A**ᵀ or **A**ᵀ. Properties:\n- (Aᵀ)ᵀ = A\n- (AB)ᵀ = BᵀAᵀ  (note the reversal!)\n- A symmetric matrix satisfies A = Aᵀ',
            },
            {
              type: 'text',
              content:
                '## Eigenvalues and Eigenvectors\n\nAn **eigenvector** of matrix **A** is a special vector **v** that, when multiplied by **A**, only gets scaled (not rotated). The scaling factor is the **eigenvalue** λ:\n\nEigendecomposition reveals the "principal directions" and "magnitudes" of a linear transformation. This is the foundation of **PCA** (Principal Component Analysis).',
            },
            {
              type: 'math',
              latex: 'A\\mathbf{v} = \\lambda \\mathbf{v}',
              displayMode: true,
              caption: 'A maps eigenvector v to λv — the same direction, scaled by λ.',
            },
            {
              type: 'math',
              latex:
                '\\det(A - \\lambda I) = 0 \\quad \\Rightarrow \\quad \\text{solve for } \\lambda',
              displayMode: true,
              caption: 'The characteristic equation. Its solutions are the eigenvalues.',
            },
            {
              type: 'text',
              content:
                '## Singular Value Decomposition (SVD)\n\nSVD is arguably the most important matrix decomposition in data science. Every matrix **A** (even non-square) can be decomposed as:\n\n$$A = U \\Sigma V^T$$\n\n- **U** (m×m): Left singular vectors — orthogonal, represent "output" directions\n- **Σ** (m×n): Diagonal matrix of singular values (non-negative), sorted descending\n- **Vᵀ** (n×n): Right singular vectors — orthogonal, represent "input" directions\n\nApplications: **PCA**, **image compression**, **recommendation systems** (collaborative filtering), **LSA in NLP**.',
            },
            {
              type: 'math',
              latex:
                'A = U\\Sigma V^T, \\quad \\text{rank-}k\\text{ approx: } A_k = \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T',
              displayMode: true,
              caption: 'Truncating to the k largest singular values gives the best rank-k approximation (Eckart–Young theorem).',
            },
            {
              type: 'eli5',
              content:
                '**SVD is like finding the best way to summarise a book.** Imagine a huge table of "who watched what movie" ratings. SVD finds hidden themes (genres like Action, Romance, Comedy) that explain most of the ratings. You can then describe each user and each movie by just a few theme scores — much more compact than the original table. That\'s exactly how Netflix-style collaborative filtering works.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Matrix operations and SVD in NumPy',
              code: `import numpy as np

# Matrix multiplication
A = np.array([[1, 2], [3, 4], [5, 6]])  # shape (3,2)
B = np.array([[7, 8, 9], [10, 11, 12]]) # shape (2,3)
C = A @ B                                # shape (3,3)
print("A @ B =\\n", C)

# Transpose
print("Aᵀ =\\n", A.T)  # shape (2,3)

# Eigendecomposition (only for square matrices)
M = np.array([[4, 2], [1, 3]])
eigenvalues, eigenvectors = np.linalg.eig(M)
print(f"Eigenvalues: {eigenvalues}")   # [5. 2.]
print(f"Eigenvectors:\\n{eigenvectors}")

# SVD
# Create a simple 3×4 "ratings" matrix
ratings = np.array([[4, 3, 0, 1],
                    [5, 4, 0, 1],
                    [0, 1, 5, 4],
                    [0, 0, 4, 3]])

U, s, Vt = np.linalg.svd(ratings, full_matrices=False)
print(f"Singular values: {s.round(2)}")

# Low-rank approximation with k=2 components
k = 2
A_approx = (U[:, :k] * s[:k]) @ Vt[:k, :]
print("Original:\\n", ratings)
print(f"Rank-{k} approximation:\\n", A_approx.round(1))`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Matrix multiplication requires inner dimensions to match; the result shape is (outer dimensions).',
                'Eigenvectors show the directions a matrix "stretches"; eigenvalues show how much.',
                'SVD decomposes *any* matrix into U·Σ·Vᵀ — the foundation of PCA and collaborative filtering.',
                'A rank-k approximation using the top-k singular values gives the best low-rank fit.',
                'These decompositions let us compress data and discover hidden structure.',
              ],
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════
    // MODULE 2: Probability & Statistics
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'probability-statistics',
      title: 'Probability & Statistics',
      description: 'From basic probability axioms to Bayes — the language of uncertainty.',
      lessons: [
        {
          id: 'probability-fundamentals',
          title: 'Probability Fundamentals',
          description: 'Sample spaces, events, conditional probability, and the axioms that tie it all together.',
          duration: '45 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## What Is Probability?\n\nProbability is the **mathematical language of uncertainty**. Every machine learning model makes predictions under uncertainty — a classifier says "this email is 94% likely spam" rather than a definitive yes/no. Understanding probability is therefore essential for understanding *what a model is really saying*.\n\nProbability assigns a number between 0 and 1 to events:\n- **P(A) = 0** → event A is impossible\n- **P(A) = 1** → event A is certain\n- **P(A) = 0.7** → event A happens 70% of the time on average',
            },
            {
              type: 'text',
              content:
                '## The Three Axioms (Kolmogorov)\n\nAll of probability theory rests on three simple rules:\n1. **Non-negativity**: P(A) ≥ 0 for all events A\n2. **Normalization**: P(Ω) = 1 (something always happens)\n3. **Additivity**: If A and B are mutually exclusive, P(A ∪ B) = P(A) + P(B)',
            },
            {
              type: 'text',
              content:
                '## Conditional Probability\n\nConditional probability asks: **"What is the probability of A, given that B has already happened?"** It updates our belief based on new information.',
            },
            {
              type: 'math',
              latex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0',
              displayMode: true,
              caption: 'We narrow our focus to the universe where B occurred, then ask how often A happens there.',
            },
            {
              type: 'text',
              content:
                '## Bayes\' Theorem\n\nBayes\' theorem is one of the most powerful ideas in statistics. It tells us how to **reverse** conditional probabilities — to update our beliefs given new evidence.',
            },
            {
              type: 'math',
              latex:
                'P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}',
              displayMode: true,
              caption: 'Posterior = (Likelihood × Prior) / Evidence',
            },
            {
              type: 'callout',
              variant: 'info',
              title: "Bayes' Theorem in Plain Language",
              content:
                '**Prior** P(A): what we believed before seeing B. **Likelihood** P(B|A): how probable the evidence is if A is true. **Posterior** P(A|B): our updated belief after seeing B. Bayesian reasoning is how spam filters, medical diagnosis tools, and language models work at their core.',
            },
            {
              type: 'eli5',
              content:
                '**Think of Bayes\' Theorem as a doctor updating a diagnosis.** The doctor starts with a prior belief: "5% of people with this symptom have Disease X." Then a test comes back positive. The test is 90% accurate. Now the doctor updates: "Given the positive test, what are the chances of Disease X?" The answer is NOT 90% — it depends on how rare the disease is (the prior). Bayes\' theorem gives the exact formula for this update.',
            },
            {
              type: 'code',
              language: 'python',
              caption: "Bayes' Theorem: the classic medical test example",
              code: `# Disease prevalence (prior)
P_disease = 0.01           # 1% of population has the disease

# Test characteristics
P_positive_given_disease   = 0.95   # sensitivity (true positive rate)
P_positive_given_no_disease = 0.05  # 1 - specificity (false positive rate)

# Total probability of a positive test
P_no_disease = 1 - P_disease
P_positive = (P_positive_given_disease   * P_disease +
              P_positive_given_no_disease * P_no_disease)

print(f"P(positive test) = {P_positive:.4f}")  # 0.0590

# Bayes' theorem: P(disease | positive test)
P_disease_given_positive = (P_positive_given_disease * P_disease) / P_positive
print(f"P(disease | positive) = {P_disease_given_positive:.4f}")  # 0.1610

# Surprising result: even with a 95% accurate test,
# if the disease is rare, a positive result is only ~16% likely to be true!`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Probability is a number in [0, 1] measuring how likely an event is.',
                'Conditional probability P(A|B) narrows the sample space to where B occurred.',
                "Bayes' theorem reverses conditioning: P(A|B) from P(B|A), P(A), and P(B).",
                'A rare disease + high test accuracy can still yield many false positives — always consider the prior.',
                'Bayesian reasoning is the foundation of spam filters, Naive Bayes classifiers, and probabilistic ML.',
              ],
            },
            {
              type: 'quiz',
              questions: [
                {
                  id: 'pf1',
                  question: 'P(A|B) = 0 means:',
                  options: [
                    'A and B are independent',
                    'A cannot occur when B has occurred',
                    'B cannot occur',
                    'A always occurs when B occurs',
                  ],
                  correctIndex: 1,
                  explanation: 'P(A|B) = 0 means the probability of A given B is zero — A never happens in the universe where B has occurred.',
                },
                {
                  id: 'pf2',
                  question: 'In Bayes\' theorem P(A|B) = P(B|A)·P(A) / P(B), what is P(A) called?',
                  options: ['Likelihood', 'Posterior', 'Prior', 'Evidence'],
                  correctIndex: 2,
                  explanation: 'P(A) is the **prior** — our belief about A before observing B. P(B|A) is the likelihood, P(B) is the evidence, and P(A|B) is the posterior.',
                },
              ],
            },
          ],
        },
        {
          id: 'probability-distributions',
          title: 'Probability Distributions',
          description: 'The Gaussian, Bernoulli, Binomial, and more — and the Central Limit Theorem.',
          duration: '50 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## What Is a Distribution?\n\nA probability distribution tells us how likely each possible value of a random variable is. There are two main families:\n\n- **Discrete distributions**: for countable outcomes (coin flips, word counts)\n- **Continuous distributions**: for real-valued outcomes (height, temperature, model confidence)',
            },
            {
              type: 'text',
              content:
                '## The Normal (Gaussian) Distribution\n\nThe most important distribution in all of statistics. It appears naturally when many small, independent random effects add up — heights, measurement errors, residuals in linear regression. Characterised entirely by its **mean μ** and **standard deviation σ**.',
            },
            {
              type: 'math',
              latex:
                'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)',
              displayMode: true,
              caption: 'The probability density function (PDF) of the Gaussian distribution.',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'The 68-95-99.7 Rule',
              content:
                'For a Gaussian distribution: 68% of data falls within 1σ of the mean, 95% within 2σ, and 99.7% within 3σ. This rule is used constantly in anomaly detection and A/B testing.',
            },
            {
              type: 'text',
              content:
                '## The Bernoulli and Binomial Distributions\n\n**Bernoulli(p)**: models a single binary outcome (success/failure) with probability p of success. Used for binary classification targets.\n\n**Binomial(n, p)**: models the number of successes in n independent Bernoulli trials.',
            },
            {
              type: 'math',
              latex:
                'P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad k = 0, 1, \\ldots, n',
              displayMode: true,
              caption: 'Binomial PMF: probability of exactly k successes in n trials.',
            },
            {
              type: 'text',
              content:
                '## The Central Limit Theorem (CLT)\n\nPerhaps the most important theorem in statistics: **regardless of the original distribution**, the sampling distribution of the mean of n independent random variables approaches a Gaussian as n → ∞.\n\nThis justifies using the Gaussian distribution to model averages, and underpins hypothesis testing, confidence intervals, and A/B testing.',
            },
            {
              type: 'math',
              latex:
                '\\bar{X}_n \\xrightarrow{d} \\mathcal{N}\\!\\left(\\mu,\\, \\frac{\\sigma^2}{n}\\right) \\text{ as } n \\to \\infty',
              displayMode: true,
              caption: 'The sample mean converges in distribution to a Gaussian, regardless of the population distribution.',
            },
            {
              type: 'eli5',
              content:
                "**Why do so many things follow a bell curve?** Roll one die: you get a flat distribution (each of 1-6 equally likely). Roll two dice and sum them: you start to see a tent shape. Roll ten dice and sum them: you get a near-perfect bell curve. That's the Central Limit Theorem — add up enough random things and you always get a bell curve. This is why heights, test scores, and model errors all tend to look Gaussian.",
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Working with distributions using NumPy and SciPy',
              code: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Gaussian distribution
mu, sigma = 170, 8  # mean height in cm, std dev

# PDF at a specific value
x = 175
pdf_val = stats.norm.pdf(x, loc=mu, scale=sigma)
print(f"P(height = 175 cm) ≈ {pdf_val:.4f}")

# CDF: probability of being shorter than x
cdf_val = stats.norm.cdf(x, loc=mu, scale=sigma)
print(f"P(height ≤ 175 cm) = {cdf_val:.4f}")  # ~0.7340

# 68-95-99.7 rule verification
for n_sigma in [1, 2, 3]:
    prob = stats.norm.cdf(mu + n_sigma*sigma) - stats.norm.cdf(mu - n_sigma*sigma)
    print(f"Within {n_sigma}σ: {prob*100:.2f}%")
# Within 1σ: 68.27%   Within 2σ: 95.45%   Within 3σ: 99.73%

# Binomial distribution
n_trials, p_success = 100, 0.3
binom = stats.binom(n=n_trials, p=p_success)
print(f"E[X] = {binom.mean()}, Var[X] = {binom.var()}")
print(f"P(X = 30) = {binom.pmf(30):.4f}")

# Central Limit Theorem demonstration
population = np.random.exponential(scale=2, size=100_000)  # skewed distribution
sample_means = [np.mean(np.random.choice(population, 50)) for _ in range(5000)]
print(f"Sample means — mean: {np.mean(sample_means):.2f}, std: {np.std(sample_means):.3f}")
# Looks Gaussian even though the population is exponential!`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Distributions describe the probability of each possible value of a random variable.',
                'The Gaussian (Normal) is parameterised by μ (mean) and σ (std dev); 68/95/99.7% of data falls within 1/2/3 standard deviations.',
                'Bernoulli models binary outcomes; Binomial counts successes in n trials.',
                'The **Central Limit Theorem** guarantees that sample means are approximately Gaussian — the cornerstone of statistical inference.',
                'SciPy\'s `stats` module provides PDF, CDF, and sampling for all common distributions.',
              ],
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════
    // MODULE 3: Optimization
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'optimization',
      title: 'Calculus & Optimization',
      description: 'Gradients, gradient descent, and how models learn by minimizing loss.',
      lessons: [
        {
          id: 'gradient-descent',
          title: 'Gradient Descent',
          description: 'How machine learning models find their optimal parameters by following the slope downhill.',
          duration: '55 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## The Optimization Problem\n\nEvery machine learning model has a **loss function** (also called cost or objective function) that measures how wrong its predictions are. Training a model means finding the set of **parameters** (weights) that minimizes this loss.\n\nThis is an optimization problem. For most ML models, we cannot solve it analytically (in closed form), so we use iterative numerical methods — the most fundamental of which is **gradient descent**.',
            },
            {
              type: 'text',
              content:
                '## Derivatives and Gradients\n\nThe **derivative** of a function tells us its slope at each point. For a function of multiple variables (like a loss function with millions of parameters), the generalisation is the **gradient** — a vector of partial derivatives, one for each parameter.',
            },
            {
              type: 'math',
              latex:
                '\\nabla_{\\theta} J(\\theta) = \\begin{bmatrix} \\frac{\\partial J}{\\partial \\theta_1} \\\\ \\frac{\\partial J}{\\partial \\theta_2} \\\\ \\vdots \\\\ \\frac{\\partial J}{\\partial \\theta_n} \\end{bmatrix}',
              displayMode: true,
              caption: 'The gradient ∇J(θ) points in the direction of steepest ascent.',
            },
            {
              type: 'text',
              content:
                '## The Gradient Descent Update Rule\n\nGradient descent takes small steps **opposite** to the gradient (downhill). The step size is controlled by the **learning rate** α (alpha). After each step, we recompute the gradient at the new position and step again.',
            },
            {
              type: 'math',
              latex:
                '\\theta \\leftarrow \\theta - \\alpha \\nabla_{\\theta} J(\\theta)',
              displayMode: true,
              caption: 'The parameter update: move in the direction of steepest descent by step size α.',
            },
            {
              type: 'callout',
              variant: 'warning',
              title: 'Choosing the Learning Rate',
              content:
                'Too large → the algorithm overshoots and diverges. Too small → training is extremely slow. Adaptive optimizers (Adam, RMSprop) automatically adjust the learning rate per parameter, which is why they are preferred in deep learning.',
            },
            {
              type: 'text',
              content:
                '## Variants of Gradient Descent\n\n- **Batch GD**: use all training data to compute gradient each step. Stable but slow for large datasets.\n- **Stochastic GD (SGD)**: use one random sample per step. Fast but noisy.\n- **Mini-batch GD**: use a small batch (32–512 samples). Best of both worlds — the standard in deep learning.\n\n**Adam** (Adaptive Moment Estimation) is the most popular optimizer: it maintains per-parameter learning rates using first and second moment estimates of the gradients.',
            },
            {
              type: 'math',
              latex:
                'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2',
              displayMode: true,
              caption: 'Adam: m is the first moment (momentum), v is the second moment (adaptive scale).',
            },
            {
              type: 'eli5',
              content:
                "**Gradient descent is like finding the bottom of a valley while blindfolded.** You can only feel the slope under your feet. So you take a small step in the downhill direction, stop, feel the slope again, and step again. If your steps are too big, you might jump over the valley and land on another hill. If they're too tiny, it'll take forever to reach the bottom. A good learning rate is a step size that's just right. Adam is like a smart hiker who adjusts their stride length based on the terrain.",
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Implementing gradient descent from scratch for linear regression',
              code: `import numpy as np

# Generate synthetic data: y = 2x + 1 + noise
np.random.seed(42)
X = np.random.randn(100)
y = 2 * X + 1 + 0.5 * np.random.randn(100)

# Initialize parameters
w, b = 0.0, 0.0
alpha = 0.01   # learning rate
epochs = 1000

def predict(X, w, b):
    return w * X + b

def mse_loss(y_pred, y_true):
    return np.mean((y_pred - y_true) ** 2)

# Gradient descent loop
for epoch in range(epochs):
    y_pred = predict(X, w, b)

    # Compute gradients (analytical for linear regression)
    dL_dw = 2 * np.mean((y_pred - y) * X)  # ∂L/∂w
    dL_db = 2 * np.mean(y_pred - y)         # ∂L/∂b

    # Update parameters
    w -= alpha * dL_dw
    b -= alpha * dL_db

    if epoch % 200 == 0:
        loss = mse_loss(y_pred, y)
        print(f"Epoch {epoch:4d} | Loss: {loss:.4f} | w={w:.3f} | b={b:.3f}")

print(f"\\nFinal: w={w:.4f} (true=2.0), b={b:.4f} (true=1.0)")
# Epoch    0 | Loss: 1.4932 | w=0.265 | b=0.013
# Epoch  200 | Loss: 0.2729 | w=1.876 | b=0.965
# Final:  w=1.9977, b=0.9988`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'The gradient points in the direction of steepest ascent; gradient descent moves in the *opposite* direction.',
                'The learning rate α controls step size — too large diverges, too small is slow.',
                'Mini-batch gradient descent (batch size 32-512) is the standard in deep learning.',
                'Adam adapts the learning rate per parameter using gradient momentum — the go-to optimizer for neural networks.',
                'Gradient descent finds a *local* minimum; for convex losses (like MSE), the local minimum is the global minimum.',
              ],
            },
            {
              type: 'quiz',
              questions: [
                {
                  id: 'gd1',
                  question: 'If the gradient at the current point is positive, gradient descent will:',
                  options: [
                    'Increase θ',
                    'Decrease θ',
                    'Stop updating θ',
                    'Double the learning rate',
                  ],
                  correctIndex: 1,
                  explanation: 'θ ← θ - α·∇J(θ). If ∇J(θ) > 0, then θ decreases. We move downhill — opposite to the gradient.',
                },
                {
                  id: 'gd2',
                  question: 'What does the Adam optimizer adapt?',
                  options: [
                    'The batch size',
                    'The number of layers',
                    'The learning rate per parameter',
                    'The loss function',
                  ],
                  correctIndex: 2,
                  explanation: 'Adam maintains per-parameter learning rates using first and second moment estimates of the gradients, making it adaptive and generally more robust than fixed-learning-rate SGD.',
                },
              ],
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════
    // MODULE 4: Python for Data Science
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'python-data-science',
      title: 'Python for Data Science',
      description: 'NumPy, Pandas, and Matplotlib — the essential toolkit.',
      lessons: [
        {
          id: 'numpy-pandas-essentials',
          title: 'NumPy & Pandas Essentials',
          description: 'Master the two most important libraries for data manipulation in Python.',
          duration: '60 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## NumPy: Numerical Python\n\nNumPy provides the `ndarray` — an efficient multi-dimensional array optimized for numerical computation. Operations on NumPy arrays are implemented in C, making them 10–100× faster than pure Python loops.\n\nKey concepts: **broadcasting**, **vectorization**, **fancy indexing**.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'NumPy fundamentals',
              code: `import numpy as np

# Creating arrays
a = np.arange(10)                    # [0,1,...,9]
b = np.linspace(0, 1, 5)            # [0.0, 0.25, 0.5, 0.75, 1.0]
c = np.random.normal(0, 1, (3, 4))  # 3×4 standard normal

# Vectorized operations (no loops needed!)
x = np.array([1.0, 4.0, 9.0, 16.0])
print(np.sqrt(x))   # [1. 2. 3. 4.]
print(x ** 2)       # [1. 16. 81. 256.]

# Broadcasting: add a vector to each row of a matrix
M = np.ones((3, 4))
v = np.array([1, 2, 3, 4])
result = M + v      # v is broadcast over each row
print(result)

# Boolean indexing
data = np.array([3, -1, 4, -1, 5, -9, 2])
positive = data[data > 0]   # [3, 4, 5, 2]
print(positive)

# Aggregations
print(f"mean={data.mean():.2f}, std={data.std():.2f}, max={data.max()}")`,
            },
            {
              type: 'text',
              content:
                '## Pandas: Data Analysis Library\n\nPandas provides two key structures:\n- **Series**: a 1-D labelled array\n- **DataFrame**: a 2-D table with named columns — the workhorse of data analysis\n\nThink of a DataFrame as a spreadsheet or SQL table, but with the full power of Python.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Pandas fundamentals',
              code: `import pandas as pd
import numpy as np

# Create a DataFrame
df = pd.DataFrame({
    'name':   ['Alice', 'Bob', 'Carol', 'Dave'],
    'age':    [28, 34, 22, 45],
    'salary': [75000, 92000, 58000, 110000],
    'dept':   ['Eng', 'Sales', 'Eng', 'HR'],
})

# Basic exploration
print(df.head())
print(df.dtypes)
print(df.describe())       # summary statistics

# Selecting columns
print(df['salary'])        # Series
print(df[['name', 'age']]) # DataFrame

# Filtering rows
engineers = df[df['dept'] == 'Eng']
high_earners = df[df['salary'] > 80000]

# Adding a computed column
df['salary_k'] = df['salary'] / 1000
df['senior'] = df['age'] > 35

# Aggregation
dept_avg = df.groupby('dept')['salary'].agg(['mean', 'count'])
print(dept_avg)

# Handling missing values
df_missing = df.copy()
df_missing.loc[1, 'salary'] = np.nan
print(df_missing.isnull().sum())         # count nulls per column
df_clean = df_missing.fillna(df_missing['salary'].median())  # impute`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'NumPy arrays are 10-100× faster than Python lists for numerical computation via vectorization.',
                'Broadcasting allows operations between arrays of different but compatible shapes.',
                'Pandas DataFrames are the primary data structure for tabular data in Python.',
                '`.groupby()` + aggregation functions (mean, sum, count) are essential for data summarisation.',
                'Always check for missing values with `.isnull().sum()` before modeling.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
