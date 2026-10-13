"use client";

import React, { useState } from "react";
import {
    GraphicMascotRobot,
    GraphicBackArrow,
    GraphicLightningBolt,
    GraphicBookOpen,
    GraphicCoin,
} from "./Graphics";
import ShopView from "./ShopView";
import { SHOP_CATALOG } from "../../../lib/shopService";
import { getLevelDetails, LEVELS_CONFIG, MAX_EXPLORIA_XP } from "../../../lib/levelService";

export default function DashboardView({
    studentName = "",
    studentIC = "",
    studentSchool = "",
    studentLevel = 1,
    studentXP = 100,
    studentStreak = 1,
    readTopics = [],
    averageQuizSpeed = null,
    setStudentName,
    isEditingName = false,
    setIsEditingName,
    tempStudentName = "",
    setTempStudentName,
    dashboardActiveTab = "all",
    setDashboardActiveTab,
    selectedBadgeModal = null,
    setSelectedBadgeModal,
    quizHighScore = 0,
    quizTotalPoints = 0,
    scoreCount = 0,
    solarScore = 0,
    solarSubmitted = false,
    plantScore = 0,
    plantSubmitted = false,
    spellingScore = 0,
    spellingSubmitted = false,
    mathScore = 0,
    mathSubmitted = false,
    studentCoins = 50,
    setStudentCoins,
    ownedItems = ["title_cadet", "avatar_astro_1"],
    setOwnedItems,
    equippedItems = { title: "title_cadet", avatar: "avatar_astro_1", pet: null },
    setEquippedItems,
    onNavigate,
    t,
    playAudioFeedback,
    isLoggedIn = false,
    onLogout,
}) {
    const [copiedStuId, setCopiedStuId] = useState(false);
    const equippedTitleItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.title) || { name: "Kadet STEM", icon: "🎓" };
    const equippedAvatarItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.avatar) || { name: "Angkasawan Perintis", icon: "🧑‍🚀" };
    const equippedPetItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.pet);
    const readTopicsCount = Array.isArray(readTopics) ? readTopics.length : 0;
    const effectiveXP = isLoggedIn ? (studentXP ?? 100) : 0;
    const effectiveStreak = isLoggedIn ? (studentStreak || 1) : 0;
    const effectiveQuizScore = quizHighScore || 0;
    const effectiveSolarScore = (solarSubmitted && solarScore > 0) ? solarScore : 0;
    const effectivePlantScore = (plantSubmitted && plantScore > 0) ? plantScore : 0;
    const effectiveSpellingScore = (spellingSubmitted && spellingScore > 0) ? spellingScore : 0;
    const effectiveMathScore = (mathSubmitted && mathScore > 0) ? mathScore : (mathScore || 0);
    const totalScore = effectiveSolarScore + effectiveQuizScore + effectivePlantScore + effectiveSpellingScore + effectiveMathScore;

    // Calculate level & XP milestones up to 15,000 XP
    const levelInfo = getLevelDetails(effectiveXP);
    const levelNum = levelInfo.level;
    const title = levelInfo.title;
    const percentage = Math.min(100, Math.round((effectiveXP / 15000) * 100));

    // Stars calculation (max 24)
    const solarStars = Math.min(8, Math.floor((effectiveSolarScore / 800) * 8));
    const quizStars = Math.min(10, Math.floor(effectiveQuizScore / 150));
    const topicStars = Math.min(6, readTopicsCount * 3);
    const totalStars = Math.min(24, solarStars + quizStars + topicStars);

    // Badges (7 badges)
    const badges = [
        {
            id: "welcome_badge",
            name: "Penjelajah Baharu",
            level: "Gangsa",
            xp: "+100 XP",
            unlocked: isLoggedIn,
            icon: "🚀",
            requirement: "Daftar akaun murid di Exploria.",
        },
        {
            id: "solar_master",
            name: "Pakar Sistem Suria",
            level: "Emas",
            xp: "+300 XP",
            unlocked: solarSubmitted && solarScore >= 800,
            icon: "🪐",
            requirement: "Susun 8 planet dengan markah 800/800.",
        },
        {
            id: "botany_master",
            name: "Ahli Botani Cilik",
            level: "Emas",
            xp: "+300 XP",
            unlocked: plantSubmitted && plantScore >= 500,
            icon: "🌱",
            requirement: "Selesaikan Makmal Tumbuhan sekurang-kurangnya 500 mata.",
        },
        {
            id: "speed_demon",
            name: "Minda Kilat 20s",
            level: "Emas",
            xp: "+250 XP",
            unlocked: effectiveQuizScore >= 500,
            icon: "⚡",
            requirement: "Capai 500 mata dalam Kuiz Pantas 20s.",
        },
        {
            id: "knowledge_seeker",
            name: "Pencari Ilmu STEM",
            level: "Perak",
            xp: "+200 XP",
            unlocked: readTopicsCount >= 2,
            icon: "📚",
            requirement: "Selesaikan bacaan semua topik nota.",
        },
        {
            id: "streak_champ",
            name: "Bintang 7 Hari",
            level: "Emas",
            xp: "+350 XP",
            unlocked: effectiveStreak >= 7,
            icon: "🔥",
            requirement: "Kekalkan streak 7 hari berturut-turut.",
        },
        {
            id: "grand_champion",
            name: "Juara Galaksi",
            level: "Platinum",
            xp: "+500 XP",
            unlocked: solarSubmitted && solarScore >= 800 && effectiveQuizScore >= 500 && readTopicsCount >= 2,
            icon: "🏆",
            requirement: "Tamatkan aktiviti Suria, Kuiz, dan Nota.",
        },
    ];

    const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

    // Daily Quests (4 quests)
    const quests = [
        {
            id: "quest_solar",
            title: "Susun 8 Planet Sistem Suria",
            xp: "+100 XP",
            completed: Boolean(solarSubmitted && solarScore > 0),
            icon: "🪐",
            targetView: "solarDragDrop",
        },
        {
            id: "quest_plant",
            title: "Makmal Tumbuhan",
            xp: "+120 XP",
            completed: Boolean(plantSubmitted && plantScore > 0),
            icon: "🌱",
            targetView: "plantActivity",
        },
        {
            id: "quest_quiz",
            title: "Cabar Kuiz Pantas 20s",
            xp: "+150 XP",
            completed: effectiveQuizScore > 0,
            icon: "⚡",
            targetView: "quizList",
        },
        {
            id: "quest_study",
            title: "Ulang Kaji Nota Sains",
            xp: "+80 XP",
            completed: readTopicsCount > 0,
            icon: "📖",
            targetView: "menu",
        },
    ];

    const completedQuestsCount = quests.filter((q) => q.completed).length;

    // STEM Skills
    const astroScore = solarSubmitted ? Math.round((solarScore / 800) * 100) : (readTopics?.includes?.(0) ? 40 : 0);
    const speedScore = effectiveQuizScore > 0 ? Math.min(100, Math.round((effectiveQuizScore / 1500) * 100)) : 0;
    const lifeScore = plantSubmitted ? Math.round((plantScore / 800) * 100) : (readTopics?.includes?.(1) ? 60 : (readTopicsCount > 0 ? 30 : 0));
    const inqScore = Math.round((astroScore + speedScore + lifeScore) / 3);

    const stemSkills = [
        { name: "Astronomi & Angkasa", score: astroScore, icon: "🪐" },
        { name: "Inkuiri Sains", score: inqScore, icon: "🔬" },
        { name: "Kepantasan Berfikir", score: speedScore, icon: "⚡" },
        { name: "Sains Hayat", score: lifeScore, icon: "🌿" },
    ];

    const skillsAverage = Math.round((astroScore + inqScore + speedScore + lifeScore) / 4);

    return (
        <div className="space-y-4 w-full max-w-4xl anim-fade-in text-left">

            {/* BAR ATAS: IDENTITI & NAVIGASI */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-slate-200 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0099e5] flex items-center justify-center text-xl shrink-0 border border-sky-100">
                        {isLoggedIn ? "🤖" : "👤"}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                                {isLoggedIn ? (studentName || "Penjelajah STEM") : "Mod Tetamu"}
                            </h2>
                            <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                                isLoggedIn ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500"
                            }`}>
                                {isLoggedIn ? "Aktif" : "Tetamu"}
                            </span>
                        </div>
                        {isLoggedIn && (studentSchool || (typeof window !== "undefined" && localStorage.getItem("exploria_student_school"))) && (
                            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                                <span>🏫</span>
                                <span className="truncate max-w-[190px] sm:max-w-[300px]">
                                    {studentSchool || (typeof window !== "undefined" && localStorage.getItem("exploria_student_school"))}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("login"); }}
                                className="px-3 py-1.5 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                Log Masuk
                            </button>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("register"); }}
                                className="px-3 py-1.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                Daftar
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("tap");
                                if (onLogout) onLogout();
                            }}
                            className="px-3 py-1.5 bg-white hover:bg-rose-50 active:scale-95 text-rose-600 border border-rose-200 text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
                        >
                            Log Keluar
                        </button>
                    )}
                    <button
                        onClick={() => { playAudioFeedback("tap"); onNavigate("menu"); }}
                        className="px-3 py-1.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                        <GraphicBackArrow className="w-3.5 h-3.5" />
                        <span>Menu</span>
                    </button>
                </div>
            </div>

            {/* KAD HERO: PROFIL & STATISTIK RINGKAS */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0088cc] via-[#0099e5] to-[#0284c7] p-5 sm:p-6 text-white shadow-md border-2 border-sky-300/40">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5">
                    {/* Identiti & XP */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative shrink-0">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white/20 p-1 border border-white/40 shadow-xs">
                                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-3xl overflow-hidden relative">
                                    {isLoggedIn ? (equippedAvatarItem?.icon || "🧑‍🚀") : "👤"}
                                </div>
                            </div>
                            {equippedPetItem && (
                                <span className="absolute -top-1.5 -right-1.5 text-base bg-white rounded-full p-0.5 shadow-xs border border-slate-200" title={`Maskot: ${equippedPetItem.name}`}>
                                    {equippedPetItem.icon}
                                </span>
                            )}
                            <span className="absolute -bottom-2 -right-1 bg-white text-slate-900 font-black text-[10px] px-2 py-0.2 rounded-full shadow-xs border border-slate-200">
                                Lv. {levelNum}
                            </span>
                        </div>

                        <div className="flex-1">
                            {isLoggedIn ? (
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {isEditingName ? (
                                            <div className="flex items-center gap-1.5">
                                                <input
                                                    type="text"
                                                    value={tempStudentName}
                                                    onChange={(e) => setTempStudentName(e.target.value)}
                                                    maxLength={20}
                                                    className="bg-white/20 border border-white/60 rounded-lg px-2 py-0.5 text-white text-sm font-black outline-none"
                                                    autoFocus
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            const val = tempStudentName.trim() || "Penjelajah STEM";
                                                            setStudentName(val);
                                                            setIsEditingName(false);
                                                            playAudioFeedback("snap");
                                                            try { localStorage.setItem("exploria_student_name", val); } catch {}
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const val = tempStudentName.trim() || "Penjelajah STEM";
                                                        setStudentName(val);
                                                        setIsEditingName(false);
                                                        playAudioFeedback("snap");
                                                        try { localStorage.setItem("exploria_student_name", val); } catch {}
                                                    }}
                                                    className="px-2.5 py-0.5 bg-white text-[#0099e5] text-xs font-black rounded-lg cursor-pointer"
                                                >
                                                    OK
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg sm:text-xl font-black text-white">
                                                    {studentName || "Penjelajah STEM"}
                                                </h3>
                                                <button
                                                    onClick={() => {
                                                        setTempStudentName(studentName);
                                                        setIsEditingName(true);
                                                        playAudioFeedback("tap");
                                                    }}
                                                    className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-md flex items-center justify-center text-[11px] text-white cursor-pointer"
                                                >
                                                    ✏️
                                                </button>
                                            </div>
                                        )}
                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 shadow-xs border border-amber-400">
                                            {equippedTitleItem?.name || title}
                                        </span>
                                    </div>

                                    {/* Bar XP (Sehingga 15,000 XP) */}
                                    <div className="mt-2 w-full max-w-xs">
                                        <div className="flex justify-between text-[11px] font-bold text-sky-100 mb-1">
                                            <span>XP</span>
                                            <span>{effectiveXP.toLocaleString()} / 15,000</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-black/25 rounded-full overflow-hidden p-0.5 border border-white/20">
                                            <div
                                                className="h-full bg-white rounded-full transition-all duration-500 shadow-xs"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* LENCANA ID PELAJAR UNIK (UNTUK IBU BAPA) */}
                                    <div className="mt-2.5 inline-flex items-center gap-1.5 bg-black/25 hover:bg-black/35 backdrop-blur-xs border border-white/25 rounded-xl px-2.5 py-1 text-xs transition-all">
                                        <span className="text-sky-200 text-[10px] font-bold uppercase tracking-wider">ID Pelajar:</span>
                                        <span className="font-mono font-black text-amber-300 tracking-wider text-xs">
                                            {studentIC ? `STU-${studentIC.length >= 5 ? studentIC.slice(-5) : studentIC.padStart(5, "0")}` : "STU-15542"}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const idToCopy = studentIC ? `STU-${studentIC.length >= 5 ? studentIC.slice(-5) : studentIC.padStart(5, "0")}` : "STU-15542";
                                                if (navigator?.clipboard) {
                                                    navigator.clipboard.writeText(idToCopy);
                                                    setCopiedStuId(true);
                                                    setTimeout(() => setCopiedStuId(false), 2000);
                                                }
                                            }}
                                            className="text-[10px] bg-white/20 hover:bg-white/35 active:scale-95 text-white font-bold px-2 py-0.5 rounded-lg cursor-pointer transition-all ml-1"
                                            title="Salin ID untuk diberikan kepada ibu bapa anda"
                                        >
                                            {copiedStuId ? "✓ Disalin" : "📋 Salin ID"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg sm:text-xl font-black text-white">Penjelajah Tetamu</h3>
                                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md inline-block mt-1">
                                        Sesi Sementara
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Statistik KPI Termasuk Koin Bintang */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full md:w-auto shrink-0">
                        <div className="bg-amber-400/25 px-2.5 py-2 rounded-xl border border-amber-300/40 text-center col-span-2 sm:col-span-1 shadow-2xs flex flex-col items-center justify-center">
                            <GraphicCoin className="w-5 h-5 mx-auto mb-0.5" />
                            <span className="text-[10px] uppercase font-bold text-amber-200">Koin</span>
                            <span className="text-xs sm:text-sm font-black text-amber-300 block font-mono">{studentCoins}</span>
                        </div>
                        <div className="bg-white/15 px-2.5 py-2 rounded-xl border border-white/20 text-center">
                            <span className="text-base block">🔥</span>
                            <span className="text-[10px] uppercase font-bold text-sky-100">Streak</span>
                            <span className="text-xs sm:text-sm font-black text-white block">{effectiveStreak} Hari</span>
                        </div>
                        <div className="bg-white/15 px-2.5 py-2 rounded-xl border border-white/20 text-center">
                            <span className="text-base block">⭐</span>
                            <span className="text-[10px] uppercase font-bold text-sky-100">Bintang</span>
                            <span className="text-xs sm:text-sm font-black text-white block">{totalStars} / 24</span>
                        </div>
                        <div className="bg-white/15 px-2.5 py-2 rounded-xl border border-white/20 text-center">
                            <span className="text-base block">💎</span>
                            <span className="text-[10px] uppercase font-bold text-sky-100">Skor</span>
                            <span className="text-xs sm:text-sm font-black text-white block">{totalScore.toLocaleString()}</span>
                        </div>
                        <div className="bg-white/15 px-2.5 py-2 rounded-xl border border-white/20 text-center">
                            <span className="text-base block">🏆</span>
                            <span className="text-[10px] uppercase font-bold text-sky-100">Lencana</span>
                            <span className="text-xs sm:text-sm font-black text-white block">{unlockedBadgesCount} / {badges.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* TAB NAVIGASI */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {[
                    { id: "all", label: "Semua", icon: "📌" },
                    { id: "records", label: "Aktiviti", icon: "🎯", count: 6 },
                    { id: "skills", label: "Kemahiran", icon: "🧬" },
                    { id: "quests", label: "Misi", icon: "📋", count: `${completedQuestsCount}/${quests.length}` },
                    { id: "badges", label: "Lencana", icon: "🏆", count: unlockedBadgesCount },
                ].map((tab) => {
                    const isActive = dashboardActiveTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                playAudioFeedback("tap");
                                setDashboardActiveTab(tab.id);
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                isActive
                                    ? "bg-[#0099e5] text-white shadow-xs"
                                    : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                                    isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* KEDAI PENJELAJAH TAB CONTENT */}
            {dashboardActiveTab === "shop" && (
                <ShopView
                    studentIC={studentIC}
                    studentCoins={studentCoins}
                    setStudentCoins={setStudentCoins}
                    ownedItems={ownedItems}
                    setOwnedItems={setOwnedItems}
                    equippedItems={equippedItems}
                    setEquippedItems={setEquippedItems}
                    playAudioFeedback={playAudioFeedback}
                    t={t}
                />
            )}

            {/* REKOD AKTIVITI (6 KAD MINIMALIS - TIADA TEXT BERLEBIHAN) */}
            {(dashboardActiveTab === "all" || dashboardActiveTab === "records") && (
                <div className="space-y-3 anim-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* 1: Makmal Tumbuhan */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-[#0099e5] shadow-xs transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">🌱</span>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                        !plantSubmitted || plantScore === 0
                                            ? "bg-slate-50 text-slate-500 border-slate-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}>
                                        {!plantSubmitted || plantScore === 0 ? "Belum Mula" : "Selesai"}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900">Makmal Tumbuhan</h4>
                                <div className="text-xl font-black text-slate-900 mt-1">
                                    {effectivePlantScore} <span className="text-xs font-bold text-slate-400">/ 800 PTS</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("plantActivity"); }}
                                className="mt-3 w-full py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                {plantSubmitted && plantScore > 0 ? "Main Semula" : "Mula"}
                            </button>
                        </div>

                        {/* 2: Sistem Suria */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-[#0099e5] shadow-xs transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">🪐</span>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                        !solarSubmitted || solarScore === 0
                                            ? "bg-slate-50 text-slate-500 border-slate-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}>
                                        {!solarSubmitted || solarScore === 0 ? "Belum Mula" : "Selesai"}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900">Sistem Suria</h4>
                                <div className="text-xl font-black text-slate-900 mt-1">
                                    {effectiveSolarScore} <span className="text-xs font-bold text-slate-400">/ 800 PTS</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("solarDragDrop"); }}
                                className="mt-3 w-full py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                {solarSubmitted && solarScore > 0 ? "Main Semula" : "Mula"}
                            </button>
                        </div>

                        {/* 3: Kuiz Pantas 20s */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-[#0099e5] shadow-xs transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">⚡</span>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                        effectiveQuizScore === 0
                                            ? "bg-slate-50 text-slate-500 border-slate-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}>
                                        {effectiveQuizScore === 0 ? "Belum Dicabar" : "Rekod Skor"}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900">Kuiz Pantas 20s</h4>
                                <div className="text-xl font-black text-slate-900 mt-1">
                                    {effectiveQuizScore.toLocaleString()} <span className="text-xs font-bold text-slate-400">PTS</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("quizList"); }}
                                className="mt-3 w-full py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1.5"
                            >
                                <GraphicLightningBolt className="w-3.5 h-3.5" />
                                <span>{effectiveQuizScore > 0 ? "Cabar Semula" : "Mula"}</span>
                            </button>
                        </div>

                        {/* 4: Spelling Bee STEM */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-[#0099e5] shadow-xs transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">🐝</span>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                        !spellingSubmitted || spellingScore === 0
                                            ? "bg-slate-50 text-slate-500 border-slate-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}>
                                        {!spellingSubmitted || spellingScore === 0 ? "Belum Mula" : "Selesai"}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900">Spelling Bee STEM</h4>
                                <div className="text-xl font-black text-slate-900 mt-1">
                                    {effectiveSpellingScore} <span className="text-xs font-bold text-slate-400">PTS</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("spellingBee"); }}
                                className="mt-3 w-full py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                {spellingSubmitted && spellingScore > 0 ? "Main Semula" : "Mula"}
                            </button>
                        </div>

                        {/* 5: Pertandingan Sifir */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-[#0099e5] shadow-xs transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">🔢</span>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                        !mathSubmitted || mathScore === 0
                                            ? "bg-slate-50 text-slate-500 border-slate-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}>
                                        {!mathSubmitted || mathScore === 0 ? "Belum Mula" : "Selesai"}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900">Pertandingan Sifir</h4>
                                <div className="text-xl font-black text-slate-900 mt-1">
                                    {effectiveMathScore} <span className="text-xs font-bold text-slate-400">PTS</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("mathQuiz"); }}
                                className="mt-3 w-full py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all"
                            >
                                {mathSubmitted && mathScore > 0 ? "Main Semula" : "Mula"}
                            </button>
                        </div>

                        {/* 6: Nota Visual Sains */}
                        <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-[#0099e5] shadow-xs transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">📖</span>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                        readTopicsCount === 0
                                            ? "bg-slate-50 text-slate-500 border-slate-200"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    }`}>
                                        {readTopicsCount >= 2 ? "Lengkap" : (readTopicsCount === 1 ? "1/2" : "0/2")}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900">Nota Sains</h4>
                                <div className="text-xl font-black text-slate-900 mt-1">
                                    {readTopicsCount} <span className="text-xs font-bold text-slate-400">/ 2 Topik</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { playAudioFeedback("tap"); onNavigate("menu"); }}
                                className="mt-3 w-full py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1.5"
                            >
                                <GraphicBookOpen className="w-3.5 h-3.5" />
                                <span>{readTopicsCount >= 2 ? "Ulang Kaji" : "Buka"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DUA LAJUR: KEMAHIRAN STEM & MISI HARIAN */}
            {(dashboardActiveTab === "all" || dashboardActiveTab === "skills" || dashboardActiveTab === "quests") && (
                <div className={`grid gap-4 anim-fade-in ${dashboardActiveTab === "all" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>

                    {/* Lajur Kiri: Kemahiran STEM */}
                    {(dashboardActiveTab === "all" || dashboardActiveTab === "skills") && (
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 shadow-xs space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                                    <span>🧬</span>
                                    <span>Kemahiran STEM</span>
                                </h3>
                                <span className="text-xs font-black text-[#0099e5]">
                                    Purata {skillsAverage}%
                                </span>
                            </div>

                            <div className="space-y-3 pt-1">
                                {stemSkills.map((skill, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                                <span>{skill.icon}</span>
                                                <span>{skill.name}</span>
                                            </span>
                                            <span className="font-black text-slate-900">{skill.score}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-[#0099e5] transition-all duration-500"
                                                style={{ width: `${skill.score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lajur Kanan: Misi Harian */}
                    {(dashboardActiveTab === "all" || dashboardActiveTab === "quests") && (
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 shadow-xs space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                                    <span>📋</span>
                                    <span>Misi Harian</span>
                                </h3>
                                <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-0.2 rounded-full">
                                    {completedQuestsCount} / {quests.length}
                                </span>
                            </div>

                            <div className="space-y-2 pt-1">
                                {quests.map((quest) => (
                                    <div
                                        key={quest.id}
                                        className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between gap-2.5 border border-slate-200/80"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="text-lg shrink-0">{quest.icon}</span>
                                            <div className="min-w-0">
                                                <h4 className="text-xs font-black text-slate-800 truncate">
                                                    {quest.title}
                                                </h4>
                                                <span className="text-[10px] font-black text-[#0099e5]">
                                                    {quest.xp}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            {quest.completed ? (
                                                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black" title="Selesai">
                                                    ✓
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => { playAudioFeedback("tap"); onNavigate(quest.targetView); }}
                                                    className="px-2.5 py-1 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white text-[10px] font-black rounded-lg cursor-pointer transition-all"
                                                >
                                                    Buka
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* PETI LENCANA */}
            {(dashboardActiveTab === "all" || dashboardActiveTab === "badges") && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 shadow-xs anim-fade-in space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                            <span>🏆</span>
                            <span>Peti Lencana</span>
                        </h3>
                        <span className="text-xs font-black text-[#0099e5]">
                            {unlockedBadgesCount} / {badges.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
                        {badges.map((badge) => (
                            <div
                                key={badge.id}
                                onClick={() => {
                                    playAudioFeedback("sparkle");
                                    setSelectedBadgeModal(badge);
                                }}
                                className={`rounded-xl p-2.5 border transition-all cursor-pointer flex flex-col items-center text-center ${
                                    badge.unlocked
                                        ? "bg-white border-slate-200 hover:border-[#0099e5] shadow-xs active:scale-95"
                                        : "bg-slate-50/80 border-slate-200/80 opacity-60 hover:opacity-100"
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-1.5 ${
                                    badge.unlocked
                                        ? "bg-sky-50 text-[#0099e5]"
                                        : "bg-slate-200 text-slate-400 grayscale"
                                }`}>
                                    {badge.icon}
                                </div>
                                <h4 className={`text-[11px] font-black line-clamp-1 ${badge.unlocked ? "text-slate-800" : "text-slate-400"}`}>
                                    {badge.name}
                                </h4>
                                <span className="text-[9px] font-bold text-slate-400 mt-0.5">
                                    {badge.xp}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* MODAL BUTIRAN LENCANA */}
            {selectedBadgeModal && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 anim-fade-in"
                    onClick={() => { playAudioFeedback("tap"); setSelectedBadgeModal(null); }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border-2 border-slate-200 text-center relative anim-scale-up"
                    >
                        <button
                            onClick={() => { playAudioFeedback("tap"); setSelectedBadgeModal(null); }}
                            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mt-1 ${
                            selectedBadgeModal.unlocked ? "bg-sky-50 border border-sky-200" : "bg-slate-100 grayscale"
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
                            onClick={() => { playAudioFeedback("tap"); setSelectedBadgeModal(null); }}
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
