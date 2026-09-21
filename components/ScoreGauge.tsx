"use client";

interface ScoreGaugeProps {
  score: number;
  label?: string;
}

export default function ScoreGauge({ score, label = "Poäng" }: ScoreGaugeProps) {
  const normalizedScore = Math.min(Math.max(score, 0), 100);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
      <div className="text-4xl font-extrabold text-emerald-400">
        {Math.round(normalizedScore)}
      </div>
      <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}