import React, { useRef, useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import { MemoryComparisonData, MemoryTicker } from '../../types/memory';

interface MemoryBattlegroundHeroProps {
  data: MemoryComparisonData;
  activeTicker: MemoryTicker;
  onSelectTicker: (t: MemoryTicker) => void;
}

export const MemoryBattlegroundHero: React.FC<MemoryBattlegroundHeroProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const { companies, totalMemoryMarket } = data;
  const current = companies[activeTicker];

  const prevPriceRef = useRef<number>(current.localPrice);
  const [glow, setGlow] = useState<'UP' | 'DOWN' | null>(null);

  useEffect(() => {
    if (prevPriceRef.current !== current.localPrice && prevPriceRef.current > 0) {
      setGlow(current.localPrice > prevPriceRef.current ? 'UP' : 'DOWN');
      const timer = setTimeout(() => setGlow(null), 1200);
      prevPriceRef.current = current.localPrice;
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = current.localPrice;
  }, [current.localPrice]);

  return (
    <div className="fintech-card p-4 sm:p-6 space-y-6">
      {/* 1. Header Info & Market Total */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <Cpu className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
              글로벌 메모리 반도체 5강 밸류에이션 비교
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
            <span>글로벌 메모리 시장 규모</span>
            <span className="font-bold text-slate-800 dark:text-zinc-200">{totalMemoryMarket}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono">
              환율: 1USD = ₩{data.fxRates.USDKRW} / ¥{data.fxRates.USDJPY}
            </span>
          </div>
        </div>

        {/* Proportional Market Cap Stacked Bar (USD Normalized) */}
        <div className="space-y-1">
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
            {(Object.keys(companies) as MemoryTicker[]).map((ticker) => {
              const comp = companies[ticker];
              const totalCap = Object.values(companies).reduce((acc, c) => acc + c.usdMarketCapVal, 0);
              const pct = (comp.usdMarketCapVal / totalCap) * 100;
              return (
                <div
                  key={ticker}
                  onClick={() => onSelectTicker(ticker)}
                  title={`${comp.name}: ${comp.usdMarketCap} (${pct.toFixed(1)}%)`}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: comp.brandColor,
                  }}
                  className={`cursor-pointer transition-opacity hover:opacity-80 ${
                    activeTicker === ticker ? 'ring-2 ring-white dark:ring-zinc-950 z-10' : ''
                  }`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500">
            <span>시총 비중 (USD 정규화 합계: ${(Object.values(companies).reduce((acc, c) => acc + c.usdMarketCapVal, 0)).toFixed(1)}B)</span>
            <span>삼성전자(49%) · 마이크론(24%) · SK하이닉스(19%) · 샌디스크(5%) · 키오시아(3%)</span>
          </div>
        </div>
      </div>

      {/* 2. 5-Player Quick Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(Object.keys(companies) as MemoryTicker[]).map((ticker) => {
          const comp = companies[ticker];
          const isSelected = activeTicker === ticker;
          const isPos = comp.localChangePercent >= 0;

          return (
            <button
              key={ticker}
              type="button"
              onClick={() => onSelectTicker(ticker)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500/30'
                  : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 truncate">
                  {comp.name}
                </span>
                <span className="text-[10px] px-1 rounded font-mono font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                  {comp.country}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-black font-mono text-slate-900 dark:text-zinc-100">
                  {comp.localCurrencySymbol}{comp.localPrice.toLocaleString()}
                </span>
                <span className={`text-[10px] font-bold flex items-center ${isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isPos ? '+' : ''}{comp.localChangePercent.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-zinc-400 mt-1.5 pt-1.5 border-t border-slate-100 dark:border-zinc-800">
                <span>USD 시총</span>
                <span className="font-semibold text-slate-700 dark:text-zinc-300">{comp.usdMarketCap}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Spotlight of Active Memory Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: current.brandColor }} />
                <h3 className="text-xl font-black text-slate-900 dark:text-zinc-100">
                  {current.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 font-bold">
                  {current.symbol}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                {current.koreanName} · {current.primaryFocus}
              </p>
            </div>

            <div className={`p-2 rounded-xl transition-colors duration-700 ${
              glow === 'UP' ? 'bg-emerald-500/20' : glow === 'DOWN' ? 'bg-red-500/20' : 'bg-transparent'
            }`}>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-zinc-100">
                  {current.localCurrencySymbol}{current.localPrice.toLocaleString()}
                </span>
                <span className={`text-sm font-bold flex items-center ${
                  current.localChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {current.localChange >= 0 ? <TrendingUp className="w-4 h-4 mr-0.5" /> : <TrendingDown className="w-4 h-4 mr-0.5" />}
                  {current.localChange >= 0 ? '+' : ''}{current.localChange.toLocaleString()} ({current.localChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Core Moat Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              핵심 해자 & 기술 포지셔닝
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              {current.techMoat}
            </p>
          </div>

          {/* Key Catalysts Bullets */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              주요 주가 촉매 (Key Catalysts)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {current.catalysts.map((cat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 font-medium flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valuation & Multiples Pillar */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/40 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              밸류에이션 & 사이클 지표
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">USD 기준 시가총액</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">{current.usdMarketCap}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">PBR (주가순자산비율)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{current.pbr}x</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">12M 선행 P/E (Fwd P/E)</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">{current.forwardPE}x</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="text-slate-600 dark:text-zinc-400">HBM 글로벌 점유율</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">
                  {current.hbmMarketShare > 0 ? `${current.hbmMarketShare}%` : 'N/A (낸드 집중)'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-zinc-400">NAND 글로벌 점유율</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">{current.nandMarketShare}%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>PBR 1.0x 하회는 역사적 사이클 저점 바닥 국면을 시사합니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
