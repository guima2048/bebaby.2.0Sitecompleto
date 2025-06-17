import { Client } from 'figma-js';

// Initialize Figma client
const client = Client({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN,
});

export async function getFigmaFile(fileId: string) {
  try {
    const file = await client.file(fileId);
    return file.data;
  } catch (error) {
    console.error('Error fetching Figma file:', error);
    throw error;
  }
}

export async function getFigmaNodes(fileId: string, nodeIds: string[]) {
  try {
    const nodes = await client.fileNodes(fileId, { ids: nodeIds });
    return nodes.data;
  } catch (error) {
    console.error('Error fetching Figma nodes:', error);
    throw error;
  }
}

// Extract file ID from Figma URL
export function extractFileId(url: string): string {
  const match = url.match(/file\/([a-zA-Z0-9]+)/);
  if (!match) {
    throw new Error('Invalid Figma URL');
  }
  return match[1];
} 