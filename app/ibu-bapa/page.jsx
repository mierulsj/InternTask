"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import {
    getCurrentParentSession,
    logoutParentSession,
    loginParentAccount,
    registerParentAccount,
    linkChildToParent,
    unlinkChildFromParent,
    getChildDashboardData,
    registerAndLinkChildToParent,
} from "../../lib/parentService";
import { playSpellingAudio } from "../../lib/spellingAudioService";

// Clean SVG Icons (Menggantikan emoji)
function IconParents({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-1.5a3.5 3.5 0 0 0-3-3.4" />
            <circle cx="18" cy="8.5" r="3" />
        </svg>
    );
}

function IconChild({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function IconPlusUser({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
    );
}

function IconChart({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
    );
}

function IconMath({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="16" y1="14" x2="16" y2="18" />
            <line x1="16" y1="10" x2="16" y2="10.01" />
            <line x1="12" y1="10" x2="12" y2="10.01" />
            <line x1="8" y1="10" x2="8" y2="10.01" />
            <line x1="12" y1="14" x2="12" y2="14.01" />
            <line x1="8" y1="14" x2="8" y2="14.01" />
            <line x1="12" y1="18" x2="12" y2="18.01" />
            <line x1="8" y1="18" x2="8" y2="18.01" />
        </svg>
    );
}

function IconSpell({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}

function IconGame({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="12" x2="10" y2="12" />
            <line x1="8" y1="10" x2="8" y2="14" />
            <line x1="15" y1="13" x2="15.01" y2="13" />
            <line x1="18" y1="11" x2="18.01" y2="11" />
            <rect x="2" y="6" width="20" height="12" rx="6" />
        </svg>
    );
}

function IconTarget({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function IconClock({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function IconRocket({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    );
}

function IconLogout({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

function IconMenu({ className = "w-6 h-6" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    );
}

function IconFlame({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
        </svg>
    );
}

function IconTrophy({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
            <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" />
        </svg>
    );
}

function IconVolume({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
    );
}

function IconClose({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function IconLink({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

function IconUnlink({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07l1.72-1.71" />
            <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
    );
}

function IconAlert({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

function IconCheck({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export default function ParentDashboardPage() {
    // Sesi Ibu Bapa & Status
    const isMounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
    const [parentSession, setParentSession] = useState(null);
    const [authMode, setAuthMode] = useState("login"); // "login" | "register"
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    // Modal Paut / Daftar Anak Baharu
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkModalTab, setLinkModalTab] = useState("existing"); // "existing" | "register"
    const [newChildIdInput, setNewChildIdInput] = useState("");
    const [linkModalLoading, setLinkModalLoading] = useState(false);
    const [linkModalError, setLinkModalError] = useState("");
    const [linkModalSuccess, setLinkModalSuccess] = useState("");

    // Borang Pendaftaran Anak Baharu
    const [newStudentForm, setNewStudentForm] = useState({
        name: "",
        ic: "",
        password: "",
        confirmPassword: "",
        schoolType: "SK",
        state: "",
        district: "",
        schoolName: "",
        customSchoolName: "",
    });
    const [showChildPassword, setShowChildPassword] = useState(false);

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
        const timer = setTimeout(() => {
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
        }, 0);

        return () => clearTimeout(timer);
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
        if (!selectedChildId) return;
        const timer = setTimeout(() => {
            loadChildAnalytics(selectedChildId);
        }, 0);
        return () => clearTimeout(timer);
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

    // Pautkan Anak Sedia Ada (Menyokong ID Pelajar STU-XXXXX atau No. IC)
    const handleLinkChildSubmit = async (e) => {
        e.preventDefault();
        if (!newChildIdInput.trim()) return;

        setLinkModalError("");
        setLinkModalSuccess("");
        setLinkModalLoading(true);

        try {
            const inputVal = newChildIdInput.trim();
            const res = await linkChildToParent(parentSession.email, inputVal);
            if (!res.success) {
                setLinkModalError(res.error || "Gagal memautkan akaun anak.");
                return;
            }

            const stuId = res.studentId || inputVal.toUpperCase();
            const updatedList = res.linkedStudentIds || [...childrenList, stuId];
            setChildrenList(updatedList);
            setSelectedChildId(stuId);
            setLinkModalSuccess(`Berjaya! Profil ${res.childName} (${stuId}) kini telah dipautkan.`);
            setNewChildIdInput("");

            setTimeout(() => {
                setShowLinkModal(false);
                setLinkModalSuccess("");
                loadChildAnalytics(stuId);
            }, 900);
        } catch {
            setLinkModalError("Ralat semasa menyambung ke pelayan.");
        } finally {
            setLinkModalLoading(false);
        }
    };

    // Daftar Murid Baharu & Automatik Pautkan ke Akaun Ibu Bapa
    const handleRegisterChildSubmit = async (e) => {
        e.preventDefault();
        setLinkModalError("");
        setLinkModalSuccess("");

        const cleanIC = newStudentForm.ic.replace(/\D/g, "");
        if (!newStudentForm.name.trim()) {
            setLinkModalError("Sila masukkan nama penuh anak.");
            return;
        }
        if (cleanIC.length < 6) {
            setLinkModalError("Sila masukkan No. Kad Pengenalan / MyKid anak yang sah.");
            return;
        }
        if (newStudentForm.password.length < 6) {
            setLinkModalError("Kata laluan mestilah sekurang-kurangnya 6 aksara.");
            return;
        }
        if (newStudentForm.password !== newStudentForm.confirmPassword) {
            setLinkModalError("Kata laluan dan pengesahan kata laluan tidak sepadan.");
            return;
        }

        setLinkModalLoading(true);

        try {
            const resolvedSchoolName = newStudentForm.schoolName === "LAIN_LAIN"
                ? newStudentForm.customSchoolName.trim()
                : newStudentForm.schoolName;

            const res = await registerAndLinkChildToParent(parentSession.email, {
                name: newStudentForm.name.trim(),
                ic: cleanIC,
                password: newStudentForm.password,
                schoolType: newStudentForm.schoolType,
                state: newStudentForm.state,
                district: newStudentForm.district,
                schoolName: resolvedSchoolName,
            });

            if (!res.success) {
                setLinkModalError(res.error || "Pendaftaran akaun anak gagal.");
                setLinkModalLoading(false);
                return;
            }

            const stuId = res.studentId;
            const updatedList = res.linkedStudentIds || [...childrenList, stuId];
            setChildrenList(updatedList);
            setSelectedChildId(stuId);
            setLinkModalSuccess(`Tahniah! Akaun ${res.childName} (${stuId}) berjaya didaftarkan dan dipautkan secara automatik.`);

            // Reset borang pendaftaran
            setNewStudentForm({
                name: "",
                ic: "",
                password: "",
                confirmPassword: "",
                schoolType: "SK",
                state: "",
                district: "",
                schoolName: "",
                customSchoolName: "",
            });

            setTimeout(() => {
                setShowLinkModal(false);
                setLinkModalSuccess("");
                loadChildAnalytics(stuId);
            }, 1200);
        } catch {
            setLinkModalError("Ralat semasa menyambung ke pelayan untuk pendaftaran anak.");
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
                            <IconChild className="w-4 h-4 text-slate-500" />
                            <span>Log Masuk Pelajar</span>
                        </Link>
                        <button
                            type="button"
                            className="flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white text-[#0088cc] shadow-xs border border-slate-200/80"
                        >
                            <IconParents className="w-4 h-4 text-[#0088cc]" />
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
                            <IconAlert className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>{authError}</span>
                        </div>
                    )}
                    {authSuccessMsg && (
                        <div className="mb-4 bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                            <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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
                                        Anak anda boleh mendapatkan ID unik ini pada profil aplikasi Exploria mereka. Anda juga boleh memautkannya selepas log masuk.
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
                            <IconChild className="w-4 h-4 text-slate-500" />
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

    // Drawer Component Content Helper
    const renderDrawerContent = (isMobile = false) => (
        <div className="flex flex-col h-full bg-white select-none">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <img
                        src="/logoexploria.png"
                        alt="Exploria STEM"
                        className="h-8 object-contain"
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                        Ibu Bapa
                    </span>
                </div>
                {isMobile && (
                    <button
                        type="button"
                        onClick={() => setIsDrawerOpen(false)}
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                        title="Tutup Menu"
                    >
                        <IconClose className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Scrollable Children & Navigation Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Child Selection Section */}
                <div>
                    <div className="flex items-center justify-between mb-2.5 px-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                            Profil Anak ({childrenList.length})
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setNewChildIdInput("");
                                setLinkModalError("");
                                setLinkModalSuccess("");
                                setShowLinkModal(true);
                                if (isMobile) setIsDrawerOpen(false);
                            }}
                            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                            <IconPlusUser className="w-3.5 h-3.5" />
                            <span>Paut Anak</span>
                        </button>
                    </div>

                    {childrenList.length === 0 ? (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                            <p className="text-xs text-slate-500 font-medium">
                                Belum ada profil anak dipautkan
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowLinkModal(true);
                                    if (isMobile) setIsDrawerOpen(false);
                                }}
                                className="mt-2 text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
                            >
                                <IconPlusUser className="w-3.5 h-3.5" />
                                <span>Pautkan Sekarang</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            {childrenList.map((id) => {
                                const isSelected = id === selectedChildId;
                                const isCurrentActive = isSelected && activeChildData?.name;
                                const displayName = isCurrentActive ? activeChildData.name : `Anak (${id})`;
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedChildId(id);
                                            if (isMobile) setIsDrawerOpen(false);
                                        }}
                                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                                            isSelected
                                                ? "bg-sky-50/90 border-sky-300 text-sky-950 shadow-xs ring-1 ring-sky-200"
                                                : "bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div
                                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black ${
                                                    isSelected
                                                        ? "bg-[#0099e5] text-white shadow-xs"
                                                        : "bg-slate-100 text-slate-500"
                                                }`}
                                            >
                                                <IconChild className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-black truncate leading-tight">
                                                    {displayName}
                                                </p>
                                                <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                                                    {id}
                                                </p>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <span className="w-2 h-2 rounded-full bg-[#0099e5] shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Quick Unlink for Selected Child */}
                {selectedChildId && (
                    <div className="pt-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => {
                                handleUnlinkChild(selectedChildId);
                                if (isMobile) setIsDrawerOpen(false);
                            }}
                            className="w-full py-2 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <IconUnlink className="w-3.5 h-3.5" />
                            <span>Putus Pautan Profil</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Parent Account Card */}
            <div className="p-4 border-t border-slate-200/90 bg-slate-50/70">
                <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <IconParents className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-black text-slate-800 truncate leading-tight">
                            {parentSession.name || "Ibu Bapa"}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate font-mono">
                            {parentSession.email}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <Link
                        href="/belajar"
                        className="py-2 px-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center gap-1.5 transition-all text-center"
                        title="Buka mod pembelajaran anak"
                    >
                        <IconRocket className="w-3.5 h-3.5 text-sky-600" />
                        <span>Mod Pelajar</span>
                    </Link>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="py-2 px-2.5 rounded-xl text-xs font-bold bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                        <IconLogout className="w-3.5 h-3.5" />
                        <span>Log Keluar</span>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans select-none text-left">
            {/* =============================================================
                DRAWER BELAH KIRI (DESKTOP SIDEBAR)
                ============================================================= */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200/90 h-screen sticky top-0 shrink-0 z-30">
                {renderDrawerContent(false)}
            </aside>

            {/* =============================================================
                MOBILE SLIDE-IN DRAWER OVERLAY
                ============================================================= */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
                        onClick={() => setIsDrawerOpen(false)}
                    />
                    <aside className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 anim-fade-in">
                        {renderDrawerContent(true)}
                    </aside>
                </div>
            )}

            {/* =============================================================
                MAIN CONTENT AREA
                ============================================================= */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Header */}
                <header className="md:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(true)}
                            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                            aria-label="Buka Menu Profil Anak"
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                                <IconParents className="w-4 h-4" />
                            </div>
                            <span className="font-black text-slate-900 text-sm">Portal Ibu Bapa</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/belajar"
                            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            title="Mod Pelajar"
                        >
                            <IconRocket className="w-4 h-4 text-sky-600" />
                        </Link>
                    </div>
                </header>

                {/* Dashboard Scrollable Body */}
                <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                    {/* =============================================================
                        HERO BANNER - KEMAS, RINGKAS & LAPANG
                        ============================================================= */}
                    <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-white rounded-3xl p-5 sm:p-7 border border-sky-100 shadow-xs relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-sky-200 text-xs font-bold text-sky-800 mb-2.5 shadow-2xs">
                                    <IconParents className="w-3.5 h-3.5 text-sky-600" />
                                    <span>Portal Penjaga Exploria</span>
                                </div>
                                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                    Selamat Kembali, {parentSession.name || "Penjaga"}
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                                    {activeChildData?.name
                                        ? `Memantau statistik kemajuan & analisis pembelajaran untuk ${activeChildData.name}.`
                                        : "Pantau prestasi dan rekod pembelajaran anak anda secara langsung."}
                                </p>
                            </div>

                            {activeChildData && (
                                <div className="flex items-center gap-3.5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/90 shadow-2xs shrink-0">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
                                        {activeChildData.name ? activeChildData.name.charAt(0).toUpperCase() : "A"}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-black text-slate-900 text-sm truncate">{activeChildData.name}</span>
                                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                                                {activeChildData.studentId}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 font-medium">
                                            <span>Tahap {activeChildData.level || 1}</span>
                                            <span>•</span>
                                            <span>{activeChildData.xp || 0} XP</span>
                                            <span>•</span>
                                            <span className="text-amber-600 font-bold inline-flex items-center gap-0.5">
                                                <IconFlame className="w-3 h-3 text-amber-500" />
                                                <span>{activeChildData.streak || 1} Hari</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sekiranya tiada anak dipautkan */}
                    {childrenList.length === 0 ? (
                        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-dashed border-indigo-200 text-center space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                                <IconLink className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-black text-slate-800">
                                Pautkan ID Pelajar Anak Anda Sekarang
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                                Setiap murid Exploria mempunyai ID Pelajar unik (contoh: <strong className="font-mono text-indigo-600">STU-15542</strong>) atau No. MyKid yang terpapar pada profil aplikasi mereka.
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowLinkModal(true)}
                                className="min-h-[44px] px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
                            >
                                <IconPlusUser className="w-4 h-4" />
                                <span>Pautkan Profil Anak</span>
                            </button>
                        </div>
                    ) : isLoadingChildData ? (
                        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
                            <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mx-auto" />
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
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <IconGame className="w-5 h-5 text-indigo-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                                            {stats.completedThisWeek} <span className="text-sm font-bold text-slate-400">Permainan</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700">
                                                Sesi pembelajaran selesai
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
                                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <IconTarget className="w-5 h-5 text-emerald-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-emerald-600 font-mono tracking-tight">
                                            {stats.overallAccuracy}%
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                                                {stats.overallAccuracy >= 80 ? "Tahap Cemerlang" : "Prestasi Baik"}
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
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                                            <IconClock className="w-5 h-5 text-sky-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-sky-600 font-mono tracking-tight">
                                            {stats.totalActiveTime || "2j 15m"}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                <IconFlame className="w-3.5 h-3.5 text-amber-500" />
                                                <span>{activeChildData?.streak || 1} Hari Berturut-turut</span>
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
                                        <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                                            <IconChart className="w-5 h-5 text-sky-600" />
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
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <IconMath className="w-5 h-5 text-indigo-600" />
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
                                            <IconClock className="w-4 h-4 text-indigo-500" />
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
                                            <IconTrophy className="w-4 h-4 text-amber-500" />
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
                                                    {isCemerlang ? "Cemerlang" : isLatihan ? "Perlu Latihan" : "Baik"}
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
                                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                            <IconSpell className="w-5 h-5 text-amber-600" />
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
                                        <IconTarget className="w-5 h-5 text-amber-800" />
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
                                            <IconSpell className="w-4 h-4 text-indigo-600" />
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
                                                            <IconVolume className="w-3.5 h-3.5" />
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
                                            Tiada rekod perkataan salah. Semua ejaan berjaya dikuasai!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>

            {/* =========================================================================
                MODAL: PAUTKAN ATAU DAFTAR ANAK BAHARU (LINK / REGISTER CHILD MODAL)
                ========================================================================= */}
            {/* =========================================================================
                MODAL: PAUTKAN / DAFTAR ANAK (RINGKAS & KEMAS)
                ========================================================================= */}
            {showLinkModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 text-left anim-fade-in overflow-hidden">
                        
                        {/* 1. Header */}
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-black text-slate-900">
                                Pautkan Profil Anak
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowLinkModal(false);
                                    setLinkModalError("");
                                    setLinkModalSuccess("");
                                }}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-black cursor-pointer"
                                title="Tutup"
                            >
                                ✕
                            </button>
                        </div>

                        {/* 2. Pilihan Tab */}
                        <div className="px-5 pt-3 pb-1">
                            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLinkModalTab("existing");
                                        setLinkModalError("");
                                        setLinkModalSuccess("");
                                    }}
                                    className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all cursor-pointer text-center ${
                                        linkModalTab === "existing"
                                            ? "bg-white text-indigo-700 shadow-xs"
                                            : "text-slate-500 hover:text-slate-800"
                                    }`}
                                >
                                    ID Sedia Ada
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLinkModalTab("register");
                                        setLinkModalError("");
                                        setLinkModalSuccess("");
                                    }}
                                    className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all cursor-pointer text-center ${
                                        linkModalTab === "register"
                                            ? "bg-white text-indigo-700 shadow-xs"
                                            : "text-slate-500 hover:text-slate-800"
                                    }`}
                                >
                                    Daftar Baharu
                                </button>
                            </div>
                        </div>

                        {/* 3. Kandungan Borang */}
                        <div className="p-5 space-y-3.5">
                            {linkModalError && (
                                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                                    <IconAlert className="w-4 h-4 text-rose-600 shrink-0" />
                                    <span>{linkModalError}</span>
                                </div>
                            )}

                            {linkModalSuccess && (
                                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                    <IconCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>{linkModalSuccess}</span>
                                </div>
                            )}

                            {/* TAB 1: ID SEDIA ADA */}
                            {linkModalTab === "existing" && (
                                <form onSubmit={handleLinkChildSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                                            ID Pelajar atau No. MyKid
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="STU-XXXXX / No. MyKid"
                                            value={newChildIdInput}
                                            onChange={(e) => setNewChildIdInput(e.target.value.toUpperCase())}
                                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-800 placeholder-slate-400 outline-none uppercase"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => setShowLinkModal(false)}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={linkModalLoading || !newChildIdInput.trim()}
                                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
                                        >
                                            {linkModalLoading ? "Mengesahkan..." : "Pautkan Anak"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* TAB 2: DAFTAR BAHARU */}
                            {linkModalTab === "register" && (
                                <form onSubmit={handleRegisterChildSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 mb-1">
                                            Nama Penuh Anak
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Nama anak"
                                            value={newStudentForm.name}
                                            onChange={(e) =>
                                                setNewStudentForm({ ...newStudentForm, name: e.target.value })
                                            }
                                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-slate-700 mb-1">
                                            No. MyKid / Kad Pengenalan
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={14}
                                            placeholder="12 digit nombor MyKid"
                                            value={newStudentForm.ic}
                                            onChange={(e) =>
                                                setNewStudentForm({ ...newStudentForm, ic: e.target.value })
                                            }
                                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-mono font-bold text-slate-800 placeholder-slate-400 outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2.5">
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="text-xs font-black text-slate-700">
                                                    Kata Laluan
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowChildPassword(!showChildPassword)}
                                                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                                >
                                                    {showChildPassword ? "Sembunyi" : "Lihat"}
                                                </button>
                                            </div>
                                            <input
                                                type={showChildPassword ? "text" : "password"}
                                                required
                                                placeholder="Min 6 aksara"
                                                value={newStudentForm.password}
                                                onChange={(e) =>
                                                    setNewStudentForm({ ...newStudentForm, password: e.target.value })
                                                }
                                                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-slate-700 mb-1">
                                                Sahkan Kata Laluan
                                            </label>
                                            <input
                                                type={showChildPassword ? "text" : "password"}
                                                required
                                                placeholder="Ulang kata laluan"
                                                value={newStudentForm.confirmPassword}
                                                onChange={(e) =>
                                                    setNewStudentForm({
                                                        ...newStudentForm,
                                                        confirmPassword: e.target.value,
                                                    })
                                                }
                                                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-slate-700 mb-1">
                                            Nama Sekolah (Pilihan)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: SK Taman Universiti"
                                            value={newStudentForm.schoolName}
                                            onChange={(e) =>
                                                setNewStudentForm({ ...newStudentForm, schoolName: e.target.value })
                                            }
                                            className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 outline-none"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => setShowLinkModal(false)}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={linkModalLoading || !newStudentForm.name.trim() || !newStudentForm.ic.trim()}
                                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
                                        >
                                            {linkModalLoading ? "Mendaftar..." : "Daftar & Pautkan"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
