export function extractFileId(url: string): string {
  const match = url.match(/file\/([a-zA-Z0-9]+)/);
  return match ? match[1] : '';
}

export async function getFigmaFile(fileId: string) {
  // Implementação da função para obter dados do arquivo Figma
  // Exemplo: const response = await fetch(`https://api.figma.com/v1/files/${fileId}`);
  // return response.json();
  return { fileId };
} 