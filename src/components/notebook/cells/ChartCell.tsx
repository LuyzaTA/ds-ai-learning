'use client';

import { clsx } from 'clsx';
import type { ChartCell as ChartCellType } from '@/types/notebook';

interface Props {
  cell: ChartCellType;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

// ── Line Chart ────────────────────────────────────────────────────────────────
function LineChart({ data, xLabel, yLabel }: { data: Record<string, unknown>[]; xLabel?: string; yLabel?: string }) {
  const W = 480, H = 240, PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top  - PAD.bottom;

  const xs = data.map(d => Number(d.x ?? 0));
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const toX = (v: number) => ((v - minX) / (maxX - minX || 1)) * innerW;

  // collect all y series
  const yKeys = Object.keys(data[0] || {}).filter(k => k !== 'x' && k !== 'type' && k !== 'label');
  const allYs  = data.flatMap(d => yKeys.map(k => Number(d[k] ?? NaN)).filter(v => !isNaN(v)));
  const minY = Math.min(...allYs), maxY = Math.max(...allYs);
  const toY = (v: number) => innerH - ((v - minY) / (maxY - minY || 1)) * innerH;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => minY + t * (maxY - minY));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <g transform={`translate(${PAD.left},${PAD.top})`}>
        {/* Grid */}
        {yTicks.map((t, i) => (
          <line key={i} x1={0} y1={toY(t)} x2={innerW} y2={toY(t)}
            stroke="#e2e8f0" strokeWidth={1} />
        ))}

        {/* Y axis labels */}
        {yTicks.map((t, i) => (
          <text key={i} x={-8} y={toY(t)+4} textAnchor="end" fontSize={10} fill="#94a3b8">
            {t.toFixed(1)}
          </text>
        ))}

        {/* X axis labels */}
        {xs.map((x, i) => i % Math.ceil(xs.length / 6) === 0 && (
          <text key={i} x={toX(x)} y={innerH+20} textAnchor="middle" fontSize={10} fill="#94a3b8">
            {x}
          </text>
        ))}

