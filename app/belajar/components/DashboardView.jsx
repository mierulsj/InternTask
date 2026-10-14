"use client";

import React, { useState } from "react";
import {
    GraphicBackArrow,
    GraphicLightningBolt,
    GraphicBookOpen,
    GraphicCoin,
    GraphicNatureLeaf,
    GraphicSaturnPlanet,
    GraphicStarMedal,
} from "./Graphics";
import ProfileAvatarFrame, { BORDER_STYLES } from "./ProfileAvatarFrame";
import {
    VectorSchool,
    VectorCrown,
    VectorPencil,
    VectorTrophy,
    VectorTarget,
    VectorFlame,
    VectorStar,
    VectorBee,
    VectorMath,
    VectorPlant,
    VectorClipboard,
} from "./GameIcons";
import { SHOP_CATALOG } from "../../../lib/shopService";
import { getLevelDetails } from "../../../lib/levelService";

export default function DashboardView({
    studentName = "",
    studentIC = "",
    studentSchool = "",
    studentLevel = 1,
    studentXP = 100,
    studentStreak = 1,
    readTopics = [],
    setStudentName,
    isEditingName = false,
    setIsEditingName,
    tempStudentName = "",
    setTempStudentName,
    dashboardActiveTab = "records", // "records" | "badges" | "account"
    setDashboardActiveTab,
    selectedBadgeModal = null,
    setSelectedBadgeModal,
    quizHighScore = 0,
    solarScore = 0,
    solarSubmitted = false,
    plantScore = 0,
    plantSubmitted = false,
    spellingScore = 0,
    spellingSubmitted = false,
    mathScore = 0,
    mathSubmitted = false,
    studentCoins = 50,
    equippedItems = { border: "border_cadet", avatar: "avatar_astro_1", pet: null },
    onNavigate,
    onOpenSettings,
    t = (bm) => bm,
    playAudioFeedback,
    isLoggedIn = false,
    onLogout,
}) {
    const [copiedStuId, setCopiedStuId] = useState(false);
    const [activeTab, setActiveTab] = useState(dashboardActiveTab === "badges" || dashboardActiveTab === "account" ? dashboardActiveTab : "records");

    const equippedBorderId = equippedItems?.border || "border_cadet";
    const equippedAvatarItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.avatar) || { id: "avatar_astro_1", name: "Angkasawan Perintis" };
    const equippedPetItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.pet);
    const readTopicsCount = Array.isArray(readTopics) ? readTopics.length : 0;
    const effectiveXP = isLoggedIn ? (studentXP ?? 100) : 0;
    const effectiveStreak = isLoggedIn ? (studentStreak || 1) : 0;
    const effectiveQuizScore = quizHighScore || 0;
    const effectiveSolarScore = (solarSubmitted && solarScore > 0) ? solarScore : 0;
    const effectivePlantScore = (plantSubmitted && plantScore > 0) ? plantScore : 0;
    const effectiveSpellingScore = (spellingSubmitted && spellingScore > 0) ? spellingScore : 0;
    const effectiveMathScore = (mathSubmitted && mathScore > 0) ? mathScore : (mathScore || 0);

    const levelInfo = getLevelDetails(effectiveXP);
    const levelNum = levelInfo.level;
    const percentage = Math.min(100, Math.round((effectiveXP / 15000) * 100));

    // Stars calculation
    const solarStars = Math.min(8, Math.floor((effectiveSolarScore / 800) * 8));
    const quizStars = Math.min(10, Math.floor(effectiveQuizScore / 150));
    const topicStars = Math.min(6, readTopicsCount * 3);
    const totalStars = Math.min(24, solarStars + quizStars + topicStars);

    // Badges
    const badges = [
        {
            id: "welcome_badge",
            name: "Penjelajah Baharu",
            level: "Gangsa",
            xp: "+100 XP",
            unlocked: isLoggedIn,
            icon: <GraphicStarMedal className="w-8 h-8" />,
            requirement: "Daftar akaun murid di Exploria.",
        },
        {
            id: "solar_master",
            name: "Pakar Sistem Suria",
            level: "Emas",
            xp: "+300 XP",
            unlocked: solarSubmitted && solarScore >= 800,
            icon: <GraphicSaturnPlanet className="w-8 h-8" />,
            requirement: "Susun 8 planet dengan markah 800/800.",
        },
        {
            id: "botany_master",
            name: "Ahli Botani Cilik",
            level: "Emas",
            xp: "+300 XP",
            unlocked: plantSubmitted && plantScore >= 500,
            icon: <GraphicNatureLeaf className="w-8 h-8" />,
            requirement: "Selesaikan Makmal Tumbuhan sekurang-kurangnya 500 mata.",
        },
        {
            id: "speed_demon",
            name: "Minda Kilat 20s",
            level: "Emas",
            xp: "+250 XP",
            unlocked: effectiveQuizScore >= 500,
            icon: <GraphicLightningBolt className="w-8 h-8 text-amber-500" />,
            requirement: "Capai 500 mata dalam Kuiz Pantas 20s.",
        },
        {
            id: "knowledge_seeker",
            name: "Pencari Ilmu STEM",
            level: "Perak",
            xp: "+200 XP",
            unlocked: readTopicsCount >= 2,
            icon: <GraphicBookOpen className="w-8 h-8 text-[#0099e5]" />,
            requirement: "Selesaikan bacaan semua topik nota.",
        },
        {
            id: "math_master",
            name: "Jaguh Sifir",
            level: "Emas",
            xp: "+300 XP",
            unlocked: mathSubmitted && mathScore > 0,
            icon: <VectorMath className="w-8 h-8 text-purple-500" />,
            requirement: "Jawab Kuiz Sifir Kilat dengan betul.",
        },
    ];

    const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

    // Senarai Kad Skor Aktiviti Ringkas
    const activityScores = [
        {
            id: "plant",
            title: "Makmal Tumbuhan",
            score: effectivePlantScore,
            maxScore: 800,
            unit: "PTS",
            icon: <VectorPlant className="w-5 h-5" />,
            color: "emerald",
            done: plantSubmitted && plantScore > 0,
            view: "plantActivity",
            btnLabel: plantSubmitted && plantScore > 0 ? "Main Semula" : "Mula",
        },
        {
            id: "solar",
            title: "Sistem Suria",
            score: effectiveSolarScore,
            maxScore: 800,
            unit: "PTS",
            icon: <GraphicSaturnPlanet className="w-5 h-5" />,
            color: "indigo",
            done: solarSubmitted && solarScore > 0,
            view: "solarDragDrop",
            btnLabel: solarSubmitted && solarScore > 0 ? "Main Semula" : "Mula",
        },
        {
            id: "quiz",
            title: "Kuiz Pantas 20s",
            score: effectiveQuizScore,
            maxScore: null,
            unit: "PTS",
            icon: <GraphicLightningBolt className="w-5 h-5" />,
            color: "amber",
            done: effectiveQuizScore > 0,
            view: "quizList",
            btnLabel: effectiveQuizScore > 0 ? "Cabar Semula" : "Mula",
        },
        {
            id: "math",
            title: "Sifir Kilat",
            score: effectiveMathScore,
            maxScore: null,
            unit: "PTS",
            icon: <VectorMath className="w-5 h-5" />,
            color: "rose",
            done: mathSubmitted && mathScore > 0,
            view: "mathQuiz",
            btnLabel: mathSubmitted && mathScore > 0 ? "Main Semula" : "Mula",
        },
        {
            id: "spelling",
            title: "Spelling Bee",
            score: effectiveSpellingScore,
            maxScore: null,
            unit: "PTS",
            icon: <VectorBee className="w-5 h-5" />,
            color: "amber",
            done: spellingSubmitted && spellingScore > 0,
            view: "spellingBee",
            btnLabel: spellingSubmitted && spellingScore > 0 ? "Main Semula" : "Mula",
        },
    ];

    const studentIdString = studentIC ? `STU-${studentIC.length >= 5 ? studentIC.slice(-5) : studentIC.padStart(5, "0")}` : "STU-15542";

    return (
        <div className="w-full max-w-md sm:max-w-xl mx-auto space-y-4 anim-fade-in text-left select-none pb-8">

            {/* 1. HEADER RINGKAS DENGAN BUTANG KEMBALI & TETAPAN */}
            <div className="px-1 pt-1 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => {
                            if (playAudioFeedback) playAudioFeedback("tap");
                            if (onNavigate) onNavigate("menu");
                        }}
                        className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all group"
                    >
                        <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Kembali</span>
                    </button>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0099e5] tracking-tight">
                        Profil Murid
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    {isLoggedIn && onOpenSettings && (
                        <button
                            type="button"
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("tap");
                                onOpenSettings();
                            }}
                            className="p-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all"
                            title="Buka Tetapan Murid"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* 2. KAD PROFIL COMEL & BERSIH (PROFILE CARD) */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
                {/* Avatar Frame di Tengah */}
                <div className="relative mb-2">
                    <ProfileAvatarFrame
                        avatar={isLoggedIn ? (equippedAvatarItem?.id || "avatar_astro_1") : "avatar_astro_1"}
                        borderId={equippedBorderId}
                        pet={equippedPetItem}
                        size="md"
                        level={levelNum}
                        interactive={false}
                    />
                </div>

                {/* Nama Pelajar */}
                <div className="flex items-center gap-1.5 justify-center mt-1">
                    {isEditingName ? (
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={tempStudentName}
                                onChange={(e) => setTempStudentName(e.target.value)}
                                maxLength={20}
                                className="bg-slate-100 border border-slate-300 rounded-lg px-2 py-0.5 text-slate-900 text-sm font-black outline-none"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const val = tempStudentName.trim() || "Penjelajah";
                                        if (setStudentName) setStudentName(val);
                                        if (setIsEditingName) setIsEditingName(false);
                                        try { localStorage.setItem("exploria_student_name", val); } catch {}
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    const val = tempStudentName.trim() || "Penjelajah";
                                    if (setStudentName) setStudentName(val);
                                    if (setIsEditingName) setIsEditingName(false);
                                    try { localStorage.setItem("exploria_student_name", val); } catch {}
                                }}
                                className="px-2 py-0.5 bg-[#0099e5] text-white text-xs font-black rounded-lg cursor-pointer"
                            >
                                OK
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            <h3 className="text-lg font-black text-slate-800">
                                {isLoggedIn ? (studentName || "Penjelajah") : "Penjelajah Tetamu"}
                            </h3>
                            {isLoggedIn && (
                                <button
                                    onClick={() => {
                                        if (setTempStudentName) setTempStudentName(studentName);
                                        if (setIsEditingName) setIsEditingName(true);
                                    }}
                                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    title="Edit Nama"
                                >
                                    <VectorPencil className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Lencana Gelaran & Tahap */}
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0099e5] border border-sky-200">
                        Tahap {levelNum} • {levelInfo.title || "Kadet STEM"}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {BORDER_STYLES[equippedBorderId]?.name || "Besi Perintis"}
                    </span>
                </div>

                {/* Bar Kemajuan XP Sederhana */}
                <div className="w-full max-w-xs mt-3">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                        <span>XP Terkumpul</span>
                        <span className="font-mono text-[#0099e5] font-black">{effectiveXP.toLocaleString()} / 15,000</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                        <div
                            className="h-full bg-gradient-to-r from-[#0099e5] to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                {/* 3 Petak Statistik Ringkas (Streak, Koin, Bintang) */}
                <div className="grid grid-cols-3 gap-2 w-full max-w-xs mt-4 pt-3 border-t border-slate-100">
                    <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-2 text-center">
                        <VectorFlame className="w-4 h-4 mx-auto text-amber-500 mb-0.5" />
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Streak</span>
                        <span className="text-xs font-black text-amber-950 font-mono">{effectiveStreak} Hari</span>
                    </div>
                    <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-2 text-center">
                        <GraphicCoin className="w-4 h-4 mx-auto mb-0.5" />
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Koin</span>
                        <span className="text-xs font-black text-amber-950 font-mono">{studentCoins}</span>
                    </div>
                    <div className="bg-sky-50/70 border border-sky-200/60 rounded-2xl p-2 text-center">
                        <VectorStar className="w-4 h-4 mx-auto text-sky-500 mb-0.5" />
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Bintang</span>
                        <span className="text-xs font-black text-sky-950 font-mono">{totalStars} / 24</span>
                    </div>
                </div>
            </div>

            {/* 3. TAB NAVIGASI RINGKAS (HANYA 3 TAB: AKTIVITI, LENCANA, AKAUN) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
                {[
                    { id: "records", label: "Aktiviti", icon: <VectorTarget className="w-3.5 h-3.5" /> },
                    { id: "badges", label: "Lencana", icon: <VectorTrophy className="w-3.5 h-3.5" />, count: unlockedBadgesCount },
                    { id: "account", label: "Akaun", icon: <VectorSchool className="w-3.5 h-3.5" /> },
                ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("tap");
                                setActiveTab(tab.id);
                                if (setDashboardActiveTab) setDashboardActiveTab(tab.id);
                            }}
                            className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                                isActive
                                    ? "bg-white text-[#0099e5] shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                                    isActive ? "bg-sky-100 text-[#0099e5]" : "bg-slate-200 text-slate-600"
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* TAB 1: REKOD SKOR AKTIVITI */}
            {activeTab === "records" && (
                <div className="space-y-2.5 pt-1">
                    {activityScores.map((act) => (
                        <div
                            key={act.id}
                            className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                                    {act.icon}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-xs sm:text-sm font-black text-slate-800 truncate">
                                        {act.title}
                                    </h4>
                                    <div className="text-xs font-black text-[#0099e5] font-mono mt-0.5">
                                        {act.score}{act.maxScore ? <span className="text-slate-400 font-bold"> / {act.maxScore}</span> : ""} {act.unit}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (playAudioFeedback) playAudioFeedback("tap");
                                    if (onNavigate) onNavigate(act.view);
                                }}
                                className="px-3.5 py-1.5 bg-[#0099e5] hover:bg-[#0284c7] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all shrink-0"
                            >
                                {act.btnLabel}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB 2: PETI LENCANA */}
            {activeTab === "badges" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("sparkle");
                                if (setSelectedBadgeModal) setSelectedBadgeModal(badge);
                            }}
                            className={`bg-white rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col items-center text-center shadow-2xs active:scale-95 ${
                                badge.unlocked
                                    ? "border-amber-200 hover:border-amber-400"
                                    : "border-slate-100 opacity-60"
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2 ${
                                badge.unlocked ? "bg-amber-50" : "bg-slate-100 grayscale"
                            }`}>
                                {badge.icon}
                            </div>
                            <h4 className="text-xs font-black text-slate-800 line-clamp-1">
                                {badge.name}
                            </h4>
                            <span className="text-[10px] font-bold text-amber-600 mt-0.5">
                                {badge.xp}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB 3: MAKLUMAT AKAUN & TETAPAN */}
            {activeTab === "account" && (
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-3 pt-3">
                    {/* ID Pelajar */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                ID Pelajar
                            </span>
                            <span className="text-sm font-black font-mono text-slate-800">
                                {studentIdString}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (navigator?.clipboard) {
                                    navigator.clipboard.writeText(studentIdString);
                                    setCopiedStuId(true);
                                    setTimeout(() => setCopiedStuId(false), 2000);
                                }
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg cursor-pointer"
                        >
                            {copiedStuId ? "Disalin ✓" : "Salin"}
                        </button>
                    </div>

                    {/* Sekolah */}
                    {studentSchool && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Sekolah
                            </span>
                            <span className="text-xs font-black text-slate-700 block mt-0.5">
                                {studentSchool}
                            </span>
                        </div>
                    )}

                    {/* Butang Tindakan Akaun */}
                    <div className="pt-2 space-y-2">
                        {isLoggedIn && onOpenSettings && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (playAudioFeedback) playAudioFeedback("tap");
                                    onOpenSettings();
                                }}
                                className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-[#0099e5] border border-sky-200 font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                <span>Tetapan Murid (Tukar Kata Laluan)</span>
                            </button>
                        )}

                        {!isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (playAudioFeedback) playAudioFeedback("tap");
                                        if (onNavigate) onNavigate("login");
                                    }}
                                    className="flex-1 py-2.5 bg-[#0099e5] hover:bg-[#0088cc] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                                >
                                    Log Masuk
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (playAudioFeedback) playAudioFeedback("tap");
                                        if (onNavigate) onNavigate("register");
                                    }}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                                >
                                    Daftar Akaun
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    if (playAudioFeedback) playAudioFeedback("tap");
                                    if (onLogout) onLogout();
                                }}
                                className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                Log Keluar
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL BUTIRAN LENCANA */}
            {selectedBadgeModal && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 anim-fade-in"
                    onClick={() => {
                        if (playAudioFeedback) playAudioFeedback("tap");
                        if (setSelectedBadgeModal) setSelectedBadgeModal(null);
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 text-center relative anim-pop"
                    >
                        <button
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("tap");
                                if (setSelectedBadgeModal) setSelectedBadgeModal(null);
                            }}
                            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mt-1 ${
                            selectedBadgeModal.unlocked ? "bg-amber-50 border border-amber-200" : "bg-slate-100 grayscale"
                        }`}>
                            {selectedBadgeModal.icon}
                        </div>

                        <div className="mt-3">
                            <span className="text-[10px] font-black uppercase bg-sky-50 text-[#0099e5] px-2 py-0.5 rounded-full border border-sky-200">
                                {selectedBadgeModal.level}
                            </span>
                            <h3 className="text-base font-black text-slate-900 mt-1">
                                {selectedBadgeModal.name}
                            </h3>
                        </div>

                        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs font-bold text-slate-600">
                            {selectedBadgeModal.requirement}
                        </div>

                        <button
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("tap");
                                if (setSelectedBadgeModal) setSelectedBadgeModal(null);
                            }}
                            className="mt-4 w-full py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-all"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
