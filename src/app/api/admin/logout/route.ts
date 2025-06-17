import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Remove o cookie admin_token
  cookies().delete('admin_token');
  return NextResponse.json({ success: true });
} 