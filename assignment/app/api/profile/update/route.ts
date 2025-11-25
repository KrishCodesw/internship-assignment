import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const form = await req.formData();
  const full_name = form.get('full_name') as string;

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.redirect('/login');

  // upsert: creates if not exists, updates if exists
  await supabase
    .from('profiles')
    .upsert({
      id: session.user.id,
      full_name,
      updated_at: new Date().toISOString(),
    });

  return NextResponse.redirect('/profile');
}
