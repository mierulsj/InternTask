"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    GraphicHomeButton,
    GraphicMascotRobot,
    GraphicArrowRight,
    GraphicBackArrow,
    GraphicCoin,
    GraphicLevelTrophy,
    GraphicLevelBee,
} from "../belajar/components/Graphics";
import MathSpeedQuiz from "../belajar/components/MathSpeedQuiz";
import SpellingBeeActivity from "../belajar/components/SpellingBeeActivity";
import { saveStudentProfile } from "../../lib/firestoreService";

export default function PertandinganPage() {
    const [language, setLanguage] = useState("bm");
    const [isMounted, setIsMounted] = useState(false);
    const [studentName, setStudentName] = useState("Penjelajah");
    const [studentIC, setStudentIC] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Scores
    const [mathScore, setMathScore] = useState(0);
    const [spellingScore, setSpellingScore] = useState(0);
    const [studentCoins, setStudentCoins] = useState(50);

    // Current view mode: "hub" | "sifir" | "spellingBee"
    const [currentMode, setCurrentMode] = useState("hub");

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
                if (s?.ic) setStudentIC(s.ic);
                setIsLoggedIn(true);
            }

            const rawStats = localStorage.getItem(`exploria_stats_${activeIC || "guest"}`);
            if (rawStats) {
                const st = JSON.parse(rawStats);
                if (typeof st?.mathScore === "number") setMathScore(st.mathScore);
                if (typeof st?.spellingScore === "number") setSpellingScore(st.spellingScore);
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

    const playAudioFeedback = (type) => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            if (type === "tap" || type === "pop") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(350, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === "sparkle" || type === "correct") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            } else if (type === "wrong" || type === "timeout") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(160, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.25, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            }
        } catch (e) {
            // Audio error silenced
        }
    };

    const toggleLanguage = () => {};
    const t = (bm) => bm;

    const awardPertandinganCoins = (amount = 15) => {
        setStudentCoins((prev) => {
            const next = prev + amount;
            try {
                const activeIC = localStorage.getItem("exploria_active_ic");
                const icKey = activeIC || "default";
                const shopKey = `exploria_student_${icKey}_shop`;
                const existing = JSON.parse(localStorage.getItem(shopKey) || "{}");
                localStorage.setItem(shopKey, JSON.stringify({ ...existing, coins: next }));
            } catch {}
            return next;
        });
    };

    const handleSubmitMathQuiz = (score) => {
        const newScore = Math.max(mathScore, score);
        setMathScore(newScore);
        const earned = score >= 800 ? 20 : score >= 500 ? 15 : 10;
        awardPertandinganCoins(earned);
        if (studentIC) {
            saveStudentProfile(studentIC, {
                skorMath: newScore,
                mathSelesai: true,
            });
        }
        try {
            const activeIC = localStorage.getItem("exploria_active_ic");
            const key = `exploria_stats_${activeIC || "guest"}`;
            const existing = JSON.parse(localStorage.getItem(key) || "{}");
            localStorage.setItem(key, JSON.stringify({ ...existing, mathScore: newScore, mathSubmitted: true }));
        } catch {}
    };

    const handleSubmitSpelling = (score) => {
        const newScore = Math.max(spellingScore, score);
        setSpellingScore(newScore);
        const earned = score >= 800 ? 20 : score >= 500 ? 15 : 10;
        awardPertandinganCoins(earned);
        if (studentIC) {
            saveStudentProfile(studentIC, {
                skorSpelling: newScore,
                spellingSelesai: true,
            });
        }
        try {
            const activeIC = localStorage.getItem("exploria_active_ic");
            const key = `exploria_stats_${activeIC || "guest"}`;
            const existing = JSON.parse(localStorage.getItem(key) || "{}");
            localStorage.setItem(key, JSON.stringify({ ...existing, spellingScore: newScore, spellingSubmitted: true }));
        } catch {}
    };

    if (!isMounted) return null;

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col font-sans relative overflow-x-hidden"
            style={{ background: "#ffffff" }}
        >
            {/* Header Utama Navigasi */}
            <header
                className="w-full text-white border-b-2 border-indigo-400/30 py-3 px-4 sm:px-6 sticky top-0 z-50 shadow-md flex items-center justify-between"
                style={{
                    background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                }}
            >
                <div className="flex items-center gap-3">
                    <Link
                        href="/belajar"
                        onClick={() => playAudioFeedback("tap")}
                        className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all active:scale-95 backdrop-blur-md"
                    >
                        <GraphicHomeButton className="w-4 h-4 text-white" />
                        <span>{t("Utama", "Home")}</span>
                    </Link>
                    <span className="text-xs font-black text-white/95 hidden sm:inline-block drop-shadow-sm">
                        Exploria • {t("Pusat Pertandingan STEM", "STEM Competition Center")}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/kedai"
                        onClick={() => playAudioFeedback("tap")}
                        className="h-8 px-2 sm:px-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-amber-200 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                        title={t(`Kedai Penjelajah • Baki: ${studentCoins} Koin`, `Explorer Shop • Balance: ${studentCoins} Coins`)}
                        aria-label="Kedai Penjelajah"
                    >
                        <GraphicCoin className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono font-black text-amber-300">
                            {studentCoins}
                        </span>
                    </Link>
                    <span className="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-black text-white backdrop-blur-md">
                        {isLoggedIn ? studentName : "Tetamu"}
                    </span>
                </div>
            </header>

            {/* Kandungan Halaman Pertandingan */}
            <main className="flex-1 w-full max-w-4xl mx-auto py-6 px-4 flex flex-col items-center justify-start z-10">

                {/* MOD 1: MENU UTAMA PERTANDINGAN (LAYOUT SAMA DENGAN PAGE EXPLORE) */}
                {currentMode === "hub" && (
                    <div className="w-full max-w-sm sm:max-w-md mx-auto anim-fade-in space-y-6 pb-8 select-none text-left">
                        {/* 1. Header & Progress Bar */}
                        <div className="px-1 pt-1 space-y-3">
                            <div className="flex items-center justify-between">
                                {/* Kiri: Butang Back & Tajuk */}
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/belajar"
                                        onClick={() => playAudioFeedback("tap")}
                                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all group shrink-0 cursor-pointer"
                                    >
                                        <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                                        <span>Back</span>
                                    </Link>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-black text-[#0099e5] tracking-tight">
                                            {t("Pertandingan", "Competitions")}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
                                            {t("Pilih cabaran anda", "Pick your challenge")}
                                        </p>
                                    </div>
                                </div>

                                {/* Kanan: Koin & Profil */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                        href="/kedai"
                                        onClick={() => playAudioFeedback("sparkle")}
                                        className="h-10 px-3 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                                        title={t(`${studentCoins} Koin`, `${studentCoins} Coins`)}
                                    >
                                        <GraphicCoin className="w-4 h-4 shrink-0" />
                                        <span className="font-bold text-xs">{studentCoins}</span>
                                    </Link>
                                    <div
                                        className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center text-base shadow-xs shrink-0"
                                        title={isLoggedIn ? studentName : "Tetamu"}
                                    >
                                        <span>🧑‍🚀</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 shadow-2xs">
                                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                                    <span className="text-slate-600 font-bold text-[11px] sm:text-xs">
                                        {t("Kemajuan", "Progress")}
                                    </span>
                                    <span className="font-black text-[#0099e5] font-mono text-xs sm:text-sm">
                                        {Math.min(100, Math.round((((mathScore > 0 ? 1 : 0) + (spellingScore > 0 ? 1 : 0)) / 2) * 100))}%
                                    </span>
                                </div>
                                <div className="w-full h-2.5 sm:h-3 bg-slate-200/70 rounded-full overflow-hidden p-0.5 shadow-inner">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#0099e5] via-[#0284c7] to-[#38bdf8] transition-all duration-700 ease-out shadow-xs"
                                        style={{ width: `${Math.min(100, Math.round((((mathScore > 0 ? 1 : 0) + (spellingScore > 0 ? 1 : 0)) / 2) * 100))}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Senarai Kad: Sifir Kilat & Spelling Bee */}
                        <div className="space-y-6 pt-3">
                            {/* Kad 1: Sifir Kilat (Coral/Rose Gradient + 3D Trophy) */}
                            <div
                                onClick={() => {
                                    playAudioFeedback("sparkle");
                                    setCurrentMode("sifir");
                                }}
                                className="relative w-full rounded-[2.2rem] p-6 pr-28 sm:pr-32 min-h-[148px] sm:min-h-[162px] flex flex-col justify-between text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer group"
                                style={{
                                    background: "linear-gradient(135deg, #5c9de5 0%, #4a8fd8 55%, #3a7ec8 100%)",
                                }}
                            >
                                <div className="absolute -top-7 sm:-top-8 -right-1 sm:right-1 w-28 h-28 sm:w-34 sm:h-34 drop-shadow-xl group-hover:scale-108 group-hover:-rotate-3 transition-transform duration-300 pointer-events-none select-none z-10 flex items-center justify-center">
                                    <GraphicLevelTrophy className="w-full h-full" />
                                </div>

                                <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                                    {mathScore > 0 ? (
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <span className="text-xs sm:text-sm font-medium text-white/80 block">
                                        {t("cabaran 1", "challenge 1")}
                                    </span>
                                    <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight mt-0.5">
                                        {t("Sifir Kilat", "Speed Math")}
                                    </h3>
                                </div>
                            </div>

                            {/* Kad 2: Spelling Bee (Blue/Cyan Gradient + 3D Bee) */}
                            <div
                                onClick={() => {
                                    playAudioFeedback("sparkle");
                                    setCurrentMode("spellingBee");
                                }}
                                className="relative w-full rounded-[2.2rem] p-6 pr-28 sm:pr-32 min-h-[148px] sm:min-h-[162px] flex flex-col justify-between text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer group"
                                style={{
                                    background: "linear-gradient(135deg, #5c9de5 0%, #4a8fd8 55%, #3a7ec8 100%)",
                                }}
                            >
                                <div className="absolute -top-7 sm:-top-8 -right-1 sm:right-1 w-28 h-28 sm:w-34 sm:h-34 drop-shadow-xl group-hover:scale-108 group-hover:rotate-3 transition-transform duration-300 pointer-events-none select-none z-10 flex items-center justify-center">
                                    <GraphicLevelBee className="w-full h-full" />
                                </div>

                                <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                                    {spellingScore > 0 ? (
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <span className="text-xs sm:text-sm font-medium text-white/80 block">
                                        {t("cabaran 2", "challenge 2")}
                                    </span>
                                    <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight mt-0.5">
                                        {t("Spelling Bee", "Spelling Bee")}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MOD 2: PERMAINAN SIFIR */}
                {currentMode === "sifir" && (
                    <div className="w-full anim-fade-in flex flex-col items-center">
                        <MathSpeedQuiz
                            onNavigate={() => setCurrentMode("hub")}
                            onSubmitMathQuiz={handleSubmitMathQuiz}
                            mathScore={mathScore}
                            isLoggedIn={isLoggedIn}
                            playAudioFeedback={playAudioFeedback}
                            t={t}
                            language={language}
                        />
                    </div>
                )}

                {/* MOD 3: PERMAINAN SPELLING BEE */}
                {currentMode === "spellingBee" && (
                    <div className="w-full anim-fade-in flex flex-col items-center">
                        <SpellingBeeActivity
                            onNavigate={() => setCurrentMode("hub")}
                            onSubmitSpellingBee={handleSubmitSpelling}
                            spellingScore={spellingScore}
                            isLoggedIn={isLoggedIn}
                            playAudioFeedback={playAudioFeedback}
                            t={t}
                            language={language}
                        />
                    </div>
                )}

            </main>
        </div>
    );
}
