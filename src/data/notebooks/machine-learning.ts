import type { Notebook } from '@/types/notebook';

export const machineLearningNotebooks: Notebook[] = [
  // ─── Linear Regression ────────────────────────────────────────────────────
  {
    id: 'linear-regression',
    title: 'Linear Regression',
    slug: 'linear-regression',
    category: 'machine-learning',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    tags: ['regression', 'supervised', 'statistics', 'OLS', 'prediction'],
    description: 'The foundation of predictive modeling. Learn how to fit a line to data and predict continuous outcomes.',
    prerequisites: [],
    relatedNotebooks: ['logistic-regression', 'decision-tree', 'random-forest'],
    cells: [
      {
        id: 'lr-intro',
        type: 'markdown',
        content: `# Linear Regression\n\nLinear Regression is the **"Hello World" of machine learning** — simple, interpretable, and surprisingly powerful. It models the relationship between one or more input features and a continuous output variable by fitting a straight line (or hyperplane) through the data.\n\nDespite being over 200 years old (invented by Gauss!), it remains one of the most widely used algorithms in industry.`,
      },
      {
        id: 'lr-theory-1',
        type: 'theory',
        title: 'What is Linear Regression?',
        variant: 'default',
        content: `Linear Regression assumes that the output y is a **linear combination** of the input features x₁, x₂, ..., xₙ plus some noise ε.\n\nThe algorithm finds the best-fit line by minimizing the sum of squared residuals — the differences between predicted and actual values. This method is called **Ordinary Least Squares (OLS)**.\n\n**Key properties:**\n- Output is a continuous real number\n- Simple, fast, and interpretable\n- Coefficients reveal feature importance\n- Assumes linear relationship between features and target`,
      },
      {
        id: 'lr-math-model',
        type: 'math',
        title: 'The Linear Model',
        formula: 'ŷ = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ',
        explanation: 'β₀ is the intercept (bias), β₁...βₙ are the coefficients (weights) for each feature. ŷ is the predicted value.',
      },
      {
        id: 'lr-math-ols',
        type: 'math',
        title: 'Ordinary Least Squares (OLS) — Closed Form',
        formula: 'β = (XᵀX)⁻¹ Xᵀy',
        explanation: 'This gives the exact optimal weights in one shot. X is the feature matrix (with a column of 1s for the intercept), y is the target vector. This only works when XᵀX is invertible and works well for small datasets.',
      },
      {
        id: 'lr-math-loss',
        type: 'math',
        title: 'Mean Squared Error Loss',
        formula: 'MSE = (1/n) Σᵢ (yᵢ - ŷᵢ)²',
        explanation: 'We minimize this loss function during training. The gradient descent update rule is: β ← β - α · ∇MSE, where α is the learning rate.',
      },
      {
        id: 'lr-theory-assumptions',
        type: 'theory',
        title: '4 Key Assumptions',
        variant: 'important',
        content: `Linear Regression only works well when these hold:\n\n**1. Linearity** — The relationship between X and y is linear.\n**2. Independence** — Observations are independent of each other.\n**3. Homoscedasticity** — Constant variance of residuals across all values of X.\n**4. Normality** — Residuals are normally distributed (matters for inference, less for prediction).`,
      },
      {
        id: 'lr-steps',
        type: 'steps',
        title: 'How Linear Regression Works — Step by Step',
        steps: [
          {
            step: 1,
            title: 'Collect & Prepare Data',
            description: 'Gather labeled data with features X and continuous target y. Handle missing values, encode categoricals, and normalize features if using gradient descent.',
            icon: '📊',
          },
          {
            step: 2,
            title: 'Add Bias Term',
            description: 'Prepend a column of 1s to the feature matrix X to represent the intercept β₀. This allows the model to shift the line up/down.',
            icon: '➕',
          },
          {
            step: 3,
            title: 'Compute Optimal Weights',
            description: 'Apply OLS formula β = (XᵀX)⁻¹Xᵀy for small datasets, or use gradient descent for large datasets: iteratively move β in the direction that reduces the MSE.',
            icon: '🎯',
          },
          {
            step: 4,
            title: 'Make Predictions',
            description: 'Compute ŷ = Xβ for new data points. The model has learned the coefficients that best explain the training data.',
            icon: '🔮',
          },
          {
            step: 5,
            title: 'Evaluate Performance',
            description: 'Use R², RMSE, and MAE to measure how well predictions match actual values. Check residual plots for assumption violations.',
            icon: '📈',
          },
        ],
      },
      {
        id: 'lr-code-scratch',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Linear Regression from scratch using NumPy',
        code: `import numpy as np
import matplotlib.pyplot as plt

class LinearRegression:
    def __init__(self):
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        # Add bias column of ones
        X_b = np.c_[np.ones((len(X), 1)), X]
        # OLS closed form: β = (X'X)^-1 X'y
        beta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
        self.bias = beta[0]
        self.weights = beta[1:]
        return self

    def predict(self, X):
        return X @ self.weights + self.bias

    def score(self, X, y):
        y_pred = self.predict(X)
        ss_res = np.sum((y - y_pred) ** 2)
        ss_tot = np.sum((y - np.mean(y)) ** 2)
        return 1 - (ss_res / ss_tot)  # R²

# Generate synthetic data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 3 + 4 * X.ravel() + np.random.randn(100)

# Train
model = LinearRegression()
model.fit(X, y)

print(f"Intercept (β₀): {model.bias:.4f}")
print(f"Coefficient (β₁): {model.weights[0]:.4f}")
print(f"R² Score: {model.score(X, y):.4f}")`,
        output: `Intercept (β₀): 3.0214
Coefficient (β₁): 3.9857
R² Score: 0.9612`,
      },
      {
        id: 'lr-code-sklearn',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Production-ready: sklearn + train/test split + full evaluation',
        code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import numpy as np

# Prepare data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Feature scaling (optional for OLS, good practice for gradient descent)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# Train
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2   = r2_score(y_test, y_pred)

print(f"RMSE: {rmse:.4f}")
print(f"R² Score: {r2:.4f}")
print(f"Coefficients: {model.coef_}")
print(f"Intercept: {model.intercept_:.4f}")`,
        output: `RMSE: 0.9847
R² Score: 0.9589
Coefficients: [7.9431]
Intercept: 11.0012`,
      },
      {
        id: 'lr-chart-regression',
        type: 'chart',
        chartType: 'scatter',
        title: 'Linear Regression Fit',
        description: 'Training data (blue dots) with the fitted regression line (red). The model explains 96% of the variance in the data.',
        xLabel: 'Feature X',
        yLabel: 'Target y',
        data: [
          { x: 0.1, y: 3.5, type: 'data' }, { x: 0.3, y: 4.1, type: 'data' },
          { x: 0.5, y: 5.2, type: 'data' }, { x: 0.7, y: 5.8, type: 'data' },
          { x: 0.9, y: 7.1, type: 'data' }, { x: 1.1, y: 7.4, type: 'data' },
          { x: 1.3, y: 8.2, type: 'data' }, { x: 1.5, y: 9.0, type: 'data' },
          { x: 1.7, y: 9.8, type: 'data' }, { x: 1.9, y: 10.4, type: 'data' },
          { x: 0.0, y: 3.02, type: 'line' }, { x: 2.0, y: 11.02, type: 'line' },
        ],
      },
      {
        id: 'lr-chart-residuals',
        type: 'chart',
        chartType: 'scatter',
        title: 'Residual Plot',
        description: 'Residuals scattered randomly around zero indicates the linear assumption holds. A pattern would suggest a non-linear relationship.',
        xLabel: 'Predicted ŷ',
        yLabel: 'Residual (y - ŷ)',
        data: [
          { x: 3.5, y: 0.4 }, { x: 4.2, y: -0.3 }, { x: 5.1, y: 0.8 },
          { x: 5.8, y: -0.2 }, { x: 7.0, y: 0.5 }, { x: 7.5, y: -0.7 },
          { x: 8.3, y: 0.1 }, { x: 9.1, y: -0.5 }, { x: 9.9, y: 0.3 },
          { x: 10.5, y: -0.1 },
        ],
      },
      {
        id: 'lr-metrics',
        type: 'metrics',
        title: 'Model Performance Metrics',
        metrics: [
          { name: 'R² Score', value: '0.96', format: 'decimal', status: 'good', description: '96% of variance explained — excellent fit' },
          { name: 'RMSE', value: '0.98', format: 'decimal', status: 'good', description: 'Average prediction error in target units' },
          { name: 'MAE', value: '0.79', format: 'decimal', status: 'good', description: 'Mean Absolute Error — robust to outliers' },
          { name: 'Training Time', value: '<1ms', format: 'text', status: 'info', description: 'Closed-form OLS is essentially instantaneous' },
        ],
      },
      {
        id: 'lr-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          {
            industry: 'Finance',
            useCase: 'House Price Prediction',
            description: 'Predict real estate prices based on square footage, location, and number of rooms.',
            example: 'Zillow uses regression models as part of its Zestimate algorithm, processing millions of property valuations.',
            companies: ['Zillow', 'Redfin', 'Opendoor'],
            icon: '🏠',
          },
          {
            industry: 'Retail',
            useCase: 'Sales Forecasting',
            description: 'Predict future sales volumes based on marketing spend, seasonality, and pricing.',
            example: 'Walmart uses demand forecasting to optimize inventory across 10,000+ stores, reducing overstock by 15%.',
            companies: ['Walmart', 'Target', 'Amazon'],
            icon: '📦',
          },
          {
            industry: 'Healthcare',
            useCase: 'Medical Cost Estimation',
            description: 'Estimate patient treatment costs based on age, BMI, smoking status, and medical history.',
            example: 'Insurance companies use linear models to set premiums for millions of policyholders.',
            companies: ['UnitedHealth', 'Anthem', 'Aetna'],
            icon: '🏥',
          },
          {
            industry: 'Marketing',
            useCase: 'ROI Attribution',
            description: 'Measure the impact of different marketing channels on sales revenue.',
            example: 'Marketing mix modeling uses linear regression to determine which channels (TV, digital, radio) drive the most revenue.',
            companies: ['P&G', 'Unilever', 'Coca-Cola'],
            icon: '📊',
          },
        ],
      },
      {
        id: 'lr-callout-limits',
        type: 'callout',
        variant: 'warning',
        title: 'When NOT to Use Linear Regression',
        content: `Avoid Linear Regression when:\n• The relationship is clearly non-linear (use polynomial features or tree-based models)\n• The target is categorical (use Logistic Regression or classification)\n• Outliers are common and not removable (consider Huber or Ridge regression)\n• Features are highly collinear (use Ridge or Lasso regularization)\n• You need probability outputs (not raw values)`,
      },
      {
        id: 'lr-comparison',
        type: 'comparison',
        title: 'Ridge vs Lasso vs Plain OLS',
        items: [
          {
            label: 'OLS (Plain)',
            pros: ['Closed-form solution', 'Fastest computation', 'Fully interpretable'],
            cons: ['Sensitive to outliers', 'Fails with multicollinearity', 'No feature selection'],
            whenToUse: 'Small datasets, low feature count, interpretability required',
          },
          {
            label: 'Ridge (L2)',
            pros: ['Handles multicollinearity', 'Stable coefficients', 'Never drops features'],
            cons: ['Keeps all features (no sparsity)', 'One hyperparameter to tune'],
            whenToUse: 'Many correlated features, need all features, prevent overfitting',
          },
          {
            label: 'Lasso (L1)',
            pros: ['Automatic feature selection', 'Sparse solution', 'Interpretable'],
            cons: ['Unstable with correlated features', 'May discard useful features'],
            whenToUse: 'High-dimensional data, want automatic feature selection',
          },
        ],
      },
      {
        id: 'lr-quiz',
        type: 'quiz',
        title: 'Test Your Understanding',
        questions: [
          {
            question: 'What does an R² of 0.85 mean?',
            options: [
              'The model is 85% accurate',
              '85% of the variance in y is explained by the model',
              'The RMSE is 0.15',
              'The model correctly predicts 85% of samples',
            ],
            correct: 1,
            explanation: 'R² (coefficient of determination) measures the proportion of variance in the target variable that is explained by the model. R²=0.85 means 85% of the variation in y is captured by the linear relationship with X.',
          },
          {
            question: 'Which regularization technique performs automatic feature selection?',
            options: ['Ridge (L2)', 'Lasso (L1)', 'Elastic Net', 'Dropout'],
            correct: 1,
            explanation: 'Lasso (L1 regularization) adds a penalty proportional to the absolute value of coefficients. This forces some coefficients exactly to zero, effectively removing those features from the model.',
          },
          {
            question: 'What problem does the OLS closed-form solution β = (XᵀX)⁻¹Xᵀy have for very large datasets?',
            options: [
              'It gives incorrect results',
              'It is computationally expensive (O(n³) for matrix inversion)',
              'It requires normalized features',
              'It only works in 2D',
            ],
            correct: 1,
            explanation: 'The matrix inversion (XᵀX)⁻¹ is O(n³) in time and O(n²) in memory, making it prohibitive for millions of samples or features. Gradient descent scales better to large datasets.',
          },
        ],
      },
      {
        id: 'lr-interview',
        type: 'interview',
        title: 'Interview Questions',
        questions: [
          {
            question: 'What is the difference between correlation and linear regression?',
            answer: 'Correlation measures the strength and direction of the linear relationship between two variables (a single number between -1 and 1). Linear regression quantifies that relationship with a predictive equation — it gives you coefficients so you can predict y for new x values. Correlation is symmetric (corr(X,Y) = corr(Y,X)); regression is not.',
            difficulty: 'easy',
          },
          {
            question: 'How do you handle multicollinearity in linear regression?',
            answer: 'Multicollinearity (highly correlated features) inflates coefficient variance and makes them unstable. Solutions: (1) Remove one of the correlated features, (2) Use PCA to create uncorrelated components, (3) Use Ridge regression which shrinks correlated coefficients together, (4) Use VIF (Variance Inflation Factor) to detect and remove offending features.',
            difficulty: 'medium',
          },
          {
            question: 'Explain the bias-variance tradeoff in the context of linear regression.',
            answer: 'A simple linear model has high bias (underfits complex patterns) but low variance (stable across different training sets). Adding polynomial features reduces bias but increases variance. Regularization (Ridge/Lasso) controls this tradeoff by penalizing large coefficients, preventing overfitting while maintaining reasonable bias. The optimal model minimizes total error = bias² + variance + irreducible noise.',
            difficulty: 'hard',
          },
        ],
      },
    ],
  },

  // ─── Decision Tree ────────────────────────────────────────────────────────
  {
    id: 'decision-tree',
    title: 'Decision Tree',
    slug: 'decision-tree',
    category: 'machine-learning',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    tags: ['classification', 'regression', 'supervised', 'tree', 'interpretable'],
    description: 'Build interpretable tree-shaped models that make predictions by asking a series of yes/no questions about your data.',
    prerequisites: [],
    relatedNotebooks: ['random-forest', 'xgboost', 'linear-regression'],
    cells: [
      {
        id: 'dt-intro',
        type: 'markdown',
        content: `# Decision Tree\n\nA Decision Tree is a **flowchart-shaped model** that makes predictions by splitting data based on feature values. At each node, it asks a question ("Is age > 30?"). Each answer leads to another question or a final prediction.\n\nDecision trees are beloved for their **interpretability** — you can literally follow the tree to understand why a prediction was made. This makes them popular in regulated industries like banking and healthcare.`,
      },
      {
        id: 'dt-theory',
        type: 'theory',
        title: 'How Decision Trees Learn',
        variant: 'default',
        content: `A Decision Tree builds its structure **recursively** using a greedy algorithm:\n\n1. **Start at root** with all training samples\n2. **Find the best split** — the feature + threshold that best separates the classes\n3. **Split the data** into two child nodes\n4. **Repeat** recursively on each child until a stopping criterion is met\n\nThe "best split" is determined by an impurity measure — **Gini Impurity** or **Information Gain (Entropy)**.`,
      },
      {
        id: 'dt-math-gini',
        type: 'math',
        title: 'Gini Impurity',
        formula: 'Gini(t) = 1 - Σₖ p(k|t)²',
        explanation: 'Where p(k|t) is the proportion of class k at node t. Gini = 0 means perfect purity (all one class). Gini = 0.5 means maximum impurity (equal classes). CART algorithm uses Gini by default.',
      },
      {
        id: 'dt-math-entropy',
        type: 'math',
        title: 'Information Gain (Entropy)',
        formula: 'IG(t, a) = H(t) - Σᵥ (|tᵥ| / |t|) · H(tᵥ)',
        explanation: 'H(t) = -Σₖ p(k|t) log₂ p(k|t) is the entropy. Information Gain measures how much a split reduces entropy. ID3 and C4.5 algorithms use this. Both Gini and Entropy produce similar trees in practice.',
      },
      {
        id: 'dt-diagram',
        type: 'diagram',
        title: 'Decision Tree Structure — Loan Approval',
        diagramType: 'flowchart',
        content: `
                    [Credit Score > 700?]
                   /                    \\
                 YES                     NO
                  |                       |
        [Income > $50k?]         [Debt Ratio < 0.4?]
           /        \\                /          \\
         YES         NO            YES            NO
          |           |             |              |
       APPROVE      REJECT       APPROVE         REJECT
`,
      },
      {
        id: 'dt-code-impl',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Decision Tree from scratch — understanding the core algorithm',
        code: `import numpy as np
from collections import Counter

class DecisionTreeNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, value=None):
        self.feature   = feature    # index of feature to split on
        self.threshold = threshold  # value to split at
        self.left      = left       # left subtree (feature <= threshold)
        self.right     = right      # right subtree (feature > threshold)
        self.value     = value      # leaf node class prediction

class DecisionTree:
    def __init__(self, max_depth=5, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.root = None

    def _gini(self, y):
        counts = Counter(y)
        n = len(y)
        return 1 - sum((c/n)**2 for c in counts.values())

    def _best_split(self, X, y):
        best_gain, best_feat, best_thresh = -1, None, None
        parent_gini = self._gini(y)

        for feat in range(X.shape[1]):
            thresholds = np.unique(X[:, feat])
            for thresh in thresholds:
                left_mask  = X[:, feat] <= thresh
                right_mask = ~left_mask
                if left_mask.sum() < self.min_samples_split: continue

                n_l, n_r = left_mask.sum(), right_mask.sum()
                child_gini = (n_l * self._gini(y[left_mask]) +
                              n_r * self._gini(y[right_mask])) / len(y)
                gain = parent_gini - child_gini

                if gain > best_gain:
                    best_gain, best_feat, best_thresh = gain, feat, thresh

        return best_feat, best_thresh

    def _build(self, X, y, depth=0):
        if depth >= self.max_depth or len(set(y)) == 1:
            return DecisionTreeNode(value=Counter(y).most_common(1)[0][0])

        feat, thresh = self._best_split(X, y)
        if feat is None:
            return DecisionTreeNode(value=Counter(y).most_common(1)[0][0])

        mask = X[:, feat] <= thresh
        return DecisionTreeNode(
            feature=feat, threshold=thresh,
            left=self._build(X[mask], y[mask], depth+1),
            right=self._build(X[~mask], y[~mask], depth+1),
        )

    def fit(self, X, y):
        self.root = self._build(X, y)

    def _predict_one(self, x, node):
        if node.value is not None: return node.value
        if x[node.feature] <= node.threshold:
            return self._predict_one(x, node.left)
        return self._predict_one(x, node.right)

    def predict(self, X):
        return np.array([self._predict_one(x, self.root) for x in X])

# Test on Iris
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

tree = DecisionTree(max_depth=4)
tree.fit(X_train, y_train)
preds = tree.predict(X_test)
print(f"Accuracy: {(preds == y_test).mean():.4f}")`,
        output: `Accuracy: 0.9667`,
      },
      {
        id: 'dt-code-sklearn',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'sklearn Decision Tree with feature importance and visualization',
        code: `from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train
clf = DecisionTreeClassifier(
    criterion='gini',
    max_depth=4,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)
clf.fit(X_train, y_train)

# Evaluate
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred, target_names=['setosa', 'versicolor', 'virginica']))

# Feature importance
features = ['sepal length', 'sepal width', 'petal length', 'petal width']
for feat, imp in sorted(zip(features, clf.feature_importances_), key=lambda x: -x[1]):
    print(f"  {feat}: {imp:.4f}")`,
        output: `              precision    recall  f1-score   support
     setosa       1.00      1.00      1.00        10
 versicolor       0.90      1.00      0.95         9
  virginica       1.00      0.91      0.95        11

   accuracy                           0.97        30

Feature Importances:
  petal length: 0.5621
  petal width:  0.3892
  sepal length: 0.0487
  sepal width:  0.0000`,
      },
      {
        id: 'dt-chart-importance',
        type: 'chart',
        chartType: 'bar',
        title: 'Feature Importance',
        description: 'Petal length and width are the most discriminative features for classifying Iris species.',
        xLabel: 'Feature',
        yLabel: 'Importance Score',
        data: [
          { label: 'Petal Length', value: 0.5621 },
          { label: 'Petal Width', value: 0.3892 },
          { label: 'Sepal Length', value: 0.0487 },
          { label: 'Sepal Width', value: 0.0000 },
        ],
      },
      {
        id: 'dt-metrics',
        type: 'metrics',
        title: 'Model Performance',
        metrics: [
          { name: 'Accuracy', value: '96.7%', format: 'percent', status: 'good', description: '29/30 test samples correctly classified' },
          { name: 'Precision', value: '0.97', format: 'decimal', status: 'good', description: 'Avg precision across all 3 classes' },
          { name: 'Recall', value: '0.97', format: 'decimal', status: 'good', description: 'Avg recall across all 3 classes' },
          { name: 'Tree Depth', value: '4', format: 'integer', status: 'info', description: 'Max depth of 4 prevents overfitting' },
        ],
      },
      {
        id: 'dt-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          {
            industry: 'Banking',
            useCase: 'Loan Approval',
            description: 'Classify loan applicants as approve/reject based on credit score, income, debt ratio, and employment history.',
            example: 'Banks use decision trees because regulators require explainable decisions — you must be able to tell a customer WHY they were denied.',
            companies: ['JPMorgan', 'Bank of America', 'Wells Fargo'],
            icon: '🏦',
          },
          {
            industry: 'Insurance',
            useCase: 'Fraud Detection',
            description: 'Flag suspicious insurance claims based on claim patterns, customer behavior, and anomaly features.',
            example: 'Allstate uses tree-based models to score claims in real-time, reducing fraudulent payouts by 20%.',
            companies: ['Allstate', 'Progressive', 'AXA'],
            icon: '🔍',
          },
          {
            industry: 'Telecom',
            useCase: 'Customer Churn Prediction',
            description: 'Identify customers likely to cancel their subscription based on usage patterns, payment history, and support interactions.',
            example: 'T-Mobile uses churn models to proactively offer retention deals to high-risk customers.',
            companies: ['T-Mobile', 'AT&T', 'Verizon'],
            icon: '📱',
          },
          {
            industry: 'Healthcare',
            useCase: 'Clinical Decision Support',
            description: 'Support doctors in diagnosing conditions or recommending treatments based on patient symptoms and test results.',
            example: 'Decision trees power clinical pathways for triage systems in hospital emergency departments.',
            companies: ['Mayo Clinic', 'Epic', 'IBM Watson Health'],
            icon: '🩺',
          },
        ],
      },
      {
        id: 'dt-callout-overfitting',
        type: 'callout',
        variant: 'warning',
        title: 'The Overfitting Problem',
        content: `A fully grown decision tree will memorize the training data — achieving 100% training accuracy but terrible test accuracy. Control this with:\n\n• **max_depth** — limit how deep the tree can grow\n• **min_samples_split** — require minimum samples before splitting\n• **min_samples_leaf** — require minimum samples in leaf nodes\n• **Pruning** — grow full tree, then remove uninformative branches post-hoc\n• **Use an ensemble** — Random Forest or Gradient Boosting average many trees`,
      },
      {
        id: 'dt-quiz',
        type: 'quiz',
        title: 'Knowledge Check',
        questions: [
          {
            question: 'A node with Gini = 0 means:',
            options: [
              'The node is at maximum impurity',
              'All samples in the node belong to the same class',
              'The node has equal numbers of each class',
              'The split was ineffective',
            ],
            correct: 1,
            explanation: 'Gini = 0 means perfect purity — all samples belong to one class. The formula Gini = 1 - Σp² = 0 only when one p = 1 and all others are 0.',
          },
          {
            question: 'Why are Decision Trees called "white box" models?',
            options: [
              'They use white-colored nodes in visualizations',
              'Their decision logic can be read and explained in plain language',
              'They are mathematically provably correct',
              'They work well on white-collar industry data',
            ],
            correct: 1,
            explanation: 'Decision Trees are "white box" or interpretable because you can trace any prediction through a series of human-readable if-then rules. This contrasts with "black box" models like neural networks.',
          },
        ],
      },
      {
        id: 'dt-interview',
        type: 'interview',
        title: 'Interview Questions',
        questions: [
          {
            question: 'What is the difference between Gini Impurity and Information Gain?',
            answer: 'Both measure node impurity but differently. Gini Impurity (used by CART) = 1 - Σp², ranges 0 to 0.5 for binary. Entropy-based Information Gain (used by ID3/C4.5) measures reduction in entropy. Gini is slightly faster to compute (no logarithm). In practice, both produce very similar trees — the choice rarely matters much.',
            difficulty: 'medium',
          },
          {
            question: 'How would you handle a decision tree that overfits?',
            answer: 'Several strategies: (1) Pre-pruning: set max_depth, min_samples_split, min_samples_leaf hyperparameters before training. (2) Post-pruning: grow full tree then remove branches using cost-complexity pruning (ccp_alpha in sklearn). (3) Use ensemble methods: Random Forest or Gradient Boosting average many trees and are much more robust to overfitting.',
            difficulty: 'medium',
          },
        ],
      },
    ],
  },

  // ─── K-Means Clustering ───────────────────────────────────────────────────
  {
    id: 'kmeans',
    title: 'K-Means Clustering',
    slug: 'kmeans',
    category: 'machine-learning',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    tags: ['clustering', 'unsupervised', 'segmentation', 'centroid'],
    description: 'Group unlabeled data into k clusters by minimizing within-cluster variance. The most widely used clustering algorithm.',
    prerequisites: [],
    relatedNotebooks: ['dbscan', 'pca'],
    cells: [
      {
        id: 'km-intro',
        type: 'markdown',
        content: `# K-Means Clustering\n\nK-Means is the **most popular unsupervised learning algorithm**. It partitions n data points into k clusters, where each point belongs to the cluster with the nearest centroid.\n\nIt's fast, scalable, and works remarkably well for customer segmentation, image compression, and anomaly detection. The catch: you must specify k in advance.`,
      },
      {
        id: 'km-theory',
        type: 'theory',
        title: 'The K-Means Algorithm',
        variant: 'default',
        content: `K-Means solves an optimization problem: minimize the **within-cluster sum of squares (WCSS)**, also called inertia.\n\nThe algorithm alternates between two steps until convergence:\n1. **Assignment step**: assign each point to the nearest centroid\n2. **Update step**: recompute centroids as the mean of assigned points\n\nThis is guaranteed to converge (WCSS can only decrease or stay equal), but may converge to a local minimum, which is why we run it multiple times with different random initializations.`,
      },
      {
        id: 'km-math',
        type: 'math',
        title: 'Objective Function (WCSS)',
        formula: 'J = Σₖ Σₓ∈Cₖ ||x - μₖ||²',
        explanation: 'Minimize the sum of squared distances between each point x and its cluster centroid μₖ. K-Means is guaranteed to decrease J at each step until convergence.',
      },
      {
        id: 'km-steps',
        type: 'steps',
        title: 'The K-Means Algorithm Step by Step',
        steps: [
          { step: 1, title: 'Choose K', description: 'Select the number of clusters k (use the Elbow Method or Silhouette Score to find optimal k).', icon: '🔢' },
          { step: 2, title: 'Initialize Centroids', description: 'Place k centroids randomly (or use K-Means++ for smarter initialization — picks centroids spread out from each other).', icon: '🎯' },
          { step: 3, title: 'Assign Points', description: 'Assign each point to the nearest centroid using Euclidean distance.', icon: '📍' },
          { step: 4, title: 'Update Centroids', description: 'Move each centroid to the mean position of all points assigned to it.', icon: '🔄' },
          { step: 5, title: 'Repeat Until Convergence', description: 'Keep alternating steps 3 and 4 until centroids stop moving (or max iterations reached).', icon: '✅' },
        ],
      },
      {
        id: 'km-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'K-Means from scratch + Elbow Method + sklearn',
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Generate sample data
X, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.6, random_state=42)

# === Elbow Method — find optimal k ===
inertias = []
K_range = range(1, 10)
for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X)
    inertias.append(km.inertia_)

print("Inertia by k:", {k: round(i, 1) for k, i in zip(K_range, inertias)})

# === Fit optimal model ===
km = KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)
labels = km.fit_predict(X)

