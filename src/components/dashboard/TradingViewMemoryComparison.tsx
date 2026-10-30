import React, { useEffect, useRef } from 'react';
import { LineChart, ExternalLink } from 'lucide-react';

interface TradingViewMemoryComparisonProps {
  theme?: 'light' | 'dark';
}

export const TradingViewMemoryComparison: React.FC<TradingViewMemoryComparisonProps> = ({ theme = 'light' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        ['Micron (MU)', 'NASDAQ:MU|1D'],
        ['SK hynix (000660)', 'KRX:000660|1D'],
        ['Samsung Elec (005930)', 'KRX:005930|1D'],
        ['SanDisk (SNDK)', 'NASDAQ:SNDK|1D'],
        ['Kioxia (285A)', 'TSE:285A|1D']
      ],
      chartOnly: false,
      width: '100%',
      height: 480,
      locale: 'kr',
      colorTheme: theme,
      autosize: true,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Percentage',
      fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      headerFontSize: 'medium',
      lineType: 0,
      dateRanges: [
        '1d|1',
        '1m|30',
        '3m|60',
        '12m|1D',
        '60m|1W',
        'all|1M'
      ]
    });

    containerRef.current.appendChild(script);
  }, [theme]);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <LineChart className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              글로벌 메모리 5강 수익률 상대 강도 비교
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            동일 시점 기준 % 수익률 정규화 차트 (MU vs SK하이닉스 vs 삼전 vs SNDK vs 키오시아)
          </p>
        </div>
        <a
          href="https://kr.tradingview.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors self-start sm:self-auto"
        >
          <span>TradingView 제공</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="w-full min-h-[480px] rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/40">
        <div ref={containerRef} className="tradingview-widget-container w-full h-[480px]" />
      </div>
    </div>
  );
};
