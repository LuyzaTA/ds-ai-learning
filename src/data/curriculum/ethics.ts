import type { Section } from '@/types/curriculum';

export const ethicsSection: Section = {
  id: 'ethics',
  title: 'Ethics & Governance',
  description: 'AI bias, explainability, privacy, and the regulations shaping responsible AI.',
  longDescription:
    'As AI systems make consequential decisions in hiring, lending, healthcare, and criminal justice, the ethical, legal, and social dimensions of AI become as important as the technical ones.',
  icon: '⚖️',
  color: 'rose',
  tags: ['AI Ethics', 'Fairness', 'Explainability', 'GDPR', 'LGPD', 'Privacy', 'Responsible AI'],
  modules: [
    {
      id: 'ai-ethics-fairness',
      title: 'AI Ethics & Algorithmic Fairness',
      description: 'Bias sources, fairness metrics, and explainability tools.',
      lessons: [
        {
          id: 'bias-and-fairness',
          title: 'Bias, Fairness, and Explainability',
          description: 'How bias enters ML systems, how to measure fairness, and how to explain model decisions.',
          duration: '60 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Where Does Bias Come From?\n\nML systems can be unfair or discriminatory not because of malicious intent but because of **bias baked into the data and processes**. Major sources:\n\n1. **Historical bias**: training data reflects historical discrimination (e.g., loan approval data that under-approved women)\n2. **Representation bias**: certain groups are under-represented in training data\n3. **Measurement bias**: proxy features correlate with protected attributes (zip code correlates with race)\n4. **Feedback loops**: biased predictions lead to biased actions, which create biased future data\n5. **Aggregation bias**: one model for heterogeneous groups ignores within-group differences',
            },
            {
              type: 'callout',
              variant: 'important',
              title: 'Real-World Case: COMPAS Recidivism Algorithm',
              content:
                'The COMPAS algorithm used in US courts to predict recidivism (reoffending) was found by ProPublica (2016) to incorrectly flag Black defendants as high risk at nearly twice the rate of white defendants with similar criminal histories. This sparked a global debate about algorithmic fairness in criminal justice.',
            },
            {
              type: 'text',
              content:
                '## Fairness Metrics\n\nMultiple definitions of fairness exist — and they are mathematically incompatible. Choose based on the context and harm to be prevented:\n\n- **Demographic Parity**: equal positive prediction rates across groups\n- **Equal Opportunity**: equal true positive rates across groups\n- **Predictive Parity**: equal precision (PPV) across groups\n- **Calibration**: predicted probabilities match actual outcomes in all groups\n\nThe "impossibility theorem" shows these cannot all be satisfied simultaneously when base rates differ across groups.',
            },
            {
              type: 'text',
              content:
                '## Explainability: SHAP and LIME\n\nBlack-box models (deep learning, XGBoost) can have very high accuracy but are opaque. **Explainability** methods answer: "why did the model make this specific prediction?"\n\n- **SHAP** (SHapley Additive exPlanations): game-theoretically grounded attribution of each feature\'s contribution. Consistent and locally accurate.\n- **LIME** (Local Interpretable Model-agnostic Explanations): fits a simple linear model locally around each prediction.\n- **Integrated Gradients**: for neural networks, attributes importance to input features via gradients.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'SHAP explanations for a Random Forest model',
              code: `# pip install shap
import shap
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

# Train model
X, y = load_breast_cancer(return_X_y=True)
feature_names = load_breast_cancer().feature_names
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# SHAP TreeExplainer (fast for tree models)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Global feature importance (mean absolute SHAP values)
shap_importance = np.abs(shap_values[1]).mean(axis=0)
top_features = np.argsort(shap_importance)[::-1][:10]
print("Top 10 features by mean |SHAP value|:")
for i in top_features:
    print(f"  {feature_names[i]:35s}: {shap_importance[i]:.4f}")

# Individual explanation for one prediction
sample_idx = 5
pred_prob = model.predict_proba(X_test[[sample_idx]])[0, 1]
print(f"\\nPrediction for sample {sample_idx}: {pred_prob:.3f} (1=malignant)")
print("Feature contributions (SHAP):")
svs = shap_values[1][sample_idx]
for feat, sv in sorted(zip(feature_names, svs), key=lambda x: abs(x[1]), reverse=True)[:5]:
    direction = "↑ increases" if sv > 0 else "↓ decreases"
    print(f"  {feat:35s}: {sv:+.4f} ({direction} malignancy risk)")`,
            },
            {
              type: 'text',
              content:
                '## Responsible AI Framework\n\nLeading organisations use frameworks with pillars like:\n- **Fairness**: test for demographic disparities before deployment\n- **Reliability & Safety**: red-team, test edge cases, define failure modes\n- **Privacy**: minimise data collection, anonymise, implement differential privacy\n- **Inclusiveness**: design for all users, especially marginalised groups\n- **Transparency**: document model cards, training data, known limitations\n- **Accountability**: maintain audit trails, human oversight for high-stakes decisions',
            },
            {
              type: 'keyTakeaways',
              items: [
                'Bias enters ML systems through historical data, under-representation, and feedback loops — not just through code.',
                'Multiple fairness definitions exist and are mathematically incompatible — choose based on the harm context.',
                'SHAP provides consistent, game-theory-based feature attributions; LIME provides local approximations.',
                'The EU AI Act (2024) mandates explainability and bias testing for high-risk AI systems.',
                'Model cards and data sheets are the standard for transparent documentation of AI systems.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'privacy-governance',
      title: 'Privacy & Regulatory Compliance',
      description: 'GDPR, LGPD, differential privacy, and the EU AI Act.',
      lessons: [
        {
          id: 'gdpr-lgpd',
          title: 'Data Privacy: GDPR, LGPD, and the EU AI Act',
          description: 'The regulations every data scientist must know and how they shape model design.',
          duration: '45 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Why Privacy Law Matters for Data Scientists\n\nData scientists work with personal data — names, locations, medical records, behaviours. Two landmark regulations govern this:\n\n- **GDPR** (EU General Data Protection Regulation, 2018): applies globally to anyone handling EU residents\' data\n- **LGPD** (Lei Geral de Proteção de Dados, Brazil, 2020): closely mirrors GDPR, applies to Brazilian personal data\n\nViolations can cost up to 4% of global annual turnover or €20 million (GDPR). Understanding these laws shapes how we collect, store, and process data.',
            },
            {
              type: 'text',
              content:
                '## Key Principles of GDPR / LGPD\n\n1. **Lawfulness, Fairness, Transparency**: data subjects must know how their data is used\n2. **Purpose Limitation**: data collected for one purpose cannot be reused for another\n3. **Data Minimisation**: collect only what is strictly necessary\n4. **Accuracy**: keep data up to date\n5. **Storage Limitation**: delete data when no longer needed\n6. **Security**: appropriate technical and organisational measures\n7. **Accountability**: demonstrate compliance proactively',
            },
            {
              type: 'text',
              content:
                '## The EU AI Act (2024)\n\nThe EU AI Act is the world\'s first comprehensive AI regulation. It classifies AI systems by risk:\n\n- **Unacceptable risk** (banned): social scoring, subliminal manipulation, real-time biometric surveillance\n- **High risk**: CV screening, credit scoring, medical diagnosis, critical infrastructure — requires conformity assessments, bias testing, human oversight\n- **Limited risk**: chatbots — must be transparent about being AI\n- **Minimal risk**: spam filters, game AI — no regulation',
            },
            {
              type: 'text',
              content:
                '## Differential Privacy\n\n**Differential Privacy (DP)** provides a mathematically rigorous guarantee: adding or removing any individual\'s data from a dataset changes the output by at most a small factor ε. This protects individual privacy while allowing statistical analyses.\n\nUsed by: Apple (iOS telemetry), Google (Chrome statistics), US Census Bureau. Applied in ML via **DP-SGD** (gradient perturbation during training).',
            },
            {
              type: 'math',
              latex:
                '\\Pr[\\mathcal{M}(D) \\in S] \\leq e^\\varepsilon \\cdot \\Pr[\\mathcal{M}(D\') \\in S] + \\delta',
              displayMode: true,
              caption: 'ε-δ differential privacy: outputs on neighboring datasets D and D\' are indistinguishable.',
            },
            {
              type: 'keyTakeaways',
              items: [
                'GDPR and LGPD apply whenever you process personal data of EU or Brazilian residents — regardless of where your company is.',
                'Core principles: minimise data collected, get explicit consent, delete when done, document everything.',
                'The EU AI Act classifies AI by risk; high-risk systems (credit, hiring, medical) require rigorous compliance.',
                'Differential privacy provides mathematical guarantees against individual re-identification in datasets.',
                'Federated learning trains models across decentralised data without raw data ever leaving devices.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
