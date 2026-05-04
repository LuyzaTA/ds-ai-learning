import type { Section } from '@/types/curriculum';

export const machineLearningSection: Section = {
  id: 'machine-learning',
  title: 'Machine Learning',
  description: 'Supervised and unsupervised algorithms, model evaluation, and feature engineering.',
  longDescription:
    'From linear regression to gradient boosting, this section covers the core ML algorithms used in industry every day. You will learn not just how to use these algorithms, but WHY they work — and when to choose one over another.',
  icon: '🤖',
  color: 'emerald',
  tags: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-learn', 'XGBoost', 'Feature Engineering'],
  modules: [
    // ═══════════════════════════════════════════════════════════════
    // MODULE 1: Supervised Learning
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'supervised-learning',
      title: 'Supervised Learning',
      description: 'Algorithms that learn from labelled examples to make predictions.',
      lessons: [
        {
          id: 'linear-regression',
          title: 'Linear Regression',
          description: 'Predicting continuous values by fitting the best line (or hyperplane) through data.',
          duration: '50 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## The Regression Problem\n\nLinear regression answers a fundamental question: **given input features X, can we predict a continuous output y?** Examples:\n- Predict house price from square footage, location, age\n- Predict a patient\'s blood pressure from lifestyle variables\n- Predict next month\'s sales from historical trends\n\nThe key assumption: the relationship between X and y is approximately **linear**.',
            },
            {
              type: 'math',
              latex:
                '\\hat{y} = \\mathbf{w}^T \\mathbf{x} + b = w_1 x_1 + w_2 x_2 + \\cdots + w_n x_n + b',
              displayMode: true,
              caption: 'The linear model: w are weights (slopes), b is the bias (intercept).',
            },
            {
              type: 'text',
              content:
                '## The Loss Function: Mean Squared Error\n\nWe train the model by finding weights **w** and bias *b* that minimise the **Mean Squared Error (MSE)** — the average squared difference between predictions and true values. Squaring makes the loss always positive and penalises large errors more heavily.',
            },
            {
              type: 'math',
              latex:
                'J(\\mathbf{w}, b) = \\frac{1}{2m} \\sum_{i=1}^{m} \\left(\\hat{y}^{(i)} - y^{(i)}\\right)^2',
              displayMode: true,
              caption: 'MSE loss (the ½ is a convenience that cancels with the 2 from differentiation).',
            },
            {
              type: 'text',
              content:
                '## The Normal Equation (Analytical Solution)\n\nFor linear regression, we can derive the exact optimal weights analytically — no iterative gradient descent needed. This works well for small datasets but becomes impractical when n (features) or m (samples) is very large due to the matrix inversion.',
            },
            {
              type: 'math',
              latex:
                '\\mathbf{w}^* = (X^T X)^{-1} X^T \\mathbf{y}',
              displayMode: true,
              caption: 'The Normal Equation gives the exact optimal weights in one computation.',
            },
            {
              type: 'text',
              content:
                '## Regularization: Ridge and Lasso\n\nWhen a model has too many features or the features are correlated, it can **overfit** — memorising training data instead of learning general patterns. Regularisation adds a penalty term to the loss to shrink weights:\n\n- **Ridge (L2)**: penalises sum of squared weights → shrinks all weights slightly\n- **Lasso (L1)**: penalises sum of absolute weights → drives some weights to exactly zero (feature selection)',
            },
            {
              type: 'math',
              latex:
                'J_{\\text{Ridge}} = \\text{MSE} + \\lambda \\|\\mathbf{w}\\|_2^2 \\qquad J_{\\text{Lasso}} = \\text{MSE} + \\lambda \\|\\mathbf{w}\\|_1',
              displayMode: true,
              caption: 'λ controls regularisation strength. Higher λ = simpler model.',
            },
            {
              type: 'eli5',
              content:
                "**Linear regression is like drawing the best straight line through a scatter plot.** Imagine plotting study hours (x-axis) vs exam score (y-axis). The 'best line' is the one that's as close as possible to all data points at once. MSE measures the average squared distance from each point to the line. Gradient descent adjusts the line's slope and intercept little by little until it can't improve anymore.",
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Linear regression with scikit-learn',
              code: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score

# Generate synthetic housing data
np.random.seed(42)
n = 500
X = pd.DataFrame({
    'size_m2':  np.random.normal(100, 30, n).clip(30),
    'rooms':    np.random.randint(1, 7, n).astype(float),
    'age_yrs':  np.random.uniform(0, 50, n),
    'distance': np.random.exponential(5, n),
})
# True relationship + noise
y = (3000 * X['size_m2'] + 15000 * X['rooms']
     - 1000 * X['age_yrs'] - 5000 * X['distance']
     + np.random.normal(0, 20000, n))

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling (important for regularized models)
scaler = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)
X_test_sc  = scaler.transform(X_test)

# Plain linear regression
lr = LinearRegression()
lr.fit(X_train_sc, y_train)
y_pred = lr.predict(X_test_sc)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2   = r2_score(y_test, y_pred)
print(f"Linear Regression  — RMSE: {rmse:,.0f} | R²: {r2:.3f}")

# Ridge regression
ridge = Ridge(alpha=100)
ridge.fit(X_train_sc, y_train)
y_pred_r = ridge.predict(X_test_sc)
print(f"Ridge (α=100)      — RMSE: {np.sqrt(mean_squared_error(y_test, y_pred_r)):,.0f}")

# Lasso regression
lasso = Lasso(alpha=100)
lasso.fit(X_train_sc, y_train)
print(f"Lasso (α=100)      — RMSE: {np.sqrt(mean_squared_error(y_test, lasso.predict(X_test_sc))):,.0f}")
print(f"Non-zero coefficients: {(lasso.coef_ != 0).sum()}/{X.shape[1]}")`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Linear regression predicts continuous outputs as a weighted sum of input features.',
                'MSE is the standard loss function; minimising it yields the best-fit line/hyperplane.',
                'The Normal Equation gives an analytical solution; gradient descent scales to larger datasets.',
                'Ridge (L2) shrinks all weights; Lasso (L1) zeros out irrelevant features — useful for feature selection.',
                'Always scale features before applying regularisation (Ridge/Lasso).',
              ],
            },
            {
              type: 'quiz',
              questions: [
                {
                  id: 'lr1',
                  question: 'What does R² = 1.0 mean?',
                  options: [
                    'The model has zero error',
                    'The model explains all variance in the target — perfect fit',
                    'The model overfits the training data',
                    'The intercept equals 1',
                  ],
                  correctIndex: 1,
                  explanation: 'R² (coefficient of determination) measures the proportion of variance in y explained by the model. R²=1 means perfect prediction on the test set.',
                },
                {
                  id: 'lr2',
                  question: 'Lasso regression is preferred over Ridge when you want to:',
                  options: [
                    'Handle multicollinearity',
                    'Perform automatic feature selection',
                    'Increase model complexity',
                    'Speed up training',
                  ],
                  correctIndex: 1,
                  explanation: 'Lasso uses an L1 penalty that drives some weights exactly to zero, effectively removing those features from the model. Ridge shrinks weights but rarely sets them to zero.',
                },
              ],
            },
          ],
        },
        {
          id: 'logistic-regression',
          title: 'Logistic Regression',
          description: 'Classification via probabilistic decision boundaries.',
          duration: '50 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## From Regression to Classification\n\nLogistic regression is the go-to algorithm for **binary classification** (spam/not-spam, disease/no-disease, click/no-click). Despite its name, it predicts **probabilities**, not continuous values.\n\nThe trick: apply the **sigmoid function** to a linear model to squish any real value into the range (0, 1), making it interpretable as a probability.',
            },
            {
              type: 'math',
              latex:
                '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\hat{p} = \\sigma(\\mathbf{w}^T\\mathbf{x} + b)',
              displayMode: true,
              caption: 'The sigmoid function maps any real number to (0, 1). ŷ > 0.5 → class 1.',
            },
            {
              type: 'text',
              content:
                '## Binary Cross-Entropy Loss\n\nFor classification, MSE is not ideal — we use **binary cross-entropy** (log loss) instead. It heavily penalises confident wrong predictions.',
            },
            {
              type: 'math',
              latex:
                'L = -\\frac{1}{m} \\sum_{i=1}^{m} \\left[ y^{(i)} \\log \\hat{p}^{(i)} + (1 - y^{(i)}) \\log (1 - \\hat{p}^{(i)}) \\right]',
              displayMode: true,
              caption: 'Binary cross-entropy loss. Minimising this maximises the likelihood of the data under the model.',
            },
            {
              type: 'text',
              content:
                '## Multi-class with Softmax\n\nFor K > 2 classes, we use the **softmax function**, which extends the sigmoid to produce a probability distribution over all K classes. This is the output of virtually every multi-class classifier and neural network classifier.',
            },
            {
              type: 'math',
              latex:
                '\\text{softmax}(z_k) = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}, \\quad \\sum_{k=1}^K \\text{softmax}(z_k) = 1',
              displayMode: true,
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Logistic regression and evaluation with scikit-learn',
              code: `from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import (classification_report, confusion_matrix,
                             roc_auc_score, roc_curve)
import numpy as np

# Generate binary classification data
X, y = make_classification(n_samples=1000, n_features=20,
                            n_informative=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train logistic regression
clf = LogisticRegression(max_iter=1000, C=1.0)  # C = 1/λ (regularization)
clf.fit(X_train, y_train)

# Predictions
y_pred      = clf.predict(X_test)          # hard labels: 0 or 1
y_pred_prob = clf.predict_proba(X_test)[:, 1]  # probability of class 1

# Evaluation
print(classification_report(y_test, y_pred))
print(f"ROC-AUC: {roc_auc_score(y_test, y_pred_prob):.4f}")
print("Confusion Matrix:\\n", confusion_matrix(y_test, y_pred))

# Decision threshold adjustment
# Default: classify as 1 if P > 0.5
# Adjust to 0.3 for higher recall (useful when false negatives are costly)
threshold = 0.3
y_pred_adjusted = (y_pred_prob >= threshold).astype(int)
print("\\nWith threshold=0.3:")
print(classification_report(y_test, y_pred_adjusted))`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Logistic regression predicts probabilities by passing a linear model through the sigmoid function.',
                'Binary cross-entropy is the appropriate loss for classification (not MSE).',
                'The decision threshold (default 0.5) can be adjusted to trade off precision vs recall.',
                'Softmax generalises logistic regression to K > 2 classes.',
                'ROC-AUC is a threshold-independent evaluation metric for classifiers.',
              ],
            },
          ],
        },
        {
          id: 'decision-trees-random-forests',
          title: 'Decision Trees & Random Forests',
          description: 'From simple trees to powerful ensembles — the dominant tabular data algorithm.',
          duration: '65 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Decision Trees\n\nA decision tree learns a sequence of **if-then rules** from data. At each internal node, it splits the data on the feature and threshold that best separates the classes. The result is a tree of decisions that can be visualised and interpreted.\n\n**Splitting criterion** — how we measure "best split":\n- **Gini impurity** (default in sklearn): measures how often a randomly chosen element would be misclassified\n- **Information gain / Entropy**: measures reduction in uncertainty',
            },
            {
              type: 'math',
              latex:
                '\\text{Gini}(t) = 1 - \\sum_{k=1}^K p_k^2 \\qquad \\text{Entropy}(t) = -\\sum_{k=1}^K p_k \\log_2 p_k',
              displayMode: true,
              caption: 'Impurity measures at a node t. Both are 0 for a pure node and maximum when classes are equally split.',
            },
            {
              type: 'text',
              content:
                '## Ensemble Methods: Random Forests\n\nA single decision tree is prone to overfitting. **Random Forests** solve this by:\n1. Training many trees on different **bootstrap samples** of the data (bagging)\n2. At each split, considering only a **random subset of features**\n3. **Averaging predictions** (regression) or **majority voting** (classification) across all trees\n\nThe combination of diversity (different data + different features) and averaging dramatically reduces variance while keeping bias low.',
            },
            {
              type: 'text',
              content:
                '## Gradient Boosting: XGBoost and LightGBM\n\nGradient boosting builds trees **sequentially** — each new tree corrects the errors of all previous trees. It is currently the most powerful algorithm for **tabular data** and dominates Kaggle competitions.\n\n- **XGBoost**: implements gradient boosting with regularisation and pruning\n- **LightGBM**: even faster, leaf-wise tree growth, handles large datasets well\n- **CatBoost**: native categorical feature handling',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Decision Tree, Random Forest, and XGBoost comparison',
              code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score
import numpy as np

# try: pip install xgboost
try:
    from xgboost import XGBClassifier
    has_xgb = True
except ImportError:
    has_xgb = False

# Dataset: breast cancer classification (benign vs malignant)
data = load_breast_cancer()
X, y = data.data, data.target

# Compare models with 5-fold cross-validation
models = {
    'Decision Tree':   DecisionTreeClassifier(max_depth=5, random_state=42),
    'Random Forest':   RandomForestClassifier(n_estimators=100, max_features='sqrt', random_state=42),
}
if has_xgb:
    models['XGBoost'] = XGBClassifier(n_estimators=100, max_depth=4,
                                       learning_rate=0.1, eval_metric='logloss',
                                       random_state=42)

for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=5, scoring='roc_auc')
    print(f"{name:20s} | AUC: {scores.mean():.4f} ± {scores.std():.4f}")

# Feature importance from Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X, y)
importances = pd.Series(rf.feature_importances_, index=data.feature_names)
top5 = importances.nlargest(5)
print("\\nTop 5 most important features:")
print(top5)`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Decision trees split data on features using impurity measures (Gini, entropy).',
                'Random Forests combine many trees trained on bootstrap samples with random feature subsets — reducing overfitting.',
                'Gradient Boosting (XGBoost, LightGBM) builds trees sequentially, correcting previous errors — state of the art for tabular data.',
                'Feature importance from Random Forests/XGBoost identifies which inputs drive predictions.',
                'Use cross-validation (not a single train/test split) to reliably compare models.',
              ],
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════
    // MODULE 2: Model Evaluation
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'model-evaluation',
      title: 'Model Evaluation & Validation',
      description: 'Metrics, cross-validation, the bias-variance tradeoff, and how to avoid leakage.',
      lessons: [
        {
          id: 'evaluation-metrics',
          title: 'Classification & Regression Metrics',
          description: 'Precision, recall, F1, ROC-AUC, RMSE, MAE — choosing the right metric for the job.',
          duration: '45 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Why Accuracy Is Often Not Enough\n\nImagine a fraud detection model. 99.9% of transactions are legitimate. A model that **always** predicts "not fraud" would achieve 99.9% accuracy — yet it is completely useless. This is the **class imbalance problem**. We need metrics that expose the real performance on each class.',
            },
            {
              type: 'text',
              content:
                '## The Confusion Matrix\n\nFor binary classification, all four outcomes are captured in a 2×2 confusion matrix:\n\n- **True Positives (TP)**: correctly predicted positive\n- **True Negatives (TN)**: correctly predicted negative\n- **False Positives (FP)**: incorrectly predicted positive (Type I error)\n- **False Negatives (FN)**: incorrectly predicted negative (Type II error)',
            },
            {
              type: 'diagram',
              title: 'Confusion Matrix',
              lines: [
                '               Predicted: Positive  Predicted: Negative',
                '  Actual: Pos  |   TP (correct)   |   FN (missed)    |',
                '  Actual: Neg  |   FP (false alarm)|   TN (correct)   |',
              ],
            },
            {
              type: 'math',
              latex:
                '\\text{Precision} = \\frac{TP}{TP+FP} \\quad \\text{Recall} = \\frac{TP}{TP+FN} \\quad F_1 = \\frac{2 \\cdot P \\cdot R}{P + R}',
              displayMode: true,
              caption: 'Precision: "of all positives I predicted, how many were correct?" Recall: "of all actual positives, how many did I catch?"',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Precision vs Recall Trade-off',
              content:
                'Raising the decision threshold increases precision (fewer false alarms) but reduces recall (more missed positives). Lowering it does the opposite. The F1 score is the harmonic mean — use it when you want a single balanced metric. Use precision when false positives are costly (spam filter); use recall when false negatives are costly (cancer screening).',
            },
            {
              type: 'text',
              content:
                '## ROC Curve and AUC\n\nThe **ROC curve** plots True Positive Rate (recall) vs False Positive Rate at every possible threshold. The **AUC (Area Under the Curve)** summarises it into one number: 0.5 = random, 1.0 = perfect.\n\nAUC is threshold-independent and robust to class imbalance — preferred for comparing classifiers overall.',
            },
            {
              type: 'text',
              content:
                '## Regression Metrics\n\n- **MAE**: Mean Absolute Error — intuitive, robust to outliers\n- **RMSE**: Root Mean Squared Error — penalises large errors more, same units as y\n- **R²**: proportion of variance explained (1 = perfect, 0 = predicts mean, can be negative)',
            },
            {
              type: 'math',
              latex:
                '\\text{MAE} = \\frac{1}{m}\\sum|y_i - \\hat{y}_i| \\quad \\text{RMSE} = \\sqrt{\\frac{1}{m}\\sum(y_i - \\hat{y}_i)^2}',
              displayMode: true,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Accuracy is misleading for imbalanced datasets — prefer Precision, Recall, F1, and AUC.',
                'Precision: quality of positive predictions. Recall: coverage of actual positives. F1: their harmonic mean.',
                'ROC-AUC is threshold-independent and the standard metric for comparing classifiers.',
                'RMSE and MAE are the most common regression metrics; RMSE is more sensitive to outliers.',
                'Always match the metric to the business cost of FP vs FN.',
              ],
            },
          ],
        },
        {
          id: 'bias-variance-cv',
          title: 'Bias-Variance Tradeoff & Cross-Validation',
          description: 'Understanding overfitting, underfitting, and how to estimate true model performance.',
          duration: '45 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## The Bias-Variance Decomposition\n\nThe expected prediction error of any model can be decomposed into three terms:\n\n- **Bias**: error from overly simplistic assumptions (underfitting)\n- **Variance**: error from sensitivity to training data fluctuations (overfitting)\n- **Irreducible noise**: inherent randomness in the data — cannot be reduced\n\nThe goal is to find the sweet spot that minimises total error.',
            },
            {
              type: 'math',
              latex:
                '\\mathbb{E}[(y - \\hat{f}(x))^2] = \\underbrace{\\text{Bias}^2}_{\\text{underfitting}} + \\underbrace{\\text{Variance}}_{\\text{overfitting}} + \\underbrace{\\sigma^2}_{\\text{irreducible}}',
              displayMode: true,
            },
            {
              type: 'compare',
              title: 'Underfitting vs Overfitting',
              left: {
                label: 'Underfitting (High Bias)',
                items: [
                  'Model is too simple',
                  'High training error',
                  'High test error',
                  'Fix: more complex model, more features',
                ],
              },
              right: {
                label: 'Overfitting (High Variance)',
                items: [
                  'Model is too complex',
                  'Low training error',
                  'High test error',
                  'Fix: regularisation, more data, simpler model',
                ],
              },
            },
            {
              type: 'text',
              content:
                '## K-Fold Cross-Validation\n\nA single train/test split gives a noisy estimate of model performance. **K-fold CV** provides a more reliable estimate by:\n1. Splitting data into K equal folds\n2. Training on K-1 folds, evaluating on the remaining fold\n3. Repeating K times (each fold serves as the test set once)\n4. Averaging the K scores\n\nTypical K values: 5 or 10. **Stratified K-fold** preserves class ratios in each fold.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Cross-validation and learning curves with scikit-learn',
              code: `from sklearn.model_selection import cross_val_score, learning_curve, KFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
import numpy as np
import matplotlib.pyplot as plt

X, y = load_breast_cancer(return_X_y=True)

# 10-fold stratified cross-validation
from sklearn.model_selection import StratifiedKFold
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
cv_scores = cross_val_score(rf, X, y, cv=skf, scoring='roc_auc')
print(f"CV AUC: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Learning curve: diagnose bias vs variance
train_sizes, train_scores, val_scores = learning_curve(
    rf, X, y, cv=5, scoring='roc_auc',
    train_sizes=np.linspace(0.1, 1.0, 10)
)
print("\\nLearning curve (train AUC → val AUC):")
for i, size in enumerate(train_sizes):
    train_mean = train_scores[i].mean()
    val_mean   = val_scores[i].mean()
    gap        = train_mean - val_mean
    print(f"  n={size:3.0f}: train={train_mean:.3f}, val={val_mean:.3f}, gap={gap:.3f}")
# Small gap → well-fitted | Large gap → overfitting`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Total prediction error = Bias² + Variance + Irreducible noise.',
                'Underfitting (high bias): model too simple; fix with more complexity or features.',
                'Overfitting (high variance): model too complex; fix with regularisation or more data.',
                'K-fold cross-validation gives a more reliable performance estimate than a single train/test split.',
                'Learning curves (train vs val error vs dataset size) reveal whether you have a bias or variance problem.',
              ],
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════
    // MODULE 3: Unsupervised Learning
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'unsupervised-learning',
      title: 'Unsupervised Learning',
      description: 'Clustering, dimensionality reduction, and finding hidden structure without labels.',
      lessons: [
        {
          id: 'clustering-pca',
          title: 'Clustering & PCA',
          description: 'K-Means, hierarchical clustering, DBSCAN, and Principal Component Analysis.',
          duration: '60 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Clustering: Finding Natural Groups\n\nClustering is the task of grouping data points so that points in the same cluster are more similar to each other than to points in other clusters — **without any labels**.\n\nApplications: customer segmentation, document grouping, anomaly detection, gene expression analysis.',
            },
            {
              type: 'text',
              content:
                '## K-Means Algorithm\n\nK-Means partitions n points into K clusters by alternating between two steps:\n1. **Assignment**: assign each point to the nearest centroid\n2. **Update**: recompute each centroid as the mean of its assigned points\n\nConverges to a local minimum of the within-cluster sum of squares (WCSS). Run multiple times with different initializations (k-means++) to find a good solution.',
            },
            {
              type: 'math',
              latex:
                'J = \\sum_{k=1}^K \\sum_{\\mathbf{x} \\in C_k} \\|\\mathbf{x} - \\boldsymbol{\\mu}_k\\|^2',
              displayMode: true,
              caption: 'K-Means objective: minimize within-cluster sum of squared distances to centroids.',
            },
            {
              type: 'text',
              content:
                '## Principal Component Analysis (PCA)\n\nPCA finds the directions of maximum variance in the data and projects it onto a lower-dimensional subspace. It is the most widely used dimensionality reduction technique:\n\n1. Center the data (subtract mean)\n2. Compute the covariance matrix\n3. Find eigenvalues and eigenvectors of the covariance matrix\n4. Project data onto the top-k eigenvectors (principal components)\n\nThe first PC explains the most variance, the second explains the next most (and is orthogonal to the first), and so on.',
            },
            {
              type: 'math',
              latex:
                'X_{\\text{reduced}} = X \\cdot W_k, \\quad W_k = [\\mathbf{v}_1, \\mathbf{v}_2, \\ldots, \\mathbf{v}_k]',
              displayMode: true,
              caption: 'Project data onto the top-k principal components (eigenvectors).',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'K-Means and PCA with scikit-learn',
              code: `from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_blobs
import numpy as np

# Generate clustered data
X, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.8, random_state=42)

# Scale data (important for distance-based methods!)
scaler = StandardScaler()
X_sc = scaler.fit_transform(X)

# K-Means clustering
kmeans = KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)
labels = kmeans.fit_predict(X_sc)
print(f"K-Means inertia (WCSS): {kmeans.inertia_:.2f}")

# Choosing K with the Elbow Method
wcss = []
for k in range(1, 11):
    km = KMeans(n_clusters=k, n_init=10, random_state=42)
    km.fit(X_sc)
    wcss.append(km.inertia_)
# Plot wcss vs k — look for the "elbow"

# DBSCAN (density-based, finds arbitrary shapes, robust to outliers)
dbscan = DBSCAN(eps=0.5, min_samples=5)
db_labels = dbscan.fit_predict(X_sc)
n_clusters = len(set(db_labels)) - (1 if -1 in db_labels else 0)
n_noise    = (db_labels == -1).sum()
print(f"DBSCAN found {n_clusters} clusters, {n_noise} noise points")

# PCA for dimensionality reduction
pca = PCA(n_components=2)
X_2d = pca.fit_transform(X_sc)
print(f"Variance explained by 2 PCs: {pca.explained_variance_ratio_.sum():.2%}")
# Use X_2d for visualization or as input to a classifier`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'K-Means alternates between assigning points to nearest centroid and recomputing centroids.',
                'Use the Elbow Method (WCSS vs K) or Silhouette Score to choose the number of clusters.',
                'DBSCAN finds arbitrarily-shaped clusters and is robust to outliers.',
                'PCA finds directions of maximum variance and projects data to fewer dimensions.',
                'Always scale data before clustering or PCA — both are sensitive to feature scales.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
