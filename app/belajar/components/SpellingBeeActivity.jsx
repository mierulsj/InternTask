"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getSpellingWords, INITIAL_SPELLING_WORDS, SPELLING_THEMES, normalizeDifficulty } from "../../../lib/spellingService";
import { playSpellingAudio, stopSpellingAudio, primeAudio } from "../../../lib/spellingAudioService";

/* =========================================================================
   VECTOR SVG GRAPHICS FOR SPELLING BEE
   ========================================================================= */

function GraphicBeeMascot({ className = "w-16 h-16" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="beeBodyGrad" x1="20" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
            </defs>
            <ellipse cx="32" cy="32" rx="16" ry="10" transform="rotate(-35 32 32)" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
            <ellipse cx="68" cy="32" rx="16" ry="10" transform="rotate(35 68 32)" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M50 86L46 76H54L50 86Z" fill="#1e293b" />
            <ellipse cx="50" cy="56" rx="28" ry="24" fill="url(#beeBodyGrad)" stroke="#b45309" strokeWidth="2" />
            <path d="M25 52C30 47 70 47 75 52C73 58 69 63 65 65C56 62 44 62 35 65C31 63 27 58 25 52Z" fill="#1e293b" />
            <path d="M32 68C38 66 62 66 68 68C65 75 58 79 50 80C42 79 35 75 32 68Z" fill="#1e293b" />
            <circle cx="40" cy="45" r="4.5" fill="#0f172a" />
            <circle cx="39" cy="43.5" r="1.5" fill="#ffffff" />
            <circle cx="60" cy="45" r="4.5" fill="#0f172a" />
            <circle cx="59" cy="43.5" r="1.5" fill="#ffffff" />
            <path d="M45 52C47 55 53 55 55 52" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function GraphicSpeaker({ isPlaying = false, className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path
                d="M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={isPlaying ? "animate-pulse" : ""}
            />
            <path
                d="M19.07 4.93C20.94 6.81 22 9.35 22 12C22 14.65 20.94 17.19 19.07 19.07"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={isPlaying ? "animate-ping opacity-75" : "opacity-60"}
            />
        </svg>
    );
}

function GraphicTimer({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M12 9V13L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 2H14M5 5L7 7M19 5L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function GraphicBackArrow({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function GraphicTrophy({ className = "w-16 h-16" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldCupGrad" x1="20" y1="10" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.4" stopColor="#facc15" />
                    <stop offset="0.8" stopColor="#eab308" />
                    <stop offset="1" stopColor="#ca8a04" />
                </linearGradient>
            </defs>
            <path d="M28 20C18 20 14 30 14 42C14 54 24 60 32 60" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M72 20C82 20 86 30 86 42C86 54 76 60 68 60" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M26 16H74L68 50C68 62 58 68 50 68C42 68 32 62 32 50L26 16Z" fill="url(#goldCupGrad)" stroke="#a16207" strokeWidth="2" />
            <path d="M46 68H54V78H46V68Z" fill="#ca8a04" />
            <path d="M30 84H70L66 78H34L30 84Z" fill="#854d0e" />
            <rect x="26" y="84" width="48" height="6" rx="2" fill="#713f12" />
            <text x="50" y="47" fontSize="16" fontWeight="900" fill="#ffffff" textAnchor="middle">🐝</text>
        </svg>
    );
}

/* =========================================================================
   MAIN COMPONENT: SPELLING BEE ACTIVITY (FORMAT PERTANDINGAN)
   ========================================================================= */

export default function SpellingBeeActivity({
    onNavigate,
    onSubmitSpellingBee,
    spellingScore = 0,
    isLoggedIn = true,
    onBlockedAction = null,
    playAudioFeedback = null,
    t = null,
    language = "bm",
}) {
    const playLocalSound = useCallback((type) => {
        if (typeof playAudioFeedback === "function") {
            try {
                playAudioFeedback(type);
                return;
            } catch (e) {}
        }
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const now = ctx.currentTime;

            if (type === "tap" || type === "pop") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(450, now);
                osc.frequency.exponentialRampToValueAtTime(750, now + 0.05);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === "victory") {
                const freqs = [523.25, 659.25, 783.99, 1046.5];
                freqs.forEach((f, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(f, now + i * 0.07);
                    gain.gain.setValueAtTime(0.2, now + i * 0.07);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.2);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.07);
                    osc.stop(now + i * 0.07 + 0.2);
                });
            } else if (type === "tick") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(900, now);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.03);
            }
        } catch (e) {}
    }, [playAudioFeedback]);

    // Audio speech pronunciation using multi-tier service (Audio stream + Web Speech + Google TTS)
    const [isSpeaking, setIsSpeaking] = useState(false);
    const speakWord = useCallback((wordToSpeak) => {
        if (!wordToSpeak) return;
        setIsSpeaking(true);
        playSpellingAudio(wordToSpeak, {
            onStart: () => setIsSpeaking(true),
            onEnd: () => setIsSpeaking(false),
            onError: () => setIsSpeaking(false),
        });
    }, []);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            stopSpellingAudio();
        };
    }, []);

    // Game state: "start" | "playing" | "finished" (NO intermediate review screen!)
    const [gameState, setGameState] = useState("start");
    const [wordsPool, setWordsPool] = useState(INITIAL_SPELLING_WORDS);
    const [selectedTheme, setSelectedTheme] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");

    // Match setup
    const FIXED_QUESTIONS = 8;
    const [wordList, setWordList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userSpelling, setUserSpelling] = useState("");

    // Timer (30s countdown per question)
    const TIMER_LIMIT = 30;
    const [timeLeft, setTimeLeft] = useState(TIMER_LIMIT);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [resultsHistory, setResultsHistory] = useState([]);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const inputRef = useRef(null);
    const currentWord = wordList[currentIndex] || null;

    // Load custom words from Firestore if available
    useEffect(() => {
        let isMounted = true;
        getSpellingWords()
            .then((words) => {
                if (isMounted && Array.isArray(words) && words.length > 0) {
                    setWordsPool(words);
                }
            })
            .catch(() => {});
        return () => {
            isMounted = false;
        };
    }, []);

    // Start a new 8-question competition
    const startNewGame = useCallback(() => {
        if (!isLoggedIn && onBlockedAction) {
            onBlockedAction();
            return;
        }

        playLocalSound("tap");

        let pool = [...wordsPool];
        if (selectedTheme !== "all") {
            pool = pool.filter((w) => (w.theme || "").toLowerCase() === selectedTheme.toLowerCase());
        }
        if (selectedDifficulty !== "all") {
            pool = pool.filter((w) => normalizeDifficulty(w.difficulty) === selectedDifficulty);
        }
        if (pool.length < FIXED_QUESTIONS) {
            pool = [...wordsPool];
        }

        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(FIXED_QUESTIONS, shuffled.length));

        setWordList(selected);
        setCurrentIndex(0);
        setUserSpelling("");
        setResultsHistory([]);
        setTimeLeft(TIMER_LIMIT);
        setShowExitConfirm(false);

        setGameState("playing");
        setIsTimerRunning(true);

        setTimeout(() => {
            if (selected[0]) {
                speakWord(selected[0].word);
            }
        }, 400);
    }, [isLoggedIn, onBlockedAction, playLocalSound, selectedTheme, selectedDifficulty, speakWord, wordsPool]);

    // Timer effect
    useEffect(() => {
        let timer = null;
        if (gameState === "playing" && isTimerRunning && !showExitConfirm) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        recordAnswerAndAdvance("", true); // Timeout
                        return 0;
                    }
                    if (prev <= 6 && prev > 1) {
                        playLocalSound("tick");
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameState, isTimerRunning, showExitConfirm, playLocalSound]);

    // Auto focus input on each new question
    useEffect(() => {
        if (gameState === "playing") {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 200);
        }
    }, [currentIndex, gameState]);

    // FORMAT PERTANDINGAN: Record answer silently and advance immediately!
    const recordAnswerAndAdvance = (typedText, isTimeout = false) => {
        if (!currentWord) return;

        playLocalSound("tap");

        const typedClean = (typedText || "").trim().toLowerCase();
        const targetClean = (currentWord.word || "").trim().toLowerCase();
        const isCorrect = !isTimeout && typedClean === targetClean;
        const timeTaken = TIMER_LIMIT - timeLeft;

        let points = 0;
        if (isCorrect) {
            points = 100 + Math.max(0, timeLeft * 2);
        }

        const record = {
            word: currentWord.word,
            typed: isTimeout ? "(Masa Tamat)" : typedText.trim() || "(Tiada Jawapan)",
            isCorrect,
            isTimeout,
            image: currentWord.image || "",
            meaning: currentWord.meaning || currentWord.meaningEN || currentWord.meaningBM || "",
            pointsEarned: points,
            timeTaken,
        };

        const updatedHistory = [...resultsHistory, record];
        setResultsHistory(updatedHistory);

        const nextIdx = currentIndex + 1;
        if (nextIdx < wordList.length) {
            // Seterusnya serta-merta tanpa paparan pembetulan di tengah
            setCurrentIndex(nextIdx);
            setUserSpelling("");
            setTimeLeft(TIMER_LIMIT);
            setTimeout(() => {
                if (wordList[nextIdx]) {
                    speakWord(wordList[nextIdx].word);
                }
            }, 300);
        } else {
            // Tamat Pertandingan
            setIsTimerRunning(false);
            setGameState("finished");
            playLocalSound("victory");

            const finalTotal = updatedHistory.reduce((sum, h) => sum + h.pointsEarned, 0);

            // Simpan perkataan yang salah dieja untuk Paparan Ibu Bapa (Parent Dashboard)
            try {
                const mistakes = updatedHistory
                    .filter((h) => !h.isCorrect)
                    .map((h) => ({
                        word: h.word,
                        userAttempt: h.userSpelling || "(tiada cubaan)",
                        meaningBM: h.meaningBM || h.meaning || "Perkataan istilah sains",
                        hint: h.hintLetters || "",
                        difficulty: selectedDifficulty || "Sederhana",
                        theme: selectedTheme || "Sains Am",
                        timestamp: new Date().toISOString(),
                    }));

                const activeIC = typeof window !== "undefined" ? (localStorage.getItem("exploria_active_ic") || localStorage.getItem("exploria_student_ic")) : null;
                const stuId = activeIC ? `STU-${activeIC.slice(-5)}` : "STU-15542";
                const mistakeKey = `exploria_spelling_mistakes_${activeIC || stuId}`;
                localStorage.setItem(mistakeKey, JSON.stringify(mistakes));
            } catch (err) {
                console.warn("Ralat merekod kesilapan ejaan:", err);
            }

            if (typeof onSubmitSpellingBee === "function") {
                onSubmitSpellingBee(finalTotal);
            }
        }
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (gameState !== "playing" || !currentWord) return;
        recordAnswerAndAdvance(userSpelling, false);
    };

    // Calculations for Result Screen
    const totalQuestions = resultsHistory.length;
    const correctCount = resultsHistory.filter((h) => h.isCorrect).length;
    const finalScore = resultsHistory.reduce((sum, h) => sum + h.pointsEarned, 0);
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    /* =========================================================================
       VIEW 1: SETUP SCREEN (MINIMAL TEXT, 1-2 BUTTON COLORS)
       ========================================================================= */
    if (gameState === "start") {
        return (
            <div className="w-full max-w-2xl mx-auto space-y-4 anim-fade-in text-left">
                {/* Header: Butang Back di kiri & Tajuk */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3 text-left">
                    <button
                        type="button"
                        onClick={() => {
                            playLocalSound("tap");
                            if (typeof onNavigate === "function") {
                                onNavigate("competitionList");
                            }
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-slate-200 shadow-xs cursor-pointer active:scale-95 transition-all group shrink-0"
                    >
                        <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back</span>
                    </button>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                            {t ? t("Cabaran Spelling Bee STEM", "STEM Spelling Bee Challenge") : "Cabaran Spelling Bee STEM"}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t ? t("Dengar sebutan audio dan eja perkataan sains tepat.", "Listen to audio and spell the science words correctly.") : "Dengar sebutan audio dan eja perkataan sains tepat."}
                        </p>
                    </div>
                </div>

                {/* Pilih Tema Dengan Gambar (Theme Selection Cards With Pictures) */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                            Pilih Tema:
                        </span>
                        <span className="text-[11px] font-bold text-[#0088cc] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                            {selectedTheme === "all" ? "Semua Tema" : selectedTheme.toUpperCase()}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {SPELLING_THEMES.map((theme) => {
                            const isSelected = selectedTheme === theme.id;
                            return (
                                <button
                                    key={theme.id}
                                    type="button"
                                    onClick={() => {
                                        playLocalSound("tap");
                                        setSelectedTheme(theme.id);
                                    }}
                                    className={`relative group rounded-2xl overflow-hidden border-2 text-left transition-all cursor-pointer p-2 flex flex-col items-center justify-between ${
                                        isSelected
                                            ? "border-[#0099e5] bg-sky-50/80 shadow-md ring-2 ring-[#0099e5]/40 scale-[1.02]"
                                            : "border-slate-200 bg-slate-50 hover:bg-white hover:border-[#0099e5]/60"
                                    }`}
                                >
                                    {/* Theme Thumbnail Image */}
                                    <div className="w-full h-16 sm:h-18 rounded-xl overflow-hidden bg-slate-200 relative mb-1.5 shadow-2xs">
                                        <img
                                            src={theme.image}
                                            alt={theme.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <span className="absolute bottom-1 right-1 text-sm bg-black/40 backdrop-blur-xs rounded-md px-1 py-0.5">
                                            {theme.emoji}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute top-1 right-1 w-5 h-5 bg-[#0099e5] rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-xs">
                                                ✓
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full text-center">
                                        <span className={`block text-xs font-black truncate ${
                                            isSelected ? "text-[#0088cc]" : "text-slate-800"
                                        }`}>
                                            {theme.title}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Pilih Tahap Kesukaran */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">
                        Tahap Kesukaran:
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { key: "all", label: "Semua" },
                            { key: "easy", label: "Mudah" },
                            { key: "medium", label: "Sederhana" },
                            { key: "hard", label: "Mencabar" },
                        ].map((d) => {
                            const isSelected = selectedDifficulty === d.key;
                            return (
                                <button
                                    key={d.key}
                                    type="button"
                                    onClick={() => {
                                        playLocalSound("tap");
                                        setSelectedDifficulty(d.key);
                                    }}
                                    className={`py-2.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-[#0099e5] text-white border-[#0088cc] shadow-xs"
                                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                                    }`}
                                >
                                    {d.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Rekod Terbaik */}
                {spellingScore > 0 && (
                    <div className="bg-sky-50 border border-sky-200 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>🏆 Rekod Terbaik: {spellingScore} XP</span>
                        <span className="text-[10px] uppercase font-black text-[#0099e5] bg-white px-2 py-0.5 rounded-md border border-sky-200">
                            Tercatat
                        </span>
                    </div>
                )}

                {/* BUTTON 1: PRIMARY BLUE */}
                <button
                    type="button"
                    onClick={startNewGame}
                    className="w-full py-4 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] text-white font-black text-base rounded-2xl shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                    <span>Mula Pertandingan (8 Soalan)</span>
                    <span>🚀</span>
                </button>
            </div>
        );
    }

    /* =========================================================================
       VIEW 2: PLAYING SCREEN (FORMAT PERTANDINGAN: TERUS KE SOALAN SETERUSNYA)
       ========================================================================= */
    if (gameState === "playing" && currentWord) {
        const isUrgent = timeLeft <= 6;
        const timerPercent = (timeLeft / TIMER_LIMIT) * 100;

        return (
            <div className="w-full max-w-xl mx-auto space-y-4 anim-fade-in text-left">
                {/* Top Status Bar */}
                <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border-2 border-slate-200 shadow-xs">
                    {/* BUTTON 2: SECONDARY WHITE */}
                    <button
                        type="button"
                        onClick={() => {
                            playLocalSound("tap");
                            setShowExitConfirm(true);
                        }}
                        className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs flex items-center gap-1 border border-slate-200 cursor-pointer"
                    >
                        <GraphicBackArrow className="w-3.5 h-3.5 text-slate-500" />
                        <span>Keluar</span>
                    </button>

                    {/* Progress Info */}
                    <div className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        Soalan {currentIndex + 1} / {wordList.length}
                    </div>

                    {/* Timer Indicator */}
                    <div className="flex items-center gap-1.5 text-xs font-black">
                        <GraphicTimer className={`w-4 h-4 ${isUrgent ? "text-rose-600 animate-bounce" : "text-[#0099e5]"}`} />
                        <span className={isUrgent ? "text-rose-600 animate-pulse font-black" : "text-slate-800"}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>

                {/* Main Interactive Stage */}
                <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md space-y-5 relative">
                    {/* Progress Timer Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${
                                isUrgent ? "bg-rose-500" : "bg-[#0099e5]"
                            }`}
                            style={{ width: `${timerPercent}%` }}
                        />
                    </div>

                    {/* Speaker & Audio Section */}
                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center space-y-4">
                        {currentWord.image ? (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-xs">
                                <img
                                    src={currentWord.image}
                                    alt="Spelling Object"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-20 h-20 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center text-4xl border border-sky-200">
                                🐝
                            </div>
                        )}

                        {/* Speaker Button: Primary Blue */}
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    primeAudio();
                                    speakWord(currentWord.word);
                                }}
                                className="px-5 py-2.5 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all active:scale-95 inline-flex items-center gap-2"
                            >
                                <GraphicSpeaker isPlaying={isSpeaking} className="w-4 h-4" />
                                <span>{isSpeaking ? "Mendengar..." : "Dengar Sebutan (Audio)"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Text Input Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={userSpelling}
                                onChange={(e) => setUserSpelling(e.target.value)}
                                placeholder="Taip ejaan di sini..."
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="none"
                                spellCheck="false"
                                className="flex-1 px-4 py-3.5 bg-white border-2 border-slate-300 focus:border-[#0099e5] focus:outline-none rounded-2xl text-lg font-mono font-black text-slate-800 placeholder-slate-400"
                            />

                            {/* BUTTON 1: PRIMARY BLUE */}
                            <button
                                type="submit"
                                disabled={!userSpelling.trim()}
                                className="px-6 py-3.5 bg-[#0099e5] hover:bg-[#0088cc] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-sm rounded-2xl shadow-xs cursor-pointer transition-all active:scale-95 disabled:cursor-not-allowed"
                            >
                                Hantar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Pop-up Pengesahan Keluar */}
                {showExitConfirm && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 anim-fade-in">
                        <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-2 border-slate-200 shadow-2xl text-center space-y-4 anim-pop">
                            <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-2xl border border-sky-200">
                                ⚠️
                            </div>
                            <div>
                                <h3 className="text-base font-black text-slate-900">
                                    Keluar Dari Pertandingan?
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    Keputusan pertandingan tidak akan direkod jika keluar sekarang.
                                </p>
                            </div>
                            <div className="flex gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowExitConfirm(false)}
                                    className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                                >
                                    Teruskan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsTimerRunning(false);
                                        setGameState("start");
                                    }}
                                    className="flex-1 py-2.5 bg-[#0099e5] hover:bg-[#0088cc] text-white font-bold rounded-xl text-xs cursor-pointer"
                                >
                                    Ya, Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    /* =========================================================================
       VIEW 3: RESULT SCREEN (KEPUTUSAN & PEMBETULAN PENUH HANYA DI SINI!)
       ========================================================================= */
    return (
        <div className="w-full max-w-xl mx-auto space-y-4 anim-fade-in text-left">
            {/* Header Keputusan */}
            <div className="bg-gradient-to-r from-[#0088cc] to-[#0099e5] rounded-3xl p-5 sm:p-6 border-2 border-white/20 text-white shadow-md text-center space-y-3">
                <div className="flex justify-center anim-pop">
                    <GraphicTrophy className="w-16 h-16 drop-shadow-sm" />
                </div>

                <div>
                    <span className="inline-block bg-white/20 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1">
                        Keputusan Rasmi Pertandingan
                    </span>
                    <h2 className="text-2xl font-black">
                        {accuracy >= 80 ? "Hebat! Juara Spelling Bee!" : accuracy >= 50 ? "Tahniah! Usaha Yang Bagus!" : "Teruskan Belajar & Berlatih!"}
                    </h2>
                    <p className="text-xs text-sky-100 mt-0.5">
                        Menjawab {totalQuestions} soalan ejaan Bahasa Inggeris
                    </p>
                </div>

                {/* Ringkasan Skor 3 Kolum */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-slate-800">
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
                        <div className="text-[10px] font-black uppercase text-slate-500">Skor Terkumpul</div>
                        <div className="text-xl font-black text-[#0099e5] mt-0.5">+{finalScore} XP</div>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
                        <div className="text-[10px] font-black uppercase text-slate-500">Ketepatan</div>
                        <div className="text-xl font-black text-emerald-600 mt-0.5">{accuracy}%</div>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
                        <div className="text-[10px] font-black uppercase text-slate-500">Betul / Salah</div>
                        <div className="text-xl font-black text-slate-700 mt-0.5">{correctCount} / {totalQuestions}</div>
                    </div>
                </div>

                {/* Ganjaran Koin Bintang */}
                <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-950 font-black px-4 py-2.5 rounded-2xl shadow-sm border-2 border-white flex items-center justify-center gap-2 anim-pop">
                    <span className="text-2xl">🌟</span>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-amber-900 block leading-tight">Ganjaran Koin Pertandingan</span>
                        <span className="text-base font-black">+{accuracy >= 80 ? 20 : accuracy >= 50 ? 15 : 10} Koin Bintang Diperoleh!</span>
                    </div>
                </div>
            </div>

            {/* SEKSYEN PEMBETULAN & SEMAKAN EJAAN (HANYA DI SINI) */}
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h3 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <span>📝</span> Pembetulan & Semakan Ejaan
                    </h3>
                    <span className="text-xs font-bold text-slate-600">
                        {correctCount} / {totalQuestions} Betul
                    </span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {resultsHistory.map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-3 rounded-2xl border flex items-center justify-between gap-2.5 ${
                                item.isCorrect ? "bg-emerald-50/60 border-emerald-200" : "bg-rose-50/60 border-rose-200"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.image ? (
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
                                        <img src={item.image} alt={item.word} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <span className="text-2xl">🐝</span>
                                )}

                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 ${
                                                item.isCorrect ? "bg-emerald-600" : "bg-rose-600"
                                            }`}
                                        >
                                            {item.isCorrect ? "✓" : "✕"}
                                        </span>
                                        <span className="text-sm font-black font-mono uppercase text-slate-900">
                                            {item.word}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-600 flex items-center gap-1.5 font-mono">
                                        <span>Ejaan anda:</span>
                                        <span className={item.isCorrect ? "font-bold text-emerald-700" : "font-bold text-rose-600 line-through"}>
                                            {item.typed}
                                        </span>
                                        {!item.isCorrect && (
                                            <span className="font-bold text-emerald-700 ml-1">
                                                (Betul: {item.word})
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => {
                                        playLocalSound("tap");
                                        speakWord(item.word);
                                    }}
                                    className="p-1.5 bg-white hover:bg-slate-50 text-[#0099e5] rounded-lg border border-slate-200 shadow-xs cursor-pointer"
                                    title="Dengar sebutan"
                                >
                                    <GraphicSpeaker className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-black text-amber-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                                    +{item.pointsEarned} XP
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BUTANG TINDAKAN (1-2 WARNA STANDARD) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
                {/* BUTANG 1: PRIMARY BLUE */}
                <button
                    type="button"
                    onClick={() => {
                        playLocalSound("tap");
                        startNewGame();
                    }}
                    className="py-3.5 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] text-white font-black rounded-2xl shadow-xs cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                >
                    <span>🔄</span>
                    <span>Main Semula</span>
                </button>

                {/* BUTANG 2: SECONDARY WHITE */}
                <button
                    type="button"
                    onClick={() => {
                        playLocalSound("tap");
                        if (typeof onNavigate === "function") {
                            onNavigate("competitionList");
                        }
                    }}
                    className="py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl shadow-xs border border-slate-200 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                >
                    <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                    <span>Back</span>
                </button>
            </div>
        </div>
    );
}
