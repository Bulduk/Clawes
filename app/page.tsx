import Link from 'next/link';
import { TrendingUp, Clock, Flame, Activity } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 max-w-lg mx-auto pt-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">PredictOS</h1>
          <p className="text-sm text-slate-500 font-medium">Social Prediction Market</p>
        </div>
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl text-sm font-bold text-slate-700 flex items-center gap-2 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          $1,240.50
        </div>
      </header>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <Flame className="w-5 h-5 text-orange-500"/> Popüler Piyasalar
          </h2>
          <Link href="/market" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Tümü</Link>
        </div>
        
        <div className="space-y-4">
          <MarketCard
            id="1"
            title="Bu TikTok videosu 24 saatte 1M izlenmeyi geçer mi?"
            category="TikTok"
            volume="$45,200"
            yesPrice="65¢"
            noPrice="35¢"
            time="12s kaldı"
            trend="up"
          />
          <MarketCard
            id="2"
            title="BTC bu hafta $100k seviyesini kırar mı?"
            category="Kripto"
            volume="$1.2M"
            yesPrice="82¢"
            noPrice="18¢"
            time="3g kaldı"
            trend="up"
          />
          <MarketCard
            id="3"
            title="MrBeast'in yeni videosu ilk gün 50M izlenir mi?"
            category="YouTube"
            volume="$89,400"
            yesPrice="45¢"
            noPrice="55¢"
            time="8s kaldı"
            trend="down"
          />
        </div>
      </section>
    </main>
  );
}

function MarketCard({ id, title, category, volume, yesPrice, noPrice, time, trend }: any) {
  return (
    <Link href={`/bet/${id}`} className="block">
      <div className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">{category}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium bg-slate-50 px-2 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5"/> {time}
          </span>
        </div>
        
        <h3 className="text-base font-bold mb-4 text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{title}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            Hacim: <span className="text-slate-900">{volume}</span>
          </span>
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
          )}
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-2xl py-3 font-bold flex justify-between px-4 transition-colors">
            <span>Evet</span>
            <span>{yesPrice}</span>
          </button>
          <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-2xl py-3 font-bold flex justify-between px-4 transition-colors">
            <span>Hayır</span>
            <span>{noPrice}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