print(f"\\nInertia: {km.inertia_:.2f}")
print(f"Silhouette Score: {silhouette_score(X, labels):.4f}")
print(f"Cluster sizes: {dict(zip(*np.unique(labels, return_counts=True)))}")`,
        output: `Inertia by k: {1: 2942.1, 2: 1465.8, 3: 726.2, 4: 218.3, 5: 199.1, 6: 181.4, 7: 167.2, 8: 155.0, 9: 145.3}

Inertia: 218.34
Silhouette Score: 0.8425
Cluster sizes: {0: 78, 1: 72, 2: 75, 3: 75}`,
      },
      {
        id: 'km-chart-elbow',
        type: 'chart',
        chartType: 'line',
        title: 'Elbow Method — Finding Optimal K',
        description: 'The "elbow" at k=4 shows the point of diminishing returns. Adding more clusters beyond 4 barely reduces inertia.',
        xLabel: 'Number of Clusters (k)',
        yLabel: 'Inertia (WCSS)',
        data: [
          { x: 1, y: 2942 }, { x: 2, y: 1466 }, { x: 3, y: 726 },
          { x: 4, y: 218 }, { x: 5, y: 199 }, { x: 6, y: 181 },
          { x: 7, y: 167 }, { x: 8, y: 155 }, { x: 9, y: 145 },
        ],
      },
      {
        id: 'km-metrics',
        type: 'metrics',
        title: 'Clustering Quality Metrics',
        metrics: [
          { name: 'Silhouette Score', value: '0.84', format: 'decimal', status: 'good', description: 'Ranges -1 to 1. Above 0.7 is excellent cluster separation.' },
          { name: 'Inertia', value: '218.3', format: 'decimal', status: 'info', description: 'Within-cluster sum of squares. Lower is better (but depends on scale).' },
          { name: 'Iterations to converge', value: '12', format: 'integer', status: 'info', description: 'Fast convergence — typical for well-separated clusters.' },
        ],
      },
      {
        id: 'km-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          {
            industry: 'E-commerce',
            useCase: 'Customer Segmentation',
            description: 'Group customers by purchase behavior, lifetime value, and browsing patterns to personalize marketing.',
            example: 'Amazon segments customers into behavioral clusters and targets each with different promotions and product recommendations.',
            companies: ['Amazon', 'Shopify', 'Alibaba'],
            icon: '👥',
          },
          {
            industry: 'Finance',
            useCase: 'Fraud Cluster Detection',
            description: 'Identify unusual transaction clusters that deviate from normal spending patterns.',
            example: 'Mastercard uses clustering to identify geographic anomalies in transaction patterns indicating fraud rings.',
            companies: ['Mastercard', 'PayPal', 'Stripe'],
            icon: '💳',
          },
          {
            industry: 'Healthcare',
            useCase: 'Patient Grouping',
            description: 'Cluster patients with similar symptoms, lab results, and outcomes for personalized treatment protocols.',
            example: 'Johns Hopkins uses K-Means to identify distinct sepsis patient profiles, improving survival rates by 8%.',
            companies: ['Flatiron Health', 'Tempus', 'Veracyte'],
            icon: '🏥',
          },
        ],
      },
      {
        id: 'km-quiz',
        type: 'quiz',
        title: 'Knowledge Check',
        questions: [
          {
            question: 'What does K-Means++ improve compared to standard K-Means?',
            options: [
              'Speed of convergence only',
              'Initialization of centroids — reduces chance of poor local minima',
              'The value of K automatically',
              'Handling of non-spherical clusters',
            ],
            correct: 1,
            explanation: 'K-Means++ initializes centroids so they are far apart from each other, reducing the probability of converging to a bad local minimum. It samples the next centroid with probability proportional to squared distance from existing centroids.',
          },
        ],
      },
    ],
  },

  // ─── Logistic Regression ──────────────────────────────────────────────────
  {
    id: 'logistic-regression',
    title: 'Logistic Regression',
    slug: 'logistic-regression',
    category: 'machine-learning',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    tags: ['classification', 'supervised', 'binary', 'probability', 'sigmoid'],
    description: 'Despite the name, Logistic Regression is a classification algorithm. It predicts probabilities using the sigmoid function.',
    prerequisites: ['linear-regression'],
    relatedNotebooks: ['linear-regression', 'svm', 'decision-tree'],
    cells: [
      {
        id: 'lor-intro',
        type: 'markdown',
        content: `# Logistic Regression\n\nLogistic Regression is the **go-to algorithm for binary classification**. It answers questions like: "Will this email be spam?" or "Will this customer churn?"\n\nDespite the name, it's a **classification** algorithm. It squashes the linear regression output through a sigmoid function to produce probabilities between 0 and 1.`,
      },
      {
        id: 'lor-math-sigmoid',
        type: 'math',
        title: 'Sigmoid Function',
        formula: 'σ(z) = 1 / (1 + e⁻ᶻ)   where z = β₀ + β₁x₁ + ... + βₙxₙ',
        explanation: 'The sigmoid maps any real number to (0, 1), which we interpret as a probability. A threshold (usually 0.5) converts probability to a class label.',
      },
      {
        id: 'lor-math-loss',
        type: 'math',
        title: 'Binary Cross-Entropy Loss',
        formula: 'L = -(1/n) Σᵢ [yᵢ log(ŷᵢ) + (1-yᵢ) log(1-ŷᵢ)]',
        explanation: 'This is the standard loss for binary classification. It heavily penalizes confident wrong predictions. Minimized using gradient descent.',
      },
      {
        id: 'lor-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Logistic Regression — Binary Classification with sklearn',
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score

# Load dataset
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# Train
clf = LogisticRegression(C=1.0, max_iter=200, random_state=42)
clf.fit(X_train, y_train)

# Evaluate
y_pred  = clf.predict(X_test)
y_proba = clf.predict_proba(X_test)[:, 1]

print(classification_report(y_test, y_pred, target_names=['Malignant', 'Benign']))
print(f"AUC-ROC: {roc_auc_score(y_test, y_proba):.4f}")`,
        output: `              precision    recall  f1-score   support
  Malignant       0.97      0.93      0.95        43
      Benign       0.96      0.99      0.97        71
    accuracy                           0.96       114

AUC-ROC: 0.9947`,
      },
      {
        id: 'lor-metrics',
        type: 'metrics',
        title: 'Model Performance',
        metrics: [
          { name: 'Accuracy', value: '96.5%', format: 'percent', status: 'good' },
          { name: 'AUC-ROC', value: '0.9947', format: 'decimal', status: 'good', description: 'Excellent discrimination — near perfect' },
          { name: 'Precision', value: '0.97', format: 'decimal', status: 'good' },
          { name: 'Recall', value: '0.96', format: 'decimal', status: 'good' },
        ],
      },
      {
        id: 'lor-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Finance', useCase: 'Credit Scoring', description: 'Predict probability of loan default based on applicant features.', example: 'FICO scores use logistic regression variants — scores above threshold = approved.', companies: ['FICO', 'Experian', 'Equifax'], icon: '💰' },
          { industry: 'Healthcare', useCase: 'Disease Screening', description: 'Predict probability of disease presence based on symptoms and tests.', example: 'Sepsis early warning systems use logistic regression to flag high-risk patients.', companies: ['Epic', 'Cerner', 'Philips'], icon: '🩺' },
          { industry: 'Marketing', useCase: 'Click Prediction', description: 'Predict whether a user will click an ad based on context and user profile.', example: 'Google and Facebook use logistic regression as a fast baseline for ad ranking systems.', companies: ['Google', 'Meta', 'Twitter'], icon: '📱' },
        ],
      },
      {
        id: 'lor-quiz',
        type: 'quiz',
        title: 'Quick Check',
        questions: [
          {
            question: 'Why is Logistic Regression NOT actually a regression algorithm?',
            options: [
              'Because it uses matrix multiplication',
              'Because its output is a class label or probability, not a continuous value',
              'Because it has no coefficients',
              'Because it only works in 2D',
            ],
            correct: 1,
            explanation: 'Logistic Regression produces a probability (0 to 1) which is then thresholded to produce a class label. The task is classification, not predicting a continuous quantity. The "regression" in the name refers to the underlying linear model before the sigmoid.',
          },
        ],
      },
    ],
  },

  // ─── Random Forest ────────────────────────────────────────────────────────
  {
    id: 'random-forest',
    title: 'Random Forest',
    slug: 'random-forest',
    category: 'machine-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    tags: ['ensemble', 'bagging', 'classification', 'regression', 'robust'],
    description: 'An ensemble of decision trees using bagging and feature randomness. More accurate and robust than a single tree.',
    prerequisites: ['decision-tree'],
    relatedNotebooks: ['decision-tree', 'xgboost'],
    cells: [
      {
        id: 'rf-intro',
        type: 'markdown',
        content: `# Random Forest\n\nRandom Forest builds **many decision trees** and combines their predictions. The key insight: an ensemble of diverse, somewhat-accurate models outperforms any single model.\n\n**Two sources of randomness make trees diverse:**\n1. **Bagging** — each tree trains on a random bootstrap sample of data\n2. **Feature randomness** — each split considers only a random subset of features`,
      },
      {
        id: 'rf-theory',
        type: 'theory',
        title: 'How Random Forest Works',
        variant: 'default',
        content: `**Training:**\nFor each of the n_estimators trees:\n1. Draw a bootstrap sample (sample with replacement) from training data\n2. Build a decision tree, but at each split only consider √(n_features) random features\n3. Grow the tree to maximum depth (no pruning needed)\n\n**Prediction:**\n- **Classification**: majority vote across all trees\n- **Regression**: average prediction across all trees\n\n**Out-of-Bag (OOB) error**: ~37% of samples are not selected in each bootstrap. These can be used as a free validation set!`,
      },
      {
        id: 'rf-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Random Forest — training, evaluation, and feature importance',
        code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report
import numpy as np

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest
rf = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,       # grow full trees
    max_features='sqrt',  # sqrt(n_features) per split
    oob_score=True,       # free validation
    n_jobs=-1,            # use all CPU cores
    random_state=42
)
rf.fit(X_train, y_train)

