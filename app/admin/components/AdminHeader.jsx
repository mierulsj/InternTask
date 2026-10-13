"use client";

import React from "react";
import Link from "next/link";

export default function AdminHeader({
    viewMode,
    adminSession,
    onLogout,
    activeTab = "students",
    onToggleDrawer,
}) {
    const tabTitles = {
        students: "Data Pelajar",
        notes: "Pengurusan Nota",
        quizzes: "Pengurusan Kuiz",
        spelling: "Spelling Bee",
    };

    const currentTitle = tabTitles[activeTab] || "Papan Pemuka";

    // Authentication screens header
    if (viewMode !== "dashboard") {
        return (
            <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between z-30 sticky top-0 shadow-xs text-left">
                <div className="flex items-center gap-3">
                    <img
                        src="/logoexploria.png"
                        alt="Logo Exploria"
                        className="h-8 sm:h-9 object-contain"
                    />
                    <div>
                        <h1 className="text-sm sm:text-base font-black text-slate-800">
                            Exploria Admin
                        </h1>
                        <span className="text-[10px] text-slate-500 font-bold block">
                            Portal Pengurusan Kandungan & Murid
                        </span>
                    </div>
                </div>

                <Link
                    href="/belajar"
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                    Portal Pelajar ↗
                </Link>
            </header>
        );
    }

    // Dashboard sticky top header
    return (
        <header className="w-full bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-xs text-left">
            <div className="flex items-center gap-3">
                {/* Drawer toggle button for mobile & tablet */}
                <button
                    type="button"
                    onClick={onToggleDrawer}
                    className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                    title="Buka Menu Drawer"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Breadcrumb Title */}
                <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                        <span>Papan Pemuka</span>
                        <span>/</span>
                        <span className="text-[#0099e5]">{currentTitle}</span>
                    </div>
                    <h1 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
                        {currentTitle}
                    </h1>
                </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2">
                <Link
                    href="/belajar"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                    <span>Portal Pelajar</span>
                    <span className="text-xs">↗</span>
                </Link>

                <div className="hidden md:flex items-center gap-2 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-sky-900">
                        {adminSession?.email}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onLogout}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer transition-colors flex items-center gap-1"
                >
                    <span>Log Keluar</span>
                </button>
            </div>
        </header>
    );
}
