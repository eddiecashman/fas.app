"use client";

import { useState } from "react";
import ScoreGauge from "@/components/ScoreGauge";

// Importera från dina faktiska filer i lib/scoring
import { interpolate } from "@/lib/scoring/interpolation";

export default function Home() {
  const [roic, setRoic] = useState<number>(15);
  const [pe, setPe] = useState<number>(20);

  // Enkel beräkning via din interpolationsfunktion
  const roicScore = interpolate(roic, [
    { x: 0, y: 0 },
    { x: 15, y: 70 },
    { x: 30, y: 100 },
  ]);

  const peScore = interpolate(pe, [
    { x: 10, y: 100 },
    { x: 25, y: 50 },
    { x: 50, y: 0 },
  ]);

  const totalScore = Math.round((roicScore + peScore) / 2);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center tracking-tight text-slate-100">
          Financial Analysis System (FAS)
        </h1>

        <div className="flex justify-center">
          <ScoreGauge score={totalScore} label="Totalt Betyg" />
        </div>

        <div className="space-y-4 bg-slate-950/50 p-6 rounded-lg border border-slate-800">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              ROIC (%): <span className="text-emerald-400 font-semibold">{roic}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={roic}
              onChange={(e) => setRoic(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              P/E-tal: <span className="text-emerald-400 font-semibold">{pe}</span>
            </label>
            <input
              type="range"
              min="5"
              max="60"
              value={pe}
              onChange={(e) => setPe(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      </div>
    </main>
  );
}