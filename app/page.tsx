"use client";

import { useState } from "react";
import ScoreGauge from "@/components/ScoreGauge";

// 1. Importera beräkningsfunktioner/typer från dina 5 filer i lib/scoring
import { calculateRoicScore } from "@/lib/scoring/roic";
import { calculateGrowthScore } from "@/lib/scoring/growth";
import { calculateValuationScore } from "@/lib/scoring/valuation";
import { calculateDebtScore } from "@/lib/scoring/debt";

export default function Home() {
  // Tillstånd för respektive nyckeltal
  const [roic, setRoic] = useState<number>(15);
  const [growth, setGrowth] = useState<number>(10);
  const [pe, setPe] = useState<number>(20);
  const [netDebt, setNetDebt] = useState<number>(1.5);

  // 2. Anropa beräkningsfunktionerna från lib/scoring
  const roicScore = calculateRoicScore ? calculateRoicScore(roic) : roic * 2.5;
  const growthScore = calculateGrowthScore ? calculateGrowthScore(growth) : growth * 3;
  const valuationScore = calculateValuationScore ? calculateValuationScore(pe) : 100 - pe;
  const debtScore = calculateDebtScore ? calculateDebtScore(netDebt) : 100 - netDebt * 10;

  // Sammanlagt viktat betyg (0-100)
  const totalScore = Math.round(
    roicScore * 0.35 +
    growthScore * 0.25 +
    valuationScore * 0.20 +
    debtScore * 0.20
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl space-y-8">
        <h1 className="text-3xl font-bold text-center tracking-tight text-slate-100">
          Financial Analysis System (FAS)
        </h1>

        {/* Huvudmätare för Totalpoäng */}
        <div className="flex justify-center">
          <ScoreGauge score={totalScore} label="Totalt Betyg" />
        </div>

        {/* Inmatningsfält för de olika nyckeltalen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/50 p-6 rounded-lg border border-slate-800">
          {/* ROIC */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">ROIC (%)</span>
              <span className="text-emerald-400 font-semibold">{roic}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={roic}
              onChange={(e) => setRoic(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="text-xs text-slate-500 text-right">Delpoäng: {Math.round(roicScore)}</div>
          </div>

          {/* Tillväxt */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">Vinsttillväxt (%)</span>
              <span className="text-emerald-400 font-semibold">{growth}%</span>
            </div>
            <input
              type="range"
              min="-10"
              max="40"
              value={growth}
              onChange={(e) => setGrowth(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="text-xs text-slate-500 text-right">Delpoäng: {Math.round(growthScore)}</div>
          </div>

          {/* P/E-tal */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">P/E-tal</span>
              <span className="text-emerald-400 font-semibold">{pe}</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={pe}
              onChange={(e) => setPe(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="text-xs text-slate-500 text-right">Delpoäng: {Math.round(valuationScore)}</div>
          </div>

          {/* Skuldsättning */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">Nettoskuld / EBITDA</span>
              <span className="text-emerald-400 font-semibold">{netDebt}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.1"
              value={netDebt}
              onChange={(e) => setNetDebt(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="text-xs text-slate-500 text-right">Delpoäng: {Math.round(debtScore)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}