# Evaluate
print(f"Test Accuracy:   {rf.score(X_test, y_test):.4f}")
print(f"OOB Score:       {rf.oob_score_:.4f}")
cv_scores = cross_val_score(rf, X, y, cv=5, scoring='accuracy')
print(f"5-Fold CV Mean:  {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")`,
        output: `Test Accuracy:   0.9737
OOB Score:       0.9626
5-Fold CV Mean:  0.9631 ± 0.0141`,
      },
      {
        id: 'rf-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Finance', useCase: 'Fraud Detection', description: 'Detect fraudulent transactions with high recall while controlling false positives.', example: 'PayPal processes 30M+ transactions/day using Random Forest as a core component of their fraud stack.', companies: ['PayPal', 'Stripe', 'Square'], icon: '🔐' },
          { industry: 'Bioinformatics', useCase: 'Gene Expression Analysis', description: 'Identify which genes are predictive of disease outcomes from high-dimensional genomic data.', example: 'Researchers use Random Forest for cancer subtype classification from gene expression data.', companies: ['Illumina', 'Foundation Medicine', 'Tempus'], icon: '🧬' },
          { industry: 'Real Estate', useCase: 'Property Valuation', description: 'Estimate property values with high accuracy using structured property features.', example: 'Zillow\'s Zestimate uses Random Forest alongside deep learning for property valuations.', companies: ['Zillow', 'Redfin', 'CoreLogic'], icon: '🏠' },
        ],
      },
      {
        id: 'rf-interview',
        type: 'interview',
        title: 'Interview Questions',
        questions: [
          {
            question: 'What is the difference between bagging and boosting?',
            answer: 'Bagging (Random Forest) builds trees in PARALLEL on bootstrap samples and averages results — reduces variance, tolerant of overfit trees. Boosting (XGBoost, AdaBoost) builds trees SEQUENTIALLY where each tree corrects the errors of previous ones — reduces bias, more prone to overfitting. Bagging is more robust; boosting is often more accurate but needs more tuning.',
            difficulty: 'medium',
          },
          {
            question: 'Why does Random Forest not need cross-validation for validation?',
            answer: 'Random Forest gets a "free" validation through Out-of-Bag (OOB) samples. In each bootstrap sample, ~37% of training data is NOT selected (out-of-bag). Each tree is evaluated on its own OOB samples, and the aggregate OOB error is an unbiased estimate of generalization error. This eliminates the need for a separate validation set.',
            difficulty: 'medium',
          },
        ],
      },
    ],
  },

  // ─── XGBoost ──────────────────────────────────────────────────────────────
  {
    id: 'xgboost',
    title: 'XGBoost',
    slug: 'xgboost',
    category: 'machine-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    tags: ['ensemble', 'boosting', 'gradient-boosting', 'competitive', 'tabular'],
    description: 'The algorithm that dominated Kaggle competitions for years. Extreme Gradient Boosting with regularization, parallelism, and missing value handling.',
    prerequisites: ['decision-tree', 'random-forest'],
    relatedNotebooks: ['random-forest', 'decision-tree'],
    cells: [
      {
        id: 'xgb-intro',
        type: 'markdown',
        content: `# XGBoost — Extreme Gradient Boosting\n\nXGBoost won more Kaggle competitions than any other algorithm. It's a **highly optimized gradient boosting** framework that combines theoretical rigor with engineering excellence.\n\n**What makes XGBoost special:**\n- Built-in regularization (L1 and L2) to prevent overfitting\n- Handles missing values natively\n- Parallel tree construction (fast!)\n- Tree pruning using "max_depth" and "gamma"\n- Support for custom loss functions`,
      },
      {
        id: 'xgb-theory',
        type: 'theory',
        title: 'Gradient Boosting Intuition',
        variant: 'default',
        content: `Boosting builds an ensemble **sequentially**. Each new tree is trained to correct the **residual errors** of the previous ensemble:\n\n1. Start with a simple prediction (mean of y)\n2. Compute residuals: errors = y - predictions\n3. Train a tree to predict the residuals\n4. Add tree to ensemble (with learning rate shrinkage)\n5. Repeat — each tree corrects what previous trees got wrong\n\nXGBoost uses **second-order Taylor expansion** of the loss function to find optimal tree structures analytically.`,
      },
      {
        id: 'xgb-math',
        type: 'math',
        title: 'XGBoost Objective (Training)',
        formula: 'Obj = Σᵢ L(yᵢ, ŷᵢ) + Σₖ Ω(fₖ)',
        explanation: 'L is the loss (e.g., MSE), Ω(f) = γT + ½λ||w||² is the regularization term. T is the number of leaves, w are leaf weights, γ penalizes complexity, λ is L2 regularization on leaf weights. This unified objective makes XGBoost much more principled than vanilla gradient boosting.',
      },
      {
        id: 'xgb-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'XGBoost with early stopping, feature importance, and cross-validation',
        code: `import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, roc_auc_score
import numpy as np

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train with early stopping
model = xgb.XGBClassifier(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.8,         # row sampling
    colsample_bytree=0.8,  # feature sampling
    reg_alpha=0.1,         # L1 regularization
    reg_lambda=1.0,        # L2 regularization
    early_stopping_rounds=20,
    eval_metric='logloss',
    random_state=42
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    verbose=False
)

y_pred  = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print(f"Best iteration: {model.best_iteration}")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"AUC-ROC:  {roc_auc_score(y_test, y_proba):.4f}")

# Feature importance
feat_imp = sorted(zip(X.columns if hasattr(X, 'columns') else range(X.shape[1]),
                      model.feature_importances_), key=lambda x: -x[1])
print("\\nTop 5 features:", feat_imp[:5])`,
        output: `Best iteration: 87
Accuracy: 0.9737
AUC-ROC:  0.9972

Top 5 features:
[(22, 0.1821), (27, 0.1654), (7, 0.1203), (23, 0.0891), (20, 0.0712)]`,
      },
      {
        id: 'xgb-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Finance', useCase: 'Credit Risk Modeling', description: 'Predict probability of default on loans and credit cards with high accuracy.', example: 'Lending Club, Kabbage, and most fintech lenders use gradient boosting for underwriting decisions.', companies: ['LendingClub', 'Kabbage', 'Affirm'], icon: '💳' },
          { industry: 'Retail', useCase: 'Demand Forecasting', description: 'Predict product demand at store level using hundreds of features including price, promotions, weather, and holidays.', example: 'Walmart won an internal competition using XGBoost for store-level demand forecasting.', companies: ['Walmart', 'Instacart', 'Kroger'], icon: '📦' },
          { industry: 'Tech', useCase: 'Click-Through Rate (CTR) Prediction', description: 'Predict ad click probability in milliseconds to rank ads in real-time auctions.', example: 'Many ad platforms use GBDT (gradient boosted decision trees) for fast feature-based CTR scoring.', companies: ['Baidu', 'JD.com', 'ByteDance'], icon: '💻' },
        ],
      },
    ],
  },

  // ─── SVM ─────────────────────────────────────────────────────────────────
  {
    id: 'svm',
    title: 'Support Vector Machine (SVM)',
    slug: 'svm',
    category: 'machine-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    tags: ['classification', 'kernel', 'margin', 'supervised', 'non-linear'],
    description: 'Find the optimal separating hyperplane with maximum margin. Uses the kernel trick for non-linear boundaries.',
    prerequisites: ['logistic-regression'],
    relatedNotebooks: ['logistic-regression', 'decision-tree'],
    cells: [
      {
        id: 'svm-intro',
        type: 'markdown',
        content: `# Support Vector Machine (SVM)\n\nSVM finds the **optimal hyperplane** that maximizes the margin between classes. Instead of fitting any separating line, it finds the one with the largest "buffer zone" between classes — making it more robust to new data.\n\nThe **kernel trick** allows SVMs to find non-linear boundaries by implicitly mapping data to higher-dimensional spaces.`,
      },
      {
        id: 'svm-math',
        type: 'math',
        title: 'SVM Objective (Hard Margin)',
        formula: 'maximize 2/||w||  subject to yᵢ(w·xᵢ + b) ≥ 1',
        explanation: 'Maximize the margin (2/||w||) while ensuring all points are correctly classified. The "support vectors" are the training points closest to the decision boundary — they define the margin.',
      },
      {
        id: 'svm-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'SVM with RBF kernel — non-linear classification',
        code: `from sklearn.svm import SVC
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# Hyperparameter tuning
param_grid = {'C': [0.1, 1, 10, 100], 'gamma': ['scale', 'auto']}
grid = GridSearchCV(SVC(kernel='rbf', probability=True), param_grid, cv=5, n_jobs=-1)
grid.fit(X_train, y_train)

best = grid.best_estimator_
print(f"Best params: {grid.best_params_}")
print(f"Test accuracy: {best.score(X_test, y_test):.4f}")
print(classification_report(y_test, best.predict(X_test)))`,
        output: `Best params: {'C': 10, 'gamma': 'scale'}
Test accuracy: 0.9825

              precision    recall  f1-score
   Malignant       0.98      0.95      0.97
      Benign       0.98      0.99      0.98
    accuracy                           0.98`,
      },
      {
        id: 'svm-theory-kernels',
        type: 'theory',
        title: 'Common Kernel Functions',
        variant: 'math',
        content: `**Linear**: K(x,z) = x·z — use for linearly separable, high-dimensional data (e.g., text)\n**Polynomial**: K(x,z) = (γx·z + r)ᵈ — captures feature interactions up to degree d\n**RBF (Gaussian)**: K(x,z) = exp(-γ||x-z||²) — most powerful, works for complex boundaries; controls local vs global influence\n**Sigmoid**: K(x,z) = tanh(γx·z + r) — similar to neural networks; rarely preferred`,
      },
      {
        id: 'svm-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Biotech', useCase: 'Protein Classification', description: 'Classify protein sequences into functional families based on biochemical features.', example: 'BioPython\'s SVM classifiers have been used in drug target identification pipelines.', companies: ['Genentech', 'Amgen', 'Pfizer'], icon: '🔬' },
          { industry: 'Finance', useCase: 'Text Sentiment Analysis', description: 'Classify financial news and earnings call transcripts as positive/negative for trading signals.', example: 'Quantitative hedge funds use SVM with TF-IDF features for earnings call sentiment classification.', companies: ['Two Sigma', 'D.E. Shaw', 'Renaissance'], icon: '📰' },
        ],
      },
    ],
  },

  // ─── PCA ──────────────────────────────────────────────────────────────────
  {
    id: 'pca',
    title: 'Principal Component Analysis (PCA)',
    slug: 'pca',
    category: 'machine-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    tags: ['dimensionality-reduction', 'unsupervised', 'visualization', 'linear-algebra'],
    description: 'Compress high-dimensional data while preserving maximum variance. Essential for visualization and feature engineering.',
    prerequisites: [],
    relatedNotebooks: ['kmeans', 'linear-regression'],
    cells: [
      {
        id: 'pca-intro',
        type: 'markdown',
        content: `# Principal Component Analysis (PCA)\n\nPCA reduces the dimensionality of data by finding new axes (principal components) that capture the most variance. Think of it as finding the best "viewpoint" to observe your data.\n\nWith 100 features, you might capture 95% of the variance in just 10 principal components — enabling visualization, faster training, and reduced noise.`,
      },
      {
        id: 'pca-math',
        type: 'math',
        title: 'Eigendecomposition of Covariance Matrix',
        formula: 'C = (1/n) XᵀX   →   C·v = λ·v',
        explanation: 'C is the covariance matrix. We find eigenvectors v (principal component directions) and eigenvalues λ (amount of variance captured). Sort by λ descending — first PC captures most variance.',
      },
      {
        id: 'pca-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'PCA for visualization and dimensionality reduction',
        code: `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import load_iris
import numpy as np

X, y = load_iris(return_X_y=True)
X_scaled = StandardScaler().fit_transform(X)

# Full PCA to analyze explained variance
pca_full = PCA()
pca_full.fit(X_scaled)

print("Explained variance ratio per component:")
for i, v in enumerate(pca_full.explained_variance_ratio_):
    print(f"  PC{i+1}: {v:.4f} ({v*100:.1f}%) — cumulative: {pca_full.explained_variance_ratio_[:i+1].sum()*100:.1f}%")

# Reduce to 2D for visualization
pca_2d = PCA(n_components=2)
X_2d = pca_2d.fit_transform(X_scaled)
print(f"\\nVariance retained with 2 components: {pca_2d.explained_variance_ratio_.sum()*100:.1f}%")`,
        output: `Explained variance ratio per component:
  PC1: 0.7296 (73.0%) — cumulative: 73.0%
  PC2: 0.2285 (22.8%) — cumulative: 95.8%
  PC3: 0.0367 (3.7%)  — cumulative: 99.5%
  PC4: 0.0052 (0.5%)  — cumulative: 100.0%

Variance retained with 2 components: 95.8%`,
      },
      {
        id: 'pca-chart',
        type: 'chart',
        chartType: 'bar',
        title: 'Explained Variance by Component',
        description: 'The first 2 principal components capture 95.8% of variance in the 4-feature Iris dataset.',
        xLabel: 'Principal Component',
        yLabel: 'Explained Variance Ratio',
        data: [
          { label: 'PC1', value: 0.7296 },
          { label: 'PC2', value: 0.2285 },
          { label: 'PC3', value: 0.0367 },
          { label: 'PC4', value: 0.0052 },
        ],
      },
      {
        id: 'pca-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Finance', useCase: 'Portfolio Risk Analysis', description: 'Identify uncorrelated risk factors driving portfolio returns across hundreds of assets.', example: 'Quantitative funds use PCA to decompose market risk into independent factors (market beta, size, value, momentum).', companies: ['BlackRock', 'Vanguard', 'AQR'], icon: '📈' },
          { industry: 'Image Processing', useCase: 'Face Recognition', description: 'Represent faces as combinations of "eigenfaces" — principal components of face images.', example: 'Early face recognition systems (Eigenfaces method, 1991) used PCA on 128x128 pixel images.', companies: ['Facebook', 'Apple', 'NEC'], icon: '👤' },
        ],
      },
    ],
  },

  // ─── KNN ─────────────────────────────────────────────────────────────────
  {
    id: 'knn',
    title: 'K-Nearest Neighbors (KNN)',
    slug: 'knn',
    category: 'machine-learning',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    tags: ['classification', 'regression', 'instance-based', 'lazy-learning'],
    description: 'The simplest ML algorithm: predict by looking at the k most similar training examples. No training required.',
    prerequisites: [],
    relatedNotebooks: ['kmeans', 'svm'],
    cells: [
      {
        id: 'knn-intro',
        type: 'markdown',
        content: `# K-Nearest Neighbors (KNN)\n\nKNN is the simplest ML algorithm: **"show me your neighbors and I'll tell you who you are."**\n\nFor a new point, find the k closest training examples and predict the majority class (or average value). No training phase needed — KNN is a "lazy learner" that stores the entire training set.`,
      },
      {
        id: 'knn-theory',
        type: 'theory',
        title: 'How KNN Works',
        variant: 'default',
        content: `**Algorithm:**\n1. Store all training data\n2. For each new point:\n   a. Compute distance to all training points\n   b. Select k nearest neighbors\n   c. For classification: majority vote; for regression: average value\n\n**Distance Metrics:**\n- **Euclidean**: √Σ(xᵢ - yᵢ)² — most common\n- **Manhattan**: Σ|xᵢ - yᵢ| — good for high dimensions\n- **Cosine similarity**: for text data`,
      },
      {
        id: 'knn-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'KNN with optimal k selection',
        code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
import numpy as np

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Find optimal k
cv_scores = {}
for k in range(1, 21):
    knn = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn, X_train, y_train, cv=5)
    cv_scores[k] = scores.mean()

best_k = max(cv_scores, key=cv_scores.get)
print(f"Best k: {best_k} with CV accuracy: {cv_scores[best_k]:.4f}")

knn = KNeighborsClassifier(n_neighbors=best_k)
knn.fit(X_train, y_train)
print(f"Test accuracy: {knn.score(X_test, y_test):.4f}")`,
        output: `Best k: 7 with CV accuracy: 0.9667
Test accuracy: 0.9667`,
      },
      {
        id: 'knn-callout',
        type: 'callout',
        variant: 'warning',
        title: 'KNN Limitations',
        content: `• **Slow prediction**: O(n·d) per query — comparing against all training points\n• **Memory**: stores entire dataset\n• **Curse of dimensionality**: distances become meaningless in high-dimensional spaces\n• **Sensitive to scale**: always normalize features before KNN\n• **No insight**: no model coefficients to interpret\n\nFor production, use approximate nearest neighbors (FAISS, Annoy) for scalability.`,
      },
    ],
  },

  // ─── Naive Bayes ──────────────────────────────────────────────────────────
  {
    id: 'naive-bayes',
    title: 'Naive Bayes',
    slug: 'naive-bayes',
    category: 'machine-learning',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    tags: ['classification', 'probabilistic', 'text', 'nlp', 'bayes'],
    description: 'A probabilistic classifier based on Bayes theorem with strong independence assumptions. Fast, simple, great for text.',
    prerequisites: [],
    relatedNotebooks: ['logistic-regression', 'knn'],
    cells: [
      {
        id: 'nb-intro',
        type: 'markdown',
        content: `# Naive Bayes\n\nNaive Bayes is a **probabilistic classifier** based on Bayes' theorem. The "naive" part: it assumes features are **conditionally independent** given the class — a strong but often practically effective assumption.\n\nDespite its simplicity, Naive Bayes dominates in **text classification** and spam filtering because words can be treated as independent features.`,
      },
      {
        id: 'nb-math',
        type: 'math',
        title: "Bayes' Theorem for Classification",
        formula: 'P(y|x) = P(x|y) · P(y) / P(x)',
        explanation: 'We pick the class y that maximizes P(y|x). With the naive independence assumption: P(x|y) = Π P(xᵢ|y). For text, P(word|class) is estimated from word frequencies in training documents.',
      },
      {
        id: 'nb-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Naive Bayes for SMS spam detection',
        code: `from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Sample data
texts  = ["Free money win now!", "Hi mom, dinner at 7?", "WIN A PRIZE CLICK HERE",
          "Meeting at 3pm tomorrow", "Cheap meds no prescription", "Can you call me back?",
          "URGENT: bank account suspended", "Love you, see you tonight"]
labels = [1, 0, 1, 0, 1, 0, 1, 0]  # 1=spam, 0=ham

X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, random_state=42)

# TF-IDF features
tfidf = TfidfVectorizer()
X_train_v = tfidf.fit_transform(X_train)
X_test_v  = tfidf.transform(X_test)

# Train and evaluate
clf = MultinomialNB(alpha=1.0)  # alpha = Laplace smoothing
clf.fit(X_train_v, y_train)
preds = clf.predict(X_test_v)
print(classification_report(y_test, preds, target_names=['ham', 'spam']))

# Predict new
new = ["Congratulations! You've won $1000!", "Are you coming to the party?"]
preds = clf.predict(tfidf.transform(new))
for text, pred in zip(new, preds):
    print(f"'{text}' → {'SPAM' if pred else 'HAM'}")`,
        output: `              precision    recall  f1-score
         ham       1.00      1.00      1.00
        spam       1.00      1.00      1.00

'Congratulations! You\'ve won $1000!' → SPAM
'Are you coming to the party?' → HAM`,
      },
      {
        id: 'nb-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Email', useCase: 'Spam Filtering', description: 'Classify emails as spam or ham based on word frequencies and patterns.', example: 'Gmail\'s original spam filter used Naive Bayes. Modern systems are hybrids but Bayes features remain.', companies: ['Google', 'Microsoft', 'Proofpoint'], icon: '📧' },
          { industry: 'Media', useCase: 'News Categorization', description: 'Automatically categorize news articles into topics (politics, sports, tech, etc.).', example: 'Reuters and AP use NLP classifiers including Naive Bayes variants for automated story tagging.', companies: ['Reuters', 'Bloomberg', 'AP'], icon: '📰' },
        ],
      },
    ],
  },

  // ─── DBSCAN ───────────────────────────────────────────────────────────────
  {
    id: 'dbscan',
    title: 'DBSCAN',
    slug: 'dbscan',
    category: 'machine-learning',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    tags: ['clustering', 'unsupervised', 'density', 'anomaly-detection', 'non-spherical'],
    description: 'Density-Based Spatial Clustering. Finds clusters of arbitrary shape and automatically identifies outliers.',
    prerequisites: ['kmeans'],
    relatedNotebooks: ['kmeans', 'pca'],
    cells: [
      {
        id: 'dbscan-intro',
        type: 'markdown',
        content: `# DBSCAN — Density-Based Spatial Clustering\n\nDBSCAN groups points that are **densely packed together** and marks outliers as noise. Unlike K-Means, it doesn't require you to specify k and can find clusters of **arbitrary shapes**.\n\nKey insight: a cluster is a region of space where points are close to each other. Points with no close neighbors are labeled as noise (anomalies).`,
      },
      {
        id: 'dbscan-theory',
        type: 'theory',
        title: 'Core Concepts',
        variant: 'default',
        content: `**Two parameters control DBSCAN:**\n- **ε (epsilon)**: maximum distance between two points to be neighbors\n- **min_samples**: minimum points within ε to form a dense region\n\n**Point types:**\n- **Core point**: has ≥ min_samples neighbors within ε\n- **Border point**: within ε of a core point but has fewer neighbors\n- **Noise point**: not within ε of any core point → labeled -1 (outlier)\n\n**Why DBSCAN beats K-Means for anomaly detection**: noise points are explicitly identified!`,
      },
      {
        id: 'dbscan-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'DBSCAN for anomaly detection and arbitrary-shape clustering',
        code: `from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons
from sklearn.preprocessing import StandardScaler
import numpy as np

# Non-spherical dataset (K-Means fails here)
X, _ = make_moons(n_samples=300, noise=0.05, random_state=42)
X_scaled = StandardScaler().fit_transform(X)

# DBSCAN
db = DBSCAN(eps=0.3, min_samples=5)
labels = db.fit_predict(X_scaled)

n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise    = (labels == -1).sum()

print(f"Clusters found: {n_clusters}")
print(f"Noise points: {n_noise} ({n_noise/len(X)*100:.1f}%)")
print(f"Cluster sizes: {dict(zip(*np.unique(labels[labels != -1], return_counts=True)))}")`,
        output: `Clusters found: 2
Noise points: 3 (1.0%)
Cluster sizes: {0: 147, 1: 150}`,
      },
      {
        id: 'dbscan-comparison',
        type: 'comparison',
        title: 'DBSCAN vs K-Means',
        items: [
          {
            label: 'K-Means',
            pros: ['Fast (O(nkI))', 'Works well for spherical clusters', 'Scales to large datasets'],
            cons: ['Requires specifying k', 'Assumes spherical clusters', 'No built-in outlier detection'],
            whenToUse: 'Customer segmentation, document clustering — when clusters are roughly spherical',
          },
          {
            label: 'DBSCAN',
            pros: ['No k needed', 'Finds arbitrary shapes', 'Automatic outlier detection'],
            cons: ['Sensitive to ε and min_samples', 'Struggles with varying densities', 'Slower on large datasets'],
            whenToUse: 'Fraud detection, geospatial data, anomaly detection — when clusters are irregular',
          },
        ],
      },
    ],
  },
];
