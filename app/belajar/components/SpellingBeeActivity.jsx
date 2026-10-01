"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getSpellingWords, INITIAL_SPELLING_WORDS, SPELLING_THEMES, normalizeDifficulty } from "../../../lib/spellingService";

/* =========================================================================
   VECTOR SVG GRAPHICS FOR EXPLORIA SPELLING BEE
   ========================================================================= */

// 1. Cute Animated Exploria Bee Mascot (Buzzy Bot)
function GraphicBeeMascot({ mood = "happy", isSpeaking = false, className = "w-20 h-20" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="beeBodyGrad" x1="20" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="wingGradL" x1="15" y1="10" x2="45" y2="45" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e0f2fe" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#38bdf8" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="wingGradR" x1="85" y1="10" x2="55" y2="45" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e0f2fe" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#38bdf8" stopOpacity="0.4" />
                </linearGradient>
            </defs>

            {/* Left Wing */}
            <ellipse
                cx="32"
                cy="32"
                rx="18"
                ry="11"
                transform="rotate(-35 32 32)"
                fill="url(#wingGradL)"
                stroke="#38bdf8"
                strokeWidth="1.8"
                className={isSpeaking ? "animate-pulse" : ""}
                style={{ transformOrigin: "42px 40px" }}
            />
            {/* Right Wing */}
            <ellipse
                cx="68"
                cy="32"
                rx="18"
                ry="11"
                transform="rotate(35 68 32)"
                fill="url(#wingGradR)"
                stroke="#38bdf8"
                strokeWidth="1.8"
                className={isSpeaking ? "animate-pulse" : ""}
                style={{ transformOrigin: "58px 40px" }}
            />

            {/* Bee Stinger */}
            <path d="M50 88L45 78H55L50 88Z" fill="#1e293b" />

            {/* Bee Body */}
            <ellipse cx="50" cy="56" rx="30" ry="26" fill="url(#beeBodyGrad)" stroke="#b45309" strokeWidth="2.5" />

            {/* Body Black Stripes */}
            <path d="M23 52C28 47 72 47 77 52C75 58 71 63 67 65C58 62 42 62 33 65C29 63 25 58 23 52Z" fill="#1e293b" />
            <path d="M30 69C36 67 64 67 70 69C67 76 60 80 50 81C40 80 33 76 30 69Z" fill="#1e293b" />

            {/* Antennae */}
            <path d="M40 33C36 24 30 20 22 22" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="21" cy="22" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
            <path d="M60 33C64 24 70 20 78 22" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="79" cy="22" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />

            {/* Face details */}
            {mood === "happy" && (
                <>
                    <circle cx="40" cy="45" r="5" fill="#0f172a" />
                    <circle cx="38.5" cy="43.5" r="1.8" fill="#ffffff" />
                    <circle cx="60" cy="45" r="5" fill="#0f172a" />
                    <circle cx="58.5" cy="43.5" r="1.8" fill="#ffffff" />
                    <circle cx="32" cy="51" r="3.5" fill="#fb7185" opacity="0.75" />
                    <circle cx="68" cy="51" r="3.5" fill="#fb7185" opacity="0.75" />
                    <path d="M44 52C46 56 54 56 56 52" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                </>
            )}

            {mood === "wrong" && (
                <>
                    <path d="M36 43L44 47M44 43L36 47" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M56 43L64 47M64 43L56 47" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M45 54C47 51 53 51 55 54" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M72 40C72 40 76 45 74 48C72 50 69 49 69 46C69 43 72 40 72 40Z" fill="#38bdf8" />
                </>
            )}

            {mood === "thinking" && (
                <>
                    <circle cx="40" cy="43" r="5" fill="#0f172a" />
                    <circle cx="41" cy="41" r="2" fill="#ffffff" />
                    <circle cx="60" cy="43" r="5" fill="#0f172a" />
                    <circle cx="61" cy="41" r="2" fill="#ffffff" />
                    <circle cx="50" cy="53" r="2.5" fill="#78350f" />
                </>
            )}

            {/* Futuristic Headset / Microphone */}
            <path d="M30 46C26 43 27 35 34 32C42 29 58 29 66 32C73 35 74 43 70 46" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <rect x="25" y="42" width="6" height="10" rx="3" fill="#0284c7" />
            <rect x="69" y="42" width="6" height="10" rx="3" fill="#0284c7" />
            <path d="M69 50C69 56 62 60 56 59" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="55" cy="59" r="2.2" fill="#0369a1" />
        </svg>
    );
}

