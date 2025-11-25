"use client"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-3">
          <h1 className="text-3xl  tracking-tight text-black dark:text-white">
            Authentication flow
          </h1>
          <p className="text-black dark:text-white text-base">
            Next.js + Supabase
          </p>
          <p className="text-black dark:text-white text-sm">
          A fully functional user authentication flow using Next.js and Supabase auth, including signup, login, logout, 
          protected routes along with profile update feature.
          </p>
          <p className="text-black dark:text-white text-base">
          All tasks were completed and executed.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/signup')}
            className="w-full px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-150"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-5 py-2.5 text-gray-700 dark:text-white rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 border border-gray-300 dark:border-gray-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
