"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    getCurrentParentSession,
    logoutParentSession,
    loginParentAccount,
    registerParentAccount,
    linkChildToParent,
    unlinkChildFromParent,
    getChildDashboardData,
} from "../../lib/parentService";
import { playSpellingAudio, stopSpellingAudio } from "../../lib/spellingAudioService";

export default function ParentDashboardPage() {
    const router = useRouter();

    // Sesi Ibu Bapa & Status
    const [parentSession, setParentSession] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [authMode, setAuthMode] = useState("login"); // "login" | "register"

    // Borang Auth Ibu Bapa
    const [authForm, setAuthForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        studentId: "",
    });
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [authSuccessMsg, setAuthSuccessMsg] = useState("");

    // Pengurusan Pelbagai Anak (Multi-Child Support)
    const [childrenList, setChildrenList] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState("");
    const [activeChildData, setActiveChildData] = useState(null);
    const [isLoadingChildData, setIsLoadingChildData] = useState(false);

    // Modal Paut Anak Baharu
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [newChildIdInput, setNewChildIdInput] = useState("");
    const [linkModalLoading, setLinkModalLoading] = useState(false);
    const [linkModalError, setLinkModalError] = useState("");

    // Audio TTS Helper untuk sebutan perkataan Spelling Bee
    const [playingWord, setPlayingWord] = useState(null);
    const [sifirFilter, setSifirFilter] = useState("all"); // "all" | "latihan" | "cemerlang"
    const [hoveredDay, setHoveredDay] = useState(null);

    const playSpeechWord = (word) => {
        if (!word) return;
        setPlayingWord(word);
        playSpellingAudio(word, {
            onStart: () => setPlayingWord(word),
            onEnd: () => setPlayingWord(null),
            onError: () => setPlayingWord(null),
        });
    };

    // Muat Sesi Ibu Bapa semasa Mount
    useEffect(() => {
        setIsMounted(true);
        const session = getCurrentParentSession();
        if (session) {
            setParentSession(session);
            if (Array.isArray(session.linkedStudentIds) && session.linkedStudentIds.length > 0) {
                setChildrenList(session.linkedStudentIds);
                setSelectedChildId(session.linkedStudentIds[0]);
            } else {
                // Cuba semak jika ada pelajar aktif dalam peranti ini untuk memudahkan ibu bapa
                try {
                    const activeIC = localStorage.getItem("exploria_active_ic");
                    if (activeIC) {
                        const defaultId = `STU-${activeIC.slice(-5)}`;
                        setChildrenList([defaultId]);
                        setSelectedChildId(defaultId);
                    }
                } catch { }
            }
        } else {
            // Jika ada query param mod pendaftaran atau ID
            if (typeof window !== "undefined") {
                const params = new URLSearchParams(window.location.search);
                if (params.get("mode") === "register") {
                    setAuthMode("register");
                }
                const stuIdParam = params.get("studentId");
                if (stuIdParam) {
                    setAuthForm((prev) => ({ ...prev, studentId: stuIdParam.toUpperCase() }));
                }
            }
        }
    }, []);

    // Muat Data Analisis Anak Aktif
    const loadChildAnalytics = useCallback(async (studentId) => {
        if (!studentId) return;
        setIsLoadingChildData(true);
        try {
            const res = await getChildDashboardData(studentId);
            if (res.success && res.data) {
                setActiveChildData(res.data);
            }
        } catch (err) {
            console.error("Gagal memuatkan data anak:", err);
        } finally {
            setIsLoadingChildData(false);
        }
    }, []);

    useEffect(() => {
        if (selectedChildId) {
            loadChildAnalytics(selectedChildId);
        }
    }, [selectedChildId, loadChildAnalytics]);

    /* =========================================================================
       TINDAKAN AUTENTIKASI IBU BAPA
       ========================================================================= */
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError("");
        setAuthSuccessMsg("");
        setAuthLoading(true);

        try {
            if (authMode === "login") {
                const res = await loginParentAccount({
                    email: authForm.email,
                    password: authForm.password,
                });
                if (!res.success) {
                    setAuthError(res.error || "Log masuk gagal. Sila cuba lagi.");
                    return;
                }
                setParentSession(res.parent);
                const ids = res.parent.linkedStudentIds || [];
                setChildrenList(ids);
                if (ids.length > 0) {
                    setSelectedChildId(ids[0]);
                }
            } else {
                // Pendaftaran
                if (authForm.password !== authForm.confirmPassword) {
                    setAuthError("Kata laluan dan pengesahan kata laluan tidak sepadan.");
                    return;
                }
                if (authForm.password.length < 6) {
                    setAuthError("Kata laluan mestilah sekurang-kurangnya 6 aksara.");
                    return;
                }

                const res = await registerParentAccount({
                    name: authForm.name,
                    email: authForm.email,
                    password: authForm.password,
                    studentId: authForm.studentId,
                });

                if (!res.success) {
                    setAuthError(res.error || "Pendaftaran gagal.");
                    return;
                }

                setAuthSuccessMsg("Pendaftaran berjaya! Selamat datang ke Portal Ibu Bapa.");
                setParentSession(res.parent);
                const ids = res.parent.linkedStudentIds || [];
                setChildrenList(ids);
                if (ids.length > 0) {
                    setSelectedChildId(ids[0]);
                }
            }
        } catch {
            setAuthError("Ralat pelayan. Sila cuba sebentar lagi.");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        logoutParentSession();
        setParentSession(null);
        setActiveChildData(null);
        setSelectedChildId("");
        setChildrenList([]);
    };

    // Pautkan Anak Baharu
    const handleLinkChildSubmit = async (e) => {
        e.preventDefault();
        if (!newChildIdInput.trim()) return;

        setLinkModalError("");
        setLinkModalLoading(true);

        try {
            const stuId = newChildIdInput.trim().toUpperCase();
            const res = await linkChildToParent(parentSession.email, stuId);
            if (!res.success) {
                setLinkModalError(res.error || "Gagal memautkan ID Pelajar.");
                return;
            }

            const updatedList = res.linkedStudentIds || [...childrenList, stuId];
            setChildrenList(updatedList);
            setSelectedChildId(stuId);
            setNewChildIdInput("");
            setShowLinkModal(false);
            loadChildAnalytics(stuId);
        } catch {
            setLinkModalError("Ralat semasa menyambung ke pelayan.");
        } finally {
            setLinkModalLoading(false);
        }
    };

    // Nyahpaut Anak
    const handleUnlinkChild = async (stuId) => {
        if (!window.confirm(`Adakah anda pasti ingin mengeluarkan profil anak (${stuId}) daripada paparan anda?`)) {
            return;
        }

        try {
            const res = await unlinkChildFromParent(parentSession.email, stuId);
            if (res.success) {
                const filtered = childrenList.filter((id) => id !== stuId);
                setChildrenList(filtered);
                if (filtered.length > 0) {
                    setSelectedChildId(filtered[0]);
                } else {
                    setSelectedChildId("");
                    setActiveChildData(null);
                }
            }
        } catch {
            alert("Ralat semasa memutuskan pautan.");
        }
    };

    if (!isMounted) return null;

    /* =========================================================================
       PAPARAN 1: BORANG LOG MASUK & PENDAFTARAN IBU BAPA (SAMA DENGAN LOGIN BIASA)
       ========================================================================= */
    if (!parentSession) {
        return (
            <div
                className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden selection:bg-sky-200 select-none font-sans"
                style={{
                    background: "#ffffff"
                }}
            >
                {/* Embedded Micro-Animations */}
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(14px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        20%, 60% { transform: translateX(-5px); }
                        40%, 80% { transform: translateX(5px); }
                    }
                    .anim-fade-in { animation: fadeInUp 0.35s ease-out forwards; }
                    .anim-shake { animation: shake 0.35s ease-in-out; }
                `}</style>

                {/* Subtle Ambient Glow */}
                <div className="absolute top-1/3 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

                {/* MAIN LOGIN CARD */}
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 relative z-10 anim-fade-in">

                    {/* Header: Logo, Title & Subtitle */}
                    <div className="text-center mb-5">
                        <img
                            src="/logoexploria.png"
                            alt="Exploria STEM"
                            className="h-14 sm:h-16 mx-auto object-contain drop-shadow-sm mb-3"
                        />
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            {authMode === "login" ? "Portal Ibu Bapa" : "Daftar Akaun Penjaga"}
                        </h1>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            {authMode === "login"
                                ? "Pantau perkembangan & kemajuan pembelajaran anak anda"
                                : "Pautkan ID Pelajar untuk melihat analisis kemajuan anak secara langsung"}
                        </p>
                    </div>

                    {/* PILIHAN JENIS PENGGUNA: [Log Masuk Pelajar] vs [Log Masuk Ibu Bapa] */}
                    <div className="flex bg-slate-100 p-1 rounded-2xl mb-4 border border-slate-200">
                        <Link
                            href="/login"
                            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-800"
                        >
                            <span>🧑‍🎓</span>
                            <span>Log Masuk Pelajar</span>
                        </Link>
                        <button
                            type="button"
                            className="flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white text-[#0088cc] shadow-xs border border-slate-200/80"
                        >
                            <span>👨‍👩‍👧</span>
                            <span>Ibu Bapa</span>
                        </button>
                    </div>

                    {/* Tab Switcher: [Log Masuk] vs [Daftar Akaun Baharu] */}
                    <div className="flex bg-slate-100 p-1 rounded-2xl mb-5 border border-slate-200">
                        <button
                            type="button"
                            onClick={() => { setAuthMode("login"); setAuthError(""); setAuthSuccessMsg(""); }}
                            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${authMode === "login"
                                    ? "bg-[#0099e5] text-white shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            Log Masuk
                        </button>
                        <button
                            type="button"
                            onClick={() => { setAuthMode("register"); setAuthError(""); setAuthSuccessMsg(""); }}
                            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${authMode === "register"
                                    ? "bg-[#0099e5] text-white shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            Daftar Akaun
                        </button>
                    </div>

                    {/* Alerts */}
                    {authError && (
                        <div className="mb-4 bg-rose-50 border border-rose-300 p-3 rounded-xl text-rose-800 text-xs font-bold anim-shake flex items-center gap-2">
                            <span>⚠️</span>
                            <span>{authError}</span>
                        </div>
                    )}
                    {authSuccessMsg && (
                        <div className="mb-4 bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                            <span>✓</span>
                            <span>{authSuccessMsg}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleAuthSubmit} noValidate className="space-y-4 text-left">
                        {authMode === "register" && (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Nama Penuh Ibu Bapa / Penjaga
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Pn. Siti Nurhaliza"
                                    value={authForm.name}
                                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-sm font-medium outline-none transition-all placeholder:text-slate-400 bg-white text-slate-900"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Alamat E-mel
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="ibubapa@email.com"
                                value={authForm.email}
                                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-sm font-medium outline-none transition-all placeholder:text-slate-400 bg-white text-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Kata Laluan
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={authForm.password}
                                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-sm font-medium outline-none transition-all placeholder:text-slate-400 bg-white text-slate-900"
                            />
                        </div>

                        {authMode === "register" && (
                            <>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Sahkan Kata Laluan
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        value={authForm.confirmPassword}
                                        onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-sm font-medium outline-none transition-all placeholder:text-slate-400 bg-white text-slate-900"
                                    />
                                </div>

                                {/* Input ID Pelajar */}
                                <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-200 space-y-1">
                                    <label className="block text-xs font-black text-sky-900 flex items-center justify-between">
                                        <span>ID Pelajar Anak (Wajib/Pilihan)</span>
                                        <span className="text-[10px] text-sky-600 font-bold">Format: STU-XXXXX</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: STU-15542"
                                        value={authForm.studentId}
                                        onChange={(e) => setAuthForm({ ...authForm, studentId: e.target.value.toUpperCase() })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-sky-300 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 outline-none uppercase bg-white"
                                    />
                                    <p className="text-[11px] text-sky-800 leading-snug pt-0.5">
                                        💡 Anak anda boleh mendapatkan ID unik ini pada profil aplikasi Exploria mereka. Anda juga boleh memautkannya selepas log masuk.
                                    </p>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full py-3.5 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white font-black text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 mt-2"
                        >
                            {authLoading ? (
                                <span>Memproses...</span>
                            ) : authMode === "login" ? (
                                <>
                                    <span>Log Masuk Ibu Bapa</span>
                                    <span>➔</span>
                                </>
                            ) : (
                                <>
                                    <span>Daftar Akaun Ibu Bapa</span>
                                    <span>➔</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Secondary Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 text-center space-y-2">
                        <Link
                            href="/login"
                            className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5"
                        >
                            <span>🧑‍🎓</span>
                            <span>Buka Halaman Log Masuk Pelajar</span>
                        </Link>
                        <div>
                            <Link
                                href="/belajar"
                                className="text-xs text-slate-400 hover:text-slate-600 transition-colors inline-block"
                            >
                                ← Kembali ke Menu Utama Exploria
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Ringkas Sama Seperti Login Biasa */}
                <p className="text-center text-xs text-slate-400 mt-6 relative z-10 font-medium">
                    Exploria STEM • Portal Ibu Bapa & Penjaga
                </p>
            </div>
        );
    }

    /* =========================================================================
       PAPARAN 2: PAPARAN UTAMA IBU BAPA (PARENT DASHBOARD)
       ========================================================================= */
    const stats = activeChildData?.stats || {
        completedThisWeek: 8,
        overallAccuracy: 86,
        totalActiveTime: "2j 15m",
        spellingScore: 0,
        mathScore: 0,
    };

    const mathAnalytics = activeChildData?.mathAnalytics || {
        fastestTime: "1.8s",
        highScore: 480,
        tablesBreakdown: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => ({
            table: num,
            accuracy: [1, 2, 5, 10].includes(num) ? 96 : [7, 8, 9].includes(num) ? 58 : 82,
            mastery: [1, 2, 5, 10].includes(num) ? "Cemerlang" : [7, 8, 9].includes(num) ? "Perlu Latihan" : "Baik",
            status: [1, 2, 5, 10].includes(num) ? "cemerlang" : [7, 8, 9].includes(num) ? "latihan" : "baik",
        })),
    };

    const spellingAnalytics = activeChildData?.spellingAnalytics || {
        accuracy: 88,
        weakVocabularyLog: activeChildData?.spellingMistakes || [],
    };

    const weeklyTrend = activeChildData?.weeklyTrend || [
        { day: "Isn", label: "Isnin", score: 68 },
        { day: "Sel", label: "Selasa", score: 74 },
        { day: "Rab", label: "Rabu", score: 70 },
        { day: "Kha", label: "Khamis", score: 85 },
        { day: "Jum", label: "Jumaat", score: 82 },
        { day: "Sab", label: "Sabtu", score: 92 },
        { day: "Ahd", label: "Ahad", score: 88 },
    ];

    const filteredTables = (mathAnalytics.tablesBreakdown || []).filter((item) => {
        if (sifirFilter === "latihan") return item.status === "latihan";
        if (sifirFilter === "cemerlang") return item.status === "cemerlang";
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none text-left">
            {/* Header Parent Portal */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs px-4 sm:px-6 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                    {/* Logo & Info Ibu Bapa */}
                    <div className="flex items-center gap-3">
                        <Link href="/belajar" className="flex items-center gap-2">
                            <span className="text-2xl">👨‍👩‍👧</span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                                        Portal Ibu Bapa Exploria
                                    </h1>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                        Penjaga
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500 font-medium block">
                                    {parentSession.name || "Ibu Bapa"} ({parentSession.email})
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigasi Kanan */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="/belajar"
                            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                            title="Buka mod pembelajaran anak"
                        >
                            <span>🚀</span>
                            <span className="hidden sm:inline">Mod Pelajar</span>
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1"
                        >
                            <span>🚪</span>
                            <span>Log Keluar</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Kandungan Utama */}
            <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
                {/* =============================================================
                    BAR KAWALAN PELBAGAI ANAK (MULTI-CHILD SWITCHER)
                    ============================================================= */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-2xl shrink-0">
                            🧒
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                Profil Anak Dipilih
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                                {childrenList.length > 0 ? (
                                    <select
                                        value={selectedChildId}
                                        onChange={(e) => setSelectedChildId(e.target.value)}
                                        className="font-black text-slate-800 text-base sm:text-lg bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 outline-none cursor-pointer focus:border-indigo-500"
                                    >
                                        {childrenList.map((id) => (
                                            <option key={id} value={id}>
                                                {id === selectedChildId && activeChildData?.name
                                                    ? `${activeChildData.name} (${id})`
                                                    : `Anak ID: ${id}`}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span className="font-bold text-slate-500 text-sm">
                                        Belum ada anak dipautkan
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tindakan Paut & Urus */}
                    <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
                        <button
                            type="button"
                            onClick={() => {
                                setNewChildIdInput("");
                                setLinkModalError("");
                                setShowLinkModal(true);
                            }}
                            className="min-h-[44px] px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                            <span>➕</span>
                            <span>Pautkan Anak Baharu</span>
                        </button>
                        {selectedChildId && (
                            <button
                                type="button"
                                onClick={() => handleUnlinkChild(selectedChildId)}
                                className="min-h-[44px] px-3 py-2 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                                title="Nyahpaut anak ini dari paparan anda"
                            >
                                <span>Putus Pautan</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Sekiranya tiada anak dipautkan */}
                {childrenList.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-indigo-200 text-center space-y-4">
                        <div className="text-4xl">🔗</div>
                        <h2 className="text-lg font-black text-slate-800">
                            Pautkan ID Pelajar Anak Anda Sekarang
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                            Setiap murid Exploria mempunyai ID Pelajar unik (contoh: <strong className="font-mono text-indigo-600">STU-15542</strong>) yang terpapar di halaman profil mereka. Masukkan ID tersebut untuk memulakan analisis.
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowLinkModal(true)}
                            className="min-h-[44px] px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
                        >
                            <span>+ Masukkan ID Pelajar Anak</span>
                        </button>
                    </div>
                ) : isLoadingChildData ? (
                    <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
                        <div className="animate-spin text-3xl inline-block">⏳</div>
                        <p className="text-xs font-bold text-slate-500">
                            Sedang memuatkan data prestasi dan analisis anak...
                        </p>
                    </div>
                ) : (
                    <>
                        {/* =============================================================
                            1. KAD RINGKASAN UTAMA (OVERVIEW CARDS)
                            ============================================================= */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                            {/* Kad 1: Permainan Minggu Ini */}
                            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Permainan Minggu Ini
                                    </span>
                                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
                                        🎮
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                                        {stats.completedThisWeek} <span className="text-sm font-bold text-slate-400">Permainan</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700">
                                            ✓ Sesi selesai
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Kad 2: Purata Skor */}
                            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Purata Skor
                                    </span>
                                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                                        🎯
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-emerald-600 font-mono tracking-tight">
                                        {stats.overallAccuracy}%
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                                            ⭐ {stats.overallAccuracy >= 80 ? "Tahap Cemerlang" : "Prestasi Baik"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Kad 3: Jumlah Masa Aktif */}
                            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Jumlah Masa Aktif
                                    </span>
                                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg">
                                        ⏱️
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-sky-600 font-mono tracking-tight">
                                        {stats.totalActiveTime || "2j 15m"}
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700">
                                            🔥 {activeChildData?.streak || 1} Hari Berturut-turut
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =============================================================
                            2. GRAF TREND KEMAJUAN (PROGRESS TREND CHART)
                            ============================================================= */}
                        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg">
                                        📈
                                    </div>
                                    <div>
                                        <h2 className="text-base font-black text-slate-900">
                                            Trend Kemajuan Markah Mingguan
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Peningkatan markah anak dari semasa ke semasa sepanjang minggu ini.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <span>↗</span> +18% Peningkatan
                                    </span>
                                    <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                                        Sasaran: 80%
                                    </span>
                                </div>
                            </div>

                            {/* Grafik Visual Bar Chart */}
                            <div className="pt-4 pb-2">
                                <div className="relative h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-6">
                                    {/* Garisan Penanda Aras Sasaran 80% */}
                                    <div
                                        className="absolute left-2 right-2 sm:left-6 sm:right-6 border-b border-dashed border-slate-300 pointer-events-none flex items-center justify-end"
                                        style={{ bottom: "80%" }}
                                    >
                                        <span className="text-[10px] font-bold text-slate-400 bg-white px-1.5 rounded -mr-2">
                                            Sasaran 80%
                                        </span>
                                    </div>

                                    {weeklyTrend.map((item, idx) => {
                                        const isHovered = hoveredDay === idx;
                                        const isAboveTarget = item.score >= 80;
                                        return (
                                            <div
                                                key={idx}
                                                onMouseEnter={() => setHoveredDay(idx)}
                                                onMouseLeave={() => setHoveredDay(null)}
                                                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                                            >
                                                {/* Skor Tooltip */}
                                                <div
                                                    className={`absolute -top-7 text-[11px] font-mono font-black px-2 py-0.5 rounded-md shadow-xs transition-all pointer-events-none ${isHovered
                                                            ? "bg-slate-900 text-white scale-110 z-10"
                                                            : "bg-slate-100 text-slate-700 opacity-90 group-hover:opacity-100"
                                                        }`}
                                                >
                                                    {item.score}%
                                                </div>

                                                {/* Palang Bar */}
                                                <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden flex items-end h-full">
                                                    <div
                                                        className={`w-full rounded-t-xl transition-all duration-500 ${isAboveTarget
                                                                ? "bg-gradient-to-t from-emerald-500 to-teal-400 group-hover:from-emerald-600 group-hover:to-teal-500"
                                                                : "bg-gradient-to-t from-sky-500 to-indigo-400 group-hover:from-sky-600 group-hover:to-indigo-500"
                                                            } ${isHovered ? "brightness-105 shadow-sm" : ""}`}
                                                        style={{ height: `${item.score}%` }}
                                                    />
                                                </div>

                                                {/* Label Hari */}
                                                <span
                                                    className={`text-xs mt-2 font-bold transition-colors ${isHovered ? "text-indigo-600 font-black" : "text-slate-500"
                                                        }`}
                                                >
                                                    {item.day}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Info Kapsul Ringkas Bawah Carta */}
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                                        <span>Mencapai Sasaran (≥80%)</span>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                                        <span>Perlu Ditingkatkan</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* =============================================================
                            3. ANALISIS PRESTASI SIFIR (MATH ANALYTICS)
                            ============================================================= */}
                        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
                            {/* Header & Rekod Terpantas / Skor Tertinggi */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
                                        ⚡
                                    </div>
                                    <div>
                                        <h2 className="text-base font-black text-slate-900">
                                            Analisis Prestasi Sifir
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Kepantasan congak dan tahap penguasaan mengikut sifir (1 - 12).
                                        </p>
                                    </div>
                                </div>

                                {/* Dua Rekod Utama: Masa Terpantas & Skor Tertinggi */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                    <div className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                                        <span className="text-base">⏱️</span>
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-slate-400 block leading-none">
                                                Masa Terpantas
                                            </span>
                                            <span className="text-sm font-black font-mono text-indigo-700">
                                                {mathAnalytics.fastestTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                                        <span className="text-base">🏆</span>
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-slate-400 block leading-none">
                                                Skor Tertinggi
                                            </span>
                                            <span className="text-sm font-black font-mono text-amber-600">
                                                {mathAnalytics.highScore} XP
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Butang Penapis Sifir */}
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="text-xs font-black text-slate-700">
                                    Pecahan Penguasaan Sifir 1 - 12
                                </span>
                                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                                    <button
                                        type="button"
                                        onClick={() => setSifirFilter("all")}
                                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${sifirFilter === "all"
                                                ? "bg-white text-slate-900 shadow-xs font-black"
                                                : "text-slate-500 hover:text-slate-800"
                                            }`}
                                    >
                                        Semua (12)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSifirFilter("latihan")}
                                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${sifirFilter === "latihan"
                                                ? "bg-amber-500 text-white shadow-xs font-black"
                                                : "text-slate-500 hover:text-amber-700"
                                            }`}
                                    >
                                        Perlu Latihan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSifirFilter("cemerlang")}
                                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${sifirFilter === "cemerlang"
                                                ? "bg-emerald-600 text-white shadow-xs font-black"
                                                : "text-slate-500 hover:text-emerald-700"
                                            }`}
                                    >
                                        Cemerlang
                                    </button>
                                </div>
                            </div>

                            {/* Grid 12 Kad Sifir Ringkas & Visual */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                                {filteredTables.map((item) => {
                                    const isCemerlang = item.status === "cemerlang";
                                    const isLatihan = item.status === "latihan";

                                    const badgeBg = isCemerlang
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : isLatihan
                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                            : "bg-sky-50 text-sky-700 border-sky-200";

                                    const barColor = isCemerlang
                                        ? "bg-emerald-500"
                                        : isLatihan
                                            ? "bg-amber-500"
                                            : "bg-sky-500";

                                    return (
                                        <div
                                            key={item.table}
                                            className="p-3 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-white transition-all flex flex-col justify-between gap-2 shadow-xs"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black text-slate-800 font-mono">
                                                    Sifir {item.table}
                                                </span>
                                                <span className="text-xs font-mono font-bold text-slate-400">
                                                    {item.accuracy}%
                                                </span>
                                            </div>

                                            {/* Mini Progress Bar */}
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${barColor}`}
                                                    style={{ width: `${item.accuracy}%` }}
                                                />
                                            </div>

                                            {/* Status Tag */}
                                            <span
                                                className={`text-[10px] font-bold text-center py-1 rounded-lg border ${badgeBg}`}
                                            >
                                                {isCemerlang ? "✓ Cemerlang" : isLatihan ? "⚠️ Perlu Latihan" : "• Baik"}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* =============================================================
                            4. ANALISIS PRESTASI SPELLING BEE (SPELLING ANALYTICS)
                            ============================================================= */}
                        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5">
                            {/* Header & Ketepatan Ejaan */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                                        🐝
                                    </div>
                                    <div>
                                        <h2 className="text-base font-black text-slate-900">
                                            Analisis Prestasi Spelling Bee
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Ketepatan ejaan dan rekod perkataan sains yang perlu diperkukuh.
                                        </p>
                                    </div>
                                </div>

                                {/* Kad Ketepatan Ejaan Keseluruhan */}
                                <div className="px-4 py-2 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-2.5">
                                    <span className="text-xl">🎯</span>
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-amber-800 block leading-none">
                                            Ketepatan Ejaan Keseluruhan
                                        </span>
                                        <span className="text-base font-black font-mono text-amber-900">
                                            {spellingAnalytics.accuracy}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* KOTAK KHAS: PERKATAAN YANG KERAP SALAH (WEAK VOCABULARY LOG) */}
                            <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">📋</span>
                                        <h3 className="text-xs sm:text-sm font-black text-slate-800">
                                            Perkataan Yang Kerap Salah (Weak Vocabulary Log)
                                        </h3>
                                    </div>
                                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                                        {spellingAnalytics.weakVocabularyLog?.length || 0} Perkataan
                                    </span>
                                </div>

                                {/* Senarai Perkataan Ringkas & Padat */}
                                {spellingAnalytics.weakVocabularyLog && spellingAnalytics.weakVocabularyLog.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                        {spellingAnalytics.weakVocabularyLog.map((item, idx) => {
                                            const isVoiceActive = playingWord === item.word;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all flex items-center justify-between gap-3 shadow-xs"
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="font-mono text-sm font-black text-slate-900 tracking-wide">
                                                                {item.word}
                                                            </span>
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                                                {item.theme || item.difficulty || "Sains Am"}
                                                            </span>
                                                        </div>

                                                        {/* Perbandingan ejaan salah vs betul */}
                                                        <div className="text-xs flex items-center gap-2 mt-1 font-mono">
                                                            <span className="text-slate-400 text-[11px]">Cubaan:</span>
                                                            <span className="line-through text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded text-[11px]">
                                                                {item.userAttempt || "(Tiada)"}
                                                            </span>
                                                            <span className="text-slate-400">➔</span>
                                                            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
                                                                {item.word}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Butang Audio Sebutan */}
                                                    <button
                                                        type="button"
                                                        onClick={() => playSpeechWord(item.word)}
                                                        className={`px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all active:scale-95 shrink-0 flex items-center gap-1.5 ${isVoiceActive
                                                                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                                                : "bg-slate-50 text-indigo-600 border-slate-200 hover:bg-indigo-50"
                                                            }`}
                                                        title="Dengar sebutan perkataan"
                                                    >
                                                        <span>🔊</span>
                                                        <span className="hidden sm:inline">
                                                            {isVoiceActive ? "Memainkan..." : "Sebutan"}
                                                        </span>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 bg-white rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                                        🎉 Tiada rekod perkataan salah. Semua ejaan berjaya dikuasai!
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* =========================================================================
                MODAL: PAUTKAN ANAK BAHARU (LINK CHILD MODAL)
                ========================================================================= */}
            {showLinkModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left space-y-4 anim-fade-in">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">➕</span>
                                <h3 className="text-base font-black text-slate-900">
                                    Pautkan ID Pelajar Anak
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowLinkModal(false)}
                                className="text-slate-400 hover:text-slate-600 text-sm font-black p-1"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed">
                            Sila masukkan <strong>ID Pelajar</strong> anak anda (contoh: <span className="font-mono font-bold text-indigo-600">STU-15542</span>). Anda boleh melihat ID ini pada halaman Profil murid di aplikasi Exploria.
                        </p>

                        {linkModalError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                                ⚠️ {linkModalError}
                            </div>
                        )}

                        <form onSubmit={handleLinkChildSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-slate-700 mb-1">
                                    ID Pelajar (Format: STU-XXXXX)
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="STU-15542"
                                    value={newChildIdInput}
                                    onChange={(e) => setNewChildIdInput(e.target.value.toUpperCase())}
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-base font-mono font-black text-slate-800 placeholder-slate-400 outline-none uppercase"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowLinkModal(false)}
                                    className="min-h-[44px] px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={linkModalLoading || !newChildIdInput.trim()}
                                    className="min-h-[44px] px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
                                >
                                    {linkModalLoading ? "Mengesahkan..." : "Pautkan Anak"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
