"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* =========================================================================
   VECTOR SVG GRAPHICS FOR MATH SPEED QUIZ (SIFIR KILAT)
   ========================================================================= */

function GraphicMathMascot({ className = "w-16 h-16" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="calcGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0099e5" />
                    <stop offset="1" stopColor="#0077b6" />
                </linearGradient>
            </defs>
            <rect x="20" y="16" width="60" height="72" rx="14" fill="url(#calcGrad)" stroke="#005b8e" strokeWidth="2" />
            <rect x="28" y="24" width="44" height="20" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="42" cy="34" r="3.5" fill="#0369a1" />
            <circle cx="58" cy="34" r="3.5" fill="#0369a1" />
            <path d="M47 38C48.5 40.5 51.5 40.5 53 38" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 16V9" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="7" r="4" fill="#0284c7" />
            <rect x="28" y="50" width="12" height="9" rx="3" fill="#ffffff" />
            <text x="34" y="57" fontSize="7" fontWeight="bold" fill="#0369a1" textAnchor="middle">+</text>
            <rect x="44" y="50" width="12" height="9" rx="3" fill="#ffffff" />
            <text x="50" y="57" fontSize="7" fontWeight="bold" fill="#0369a1" textAnchor="middle">-</text>
            <rect x="60" y="50" width="12" height="9" rx="3" fill="#ffffff" />
            <text x="66" y="57" fontSize="7" fontWeight="bold" fill="#0369a1" textAnchor="middle">×</text>
            <rect x="28" y="63" width="12" height="9" rx="3" fill="#ffffff" />
            <text x="34" y="70" fontSize="7" fontWeight="bold" fill="#0369a1" textAnchor="middle">÷</text>
            <rect x="44" y="63" width="12" height="9" rx="3" fill="#ffffff" />
            <text x="50" y="70" fontSize="7" fontWeight="bold" fill="#0369a1" textAnchor="middle">=</text>
            <rect x="60" y="63" width="12" height="9" rx="3" fill="#ffffff" />
            <text x="66" y="70" fontSize="6" fontWeight="bold" fill="#0369a1" textAnchor="middle">%</text>
        </svg>
    );
}

