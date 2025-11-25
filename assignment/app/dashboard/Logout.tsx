// app/dashboard/LogoutButton.tsx
"use client";

import React from "react";
import { logout } from "../api/auth/logout/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="w-full px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
      >
        Logout
      </button>
    </form>
  );
}
