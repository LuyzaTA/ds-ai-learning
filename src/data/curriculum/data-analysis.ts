import type { Section } from '@/types/curriculum';

export const dataAnalysisSection: Section = {
  id: 'data-analysis',
  title: 'Data Analysis & Visualization',
  description: 'EDA, statistical testing, and communicating insights through charts and dashboards.',
  longDescription:
    'Data analysis is the bridge between raw data and actionable decisions. This section covers how to explore, understand, and communicate data effectively.',
  icon: '📊',
  color: 'cyan',
  tags: ['EDA', 'Pandas', 'Matplotlib', 'Seaborn', 'Statistics', 'Visualization'],
  modules: [
    {
      id: 'exploratory-data-analysis',
      title: 'Exploratory Data Analysis',
      description: 'Techniques for understanding data before modelling.',
      lessons: [
        {
          id: 'eda-fundamentals',
          title: 'Exploratory Data Analysis Fundamentals',
          description: 'Distributions, correlations, outliers, and the systematic EDA workflow.',
          duration: '55 min',
          difficulty: 'beginner',
          blocks: [
            {
              type: 'text',
              content:
                '## What Is EDA?\n\nExploratory Data Analysis (EDA), coined by statistician John Tukey, is the practice of **visually and statistically summarising data** before applying any model. It answers questions like:\n- What is the distribution of each variable?\n- Are there missing values? Outliers?\n- Which features are correlated?\n- Are there data quality issues?\n\nSkipping EDA is one of the most common mistakes in data science — it leads to incorrect models and wrong conclusions.',
            },
            {
              type: 'text',
              content:
                '## Univariate Analysis\n\nFor each variable independently:\n- **Numerical**: mean, median, std, min/max, quartiles, histogram, box plot, KDE plot\n- **Categorical**: value counts, bar chart, pie chart (sparingly)\n\nKey question: is the distribution normal, skewed, bimodal, or uniform? Does it have outliers?',
            },
            {
              type: 'text',
              content:
                '## Bivariate and Multivariate Analysis\n\n- **Numerical vs Numerical**: scatter plot, correlation coefficient, joint plot\n- **Numerical vs Categorical**: box plot, violin plot, point plot\n- **Categorical vs Categorical**: heatmap of counts, grouped bar chart\n- **All vs All**: `sns.pairplot()`, correlation heatmap',
            },
            {
              type: 'math',
              latex:
                'r_{XY} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y} = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum(x_i-\\bar{x})^2 \\sum(y_i-\\bar{y})^2}}',
              displayMode: true,
              caption: "Pearson correlation coefficient r ∈ [-1, 1]. Measures linear association only.",
            },
            {
              type: 'callout',
              variant: 'warning',
              title: 'Correlation ≠ Causation',
              content:
                'Two variables can be highly correlated without one causing the other. Always look for confounding variables and subject-matter reasons before interpreting correlation as causation. The classic example: ice cream sales and drowning rates are both correlated with summer — the confounder is temperature.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'Complete EDA workflow with Pandas and Seaborn',
              code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load example data (Titanic)
df = sns.load_dataset('titanic')

# ── 1. Basic overview ──
print(df.shape)           # (891, 15)
print(df.dtypes)
print(df.isnull().sum())  # missing values per column
print(df.describe())      # stats for numerical columns

# ── 2. Univariate: age distribution ──
fig, axes = plt.subplots(1, 3, figsize=(12, 4))
df['age'].hist(bins=30, ax=axes[0]); axes[0].set_title('Histogram')
df['age'].plot.kde(ax=axes[1]);      axes[1].set_title('KDE')
df.boxplot(column='age', ax=axes[2]); axes[2].set_title('Box Plot')
plt.tight_layout()

# ── 3. Bivariate: survival by class ──
print("\\nSurvival rate by class:")
print(df.groupby('class')['survived'].mean().round(2))

sns.boxplot(x='class', y='age', hue='survived', data=df)

# ── 4. Correlation heatmap ──
numerical_cols = df.select_dtypes(include=[np.number]).columns
corr = df[numerical_cols].corr()
plt.figure(figsize=(8,6))
sns.heatmap(corr, annot=True, fmt='.2f', cmap='RdBu_r', center=0)
plt.title('Correlation Matrix')

# ── 5. Pair plot ──
sns.pairplot(df[['age','fare','survived']].dropna(), hue='survived', diag_kind='kde')

print("\\nTop correlations with 'survived':")
print(corr['survived'].abs().sort_values(ascending=False))`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Always perform EDA before modelling — data quality issues found early save enormous time.',
                'Check distributions (histogram, KDE, box plot) for each numerical feature individually.',
                'Use correlation heatmaps and scatter plots to understand relationships between features.',
                'Pearson correlation only measures linear relationships — use Spearman for non-linear.',
                'Document all findings and data quality issues before proceeding to feature engineering.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'statistical-testing',
      title: 'Statistical Testing & A/B Testing',
      description: 'Hypothesis tests, confidence intervals, and rigorous experiment design.',
      lessons: [
        {
          id: 'hypothesis-testing',
          title: 'Hypothesis Testing and A/B Testing',
          description: 'p-values, t-tests, chi-square, and designing valid experiments.',
          duration: '55 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Hypothesis Testing Framework\n\nHypothesis testing is a formal framework for making data-driven decisions:\n\n1. **H₀** (null hypothesis): the default assumption ("no effect", "no difference")\n2. **H₁** (alternative hypothesis): what we want to show ("new button increases clicks")\n3. Choose significance level **α** (usually 0.05 or 0.01)\n4. Collect data, compute **test statistic**\n5. Compute **p-value**: probability of observing this data (or more extreme) if H₀ is true\n6. If p-value < α → **reject H₀**; otherwise fail to reject H₀',
            },
            {
              type: 'callout',
              variant: 'important',
              title: 'Interpreting the p-value',
              content:
                'A p-value of 0.03 does NOT mean "there is a 3% chance H₀ is true." It means "if H₀ were true, we would see data this extreme only 3% of the time." Statistical significance ≠ practical significance. A very large sample can make trivial effects statistically significant.',
            },
            {
              type: 'text',
              content:
                '## Common Tests\n\n- **t-test (independent)**: compare means of two independent groups\n- **t-test (paired)**: compare means of two related measurements on same subjects\n- **ANOVA**: compare means of 3+ groups\n- **Chi-squared test**: test association between two categorical variables\n- **Mann-Whitney U**: non-parametric alternative to t-test (no normality assumption)',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'A/B test analysis with scipy',
              code: `import numpy as np
from scipy import stats

# A/B test: new landing page (B) vs old (A)
np.random.seed(42)

# Simulate conversion rates
n_A, n_B   = 5000, 5000
conv_A = np.random.binomial(1, p=0.052, size=n_A)  # control: 5.2% conversion
conv_B = np.random.binomial(1, p=0.060, size=n_B)  # treatment: 6.0% conversion

rate_A = conv_A.mean()
rate_B = conv_B.mean()
lift   = (rate_B - rate_A) / rate_A * 100

print(f"Control (A):   {rate_A:.3%} conversion")
print(f"Treatment (B): {rate_B:.3%} conversion")
print(f"Relative lift: {lift:.1f}%")

# Two-proportion z-test
from statsmodels.stats.proportion import proportions_ztest
count = np.array([conv_B.sum(), conv_A.sum()])
nobs  = np.array([n_B, n_A])
z_stat, p_value = proportions_ztest(count, nobs)
print(f"\\nZ-statistic: {z_stat:.4f}")
print(f"p-value:     {p_value:.4f}")
print(f"Significant (α=0.05): {p_value < 0.05}")

# Confidence interval for the difference
from statsmodels.stats.proportion import confint_proportions_2indep
ci_low, ci_high = confint_proportions_2indep(
    conv_B.sum(), n_B, conv_A.sum(), n_A, method='newcomb'
)
print(f"\\n95% CI for difference: [{ci_low:.4f}, {ci_high:.4f}]")`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Hypothesis testing: state H₀, choose α, compute p-value, decide to reject or not.',
                'p-value < α means the result is statistically significant — not necessarily practically important.',
                'A/B testing requires: random assignment, sufficient sample size, single metric, and pre-defined stopping rule.',
                'Always compute confidence intervals, not just p-values — they show magnitude, not just direction.',
                'Check test assumptions (normality, independence) before applying parametric tests.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
