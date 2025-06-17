import { NextResponse } from 'next/server';
import { roadmapItems } from '../../../../data/roadmap';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { itemId } = await request.json();
    const item = roadmapItems.find(i => i.id === itemId);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Add approval comment to all related files
    for (const file of item.files) {
      try {
        const filePath = path.join(process.cwd(), file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Add approval comment if it doesn't exist
        if (!content.includes('// 🔒 Aprovado por admin')) {
          const newContent = `// 🔒 Aprovado por admin – Não alterar sem autorização\n${content}`;
          await fs.writeFile(filePath, newContent);
        }
      } catch (error) {
        console.error(`Error updating file ${file}:`, error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in approval route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 