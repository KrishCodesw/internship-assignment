'use client';
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [full_name, setfullname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
   
      const { data, error: signError } = await supabase.auth.signUp({ email, password, options: { data: { full_name } } });
      if (signError) throw signError;

      router.push('/dashboard'); // redirect on success
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl  text-black">
            Sign up
          </h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              value={full_name}
              onChange={e => setfullname(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            {loading ? 'Signing up…' : 'Sign up'}
          </button>
        </form>
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700">
            Already have an account?{' '}
            <Link href="/login" className="text-gray-900 hover:underline font-medium">
              Login
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
