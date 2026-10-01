"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PlantActivityView from "../../belajar/components/PlantActivityView";
import { GraphicHomeButton, LanguageToggle } from "../../belajar/components/Graphics";
import { saveStudentProfile } from "../../../lib/firestoreService";

export default function PlantActivityPage() {
    const [language, setLanguage] = useState("bm");
    const [isMounted, setIsMounted] = useState(false);
    const [studentName, setStudentName] = useState("Penjelajah");
    const [studentIC, setStudentIC] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [plantScore, setPlantScore] = useState(0);
    const [plantSubmitted, setPlantSubmitted] = useState(false);

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
                if (typeof st?.plantScore === "number") setPlantScore(st.plantScore);
                if (st?.plantSubmitted) setPlantSubmitted(true);
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

            if (type === "pick" || type === "tap") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(320, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === "snap" || type === "correct") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.18);
            } else if (type === "victory") {
                const notes = [523.25, 659.25, 783.99, 1046.5];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.08);
                    osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
                });
            }
        } catch {}
    };

    const toggleLanguage = () => {
        playAudioFeedback("pick");
        const next = language === "bm" ? "en" : "bm";
        setLanguage(next);
        try {
            localStorage.setItem("exploria_lang", next);
        } catch {}
    };

    const t = (bm, en) => (language === "en" ? en : bm);

    const handleSubmitPlantGame = (score = 800) => {
        playAudioFeedback("victory");
        const prevBest = plantScore || 0;
        const newScore = Math.max(prevBest, score);
        setPlantScore(newScore);
        setPlantSubmitted(true);

        try {
            const activeIC = localStorage.getItem("exploria_student_ic") || localStorage.getItem("exploria_active_ic");
            const key1 = `exploria_student_${activeIC || "default"}_stats`;
            const key2 = `exploria_stats_${activeIC || "guest"}`;
            const current1 = JSON.parse(localStorage.getItem(key1) || "{}");
            const current2 = JSON.parse(localStorage.getItem(key2) || "{}");

            // Ambil markah tertinggi sahaja untuk XP - tiada penambahan berulang jika sudah dijawab
            const base = 100;
            const read = (Array.isArray(current1.readTopics) ? current1.readTopics.length : 0) * 50;
            const solar = typeof current1.solarScore === "number" ? current1.solarScore : 0;
            const quiz = typeof current1.quizHighScore === "number" ? current1.quizHighScore : 0;
            const updatedXP = base + read + solar + newScore + quiz;
            const updatedLevel = updatedXP >= 2000 ? 4 : (updatedXP >= 1200 ? 3 : (updatedXP >= 500 ? 2 : 1));

            const updated1 = {
                ...current1,
                plantScore: newScore,
                plantSubmitted: true,
                xp: updatedXP,
                level: updatedLevel,
            };
            const updated2 = {
                ...current2,
                plantScore: newScore,
                plantSubmitted: true,
                xp: updatedXP,
                level: updatedLevel,
            };

            localStorage.setItem(key1, JSON.stringify(updated1));
            localStorage.setItem(key2, JSON.stringify(updated2));
            localStorage.setItem("exploria_student_last_stats", JSON.stringify(updated1));

            if (activeIC) {
                saveStudentProfile(activeIC, {
                    skorTumbuhan: newScore,
                    tumbuhanSelesai: true,
                    mataXP: updatedXP,
                    tahap: updatedLevel,
                });
            }
        } catch (e) {
            console.error("Failed to save plant game score:", e);
        }
    };

    const handleResetPlantGame = () => {
        playAudioFeedback("tap");
    };

    if (!isMounted) {
        return (
            <div
                className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4 select-none"
                style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    background: "url('/paper-bg.jpg') top center / cover no-repeat fixed",
                }}
            >
                <div className="flex flex-col items-center gap-3 animate-pulse">
                    <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg border border-slate-300 text-emerald-600">
                        🌱
                    </div>
                    <div className="text-xl font-black tracking-wide text-slate-800 drop-shadow-sm">MAKMAL TUMBUHAN STEM</div>
                    <div className="text-xs text-slate-600 font-bold">Menyediakan kebun interaktif...</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col items-center justify-start select-none py-6 px-3 sm:px-6 relative overflow-x-hidden"
            style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                background: "url('/paper-bg.jpg') top center / cover no-repeat fixed",
            }}
        >
            {/* Top Navigation Bar */}
            <header
                className="w-full max-w-4xl text-white rounded-2xl shadow-lg border border-indigo-400/30 px-4 py-2.5 flex items-center justify-between mb-6 z-20"
                style={{
                    background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                }}
            >
                <div className="flex items-center gap-3">
                    <Link
                        href="/belajar"
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 active:scale-95 text-white rounded-xl flex items-center justify-center shadow-md transition-all cursor-pointer backdrop-blur-md border border-white/30"
                        title={t("Kembali ke Menu Utama", "Back to Main Menu")}
                    >
                        <GraphicHomeButton className="w-5 h-5 text-white" />
                    </Link>
                    <div>
                        <span className="text-[10px] font-black uppercase text-amber-300 bg-black/20 px-2 py-0.5 rounded-full border border-white/20">
                            EXPLORIA STEM
                        </span>
                        <h1 className="text-sm sm:text-base font-black text-white leading-tight drop-shadow-sm">
                            {t("Aktiviti Tumbuh-Tumbuhan", "Plant & Nature Activity")}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <LanguageToggle language={language} onToggle={toggleLanguage} variant="dark" />
                    <Link
                        href="/belajar"
                        className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-xl transition-all border border-white/30 backdrop-blur-md"
                    >
                        {t("Ke Portal Belajar", "Learning Portal")} ➜
                    </Link>
                </div>
            </header>

            {/* Main Content Box */}
            <main className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border-3 sm:border-4 border-emerald-400/40 p-4 sm:p-8 relative z-10 flex flex-col items-center">
                <PlantActivityView
                    plantScore={plantScore}
                    plantSubmitted={plantSubmitted}
                    onSubmitPlantGame={handleSubmitPlantGame}
                    onResetPlantGame={handleResetPlantGame}
                    onNavigate={(dest) => {
                        if (dest === "menu" || dest === "activityList") {
                            window.location.href = "/belajar";
                        }
                    }}
                    t={t}
                    language={language}
                    playAudioFeedback={playAudioFeedback}
                    isLoggedIn={isLoggedIn}
                />
            </main>
        </div>
    );
}
