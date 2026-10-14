"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MathSpeedQuiz from "../../belajar/components/MathSpeedQuiz";
import { GraphicHomeButton, GraphicCoin } from "../../belajar/components/Graphics";
import { saveStudentProfile } from "../../../lib/firestoreService";

export default function SifirPertandinganPage() {
    const [language, setLanguage] = useState("bm");
    const [isMounted, setIsMounted] = useState(false);
    const [studentName, setStudentName] = useState("Penjelajah");
    const [studentIC, setStudentIC] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mathScore, setMathScore] = useState(0);
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
                if (s?.ic) setStudentIC(s.ic);
                setIsLoggedIn(true);
            }

            const rawStats = localStorage.getItem(`exploria_stats_${activeIC || "guest"}`);
            if (rawStats) {
                const st = JSON.parse(rawStats);
                if (typeof st?.mathScore === "number") setMathScore(st.mathScore);
            }

            const icKey = activeIC || "default";
            const shopRaw = localStorage.getItem(`exploria_student_${icKey}_shop`);
            if (shopRaw) {
                const parsed = JSON.parse(shopRaw);
                if (typeof parsed?.coins === "number") setStudentCoins(parsed.coins);
            }
        } catch (e) {
            console.error("Error loading saved student session:", e);
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
            } else if (type === "correct" || type === "sparkle") {
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

    const handleSubmitMathQuiz = (score) => {
        const newScore = Math.max(mathScore, score);
        setMathScore(newScore);
        const earned = score >= 800 ? 20 : score >= 500 ? 15 : 10;
        setStudentCoins((prev) => {
            const next = prev + earned;
            try {
                const activeIC = localStorage.getItem("exploria_active_ic");
                const icKey = activeIC || "default";
                const shopKey = `exploria_student_${icKey}_shop`;
                const existing = JSON.parse(localStorage.getItem(shopKey) || "{}");
                localStorage.setItem(shopKey, JSON.stringify({ ...existing, coins: next }));
            } catch {}
            return next;
        });

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

    if (!isMounted) return null;

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col font-sans relative overflow-x-hidden"
            style={{ background: "#ffffff" }}
        >
            {/* Header */}
            <header
                className="w-full text-white border-b-2 border-indigo-400/30 py-3 px-4 sm:px-6 sticky top-0 z-50 shadow-md flex items-center justify-between"
                style={{
                    background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                }}
            >
                <div className="flex items-center gap-3">
                    <Link
                        href="/pertandingan"
                        className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all active:scale-95 backdrop-blur-md"
                    >
                        <GraphicHomeButton className="w-4 h-4 text-white" />
                        <span>{t("Pertandingan", "Competitions")}</span>
                    </Link>
                    <span className="text-xs font-black text-white/95 hidden sm:inline-block drop-shadow-sm">
                        Exploria • Pertandingan Sifir Kilat
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

            {/* Main Interactive Stage */}
            <main className="flex-1 w-full max-w-4xl mx-auto py-6 px-4 flex flex-col items-center justify-start z-10">
                <MathSpeedQuiz
                    onNavigate={(dest) => {
                        if (typeof window !== "undefined") {
                            window.location.href = "/pertandingan";
                        }
                    }}
                    onSubmitMathQuiz={handleSubmitMathQuiz}
                    mathScore={mathScore}
                    isLoggedIn={isLoggedIn}
                    playAudioFeedback={playAudioFeedback}
                    t={t}
                    language={language}
                />
            </main>
        </div>
    );
}