// 2. Speaker Icon with Sound Waves
function GraphicSpeaker({ isPlaying = false, className = "w-6 h-6" }) {
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

// 3. Lightbulb Hint Icon
function GraphicLightbulb({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H15M10 24H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 2C7.58 2 4 5.58 4 10C4 12.83 5.46 15.31 7.7 16.74C8.48 17.24 9 18.08 9 19H15C15 18.08 15.52 17.24 16.3 16.74C18.54 15.31 20 12.83 20 10C20 5.58 16.42 2 12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// 4. Timer Clock Icon
function GraphicTimer({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M12 9V13L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 2H14M5 5L7 7M19 5L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// 5. Back Arrow
function GraphicBackArrow({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// 6. Checkmark Icon
function GraphicCheckCircle({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#10b981" />
            <path d="M8 12.5L10.5 15L16 9.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// 7. Cross Circle Icon
function GraphicCrossCircle({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#ef4444" />
            <path d="M15 9L9 15M9 9L15 15" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// 8. Trophy Icon
function GraphicSpellingTrophy({ className = "w-16 h-16" }) {
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
            <path d="M26 16H74L68 50C68 62 58 68 50 68C42 68 32 62 32 50L26 16Z" fill="url(#goldCupGrad)" stroke="#a16207" strokeWidth="2.5" />
            <path d="M46 68H54V78H46V68Z" fill="#ca8a04" />
            <path d="M30 84H70L66 78H34L30 84Z" fill="#854d0e" />
            <rect x="26" y="84" width="48" height="6" rx="2" fill="#713f12" />
            <path d="M50 30L52.5 36.5H59L53.5 40.5L55.5 47L50 43L44.5 47L46.5 40.5L41 36.5H47.5L50 30Z" fill="#ffffff" />
            <circle cx="50" cy="54" r="5" fill="#fef08a" />
            <path d="M48 53H52M48 55H52" stroke="#713f12" strokeWidth="1" strokeLinecap="round" />
        </svg>
    );
}

/* =========================================================================
   SPELLING BEE MAIN COMPONENT (ENGLISH UI, FIXED 8 QUESTIONS, THEMES & IMAGES)
   ========================================================================= */

export default function SpellingBeeActivity({
    onNavigate,
    onSubmitSpellingBee,
    spellingScore = 0,
    isLoggedIn = true,
    onBlockedAction = null,
    playAudioFeedback = null,
    t = null,
    language = "en",
}) {
    // -------------------------------------------------------------
    // DYNAMIC WORDS POOL (FIRESTORE & LOCAL STORAGE)
    // -------------------------------------------------------------
    const [wordsPool, setWordsPool] = useState(INITIAL_SPELLING_WORDS);

    useEffect(() => {
        getSpellingWords().then((words) => {
            if (Array.isArray(words) && words.length > 0) {
                setWordsPool(words);
            }
        });

        const handleSpellingUpdate = () => {
            getSpellingWords().then((words) => {
                if (Array.isArray(words) && words.length > 0) {
                    setWordsPool(words);
                }
            });
        };

        if (typeof window !== "undefined") {
            window.addEventListener("exploria_spelling_updated", handleSpellingUpdate);
            return () => {
                window.removeEventListener("exploria_spelling_updated", handleSpellingUpdate);
            };
        }
    }, []);

    // -------------------------------------------------------------
    // AUDIO SYNTHESIS SOUND EFFECTS
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
                    osc.frequency.setValueAtTime(f, now + i * 0.08);
                    gain.gain.setValueAtTime(0.2, now + i * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.08);
                    osc.stop(now + i * 0.08 + 0.25);
                });
            } else if (type === "wrong" || type === "buzzer" || type === "timeout") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(90, now + 0.35);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === "tap" || type === "pop") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(450, now);
                osc.frequency.exponentialRampToValueAtTime(750, now + 0.05);
                gain.gain.setValueAtTime(0.18, now);
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
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
            }
        } catch (e) {}
    }, [playAudioFeedback]);

    // -------------------------------------------------------------
    // WEB SPEECH API (TEXT-TO-SPEECH) ENGINE
    // -------------------------------------------------------------
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSpeed, setSpeechSpeed] = useState(0.88);
    const [ttsSupported, setTtsSupported] = useState(true);

    const speakWord = useCallback((wordToSpeak, speedMultiplier = null) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
            setTtsSupported(false);
            return;
        }

        try {
            window.speechSynthesis.cancel();
            const cleanWord = (wordToSpeak || "").trim();
            if (!cleanWord) return;

            const utterance = new SpeechSynthesisUtterance(cleanWord);
            utterance.lang = "en-US";
            utterance.rate = speedMultiplier !== null ? speedMultiplier : speechSpeed;
            utterance.pitch = 1.05;

            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices && availableVoices.length > 0) {
                const match = availableVoices.find(v =>
                    v.lang.startsWith("en") &&
                    (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel") || v.name.includes("Karen"))
                ) || availableVoices.find(v => v.lang.startsWith("en"));

                if (match) utterance.voice = match;
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        } catch (err) {
            console.warn("SpeechSynthesis error:", err);
            setIsSpeaking(false);
        }
    }, [speechSpeed]);

    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.getVoices();
            const handleVoicesChanged = () => {
                window.speechSynthesis.getVoices();
            };
            window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
            return () => {
                window.speechSynthesis.cancel();
            };
        } else {
            setTtsSupported(false);
        }
    }, []);

    // -------------------------------------------------------------
    // GAME SESSIONS, THEMES & DIFFICULTY STATES
    // -------------------------------------------------------------
    const [gameState, setGameState] = useState("start"); // "start" | "playing" | "review_word" | "finished"
    const [selectedTheme, setSelectedTheme] = useState("all"); // "all" | "home" | "subject" | "music" | "body" | "animal" | "food" | "jobs" | "clothes" | "sport"
    const [selectedDifficulty, setSelectedDifficulty] = useState("all"); // "all" | "easy" | "medium" | "hard"

    // EXACTLY 8 QUESTIONS PER SESSION (AS REQUESTED)
    const FIXED_QUESTIONS_COUNT = 8;

    const [wordList, setWordList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userSpelling, setUserSpelling] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [hasUsedHintCurrent, setHasUsedHintCurrent] = useState(false);

    // 30 Seconds Timer per word
    const TIMER_LIMIT = 30;
    const [timeLeft, setTimeLeft] = useState(TIMER_LIMIT);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Scoring & History (STREAK COMPLETELY REMOVED)
    const [totalScore, setTotalScore] = useState(0);
    const [resultsHistory, setResultsHistory] = useState([]);
    const [lastAnswerFeedback, setLastAnswerFeedback] = useState(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    const inputRef = useRef(null);
    const currentWord = wordList[currentIndex] || null;

    // -------------------------------------------------------------
    // START / INITIALIZE A NEW 8-QUESTION SPELLING CHALLENGE
    // -------------------------------------------------------------
    const startNewGame = useCallback(() => {
        if (!isLoggedIn && onBlockedAction) {
            onBlockedAction();
            return;
        }

        playLocalSound("tap");

        let pool = [...wordsPool];

        // 1. Filter by selected theme
        if (selectedTheme !== "all") {
            pool = pool.filter(w => (w.theme || "").toLowerCase() === selectedTheme.toLowerCase());
        }

        // 2. Filter by difficulty
        if (selectedDifficulty !== "all") {
            pool = pool.filter(w => normalizeDifficulty(w.difficulty) === selectedDifficulty);
        }

        // Fallback to broader pool if filtered pool has fewer than 8 words
        if (pool.length < FIXED_QUESTIONS_COUNT && selectedTheme !== "all") {
            const fallbackPool = wordsPool.filter(w => (w.theme || "").toLowerCase() === selectedTheme.toLowerCase());
            if (fallbackPool.length > 0) pool = fallbackPool;
        }
        if (pool.length === 0) pool = [...wordsPool];

        // Shuffle and pick exactly 8 questions
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(FIXED_QUESTIONS_COUNT, shuffled.length));

        setWordList(selected);
        setCurrentIndex(0);
        setUserSpelling("");
        setShowHint(false);
        setHasUsedHintCurrent(false);
        setTotalScore(0);
        setResultsHistory([]);
        setLastAnswerFeedback(null);
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

    // -------------------------------------------------------------
    // COUNTDOWN TIMER EFFECT (PAUSES AUTOMATICALLY WHEN EXIT POPUP IS OPEN)
    // -------------------------------------------------------------
    useEffect(() => {
        let timer = null;
        if (gameState === "playing" && isTimerRunning && !showExitConfirm) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleAnswerTimeout();
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
    }, [gameState, isTimerRunning, playLocalSound]);

    // Focus input on new question
    useEffect(() => {
        if (gameState === "playing") {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 250);
        }
    }, [currentIndex, gameState]);

    // -------------------------------------------------------------
    // TIMEOUT HANDLER
    // -------------------------------------------------------------
    const handleAnswerTimeout = useCallback(() => {
        if (gameState !== "playing" || !currentWord) return;

        setIsTimerRunning(false);
        playLocalSound("timeout");

        const feedback = {
            isCorrect: false,
            isTimeout: true,
            typed: "(Time out)",
            word: currentWord.word,
            ipa: currentWord.ipa || "",
            meaning: currentWord.meaning || currentWord.meaningEN || currentWord.meaningBM || "",
            sentence: currentWord.sentence || currentWord.sentenceEN || currentWord.sentenceBM || "",
            image: currentWord.image || "",
            theme: currentWord.theme || "",
            pointsEarned: 0,
            timeTaken: TIMER_LIMIT,
        };

        setLastAnswerFeedback(feedback);
        setResultsHistory((prev) => [...prev, feedback]);
        setGameState("review_word");
    }, [currentWord, gameState, playLocalSound]);

    // -------------------------------------------------------------
    // SUBMIT USER SPELLING
    // -------------------------------------------------------------
    const handleSubmitAnswer = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (gameState !== "playing" || !currentWord) return;

        const typedClean = userSpelling.trim().toLowerCase();
        if (!typedClean) return;

        setIsTimerRunning(false);
        const timeTaken = TIMER_LIMIT - timeLeft;
        const targetWord = currentWord.word.trim().toLowerCase();
        const isCorrect = typedClean === targetWord;

        let points = 0;
        if (isCorrect) {
            playLocalSound("correct");
            // Base 100 XP + time bonus
            points = 100 + Math.max(0, timeLeft * 2);
            if (hasUsedHintCurrent) {
                points = Math.max(20, points - 25);
            }
            setTotalScore((prev) => prev + points);
        } else {
            playLocalSound("wrong");
        }

        const feedback = {
            isCorrect,
            isTimeout: false,
            typed: userSpelling.trim(),
            word: currentWord.word,
            ipa: currentWord.ipa || "",
            meaning: currentWord.meaning || currentWord.meaningEN || currentWord.meaningBM || "",
            sentence: currentWord.sentence || currentWord.sentenceEN || currentWord.sentenceBM || "",
            image: currentWord.image || "",
            theme: currentWord.theme || "",
            pointsEarned: points,
            timeTaken,
        };

        setLastAnswerFeedback(feedback);
        setResultsHistory((prev) => [...prev, feedback]);
        setGameState("review_word");
    };

    // -------------------------------------------------------------
    // NEXT WORD OR FINISH GAME
    // -------------------------------------------------------------
    const handleNextWord = () => {
        playLocalSound("tap");
        const nextIdx = currentIndex + 1;

        if (nextIdx < wordList.length) {
            setCurrentIndex(nextIdx);
            setUserSpelling("");
            setShowHint(false);
            setHasUsedHintCurrent(false);
            setTimeLeft(TIMER_LIMIT);
            setGameState("playing");
            setIsTimerRunning(true);

            setTimeout(() => {
                if (wordList[nextIdx]) {
                    speakWord(wordList[nextIdx].word);
                }
            }, 300);
        } else {
            setGameState("finished");
            playLocalSound("victory");

            if (typeof onSubmitSpellingBee === "function") {
                onSubmitSpellingBee(totalScore);
            }
        }
    };

    const toggleHint = () => {
        playLocalSound("tap");
        setShowHint((prev) => !prev);
        if (!hasUsedHintCurrent) {
            setHasUsedHintCurrent(true);
        }
    };

    const correctCount = resultsHistory.filter((r) => r.isCorrect).length;
    const accuracyPercent = wordList.length > 0 ? Math.round((correctCount / wordList.length) * 100) : 0;
    const starsEarned = accuracyPercent >= 85 ? 3 : accuracyPercent >= 60 ? 2 : 1;

    /* =========================================================================
       RENDER: VIEW 1 - START SCREEN (ENGLISH, THEME CARDS WITH IMAGES, EASY/MED/HARD)
       ========================================================================= */
    if (gameState === "start") {
        return (
            <div className="w-full max-w-2xl mx-auto space-y-4 text-left">
                {/* Header with Back button */}
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🐝</span>
                            <h2 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
                                Exploria Spelling Bee
                            </h2>
                        </div>
                        <p className="text-xs text-amber-800/80 mt-0.5 font-semibold">
                            Listen carefully, look at the picture, and spell the word!
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
                        <span>Activities</span>
                    </button>
                </div>

                {/* Hero Mascot Banner (Static) */}
                <div className="bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-200 rounded-3xl p-4 sm:p-5 border-3 border-amber-400 shadow-md flex items-center gap-4">
                    <div className="shrink-0">
                        <GraphicBeeMascot mood="happy" className="w-20 h-20 drop-shadow-sm" />
                    </div>

                    <div className="space-y-1">
                        <div className="inline-block bg-amber-950/10 text-amber-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Interactive Audio & Picture Quiz
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-amber-950 leading-tight">
                            Spelling Bee Challenge
                        </h3>
                        <p className="text-xs text-amber-900 font-semibold">
                            8 questions per round • Listen & type the correct spelling!
                        </p>
                    </div>
                </div>

                {/* 1. Theme Selection Cards With Pictures */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs sm:text-sm font-black text-slate-800">
                            🎨 Choose a Theme:
                        </label>
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            {selectedTheme === "all" ? "All Topics" : selectedTheme.toUpperCase()}
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
                                            ? "border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-400/60 scale-[1.02]"
                                            : "border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300"
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
                                            <div className="absolute top-1 right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-xs">
                                                ✓
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full text-center">
                                        <span className={`block text-xs font-black truncate ${
                                            isSelected ? "text-amber-950" : "text-slate-800"
                                        }`}>
                                            {theme.title}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Difficulty Selection (Easy, Medium, Hard) */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-xs space-y-3">
                    <label className="block text-xs sm:text-sm font-black text-slate-800">
                        ⚡ Choose Difficulty:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { key: "all", label: "All Levels", color: "amber" },
                            { key: "easy", label: "Easy", color: "emerald" },
                            { key: "medium", label: "Medium", color: "sky" },
                            { key: "hard", label: "Hard", color: "rose" },
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
                                    className={`py-2.5 px-1 rounded-2xl text-xs text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                                        isSelected
                                            ? "bg-amber-500 text-white border-amber-600 shadow-sm font-black scale-102"
                                            : "bg-slate-50 text-slate-700 border-slate-200 font-bold hover:bg-slate-100"
                                    }`}
                                >
                                    <span>{d.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Test Audio & Questions Info */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-500">
                                Questions: <strong className="text-amber-800 font-black">8 Words</strong>
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="font-bold text-slate-500">
                                Timer: <strong className="text-amber-800 font-black">30s / word</strong>
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                speakWord("Welcome to the Exploria Spelling Bee!");
                            }}
                            className="px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                            <span>🔊</span>
                            <span>Test Audio</span>
                        </button>
                    </div>
                </div>

                {/* High Score Badge */}
                {spellingScore > 0 && (
                    <div className="bg-emerald-50 border-2 border-emerald-300 p-3 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🏆</span>
                            <span className="text-xs font-black text-emerald-950">High Score: {spellingScore} XP</span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Achieved
                        </span>
                    </div>
                )}

                {/* Big Action Play Button */}
                <button
                    type="button"
                    onClick={startNewGame}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-black text-base rounded-2xl shadow-lg border-b-4 border-amber-700 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                    <span>Start Challenge</span>
                    <span>🚀</span>
                </button>
            </div>
        );
    }

    /* =========================================================================
       RENDER: VIEW 3 - REVIEW WORD (FEEDBACK AFTER EACH QUESTION)
       ========================================================================= */
    if (gameState === "review_word" && lastAnswerFeedback) {
        const isRight = lastAnswerFeedback.isCorrect;
        return (
            <div className="w-full max-w-xl mx-auto space-y-4 anim-fade-in text-left">
                <div
                    className={`rounded-3xl p-5 sm:p-6 border-3 shadow-lg text-center space-y-3.5 ${
                        isRight
                            ? "bg-gradient-to-b from-emerald-50 via-teal-50 to-emerald-100 border-emerald-400"
                            : "bg-gradient-to-b from-rose-50 via-red-50 to-rose-100 border-rose-400"
                    }`}
                >
                    <div className="flex justify-center anim-pop">
                        <GraphicBeeMascot
                            mood={isRight ? "happy" : "wrong"}
                            className="w-20 h-20 drop-shadow-sm"
                        />
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase mb-1">
                            {isRight ? (
                                <span className="bg-emerald-600 text-white px-3 py-0.5 rounded-full flex items-center gap-1">
                                    <GraphicCheckCircle className="w-4 h-4" /> CORRECT SPELLING!
                                </span>
                            ) : (
                                <span className="bg-rose-600 text-white px-3 py-0.5 rounded-full flex items-center gap-1">
                                    <GraphicCrossCircle className="w-4 h-4" /> {lastAnswerFeedback.isTimeout ? "TIME IS UP!" : "INCORRECT SPELLING"}
                                </span>
                            )}
                        </div>

                        {/* Word Picture in Review */}
                        {lastAnswerFeedback.image && (
                            <div className="w-28 h-28 mx-auto my-2 rounded-2xl overflow-hidden border-2 border-white/80 shadow-md">
                                <img
                                    src={lastAnswerFeedback.image}
                                    alt={lastAnswerFeedback.word}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-wide">
                            {lastAnswerFeedback.word}
                        </h3>
                        {lastAnswerFeedback.ipa && (
                            <p className="text-xs text-slate-500 font-mono mt-0.5">
                                {lastAnswerFeedback.ipa}
                            </p>
                        )}
                    </div>

                    {/* Word Spelling Comparison */}
                    <div className="bg-white/95 p-3.5 rounded-2xl border border-slate-200 text-left space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-bold">Your Answer:</span>
                            <span
                                className={`font-black font-mono px-2 py-0.5 rounded-md ${
                                    isRight ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800 line-through"
                                }`}
                            >
                                {lastAnswerFeedback.typed}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-bold">Correct Spelling:</span>
                            <span className="font-black font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {lastAnswerFeedback.word}
                            </span>
                        </div>
                        {lastAnswerFeedback.meaning && (
                            <div className="pt-1.5 border-t border-slate-100 text-xs text-slate-600">
                                <p className="font-semibold">{lastAnswerFeedback.meaning}</p>
                            </div>
                        )}
                    </div>

                    {/* Score / XP info */}
                    <div className="flex items-center justify-around bg-white/80 py-2 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
                        <div>
                            <span className="text-slate-500">Points:</span>{" "}
                            <span className="font-black text-amber-600">+{lastAnswerFeedback.pointsEarned} XP</span>
                        </div>
                        <div>
                            <span className="text-slate-500">Time:</span>{" "}
                            <span className="font-black text-slate-800">{lastAnswerFeedback.timeTaken}s</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2.5 pt-1">
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                speakWord(lastAnswerFeedback.word);
                            }}
                            className="flex-1 py-2.5 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                            <GraphicSpeaker isPlaying={isSpeaking} className="w-4 h-4 text-amber-600" />
                            <span>Listen Again</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleNextWord}
                            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                        >
                            <span>{currentIndex + 1 < wordList.length ? "Next Word" : "View Results"}</span>
                            <span>➡️</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* =========================================================================
       RENDER: VIEW 4 - FINISHED / RESULT SCREEN (NO STREAK, CLEAN SUMMARY)
       ========================================================================= */
    if (gameState === "finished") {
        return (
            <div className="w-full max-w-2xl mx-auto space-y-5 anim-fade-in text-left">
                {/* Header */}
                <div className="bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-200 rounded-3xl p-5 sm:p-6 border-3 border-amber-400 shadow-lg text-center space-y-3 relative overflow-hidden">
                    <div className="flex justify-center anim-pop">
                        <GraphicSpellingTrophy className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-sm" />
                    </div>

                    <div>
                        <div className="inline-block bg-amber-950/10 px-3 py-0.5 rounded-full text-xs font-black text-amber-950 uppercase tracking-wider mb-1">
                            Spelling Bee Results
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-amber-950">
                            {accuracyPercent >= 80 ? "Awesome! Spelling Champion!" : accuracyPercent >= 50 ? "Great Job! Well Done!" : "Keep Practicing!"}
                        </h2>
                        <div className="flex justify-center gap-1 mt-1.5">
                            {[1, 2, 3].map((star) => (
                                <span
                                    key={star}
                                    className={`text-2xl transition-transform ${
                                        star <= starsEarned ? "text-amber-500 scale-110" : "text-amber-900/20"
                                    }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats Summary Grid (NO STREAK - 3 CLEAN COLUMNS) */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                        <div className="bg-white/85 p-3 rounded-2xl border border-amber-200 shadow-xs text-center">
                            <div className="text-[10px] font-black uppercase text-amber-800">Total XP</div>
                            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-0.5">+{totalScore}</div>
                        </div>
                        <div className="bg-white/85 p-3 rounded-2xl border border-amber-200 shadow-xs text-center">
                            <div className="text-[10px] font-black uppercase text-amber-800">Accuracy</div>
                            <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">{accuracyPercent}%</div>
                        </div>
                        <div className="bg-white/85 p-3 rounded-2xl border border-amber-200 shadow-xs text-center">
                            <div className="text-[10px] font-black uppercase text-amber-800">Correct / Total</div>
                            <div className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">{correctCount}/{wordList.length}</div>
                        </div>
                    </div>
                </div>

                {/* Review Words List with Picture Thumbnails */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <h3 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                            <span>📝</span> Word Review List
                        </h3>
                        <span className="text-xs font-bold text-slate-500">
                            {correctCount} of {wordList.length} correct
                        </span>
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {resultsHistory.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                                    item.isCorrect
                                        ? "bg-emerald-50/50 border-emerald-200"
                                        : "bg-rose-50/50 border-rose-200"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Thumbnail */}
                                    {item.image ? (
                                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
                                            <img src={item.image} alt={item.word} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-xl shrink-0">
                                            🐝
                                        </div>
                                    )}

                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            {item.isCorrect ? (
                                                <GraphicCheckCircle className="w-4 h-4 shrink-0" />
                                            ) : (
                                                <GraphicCrossCircle className="w-4 h-4 shrink-0" />
                                            )}
                                            <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
                                                {item.word}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-600 flex items-center gap-2">
                                            <span>Your spelling:</span>
                                            <span
                                                className={`font-mono font-bold ${
                                                    item.isCorrect ? "text-emerald-700" : "text-rose-600 line-through"
                                                }`}
                                            >
                                                {item.typed}
                                            </span>
                                            {!item.isCorrect && (
                                                <span className="text-emerald-700 font-mono font-black">
                                                    (Correct: {item.word})
                                                </span>
                                            )}
                                        </div>
                                        {item.meaning && (
                                            <p className="text-[11px] text-slate-500 line-clamp-1">
                                                {item.meaning}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            playLocalSound("tap");
                                            speakWord(item.word);
                                        }}
                                        className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 shadow-xs cursor-pointer"
                                        title="Listen to pronunciation"
                                    >
                                        <GraphicSpeaker className="w-3.5 h-3.5 text-amber-600" />
                                    </button>
                                    <span className="text-xs font-black text-amber-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                                        +{item.pointsEarned} XP
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                        type="button"
                        onClick={() => {
                            playLocalSound("tap");
                            setGameState("start");
                        }}
                        className="py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-black rounded-2xl shadow-md border-b-3 border-amber-700 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                        <span>✅</span>
                        <span>Done</span>
                    </button>
                    <button
                        type="button"
                        onClick={startNewGame}
                        className="py-3.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-black rounded-2xl shadow-xs border-2 border-amber-200 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                        <span>🔄</span>
                        <span>Play Again</span>
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
                        <span>Back to Activities</span>
                    </button>
                </div>
            </div>
        );
    }

    /* =========================================================================
       RENDER: VIEW 2 - ACTIVE PLAYING (ENGLISH UI, IMAGE SHOWN FOR EVERY WORD)
       ========================================================================= */
    const timerPercent = (timeLeft / TIMER_LIMIT) * 100;
    const isUrgent = timeLeft <= 7;

    return (
        <div className="w-full max-w-xl mx-auto space-y-3.5 anim-fade-in text-left">
            {/* Top Bar (NO STREAK) */}
            <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-2xl border-2 border-amber-200 shadow-xs">
                <button
                    type="button"
                    onClick={() => {
                        playLocalSound("tap");
                        setShowExitConfirm(true);
                    }}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold rounded-xl text-xs flex items-center gap-1 border border-slate-200 cursor-pointer transition-colors"
                    title="Exit Spelling Bee"
                >
                    <GraphicBackArrow className="w-3.5 h-3.5" />
                    <span>Exit</span>
                </button>

                {/* Progress Tracker (Question X of 8) */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                        Question {currentIndex + 1} of {wordList.length}
                    </span>
                </div>

                {/* Score Pill */}
                <div className="text-xs font-black text-amber-700 flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    <span>⭐</span>
                    <span>{totalScore} XP</span>
                </div>
            </div>

            {/* Main Interactive Play Area */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-lg space-y-3.5 relative">
                {/* 30-Second Countdown Timer Bar */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1">
                            <GraphicTimer className={`w-4 h-4 ${isUrgent ? "text-rose-600 animate-bounce" : "text-amber-600"}`} />
                            <span className={isUrgent ? "text-rose-600 font-black animate-pulse" : ""}>
                                Time Left: {timeLeft}s
                            </span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                            30s
                        </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                                isUrgent
                                    ? "bg-rose-500 animate-pulse"
                                    : timeLeft <= 15
                                    ? "bg-amber-400"
                                    : "bg-emerald-500"
                            }`}
                            style={{ width: `${timerPercent}%` }}
                        />
                    </div>
                </div>

                {/* PICTURE OF THE WORD TO SPELL (AS REQUESTED: "letak gambar apa yang user kene eja") */}
                <div className="bg-gradient-to-b from-amber-50 to-white p-3.5 sm:p-4 rounded-2xl border-2 border-amber-200 text-center space-y-2.5">
                    {/* Word Image Display */}
                    <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-md bg-amber-100 group">
                        {currentWord?.image ? (
                            <img
                                src={currentWord.image}
                                alt="Spell this item"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                <span className="text-4xl">❓</span>
                                <span className="text-xs font-bold mt-1">Image Preview</span>
                            </div>
                        )}
                        {/* Theme and Difficulty Badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                            {currentWord?.theme && (
                                <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                                    {currentWord.theme}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Pronunciation Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                speakWord(currentWord?.word, 0.88);
                            }}
                            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-black rounded-xl shadow-xs border-b-2 border-amber-700 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                        >
                            <GraphicSpeaker isPlaying={isSpeaking} className="w-4 h-4 text-amber-950" />
                            <span>Listen to Word</span>
                            {isSpeaking && <span className="text-xs animate-ping">🔊</span>}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                playLocalSound("tap");
                                speakWord(currentWord?.word, 0.65);
                            }}
                            className="w-full sm:w-auto px-3.5 py-2.5 bg-white hover:bg-amber-50 text-slate-700 font-bold rounded-xl border border-amber-200 shadow-xs active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                            title="Slow Pronunciation"
                        >
                            <span>🐢</span>
                            <span>Slow (0.65x)</span>
                        </button>
                    </div>
                </div>

                {/* Form Input For User Spelling */}
                <form onSubmit={handleSubmitAnswer} className="space-y-3">
                    <div>
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={userSpelling}
                                onChange={(e) => setUserSpelling(e.target.value)}
                                placeholder="Type your spelling here..."
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="none"
                                spellCheck="false"
                                className="w-full px-4 py-3 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 font-mono text-base sm:text-lg font-black rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-3 focus:ring-amber-200/50 shadow-inner transition-all tracking-wider text-center"
                            />
                            {userSpelling && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUserSpelling("");
                                        inputRef.current?.focus();
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 px-1 font-medium">
                            <span>Press <strong>Enter</strong> to submit</span>
                            <span>{userSpelling.length} letters</span>
                        </div>
                    </div>

                    {/* Hint Expander */}
                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={toggleHint}
                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer ${
                                showHint
                                    ? "bg-amber-100 border-amber-400 text-amber-900"
                                    : "bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-600"
                            }`}
                        >
                            <span className="flex items-center gap-1.5">
                                <GraphicLightbulb className="w-4 h-4 text-amber-600" />
                                <span>{showHint ? "Hide Hint" : "Need a Hint? (Definition & Clue)"}</span>
                            </span>
                            <span className="text-[10px] uppercase font-black bg-white px-2 py-0.5 rounded-full border border-slate-200 text-amber-700">
                                -25 XP
                            </span>
                        </button>

                        {showHint && (
                            <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-xs space-y-1.5 anim-pop">
                                {currentWord?.meaning && (
                                    <div className="font-bold text-amber-950">
                                        💡 <strong>Meaning:</strong> {currentWord.meaning}
                                    </div>
                                )}
                                {currentWord?.sentence && (
                                    <div className="text-slate-600 italic">
                                        💬 <strong>Example:</strong> &ldquo;{currentWord.sentence}&rdquo;
                                    </div>
                                )}
                                {currentWord?.hintLetters && (
                                    <div className="pt-1 border-t border-amber-200/80 flex items-center justify-between text-[11px] font-mono text-amber-900 font-bold">
                                        <span>Letters clue:</span>
                                        <span className="tracking-widest bg-white px-2 py-0.5 rounded border border-amber-200">
                                            {currentWord.hintLetters}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submit Answer Button */}
                    <button
                        type="submit"
                        disabled={!userSpelling.trim()}
                        className={`w-full py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            userSpelling.trim()
                                ? "bg-amber-500 hover:bg-amber-600 text-white border-b-3 border-amber-700 active:translate-y-0.5"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed border-b-3 border-slate-300"
                        }`}
                    >
                        <span>Submit Answer</span>
                        <span>🚀</span>
                    </button>
                </form>
            </div>

            {/* Exit Confirmation Modal */}
            {showExitConfirm && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 anim-fade-in">
                    <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-3 border-amber-300 shadow-2xl text-center space-y-4 anim-pop">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-amber-300">
                            🐝
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900">
                                Exit Spelling Bee?
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Are you sure you want to exit now? Your current spelling challenge progress will not be saved.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                            <button
                                type="button"
                                onClick={() => {
                                    playLocalSound("tap");
                                    setShowExitConfirm(false);
                                }}
                                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-black rounded-xl text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                            >
                                Keep Playing
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    playLocalSound("tap");
                                    setShowExitConfirm(false);
                                    setIsTimerRunning(false);
                                    setGameState("start");
                                }}
                                className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black rounded-xl text-xs border border-rose-200 active:scale-95 transition-all cursor-pointer"
                            >
                                Yes, Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
