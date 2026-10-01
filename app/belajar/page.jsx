"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    GraphicHomeButton,
    GraphicSaturnPlanet,
    GraphicNatureLeaf,
    GraphicScienceBook,
    GraphicRocketLaunch,
    GraphicSolarSystemBanner,
    GraphicPhotosynthesisBanner,
    LanguageToggle,
    SOLAR_PLANETS,
} from "./components/Graphics";
import MainMenu from "./components/MainMenu";
import LearningView from "./components/LearningView";
import QuizView from "./components/QuizView";
import SolarActivityView from "./components/SolarActivityView";
import PlantActivityView from "./components/PlantActivityView";
import SpellingBeeActivity from "./components/SpellingBeeActivity";
import MathSpeedQuiz from "./components/MathSpeedQuiz";
import DashboardView from "./components/DashboardView";
import RegisterPage from "./Register";
import LoginPage from "./Login";
import AuthGatewayView from "./components/AuthGatewayView";
import { saveStudentProfile, calculateCalendarStreak } from "../../lib/firestoreService";
import { getCurriculumTopics, INITIAL_CURRICULUM_TOPICS } from "../../lib/curriculumService";

// Formula piawai Exploria: XP dikira berdasarkan markah tertinggi sebenar murid (tiada pertambahan berganda jika diulang)
export const calculateTotalXP = (stats = {}) => {
    const base = 100; // Bonus pendaftaran selamat datang
    const read = (Array.isArray(stats.readTopics) ? stats.readTopics.length : 0) * 50;
    const solar = typeof stats.solarScore === "number" ? stats.solarScore : 0;
    const plant = typeof stats.plantScore === "number" ? stats.plantScore : 0;
    const spelling = typeof stats.spellingScore === "number" ? stats.spellingScore : 0;
    const math = typeof stats.mathScore === "number" ? stats.mathScore : 0;
    const quiz = typeof stats.quizHighScore === "number" ? stats.quizHighScore : 0;
    return base + read + solar + plant + spelling + math + quiz;
};

export const getLevelFromXP = (xp = 100) => {
    if (xp >= 2000) return 4;
    if (xp >= 1200) return 3;
    if (xp >= 500) return 2;
    return 1;
};

