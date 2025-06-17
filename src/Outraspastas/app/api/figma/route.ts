import { NextResponse } from 'next/server';
import { getFigmaFile, extractFileId } from '@/app/utils/figma';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'Figma URL is required' },
        { status: 400 }
      );
    }

    const fileId = extractFileId(url);
    const figmaData = await getFigmaFile(fileId);

    return NextResponse.json({ data: figmaData });
  } catch (error) {
    console.error('Error in Figma import:', error);
    return NextResponse.json(
      { error: 'Failed to import Figma design' },
      { status: 500 }
    );
  }
} 