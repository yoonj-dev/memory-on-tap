export type MemoryTicker = 'MU' | '000660' | '005930' | 'SNDK' | '285A';

export interface MemoryCompany {
  ticker: MemoryTicker;
  symbol: string; // e.g. "NASDAQ:MU", "KRX:000660", "TSE:285A"
  name: string; // Micron, SK hynix, Samsung Electronics, SanDisk, Kioxia
  koreanName: string;
  country: 'US' | 'KR' | 'JP';
  currency: 'USD' | 'KRW' | 'JPY';
  brandColor: string;
  badgeBg: string;
  
  // Market & Pricing (Local & USD Normalized)
  localPrice: number;
  localCurrencySymbol: string;
  localChange: number;
  localChangePercent: number;
  usdMarketCap: string; // e.g. "$125B", "$130B", "$350B"
  usdMarketCapVal: number; // in Billion USD
  
  // Multiples & Cycle
  trailingPE: number;
  forwardPE: number;
  pbr: number; // Price to Book (Key semiconductor cycle indicator)
  
  // Memory Segment Focus
  primaryFocus: 'HBM / DRAM' | 'Pure NAND Flash' | 'DRAM / HBM / NAND' | 'Integrated Tech';
  hbmMarketShare: number; // Percentage in HBM3E/HBM4 market (0 for NAND players)
  nandMarketShare: number; // Percentage in Enterprise SSD / NAND market
  
  // Strategic Alliance / Tech Moat
  techMoat: string;
  catalysts: string[];
}

export interface MemoryComparisonData {
  asOfDate: string;
  fxRates: {
    USDKRW: number; // e.g. 1380
    USDJPY: number; // e.g. 152
  };
  totalMemoryMarket: string; // "$190B"
  companies: Record<MemoryTicker, MemoryCompany>;
}
