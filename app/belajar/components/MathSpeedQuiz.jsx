"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* =========================================================================
   VECTOR SVG GRAPHICS FOR MATH SPEED QUIZ (SIFIR KILAT)
   ========================================================================= */

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

function GraphicBackArrow({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* =========================================================================
   SOALAN ASAL SIFIR KSSR (MULTIPLICATION TABLE 1 - 12)
   Format asal: table × multiplier = answer (TIADA UBAH SOALAN ASAL)
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
   MAIN COMPONENT: MATH SPEED QUIZ (SIFIR)
   ========================================================================= */

export default function MathSpeedQuiz({
    onNavigate,
    onSubmitMathQuiz,
    mathScore = 0,
    isLoggedIn = true,
    onBlockedAction = null,
    playAudioFeedback = null,
    t = (bm, en) => bm,
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
            } else if (type === "victory" || type === "correct") {
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
    const [gameMode, setGameMode] = useState("sprint20"); // "sprint20" (20 soalan seperti 4/20 di gambar) | "sprint10" | "timed60"
    const [totalQuestions, setTotalQuestions] = useState(20);

    // Senarai soalan berstruktur untuk navigasi maju dan mundur (Previous)
    const [questionsList, setQuestionsList] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [answerTimes, setAnswerTimes] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [maxReachedIndex, setMaxReachedIndex] = useState(0);
    const [isAnswerLocked, setIsAnswerLocked] = useState(false);

    // Scoring & History
    const [history, setHistory] = useState([]);
    const [timeLeft60, setTimeLeft60] = useState(60);
    const [sprintTime, setSprintTime] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const isRunningRef = useRef(false);
    const advanceTimeoutRef = useRef(null);

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

        if (advanceTimeoutRef.current) {
            clearTimeout(advanceTimeoutRef.current);
            advanceTimeoutRef.current = null;
        }

        playLocalSound("tap");
        setHistory([]);
        setQuestionIndex(0);
        setMaxReachedIndex(0);
        setUserAnswers({});
        setAnswerTimes({});
        setIsAnswerLocked(false);
        setTimeLeft60(60);
        setSprintTime(0);
        setShowExitConfirm(false);

        const targetCount = gameMode === "sprint20" ? 20 : gameMode === "sprint10" ? 10 : 20;
        setTotalQuestions(targetCount);

        // Jana soalan awal mengikut bilangan mod
        const initialQuestions = Array.from({ length: targetCount }, () =>
            generateMathQuestion(selectedTables)
        );
        setQuestionsList(initialQuestions);
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
                            finishQuiz(userAnswers, answerTimes, questionsList);
                            return 0;
                        }
                        if (prev <= 10 && prev > 1) {
                            playLocalSound("tick");
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                timer = setInterval(() => {
                    setSprintTime((prev) => +(prev + 0.1).toFixed(1));
                }, 100);
            }
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameState, gameMode, playLocalSound, userAnswers, answerTimes, questionsList]);

    // Bersihkan sebarang timeout tertunda apabila unmount
    useEffect(() => {
        return () => {
            if (advanceTimeoutRef.current) {
                clearTimeout(advanceTimeoutRef.current);
                advanceTimeoutRef.current = null;
            }
        };
    }, []);

    const finishQuiz = useCallback((answersMap = userAnswers, timesMap = answerTimes, qList = questionsList) => {
        if (advanceTimeoutRef.current) {
            clearTimeout(advanceTimeoutRef.current);
            advanceTimeoutRef.current = null;
        }
        isRunningRef.current = false;
        playLocalSound("victory");

        // Jana rekod sejarah lengkap daripada semua soalan yang dijawab
        const finalHistory = [];
        qList.forEach((q, idx) => {
            const selected = answersMap[idx];
            if (selected !== undefined) {
                const isCorrect = selected === q.answer;
                const timeTaken = timesMap[idx] || 2.0;
                let points = 0;
                if (isCorrect) {
                    const speedBonus = timeTaken <= 2.5 ? 5 : timeTaken <= 4.0 ? 2 : 0;
                    points = 10 + speedBonus;
                }
                finalHistory.push({
                    questionText: q.questionText,
                    correctAnswer: q.answer,
                    selected,
                    isCorrect,
                    timeTaken,
                    points,
                    table: q.table,
                });
            }
        });

        setHistory(finalHistory);
        setGameState("result");
    }, [userAnswers, answerTimes, questionsList, playLocalSound]);

    // Memilih jawapan: Kad bertukar hijau ceria persis gambar dan AUTOMATIK mara ke soalan seterusnya tanpa perlu submit!
    const handleSelectAnswer = (option) => {
        if (isAnswerLocked) return;

        playLocalSound("tap");
        setIsAnswerLocked(true);

        const timeTakenForQ = +((Date.now() - questionStartTime) / 1000).toFixed(1);

        const updatedAnswers = { ...userAnswers, [questionIndex]: option };
        const updatedTimes = { ...answerTimes, [questionIndex]: timeTakenForQ };
        setUserAnswers(updatedAnswers);
        setAnswerTimes(updatedTimes);

        if (advanceTimeoutRef.current) {
            clearTimeout(advanceTimeoutRef.current);
        }

        // Auto-advance ke soalan seterusnya selepas maklum balas visual hijau (~220ms)
        advanceTimeoutRef.current = setTimeout(() => {
            advanceTimeoutRef.current = null;
            if (!isRunningRef.current) {
                setIsAnswerLocked(false);
                return;
            }

            const nextIdx = questionIndex + 1;
            const isFinished =
                (gameMode === "sprint20" && nextIdx >= 20) ||
                (gameMode === "sprint10" && nextIdx >= 10);

            if (isFinished) {
                finishQuiz(updatedAnswers, updatedTimes, questionsList);
            } else {
                // Untuk mod timed60, jika soalan seterusnya belum dijana
                if (nextIdx >= questionsList.length) {
                    const newQ = generateMathQuestion(selectedTables);
                    setQuestionsList((prev) => [...prev, newQ]);
                }
                setMaxReachedIndex((prev) => Math.max(prev, nextIdx));
                setQuestionIndex(nextIdx);
                setIsAnswerLocked(false);
                setQuestionStartTime(Date.now());
            }
        }, 220);
    };

    // Butang "Sebelumnya" (Previous) untuk membolehkan murid jawab balik atau betulkan jawapan
    const handlePreviousQuestion = () => {
        if (questionIndex <= 0) return;
        if (advanceTimeoutRef.current) {
            clearTimeout(advanceTimeoutRef.current);
            advanceTimeoutRef.current = null;
        }
        setIsAnswerLocked(false);
        playLocalSound("tap");
        setQuestionIndex((prev) => prev - 1);
        setQuestionStartTime(Date.now());
    };

    // Butang "Seterusnya" (Next) - hanya dipaparkan pada soalan sebelumnya untuk mara semula ke hadapan
    const handleNextQuestion = () => {
        if (isAnswerLocked) return;
        if (advanceTimeoutRef.current) {
            clearTimeout(advanceTimeoutRef.current);
            advanceTimeoutRef.current = null;
        }
        playLocalSound("tap");
        const nextIdx = questionIndex + 1;
        if (nextIdx <= maxReachedIndex && nextIdx < questionsList.length) {
            setQuestionIndex(nextIdx);
            setQuestionStartTime(Date.now());
        }
    };

    // Rekod ke pangkalan data analisis matematik untuk Paparan Ibu Bapa
    useEffect(() => {
        if (gameState === "result" && history.length > 0) {
            const totalScore = history.reduce((sum, h) => sum + (h.points || 0), 0);
            const totalAns = history.length;
            const avgSpeedCalc = totalAns > 0
                ? +(history.reduce((acc, h) => acc + h.timeTaken, 0) / totalAns).toFixed(1)
                : 0;

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

    // Pengiraan untuk skrin keputusan
    const totalAnswered = history.length;
    const correctCount = history.filter((h) => h.isCorrect).length;
    const finalScore = history.reduce((sum, h) => sum + (h.points || 0), 0);
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const avgSpeed = totalAnswered > 0
        ? +(history.reduce((acc, h) => acc + h.timeTaken, 0) / totalAnswered).toFixed(1)
        : 0;

    /* =========================================================================
       VIEW 1: SETUP SCREEN (PEMILIHAN SIFIR & MOD)
       ========================================================================= */
    if (gameState === "setup") {
        return (
            <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-4 anim-fade-in text-left pb-10">
                {/* Header Atas */}
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
                        <span>{t("Kembali", "Back")}</span>
                    </button>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#0099e5] tracking-tight">
                            {t("Pertandingan Sifir Kilat", "Speed Math Challenge")}
                        </h2>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">
                            {t("Pilih sifir dan uji kepantasan congak anda", "Choose tables and test your speed")}
                        </p>
                    </div>
                </div>

                {/* Pemilih Sifir 1 - 12 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                            {t("Pilihan Sifir (1 - 12)", "Multiplication Tables (1 - 12)")}:
                        </span>
                        <button
                            type="button"
                            onClick={selectAllTables}
                            className="text-xs text-[#0099e5] hover:underline font-bold cursor-pointer"
                        >
                            {t("Pilih Semua", "Select All")}
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
                                    className={`py-2 rounded-xl font-black text-xs sm:text-sm border transition-all cursor-pointer ${
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

                {/* Pemilih Mod Pertandingan */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">
                        {t("Pilihan Mod Soalan", "Select Quiz Mode")}:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setGameMode("sprint20");
                            }}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                                gameMode === "sprint20"
                                    ? "bg-sky-50/80 border-[#0099e5] ring-2 ring-[#0099e5]/30 shadow-xs"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                            <span className="text-xs font-black block text-slate-800">20 Soalan</span>
                            <span className="text-[10px] text-sky-600 font-bold block mt-0.5">Format Penuh</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setGameMode("sprint10");
                            }}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                                gameMode === "sprint10"
                                    ? "bg-sky-50/80 border-[#0099e5] ring-2 ring-[#0099e5]/30 shadow-xs"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                            <span className="text-xs font-black block text-slate-800">10 Soalan</span>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Pantas</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setGameMode("timed60");
                            }}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                                gameMode === "timed60"
                                    ? "bg-sky-50/80 border-[#0099e5] ring-2 ring-[#0099e5]/30 shadow-xs"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                            <span className="text-xs font-black block text-slate-800">60 Saat</span>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Cabaran Masa</span>
                        </button>
                    </div>
                </div>

                {/* Butang Mula */}
                <button
                    type="button"
                    onClick={startQuiz}
                    className="w-full py-4 bg-gradient-to-r from-sky-400 via-[#0099e5] to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white font-black text-base rounded-2xl shadow-lg shadow-sky-500/25 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                    <span>{t("Mula Cabaran Sifir", "Start Math Challenge")}</span>
                    <span className="text-lg">🚀</span>
                </button>
            </div>
        );
    }

    /* =========================================================================
       VIEW 2: IN-GAME SCREEN (PERSIS REKA BENTUK TANGKAPAN SKRIN RUJUKAN PENGGUNA)
       ========================================================================= */
    const currentQuestion = questionsList[questionIndex];

    if (gameState === "playing" && currentQuestion) {
        const curNum = questionIndex + 1;
        const totalNum = gameMode === "timed60" ? 20 : totalQuestions;
        const progressFraction = Math.min(100, Math.round((curNum / totalNum) * 100));
        const isUrgent = gameMode === "timed60" && timeLeft60 <= 10;
        const currentSelectedAnswer = userAnswers[questionIndex];
        const isPreviousQuestion = questionIndex < maxReachedIndex;

        return (
            <div className="w-full max-w-sm sm:max-w-md mx-auto anim-fade-in select-none text-left pb-8">

                {/* KAD BIRU UTAMA (TOP SKY-BLUE CONTAINER GAYA PERSIS RUJUKAN) */}
                <div
                    className="relative rounded-[2.4rem] pt-5 pb-7 px-4 sm:px-6 text-white shadow-xl overflow-hidden flex flex-col justify-between"
                    style={{
                        background: "linear-gradient(180deg, #60a5fa 0%, #3b82f6 55%, #2563eb 100%)",
                    }}
                >
                    {/* Bentuk Hiasan Gelombang / Corak Lembut Latar Belakang */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-sky-200/15 rounded-full blur-xl pointer-events-none" />

                    {/* CORAK CORNER WAVY SILHOUETTE (PERSIS TANGKAPAN SKRIN) */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-8 border-white/10 pointer-events-none" />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-12 border-white/10 pointer-events-none" />

                    {/* 1. BAR ATAS: CIRCULAR PROGRESS RING (4/20), TITLE "MATH" & TIMER, CLOSE BUTTON ✕ */}
                    <div className="relative z-10 flex items-center justify-between w-full mb-3">
                        {/* Lingkaran Kemajuan / Circular Progress Ring (4/20) */}
                        <div className="relative w-11 h-11 flex items-center justify-center">
                            <svg className="w-11 h-11 -rotate-90 drop-shadow-xs" viewBox="0 0 36 36">
                                {/* Track bulat latar belakang */}
                                <path
                                    className="text-white/25"
                                    stroke="currentColor"
                                    strokeWidth="3.2"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                {/* Garisan lengkung kuning kemajuan */}
                                <path
                                    className="text-amber-300 transition-all duration-300 ease-out"
                                    strokeDasharray={`${progressFraction}, 100`}
                                    stroke="currentColor"
                                    strokeWidth="3.6"
                                    strokeLinecap="round"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <span className="absolute font-black text-[11px] sm:text-xs text-white font-mono tracking-tighter">
                                {curNum}/{totalNum}
                            </span>
                        </div>

                        {/* Tajuk "Math" & Badge Pemasa (Timer) */}
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-xs leading-none">
                                Math
                            </h2>
                            {/* Lencana Pemasa (Timer Pill) */}
                            <div
                                className={`mt-1.5 px-3 py-0.5 rounded-full flex items-center gap-1.5 border shadow-xs backdrop-blur-md transition-all ${
                                    isUrgent
                                        ? "bg-rose-500/95 border-rose-300 text-white animate-bounce"
                                        : "bg-white/20 border-white/30 text-white"
                                }`}
                            >
                                <svg
                                    className={`w-3.5 h-3.5 ${isUrgent ? "text-white" : "text-amber-300"}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="9" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="font-mono font-black text-xs tracking-tight">
                                    {gameMode === "timed60" ? `${timeLeft60}s` : `${sprintTime.toFixed(1)}s`}
                                </span>
                            </div>
                        </div>

                        {/* Butang Tutup ✕ di kanan atas */}
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                setShowExitConfirm(true);
                            }}
                            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xs"
                            title="Keluar"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Bar Pemasa Kecerunan Halus (Timer Progress Bar) */}
                    {gameMode === "timed60" && (
                        <div className="relative z-10 w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ease-out ${
                                    isUrgent ? "bg-rose-400 animate-pulse" : "bg-amber-300"
                                }`}
                                style={{ width: `${(timeLeft60 / 60) * 100}%` }}
                            />
                        </div>
                    )}

                    {/* 2. PAPARAN SOALAN ASAL SIFIR DALAM BLOK SQUIRCLE BERKILAU */}
                    <div className="relative z-10 flex flex-col items-center justify-center py-6 min-h-[190px]">
                        {/* Lencana Sifir */}
                        <span className="inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-5 text-white/95 border border-white/30 shadow-xs">
                            Sifir {currentQuestion.table}
                        </span>

                        {/* Baris Blok Soalan Sifir (Table × Multiplier = ?) */}
                        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                            {/* Blok Nombor 1 (Table) */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white text-slate-800 font-mono font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-blue-950/20 border-b-2 border-slate-100">
                                {currentQuestion.table}
                            </div>

                            {/* Simbol Darab × */}
                            <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-sm px-0.5 select-none">
                                ×
                            </span>

                            {/* Blok Nombor 2 (Multiplier) */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white text-slate-800 font-mono font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-blue-950/20 border-b-2 border-slate-100">
                                {currentQuestion.multiplier}
                            </div>

                            {/* Simbol Sama Dengan = */}
                            <span className="text-2xl sm:text-3xl font-black text-white/90 drop-shadow-sm px-0.5 select-none">
                                =
                            </span>

                            {/* Blok Sasaran [ ? ] (Oren Amber Glow persis blok [X] dalam tangkapan skrin) */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-500 text-white font-mono font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl shadow-amber-600/35 border-b-2 border-amber-600 animate-pulse">
                                ?
                            </div>
                        </div>
                    </div>

                    {/* Pembayang lembut bahagian bawah kad biru */}
                    <div className="w-24 h-1 mx-auto bg-white/20 rounded-full mt-2" />
                </div>

                {/* 3. SOALAN PROMPT TEKS: "What is the value of “?” ?" */}
                <div className="py-5 text-center">
                    <h3 className="text-slate-900 font-extrabold text-base sm:text-lg tracking-tight">
                        {language === "en" ? 'What is the value of “?” ?' : 'Berapakah nilai “?” ?'}
                    </h3>
                </div>

                {/* 4. GRID 2X2 PILIHAN JAWAPAN (SQUIRCLE BESAR, MENJADI HIJAU APABILA DIPILIH PERSIS RUJUKAN) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 px-1">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = option === currentSelectedAnswer;

                        return (
                            <button
                                key={idx}
                                type="button"
                                disabled={isAnswerLocked}
                                onClick={() => handleSelectAnswer(option)}
                                className={`min-h-[70px] sm:min-h-[78px] rounded-2xl font-mono font-black text-2xl sm:text-3xl flex items-center justify-center cursor-pointer transition-all duration-200 select-none ${
                                    isSelected
                                        ? "bg-[#54ba48] hover:bg-[#4cad41] text-white border-2 border-[#48a53c] shadow-lg shadow-emerald-500/30 scale-[0.99]"
                                        : "bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-100 hover:border-slate-200 shadow-xs active:scale-95"
                                }`}
                            >
                                <span>{option}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 5. BUTANG NAVIGASI: "SEBELUMNYA" & "SETERUSNYA" (HANYA PADA SOALAN SEBELUMNYA) */}
                <div className="pt-6 px-1 flex items-center gap-3">
                    {/* Butang Sebelumnya */}
                    <button
                        type="button"
                        disabled={questionIndex === 0 || isAnswerLocked}
                        onClick={handlePreviousQuestion}
                        className={`flex-1 py-4 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95 ${
                            questionIndex > 0 && !isAnswerLocked
                                ? "bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200/90 shadow-sm cursor-pointer"
                                : "bg-slate-100 text-slate-300 border-2 border-slate-100 cursor-not-allowed opacity-50"
                        }`}
                    >
                        <GraphicBackArrow className="w-4 h-4 text-current" />
                        <span>{t("Sebelumnya", "Previous")}</span>
                    </button>

                    {/* Butang Seterusnya (HANYA ADA PADA SOALAN SEBELUMNYA) */}
                    {isPreviousQuestion && (
                        <button
                            type="button"
                            disabled={isAnswerLocked}
                            onClick={handleNextQuestion}
                            className="flex-1 py-4 rounded-2xl font-black text-sm text-white tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 via-[#0099e5] to-blue-500 hover:from-sky-500 hover:to-blue-600 shadow-blue-500/25 cursor-pointer anim-fade-in"
                        >
                            <span>{t("Seterusnya", "Next")}</span>
                            <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* MODAL PENGESAHAN KELUAR */}
                {showExitConfirm && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 anim-fade-in">
                        <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border border-slate-200 shadow-2xl text-center space-y-4 anim-pop">
                            <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-2xl border border-sky-200">
                                ⚠️
                            </div>
                            <div>
                                <h3 className="text-base font-black text-slate-900">
                                    {t("Keluar Dari Pertandingan?", "Leave Challenge?")}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    {t(
                                        "Keputusan pertandingan tidak akan direkod jika keluar sekarang.",
                                        "Your quiz progress will not be recorded if you leave now."
                                    )}
                                </p>
                            </div>
                            <div className="flex gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowExitConfirm(false)}
                                    className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                                >
                                    {t("Teruskan", "Continue")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        isRunningRef.current = false;
                                        setGameState("setup");
                                    }}
                                    className="flex-1 py-2.5 bg-[#0099e5] hover:bg-[#0088cc] text-white font-bold rounded-xl text-xs cursor-pointer"
                                >
                                    {t("Ya, Keluar", "Yes, Leave")}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        );
    }

    /* =========================================================================
       VIEW 3: RESULT SCREEN (KEPUTUSAN & GANJARAN XP/KOIN)
       ========================================================================= */
    return (
        <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-4 anim-fade-in text-left pb-10">
            {/* Header Keputusan */}
            <div className="bg-gradient-to-r from-[#0088cc] to-[#0099e5] rounded-3xl p-5 sm:p-6 border-2 border-white/20 text-white shadow-md text-center space-y-3">
                <div className="flex justify-center anim-pop">
                    <GraphicTrophy className="w-16 h-16 drop-shadow-sm" />
                </div>

                <div>
                    <span className="inline-block bg-white/20 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1">
                        {t("Keputusan Rasmi Sifir", "Official Math Result")}
                    </span>
                    <h2 className="text-2xl font-black">
                        {accuracy >= 80 ? t("Hebat! Cemerlang!", "Awesome! Excellent!") : accuracy >= 50 ? t("Tahniah! Teruskan Usaha!", "Congrats! Keep It Up!") : t("Latihan Lagi, Pasti Boleh!", "Practice More, You Can Do It!")}
                    </h2>
                    <p className="text-xs text-sky-100 mt-0.5">
                        {t(`Selesai menjawab ${totalAnswered} soalan dalam ${sprintTime} saat`, `Completed ${totalAnswered} questions in ${sprintTime}s`)}
                    </p>
                </div>

                {/* Ringkasan Skor 3 Kolum */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-slate-800">
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
                        <div className="text-[10px] font-black uppercase text-slate-500">{t("Skor", "Score")}</div>
                        <div className="text-xl font-black text-[#0099e5] mt-0.5">+{finalScore} XP</div>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
                        <div className="text-[10px] font-black uppercase text-slate-500">{t("Ketepatan", "Accuracy")}</div>
                        <div className="text-xl font-black text-emerald-600 mt-0.5">{accuracy}%</div>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
                        <div className="text-[10px] font-black uppercase text-slate-500">{t("Masa", "Time")}</div>
                        <div className="text-xl font-black text-slate-700 mt-0.5">{avgSpeed}s</div>
                    </div>
                </div>

                {/* Ganjaran Koin Bintang */}
                <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-950 font-black px-4 py-2.5 rounded-2xl shadow-sm border-2 border-white flex items-center justify-center gap-2 anim-pop">
                    <span className="text-2xl">🌟</span>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-amber-900 block leading-tight">
                            {t("Ganjaran Koin Sifir", "Math Coins Reward")}
                        </span>
                        <span className="text-base font-black">
                            +{accuracy >= 80 ? 20 : accuracy >= 50 ? 15 : 10} {t("Koin Bintang Diperoleh!", "Star Coins Earned!")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Seksyen Semakan Soalan */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h3 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <span>📝</span> {t("Pembetulan & Semakan Soalan", "Review Answers")}
                    </h3>
                    <span className="text-xs font-bold text-slate-600">
                        {correctCount} / {totalAnswered} {t("Betul", "Correct")}
                    </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
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
                                        <div className="text-xs text-rose-600 font-mono mt-0.5 line-through font-bold">
                                            (Pilihan anda: {item.selected})
                                        </div>
                                    )}
                                </div>
                            </div>

                            <span className="text-xs font-black text-amber-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200 shrink-0">
                                +{item.points} XP
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Butang Tindakan */}
            <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                    type="button"
                    onClick={() => {
                        playLocalSound("tap");
                        startQuiz();
                    }}
                    className="py-3.5 bg-gradient-to-r from-sky-400 via-[#0099e5] to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white font-black rounded-2xl shadow-xs cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                >
                    <span>🔄</span>
                    <span>{t("Main Semula", "Play Again")}</span>
                </button>

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
                    <span>{t("Kembali", "Back")}</span>
                </button>
            </div>
        </div>
    );
}
