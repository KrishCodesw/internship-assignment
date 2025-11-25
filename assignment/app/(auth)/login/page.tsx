'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './actions';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl text-black">
            Login
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-2.5 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700">
            Don't have an account?{' '}
            <Link href="/signup" className="text-gray-900 hover:underline font-medium">
              Signup
            </Link>
          </label>
            <Link href="/" className="text-gray-900 hover:underline font-medium">
Back
            </Link>
        </div>
      </div>
    </div>
  );
}
