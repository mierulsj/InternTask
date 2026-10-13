"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    GraphicHomeButton,
    GraphicArrowRight,
    GraphicBackArrow,
    GraphicNatureLeaf,
    GraphicSaturnPlanet,
    GraphicQuizLightning,
    GraphicCoin,
    LanguageToggle,
} from "../belajar/components/Graphics";

// Clean vector SVG icons to replace emojis
function IconCart({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M1 1h4l2.68 12.89a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    );
}

function IconStarCoin({ className = "w-3.5 h-3.5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#facc15" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function IconUser({ className = "w-3.5 h-3.5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

export default function AktivitiHubPage() {
    const router = useRouter();
    const [language, setLanguage] = useState("bm");
    const [isMounted, setIsMounted] = useState(false);
    const [studentName, setStudentName] = useState("Penjelajah");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentCoins, setStudentCoins] = useState(50);

    useEffect(() => {
        setIsMounted(true);
        try {
            const savedLang = localStorage.getItem("exploria_lang");
            if (savedLang) setLanguage(savedLang);

            const activeIC = localStorage.getItem("exploria_active_ic");
            const rawSession = localStorage.getItem("exploria_student_session");
            if (rawSession) {
                const s = JSON.parse(rawSession);
                if (s?.name) setStudentName(s.name);
                setIsLoggedIn(true);
            }

            const icKey = activeIC || "default";
            const shopRaw = localStorage.getItem(`exploria_student_${icKey}_shop`);
            if (shopRaw) {
                const parsed = JSON.parse(shopRaw);
                if (typeof parsed?.coins === "number") setStudentCoins(parsed.coins);
            }
        } catch (e) {
            console.error("Error loading session:", e);
        }
    }, []);

    const playAudioFeedback = (type = "tap") => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            if (type === "tap") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(380, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            }

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {}
    };

    const toggleLanguage = (l) => {
        const next = l || (language === "bm" ? "en" : "bm");
        setLanguage(next);
        try {
            localStorage.setItem("exploria_lang", next);
        } catch {}
    };

    const t = (bm, en) => (language === "en" ? en : bm);

    const handleSelectActivity = (targetView, routePath) => {
        playAudioFeedback("tap");
        if (targetView) {
            try {
                localStorage.setItem("exploria_target_view", targetView);
            } catch {}
        }
        router.push(routePath);
    };

    if (!isMounted) return null;

    const activities = [
        {
            id: "solar",
            title: t("Sistem Suria", "Solar System"),
            category: t("Astronomi", "Astronomy"),
            meta: t("8 Planet & Orbit", "8 Planets & Orbit"),
            route: "/belajar",
            targetView: "solarDragDrop",
            theme: {
                border: "hover:border-sky-500",
                badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
                iconBg: "bg-sky-50 border-sky-100",
                btnBg: "bg-sky-500 hover:bg-sky-600 text-white",
            },
            icon: <GraphicSaturnPlanet className="w-14 h-14" />,
        },
        {
            id: "plant",
            title: t("Makmal Tumbuhan", "Plant Lab"),
            category: t("Sains Hayat", "Life Science"),
            meta: t("Fotosintesis & Daun", "Photosynthesis & Leaf"),
            route: "/aktiviti/tumbuhan",
            targetView: null,
            theme: {
                border: "hover:border-emerald-500",
                badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
                iconBg: "bg-emerald-50 border-emerald-100",
                btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
            },
            icon: <GraphicNatureLeaf className="w-14 h-14" />,
        },
        {
            id: "quiz",
            title: t("Kuiz Pantas", "Speed Quiz"),
            category: t("Cabaran Minda", "Speed Challenge"),
            meta: t("20 Saat Per Soalan", "20 Seconds Per Question"),
            route: "/belajar",
            targetView: "quizList",
            theme: {
                border: "hover:border-amber-500",
                badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
                iconBg: "bg-amber-50 border-amber-100",
                btnBg: "bg-amber-500 hover:bg-amber-600 text-white",
            },
            icon: <GraphicQuizLightning className="w-14 h-14" />,
        },
    ];

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col font-sans relative overflow-x-hidden"
            style={{ background: "#ffffff" }}
        >
            {/* Header */}
            <header
                className="w-full text-white border-b-2 border-indigo-400/30 py-3 px-4 sm:px-6 sticky top-0 z-50 shadow-md flex items-center justify-between"
                style={{
                    background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)",
                }}
            >
                <div className="flex items-center gap-3">
                    <Link
                        href="/belajar"
                        onClick={() => playAudioFeedback("tap")}
                        className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 backdrop-blur-md"
                    >
                        <GraphicHomeButton className="w-4 h-4 text-white" />
                        <span>{t("Utama", "Home")}</span>
                    </Link>
                    <span className="text-xs font-bold text-white/95 hidden sm:inline-block">
                        Exploria • {t("Pusat Aktiviti", "Activity Hub")}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <LanguageToggle language={language} onToggle={toggleLanguage} variant="dark" />
                    
                    <Link
                        href="/kedai"
                        onClick={() => playAudioFeedback("tap")}
                        className="h-8 px-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                        title={t("Kedai Penjelajah", "Explorer Shop")}
                        aria-label="Kedai Penjelajah"
                    >
                        <IconCart className="w-4 h-4 text-amber-300" />
                        <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                            {studentCoins}
                            <GraphicCoin className="w-3.5 h-3.5" />
                        </span>
                    </Link>

                    <span className="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-bold text-white backdrop-blur-md flex items-center gap-1.5">
                        <IconUser className="w-3.5 h-3.5 text-white/90" />
                        <span>{isLoggedIn ? studentName : t("Tetamu", "Guest")}</span>
                    </span>
                </div>
            </header>

            {/* Main Stage */}
            <main className="flex-1 w-full max-w-4xl mx-auto py-8 px-4 flex flex-col items-center justify-start z-10">
                <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-sm space-y-6 text-left anim-fade-in">
                    
                    {/* Header Bar */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-slate-800">
                                {t("Pusat Aktiviti", "Activity Hub")}
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {t("Pilih modul aktiviti untuk bermula.", "Select an activity module to begin.")}
                            </p>
                        </div>
                        <Link
                            href="/belajar"
                            onClick={() => playAudioFeedback("tap")}
                            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all"
                        >
                            <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                            <span>{t("Kembali", "Back")}</span>
                        </Link>
                    </div>

                    {/* Activity Selection Grid (UXPeak Choice Architecture) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                        {activities.map((act) => (
                            <div
                                key={act.id}
                                onClick={() => handleSelectActivity(act.targetView, act.route)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleSelectActivity(act.targetView, act.route);
                                    }
                                }}
                                className={`group bg-white rounded-2xl border-2 border-slate-200 p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-1 active:translate-y-0 ${act.theme.border}`}
                            >
                                <div>
                                    {/* Category Pill (Text only, no emoji) */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${act.theme.badgeBg}`}>
                                            {act.category}
                                        </span>
                                        <span className="text-[11px] font-bold text-slate-600">
                                            {act.meta}
                                        </span>
                                    </div>

                                    {/* Icon Graphic Container */}
                                    <div className={`w-20 h-20 mx-auto rounded-2xl border flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${act.theme.iconBg}`}>
                                        {act.icon}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-base sm:text-lg font-black text-slate-800 text-center mt-4">
                                        {act.title}
                                    </h2>
                                </div>

                                {/* Clean CTA Button */}
                                <div className="mt-5">
                                    <div className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${act.theme.btnBg}`}>
                                        <span>{t("Mula", "Start")}</span>
                                        <GraphicArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
