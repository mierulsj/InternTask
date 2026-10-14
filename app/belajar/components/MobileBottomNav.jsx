"use client";

import React from "react";

export default function MobileBottomNav({
    currentView = "menu",
    dashboardActiveTab = "all",
    onNavigate,
    playAudioFeedback,
    t = (bm, en) => bm,
}) {
    const handleTabClick = (viewId) => {
        if (playAudioFeedback) {
            playAudioFeedback("tap");
        }
        if (onNavigate) {
            onNavigate(viewId);
        }
    };

    const isHome = currentView === "menu";
    const isKedai = currentView === "shop" || (currentView === "profile" && dashboardActiveTab === "shop");
    const isLeaderboard = currentView === "leaderboard";
    const isProfile = (currentView === "profile" || currentView === "dashboard") && dashboardActiveTab !== "shop" && currentView !== "shop";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-6px_25px_rgba(0,120,215,0.08)] select-none">
            <div className="max-w-md mx-auto px-6 py-2.5 flex items-center justify-around">

                {/* TAB 1: TEROKA (4-Squares Grid Icon) */}
                <button
                    type="button"
                    onClick={() => handleTabClick("menu")}
                    className={`p-2 rounded-2xl transition-all cursor-pointer active:scale-90 ${
                        isHome
                            ? "bg-sky-100/80 text-[#0099e5]"
                            : "text-slate-400 hover:text-slate-600"
                    }`}
                    title={t("Teroka", "Explore")}
                    aria-label="Teroka"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isHome ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="2" />
                        <rect x="14" y="3" width="7" height="7" rx="2" />
                        <rect x="14" y="14" width="7" height="7" rx="2" />
                        <rect x="3" y="14" width="7" height="7" rx="2" />
                    </svg>
                </button>

                {/* TAB 2: KEDAI (Shopping Bag Icon) */}
                <button
                    type="button"
                    onClick={() => handleTabClick("shop")}
                    className={`p-2 rounded-2xl transition-all cursor-pointer active:scale-90 ${
                        isKedai
                            ? "bg-sky-100/80 text-[#0099e5]"
                            : "text-slate-400 hover:text-slate-600"
                    }`}
                    title={t("Kedai", "Shop")}
                    aria-label="Kedai"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </button>

                {/* TAB 3: LEADERBOARD (Bar Chart Icon) */}
                <button
                    type="button"
                    onClick={() => handleTabClick("leaderboard")}
                    className={`p-2 rounded-2xl transition-all cursor-pointer active:scale-90 ${
                        isLeaderboard
                            ? "bg-sky-100/80 text-[#0099e5]"
                            : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="Leaderboard"
                    aria-label="Leaderboard"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                </button>

                {/* TAB 4: PROFIL (User Avatar Icon) */}
                <button
                    type="button"
                    onClick={() => handleTabClick("profile")}
                    className={`p-2 rounded-2xl transition-all cursor-pointer active:scale-90 ${
                        isProfile
                            ? "bg-sky-100/80 text-[#0099e5]"
                            : "text-slate-400 hover:text-slate-600"
                    }`}
                    title={t("Profil", "Profile")}
                    aria-label="Profil"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isProfile ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </button>

            </div>
        </div>
    );
}
