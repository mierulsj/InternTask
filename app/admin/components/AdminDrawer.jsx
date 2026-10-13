"use client";

import React from "react";
import Link from "next/link";

export default function AdminDrawer({
    isOpen = false,
    onClose,
    activeTab,
    setActiveTab,
    studentsCount = 0,
    topicsCount = 0,
    totalQuestions = 0,
    spellingWordsCount = 0,
    adminSession = null,
    onLogout,
    onOpenSettings,
}) {
    const navItems = [
        {
            id: "students",
            label: "Data Pelajar",
            icon: "👥",
            badge: studentsCount,
        },
        {
            id: "notes",
            label: "Pengurusan Nota",
            icon: "📖",
            badge: topicsCount,
        },
        {
            id: "quizzes",
            label: "Pengurusan Kuiz",
            icon: "⚡",
            badge: totalQuestions,
        },
        {
            id: "spelling",
            label: "Spelling Bee",
            icon: "🐝",
            badge: spellingWordsCount,
        },
    ];

    const drawerContent = (
        <div className="flex flex-col h-full justify-between bg-white text-left select-none">
            {/* Upper Section */}
            <div className="p-4 space-y-6">
                {/* Brand / Logo Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logoexploria.png"
                            alt="Exploria Logo"
                            className="h-9 w-auto object-contain"
                        />
                        <div>
                            <span className="text-xs font-black uppercase text-[#0099e5] tracking-wider block">
                                Exploria STEM
                            </span>
                            <h2 className="text-sm font-black text-slate-800 leading-tight">
                                Panel Pentadbir
                            </h2>
                        </div>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                        title="Tutup Menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Menu */}
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-2">
                        Menu Utama
                    </span>

                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setActiveTab(item.id);
                                    if (onClose) onClose();
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-[#0099e5] text-white shadow-sm"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="text-base">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                                <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-slate-100 text-slate-600 font-bold"
                                    }`}
                                >
                                    {item.badge}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Pautan Pantas */}
                <div className="pt-2 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-2">
                        Pautan Pantas
                    </span>
                    <Link
                        href="/belajar"
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors border border-slate-100"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="text-base">🚀</span>
                            <span>Portal Pelajar</span>
                        </div>
                        <span className="text-slate-400 text-xs">↗</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Admin Profile & Logout Section */}
            <div className="p-4 border-t border-slate-100 space-y-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#0099e5] text-white flex items-center justify-center font-black text-xs shadow-xs">
                                👤
                            </div>
                            <div className="overflow-hidden">
                                <span className="text-xs font-black text-slate-800 block truncate max-w-[130px]">
                                    {adminSession?.email?.split("@")[0] || "Pentadbir"}
                                </span>
                                <span className="text-[10px] text-slate-400 block truncate max-w-[130px]">
                                    {adminSession?.email || "Admin"}
                                </span>
                            </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Sesi Aktif" />
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[10px] font-bold text-slate-500 border-t border-slate-200/80">
                        <span>Peranan:</span>
                        <span className="text-[#0088cc] font-black">Super Admin</span>
                    </div>
                </div>

                {/* Log Keluar Button */}
                <button
                    type="button"
                    onClick={onLogout}
                    className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Log Keluar</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* 1. DESKTOP PERMANENT DRAWER (Left side of screen) */}
            <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0 z-30 shadow-xs">
                {drawerContent}
            </aside>

            {/* 2. MOBILE / TABLET OVERLAY DRAWER */}
            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
                    />

                    {/* Drawer Panel */}
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl z-10 anim-fade-in">
                        {drawerContent}
                    </div>
                </div>
            )}
        </>
    );
}
