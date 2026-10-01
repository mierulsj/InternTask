"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SpellingBeeActivity from "../../belajar/components/SpellingBeeActivity";
import { GraphicHomeButton, LanguageToggle } from "../../belajar/components/Graphics";
import { saveStudentProfile } from "../../../lib/firestoreService";

export default function SpellingBeeStandalonePage() {
    const [language, setLanguage] = useState("bm");
    const [isMounted, setIsMounted] = useState(false);
    const [studentName, setStudentName] = useState("Penjelajah");
    const [studentIC, setStudentIC] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [spellingScore, setSpellingScore] = useState(0);

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
                if (typeof st?.spellingScore === "number") setSpellingScore(st.spellingScore);
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
            } else if (type === "correct") {
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
            } else if (type === "victory") {
                const notes = [523.25, 659.25, 783.99, 1046.5];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.1);
                    osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
                });
            }
        } catch (e) {
            // Audio error silenced
        }
    };

    const toggleLanguage = (l) => {
        const next = l || (language === "bm" ? "en" : "bm");
        setLanguage(next);
        try {
            localStorage.setItem("exploria_lang", next);
        } catch {}
    };

    const t = (bm, en) => (language === "en" ? en : bm);

    const handleSubmitSpelling = (score) => {
        const newScore = Math.max(spellingScore, score);
        setSpellingScore(newScore);
        if (studentIC) {
            saveStudentProfile(studentIC, {
                skorSpelling: newScore,
                spellingSelesai: true,
            });
        }
    };

    if (!isMounted) return null;

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col font-sans relative overflow-x-hidden"
            style={{ background: "url('/paper-bg.jpg') top center / cover no-repeat fixed" }}
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
                        href="/belajar"
                        className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all active:scale-95 backdrop-blur-md"
                    >
                        <GraphicHomeButton className="w-4 h-4 text-white" />
                        <span>{t("Utama", "Home")}</span>
                    </Link>
                    <span className="text-xs font-black text-white/95 hidden sm:inline-block drop-shadow-sm">
                        Exploria • English Spelling Bee
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <LanguageToggle language={language} onToggle={toggleLanguage} variant="dark" />
                    <span className="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-black text-white backdrop-blur-md">
                        {isLoggedIn ? `👤 ${studentName}` : "👤 Tetamu"}
                    </span>
                </div>
            </header>

            {/* Main Interactive Stage */}
            <main className="flex-1 w-full max-w-4xl mx-auto py-6 px-4 flex flex-col items-center justify-start z-10">
                <SpellingBeeActivity
                    onNavigate={(dest) => {
                        if (typeof window !== "undefined") {
                            window.location.href = "/belajar";
                        }
                    }}
                    onSubmitSpellingBee={handleSubmitSpelling}
                    spellingScore={spellingScore}
                    isLoggedIn={isLoggedIn}
                    playAudioFeedback={playAudioFeedback}
                    t={t}
                    language={language}
                />
            </main>
        </div>
    );
}
