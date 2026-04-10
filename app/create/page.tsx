'use client';

import { useState } from 'react';
import { Sparkles, Link as LinkIcon, AlertCircle, TrendingUp, Target, Eye, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateMarketPage() {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');
    setMarketData(null);
    
    if (!tiktokUrl) {
      setError("Lütfen geçerli bir TikTok veya sosyal medya linki girin.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/analyze-tiktok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: tiktokUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error?.message || errorData.message || "Analiz başarısız oldu.");
      }

      const data = await res.json();
      setMarketData(data);
    } catch (error: any) {
      console.error("Handle Generate Error:", error);
      setError(error.message || "Bilinmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto min-h-screen pt-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl mb-4 shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Yeni Tahmin Piyasası</h1>
        <p className="text-slate-500 text-sm">Sosyal medya linkini yapıştırın, yapay zeka analiz edip piyasayı oluştursun.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-5 mb-6 shadow-sm">
        <label className="block text-sm font-semibold text-slate-700 mb-3">İçerik Bağlantısı (URL)</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={tiktokUrl}
            onChange={(e) => setTiktokUrl(e.target.value)}
            placeholder="https://tiktok.com/@kullanici/video/..."
            className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-5 w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Yapay Zeka ile Analiz Et
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {marketData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-8"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Analiz Sonucu</h2>
              <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${marketData.viralScore > 80 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                <TrendingUp className="w-3.5 h-3.5" />
                Viral Skor: {marketData.viralScore}/100
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Target className="w-3.5 h-3.5" /> Önerilen Piyasa Başlığı
                </label>
                <p className="text-base font-semibold text-slate-900 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {marketData.suggestedMarketTitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                  <label className="text-[11px] text-blue-500 font-bold uppercase tracking-wider mb-1 block">Evet Olasılığı</label>
                  <p className="text-2xl font-black text-blue-600">%{marketData.probabilityYes}</p>
                </div>
                <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                  <label className="text-[11px] text-purple-500 font-bold uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Tahmini İzlenme
                  </label>
                  <p className="text-xl font-bold text-purple-600 mt-1">{marketData.estimatedViews}</p>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Yapay Zeka Gerekçesi
                </label>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {marketData.reason}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Risk Seviyesi: <strong className="capitalize text-slate-700">{marketData.riskLevel}</strong></span>
              </div>

              <button className="w-full py-4 px-4 rounded-2xl text-sm font-bold text-slate-900 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all">
                Piyasayı Blockchain'e Dağıt
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

