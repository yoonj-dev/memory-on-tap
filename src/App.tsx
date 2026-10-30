import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { MemoryBattlegroundHero } from './components/dashboard/MemoryBattlegroundHero';
import { MemorySetMenuWorkspace } from './components/dashboard/MemorySetMenuWorkspace';
import { TradingViewMemoryComparison } from './components/dashboard/TradingViewMemoryComparison';
import { Footer } from './components/layout/Footer';
import { Theme, getInitialTheme, applyThemeToDom, resolveTheme } from './lib/theme';
import { MemoryTicker } from './types/memory';
import { INITIAL_MEMORY_DATA } from './data/memoryData';

export const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<Theme>(getInitialTheme());
  const [memoryData, setMemoryData] = useState(INITIAL_MEMORY_DATA);
  const [activeTicker, setActiveTicker] = useState<MemoryTicker>('MU');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    applyThemeToDom(themeMode);
    setEffectiveTheme(resolveTheme(themeMode));

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        applyThemeToDom('auto');
        setEffectiveTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [themeMode]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate micro price movements
      setMemoryData((prev) => {
        const next = { ...prev };
        const randVariation = (Math.random() - 0.48) * 0.5;
        const current = next.companies[activeTicker];
        const newPrice = Number((current.localPrice + (current.currency === 'KRW' ? randVariation * 500 : current.currency === 'JPY' ? randVariation * 10 : randVariation)).toFixed(2));
        next.companies[activeTicker] = {
          ...current,
          localPrice: newPrice,
        };
        return next;
      });
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors selection:bg-emerald-500 selection:text-white">
      <Header 
        currentTheme={themeMode} 
        onThemeChanged={setThemeMode}
        companies={memoryData.companies}
        activeTicker={activeTicker}
        onSelectTicker={setActiveTicker}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Memory Overview Battleground Hero */}
        <MemoryBattlegroundHero 
          data={memoryData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Set-Menu Deep Analysis Workspace */}
        <MemorySetMenuWorkspace 
          data={memoryData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Normalized TradingView Comparison */}
        <TradingViewMemoryComparison theme={effectiveTheme} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
