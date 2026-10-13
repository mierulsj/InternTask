"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getCurriculumTopics, saveCurriculumTopics, INITIAL_CURRICULUM_TOPICS } from "../../lib/curriculumService";
import { getSpellingWords, saveSpellingWords, INITIAL_SPELLING_WORDS } from "../../lib/spellingService";
import AdminHeader from "./components/AdminHeader";
import AdminDrawer from "./components/AdminDrawer";
import AdminKPI from "./components/AdminKPI";
import AdminCharts from "./components/AdminCharts";
import AdminLogin from "./components/AdminLogin";
import Admin2FA from "./components/Admin2FA";
import StudentsTab from "./components/StudentsTab";
import NotesTab from "./components/NotesTab";
import QuizzesTab from "./components/QuizzesTab";
import SpellingBeeTab from "./components/SpellingBeeTab";
import TopicModal from "./components/TopicModal";
import QuestionModal from "./components/QuestionModal";
import SpellingModal from "./components/SpellingModal";

export default function AdminPage() {
    const [viewMode, setViewMode] = useState("login"); // "login" | "2fa" | "dashboard"
    const [activeTab, setActiveTab] = useState("students"); // "students" | "notes" | "quizzes" | "spelling"
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showCharts, setShowCharts] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // Form inputs
    const [email, setEmail] = useState("mierulsj@gmail.com");
    const [password, setPassword] = useState("Exploria123");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Rate Limiting & Lockout
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutRemaining, setLockoutRemaining] = useState(0);

    // 2FA
    const [tempToken, setTempToken] = useState("");
    const [demoOtp, setDemoOtp] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [otpError, setOtpError] = useState("");

    // Admin Session
    const [adminSession, setAdminSession] = useState(null);
    const lockoutTimerRef = useRef(null);

    // Data: Students
    const [studentsList, setStudentsList] = useState([]);
    const [isLoadingStudents, setIsLoadingStudents] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Data: Curriculum Topics & Quizzes
    const [topics, setTopics] = useState(INITIAL_CURRICULUM_TOPICS);
    const [selectedTopicForQuiz, setSelectedTopicForQuiz] = useState("topic-1");
    const [isSavingCurriculum, setIsSavingCurriculum] = useState(false);

    // Modals for Topic & Question Management
    const [topicModalMode, setTopicModalMode] = useState(null); // "add" | "edit" | null
    const [editingTopic, setEditingTopic] = useState({
        id: "",
        title: "",
        shortTitle: "",
        category: "Sains Am",
        themeColor: "#0099e5",
        videoEmbedUrl: "",
        videoRawUrl: "",
        content: "",
        questions: [],
    });

    const [questionModalMode, setQuestionModalMode] = useState(null); // "add" | "edit" | null
    const [editingQuestionIndex, setEditingQuestionIndex] = useState(-1);
    const [editingQuestion, setEditingQuestion] = useState({
        question: "",
        options: ["", "", ""],
        correctAnswer: "",
    });

    // Data: Spelling Bee Words
    const [spellingWords, setSpellingWords] = useState(INITIAL_SPELLING_WORDS);
    const [isSavingSpelling, setIsSavingSpelling] = useState(false);
    const [spellingModalMode, setSpellingModalMode] = useState(null); // "add" | "edit" | null
    const [editingSpellingIndex, setEditingSpellingIndex] = useState(-1);
    const [editingWord, setEditingWord] = useState({
        id: "",
        word: "",
        ipa: "",
        syllables: "",
        difficulty: 1,
        theme: "Sains Am",
        meaningBM: "",
        meaningEN: "",
        sentenceBM: "",
        sentenceEN: "",
        hintLetters: "",
    });

    /* =========================================================================
       1. INITIAL MOUNT & SESSIONS
       ========================================================================= */
    useEffect(() => {
        setIsMounted(true);
        try {
            const storedLock = localStorage.getItem("exploria_admin_locked_until");
            if (storedLock) {
                const remaining = Math.ceil((parseInt(storedLock, 10) - Date.now()) / 1000);
                if (remaining > 0) {
                    setIsLocked(true);
                    setLockoutRemaining(remaining);
                } else {
                    localStorage.removeItem("exploria_admin_locked_until");
                }
            }

            const rawSession = sessionStorage.getItem("exploria_admin_session");
            if (rawSession) {
                const session = JSON.parse(rawSession);
                if (session && session.expiresAt > Date.now()) {
                    setAdminSession(session);
                    setViewMode("dashboard");
                } else {
                    sessionStorage.removeItem("exploria_admin_session");
                }
            }

            getCurriculumTopics().then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setTopics(data);
                }
            });

            getSpellingWords().then((words) => {
                if (Array.isArray(words) && words.length > 0) {
                    setSpellingWords(words);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }, []);

    /* Lockout Countdown */
    useEffect(() => {
        if (isLocked && lockoutRemaining > 0) {
            lockoutTimerRef.current = setInterval(() => {
                setLockoutRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(lockoutTimerRef.current);
                        setIsLocked(false);
                        localStorage.removeItem("exploria_admin_locked_until");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(lockoutTimerRef.current);
    }, [isLocked, lockoutRemaining]);

    /* Log Keluar Pentadbir */
    const handleLogout = useCallback(() => {
        setAdminSession(null);
        sessionStorage.removeItem("exploria_admin_session");
        setViewMode("login");
        setOtpInput("");
        setTempToken("");
        setDemoOtp("");
    }, []);

    /* Load Students from API */
    const fetchStudents = useCallback(async (token) => {
        if (!token) return;
        setIsLoadingStudents(true);
        try {
            const res = await fetch("/api/admin/students", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success && Array.isArray(data.students)) {
                setStudentsList(data.students);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingStudents(false);
        }
    }, []);

    useEffect(() => {
        if (viewMode === "dashboard" && adminSession?.token) {
            fetchStudents(adminSession.token);
        }
    }, [viewMode, adminSession, fetchStudents]);

    /* =========================================================================
       2. LOGIN & 2FA ACTIONS
       ========================================================================= */
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setErrorMessage(data.error || "Log masuk gagal.");
                if (data.isLocked) {
                    setIsLocked(true);
                    setLockoutRemaining(data.remainingSeconds || 900);
                    localStorage.setItem("exploria_admin_locked_until", String(Date.now() + (data.remainingSeconds || 900) * 1000));
                }
                return;
            }

            if (data.requires2FA) {
                setTempToken(data.tempToken);
                setDemoOtp(data.demoOtp);
                setViewMode("2fa");
            }
        } catch {
            setErrorMessage("Ralat sambungan pelayan.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify2FA = async (e) => {
        e.preventDefault();
        setOtpError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/verify-2fa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tempToken, otp: otpInput }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setOtpError(data.error || "Kod 2FA tidak sah.");
                return;
            }

            setAdminSession(data.session);
            sessionStorage.setItem("exploria_admin_session", JSON.stringify(data.session));
            setViewMode("dashboard");
            resetInactivityTimer();
        } catch {
            setOtpError("Ralat mengesahkan 2FA.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmergencyUnlock = async () => {
        await fetch("/api/admin/unlock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        setIsLocked(false);
        setLockoutRemaining(0);
        localStorage.removeItem("exploria_admin_locked_until");
        setErrorMessage("");
    };

    /* =========================================================================
       3. TOPIC & LEARNING NOTES CRUD ACTIONS
       ========================================================================= */
    const handleSaveTopic = async (e) => {
        e.preventDefault();
        setIsSavingCurriculum(true);
        try {
            let updatedList = [];
            if (topicModalMode === "add") {
                const newId = `topic-${Date.now().toString().slice(-4)}`;
                const newTopic = {
                    ...editingTopic,
                    id: newId,
                    shortTitle: editingTopic.shortTitle || editingTopic.title,
                    graphicType: editingTopic.graphicType || "planet",
                    questions: editingTopic.questions || [],
                };
                updatedList = [...topics, newTopic];
            } else if (topicModalMode === "edit") {
                updatedList = topics.map((t) => (t.id === editingTopic.id ? { ...editingTopic } : t));
            }

            setTopics(updatedList);
            await saveCurriculumTopics(updatedList);
            setTopicModalMode(null);
        } catch (err) {
            console.error("Gagal menyimpan topik:", err);
        } finally {
            setIsSavingCurriculum(false);
        }
    };

    const handleDeleteTopic = async (topicId) => {
        if (!confirm("Adakah anda pasti mahu memadam topik ini bersama semua soalannya?")) return;
        const updated = topics.filter((t) => t.id !== topicId);
        setTopics(updated);
        await saveCurriculumTopics(updated);
        if (selectedTopicForQuiz === topicId && updated.length > 0) {
            setSelectedTopicForQuiz(updated[0].id);
        }
    };

    /* =========================================================================
       4. QUIZ QUESTIONS CRUD ACTIONS
       ========================================================================= */
    const currentTargetTopic = topics.find((t) => t.id === selectedTopicForQuiz) || topics[0] || {};

    const handleSaveQuestion = async (e) => {
        e.preventDefault();
        setIsSavingCurriculum(true);
        try {
            const topicIndex = topics.findIndex((t) => t.id === selectedTopicForQuiz);
            if (topicIndex === -1) return;

            const existingQuestions = currentTargetTopic.questions ? [...currentTargetTopic.questions] : [];
            let updatedQuestions = [];

            if (questionModalMode === "add") {
                updatedQuestions = [...existingQuestions, editingQuestion];
            } else if (questionModalMode === "edit" && editingQuestionIndex >= 0) {
                updatedQuestions = existingQuestions.map((q, idx) => (idx === editingQuestionIndex ? editingQuestion : q));
            }

            const updatedTopics = [...topics];
            updatedTopics[topicIndex] = {
                ...updatedTopics[topicIndex],
                questions: updatedQuestions,
            };

            setTopics(updatedTopics);
            await saveCurriculumTopics(updatedTopics);
            setQuestionModalMode(null);
        } catch (err) {
            console.error("Gagal menyimpan soalan:", err);
        } finally {
            setIsSavingCurriculum(false);
        }
    };

    const handleDeleteQuestion = async (indexToDelete) => {
        if (!confirm("Adakah anda pasti mahu memadam soalan ini?")) return;
        const topicIndex = topics.findIndex((t) => t.id === selectedTopicForQuiz);
        if (topicIndex === -1) return;

        const updatedQuestions = (currentTargetTopic.questions || []).filter((_, idx) => idx !== indexToDelete);
        const updatedTopics = [...topics];
        updatedTopics[topicIndex] = {
            ...updatedTopics[topicIndex],
            questions: updatedQuestions,
        };

        setTopics(updatedTopics);
        await saveCurriculumTopics(updatedTopics);
    };

    /* =========================================================================
       SPELLING BEE WORDS CRUD HANDLERS
       ========================================================================= */
    const handleSaveSpellingWord = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!editingWord.word || !editingWord.word.trim()) return;

        setIsSavingSpelling(true);
        try {
            const cleanWord = {
                ...editingWord,
                word: editingWord.word.trim().toLowerCase(),
                id: editingWord.id || `word-${Date.now()}`,
            };

            let updatedList = [...spellingWords];
            if (spellingModalMode === "add") {
                updatedList.unshift(cleanWord);
            } else {
                const matchId = cleanWord._originalId || cleanWord.id;
                const matchWord = cleanWord._originalWord || cleanWord.word;
                const targetIdx = updatedList.findIndex(
                    (w) => (matchId && w.id === matchId) || (matchWord && w.word === matchWord)
                );
                if (targetIdx >= 0) {
                    updatedList[targetIdx] = cleanWord;
                } else if (editingSpellingIndex >= 0 && editingSpellingIndex < updatedList.length) {
                    updatedList[editingSpellingIndex] = cleanWord;
                } else {
                    updatedList.unshift(cleanWord);
                }
            }

            setSpellingWords(updatedList);
            await saveSpellingWords(updatedList);
            setSpellingModalMode(null);
        } catch (err) {
            console.error("Ralat menyimpan kata spelling bee:", err);
            alert("Ralat semasa menyimpan perkataan. Sila cuba lagi.");
        } finally {
            setIsSavingSpelling(false);
        }
    };

    const handleDeleteSpellingWord = async (target) => {
        let item = null;
        let targetId = null;

        if (typeof target === "number") {
            item = spellingWords[target];
            targetId = item?.id || item?.word;
        } else if (typeof target === "string") {
            item = spellingWords.find((w) => w.id === target || w.word === target);
            targetId = item?.id || target;
        } else if (target && typeof target === "object") {
            item = target;
            targetId = target.id || target.word;
        }

        if (!item && !targetId) {
            console.warn("Item to delete not found:", target);
            return;
        }

        const wordLabel = item?.word || targetId;
        const confirmDelete = window.confirm(`Adakah anda pasti ingin memadam perkataan "${wordLabel}"?`);
        if (!confirmDelete) return;

        setIsSavingSpelling(true);
        try {
            const updatedList = spellingWords.filter((w) => {
                if (targetId && (w.id === targetId || w.word === targetId)) return false;
                if (item && (w === item || (item.id && w.id === item.id) || (item.word && w.word === item.word))) return false;
                return true;
            });
            setSpellingWords(updatedList);
            await saveSpellingWords(updatedList);
        } catch (err) {
            console.error("Ralat memadam kata spelling bee:", err);
            alert("Ralat semasa memadam perkataan. Sila cuba lagi.");
        } finally {
            setIsSavingSpelling(false);
        }
    };

    const handleResetSpellingWords = async () => {
        const confirmReset = window.confirm("Adakah anda pasti ingin memulihkan senarai semua perkataan Spelling Bee lalai?");
        if (!confirmReset) return;

        setIsSavingSpelling(true);
        try {
            setSpellingWords(INITIAL_SPELLING_WORDS);
            await saveSpellingWords(INITIAL_SPELLING_WORDS);
        } catch (err) {
            console.error("Ralat memulihkan perkataan:", err);
            alert("Ralat memulihkan perkataan. Sila cuba lagi.");
        } finally {
            setIsSavingSpelling(false);
        }
    };

    if (!isMounted) return null;

    const totalQuizQuestions = topics.reduce((acc, t) => acc + (t.questions?.length || 0), 0);

    if (viewMode !== "dashboard") {
        return (
            <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col items-center justify-start select-none font-sans relative overflow-x-hidden">
                <AdminHeader
                    viewMode={viewMode}
                    adminSession={adminSession}
                    onLogout={handleLogout}
                />

                {/* View 1: Login */}
                {viewMode === "login" && (
                    <AdminLogin
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        isLocked={isLocked}
                        lockoutRemaining={lockoutRemaining}
                        onEmergencyUnlock={handleEmergencyUnlock}
                        onSubmit={handleLoginSubmit}
                    />
                )}

                {/* View 2: 2FA Verification */}
                {viewMode === "2fa" && (
                    <Admin2FA
                        otpInput={otpInput}
                        setOtpInput={setOtpInput}
                        demoOtp={demoOtp}
                        otpError={otpError}
                        isLoading={isLoading}
                        onSubmit={handleVerify2FA}
                        onCancel={() => setViewMode("login")}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col lg:flex-row select-none font-sans relative overflow-x-hidden">
            {/* 1. DRAWER PADA KIRI WEB (SIDEBAR) */}
            <AdminDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                studentsCount={studentsList.length}
                topicsCount={topics.length}
                totalQuestions={totalQuizQuestions}
                spellingWordsCount={spellingWords.length}
                adminSession={adminSession}
                onLogout={handleLogout}
            />

            {/* 2. KAWASAN KANDUNGAN UTAMA (MAIN CONTENT) */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                <AdminHeader
                    viewMode={viewMode}
                    adminSession={adminSession}
                    onLogout={handleLogout}
                    activeTab={activeTab}
                    onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
                    {/* Top KPI Metrics Strip */}
                    <AdminKPI
                        studentsCount={studentsList.length}
                        topicsCount={topics.length}
                        totalQuestions={totalQuizQuestions}
                        spellingWordsCount={spellingWords.length}
                    />

                    {/* Tab 1: Pelajar */}
                    {activeTab === "students" && (
                        <div className="space-y-6">
                            {/* Header Ringkas */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-black text-slate-800">
                                    Analisis Prestasi
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setShowCharts((prev) => !prev)}
                                    className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                                >
                                    {showCharts ? "Sorok Graf ▲" : "Papar Graf ▼"}
                                </button>
                            </div>

                            {/* Komponen Graf & Carta */}
                            {showCharts && <AdminCharts studentsList={studentsList} />}

                            {/* Jadual Lengkap Murid */}
                            <StudentsTab
                                studentsList={studentsList}
                                isLoadingStudents={isLoadingStudents}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                onRefresh={() => fetchStudents(adminSession?.token)}
                            />
                        </div>
                    )}

                    {/* Tab 2: Nota */}
                    {activeTab === "notes" && (
                        <NotesTab
                            topics={topics}
                            onAddTopic={() => {
                                setEditingTopic({
                                    id: "",
                                    title: "",
                                    shortTitle: "",
                                    graphicType: "planet",
                                    category: "Sains Am",
                                    themeColor: "#0099e5",
                                    videoEmbedUrl: "",
                                    videoRawUrl: "",
                                    content: "",
                                    questions: [],
                                });
                                setTopicModalMode("add");
                            }}
                            onEditTopic={(topic) => {
                                setEditingTopic({ ...topic });
                                setTopicModalMode("edit");
                            }}
                            onDeleteTopic={handleDeleteTopic}
                        />
                    )}

                    {/* Tab 3: Kuiz */}
                    {activeTab === "quizzes" && (
                        <QuizzesTab
                            topics={topics}
                            selectedTopicId={selectedTopicForQuiz}
                            setSelectedTopicId={setSelectedTopicForQuiz}
                            onAddQuestion={() => {
                                setEditingQuestion({
                                    question: "",
                                    options: ["", "", ""],
                                    correctAnswer: "",
                                });
                                setEditingQuestionIndex(-1);
                                setQuestionModalMode("add");
                            }}
                            onEditQuestion={(q, qIdx) => {
                                setEditingQuestion({
                                    question: q.question,
                                    options: [...q.options],
                                    correctAnswer: q.correctAnswer,
                                });
                                setEditingQuestionIndex(qIdx);
                                setQuestionModalMode("edit");
                            }}
                            onDeleteQuestion={handleDeleteQuestion}
                        />
                    )}

                    {/* Tab 4: Spelling Bee */}
                    {activeTab === "spelling" && (
                        <SpellingBeeTab
                            words={spellingWords}
                            onAddWord={() => {
                                setEditingWord({
                                    id: `word-${Date.now()}`,
                                    word: "",
                                    ipa: "",
                                    syllables: "",
                                    difficulty: "easy",
                                    theme: "food",
                                    image: "",
                                    meaning: "",
                                    meaningBM: "",
                                    meaningEN: "",
                                    sentence: "",
                                    sentenceBM: "",
                                    sentenceEN: "",
                                    hintLetters: "",
                                });
                                setEditingSpellingIndex(-1);
                                setSpellingModalMode("add");
                            }}
                            onEditWord={(wordItem, wIdx) => {
                                setEditingWord({
                                    ...wordItem,
                                    _originalId: wordItem.id,
                                    _originalWord: wordItem.word,
                                });
                                setEditingSpellingIndex(typeof wIdx === "number" ? wIdx : -1);
                                setSpellingModalMode("edit");
                            }}
                            onDeleteWord={handleDeleteSpellingWord}
                            onResetDefaultWords={handleResetSpellingWords}
                            isSaving={isSavingSpelling}
                        />
                    )}
                </main>
            </div>

            {/* Modal: Tambah / Ubah Topik Nota */}
            <TopicModal
                isOpen={!!topicModalMode}
                mode={topicModalMode}
                topicData={editingTopic}
                setTopicData={setEditingTopic}
                isSaving={isSavingCurriculum}
                onSave={handleSaveTopic}
                onClose={() => setTopicModalMode(null)}
            />

            {/* Modal: Tambah / Ubah Soalan Kuiz */}
            <QuestionModal
                isOpen={!!questionModalMode}
                mode={questionModalMode}
                targetTopicTitle={currentTargetTopic.shortTitle || currentTargetTopic.title || "Topik"}
                questionData={editingQuestion}
                setQuestionData={setEditingQuestion}
                isSaving={isSavingCurriculum}
                onSave={handleSaveQuestion}
                onClose={() => setQuestionModalMode(null)}
            />

            {/* Modal: Tambah / Ubah Kata Spelling Bee */}
            <SpellingModal
                isOpen={!!spellingModalMode}
                mode={spellingModalMode}
                wordData={editingWord}
                setWordData={setEditingWord}
                isSaving={isSavingSpelling}
                onSave={handleSaveSpellingWord}
                onClose={() => setSpellingModalMode(null)}
            />
        </div>
    );
}
