// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { LogoutButton } from "./Logout";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", session.user.id)
    .single();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl text-black ">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-medium text-gray-900">{profile?.full_name ?? session.user.email}</span>
          </p>
        </div>

        <div className="  rounded-md p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="text-black">{session.user.email}</p>
          </div>

          {profile?.full_name && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <p className="text-gray-900">{profile.full_name}</p>
            </div>
          )}

          {profile?.created_at && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Member Since
              </label>
              <p className="text-gray-900">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Link
            href="/profile"
            className="w-full block px-5 py-2.5 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors duration-150 text-center"
          >
            Edit Profile
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
