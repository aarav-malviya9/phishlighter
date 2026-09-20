import { NextResponse } from 'next/server';
import { analyzeEmail } from '@/lib/analyzer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { emailText, sampleId } = body;

    if (!emailText || typeof emailText !== 'string' || emailText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide email text to analyze.' },
        { status: 400 }
      );
    }

    if (emailText.length > 10000) {
      return NextResponse.json(
        { error: 'Email text is too long. Please limit to 10,000 characters.' },
        { status: 400 }
      );
    }

    const result = await analyzeEmail(emailText.trim(), { sampleId });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
