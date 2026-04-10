// lib/agents/patron-orchestrator.ts
import { prisma } from '@/lib/prisma';

export interface AnalysisResult {
  viralScore: number;        // 0-100
  category: string;          // 'tiktok', 'sports', 'crypto' vb.
  contentType: string;       // 'video', 'challenge', 'event' vb.
  probabilityYes: number;    // 0-100
  suggestedMarketTitle: string;
  reason: string;
  estimatedViews: string;
  riskLevel: 'low' | 'medium' | 'high';
}

/**
 * Patron Ajan - Ana Orchestrator
 * TikTok veya sosyal linki alır, analiz eder ve prediction market için hazır veri döner
 */
export async function patronAnalyzeContent(url: string): Promise<AnalysisResult> {
  try {
    // 1. Basit URL parse (gerçekte qeeqbox/social-analyzer + Apify kullanılabilir)
    const isTikTok = url.includes('tiktok.com');

    if (!isTikTok) {
      throw new Error('Şu an sadece TikTok linkleri destekleniyor');
    }

    // 2. Dummy + Gerçekçi Analiz (Gemini çağrısı yok)
    // Gerçekte buraya pamela veya PredictOS agent'larını çağıracaksın
    const analysis: AnalysisResult = {
      viralScore: Math.floor(Math.random() * 35) + 65, // 65-100 arası gerçekçi skor
      category: 'tiktok',
      contentType: 'video',
      probabilityYes: Math.floor(Math.random() * 40) + 55, // 55-95
      suggestedMarketTitle: "Bu TikTok videosu 1 milyon izlenmeye ulaşır mı?",
      reason: "Trend ses kullanımı, yüksek etkileşim potansiyeli ve güncel challenge'a uyum. İzleyici kitlesi genç ve paylaşımcı.",
      estimatedViews: "850K - 2.1M",
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    };

    // 3. Veritabanına kaydet (opsiyonel - trace için)
    await prisma.contentAnalysis.create({
      data: {
        url,
        viralScore: analysis.viralScore,
        category: analysis.category,
        suggestedTitle: analysis.suggestedMarketTitle,
        rawResult: analysis as any,
      },
    });

    console.log(`✅ Patron Ajan analiz tamamlandı: ${url}`);
    return analysis;

  } catch (error: any) {
    console.error("Patron Ajan Error:", error);
    throw new Error(`Analiz sırasında hata: ${error.message}`);
  }
}
