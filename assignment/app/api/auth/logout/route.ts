// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const supabase = await createClient();

  await supabase.auth.signOut();
  return NextResponse.redirect('/login');
}
