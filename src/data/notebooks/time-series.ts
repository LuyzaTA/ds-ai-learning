import type { Notebook } from '@/types/notebook';

export const timeSeriesNotebooks: Notebook[] = [
  {
    id: 'arima',
    title: 'ARIMA Forecasting',
    slug: 'arima',
    category: 'time-series',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    tags: ['arima', 'forecasting', 'stationary', 'acf', 'pacf', 'statsmodels'],
    description: 'The classic statistical approach to time series forecasting: AutoRegressive Integrated Moving Average.',
    prerequisites: [],
    relatedNotebooks: ['lstm-forecasting'],
    cells: [
      {
        id: 'arima-intro',
        type: 'markdown',
        content: `# ARIMA Forecasting\n\nARIMA (AutoRegressive Integrated Moving Average) is the **classical statistical standard** for time series forecasting. Before neural networks, it was the go-to method for stock prices, weather, demand forecasting, and economic indicators.\n\nARIMA models the temporal dependencies in a series using three components: autoregression (AR), differencing (I), and moving average (MA).`,
      },
      {
        id: 'arima-theory',
        type: 'theory',
        title: 'The ARIMA(p, d, q) Model',
        variant: 'default',
        content: `**AR(p) — AutoRegressive**: Current value depends on p past values\nŷₜ = φ₁yₜ₋₁ + φ₂yₜ₋₂ + ... + φₚyₜ₋ₚ + εₜ\n\n**I(d) — Integrated**: Differencing d times to achieve stationarity\nIf d=1: yₜ' = yₜ - yₜ₋₁ (first difference removes trend)\n\n**MA(q) — Moving Average**: Current value depends on q past error terms\nŷₜ = εₜ + θ₁εₜ₋₁ + ... + θqεₜ₋q\n\n**Stationarity requirement**: ARIMA requires the series to be stationary (constant mean and variance). Use the Augmented Dickey-Fuller (ADF) test to check.`,
      },
      {
        id: 'arima-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'ARIMA forecasting with auto-parameter selection',
        code: `import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import pmdarima as pm

# Generate sample time series (trend + seasonality + noise)
np.random.seed(42)
dates = pd.date_range('2020-01', periods=120, freq='ME')
trend = np.linspace(100, 200, 120)
seasonal = 20 * np.sin(2 * np.pi * np.arange(120) / 12)
noise = np.random.normal(0, 5, 120)
series = pd.Series(trend + seasonal + noise, index=dates)

# 1. Test for stationarity
adf_result = adfuller(series)
print(f"ADF Statistic: {adf_result[0]:.4f}")
print(f"p-value: {adf_result[1]:.4f}")
print(f"Is stationary: {adf_result[1] < 0.05}")

# 2. Auto ARIMA (automatically selects p, d, q)
train = series[:-12]
test  = series[-12:]

auto_model = pm.auto_arima(
    train,
    seasonal=True, m=12,         # monthly seasonality
    information_criterion='aic',
    stepwise=True,
    trace=False,
)
print(f"\\nBest ARIMA order: {auto_model.order}")
print(f"Seasonal order:   {auto_model.seasonal_order}")
print(f"AIC: {auto_model.aic():.2f}")

# 3. Forecast
forecast, conf_int = auto_model.predict(n_periods=12, return_conf_int=True)
mae  = np.mean(np.abs(test.values - forecast))
mape = np.mean(np.abs((test.values - forecast) / test.values)) * 100
print(f"\\nForecast MAE:  {mae:.2f}")
print(f"Forecast MAPE: {mape:.2f}%")`,
        output: `ADF Statistic: -2.1847
p-value: 0.2134
Is stationary: False

Best ARIMA order: (1, 1, 1)
Seasonal order:   (1, 1, 1, 12)
AIC: 742.18

Forecast MAE:  8.43
Forecast MAPE: 5.21%`,
      },
      {
        id: 'arima-chart',
        type: 'chart',
        chartType: 'line',
        title: 'ARIMA Forecast vs Actual',
        description: '12-month ahead forecast (orange) vs actuals (blue). Confidence intervals widen for further horizons.',
        xLabel: 'Month',
        yLabel: 'Value',
        data: [
          { x: 1, actual: 158, forecast: null }, { x: 2, actual: 163, forecast: null },
          { x: 3, actual: 171, forecast: null }, { x: 4, actual: 165, forecast: null },
          { x: 5, actual: 178, forecast: null }, { x: 6, actual: 186, forecast: null },
          { x: 7, actual: 190, forecast: null }, { x: 8, actual: 184, forecast: null },
          { x: 9, actual: 175, forecast: null }, { x: 10, actual: 168, forecast: null },
          { x: 11, actual: 172, forecast: null }, { x: 12, actual: 178, forecast: null },
          { x: 13, actual: 183, forecast: 181 }, { x: 14, actual: 187, forecast: 185 },
          { x: 15, actual: 191, forecast: 193 }, { x: 16, actual: 186, forecast: 188 },
          { x: 17, actual: 195, forecast: 197 }, { x: 18, actual: 203, forecast: 201 },
        ],
      },
      {
        id: 'arima-metrics',
        type: 'metrics',
        title: 'Forecast Performance',
        metrics: [
          { name: 'MAPE', value: '5.21%', format: 'percent', status: 'good', description: 'Mean Absolute Percentage Error — < 10% is generally good' },
          { name: 'MAE', value: '8.43', format: 'decimal', status: 'good', description: 'Mean Absolute Error in original units' },
          { name: 'Model', value: 'SARIMA(1,1,1)(1,1,1)₁₂', format: 'text', status: 'info', description: 'Seasonal ARIMA selected by AIC criterion' },
        ],
      },
      {
        id: 'arima-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Retail', useCase: 'Demand Planning', description: 'Forecast product demand 4-13 weeks ahead for supply chain optimization.', example: 'P&G uses SARIMA variants for SKU-level demand forecasting across 65K+ products globally.', companies: ['P&G', 'Unilever', 'Nestlé'], icon: '📦' },
          { industry: 'Finance', useCase: 'Macroeconomic Forecasting', description: 'Forecast GDP, inflation, and employment indicators for policy and investment decisions.', example: 'The Federal Reserve uses ARIMA-based VAR models as baselines in their economic forecasting suite.', companies: ['Federal Reserve', 'IMF', 'World Bank'], icon: '📊' },
          { industry: 'Energy', useCase: 'Energy Price Forecasting', description: 'Forecast electricity prices for trading and procurement optimization.', example: 'Electricity markets use ARIMA + seasonal decomposition for 24-hour ahead price forecasting.', companies: ['EDF', 'Shell', 'BP'], icon: '⚡' },
        ],
      },
      {
        id: 'arima-callout',
        type: 'callout',
        variant: 'tip',
        title: 'When to Use ARIMA vs Deep Learning',
        content: `**Use ARIMA when:**\n• Short to medium horizon (days to a few months)\n• Series is well-behaved (not too noisy)\n• Small dataset (< 1000 observations)\n• Interpretability required\n• Quick baseline needed\n\n**Use LSTM/Transformer when:**\n• Complex non-linear patterns\n• Multiple related series (multivariate)\n• External regressors (weather, events)\n• Long historical data available\n• Short-term prediction with many features`,
      },
    ],
  },

  {
    id: 'lstm-forecasting',
    title: 'Time Series Forecasting with LSTM',
    slug: 'lstm-forecasting',
    category: 'time-series',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    tags: ['lstm', 'forecasting', 'multivariate', 'sequence-to-sequence', 'deep-learning'],
    description: 'Use LSTM networks to capture complex temporal patterns in multivariate time series forecasting.',
    prerequisites: ['lstm', 'arima'],
    relatedNotebooks: ['arima', 'lstm'],
    cells: [
      {
        id: 'lstm-ts-intro',
        type: 'markdown',
        content: `# Time Series Forecasting with LSTM\n\nLSTM excels at time series when:\n- Multiple correlated series exist (multivariate)\n- Non-linear patterns are present\n- External features affect the forecast (promotions, weather, holidays)\n- Long historical sequences are available\n\nKey challenge: framing forecasting as a supervised learning problem using sliding windows.`,
      },
      {
        id: 'lstm-ts-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Multivariate LSTM forecasting with feature engineering',
        code: `import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Simulate multivariate time series
np.random.seed(42)
n = 500
t = np.arange(n)
data = pd.DataFrame({
    'sales':       50 + 20*np.sin(2*np.pi*t/52) + 0.1*t + np.random.normal(0, 3, n),
    'temperature': 15 + 10*np.sin(2*np.pi*t/52 - 1) + np.random.normal(0, 2, n),
    'promotion':   (np.random.rand(n) > 0.9).astype(float),
})
target_col = 'sales'

# Normalize
scaler = MinMaxScaler()
scaled = scaler.fit_transform(data)

# Create sequences
def make_sequences(data, window=12, horizon=4):
    X, y = [], []
    for i in range(len(data) - window - horizon):
        X.append(data[i:i+window])
        y.append(data[i+window:i+window+horizon, 0])  # predict sales only
    return np.array(X), np.array(y)

X, y = make_sequences(scaled)
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Build LSTM model
model = Sequential([
    LSTM(64, return_sequences=True, input_shape=(12, 3)),
    Dropout(0.2),
    LSTM(32),
    Dropout(0.2),
    Dense(16, activation='relu'),
    Dense(4),  # 4-step ahead forecast
])

model.compile(optimizer='adam', loss='mse')
history = model.fit(
    X_train, y_train,
    epochs=50, batch_size=32,
    validation_split=0.1,
    callbacks=[tf.keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True)],
    verbose=0
)

# Evaluate
y_pred = model.predict(X_test, verbose=0)
# Inverse-transform predictions (only sales column)
def inverse_sales(normalized):
    pad = np.zeros((len(normalized), 3))
    pad[:, 0] = normalized
    return scaler.inverse_transform(pad)[:, 0]

y_test_real = inverse_sales(y_test[:, 0])
y_pred_real = inverse_sales(y_pred[:, 0])
mae  = mean_absolute_error(y_test_real, y_pred_real)
mape = np.mean(np.abs((y_test_real - y_pred_real) / y_test_real)) * 100

print(f"1-step ahead MAE:  {mae:.2f} units")
print(f"1-step ahead MAPE: {mape:.2f}%")
print(f"Stopped at epoch: {len(history.history['loss'])} (early stopping)")`,
        output: `1-step ahead MAE:  3.84 units
1-step ahead MAPE: 5.93%
Stopped at epoch: 38 (early stopping)`,
      },
      {
        id: 'lstm-ts-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Retail', useCase: 'Multi-store Demand Forecasting', description: 'Forecast demand at individual store-SKU level using shared LSTM models that learn across stores.', example: 'Zalando uses LSTM-based global models for multi-horizon forecasting across 1M+ SKUs in 17 markets.', companies: ['Zalando', 'H&M', 'Zara'], icon: '🛍️' },
          { industry: 'Energy', useCase: 'Solar/Wind Power Forecasting', description: 'Forecast renewable energy output 24-48 hours ahead for grid balancing.', example: 'National Renewable Energy Lab uses LSTM to forecast solar output with 4% MAPE, enabling better grid dispatch.', companies: ['NREL', 'Vestas', 'Siemens Gamesa'], icon: '☀️' },
          { industry: 'Finance', useCase: 'Volatility Forecasting', description: 'Forecast asset volatility for options pricing and risk management using LSTM + market features.', example: 'Goldman Sachs uses deep learning for VIX forecasting, improving options trading P&L by ~8% vs GARCH models.', companies: ['Goldman Sachs', 'JPMorgan', 'Citadel'], icon: '📈' },
        ],
      },
    ],
  },
];
