"use client";

import React from "react";
import Link from "next/link";

export default function AdminHeader({
    viewMode,
    adminSession,
    onLogout,
}) {
    return (
        <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex items-center justify-between z-30 sticky top-0 shadow-xs">
            <div className="flex items-center gap-3">
                <img
                    src="/logoexploria.png"
                    alt="Logo Exploria"
                    className="h-8 sm:h-9 object-contain drop-shadow-xs"
                />
                <div className="flex items-center gap-2">
                    <h1 className="text-sm sm:text-base font-black text-slate-800">
                        Admin Panel
                    </h1>
                    {viewMode === "dashboard" && (
                        <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 hidden sm:inline-block">
                            {adminSession?.email}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Link
                    href="/belajar"
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                    Portal Pelajar ↗
                </Link>
                {viewMode === "dashboard" && (
                    <button
                        type="button"
                        onClick={onLogout}
                        className="text-xs font-bold text-red-600 hover:text-red-700 px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer transition-colors"
                    >
                        Log Keluar
                    </button>
                )}
            </div>
        </header>
    );
}
