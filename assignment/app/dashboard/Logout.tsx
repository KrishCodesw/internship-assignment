// app/dashboard/LogoutButton.tsx
"use client";

import React from "react";
import { logout } from "../api/auth/logout/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="w-full px-5 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-md font-medium hover:bg-gray-50 transition-colors duration-150"
      >
        Logout
      </button>
    </form>
  );
}