export default function LessonPage() {

    const [isMounted, setIsMounted] = useState(false);

    // HALAMAN PERTAMA SEKALI: FORM LOGIN
    // Jika belum log masuk dan belum memilih mod tetamu, halaman pertama adalah "login"
    const [currentView, setCurrentView] = useState("login");

    // Guest Auth Notice Modal State
    const [showGuestAuthModal, setShowGuestAuthModal] = useState(false);
    const [guestModalContext, setGuestModalContext] = useState("kuiz"); // "kuiz" | "aktiviti"

    const triggerGuestNotice = (feature = "kuiz") => {
        playAudioFeedback("error");
        setGuestModalContext(feature);
        setShowGuestAuthModal(true);
    };

    const handleContinueAsGuest = () => {
        playAudioFeedback("tap");
        setIsLoggedIn(false);
        setStudentName("");
        try {
            sessionStorage.setItem("exploria_guest_mode", "true");
        } catch {}
        setCurrentView("menu");
    };

    const handleNavigate = (view) => {
        if ((view === "solarDragDrop" || view === "plantActivity") && !isLoggedIn) {
            triggerGuestNotice("aktiviti");
            return;
        }
        setCurrentView(view);
    };

    const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
    const [curriculumTopics, setCurriculumTopics] = useState(INITIAL_CURRICULUM_TOPICS);



    // Quiz states

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState({});

    const [scoreCount, setScoreCount] = useState(0);

    const [quizTotalPoints, setQuizTotalPoints] = useState(0); // Markah kelajuan terkumpul

    const [questionRewards, setQuestionRewards] = useState({}); // { [qIdx]: { isCorrect, pointsEarned, basePoints, speedBonus, timeLeft, timeSpent } }

    const [lastReward, setLastReward] = useState(null); // Data mata soalan terkini untuk animasi pop-up

    const [quizHighScore, setQuizHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [showScorePopup, setShowScorePopup] = useState(false);
    const [language, setLanguage] = useState("bm");
    const timerRef = useRef(null);

    const toggleLanguage = (lang) => {

        playAudioFeedback("sparkle");

        const next = lang || (language === "bm" ? "en" : "bm");

        setLanguage(next);

        try {

            localStorage.setItem("exploria_lang", next);

        } catch {

            // fallback

        }

    };



    const t = (bm, en) => (language === "en" ? en : bm);



    // Permainan Drag & Drop Sistem Suria States

    const [placedPlanets, setPlacedPlanets] = useState({}); // { [orbitNumber]: planetId }

    const [selectedTrayPlanet, setSelectedTrayPlanet] = useState(null); // for click-to-place & mobile

    const [solarScore, setSolarScore] = useState(0); // Rekod skor profil murid aktiviti suria (Max 800)

    const [solarSubmitted, setSolarSubmitted] = useState(false); // Status aktiviti telah selesai dalam profil murid

    const [solarBoardScore, setSolarBoardScore] = useState(0); // Skor percubaan semasa di papan permainan

    const [isSolarBoardFinished, setIsSolarBoardFinished] = useState(false); // Paparan keputusan pada papan aktiviti

    const [solarWrongSlot, setSolarWrongSlot] = useState(null); // for shake animation

    const [solarFeedbackMessage, setSolarFeedbackMessage] = useState(null);

    // Permainan Makmal Tumbuhan States
    const [plantScore, setPlantScore] = useState(0); // Rekod skor profil murid aktiviti tumbuhan (Max 800)
    const [plantSubmitted, setPlantSubmitted] = useState(false); // Status aktiviti tumbuhan selesai dalam profil murid

    // Permainan Cabaran Spelling Bee States
    const [spellingScore, setSpellingScore] = useState(0); // Rekod skor profil murid Spelling Bee
    const [spellingSubmitted, setSpellingSubmitted] = useState(false); // Status aktiviti Spelling Bee selesai

    // Permainan Pertandingan Sifir Kilat States
    const [mathScore, setMathScore] = useState(0); // Rekod skor profil murid Pertandingan Sifir
    const [mathSubmitted, setMathSubmitted] = useState(false); // Status aktiviti Sifir selesai



    // User Authentication & Profile States
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentName, setStudentName] = useState("");
    const [studentIC, setStudentIC] = useState("");
    const [studentLevel, setStudentLevel] = useState(1);
    const [studentXP, setStudentXP] = useState(100);
    const [studentStreak, setStudentStreak] = useState(1);
    const [readTopics, setReadTopics] = useState([]);
    const [averageQuizSpeed, setAverageQuizSpeed] = useState(null);

    // Initial mount effect to safely sync with localStorage on client (prevents SSR hydration error)
    useEffect(() => {
        setIsMounted(true);
        try {
            const savedLang = localStorage.getItem("exploria_lang");
            if (savedLang === "en" || savedLang === "bm") setLanguage(savedLang);

            const savedScore = localStorage.getItem("exploria_quiz_high_score");
            if (savedScore) setQuizHighScore(parseInt(savedScore, 10) || 0);

            const loggedIn = localStorage.getItem("exploria_is_logged_in") === "true";
            const isGuest = sessionStorage.getItem("exploria_guest_mode") === "true";
            const name = localStorage.getItem("exploria_student_name") || "";
            const ic = localStorage.getItem("exploria_student_ic") || "";

            if (loggedIn) {
                setIsLoggedIn(true);
                setStudentName(name);
                setStudentIC(ic);
                setCurrentView("menu");
            } else if (isGuest) {
                setIsLoggedIn(false);
                setStudentName("");
                setCurrentView("menu");
            } else {
                setIsLoggedIn(false);
                setCurrentView("login");
            }
        } catch {
            setIsLoggedIn(false);
            setCurrentView("login");
        }
    }, []);

    // Muat kurikulum & soalan kuiz dinamik (segerak dengan panel admin & Firestore)
    useEffect(() => {
        let isSubscribed = true;
        const fetchTopics = async () => {
            try {
                const data = await getCurriculumTopics();
                if (isSubscribed && Array.isArray(data) && data.length > 0) {
                    setCurriculumTopics(data);
                }
            } catch (err) {
                console.warn("Ralat memuat kurikulum:", err);
            }
        };

        fetchTopics();

        const handleCurriculumUpdate = () => {
            fetchTopics();
        };

        window.addEventListener("exploria_curriculum_updated", handleCurriculumUpdate);
        window.addEventListener("storage", (e) => {
            if (e.key === "exploria_curriculum_topics") {
                handleCurriculumUpdate();
            }
        });

        return () => {
            isSubscribed = false;
            window.removeEventListener("exploria_curriculum_updated", handleCurriculumUpdate);
        };
    }, []);

    // Muat data profil pelajar dari storan mengikut IC
    useEffect(() => {
        if (typeof window !== "undefined" && isLoggedIn) {
            try {
                const ic = studentIC || localStorage.getItem("exploria_student_ic") || "default";
                let raw = localStorage.getItem(`exploria_student_${ic}_stats`);
                if (!raw) {
                    raw = localStorage.getItem("exploria_student_last_stats");
                }
                if (raw) {
                    const stats = JSON.parse(raw);
                    const qHigh = typeof stats.quizHighScore === "number" ? stats.quizHighScore : 0;
                    const sScore = typeof stats.solarScore === "number" ? stats.solarScore : 0;
                    const pScore = typeof stats.plantScore === "number" ? stats.plantScore : 0;
                    const spScore = typeof stats.spellingScore === "number" ? stats.spellingScore : 0;
                    const mScore = typeof stats.mathScore === "number" ? stats.mathScore : 0;
                    const rTopics = Array.isArray(stats.readTopics) ? stats.readTopics : [];

                    setQuizHighScore(qHigh);
                    setSolarScore(sScore);
                    if (typeof stats.solarSubmitted === "boolean") setSolarSubmitted(stats.solarSubmitted);
                    setPlantScore(pScore);
                    if (typeof stats.plantSubmitted === "boolean") setPlantSubmitted(stats.plantSubmitted);
                    setSpellingScore(spScore);
                    if (typeof stats.spellingSubmitted === "boolean") setSpellingSubmitted(stats.spellingSubmitted);
                    setMathScore(mScore);
                    if (typeof stats.mathSubmitted === "boolean") setMathSubmitted(stats.mathSubmitted);
                    // Kira streak kalendar sebenar murid
                    const streakRes = calculateCalendarStreak(stats.lastActiveDate, stats.streak || 1);
                    setStudentStreak(streakRes.streak);
                    if (streakRes.isNewDay) {
                        stats.streak = streakRes.streak;
                        stats.lastActiveDate = streakRes.lastActiveDate;
                        try {
                            localStorage.setItem(`exploria_student_${ic}_stats`, JSON.stringify(stats));
                            localStorage.setItem("exploria_student_last_stats", JSON.stringify(stats));
                        } catch {}
                        if (ic && ic !== "default") {
                            saveStudentProfile(ic, {
                                streakHari: streakRes.streak,
                                tarikhAktifTerakhir: streakRes.lastActiveDate
                            });
                        }
                    }

                    if (stats.averageSpeed) setAverageQuizSpeed(stats.averageSpeed);

                    // Kira mata XP & tahap murid berdasarkan skor tertinggi sebenar (elak duplikasi jika diulang)
                    const legitXP = calculateTotalXP({
                        quizHighScore: qHigh,
                        solarScore: sScore,
                        plantScore: pScore,
                        spellingScore: spScore,
                        mathScore: mScore,
                        readTopics: rTopics,
                    });
                    setStudentXP(legitXP);
                    setStudentLevel(getLevelFromXP(legitXP));
                }
            } catch (err) {
                console.error("Ralat memuatkan profil murid:", err);
            }
        }
    }, [isLoggedIn, studentIC]);

    const saveCurrentStudentStats = (updates = {}) => {
        if (typeof window === "undefined") return;
        try {
            const ic = studentIC || localStorage.getItem("exploria_student_ic") || "default";
            const key = `exploria_student_${ic}_stats`;
            const raw = localStorage.getItem(key);
            const current = raw ? JSON.parse(raw) : {};
            const today = new Date();
            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            const merged = {
                ...current,
                level: studentLevel,
                xp: studentXP,
                streak: studentStreak,
                lastActiveDate: current.lastActiveDate || todayStr,
                quizHighScore: quizHighScore,
                solarScore: solarScore,
                solarSubmitted: solarSubmitted,
                plantScore: plantScore,
                plantSubmitted: plantSubmitted,
                spellingScore: spellingScore,
                spellingSubmitted: spellingSubmitted,
                mathScore: mathScore,
                mathSubmitted: mathSubmitted,
                readTopics: readTopics,
                averageSpeed: averageQuizSpeed,
                ...updates,
            };
            localStorage.setItem(key, JSON.stringify(merged));
            localStorage.setItem("exploria_student_last_stats", JSON.stringify(merged));
        } catch (err) {
            console.error("Ralat menyimpan rekod murid:", err);
        }
    };

    const handleAuthSuccess = (data, isNewRegister = false) => {
        const rawName = data?.nama || data?.name;
        const name = rawName ? rawName.trim() : "Penjelajah STEM";
        const cleanIC = (data?.ic || "").replace(/\D/g, "");

        setStudentName(name);
        setStudentIC(cleanIC);
        setIsLoggedIn(true);

        try {
            localStorage.setItem("exploria_is_logged_in", "true");
            localStorage.setItem("exploria_student_name", name);
            if (cleanIC) localStorage.setItem("exploria_student_ic", cleanIC);
            sessionStorage.removeItem("exploria_guest_mode");
        } catch {}

        if (isNewRegister) {
            // Akaun murid baharu: bermula dari Tahap 1, 100 XP (Bonus Daftar), dan rekod bersih 0
            const today = new Date();
            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            const freshStats = {
                level: 1,
                xp: 100, // Bonus pendaftaran selamat datang
                streak: 1,
                lastActiveDate: todayStr,
                quizHighScore: 0,
                solarScore: 0,
                solarSubmitted: false,
                spellingScore: 0,
                spellingSubmitted: false,
                mathScore: 0,
                mathSubmitted: false,
                readTopics: [],
                averageSpeed: null,
            };

            setStudentLevel(1);
            setStudentXP(100);
            setStudentStreak(1);
            setQuizHighScore(0);
            setQuizTotalPoints(0);
            setScoreCount(0);
            setSolarScore(0);
            setSolarSubmitted(false);
            setSpellingScore(0);
            setSpellingSubmitted(false);
            setMathScore(0);
            setMathSubmitted(false);
            setReadTopics([]);
            setAverageQuizSpeed(null);

            if (cleanIC) {
                try {
                    localStorage.setItem(`exploria_student_${cleanIC}_stats`, JSON.stringify(freshStats));
                } catch {}
            }
            try {
                localStorage.setItem("exploria_quiz_high_score", "0");
            } catch {}
        } else {
            // Log masuk akaun sedia ada: muat kembali rekod murid dari Firestore / LocalStorage
            let saved = null;
            if (cleanIC) {
                try {
                    const raw = localStorage.getItem(`exploria_student_${cleanIC}_stats`);
                    if (raw) saved = JSON.parse(raw);
                } catch {}
            }

            const qScore = saved?.quizHighScore ?? (data?.skorKuiz || 0);
            const sScore = saved?.solarScore ?? (data?.skorSuria || 0);
            const sSubmitted = saved?.solarSubmitted ?? (sScore > 0);
            const pScore = saved?.plantScore ?? (data?.skorTumbuhan || 0);
            const pSubmitted = saved?.plantSubmitted ?? (pScore > 0);
            const spScore = saved?.spellingScore ?? (data?.skorSpelling || 0);
            const spSubmitted = saved?.spellingSubmitted ?? (spScore > 0);
            const mScore = saved?.mathScore ?? (data?.skorSifir || 0);
            const mSubmitted = saved?.mathSubmitted ?? (mScore > 0);
            const rTopics = saved?.readTopics || [];
            const avgSpeed = saved?.averageSpeed || null;

            // Kira streak kalendar sebenar
            const lastActive = data?.tarikhAktifTerakhir || saved?.lastActiveDate;
            const currentStreakVal = data?.streakHari || saved?.streak || 1;
            const streakRes = calculateCalendarStreak(lastActive, currentStreakVal);
            const streak = streakRes.streak;

            // Kira XP & tahap berasaskan markah tertinggi aktiviti (tiada penambahan berganda)
            const legitXP = calculateTotalXP({
                quizHighScore: qScore,
                solarScore: sScore,
                plantScore: pScore,
                spellingScore: spScore,
                mathScore: mScore,
                readTopics: rTopics,
            });
            const legitLevel = getLevelFromXP(legitXP);

            setStudentLevel(legitLevel);
            setStudentXP(legitXP);
            setStudentStreak(streak);
            setQuizHighScore(qScore);
            setSolarScore(sScore);
            setSolarSubmitted(sSubmitted);
            setPlantScore(pScore);
            setPlantSubmitted(pSubmitted);
            setSpellingScore(spScore);
            setSpellingSubmitted(spSubmitted);
            setMathScore(mScore);
            setMathSubmitted(mSubmitted);
            setReadTopics(rTopics);
            setAverageQuizSpeed(avgSpeed);

            if (cleanIC) {
                try {
                    const toSave = {
                        ...(saved || {}),
                        level: legitLevel,
                        xp: legitXP,
                        streak: streak,
                        lastActiveDate: streakRes.lastActiveDate,
                        quizHighScore: qScore,
                        solarScore: sScore,
                        solarSubmitted: sSubmitted,
                        plantScore: pScore,
                        plantSubmitted: pSubmitted,
                        spellingScore: spScore,
                        spellingSubmitted: spSubmitted,
                        mathScore: mScore,
                        mathSubmitted: mSubmitted,
                        readTopics: rTopics,
                        averageSpeed: avgSpeed,
                    };
                    localStorage.setItem(`exploria_student_${cleanIC}_stats`, JSON.stringify(toSave));
                    localStorage.setItem("exploria_student_last_stats", JSON.stringify(toSave));
                } catch {}
            }
        }

        setCurrentView("menu");
    };

    const handleSelectTopic = (idx) => {
        setSelectedTopicIndex(idx);
        if (!readTopics.includes(idx)) {
            const nextTopics = [...readTopics, idx];
            setReadTopics(nextTopics);
            if (isLoggedIn) {
                const nextXP = calculateTotalXP({
                    readTopics: nextTopics,
                    solarScore,
                    plantScore,
                    spellingScore,
                    mathScore,
                    quizHighScore,
                });
                const nextLevel = getLevelFromXP(nextXP);
                setStudentXP(nextXP);
                setStudentLevel(nextLevel);
                saveCurrentStudentStats({ readTopics: nextTopics, xp: nextXP, level: nextLevel });
                if (studentIC) {
                    saveStudentProfile(studentIC, {
                        mataXP: nextXP,
                        tahap: nextLevel,
                    });
                }
            }
        }
    };

    const [isEditingName, setIsEditingName] = useState(false);

    const [tempStudentName, setTempStudentName] = useState("");

    const [selectedBadgeModal, setSelectedBadgeModal] = useState(null);

    const [dashboardActiveTab, setDashboardActiveTab] = useState("all"); // "all" | "records" | "skills" | "quests" | "badges"

    const handleLogout = () => {
        playAudioFeedback("tap");
        setIsLoggedIn(false);
        setStudentName("");
        setStudentIC("");
        setStudentLevel(1);
        setStudentXP(0);
        setStudentStreak(0);
        setQuizHighScore(0);
        setQuizTotalPoints(0);
        setScoreCount(0);
        setSolarScore(0);
        setSolarSubmitted(false);
        setSolarBoardScore(0);
        setIsSolarBoardFinished(false);
        setPlantScore(0);
        setPlantSubmitted(false);
        setReadTopics([]);
        setAverageQuizSpeed(null);
        try {
            localStorage.removeItem("exploria_is_logged_in");
            localStorage.removeItem("exploria_student_name");
            localStorage.removeItem("exploria_student_ic");
            sessionStorage.removeItem("exploria_guest_mode");
        } catch {
            // fallback
        }
        setCurrentView("login");
    };



    // Latar Belakang Piawai: Tekstur Kertas Graf Grid Buku Latihan (Grid Paper Notebook)
    const getBackgroundStyle = () => {
        return "url('/paper-bg.jpg') top center / cover no-repeat fixed";
    };



    const courseData = {
        courseTitle: t("Nota Pembelajaran & Kuiz STEM", "STEM Learning Notes & Quiz"),
        topics: (curriculumTopics || []).map((item, idx) => {
            let defaultGraphic = <GraphicScienceBook className="w-10 h-10 shrink-0 text-cyan-600" />;
            let defaultInfographic = null;

            if (item.id === "topic-1") {
                defaultGraphic = <GraphicSaturnPlanet className="w-10 h-10 shrink-0" />;
                defaultInfographic = <GraphicSolarSystemBanner language={language} />;
            } else if (item.id === "topic-2") {
                defaultGraphic = <GraphicNatureLeaf className="w-10 h-10 shrink-0" />;
                defaultInfographic = <GraphicPhotosynthesisBanner language={language} />;
            }

            return {
                id: item.id || `topic-${idx + 1}`,
                title: item.title,
                shortTitle: item.shortTitle || item.title,
                graphic: item.graphic || defaultGraphic,
                infographic: item.infographic || defaultInfographic,
                category: item.category || t("Sains & Teknologi", "Science & Technology"),
                themeColor: item.themeColor || (idx % 2 === 0 ? "#0099e5" : "#10b981"),
                accentBadge: item.accentBadge || (idx % 2 === 0 ? "bg-sky-100 text-sky-800 border-sky-200" : "bg-emerald-100 text-emerald-800 border-emerald-200"),
                videoEmbedUrl: item.videoEmbedUrl || "https://www.youtube.com/embed/m8NVEFNX9p0",
                videoRawUrl: item.videoRawUrl || (item.videoEmbedUrl ? item.videoEmbedUrl.replace("/embed/", "/watch?v=") : "https://youtu.be/m8NVEFNX9p0"),
                content: item.content || "",
                questions: Array.isArray(item.questions) ? item.questions : []
            };
        })
    };

    const safeTopicIndex = (selectedTopicIndex >= 0 && selectedTopicIndex < courseData.topics.length) ? selectedTopicIndex : 0;
    const currentTopic = courseData.topics[safeTopicIndex] || courseData.topics[0] || { questions: [] };



    const playAudioFeedback = (type) => {

        try {

            const AudioCtx = window.AudioContext || window.webkitAudioContext;

            if (!AudioCtx) return;

            const ctx = new AudioCtx();



            if (type === "pick") {

                // Bunyi 'Pop / Gelembung Kosmik' comel bila klik atau seret planet

                const osc = ctx.createOscillator();

                const gain = ctx.createGain();

                osc.type = "sine";

                osc.frequency.setValueAtTime(320, ctx.currentTime);

                osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);

                gain.gain.setValueAtTime(0.24, ctx.currentTime);

                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

                osc.connect(gain);

                gain.connect(ctx.destination);

                osc.start();

                osc.stop(ctx.currentTime + 0.12);

            } else if (type === "snap") {

                // Bunyi 'Kunci Kosmik' dwitone berkilau bila masukkan planet ke orbit

                const osc1 = ctx.createOscillator();

                const gain1 = ctx.createGain();

                osc1.type = "sine";

                osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5

                osc1.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.09); // E5

                gain1.gain.setValueAtTime(0.22, ctx.currentTime);

                gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

                osc1.connect(gain1);

                gain1.connect(ctx.destination);

                osc1.start();

                osc1.stop(ctx.currentTime + 0.18);



                const osc2 = ctx.createOscillator();

                const gain2 = ctx.createGain();

                osc2.type = "triangle";

                osc2.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6 sparkle

                gain2.gain.setValueAtTime(0.12, ctx.currentTime);

                gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

                osc2.connect(gain2);

                gain2.connect(ctx.destination);

                osc2.start();

                osc2.stop(ctx.currentTime + 0.12);

            } else if (type === "remove") {

                // Bunyi 'Swoosh Pop' lembut bila keluarkan planet dari orbit ke rak

                const osc = ctx.createOscillator();

                const gain = ctx.createGain();

                osc.type = "sine";

                osc.frequency.setValueAtTime(640, ctx.currentTime);

                osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1);

                gain.gain.setValueAtTime(0.2, ctx.currentTime);

                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

                osc.connect(gain);

                gain.connect(ctx.destination);

                osc.start();

                osc.stop(ctx.currentTime + 0.12);

            } else if (type === "launch") {

                // Bunyi 'Pelancaran Roket & Arpeggio Angkasa' bila tekan submit semakan

                const freqs = [392.00, 523.25, 659.25, 783.99, 1046.50];

                freqs.forEach((freq, idx) => {

                    const osc = ctx.createOscillator();

                    const gain = ctx.createGain();

                    osc.type = "triangle";

                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);

                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);

                    osc.connect(gain);

                    gain.connect(ctx.destination);

                    osc.start(ctx.currentTime + idx * 0.07);

                    osc.stop(ctx.currentTime + idx * 0.07 + 0.25);

                });

            } else if (type === "sparkle") {

                // Bunyi 'Kilauan Bintang' ceria 3 nada pantas

                const sparkles = [880, 1174.66, 1760];

                sparkles.forEach((freq, idx) => {

                    const osc = ctx.createOscillator();

                    const gain = ctx.createGain();

                    osc.type = "sine";

                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

                    gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.06);

                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);

                    osc.connect(gain);

                    gain.connect(ctx.destination);

                    osc.start(ctx.currentTime + idx * 0.06);

                    osc.stop(ctx.currentTime + idx * 0.06 + 0.2);

                });

            } else if (type === "tap") {

                // Bunyi 'Klik UI' moden dan lembut

                const osc = ctx.createOscillator();

                const gain = ctx.createGain();

                osc.type = "sine";

                osc.frequency.setValueAtTime(900, ctx.currentTime);

                osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.04);

                gain.gain.setValueAtTime(0.09, ctx.currentTime);

                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

                osc.connect(gain);

                gain.connect(ctx.destination);

                osc.start();

                osc.stop(ctx.currentTime + 0.04);

            } else if (type === "correct") {

                // Bunyi 'Ding-Ding' ceria dwitone kemenangan

                const notes = [659.25, 987.77, 1318.51];

                notes.forEach((freq, idx) => {

                    const osc = ctx.createOscillator();

                    const gain = ctx.createGain();

                    osc.type = "sine";

                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

                    gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);

                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);

                    osc.connect(gain);

                    gain.connect(ctx.destination);

                    osc.start(ctx.currentTime + idx * 0.1);

                    osc.stop(ctx.currentTime + idx * 0.1 + 0.3);

                });

            } else if (type === "wrong") {

                // Bunyi 'Boing' kartun lembut yang mesra

                const osc = ctx.createOscillator();

                const gain = ctx.createGain();

                osc.type = "sawtooth";

                osc.frequency.setValueAtTime(260, ctx.currentTime);

                osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.25);

                gain.gain.setValueAtTime(0.16, ctx.currentTime);

                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

                osc.connect(gain);

                gain.connect(ctx.destination);

                osc.start();

                osc.stop(ctx.currentTime + 0.28);

            } else if (type === "timeout") {

                const osc = ctx.createOscillator();

                const gain = ctx.createGain();

                osc.type = "triangle";

                osc.frequency.setValueAtTime(320, ctx.currentTime);

                osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);

                gain.gain.setValueAtTime(0.2, ctx.currentTime);

                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

                osc.connect(gain);

                gain.connect(ctx.destination);

                osc.start();

                osc.stop(ctx.currentTime + 0.35);

            } else if (type === "start") {

                const freqs = [440, 554.37, 659.25, 880];

                freqs.forEach((freq, idx) => {

                    const osc = ctx.createOscillator();

                    const gain = ctx.createGain();

                    osc.type = "sine";

                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);

                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.22);

                    osc.connect(gain);

                    gain.connect(ctx.destination);

                    osc.start(ctx.currentTime + idx * 0.08);

                    osc.stop(ctx.currentTime + idx * 0.08 + 0.22);

                });

            } else if (type === "victory") {

                const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

                notes.forEach((freq, idx) => {

                    const osc = ctx.createOscillator();

                    const gain = ctx.createGain();

                    osc.type = "triangle";

                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.11);

                    gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.11);

                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.11 + 0.4);

                    osc.connect(gain);

                    gain.connect(ctx.destination);

                    osc.start(ctx.currentTime + idx * 0.11);

                    osc.stop(ctx.currentTime + idx * 0.11 + 0.4);

                });

            }

        } catch {

            // Audio error silent fallback

        }

    };



    const moveToNextQuestion = () => {

        if (currentQuestionIndex < (currentTopic?.questions?.length || 0) - 1) {

            setCurrentQuestionIndex((prev) => prev + 1);

            setTimeLeft(20);

            setIsTimeOut(false);

            setShowScorePopup(false);

        } else {

            setCurrentQuestionIndex("finished");

            clearInterval(timerRef.current);

            playAudioFeedback("victory");

            // Muktamadkan Kuiz: Ambil markah tertinggi sahaja untuk XP (elak tambah berganda jika replay)
            setQuizTotalPoints((finalAttemptScore) => {
                setQuizHighScore((prevQuizHigh) => {
                    const nextQuizHigh = Math.max(prevQuizHigh, finalAttemptScore);
                    try {
                        localStorage.setItem("exploria_quiz_high_score", String(nextQuizHigh));
                    } catch {}

                    if (isLoggedIn) {
                        const nextXP = calculateTotalXP({
                            readTopics,
                            solarScore,
                            plantScore,
                            spellingScore,
                            mathScore,
                            quizHighScore: nextQuizHigh,
                        });
                        const nextLevel = getLevelFromXP(nextXP);
                        setStudentXP(nextXP);
                        setStudentLevel(nextLevel);
                        saveCurrentStudentStats({
                            quizHighScore: nextQuizHigh,
                            xp: nextXP,
                            level: nextLevel,
                        });
                        if (studentIC) {
                            saveStudentProfile(studentIC, {
                                skorKuiz: nextQuizHigh,
                                mataXP: nextXP,
                                tahap: nextLevel,
                            });
                        }
                    } else {
                        saveCurrentStudentStats({
                            quizHighScore: nextQuizHigh,
                        });
                    }

                    return nextQuizHigh;
                });
                return finalAttemptScore;
            });

            // Kira kelajuan purata respons kuiz
            setTimeout(() => {
                setQuestionRewards((rewards) => {
                    const rewardList = Object.values(rewards || {});
                    if (rewardList.length > 0) {
                        const totalSpent = rewardList.reduce((acc, r) => acc + (r.timeSpent || 0), 0);
                        const avg = (totalSpent / rewardList.length).toFixed(1);
                        setAverageQuizSpeed(avg);
                        if (isLoggedIn) {
                            saveCurrentStudentStats({ averageSpeed: avg });
                        }
                    }
                    return rewards;
                });
            }, 100);

        }

    };



    const handleTimeOut = () => {

        if (selectedAnswers[currentQuestionIndex] !== undefined) return;



        playAudioFeedback("timeout");

        setIsTimeOut(true);



        setQuestionRewards((prev) => ({

            ...prev,

            [currentQuestionIndex]: {

                isCorrect: false,

                pointsEarned: 0,

                basePoints: 0,

                speedBonus: 0,

                timeLeft: 0,

                timeSpent: 20

            }

        }));



        const updatedAnswers = {

            ...selectedAnswers,

            [currentQuestionIndex]: "__TIMEOUT__"

        };

        setSelectedAnswers(updatedAnswers);



        setTimeout(() => {

            moveToNextQuestion();

        }, 2200);

    };



    // 20-second timer logic

    useEffect(() => {

        if (currentView !== "quiz" || currentQuestionIndex === "finished") {

            if (timerRef.current) clearInterval(timerRef.current);

            return;

        }



        if (selectedAnswers[currentQuestionIndex] !== undefined) {

            if (timerRef.current) clearInterval(timerRef.current);

            return;

        }



        if (timerRef.current) clearInterval(timerRef.current);



        timerRef.current = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(timerRef.current);

                    handleTimeOut();

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);



        return () => {

            if (timerRef.current) clearInterval(timerRef.current);

        };

    }, [currentView, currentQuestionIndex, selectedAnswers]);



    const handleAnswerSelect = (option) => {
        if (!isLoggedIn) {
            triggerGuestNotice("kuiz");
            return;
        }
        if (selectedAnswers[currentQuestionIndex] !== undefined) return;



        if (timerRef.current) clearInterval(timerRef.current);



        const isCorrect = currentTopic?.questions?.[currentQuestionIndex]
            ? option === currentTopic.questions[currentQuestionIndex].correctAnswer
            : false;

        const currentRemaining = Math.max(0, timeLeft);

        const timeSpent = Math.max(1, 20 - currentRemaining);



        if (isCorrect) {

            // Formula skor kelajuan: Markah asas 100 + (masa baki × 10)

            const speedBonus = currentRemaining * 10;

            const pointsEarned = 100 + speedBonus;



            setScoreCount((prev) => prev + 1);

            setQuizTotalPoints((prev) => prev + pointsEarned);



            const rewardData = {

                isCorrect: true,

                pointsEarned,

                basePoints: 100,

                speedBonus,

                timeLeft: currentRemaining,

                timeSpent

            };

            setLastReward(rewardData);

            setQuestionRewards((prev) => ({

                ...prev,

                [currentQuestionIndex]: rewardData

            }));



            setShowScorePopup(true);

            playAudioFeedback("correct");

        } else {

            setQuestionRewards((prev) => ({

                ...prev,

                [currentQuestionIndex]: {

                    isCorrect: false,

                    pointsEarned: 0,

                    basePoints: 0,

                    speedBonus: 0,

                    timeLeft: currentRemaining,

                    timeSpent

                }

            }));

            playAudioFeedback("wrong");

        }



        const updatedAnswers = {

            ...selectedAnswers,

            [currentQuestionIndex]: option

        };

        setSelectedAnswers(updatedAnswers);



        setTimeout(() => {

            moveToNextQuestion();

        }, 1400);

    };



    const resetQuizState = () => {

        if (timerRef.current) clearInterval(timerRef.current);

        setCurrentQuestionIndex(0);

        setSelectedAnswers({});

        setScoreCount(0);

        setQuizTotalPoints(0);

        setQuestionRewards({});

        setLastReward(null);

        setTimeLeft(20);

        setIsTimeOut(false);

        setShowScorePopup(false);

    };



    const startQuizWithRules = (topicIndex) => {
        if (!isLoggedIn) {
            triggerGuestNotice("kuiz");
            return;
        }
        setSelectedTopicIndex(topicIndex);
        resetQuizState();
        setCurrentView("quizRules");
    };



    const startQuizConfirmed = () => {
        if (!isLoggedIn) {
            triggerGuestNotice("kuiz");
            return;
        }
        playAudioFeedback("start");
        resetQuizState();
        setCurrentView("quiz");
    };



    const resetSolarGame = () => {
        playAudioFeedback("sparkle");
        setPlacedPlanets({});
        setSelectedTrayPlanet(null);
        setSolarWrongSlot(null);
        setSolarFeedbackMessage(null);
        setIsSolarBoardFinished(false);
        setSolarBoardScore(0);
    };



    const handleDragStart = (e, planetId) => {
        if (!isLoggedIn) {
            triggerGuestNotice("aktiviti");
            return;
        }
        playAudioFeedback("pick");
        e.dataTransfer.setData("text/plain", planetId);
        setSelectedTrayPlanet(planetId);
    };



    const handleDropOnOrbit = (e, targetOrbit) => {
        e.preventDefault();
        if (!isLoggedIn) {
            triggerGuestNotice("aktiviti");
            return;
        }
        const planetId = e.dataTransfer.getData("text/plain") || selectedTrayPlanet;
        if (!planetId) return;
        attemptPlacePlanet(planetId, targetOrbit);
    };



    const handleSelectTrayPlanet = (planetId) => {
        if (!isLoggedIn) {
            triggerGuestNotice("aktiviti");
            return;
        }
        playAudioFeedback("pick");

        if (selectedTrayPlanet === planetId) {

            setSelectedTrayPlanet(null);

            setSolarFeedbackMessage(null);

        } else {

            setSelectedTrayPlanet(planetId);

            setSolarFeedbackMessage({

                type: "info",

                text: t(

                    "🪐 Satu planet telah dipilih! Sekarang klik bulatan orbit sasaran anda di atas untuk meletakkannya.",

                    "🪐 One planet selected! Now click your target orbit slot above to place it."

                )

            });

        }

    };



    const handleClickOrbitSlot = (targetOrbit) => {
        if (!isLoggedIn) {
            triggerGuestNotice("aktiviti");
            return;
        }
        if (selectedTrayPlanet) {

            attemptPlacePlanet(selectedTrayPlanet, targetOrbit);

            return;

        }



        const targetSlotPlanet = SOLAR_PLANETS.find(p => p.orbit === targetOrbit);

        const planetLabel = language === "en" ? (targetSlotPlanet?.englishName || targetSlotPlanet?.name) : targetSlotPlanet?.name;

        if (placedPlanets[targetOrbit]) {

            setSolarFeedbackMessage({

                type: "info",

                text: language === "en"

                    ? `Orbit '${planetLabel}' is filled. Tap '✕' on the planet to remove it.`

                    : `Orbit '${planetLabel}' telah diisi. Anda boleh tekan ikon '✕' pada planet untuk mengeluarkannya semula.`

            });

            return;

        }



        setSolarFeedbackMessage({

            type: "info",

            text: language === "en"

                ? `This orbit is for '${planetLabel}'. Select a planet from the tray below and click here to place it!`

                : `Orbit ini untuk planet '${planetLabel}'. Pilih satu planet dari rak di bawah dan klik sini untuk meletakkannya!`

        });

    };



    const attemptPlacePlanet = (planetId, targetOrbit) => {

        const planet = SOLAR_PLANETS.find(p => p.id === planetId);

        const targetSlotPlanet = SOLAR_PLANETS.find(p => p.orbit === targetOrbit);

        if (!planet || !targetSlotPlanet) return;



        // Clone current placements and remove planetId if it was already in another slot

        const updated = { ...placedPlanets };

        Object.keys(updated).forEach(slotKey => {

            if (updated[slotKey] === planetId) {

                delete updated[slotKey];

            }

        });



        // Place into targetOrbit neutrally without revealing score or right/wrong

        updated[targetOrbit] = planetId;

        setPlacedPlanets(updated);

        setSelectedTrayPlanet(null);



        playAudioFeedback("snap");



        const targetName = language === "en" ? (targetSlotPlanet.englishName || targetSlotPlanet.name) : targetSlotPlanet.name;

        const placedCount = Object.keys(updated).length;

        if (placedCount === 8) {

            setSolarFeedbackMessage({

                type: "success",

                text: t(

                    "🎉 Kesemua 8 orbit telah diisi! Tekan butang 'Hantar & Semak Keputusan' di bawah untuk semakan markah dan jawapan sebenar.",

                    "🎉 All 8 orbits are filled! Press the 'Submit & Review Answers' button below to see your score and correct answers."

                )

            });

        } else {

            setSolarFeedbackMessage({

                type: "info",

                text: language === "en"

                    ? `🪐 Planet placed into orbit '${targetName}'. (${placedCount}/8 planets placed)`

                    : `🪐 Planet berjaya diletakkan pada orbit '${targetName}'. (${placedCount}/8 planet diletakkan)`

            });

        }

    };



    const removePlanetFromSlot = (targetOrbit) => {

        if (!placedPlanets[targetOrbit]) return;

        const updated = { ...placedPlanets };

        delete updated[targetOrbit];

        setPlacedPlanets(updated);



        playAudioFeedback("remove");

        setSolarFeedbackMessage({

            type: "info",

            text: t(

                "Planet telah dikeluarkan dan dikembalikan ke rak pilihan.",

                "Planet removed and returned to the selection tray."

            )

        });

    };



    const handleSubmitSolarGame = () => {

        playAudioFeedback("launch");

        let calculatedScore = 0;

        let correctCount = 0;

        SOLAR_PLANETS.forEach((planetInfo) => {

            const placedId = placedPlanets[planetInfo.orbit];

            if (placedId === planetInfo.id) {

                calculatedScore += 100;

                correctCount += 1;

            }

        });



        // 1. Paparkan keputusan pada papan permainan
        setSolarBoardScore(calculatedScore);
        setIsSolarBoardFinished(true);
        setSelectedTrayPlanet(null);
        setSolarFeedbackMessage(null);

        // 2. Simpan skor murid dalam profil secara kekal (ambil markah terbaik)
        const nextSolarScore = Math.max(solarScore, calculatedScore);
        setSolarScore(nextSolarScore);
        setSolarSubmitted(true);

        if (isLoggedIn) {
            const nextXP = calculateTotalXP({
                readTopics,
                solarScore: nextSolarScore,
                plantScore,
                spellingScore,
                mathScore,
                quizHighScore,
            });
            const nextLevel = getLevelFromXP(nextXP);
            setStudentXP(nextXP);
            setStudentLevel(nextLevel);
            saveCurrentStudentStats({
                solarScore: nextSolarScore,
                solarSubmitted: true,
                xp: nextXP,
                level: nextLevel,
            });
            if (studentIC) {
                saveStudentProfile(studentIC, {
                    skorSuria: nextSolarScore,
                    suriaSelesai: true,
                    mataXP: nextXP,
                    tahap: nextLevel,
                });
            }
        } else {
            saveCurrentStudentStats({
                solarScore: nextSolarScore,
                solarSubmitted: true,
            });
        }

        setTimeout(() => {

            if (correctCount === 8) {

                playAudioFeedback("victory");

            } else if (correctCount >= 5) {

                playAudioFeedback("correct");

            } else {

                playAudioFeedback("timeout");

            }

        }, 400);

    };

    const handleSubmitPlantGame = (score = 800) => {
        playAudioFeedback("victory");
        const nextPlantScore = Math.max(plantScore, score);
        setPlantScore(nextPlantScore);
        setPlantSubmitted(true);

        if (isLoggedIn) {
            const nextXP = calculateTotalXP({
                readTopics,
                solarScore,
                plantScore: nextPlantScore,
                spellingScore,
                mathScore,
                quizHighScore,
            });
            const nextLevel = getLevelFromXP(nextXP);
            setStudentXP(nextXP);
            setStudentLevel(nextLevel);
            saveCurrentStudentStats({
                plantScore: nextPlantScore,
                plantSubmitted: true,
                xp: nextXP,
                level: nextLevel,
            });
            if (studentIC) {
                saveStudentProfile(studentIC, {
                    skorTumbuhan: nextPlantScore,
                    tumbuhanSelesai: true,
                    mataXP: nextXP,
                    tahap: nextLevel,
                });
            }
        } else {
            saveCurrentStudentStats({
                plantScore: nextPlantScore,
                plantSubmitted: true,
            });
        }
    };

    const resetPlantGame = () => {
        playAudioFeedback("tap");
    };

    const handleSubmitSpellingBee = (score = 0) => {
        playAudioFeedback("victory");
        const nextSpellingScore = Math.max(spellingScore, score);
        setSpellingScore(nextSpellingScore);
        setSpellingSubmitted(true);

        if (isLoggedIn) {
            const nextXP = calculateTotalXP({
                readTopics,
                solarScore,
                plantScore,
                spellingScore: nextSpellingScore,
                mathScore,
                quizHighScore,
            });
            const nextLevel = getLevelFromXP(nextXP);
            setStudentXP(nextXP);
            setStudentLevel(nextLevel);
            saveCurrentStudentStats({
                spellingScore: nextSpellingScore,
                spellingSubmitted: true,
                xp: nextXP,
                level: nextLevel,
            });
            if (studentIC) {
                saveStudentProfile(studentIC, {
                    skorSpelling: nextSpellingScore,
                    spellingSelesai: true,
                    mataXP: nextXP,
                    tahap: nextLevel,
                });
            }
        } else {
            saveCurrentStudentStats({
                spellingScore: nextSpellingScore,
                spellingSubmitted: true,
            });
        }
    };

    const handleSubmitMathQuiz = (score = 0) => {
        playAudioFeedback("victory");
        const nextMathScore = Math.max(mathScore, score);
        setMathScore(nextMathScore);
        setMathSubmitted(true);

        if (isLoggedIn) {
            const nextXP = calculateTotalXP({
                readTopics,
                solarScore,
                plantScore,
                spellingScore,
                mathScore: nextMathScore,
                quizHighScore,
            });
            const nextLevel = getLevelFromXP(nextXP);
            setStudentXP(nextXP);
            setStudentLevel(nextLevel);
            saveCurrentStudentStats({
                mathScore: nextMathScore,
                mathSubmitted: true,
                xp: nextXP,
                level: nextLevel,
            });
            if (studentIC) {
                saveStudentProfile(studentIC, {
                    skorSifir: nextMathScore,
                    sifirSelesai: true,
                    mataXP: nextXP,
                    tahap: nextLevel,
                });
            }
        } else {
            saveCurrentStudentStats({
                mathScore: nextMathScore,
                mathSubmitted: true,
            });
        }
    };







    if (!isMounted) {
        return (
            <div
                className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4 select-none"
                style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    background: "url('/paper-bg.jpg') top center / cover no-repeat fixed"
                }}
            >
                <div className="flex flex-col items-center gap-3 animate-pulse">
                    <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg border border-slate-300 text-sky-600">
                        🚀
                    </div>
                    <div className="text-xl font-black tracking-wide text-slate-800 drop-shadow-sm">EXPLORIA STEM</div>
                    <div className="text-xs text-slate-600 font-bold">Memuatkan portal penjelajahan...</div>
                </div>
            </div>
        );
    }

    if (currentView === "login") {
        return (
            <LoginPage
                onNavigate={handleNavigate}
                onContinueAsGuest={handleContinueAsGuest}
                onSuccess={(data) => handleAuthSuccess(data, false)}
            />
        );
    }

    if (currentView === "register") {
        return (
            <RegisterPage
                onNavigate={handleNavigate}
                onContinueAsGuest={handleContinueAsGuest}
                onSuccess={(data) => handleAuthSuccess(data, true)}
            />
        );
    }

    return (

        <div

            className="min-h-screen text-slate-800 flex flex-col relative overflow-x-hidden transition-all duration-700 select-none"

            style={{

                fontFamily: 'system-ui, -apple-system, sans-serif',

                background: getBackgroundStyle()

            }}

        >



            {/* AMBIENT GLOW BLOOMS (PANTULAN CAHAYA LEMBUT) */}

            <div className="absolute top-6 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

            <div className="absolute top-1/2 right-8 w-80 sm:w-96 h-80 sm:h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

            <div className="absolute bottom-6 left-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-pink-200/10 rounded-full blur-3xl pointer-events-none transition-all duration-700" />



            {/* Custom Embedded CSS Animation Styles */}

            <style>{`

                @keyframes fadeInUp {

                    from { opacity: 0; transform: translateY(12px); }

                    to { opacity: 1; transform: translateY(0); }

                }

                @keyframes pulseUrgent {

                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }

                    50% { transform: scale(1.05); box-shadow: 0 0 16px 4px rgba(239, 68, 68, 0.45); }

                }

                @keyframes shimmerEffect {

                    0% { transform: translateX(-100%); }

                    100% { transform: translateX(200%); }

                }

                @keyframes floatGentle {

                    0%, 100% { transform: translateY(0); }

                    50% { transform: translateY(-6px); }

                }

                @keyframes floatSlow {

                    0%, 100% { transform: translateY(0px) rotate(0deg); }

                    50% { transform: translateY(-10px) rotate(3deg); }

                }

                @keyframes shake {

                    0%, 100% { transform: translateX(0); }

                    20%, 60% { transform: translateX(-6px); }

                    40%, 80% { transform: translateX(6px); }

                }

                @keyframes popCheck {

                    0% { transform: scale(0.5); opacity: 0; }

                    70% { transform: scale(1.2); }

                    100% { transform: scale(1); opacity: 1; }

                }

                @keyframes scoreFloatUp {

                    0% { opacity: 0; transform: translateY(10px) scale(0.8); }

                    20% { opacity: 1; transform: translateY(0) scale(1.1); }

                    80% { opacity: 1; transform: translateY(-8px) scale(1); }

                    100% { opacity: 0; transform: translateY(-20px) scale(0.9); }

                }

                @keyframes confettiShower {

                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }

                    100% { transform: translateY(300px) rotate(720deg); opacity: 0; }

                }



                .anim-fade-in { animation: fadeInUp 0.35s ease-out forwards; }

                .anim-pulse-urgent { animation: pulseUrgent 1s infinite ease-in-out; }

                .anim-shake { animation: shake 0.4s ease-in-out; }

                .anim-pop { animation: popCheck 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

                .anim-float { animation: floatGentle 3s ease-in-out infinite; }

                .anim-float-slow { animation: floatSlow 5s ease-in-out infinite; }

                .anim-score-popup { animation: scoreFloatUp 1.2s ease-out forwards; }



                /* 3D TACTILE BUTTONS */

                .btn-3d-pink {

                    background: linear-gradient(180deg, #ff2a7a 0%, #e91e63 100%);

                    box-shadow: 0 6px 0 #ad1457, 0 12px 20px -3px rgba(233, 30, 99, 0.45);

                    transition: all 0.15s ease;

                }

                .btn-3d-pink:hover {

                    transform: translateY(2px);

                    box-shadow: 0 4px 0 #ad1457, 0 8px 15px -3px rgba(233, 30, 99, 0.4);

                }

                .btn-3d-pink:active {

                    transform: translateY(6px);

                    box-shadow: 0 0 0 #ad1457, 0 2px 4px rgba(233, 30, 99, 0.3);

                }



                .btn-3d-blue {

                    background: linear-gradient(180deg, #00b4d8 0%, #0099e5 100%);

                    box-shadow: 0 5px 0 #0077b6, 0 10px 15px -3px rgba(0, 153, 229, 0.35);

                    transition: all 0.15s ease;

                }

                .btn-3d-blue:hover {

                    transform: translateY(2px);

                    box-shadow: 0 3px 0 #0077b6, 0 6px 10px -3px rgba(0, 153, 229, 0.3);

                }

                .btn-3d-blue:active {

                    transform: translateY(5px);

                    box-shadow: 0 0 0 #0077b6;

                }



                .btn-3d-orange {

                    background: linear-gradient(180deg, #ffa726 0%, #fb8c00 100%);

                    box-shadow: 0 5px 0 #e65100, 0 10px 15px -3px rgba(251, 140, 0, 0.35);

                    transition: all 0.15s ease;

                }

                .btn-3d-orange:hover {

                    transform: translateY(2px);

                    box-shadow: 0 3px 0 #e65100, 0 6px 10px -3px rgba(251, 140, 0, 0.3);

                }

                .btn-3d-orange:active {

                    transform: translateY(5px);

                    box-shadow: 0 0 0 #e65100;

                }

                .btn-3d-emerald {

                    background: linear-gradient(180deg, #10b981 0%, #059669 100%);

                    box-shadow: 0 5px 0 #047857, 0 10px 15px -3px rgba(16, 185, 129, 0.35);

                    transition: all 0.15s ease;

                }

                .btn-3d-emerald:hover {

                    transform: translateY(2px);

                    box-shadow: 0 3px 0 #047857, 0 6px 10px -3px rgba(16, 185, 129, 0.3);

                }

                .btn-3d-emerald:active {

                    transform: translateY(5px);

                    box-shadow: 0 0 0 #047857;

                }



                .btn-3d-white {

                    background: #ffffff;

                    box-shadow: 0 4px 0 #cbd5e1;

                    transition: all 0.15s ease;

                }

                .btn-3d-white:hover {

                    transform: translateY(2px);

                    box-shadow: 0 2px 0 #cbd5e1;

                }

                .btn-3d-white:active {

                    transform: translateY(4px);

                    box-shadow: 0 0 0 #cbd5e1;

                }



                .shimmer-bar {

                    position: absolute;

                    top: 0;

                    left: 0;

                    width: 50%;

                    height: 100%;

                    transform: skewX(-25deg);

                    animation: shimmerEffect 2.8s infinite;

                }

                .no-scrollbar::-webkit-scrollbar { display: none; }

                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

            `}</style>



            {/* =========================================================================

                PANEL NAVIGASI ATAS (TOP NAVBAR / TOP PANEL) - REKA BENTUK COMMON & STANDARD

               ========================================================================= */}

            <nav
                className="sticky top-0 z-50 w-full text-white border-b-2 border-indigo-400/30 shadow-[0_4px_25px_rgba(20,20,60,0.22)] select-none"
                style={{
                    background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                }}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">

                    {/* KIRI: BRANDING & LOGO EXPLORIA */}
                    <div
                        onClick={() => { playAudioFeedback("tap"); setCurrentView("menu"); }}
                        className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
                    >
                        <img
                            src="/logoexploria.png"
                            alt="Logo Exploria"
                            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                        />
                        <div className="hidden min-[440px]:block text-left">
                            <span className="font-black text-white text-sm sm:text-base tracking-tight leading-tight flex items-center gap-1 drop-shadow-sm">
                                Exploria <span className="text-amber-300">STEM</span>
                            </span>
                            <span className="text-[10px] font-bold text-sky-100/90 uppercase tracking-wider block">
                                {t("Portal Pembelajaran Murid", "Student Learning Portal")}
                            </span>
                        </div>
                    </div>

                    {/* TENGAH: TAB NAVIGASI UTAMA (COMMON DESIGN - DESKTOP & TABLET) */}
                    <div className="hidden md:flex items-center gap-1 bg-black/20 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-inner">
                        {/* Tab 1: Menu Utama */}
                        <button
                            onClick={() => { playAudioFeedback("tap"); setCurrentView("menu"); }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${currentView === "menu"
                                ? "bg-white text-blue-900 shadow-sm"
                                : "text-white/85 hover:text-white hover:bg-white/15"
                                }`}
                        >
                            <span>🏠</span>
                            <span>{t("Utama", "Home")}</span>
                        </button>

                        {/* Tab 3: Pembelajaran */}
                        <button
                            onClick={() => { playAudioFeedback("tap"); setCurrentView("learningList"); }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${currentView === "learningList" || currentView === "learningDetail"
                                ? "bg-white text-blue-900 shadow-sm"
                                : "text-white/85 hover:text-white hover:bg-white/15"
                                }`}
                        >
                            <span>📖</span>
                            <span>{t("Nota Sains", "Science Notes")}</span>
                        </button>

                        {/* Tab 4: Kuiz Pantas */}
                        <button
                            onClick={() => { playAudioFeedback("tap"); setCurrentView("quizList"); }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${currentView === "quizList" || currentView === "quizRules" || currentView === "quiz"
                                ? "bg-white text-blue-900 shadow-sm"
                                : "text-white/85 hover:text-white hover:bg-white/15"
                                }`}
                        >
                            <span>⚡</span>
                            <span>{t("Kuiz 20s", "20s Quiz")}</span>
                        </button>

                        {/* Tab 5: Pusat Aktiviti */}
                        <button
                            onClick={() => { playAudioFeedback("tap"); setCurrentView("activityList"); }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${currentView === "activityList" || currentView === "solarDragDrop" || currentView === "plantActivity" || currentView === "spellingBee" || currentView === "mathQuiz"
                                ? "bg-white text-blue-900 shadow-sm"
                                : "text-white/85 hover:text-white hover:bg-white/15"
                                }`}
                        >
                            <span>🎮</span>
                            <span>{t("Aktiviti", "Activities")}</span>
                        </button>
                    </div>

                    {/* KANAN: PILIHAN BAHASA, TEMA & STATUS PELAJAR */}
                    <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                        {/* TOGGLE PILIHAN BAHASA (BM / EN) */}
                        <LanguageToggle language={language} onToggle={toggleLanguage} variant="dark" />

                        {/* Profile Chip / Trigger Button & Log Masuk */}
                        {isLoggedIn ? (
                            <button
                                onClick={() => { playAudioFeedback("sparkle"); setCurrentView("profile"); }}
                                className={`flex items-center gap-2 border-2 py-1 px-2 sm:px-3 rounded-2xl shadow-xs cursor-pointer transition-all active:scale-95 group shrink-0 ${currentView === "profile" || currentView === "dashboard"
                                    ? "bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300"
                                    : "bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md"
                                    }`}
                                title={t("Buka Profil Murid", "Open Student Profile")}
                            >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-[#0099e5] p-0.5 shadow-xs shrink-0">
                                    <div className="w-full h-full bg-slate-900 rounded-[0.6rem] flex items-center justify-center text-sm">
                                        🤖
                                    </div>
                                </div>
                                <div className="text-left leading-tight hidden min-[520px]:block">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`text-xs font-black ${currentView === "profile" || currentView === "dashboard" ? "text-slate-950" : "text-white"}`}>{studentName || "Penjelajah"}</span>
                                        <span className="text-[9px] font-black uppercase bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-md">
                                            {t("Tahap", "Lv.")} {studentLevel}
                                        </span>
                                    </div>
                                    <span className={`text-[10px] font-bold block ${currentView === "profile" || currentView === "dashboard" ? "text-slate-800" : "text-sky-100"}`}>
                                        {studentXP.toLocaleString()} XP • 🔥 {studentStreak}{t("h", "d")}
                                    </span>
                                </div>
                                <span className="text-xs text-white/80 group-hover:text-white transition-colors hidden sm:inline">
                                    👤
                                </span>
                            </button>
                        ) : (
                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                <button
                                    onClick={() => { playAudioFeedback("tap"); setCurrentView("login"); }}
                                    className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                                    title={t("Log Masuk Murid", "Student Login")}
                                >
                                    <span>🔑</span>
                                    <span>{t("Log Masuk", "Login")}</span>
                                </button>
                                <button
                                    onClick={() => { playAudioFeedback("tap"); setCurrentView("profile"); }}
                                    className={`flex items-center gap-2 border-2 py-1 px-2 sm:px-3 rounded-2xl shadow-xs cursor-pointer transition-all active:scale-95 group shrink-0 ${currentView === "profile" || currentView === "dashboard"
                                        ? "bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300"
                                        : "bg-white/15 hover:bg-white/25 text-white border-white/25 backdrop-blur-md"
                                        }`}
                                    title={t("Buka Profil Tetamu", "Open Guest Profile")}
                                >
                                    <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-sm shadow-xs text-white shrink-0">
                                        👤
                                    </div>
                                    <div className="text-left leading-tight hidden min-[520px]:block">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-xs font-black ${currentView === "profile" || currentView === "dashboard" ? "text-slate-950" : "text-white"}`}>{t("Profil", "Profile")}</span>
                                            <span className="text-[9px] font-black uppercase bg-white/30 text-white px-1.5 py-0.2 rounded-md">
                                                {t("Tetamu", "Guest")}
                                            </span>
                                        </div>
                                        <span className={`text-[10px] font-semibold block ${currentView === "profile" || currentView === "dashboard" ? "text-slate-800" : "text-sky-100"}`}>
                                            {t("Ketik utk Profil", "Tap for Profile")}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                {/* SUB-NAVIGASI UNTUK PERANTI MUDAH ALIH (MOBILE HORIZONTAL SCROLL) */}
                <div className="md:hidden border-t border-white/15 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-black/20 backdrop-blur-md">
                    <button
                        onClick={() => { playAudioFeedback("tap"); setCurrentView("menu"); }}
                        className={`px-3 py-1 rounded-xl text-xs font-black whitespace-nowrap flex items-center gap-1 ${currentView === "menu" ? "bg-white text-blue-900 shadow-xs" : "bg-white/15 text-white border border-white/20"
                            }`}
                    >
                        🏠 {t("Utama", "Home")}
                    </button>

                    <button
                        onClick={() => { playAudioFeedback("tap"); setCurrentView("learningList"); }}
                        className={`px-3 py-1 rounded-xl text-xs font-black whitespace-nowrap flex items-center gap-1 ${currentView === "learningList" || currentView === "learningDetail" ? "bg-white text-blue-900 shadow-xs" : "bg-white/15 text-white border border-white/20"
                            }`}
                    >
                        📖 {t("Nota", "Notes")}
                    </button>

                    <button
                        onClick={() => { playAudioFeedback("tap"); setCurrentView("quizList"); }}
                        className={`px-3 py-1 rounded-xl text-xs font-black whitespace-nowrap flex items-center gap-1 ${currentView === "quizList" || currentView === "quiz" ? "bg-white text-blue-900 shadow-xs" : "bg-white/15 text-white border border-white/20"
                            }`}
                    >
                        ⚡ {t("Kuiz", "Quiz")}
                    </button>

                    <button
                        onClick={() => { playAudioFeedback("tap"); setCurrentView("activityList"); }}
                        className={`px-3 py-1 rounded-xl text-xs font-black whitespace-nowrap flex items-center gap-1 ${currentView === "activityList" || currentView === "solarDragDrop" || currentView === "plantActivity" || currentView === "spellingBee" || currentView === "mathQuiz" ? "bg-white text-blue-900 shadow-xs" : "bg-white/15 text-white border border-white/20"
                            }`}
                    >
                        🎮 {t("Aktiviti", "Activities")}
                    </button>
                </div>

            </nav>



            {/* KANDUNGAN UTAMA (MAIN CONTAINER) */}

            <main className="flex-1 w-full py-5 sm:py-8 px-3 sm:px-6 flex flex-col items-center justify-start relative z-10">



                {/* FLOATING AMBIENT BACKGROUND PARTICLES */}

                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">

                    <div className="absolute top-12 left-10 anim-float-slow opacity-75 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(0,100,200,0.25)]">

                        <GraphicSaturnPlanet className="w-14 h-14" />

                    </div>

                    <div className="absolute top-24 right-12 anim-float opacity-75 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(0,150,100,0.25)]">

                        <GraphicNatureLeaf className="w-12 h-12" />

                    </div>

                    <div className="absolute bottom-20 left-12 anim-float opacity-70 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(0,120,200,0.25)]">

                        <GraphicScienceBook className="w-14 h-14" />

                    </div>

                    <div className="absolute bottom-16 right-10 anim-float-slow opacity-75 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(200,100,0,0.25)]">

                        <GraphicRocketLaunch className="w-12 h-12" />

                    </div>

                </div>



                {/* LOGO BESAR HANYA KETIKA MENU UTAMA */}

                {currentView === "menu" && (

                    <div className="mb-4 sm:mb-6 text-center relative flex items-center justify-center anim-fade-in">

                        <div

                            className="absolute w-72 sm:w-96 h-20 sm:h-28 bg-gradient-to-r from-sky-300/50 via-yellow-200/50 to-pink-300/50 rounded-full blur-2xl pointer-events-none"

                            aria-hidden="true"

                        />

                        <img

                            src="/logoexploria.png"

                            alt="Logo Exploria"

                            className="relative z-10 h-20 sm:h-28 mx-auto object-contain select-none transition-all duration-300"

                            style={{

                                filter: 'drop-shadow(0 4px 14px rgba(0, 153, 229, 0.45)) drop-shadow(0 0 24px rgba(255, 204, 0, 0.55)) drop-shadow(0 10px 25px rgba(0, 80, 160, 0.2))'

                            }}

                        />

                    </div>

                )}



                {/* KOTAK UTAMA (PAD) DENGAN TEMA WARNA LOGO EXPLORIA & BAYANG CERAH */}

                <div className={`w-full bg-white rounded-[1.75rem] sm:rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,120,215,0.25)] overflow-hidden border-2 sm:border-4 border-[#0099e5]/30 text-center transition-all duration-300 relative z-10 ${currentView === "solarDragDrop" || currentView === "dashboard" || currentView === "profile" || currentView === "authGateway" ? "max-w-4xl sm:max-w-5xl" : "max-w-3xl"}`}>



                    {/* Header dengan warna Biru Khas Logo Exploria (Responsif tanpa perlanggaran butang pada skrin kecil) */}

                    <div
                        className={`p-4 sm:p-8 text-white relative shadow-md flex flex-col items-center justify-center ${currentView !== "menu" ? "pt-14 sm:pt-8" : "pt-8"}`}
                        style={{
                            background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                        }}
                    >



                        {/* BUTTON MENU UTAMA: HANYA GRAFIK HOME SAHAJA (ICON BUTTON) */}

                        {currentView !== "menu" && (

                            <div className="absolute left-3 top-3 sm:left-8 sm:top-8 z-20">

                                <button

                                    onClick={() => { playAudioFeedback("tap"); setCurrentView("menu"); resetQuizState(); resetSolarGame(); }}

                                    title={t("Menu Utama", "Main Menu")}

                                    aria-label={t("Menu Utama", "Main Menu")}

                                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/35 active:scale-90 text-white rounded-2xl transition-all flex items-center justify-center cursor-pointer backdrop-blur-md shadow-md border-2 border-white/35 hover:border-white/60 group"

                                >

                                    <div className="group-hover:scale-115 transition-transform duration-200">

                                        <GraphicHomeButton className="w-5 h-5 sm:w-7 sm:h-7" />

                                    </div>

                                </button>

                            </div>

                        )}



                        <span className="bg-[#ffcc00] text-slate-950 text-[11px] sm:text-xs font-black px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-sm inline-flex items-center gap-1.5 mb-2">

                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />

                            {t("Portal STEM Eksklusif", "Exclusive STEM Portal")}

                        </span>

                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-sm px-2 text-balance leading-tight">

                            {courseData.courseTitle}

                        </h1>

                    </div>



                    <div className="p-3.5 sm:p-7 md:p-10 bg-white flex flex-col items-center justify-center">

                        {/* PAPARAN 1: MENU UTAMA */}
                        {currentView === "menu" && (
                            <MainMenu
                                onNavigate={handleNavigate}
                                t={t}
                                playAudioFeedback={playAudioFeedback}
                                studentName={studentName}
                                isLoggedIn={isLoggedIn}
                                studentLevel={studentLevel}
                                studentXP={studentXP}
                                studentStreak={studentStreak}
                                unlockedBadgesCount={1}
                            />
                        )}

                        {/* PAPARAN 2 & 4: PEMBELAJARAN (SENARAI & DETAIL NOTA) */}
                        {(currentView === "learningList" || currentView === "learningDetail") && (
                            <LearningView
                                currentView={currentView}
                                courseData={courseData}
                                selectedTopicIndex={selectedTopicIndex}
                                setSelectedTopicIndex={handleSelectTopic}
                                onNavigate={handleNavigate}
                                onStartQuiz={startQuizWithRules}
                                resetQuizState={resetQuizState}
                                t={t}
                                language={language}
                                playAudioFeedback={playAudioFeedback}
                            />
                        )}

                        {/* PAPARAN 3, 5, 6: KUIZ (SENARAI, PERATURAN & KUIZ AKTIF/KEPUTUSAN) */}
                        {(currentView === "quizList" || currentView === "quizRules" || currentView === "quiz") && (
                            <QuizView
                                currentView={currentView}
                                courseData={courseData}
                                selectedTopicIndex={selectedTopicIndex}
                                currentQuestionIndex={currentQuestionIndex}
                                selectedAnswers={selectedAnswers}
                                scoreCount={scoreCount}
                                quizTotalPoints={quizTotalPoints}
                                timeLeft={timeLeft}
                                isTimeOut={isTimeOut}
                                showScorePopup={showScorePopup}
                                lastReward={lastReward}
                                questionRewards={questionRewards}
                                onSelectTopic={startQuizWithRules}
                                onStartQuiz={startQuizConfirmed}
                                onAnswerSelect={handleAnswerSelect}
                                onResetQuiz={resetQuizState}
                                onNavigate={handleNavigate}
                                t={t}
                                playAudioFeedback={playAudioFeedback}
                            />
                        )}

                        {/* PAPARAN: AKTIVITI (SENARAI & PERMAINAN DRAG & DROP SISTEM SURIA) */}
                        {(currentView === "activityList" || currentView === "solarDragDrop") && (
                            <SolarActivityView
                                currentView={currentView}
                                placedPlanets={placedPlanets}
                                selectedTrayPlanet={selectedTrayPlanet}
                                solarScore={isSolarBoardFinished ? solarBoardScore : solarScore}
                                solarWrongSlot={solarWrongSlot}
                                solarFeedbackMessage={solarFeedbackMessage}
                                setSolarFeedbackMessage={setSolarFeedbackMessage}
                                solarSubmitted={isSolarBoardFinished}
                                onSelectTrayPlanet={handleSelectTrayPlanet}
                                onDropOnOrbit={handleDropOnOrbit}
                                onClickOrbitSlot={handleClickOrbitSlot}
                                onRemovePlanetFromSlot={removePlanetFromSlot}
                                onDragStart={handleDragStart}
                                onSubmitSolarGame={handleSubmitSolarGame}
                                onResetSolarGame={resetSolarGame}
                                onNavigate={handleNavigate}
                                isLoggedIn={isLoggedIn}
                                onBlockedAction={() => triggerGuestNotice("aktiviti")}
                                t={t}
                                language={language}
                                playAudioFeedback={playAudioFeedback}
                            />
                        )}

                        {/* PAPARAN: AKTIVITI TUMBUH-TUMBUHAN & FOTOSINTESIS (BARU!) */}
                        {currentView === "plantActivity" && (
                            <PlantActivityView
                                plantScore={plantScore}
                                plantSubmitted={plantSubmitted}
                                onSubmitPlantGame={handleSubmitPlantGame}
                                onResetPlantGame={resetPlantGame}
                                onNavigate={handleNavigate}
                                t={t}
                                language={language}
                                playAudioFeedback={playAudioFeedback}
                                isLoggedIn={isLoggedIn}
                                onBlockedAction={() => triggerGuestNotice("aktiviti")}
                            />
                        )}

                        {/* PAPARAN: CABARAN SPELLING BEE STEM (BARU & INTERAKTIF!) */}
                        {currentView === "spellingBee" && (
                            <SpellingBeeActivity
                                onNavigate={handleNavigate}
                                onSubmitSpellingBee={handleSubmitSpellingBee}
                                spellingScore={spellingScore}
                                spellingSubmitted={spellingSubmitted}
                                isLoggedIn={isLoggedIn}
                                onBlockedAction={() => triggerGuestNotice("aktiviti")}
                                playAudioFeedback={playAudioFeedback}
                                t={t}
                                language={language}
                            />
                        )}

                        {/* PAPARAN: CABARAN PERTANDINGAN SIFIR KILAT (BARU & INTERAKTIF!) */}
                        {currentView === "mathQuiz" && (
                            <MathSpeedQuiz
                                onNavigate={handleNavigate}
                                onSubmitMathQuiz={handleSubmitMathQuiz}
                                mathScore={mathScore}
                                mathSubmitted={mathSubmitted}
                                isLoggedIn={isLoggedIn}
                                onBlockedAction={() => triggerGuestNotice("aktiviti")}
                                playAudioFeedback={playAudioFeedback}
                                t={t}
                                language={language}
                            />
                        )}

                        {/* PAPARAN: PROFIL & PRESTASI STEM PELAJAR */}
                        {(currentView === "profile" || currentView === "dashboard") && (
                            <DashboardView
                                studentName={studentName}
                                setStudentName={setStudentName}
                                isEditingName={isEditingName}
                                setIsEditingName={setIsEditingName}
                                tempStudentName={tempStudentName}
                                setTempStudentName={setTempStudentName}
                                dashboardActiveTab={dashboardActiveTab}
                                setDashboardActiveTab={setDashboardActiveTab}
                                selectedBadgeModal={selectedBadgeModal}
                                setSelectedBadgeModal={setSelectedBadgeModal}
                                quizHighScore={quizHighScore}
                                quizTotalPoints={quizTotalPoints}
                                scoreCount={scoreCount}
                                solarScore={solarScore}
                                solarSubmitted={solarSubmitted}
                                plantScore={plantScore}
                                plantSubmitted={plantSubmitted}
                                spellingScore={spellingScore}
                                spellingSubmitted={spellingSubmitted}
                                mathScore={mathScore}
                                mathSubmitted={mathSubmitted}
                                studentIC={studentIC}
                                studentLevel={studentLevel}
                                studentXP={studentXP}
                                studentStreak={studentStreak}
                                readTopics={readTopics}
                                averageQuizSpeed={averageQuizSpeed}
                                onNavigate={handleNavigate}
                                t={t}
                                playAudioFeedback={playAudioFeedback}
                                isLoggedIn={isLoggedIn}
                                onLogout={handleLogout}
                            />
                        )}

                        {/* PAPARAN: PENDAFTARAN PENJELAJAH BAHARU */}
                        {currentView === "register" && (
                            <RegisterPage
                                onNavigate={setCurrentView}
                                onContinueAsGuest={handleContinueAsGuest}
                                onSuccess={(data) => handleAuthSuccess(data, true)}
                            />
                        )}

                        {/* PAPARAN: 3 PILIHAN AKSES (LOG MASUK, DAFTAR, TETAMU) */}
                        {currentView === "authGateway" && (
                            <AuthGatewayView
                                onNavigate={setCurrentView}
                                onContinueAsGuest={handleContinueAsGuest}
                                t={t}
                                playAudioFeedback={playAudioFeedback}
                            />
                        )}

                        {/* PAPARAN: LOG MASUK PENJELAJAH */}
                        {currentView === "login" && (
                            <LoginPage
                                onNavigate={setCurrentView}
                                onContinueAsGuest={handleContinueAsGuest}
                                onSuccess={(data) => handleAuthSuccess(data, false)}
                            />
                        )}

                    </div>
                </div>
            {/* POPUP NOTIS UNTUK TETAMU (LOG MASUK / DAFTAR DIPERLUKAN) */}
            {showGuestAuthModal && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 anim-fade-in select-none"
                    onClick={() => setShowGuestAuthModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-[2.2rem] max-w-md w-full p-6 sm:p-7 shadow-2xl border-4 border-amber-400 text-center relative overflow-hidden anim-pop"
                    >
                        {/* Ambient Glows */}
                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-400/25 rounded-full blur-2xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => { playAudioFeedback("tap"); setShowGuestAuthModal(false); }}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-black cursor-pointer transition-all"
                            title="Tutup"
                        >
                            ✕
                        </button>

                        {/* Mascot Robot & Lock Frame */}
                        <div className="mx-auto w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 p-1 shadow-xl shadow-amber-500/25 anim-float relative mt-1">
                            <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center text-4xl border-2 border-white/40">
                                🤖
                            </div>
                            <span className="absolute -bottom-2 -right-2 bg-rose-500 text-white text-sm w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                                🔒
                            </span>
                        </div>

                        {/* Title & Badge */}
                        <div className="mt-4">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
                                Akses Terhad • Mod Tetamu
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                                {guestModalContext === "kuiz"
                                    ? "Log Masuk untuk Jawab Kuiz!"
                                    : "Log Masuk untuk Main Aktiviti!"}
                            </h3>
                            <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed px-1">
                                {guestModalContext === "kuiz"
                                    ? "Mod tetamu hanya dibenarkan membaca nota. Untuk menjawab soalan Kuiz Pantas 20s, mengumpul markah kelajuan dan membuka lencana, sila log masuk atau daftar akaun terlebih dahulu."
                                    : "Mod tetamu hanya dibenarkan membaca nota sains. Untuk bermain aktiviti Drag & Drop Sistem Suria dan merekodkan markah orbit, sila log masuk atau daftar akaun terlebih dahulu."}
                            </p>
                        </div>

                        {/* Reward Highlight */}
                        <div className="my-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-left flex items-center gap-2.5">
                            <span className="text-2xl">✨</span>
                            <div className="text-[11px] leading-tight">
                                <span className="font-black text-slate-800 block">Daftar sekarang & dapatkan:</span>
                                <span className="text-amber-800 font-bold">100 XP Selamat Datang + Simpanan Rekod Penuh</span>
                            </div>
                        </div>

                        {/* 2 Primary Action Buttons */}
                        <div className="space-y-2.5 pt-1">
                            <button
                                type="button"
                                onClick={() => {
                                    playAudioFeedback("tap");
                                    setShowGuestAuthModal(false);
                                    setCurrentView("login");
                                }}
                                className="w-full py-3.5 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                            >
                                <span>🔑</span>
                                <span>Log Masuk Akaun Sedia Ada</span>
                                <span>➔</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    playAudioFeedback("sparkle");
                                    setShowGuestAuthModal(false);
                                    setCurrentView("register");
                                }}
                                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                            >
                                <span>📝</span>
                                <span>Daftar Akaun Percuma (Murid Baharu)</span>
                                <span>➔</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    playAudioFeedback("tap");
                                    setShowGuestAuthModal(false);
                                }}
                                className="w-full py-2 text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer transition-colors"
                            >
                                Nanti Dulu, Saya Ingin Baca Nota Sahaja
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </main>
        </div>
    );
}
