"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* =========================================================================
   VECTOR SVG GRAPHICS FOR MATH SPEED QUIZ (EXPLORIA SIFIR KILAT)
   ========================================================================= */

function GraphicMathMascot({ mood = "happy", className = "w-20 h-20" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="calcGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="0.5" stopColor="#4f46e5" />
                    <stop offset="1" stopColor="#3730a3" />
                </linearGradient>
                <linearGradient id="screenGrad" x1="20" y1="20" x2="80" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a7f3d0" />
                    <stop offset="1" stopColor="#34d399" />
                </linearGradient>
            </defs>

            {/* Robot Calculator Body */}
            <rect x="20" y="16" width="60" height="72" rx="14" fill="url(#calcGrad)" stroke="#312e81" strokeWidth="2.5" />
            
            {/* Screen */}
            <rect x="28" y="24" width="44" height="20" rx="6" fill="url(#screenGrad)" stroke="#065f46" strokeWidth="1.5" />
            
            {/* Mascot Eyes on Screen */}
            {mood === "happy" && (
                <>
                    <circle cx="42" cy="34" r="3.5" fill="#064e3b" />
                    <circle cx="43.2" cy="32.8" r="1.2" fill="#ffffff" />
                    <circle cx="58" cy="34" r="3.5" fill="#064e3b" />
                    <circle cx="59.2" cy="32.8" r="1.2" fill="#ffffff" />
                    <path d="M47 38C48.5 40.5 51.5 40.5 53 38" stroke="#064e3b" strokeWidth="1.8" strokeLinecap="round" />
                </>
            )}
            {mood === "wrong" && (
                <>
                    <path d="M39 31L45 37M45 31L39 37" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M55 31L61 37M61 31L55 37" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M47 39C48.5 37.5 51.5 37.5 53 39" stroke="#064e3b" strokeWidth="1.8" strokeLinecap="round" />
                </>
            )}
            {mood === "thinking" && (
                <>
                    <circle cx="42" cy="33" r="3.5" fill="#064e3b" />
                    <circle cx="58" cy="33" r="3.5" fill="#064e3b" />
                    <line x1="47" y1="38" x2="53" y2="38" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
                </>
            )}

            {/* Cute Antenna */}
            <path d="M50 16V9" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="7" r="4" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

            {/* Calculator Buttons Grid */}
            <rect x="28" y="50" width="12" height="9" rx="3" fill="#e0e7ff" />
            <text x="34" y="57" fontSize="7" fontWeight="bold" fill="#3730a3" textAnchor="middle">+</text>

            <rect x="44" y="50" width="12" height="9" rx="3" fill="#e0e7ff" />
            <text x="50" y="57" fontSize="7" fontWeight="bold" fill="#3730a3" textAnchor="middle">-</text>

            <rect x="60" y="50" width="12" height="9" rx="3" fill="#fef08a" />
            <text x="66" y="57" fontSize="7" fontWeight="bold" fill="#854d0e" textAnchor="middle">×</text>

            <rect x="28" y="63" width="12" height="9" rx="3" fill="#e0e7ff" />
            <text x="34" y="70" fontSize="7" fontWeight="bold" fill="#3730a3" textAnchor="middle">÷</text>

            <rect x="44" y="63" width="12" height="9" rx="3" fill="#e0e7ff" />
            <text x="50" y="70" fontSize="7" fontWeight="bold" fill="#3730a3" textAnchor="middle">=</text>

            <rect x="60" y="63" width="12" height="9" rx="3" fill="#fb7185" />
            <text x="66" y="70" fontSize="6" fontWeight="bold" fill="#ffffff" textAnchor="middle">%</text>

            <rect x="28" y="75" width="44" height="7" rx="3" fill="#818cf8" opacity="0.6" />
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

function GraphicTimer({ className = "w-5 h-5" }) {
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
   HELPER: QUESTION GENERATOR WITH SMART DISTRACTORS
   ========================================================================= */

function generateMathQuestion(selectedTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    const validTables = selectedTables.length > 0 ? selectedTables : [2, 3, 4, 5];
    const table = validTables[Math.floor(Math.random() * validTables.length)];
    const multiplier = Math.floor(Math.random() * 12) + 1;
    const answer = table * multiplier;

    // Generate logical and close distractors
    const pool = new Set();
    const candidates = [
        table * (multiplier + 1),
        table * (multiplier - 1),
        answer + 1,
        answer - 1,
        answer + 2,
        answer - 2,
        answer + table,
        answer - table,
        (table + 1) * multiplier,
        (table - 1) * multiplier,
        answer + 10,
        answer - 10,
    ].filter((val) => val > 0 && val !== answer);

    candidates.sort(() => 0.5 - Math.random());
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
   MAIN COMPONENT: MATH SPEED QUIZ (PERTANDINGAN SIFIR)
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
    // -------------------------------------------------------------
    // AUDIO FEEDBACK SYNTHESIZER
    // -------------------------------------------------------------
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

            if (type === "correct" || type === "victory") {
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
            } else if (type === "wrong" || type === "buzzer" || type === "timeout") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.25);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
            } else if (type === "tap" || type === "pop") {
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

    // -------------------------------------------------------------
    // GAME STATES & SETUP CONFIGURATION
    // -------------------------------------------------------------
    const [gameState, setGameState] = useState("setup"); // "setup" | "playing" | "result"
    
    // Sifir selection: Array of selected tables 1 to 12
    const [selectedTables, setSelectedTables] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    
    // Game mode: "timed60" (60s countdown) or "sprint10" (10 quick questions)
    const [gameMode, setGameMode] = useState("timed60");

    // In-game dynamic question state
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0); // For sprint10 mode (0 to 9)
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerLocked, setIsAnswerLocked] = useState(false);

    // Scoring & Statistics
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [history, setHistory] = useState([]);

    // Timers
    const [timeLeft60, setTimeLeft60] = useState(60);
    const [sprintTime, setSprintTime] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const isRunningRef = useRef(false);

    // -------------------------------------------------------------
    // TOGGLE SIFIR SELECTION
    // -------------------------------------------------------------
    const toggleTable = (num) => {
        playLocalSound("tap");
        setSelectedTables((prev) => {
            if (prev.includes(num)) {
                if (prev.length === 1) return prev; // Keep at least one selected
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

    const selectPreset = (type) => {
        playLocalSound("tap");
        if (type === "basic") setSelectedTables([2, 5, 10]);
        if (type === "intermediate") setSelectedTables([3, 4, 6]);
        if (type === "advanced") setSelectedTables([7, 8, 9, 12]);
    };

    // -------------------------------------------------------------
    // START NEW GAME
    // -------------------------------------------------------------
    const startQuiz = () => {
        if (!isLoggedIn && onBlockedAction) {
            onBlockedAction();
            return;
        }

        playLocalSound("tap");

        setScore(0);
        setCorrectCount(0);
        setWrongCount(0);
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

    // -------------------------------------------------------------
    // TIMER EFFECTS (PAUSES AUTOMATICALLY WHEN EXIT POPUP IS OPEN)
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // HANDLE ANSWER SELECTION
    // -------------------------------------------------------------
    const handleSelectAnswer = (option) => {
        if (isAnswerLocked || !currentQuestion) return;

        setIsAnswerLocked(true);
        setSelectedAnswer(option);

        const isCorrect = option === currentQuestion.answer;
        const timeTakenForQ = +((Date.now() - questionStartTime) / 1000).toFixed(1);

        let pointsAwarded = 0;
        if (isCorrect) {
            playLocalSound("correct");
            // Base 10 points + bonus for answering under 2.5s
            const speedBonus = timeTakenForQ <= 2.0 ? 5 : timeTakenForQ <= 3.5 ? 2 : 0;
            pointsAwarded = 10 + speedBonus;
            setScore((prev) => prev + pointsAwarded);
            setCorrectCount((prev) => prev + 1);
        } else {
            playLocalSound("wrong");
            setWrongCount((prev) => prev + 1);
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

        // Auto advance after brief visual feedback (380ms)
        setTimeout(() => {
            if (!isRunningRef.current) return;

            if (gameMode === "sprint10" && questionIndex + 1 >= 10) {
                // Sprint 10 finished!
                isRunningRef.current = false;
                finishQuiz();
            } else {
                // Next question
                const nextQ = generateMathQuestion(selectedTables);
                setCurrentQuestion(nextQ);
                setQuestionIndex((prev) => prev + 1);
                setSelectedAnswer(null);
                setIsAnswerLocked(false);
                setQuestionStartTime(Date.now());
            }
        }, 380);
    };

    // -------------------------------------------------------------
    // FINISH QUIZ & RESULT CALCULATIONS
    // -------------------------------------------------------------
    const finishQuiz = useCallback(() => {
        isRunningRef.current = false;
        playLocalSound("victory");
        setGameState("result");

        if (typeof onSubmitMathQuiz === "function") {
            onSubmitMathQuiz(score);
        }
    }, [playLocalSound, onSubmitMathQuiz, score]);

    // Summary calculations
    const totalQuestions = correctCount + wrongCount;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const avgSpeed = history.length > 0
        ? +(history.reduce((acc, h) => acc + h.timeTaken, 0) / history.length).toFixed(1)
        : 0;

    /* =========================================================================
       VIEW 1: SETUP SCREEN (SELECT MULTIPLICATION TABLES & GAME MODE)
       ========================================================================= */
    if (gameState === "setup") {
        return (
            <div className="w-full max-w-xl mx-auto space-y-4 text-left">
                {/* Header with Back button */}
                <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🔢</span>
                            <h2 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
                                Pertandingan Sifir Kilat
                            </h2>
                        </div>
                        <p className="text-xs text-indigo-700 mt-0.5 font-semibold">
                            Uji kepantasan congak pendaraban matematik anda!
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            playLocalSound("tap");
                            onNavigate("activityList");
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-xl text-xs flex items-center gap-1.5 border border-slate-200 shadow-xs cursor-pointer transition-all active:scale-95"
                    >
                        <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                        <span>Aktiviti</span>
                    </button>
                </div>

                {/* Hero Mascot Banner (Statik) */}
                <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-3xl p-5 border-3 border-indigo-400 text-white shadow-md flex items-center gap-4">
                    <div className="shrink-0">
                        <GraphicMathMascot mood="happy" className="w-20 h-20 drop-shadow-md" />
                    </div>
                    <div className="space-y-1">
                        <div className="inline-block bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Matematik Pantas • Speed Challenge
                        </div>
                        <h3 className="text-base sm:text-lg font-black leading-tight">
                            Asah Minda & Kuasai Sifir!
                        </h3>
                        <p className="text-xs text-indigo-100 font-medium">
                            Pilih sifir kegemaran, tekan jawapan pantas, dan kumpul mata XP tertinggi!
                        </p>
                    </div>
                </div>

                {/* 1. Sifir Range Selector */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-indigo-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                            <span>🎯</span>
                            <span>Pilih Julat Sifir:</span>
                        </label>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                                type="button"
                                onClick={() => selectPreset("basic")}
                                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold border border-indigo-200 cursor-pointer"
                            >
                                Asas (2,5,10)
                            </button>
                            <button
                                type="button"
                                onClick={() => selectPreset("intermediate")}
                                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold border border-indigo-200 cursor-pointer"
                            >
                                Sederhana (3,4,6)
                            </button>
                            <button
                                type="button"
                                onClick={() => selectPreset("advanced")}
                                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-bold border border-indigo-200 cursor-pointer"
                            >
                                Cabaran (7,8,9,12)
                            </button>
                            <button
                                type="button"
                                onClick={selectAllTables}
                                className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-lg text-[11px] font-black border border-purple-300 cursor-pointer"
                            >
                                Semua (1-12)
                            </button>
                        </div>
                    </div>

                    {/* Sifir 1 to 12 Buttons Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                            const isSelected = selectedTables.includes(num);
                            return (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => toggleTable(num)}
                                    className={`py-2.5 rounded-2xl text-xs font-black transition-colors cursor-pointer border-2 outline-none focus:outline-none flex flex-col items-center justify-center gap-0.5 shadow-2xs ${
                                        isSelected
                                            ? "bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-indigo-500 shadow-sm"
                                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-indigo-50/50"
                                    }`}
                                >
                                    <span className="text-[10px] opacity-80 uppercase">Sifir</span>
                                    <span className="text-sm sm:text-base">{num}</span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium text-center pt-1">
                        {selectedTables.length === 12
                            ? "Semua sifir 1 hingga 12 dipilih secara rawak."
                            : `${selectedTables.length} sifir dipilih: Sifir ${selectedTables.join(", ")}`}
                    </p>
                </div>

                {/* 2. Game Mode Selector */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-indigo-200 shadow-xs space-y-3">
                    <label className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <span>⚡</span>
                        <span>Pilih Mod Permainan:</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setGameMode("timed60");
                            }}
                            className={`p-4 rounded-2xl text-left border-2 border-slate-200 outline-none focus:outline-none focus:ring-0 transition-colors flex items-start gap-3 ${
                                gameMode === "timed60"
                                    ? "bg-indigo-50/70"
                                    : "bg-slate-50 hover:bg-slate-100/60"
                            }`}
                        >
                            <span className="text-3xl">⏱️</span>
                            <div>
                                <span className="block font-black text-slate-900 text-sm">
                                    Cabaran 60 Saat
                                </span>
                                <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">
                                    Jawab sebanyak mungkin soalan dalam masa 1 minit. Uji kepantasan minda!
                                </span>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setGameMode("sprint10");
                            }}
                            className={`p-4 rounded-2xl text-left border-2 border-slate-200 outline-none focus:outline-none focus:ring-0 transition-colors flex items-start gap-3 ${
                                gameMode === "sprint10"
                                    ? "bg-indigo-50/70"
                                    : "bg-slate-50 hover:bg-slate-100/60"
                            }`}
                        >
                            <span className="text-3xl">⚡</span>
                            <div>
                                <span className="block font-black text-slate-900 text-sm">
                                    10 Soalan Pantas
                                </span>
                                <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">
                                    Habiskan 10 soalan sepantas kilat. Catatkan rekod masa paling minimum!
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Best Record Pill */}
                {mathScore > 0 && (
                    <div className="bg-emerald-50 border-2 border-emerald-300 p-3 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🏆</span>
                            <span className="text-xs font-black text-emerald-950">
                                Rekod Skor Sifir: {mathScore} XP
                            </span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Tercapai
                        </span>
                    </div>
                )}

                {/* Big Action Start Button */}
                <button
                    type="button"
                    onClick={startQuiz}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-base rounded-2xl shadow-lg border-b-4 border-indigo-900 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                    <span>Mula Bertanding</span>
                    <span>🚀</span>
                </button>
            </div>
        );
    }

    /* =========================================================================
       VIEW 2: PLAYING SCREEN (INTERACTIVE FLASH QUESTIONS & 4 BIG BUTTONS)
       ========================================================================= */
    if (gameState === "playing" && currentQuestion) {
        const isUrgent = gameMode === "timed60" && timeLeft60 <= 10;
        const timerPercent = gameMode === "timed60" ? (timeLeft60 / 60) * 100 : ((10 - questionIndex) / 10) * 100;

        return (
            <div className="w-full max-w-xl mx-auto space-y-3.5 anim-fade-in text-left">
                {/* Top Status Bar */}
                <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-2xl border-2 border-indigo-200 shadow-xs">
                    <button
                        type="button"
                        onClick={() => {
                            playLocalSound("tap");
                            setShowExitConfirm(true);
                        }}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold rounded-xl text-xs flex items-center gap-1 border border-slate-200 cursor-pointer transition-colors"
                        title="Keluar dari Kuiz Sifir"
                    >
                        <GraphicBackArrow className="w-3.5 h-3.5" />
                        <span>Keluar</span>
                    </button>

                    {/* Mode Progress */}
                    <div className="flex items-center gap-2">
                        {gameMode === "timed60" ? (
                            <span className="text-xs font-black text-indigo-950 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-300">
                                Selesai: {correctCount + wrongCount} soalan
                            </span>
                        ) : (
                            <span className="text-xs font-black text-indigo-950 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-300">
                                Soalan {questionIndex + 1} / 10
                            </span>
                        )}
                    </div>

                    {/* Live score indicator */}
                    <div className="text-xs font-black text-amber-700 flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        <span>⭐</span>
                        <span>{score} Mata</span>
                    </div>
                </div>

                {/* Main Interactive Stage */}
                <div className="bg-white rounded-3xl p-5 border-3 border-indigo-300 shadow-xl space-y-4 relative">
                    {/* Timer Bar */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                            <span className="flex items-center gap-1">
                                <GraphicTimer className={`w-4 h-4 ${isUrgent ? "text-rose-600 animate-bounce" : "text-indigo-600"}`} />
                                {gameMode === "timed60" ? (
                                    <span className={isUrgent ? "text-rose-600 font-black animate-pulse" : "text-slate-700 font-black"}>
                                        Baki Masa: {timeLeft60}s
                                    </span>
                                ) : (
                                    <span className="text-slate-700 font-black">
                                        Masa: {sprintTime}s
                                    </span>
                                )}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                                {gameMode === "timed60" ? "Had: 60 Saat" : "Pecutan 10 Soalan"}
                            </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                    isUrgent
                                        ? "bg-rose-500 animate-pulse"
                                        : "bg-gradient-to-r from-indigo-500 to-purple-500"
                                }`}
                                style={{ width: `${timerPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Giant Multiplication Card */}
                    <div className="bg-gradient-to-b from-indigo-50/80 via-white to-purple-50/50 p-6 sm:p-8 rounded-3xl border-2 border-indigo-200 text-center space-y-2 relative overflow-hidden shadow-inner">
                        <div className="inline-block bg-indigo-100 text-indigo-900 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1">
                            Sifir {currentQuestion.table}
                        </div>

                        {/* Equation Typography */}
                        <div className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono select-none drop-shadow-xs">
                            <span>{currentQuestion.table}</span>
                            <span className="text-indigo-600 mx-2 sm:mx-3">×</span>
                            <span>{currentQuestion.multiplier}</span>
                            <span className="text-slate-400 mx-2 sm:mx-3">=</span>
                            <span className="text-purple-600">?</span>
                        </div>

                        <p className="text-xs text-slate-400 font-semibold">
                            Pilih jawapan yang betul di bawah
                        </p>
                    </div>

                    {/* 4 Big, Highly Responsive Answer Buttons (2x2 Grid) */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
                        {currentQuestion.options.map((option, idx) => {
                            let btnStyle = "bg-slate-50 hover:bg-indigo-50/60 text-slate-800 border-slate-200 hover:border-indigo-400 active:scale-97";

                            if (isAnswerLocked) {
                                if (option === currentQuestion.answer) {
                                    // Highlight correct answer in green
                                    btnStyle = "bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-300 scale-102 font-black shadow-md";
                                } else if (option === selectedAnswer) {
                                    // Highlight wrong selected answer in red
                                    btnStyle = "bg-rose-500 text-white border-rose-600 ring-4 ring-rose-300 line-through font-black";
                                } else {
                                    // Fade other options
                                    btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={isAnswerLocked}
                                    onClick={() => handleSelectAnswer(option)}
                                    className={`min-h-[72px] sm:min-h-[84px] p-3 rounded-2xl border-3 font-mono font-black text-2xl sm:text-3xl shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer select-none relative ${btnStyle}`}
                                >
                                    <span>{option}</span>
                                    {isAnswerLocked && option === currentQuestion.answer && (
                                        <span className="absolute top-1.5 right-2 text-xs bg-white text-emerald-700 px-1.5 py-0.5 rounded-full font-black">
                                            ✓
                                        </span>
                                    )}
                                    {isAnswerLocked && option === selectedAnswer && option !== currentQuestion.answer && (
                                        <span className="absolute top-1.5 right-2 text-xs bg-white text-rose-700 px-1.5 py-0.5 rounded-full font-black">
                                            ✕
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Live correct counter pill */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2 pt-1 border-t border-slate-100">
                        <span className="text-emerald-700 flex items-center gap-1">
                            <span>✅ Betul:</span> <strong>{correctCount}</strong>
                        </span>
                        <span className="text-rose-600 flex items-center gap-1">
                            <span>❌ Salah:</span> <strong>{wrongCount}</strong>
                        </span>
                    </div>
                </div>

                {/* Pop-up Pengesahan Keluar Aktiviti */}
                {showExitConfirm && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 anim-fade-in">
                        <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-3 border-indigo-300 shadow-2xl text-center space-y-4 anim-pop">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-amber-300">
                                ⚠️
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900">
                                    Sahkan Keluar Kuiz?
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    Adakah anda pasti mahu keluar dari kuiz sifir sekarang? Kemajuan semasa anda tidak akan disimpan.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        playLocalSound("tap");
                                        setShowExitConfirm(false);
                                    }}
                                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black rounded-xl text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                                >
                                    Teruskan Kuiz
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        playLocalSound("tap");
                                        setShowExitConfirm(false);
                                        isRunningRef.current = false;
                                        setGameState("setup");
                                    }}
                                    className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black rounded-xl text-xs border border-rose-200 active:scale-95 transition-all cursor-pointer"
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
       VIEW 3: RESULT SCREEN (COMPREHENSIVE PERFORMANCE SUMMARY)
       ========================================================================= */
    return (
        <div className="w-full max-w-xl mx-auto space-y-4 anim-fade-in text-left">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-3xl p-5 sm:p-6 border-3 border-indigo-400 text-white shadow-xl text-center space-y-3 relative overflow-hidden">
                <div className="flex justify-center anim-pop">
                    <GraphicTrophy className="w-20 h-20 drop-shadow-md" />
                </div>

                <div>
                    <div className="inline-block bg-white/20 backdrop-blur-xs px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider mb-1">
                        Keputusan Pertandingan Sifir
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black">
                        {accuracy >= 80 ? "Hebat! Juara Sifir Kilat!" : accuracy >= 50 ? "Tahniah! Usaha Yang Bagus!" : "Teruskan Berlatih Sifir!"}
                    </h2>
                    <p className="text-xs text-indigo-100 mt-0.5 font-medium">
                        {gameMode === "timed60"
                            ? `Menjawab ${totalQuestions} soalan dalam masa 60 saat!`
                            : `Berjaya menamatkan 10 soalan dalam masa ${sprintTime} saat!`}
                    </p>
                </div>

                {/* Score & Stats 3-Column Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-slate-800">
                    <div className="bg-white/95 p-3 rounded-2xl border border-indigo-200 shadow-xs text-center">
                        <div className="text-[10px] font-black uppercase text-indigo-800">Jumlah Skor</div>
                        <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">+{score}</div>
                    </div>
                    <div className="bg-white/95 p-3 rounded-2xl border border-indigo-200 shadow-xs text-center">
                        <div className="text-[10px] font-black uppercase text-indigo-800">Ketepatan</div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">{accuracy}%</div>
                    </div>
                    <div className="bg-white/95 p-3 rounded-2xl border border-indigo-200 shadow-xs text-center">
                        <div className="text-[10px] font-black uppercase text-indigo-800">Purata Masa</div>
                        <div className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">{avgSpeed}s</div>
                    </div>
                </div>
            </div>

            {/* Questions Review History List */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-indigo-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h3 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <span>📝</span> Senarai Semakan Soalan ({correctCount}/{totalQuestions} Betul)
                    </h3>
                    <span className="text-[11px] font-bold text-slate-500">
                        {gameMode === "timed60" ? "Mod 60 Saat" : "Pecutan 10 Soalan"}
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
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ${
                                    item.isCorrect ? "bg-emerald-600" : "bg-rose-600"
                                }`}>
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

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                    type="button"
                    onClick={() => {
                        playLocalSound("tap");
                        setGameState("setup");
                    }}
                    className="py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black rounded-2xl shadow-md border-b-3 border-indigo-900 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                    <span>✅</span>
                    <span>Selesai</span>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        playLocalSound("tap");
                        startQuiz();
                    }}
                    className="py-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-black rounded-2xl shadow-xs border-2 border-indigo-200 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                    <span>🔄</span>
                    <span>Main Semula</span>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        playLocalSound("tap");
                        onNavigate("activityList");
                    }}
                    className="py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl shadow-xs border-2 border-slate-200 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                    <span>🏠</span>
                    <span>Kembali ke Aktiviti</span>
                </button>
            </div>
        </div>
    );
}
