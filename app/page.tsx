"use client";

import { useState } from "react";
import ScoreGauge from "@/components/ScoreGauge";

export default function Home() {
  const [roic, setRoic] = useState<number>(15);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center tracking-tight text-slate-100">
          Financial Analysis System (FAS)
        </h1>
        <p className="text-sm text-slate-400 text-center">
          Inmatning och utvärdering av nyckeltal
        </p>

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

        <div className="flex justify-center pt-4">
          <ScoreGauge score={roic * 2.5} label="Avkastningspoäng" />
        </div>
      </div>
    </main>
  );
}