        {/* Lines */}
        {yKeys.map((key, ki) => {
          const pts = data.map(d => ({ x: Number(d.x ?? 0), y: d[key] as number }))
            .filter(p => !isNaN(p.y));
          const path = pts.map((p, i) =>
            `${i === 0 ? 'M' : 'L'}${toX(p.x)},${toY(p.y)}`
          ).join(' ');
          return (
            <g key={key}>
              <path d={path} fill="none" stroke={COLORS[ki]} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((p, pi) => (
                <circle key={pi} cx={toX(p.x)} cy={toY(p.y)} r={3} fill={COLORS[ki]} />
              ))}
            </g>
          );
        })}

        {/* Axes */}
        <line x1={0} y1={0} x2={0} y2={innerH} stroke="#cbd5e1" strokeWidth={1.5} />
        <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#cbd5e1" strokeWidth={1.5} />

        {/* Axis labels */}
        {xLabel && <text x={innerW/2} y={innerH+35} textAnchor="middle" fontSize={11} fill="#64748b">{xLabel}</text>}
        {yLabel && <text x={-35} y={innerH/2} textAnchor="middle" fontSize={11} fill="#64748b"
          transform={`rotate(-90,-35,${innerH/2})`}>{yLabel}</text>}

        {/* Legend */}
        {yKeys.length > 1 && yKeys.map((key, ki) => (
          <g key={key} transform={`translate(${innerW - 90}, ${ki * 18})`}>
            <rect x={0} y={0} width={12} height={4} fill={COLORS[ki]} rx={2} />
            <text x={16} y={5} fontSize={9} fill="#64748b">{key}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
function BarChart({ data, xLabel, yLabel }: { data: Record<string, unknown>[]; xLabel?: string; yLabel?: string }) {
  const W = 480, H = 240, PAD = { top: 20, right: 20, bottom: 50, left: 50 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top  - PAD.bottom;

  const values = data.map(d => Number(d.value ?? 0));
  const maxV   = Math.max(...values, 0.001);
  const barW   = (innerW / data.length) * 0.7;
  const gap    = (innerW / data.length) * 0.3;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <g transform={`translate(${PAD.left},${PAD.top})`}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <line key={i} x1={0} y1={innerH*(1-t)} x2={innerW} y2={innerH*(1-t)}
            stroke="#e2e8f0" strokeWidth={1} strokeDasharray="4,2" />
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const val  = Number(d.value ?? 0);
          const barH = (val / maxV) * innerH;
          const x    = i * (barW + gap) + gap / 2;
          const y    = innerH - barH;

          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH}
                fill={COLORS[i % COLORS.length]} rx={4} opacity={0.85} />
              <text x={x + barW/2} y={y - 4} textAnchor="middle" fontSize={10} fill="#475569" fontWeight="500">
                {val < 1 ? val.toFixed(3) : val.toFixed(1)}
              </text>
              <text x={x + barW/2} y={innerH + 16} textAnchor="middle" fontSize={10} fill="#94a3b8">
                {String(d.label ?? '').length > 10 ? String(d.label ?? '').slice(0,10)+'…' : String(d.label ?? '')}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={0} y1={0} x2={0} y2={innerH} stroke="#cbd5e1" strokeWidth={1.5} />
        <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#cbd5e1" strokeWidth={1.5} />

        {xLabel && <text x={innerW/2} y={innerH+42} textAnchor="middle" fontSize={11} fill="#64748b">{xLabel}</text>}
        {yLabel && <text x={-35} y={innerH/2} textAnchor="middle" fontSize={11} fill="#64748b"
          transform={`rotate(-90,-35,${innerH/2})`}>{yLabel}</text>}
      </g>
    </svg>
  );
}

// ── Scatter Plot ──────────────────────────────────────────────────────────────
function ScatterChart({ data, xLabel, yLabel }: { data: Record<string, unknown>[]; xLabel?: string; yLabel?: string }) {
  const W = 480, H = 260, PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top  - PAD.bottom;

  const xs  = data.map(d => Number(d.x ?? 0));
  const ys  = data.map(d => Number(d.y ?? 0));
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys),  maxY = Math.max(...ys);

  const toX = (v: number) => ((v - minX) / (maxX - minX || 1)) * innerW;
  const toY = (v: number) => innerH - ((v - minY) / (maxY - minY || 1)) * innerH;

  const dataPoints  = data.filter(d => d.type !== 'line');
  const linePoints  = data.filter(d => d.type === 'line');
  const linePath    = linePoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'}${toX(Number(p.x))},${toY(Number(p.y))}`
  ).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <g transform={`translate(${PAD.left},${PAD.top})`}>
        {/* Grid */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line key={i} x1={0} y1={innerH*t} x2={innerW} y2={innerH*t}
            stroke="#e2e8f0" strokeWidth={1} />
        ))}

        {/* Regression line */}
        {linePoints.length > 1 && (
          <path d={linePath} fill="none" stroke="#ef4444" strokeWidth={2} strokeDasharray="5,3" />
        )}

        {/* Data points */}
        {dataPoints.map((d, i) => (
          <circle key={i}
            cx={toX(Number(d.x))} cy={toY(Number(d.y))}
            r={4} fill="#6366f1" opacity={0.7}
          />
        ))}

        {/* Axes */}
        <line x1={0} y1={0} x2={0} y2={innerH} stroke="#cbd5e1" strokeWidth={1.5} />
        <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#cbd5e1" strokeWidth={1.5} />

        {/* Labels */}
        {[0, 0.5, 1].map((t, i) => (
          <text key={i} x={toX(minX + t*(maxX-minX))} y={innerH+18} textAnchor="middle" fontSize={10} fill="#94a3b8">
            {(minX + t*(maxX-minX)).toFixed(1)}
          </text>
        ))}

        {xLabel && <text x={innerW/2} y={innerH+35} textAnchor="middle" fontSize={11} fill="#64748b">{xLabel}</text>}
        {yLabel && <text x={-35} y={innerH/2} textAnchor="middle" fontSize={11} fill="#64748b"
          transform={`rotate(-90,-35,${innerH/2})`}>{yLabel}</text>}
      </g>
    </svg>
  );
}

export function ChartCell({ cell }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-sm font-bold text-slate-800 mb-1">{cell.title}</h3>
      {cell.description && (
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">{cell.description}</p>
      )}
      <div className="bg-slate-50 rounded-lg p-3 overflow-x-auto">
        {cell.chartType === 'line' && (
          <LineChart data={cell.data} xLabel={cell.xLabel} yLabel={cell.yLabel} />
        )}
        {cell.chartType === 'bar' && (
          <BarChart data={cell.data} xLabel={cell.xLabel} yLabel={cell.yLabel} />
        )}
        {(cell.chartType === 'scatter' || cell.chartType === 'roc') && (
          <ScatterChart data={cell.data} xLabel={cell.xLabel} yLabel={cell.yLabel} />
        )}
      </div>
    </div>
  );
}
