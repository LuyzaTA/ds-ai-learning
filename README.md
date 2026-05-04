# DS & AI Learning Platform

A complete, structured educational website for your MBA in Data Science and AI.

## Quick Start

### Prerequisites
- Node.js 18+ installed

### Setup

```bash
# Navigate to the project folder
cd ds-ai-platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

## Features

- **8 sections** covering your full MBA curriculum
- **29+ lessons** with rich educational content
- **Math rendering** via KaTeX (LaTeX formulas)
- **Interactive quizzes** with instant feedback
- **Code blocks** with copy functionality
- **ELI5 sections** for every complex topic
- **Progress tracking** (saved to localStorage)
- **Simple / Detailed mode** toggle
- **Search** across all lessons
- **Autism-friendly design**: soft palette, consistent layout, predictable navigation

## Curriculum Structure

| # | Section | Topics |
|---|---------|--------|
| 1 | Foundations | Linear Algebra, Probability, Statistics, Python |
| 2 | Data Analysis | EDA, Visualization, A/B Testing |
| 3 | Machine Learning | Regression, Trees, Forests, XGBoost |
| 4 | Deep Learning | Neural Networks, CNN, Transformers |
| 5 | Generative AI | LLMs, Prompt Engineering, RAG, Agents |
| 6 | Big Data | Spark, Data Lake, Lakehouse |
| 7 | MLOps | Deployment, Monitoring, MLflow |
| 8 | Ethics | Fairness, Privacy, GDPR, LGPD, EU AI Act |

## Adding New Content

Lessons are defined in `src/data/curriculum/`. Each section has its own file.
Copy an existing lesson block and modify the content. All content blocks:

- `text` — Markdown text
- `math` — LaTeX formula (via KaTeX)
- `code` — Syntax highlighted code
- `eli5` — Simplified explanation
- `callout` — Info/tip/warning box
- `keyTakeaways` — Bullet summary
- `quiz` — Interactive questions with explanations
- `diagram` — ASCII diagram
- `compare` — Side-by-side comparison

## Build for Production

```bash
npm run build
npm start
```