function GraphicTrophy({ className = "w-16 h-16" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="mathTrophyGrad" x1="20" y1="10" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
            </defs>
            <path d="M28 20C18 20 14 30 14 42C14 54 24 60 32 60" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M72 20C82 20 86 30 86 42C86 54 76 60 68 60" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M26 16H74L68 50C68 62 58 68 50 68C42 68 32 62 32 50L26 16Z" fill="url(#mathTrophyGrad)" stroke="#a16207" strokeWidth="2.5" />
            <path d="M46 68H54V78H46V68Z" fill="#ca8a04" />
            <path d="M30 84H70L66 78H34L30 84Z" fill="#854d0e" />
            <rect x="26" y="84" width="48" height="6" rx="2" fill="#713f12" />
            <text x="50" y="47" fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">×</text>
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

/* =========================================================================
   QUESTION GENERATOR FOR MULTIPLICATION (1 - 12)
   ========================================================================= */

export function generateMathQuestion(allowedTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    const validTables = Array.isArray(allowedTables) && allowedTables.length > 0
        ? allowedTables
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const table = validTables[Math.floor(Math.random() * validTables.length)];
    const multiplier = Math.floor(Math.random() * 12) + 1;
    const answer = table * multiplier;

    const pool = new Set();
    const candidates = [
        answer + table,
        answer - table,
        answer + 1,
        answer - 1,
        answer + 10,
        answer - 10,
        table * (multiplier + 2),
        table * (multiplier - 2),
    ].filter((v) => v > 0 && v !== answer);

    for (const val of candidates) {
        if (pool.size < 3) pool.add(val);
    }

    let offset = 3;
    while (pool.size < 3) {
        const fallback = answer + offset;
        if (fallback > 0 && fallback !== answer) pool.add(fallback);
        offset += 2;
    }

    const options = [answer, ...Array.from(pool)].sort(() => 0.5 - Math.random());

    return {
        table,
        multiplier,
        answer,
        options,
        questionText: `${table} × ${multiplier}`,
    };
}

/* =========================================================================
   MAIN COMPONENT: MATH SPEED QUIZ (FORMAT PERTANDINGAN)
   ========================================================================= */

export default function MathSpeedQuiz({
    onNavigate,
    onSubmitMathQuiz,
    mathScore = 0,
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

    // Game state: "setup" | "playing" | "result"
    const [gameState, setGameState] = useState("setup");
    const [selectedTables, setSelectedTables] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [gameMode, setGameMode] = useState("timed60"); // "timed60" | "sprint10"

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerLocked, setIsAnswerLocked] = useState(false);

    // Scoring & History
    const [history, setHistory] = useState([]);
    const [timeLeft60, setTimeLeft60] = useState(60);
    const [sprintTime, setSprintTime] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const isRunningRef = useRef(false);

    const toggleTable = (num) => {
        playLocalSound("tap");
        setSelectedTables((prev) => {
            if (prev.includes(num)) {
                if (prev.length === 1) return prev;
                return prev.filter((n) => n !== num);
            } else {
                return [...prev, num].sort((a, b) => a - b);
            }
        });
    };

    const selectAllTables = () => {
        playLocalSound("tap");
        setSelectedTables([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    };

    const startQuiz = () => {
        if (!isLoggedIn && onBlockedAction) {
            onBlockedAction();
            return;
        }

        playLocalSound("tap");
        setHistory([]);
        setQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswerLocked(false);
        setTimeLeft60(60);
        setSprintTime(0);
        setShowExitConfirm(false);

        const firstQ = generateMathQuestion(selectedTables);
        setCurrentQuestion(firstQ);
        setQuestionStartTime(Date.now());

        setGameState("playing");
        isRunningRef.current = true;
    };

    // Countdown / Sprint timer
    useEffect(() => {
        let timer = null;
        if (gameState === "playing" && isRunningRef.current && !showExitConfirm) {
            if (gameMode === "timed60") {
                timer = setInterval(() => {
                    setTimeLeft60((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            isRunningRef.current = false;
                            finishQuiz();
                            return 0;
                        }
                        if (prev <= 10 && prev > 1) {
                            playLocalSound("tick");
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else if (gameMode === "sprint10") {
                timer = setInterval(() => {
                    setSprintTime((prev) => +(prev + 0.1).toFixed(1));
                }, 100);
            }
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameState, gameMode, playLocalSound]);

    // Handle answer selection (FORMAT PERTANDINGAN: NO INSTANT REVEAL!)
    const handleSelectAnswer = (option) => {
        if (isAnswerLocked || !currentQuestion) return;

        setIsAnswerLocked(true);
        setSelectedAnswer(option);
        playLocalSound("tap");

        const isCorrect = option === currentQuestion.answer;
        const timeTakenForQ = +((Date.now() - questionStartTime) / 1000).toFixed(1);

        // Calculate points
        let pointsAwarded = 0;
        if (isCorrect) {
            const speedBonus = timeTakenForQ <= 2.0 ? 5 : timeTakenForQ <= 3.5 ? 2 : 0;
            pointsAwarded = 10 + speedBonus;
        }

        const record = {
            questionText: currentQuestion.questionText,
            correctAnswer: currentQuestion.answer,
            selected: option,
            isCorrect,
            timeTaken: timeTakenForQ,
            points: pointsAwarded,
        };

        setHistory((prev) => [...prev, record]);

        // Immediate advance without revealing whether right or wrong (150ms neutral tap feedback)
        setTimeout(() => {
            if (!isRunningRef.current) return;

            if (gameMode === "sprint10" && questionIndex + 1 >= 10) {
                isRunningRef.current = false;
                finishQuiz();
            } else {
                const nextQ = generateMathQuestion(selectedTables);
                setCurrentQuestion(nextQ);
                setQuestionIndex((prev) => prev + 1);
                setSelectedAnswer(null);
                setIsAnswerLocked(false);
                setQuestionStartTime(Date.now());
            }
        }, 150);
    };

    const finishQuiz = useCallback(() => {
        isRunningRef.current = false;
        playLocalSound("victory");
        setGameState("result");
    }, [playLocalSound]);

    // When moving to result, calculate final score, submit, and record for Parent Dashboard
    useEffect(() => {
        if (gameState === "result" && history.length > 0) {
            const totalScore = history.reduce((sum, h) => sum + (h.points || 0), 0);
            const totalAns = history.length;
            const avgSpeedCalc = totalAns > 0
                ? +(history.reduce((acc, h) => acc + h.timeTaken, 0) / totalAns).toFixed(1)
                : 0;

            // Simpan analisis matematik untuk Paparan Ibu Bapa
            try {
                const activeIC = typeof window !== "undefined"
                    ? (localStorage.getItem("exploria_active_ic") || localStorage.getItem("exploria_student_ic"))
                    : null;
                const stuId = activeIC ? `STU-${activeIC.slice(-5)}` : "STU-15542";
                const mathKey = `exploria_math_history_${activeIC || stuId}`;
                const prev = JSON.parse(localStorage.getItem(mathKey) || "{}");

                const fastest = prev.fastestTime ? Math.min(prev.fastestTime, avgSpeedCalc) : avgSpeedCalc;
                const bestScore = Math.max(prev.highScore || 0, totalScore);
                const tableStats = prev.tableStats || {};

                history.forEach((h) => {
                    const tbl = h.table || 2;
                    if (!tableStats[tbl]) tableStats[tbl] = { correct: 0, total: 0 };
                    tableStats[tbl].total += 1;
                    if (h.isCorrect) tableStats[tbl].correct += 1;
                });

                localStorage.setItem(mathKey, JSON.stringify({
                    fastestTime: fastest,
                    highScore: bestScore,
                    lastPlayed: new Date().toISOString(),
                    tableStats,
                }));
            } catch (err) {
                console.warn("Ralat merekod data matematik ibu bapa:", err);
            }

            if (typeof onSubmitMathQuiz === "function") {
                onSubmitMathQuiz(totalScore);
            }
        }
    }, [gameState]);

    // Calculations for Result Screen
    const totalAnswered = history.length;
    const correctCount = history.filter((h) => h.isCorrect).length;
    const wrongCount = totalAnswered - correctCount;
    const finalScore = history.reduce((sum, h) => sum + (h.points || 0), 0);
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const avgSpeed = totalAnswered > 0
        ? +(history.reduce((acc, h) => acc + h.timeTaken, 0) / totalAnswered).toFixed(1)
        : 0;

    /* =========================================================================
       VIEW 1: SETUP SCREEN (MINIMAL TEXT, 1-2 BUTTON COLORS)
       ========================================================================= */
    if (gameState === "setup") {
        return (
            <div className="w-full max-w-xl mx-auto space-y-4 anim-fade-in text-left">
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
                            {t ? t("Pertandingan Sifir Kilat", "Speed Math Challenge") : "Pertandingan Sifir Kilat"}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t ? t("Pilih sifir dan mulakan pertandingan.", "Choose tables and start the competition.") : "Pilih sifir dan mulakan pertandingan."}
                        </p>
                    </div>
                </div>

                {/* Sifir 1-12 Selector */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                            Pilihan Sifir (1 - 12):
                        </span>
                        <button
                            type="button"
                            onClick={selectAllTables}
                            className="text-xs text-[#0099e5] hover:underline font-bold cursor-pointer"
                        >
                            Pilih Semua
                        </button>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                            const isSelected = selectedTables.includes(num);
                            return (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => toggleTable(num)}
                                    className={`py-2.5 rounded-xl font-black text-sm border-2 transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-[#0099e5] text-white border-[#0088cc] shadow-xs scale-102"
                                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                                    }`}
                                >
                                    Sifir {num}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Mod Pertandingan: 60s vs 10 Soalan */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">
                        Mod Masa:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setGameMode("timed60");
                            }}
                            className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                                gameMode === "timed60"
                                    ? "bg-sky-50/80 border-[#0099e5] shadow-xs"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                            <span className="text-xs font-black block text-slate-800">⏱️ Cabaran 60 Saat</span>
                            <span className="text-[11px] text-slate-500 font-medium">Jawab sebanyak mungkin</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setGameMode("sprint10");
                            }}
                            className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                                gameMode === "sprint10"
                                    ? "bg-sky-50/80 border-[#0099e5] shadow-xs"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                            <span className="text-xs font-black block text-slate-800">⚡ 10 Soalan Pantas</span>
                            <span className="text-[11px] text-slate-500 font-medium">Uji kepantasan minit</span>
                        </button>
                    </div>
                </div>

                {/* Rekod Terbaik */}
                {mathScore > 0 && (
                    <div className="bg-sky-50 border border-sky-200 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>🏆 Rekod Terbaik: {mathScore} XP</span>
                        <span className="text-[10px] uppercase font-black text-[#0099e5] bg-white px-2 py-0.5 rounded-md border border-sky-200">
                            Tercatat
                        </span>
                    </div>
                )}

                {/* BUTTON 1: PRIMARY BLUE */}
                <button
                    type="button"
                    onClick={startQuiz}
                    className="w-full py-4 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] text-white font-black text-base rounded-2xl shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                    <span>Mula Pertandingan</span>
                    <span>🚀</span>
                </button>
            </div>
        );
    }

    /* =========================================================================
       VIEW 2: PLAYING SCREEN (FORMAT PERTANDINGAN: TIADA REVEAL / BETUL / SALAH)
       ========================================================================= */
    if (gameState === "playing" && currentQuestion) {
        const isUrgent = gameMode === "timed60" && timeLeft60 <= 10;
        const timerPercent = gameMode === "timed60" ? (timeLeft60 / 60) * 100 : ((10 - questionIndex) / 10) * 100;

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
                        {gameMode === "timed60" ? (
                            <span>Soalan Ke-{history.length + 1}</span>
                        ) : (
                            <span>Soalan {questionIndex + 1} / 10</span>
                        )}
                    </div>

                    {/* Timer Indicator */}
                    <div className="flex items-center gap-1.5 text-xs font-black">
                        <GraphicTimer className={`w-4 h-4 ${isUrgent ? "text-rose-600 animate-bounce" : "text-[#0099e5]"}`} />
                        <span className={isUrgent ? "text-rose-600 animate-pulse font-black" : "text-slate-800"}>
                            {gameMode === "timed60" ? `${timeLeft60}s` : `${sprintTime}s`}
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

                    {/* Multiplication Card */}
                    <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-slate-200 text-center space-y-2">
                        <span className="inline-block bg-white text-slate-700 border border-slate-200 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Sifir {currentQuestion.table}
                        </span>

                        <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono select-none">
                            <span>{currentQuestion.table}</span>
                            <span className="text-[#0099e5] mx-3">×</span>
                            <span>{currentQuestion.multiplier}</span>
                            <span className="text-slate-400 mx-3">=</span>
                            <span className="text-[#0099e5]">?</span>
                        </div>
                    </div>

                    {/* 4 Answer Options (NO REVEAL OF CORRECT/WRONG UNTIL END) */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = option === selectedAnswer;
                            const btnStyle = isSelected
                                ? "bg-[#0099e5] text-white border-[#0088cc] scale-98"
                                : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-[#0099e5] active:scale-97";

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={isAnswerLocked}
                                    onClick={() => handleSelectAnswer(option)}
                                    className={`min-h-[72px] sm:min-h-[80px] p-3 rounded-2xl border-2 font-mono font-black text-2xl sm:text-3xl shadow-xs transition-all duration-100 flex items-center justify-center cursor-pointer select-none ${btnStyle}`}
                                >
                                    <span>{option}</span>
                                </button>
                            );
                        })}
                    </div>
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
                                        isRunningRef.current = false;
                                        setGameState("setup");
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
                        {accuracy >= 80 ? "Hebat! Cemerlang!" : accuracy >= 50 ? "Tahniah! Teruskan Usaha!" : "Latihan Lagi, Pasti Boleh!"}
                    </h2>
                    <p className="text-xs text-sky-100 mt-0.5">
                        {gameMode === "timed60"
                            ? `Menjawab ${totalAnswered} soalan dalam 60 saat`
                            : `Selesai 10 soalan dalam ${sprintTime} saat`}
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
                        <div className="text-[10px] font-black uppercase text-slate-500">Purata Masa</div>
                        <div className="text-xl font-black text-slate-700 mt-0.5">{avgSpeed}s</div>
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

            {/* SEKSYEN PEMBETULAN & SEMAKAN (HANYA DI SINI) */}
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h3 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <span>📝</span> Pembetulan & Semakan Soalan
                    </h3>
                    <span className="text-xs font-bold text-slate-600">
                        {correctCount} / {totalAnswered} Betul
                    </span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {history.map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-3 rounded-2xl border flex items-center justify-between gap-2.5 ${
                                item.isCorrect ? "bg-emerald-50/60 border-emerald-200" : "bg-rose-50/60 border-rose-200"
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <span
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ${
                                        item.isCorrect ? "bg-emerald-600" : "bg-rose-600"
                                    }`}
                                >
                                    {item.isCorrect ? "✓" : "✕"}
                                </span>
                                <div>
                                    <span className="font-mono font-black text-sm text-slate-900">
                                        {item.questionText} = {item.correctAnswer}
                                    </span>
                                    {!item.isCorrect && (
                                        <span className="text-xs text-rose-600 font-mono ml-2 line-through font-bold">
                                            (Jawapan anda: {item.selected})
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                                    ⏱️ {item.timeTaken}s
                                </span>
                                <span className="text-xs font-black text-amber-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                                    +{item.points} XP
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
                        startQuiz();
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
