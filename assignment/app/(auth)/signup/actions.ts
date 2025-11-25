"use server";

import { createClient } from "@/lib/supabaseServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase =await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("fullName") as string;

  if (!email || !password) return { error: "Email and password are required" };

  // 1️⃣ Create Auth user
  const { data, error: signError } = await supabase.auth.signUp({ email, password });

  if (signError) return { error: signError.message };
  if (!data.user) return { error: "User creation failed" };

  const user = data.user;

  // 2️⃣ Insert profile row
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: user.id, full_name, created_at: new Date() });

  if (profileError) return { error: profileError.message };

  // 3️⃣ Redirect to dashboard
  redirect("/dashboard");
}
