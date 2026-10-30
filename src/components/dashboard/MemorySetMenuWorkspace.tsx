import React, { useState } from 'react';
import {
  Cpu,
  Database,
  Layers,
  ArrowRightLeft,
  Zap,
  BarChart2,
  TrendingUp,
} from 'lucide-react';
import { MemoryComparisonData, MemoryTicker, MemoryCompany } from '../../types/memory';

interface MemorySetMenuWorkspaceProps {
  data: MemoryComparisonData;
  activeTicker: MemoryTicker;
  onSelectTicker: (t: MemoryTicker) => void;
}

export const MemorySetMenuWorkspace: React.FC<MemorySetMenuWorkspaceProps> = ({
  data,
  activeTicker,
}) => {
  const [activeTab, setActiveTab] = useState<'hbm' | 'nand' | 'cycles' | 'alliance'>('hbm');
  const companiesList = Object.values(data.companies);
  const current = data.companies[activeTicker];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-8">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Silicon Analytics
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Global Memory Set-Menu
            </span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            메모리 5강 전술 비교 분석실
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            DRAM 3사(삼성·하이닉스·마이크론) & NAND 플래시 2사(샌디스크·키오시아) 기술 해자 및 밸류에이션 스프레드
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('hbm')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'hbm'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            HBM3E/HBM4 공급망
          </button>
          <button
            onClick={() => setActiveTab('nand')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'nand'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            NAND 플래시 & eSSD
          </button>
          <button
            onClick={() => setActiveTab('cycles')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'cycles'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            PBR 멀티플 & 사이클
          </button>
          <button
            onClick={() => setActiveTab('alliance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'alliance'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            미·일·한 반도체 동맹
          </button>
        </div>
      </div>

      {/* Tab 1: HBM3E / HBM4 Supply Chain Dominance */}
      {activeTab === 'hbm' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/30 dark:bg-red-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">SK하이닉스</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  점유율 53% (절대 1위)
                </span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                <p>• 엔비디아 Blackwell B200용 12단 HBM3E 메인 벤더</p>
                <p>• 어드밴스드 MR-MUF 기술로 열 방출 및 수율 우위 독점</p>
                <p>• TSMC 파운드리와 HBM4 베이스 다이 원팀 협력 가동</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">삼성전자</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  점유율 25% (추격전)
                </span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                <p>• 12단 HBM3E 엔비디아 퀄 승인 막바지 단계</p>
                <p>• 자체 파운드리 4nm/3nm 공정을 활용한 HBM4 턴키 솔루션</p>
                <p>• 세계 최대 D램 캐파 바탕으로 대량 양산 전환 시 파급력 최대</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/30 dark:bg-sky-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">마이크론 (MU)</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                  점유율 22% (다크호스)
                </span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                <p>• H200용 24GB 8단 HBM3E 최초 양산 인증 획득</p>
                <p>• 미국 정부 CHIPS Act 61억 달러 보조금으로 자국 패키징 시설 구축</p>
                <p>• 1베타(1-beta) nm 미세공정으로 경쟁사 대비 전력 효율 30% 개선</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-500" />
              차세대 HBM4 규격 격변 (Custom Base Die)
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              HBM4부터는 2,048비트 인터페이스로 대역폭이 2배 확장되며 베이스 다이(Base Die)를 기존 메모리 공정이 아닌 첨단 파운드리 로직 공정(TSMC 3nm/5nm 또는 삼성 4nm)으로 제작해야 합니다. 이는 SK하이닉스-TSMC 연합과 삼성전자 자체 턴키 파운드리 간의 거대한 승부처가 될 것입니다.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: NAND Flash & Enterprise SSD */}
      {activeTab === 'nand' && (
        <div className="mt-6 space-y-6">
          <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3 font-semibold">기업 (티커)</th>
                  <th className="p-3 font-semibold">NAND 시장 점유율</th>
                  <th className="p-3 font-semibold">핵심 기술 스택</th>
                  <th className="p-3 font-semibold">AI eSSD 포지셔닝</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">삼성전자 (005930)</td>
                  <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">36.5% (1위)</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">V9 QLC 290단 V-NAND</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">초고용량 64TB/128TB PCIe 5.0 SSD 독점 양산</td>
                </tr>
                <tr className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">SK하이닉스 + 솔리다임 (000660)</td>
                  <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">19.8% (2위)</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">솔리다임 플로팅 게이트 QLC</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">빅테크 데이터센터 QLC eSSD 공급 1위 급부상</td>
                </tr>
                <tr className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">샌디스크 (SNDK - WDC 분사)</td>
                  <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">14.8% (3위 연합)</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">BiCS8 218단 3D NAND</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">키오시아 조인트벤처 팹 활용 제조원가 절감</td>
                </tr>
                <tr className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">키오시아 (285A)</td>
                  <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">14.2% (4위 연합)</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">CBA (CMOS directly Bonded to Array)</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">도쿄 상장으로 설비투자 여력 복원, AI 스토리지 확장</td>
                </tr>
                <tr className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">마이크론 (MU)</td>
                  <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">11.5% (5위)</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">232단 TLC/QLC NAND</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">고효율 클라우드 SSD 클러스터 위주 선별 수주</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-purple-500" />
              AI 학습 데이터 폭증과 QLC 고용량 eSSD 슈퍼사이클
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              과거 AI 모델이 GPU 연산(HBM/DRAM)에 집중되었다면, 멀티모달 데이터(비디오, 고해상도 이미지) 학습량이 급증하면서 저전력 고용량(64TB+) QLC eSSD가 전력 소모가 극심한 HDD를 급속도로 대체하고 있습니다. 이 시장은 솔리다임(SK하이닉스 자회사)과 삼성전자가 80% 이상을 과점하고 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: PBR Multiples & Cycle */}
      {activeTab === 'cycles' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {companiesList.map((comp: MemoryCompany) => (
              <div
                key={comp.ticker}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">{comp.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    {comp.ticker}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">PBR (주가순자산비율)</span>
                    <span className={`text-base font-extrabold font-mono ${comp.pbr < 1.0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {comp.pbr}x
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">12M 선행 P/E</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono">{comp.forwardPE}x</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">USD 정규화 시총</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono">{comp.usdMarketCap}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50">
            <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200 mb-1 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              메모리 반도체 사이클 투자 공식: '고PER 저PBR에 사서, 저PER 고PBR에 팔아라'
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
              메모리 산업은 강한 사이클 특성을 지닙니다. 적자 국면이나 실적 악화기(고PER 또는 적자)에는 주가가 PBR 1.0x 안팎(역사적 청산가치 수준)으로 수렴하며 이때가 바닥 매수 기회입니다. 반대로 사상 최대 실적 발표 시기(낮은 PER, 높은 PBR 2.0x+)는 공급 과잉 우려로 피크아웃 리스크가 발생합니다.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: US-Japan-Korea Semiconductor Alliance */}
      {activeTab === 'alliance' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  SanDisk (미국) × Kioxia (일본) 낸드 혈맹
                </h4>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
                샌디스크(웨스턴디지털 플래시 분사)와 키오시아(구 도시바 메모리)는 25년 이상 일본 욧카이치(Yokkaichi) 및 기타카미(Kitakami) 공장을 공동 출자(50:50 Joint Venture)하여 운영 중입니다. 단일 기업으로는 삼성전자에 맞서기 어렵지만, 양사 합산 점유율은 약 29%에 달해 삼성(36.5%)과 대등하게 경쟁하는 세계 2위 낸드 동맹체입니다.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-sky-500" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  SK하이닉스 (한국) × TSMC (대만) × NVIDIA (미국) 삼각편대
                </h4>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
                엔비디아의 AI 가속기 생태계를 지탱하는 핵심 삼각동맹입니다. SK하이닉스가 HBM3E를 공급하고, TSMC의 CoWoS(Chip-on-Wafer-on-Substrate) 어드밴스드 패키징 공정에서 엔비디아의 GPU 다이와 인터포저로 원스톱 결합됩니다. 3사는 HBM4 규격 표준화에서도 Co-development를 진행하며 독점적 해자를 구축하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Company Footnote */}
      <div className="mt-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            선택된 기업: {current.name} ({current.koreanName})
          </h4>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {current.symbol} · {current.country}
          </span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {current.techMoat}
        </p>
      </div>
    </div>
  );
};
