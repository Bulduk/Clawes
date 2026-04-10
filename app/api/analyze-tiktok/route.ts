import { NextResponse } from 'next/server';
import { patronAnalyzeContent } from '@/lib/agents/patron-orchestrator';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: { message: 'URL is required' } }, { status: 400 });
    }

    const result = await patronAnalyzeContent(url);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: { message: error.message || 'Internal Server Error' } },
      { status: 500 }
    );
  }
}
