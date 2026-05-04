import type { Section } from '@/types/curriculum';

export const mlopsSection: Section = {
  id: 'mlops',
  title: 'MLOps & AI Systems',
  description: 'Deploying, monitoring, and maintaining ML models in production.',
  longDescription:
    'Building a model is 10% of the work. Deploying it reliably, monitoring it, and keeping it accurate over time is the other 90%. This section covers the engineering discipline of production ML systems.',
  icon: '⚙️',
  color: 'teal',
  tags: ['MLOps', 'Docker', 'FastAPI', 'MLflow', 'Monitoring', 'CI/CD', 'Feature Store'],
  modules: [
    {
      id: 'model-deployment',
      title: 'Model Deployment',
      description: 'Serving ML models as APIs with FastAPI, Docker, and Kubernetes.',
      lessons: [
        {
          id: 'serving-with-fastapi',
          title: 'Serving ML Models with FastAPI & Docker',
          description: 'Build a production-ready REST API for your model and containerise it.',
          duration: '65 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## The Deployment Challenge\n\nA model that exists only as a Jupyter notebook provides no business value. Production deployment means:\n- Making the model accessible via an API\n- Ensuring it handles concurrent requests efficiently\n- Making it reproducible (same prediction on any machine)\n- Enabling versioning, rollback, and A/B testing\n\nThe standard stack: **FastAPI** (REST API) + **Docker** (containerisation) + **Kubernetes** (orchestration).',
            },
            {
              type: 'text',
              content:
                '## FastAPI for Model Serving\n\nFastAPI is the modern standard for Python APIs: it\'s fast (built on ASGI), auto-generates OpenAPI docs, and has excellent Pydantic integration for request/response validation.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'FastAPI model serving endpoint',
              code: `# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import numpy as np
import joblib
import logging

logger = logging.getLogger(__name__)
app = FastAPI(title="ML Model API", version="1.0.0")

# Load model at startup (not per request)
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

class PredictionRequest(BaseModel):
    size_m2:  float = Field(..., gt=0, le=10000, description="Property size in m²")
    rooms:    int   = Field(..., ge=1, le=20)
    age_yrs:  float = Field(..., ge=0, le=200)
    distance: float = Field(..., ge=0, description="Distance to city centre in km")

class PredictionResponse(BaseModel):
    predicted_price: float
    confidence_lower: float
    confidence_upper: float
    model_version: str = "1.0.0"

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        features = np.array([[
            request.size_m2,
            request.rooms,
            request.age_yrs,
            request.distance
        ]])
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        margin = prediction * 0.1  # 10% confidence interval
        return PredictionResponse(
            predicted_price=round(prediction, 2),
            confidence_lower=round(prediction - margin, 2),
            confidence_upper=round(prediction + margin, 2),
        )
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Run: uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4`,
            },
            {
              type: 'code',
              language: 'dockerfile',
              caption: 'Dockerfile for the model serving API',
              code: `# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies first (Docker cache layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and model artifacts
COPY main.py .
COPY model.pkl .
COPY scaler.pkl .

# Non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'FastAPI + Pydantic provides type-safe, self-documenting REST APIs for ML models.',
                'Load models at startup, not per request — startup cost once vs latency penalty per call.',
                'Docker ensures reproducibility: the same container runs on any machine or cloud.',
                'Always include a /health endpoint for load balancers and monitoring systems.',
                'Kubernetes (k8s) orchestrates multiple Docker containers, handling scaling and failover.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ml-monitoring',
      title: 'ML Monitoring & Experiment Tracking',
      description: 'MLflow, data drift detection, and keeping models accurate over time.',
      lessons: [
        {
          id: 'mlflow-monitoring',
          title: 'Experiment Tracking with MLflow',
          description: 'Track, compare, and manage ML experiments and model versions.',
          duration: '50 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## The Experiment Tracking Problem\n\nWithout tooling, ML experiments are chaotic: you run 50 different hyperparameter combinations and cannot remember which one produced which result, or what code and data version was used. **MLflow** is the open-source standard for solving this.',
            },
            {
              type: 'text',
              content:
                '## MLflow Components\n\n- **MLflow Tracking**: log parameters, metrics, artifacts for each run\n- **MLflow Models**: package models in a standard format (MLmodel) that can be served anywhere\n- **MLflow Model Registry**: version, stage, and promote models (Staging → Production → Archived)\n- **MLflow Projects**: reproducible training runs with defined dependencies',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'MLflow experiment tracking',
              code: `import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score, f1_score
import numpy as np

# Set tracking URI (local or remote server)
mlflow.set_tracking_uri("http://localhost:5000")  # or mlruns/ for local
mlflow.set_experiment("breast-cancer-classification")

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Grid of hyperparameters to test
param_grid = [
    {"n_estimators": 50,  "max_depth": 5,  "min_samples_leaf": 1},
    {"n_estimators": 100, "max_depth": 10, "min_samples_leaf": 2},
    {"n_estimators": 200, "max_depth": None, "min_samples_leaf": 1},
]

for params in param_grid:
    with mlflow.start_run():
        # Log hyperparameters
        mlflow.log_params(params)

        # Train model
        model = RandomForestClassifier(**params, random_state=42)
        model.fit(X_train, y_train)

        # Compute and log metrics
        y_pred      = model.predict(X_test)
        y_pred_prob = model.predict_proba(X_test)[:, 1]
        metrics = {
            "auc":      roc_auc_score(y_test, y_pred_prob),
            "f1":       f1_score(y_test, y_pred),
            "cv_auc":   cross_val_score(model, X, y, cv=5, scoring='roc_auc').mean(),
        }
        mlflow.log_metrics(metrics)

        # Log the model
        mlflow.sklearn.log_model(model, "random_forest_model",
                                  registered_model_name="BreastCancerClassifier")
        print(f"Params: {params} | AUC: {metrics['auc']:.4f}")`,
            },
            {
              type: 'text',
              content:
                '## Data Drift and Model Monitoring\n\nModels degrade over time as the real-world data distribution shifts. **Data drift** is when input feature distributions change; **concept drift** is when the relationship between features and targets changes.\n\nMonitoring solutions: **Evidently AI**, **WhyLogs**, **Arize**, **Fiddler**. Key metrics to track:\n- Statistical drift tests (KL divergence, PSI, Jensen-Shannon)\n- Prediction distribution shift\n- Model performance on labelled samples\n- Data quality checks (null rates, value ranges)',
            },
            {
              type: 'keyTakeaways',
              items: [
                'MLflow tracks parameters, metrics, and artifacts for every experiment run — enabling reproducibility.',
                'The Model Registry manages versions and promotion stages (Staging → Production).',
                'Data drift (input distribution changes) and concept drift (relationship changes) degrade models over time.',
                'Set up automated monitoring with statistical tests and alerting on performance degradation.',
                'Retraining pipelines should be triggered automatically when drift or performance drops below threshold.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
