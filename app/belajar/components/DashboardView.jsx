"use client";

import React from "react";
import {
    GraphicMascotRobot,
    GraphicBackArrow,
    GraphicLightningBolt,
    GraphicBookOpen,
    DASHBOARD_BADGES,
    DAILY_QUESTS,
    STEM_SKILLS,
} from "./Graphics";

export default function DashboardView({
    studentName = "",
    studentIC = "",
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
    onNavigate,
    t,
    playAudioFeedback,
    isLoggedIn = false,
    onLogout,
}) {
    const readTopicsCount = Array.isArray(readTopics) ? readTopics.length : 0;
    const effectiveXP = isLoggedIn ? (studentXP ?? 100) : 0;
    const effectiveStreak = isLoggedIn ? (studentStreak || 1) : 0;
    const effectiveQuizScore = quizHighScore || 0;
    const effectiveSolarScore = (solarSubmitted && solarScore > 0) ? solarScore : 0;
    const effectivePlantScore = (plantSubmitted && plantScore > 0) ? plantScore : 0;
    const effectiveSpellingScore = (spellingSubmitted && spellingScore > 0) ? spellingScore : 0;
    const effectiveMathScore = (mathSubmitted && mathScore > 0) ? mathScore : (mathScore || 0);
    const totalScore = effectiveSolarScore + effectiveQuizScore + effectivePlantScore + effectiveSpellingScore + effectiveMathScore;

    // Calculate level & XP milestones
    let levelNum = 1;
    let title = "Kadet Sains Cilik";
    let currentRank = "Penjelajah Baharu";
    let nextLevel = "Tahap 2: Penjelajah Planet";
    let maxLevelXP = 500;
    let xpNeeded = Math.max(0, 500 - effectiveXP);
    let percentage = Math.min(100, Math.round((effectiveXP / 500) * 100));

    if (effectiveXP >= 2000) {
        levelNum = 4;
        title = "Komander Angkasa";
        currentRank = "Legenda Galaksi";
        nextLevel = "Tahap Maksimum (Elit)";
        maxLevelXP = 2000;
        xpNeeded = 0;
        percentage = 100;
    } else if (effectiveXP >= 1200) {
        levelNum = 3;
        title = "Pakar Falak Cilik";
        currentRank = "Penjelajah Galaksi Mahir";
        nextLevel = "Tahap 4: Komander Angkasa";
        maxLevelXP = 2000;
        xpNeeded = Math.max(0, 2000 - effectiveXP);
        percentage = Math.min(100, Math.round(((effectiveXP - 1200) / 800) * 100));
    } else if (effectiveXP >= 500) {
        levelNum = 2;
        title = "Pakar Falak Cilik";
        currentRank = "Penjelajah Orbit";
        nextLevel = "Tahap 3: Penjelajah Galaksi Mahir";
        maxLevelXP = 1200;
        xpNeeded = Math.max(0, 1200 - effectiveXP);
        percentage = Math.min(100, Math.round(((effectiveXP - 500) / 700) * 100));
    }

    // Stars calculation (max 24)
    const solarStars = Math.min(8, Math.floor((effectiveSolarScore / 800) * 8));
    const quizStars = Math.min(10, Math.floor(effectiveQuizScore / 150));
    const topicStars = Math.min(6, readTopicsCount * 3);
    const totalStars = Math.min(24, solarStars + quizStars + topicStars);

    // Dynamic Badges (6 badges)
    const badges = [
        {
            id: "welcome_badge",
            name: "Penjelajah Baharu",
            englishName: "New Explorer",
            title: "Kadet Angkasa",
            category: "Pendaftaran",
            level: "Gangsa",
            xp: "+100 XP",
            unlocked: isLoggedIn,
            date: "Hari Ini",
            icon: "🚀",
            bgColor: "from-sky-400 via-blue-500 to-indigo-600",
            ringColor: "border-sky-400",
            description: "Mendaftar akaun murid dan memulakan pengembaraan sains di portal Exploria!",
            funFact: "Langkah pertama seorang angkasawan cilik bermula dengan rasa ingin tahu!",
            requirement: "Daftar akaun murid di Exploria.",
        },
        {
            id: "solar_master",
            name: "Pakar Sistem Suria",
            englishName: "Solar System Master",
            title: "Master Ahli Falak",
            category: "Astronomi",
            level: "Emas",
            xp: "+300 XP",
            unlocked: solarSubmitted && solarScore >= 800,
            date: (solarSubmitted && solarScore >= 800) ? "Selesai" : "Belum Dicapai",
            icon: "🪐",
            bgColor: "from-amber-400 via-orange-500 to-rose-500",
            ringColor: "border-amber-400",
            description: "Menyusun kesemua 8 planet dalam orbit yang tepat tanpa kesilapan (800/800)!",
            funFact: "Anda kini menguasai urutan 8 planet dari Utarid hingga ke Neptun!",
            requirement: "Susun kesemua 8 planet ke orbit yang tepat dengan skor sempurna 800/800.",
        },
        {
            id: "botany_master",
            name: "Ahli Botani Cilik",
            englishName: "Junior Botanist Master",
            title: "Pakar Fotosintesis & Flora",
            category: "Biologi Tumbuhan",
            level: "Emas",
            xp: "+300 XP",
            unlocked: plantSubmitted && plantScore >= 500,
            date: (plantSubmitted && plantScore >= 500) ? "Selesai" : "Belum Dicapai",
            icon: "🌱",
            bgColor: "from-emerald-400 via-teal-500 to-green-600",
            ringColor: "border-emerald-400",
            description: "Menjayakan fotosintesis dan membesarkan bunga matahari mekar di Makmal Tumbuhan!",
            funFact: "Tumbuhan menghasilkan oksigen dan menyejukkan suhu bumi melalui proses fotosintesis!",
            requirement: "Selesaikan aktiviti Makmal Tumbuhan dengan skor sekurang-kurangnya 500/800 mata.",
        },
        {
            id: "speed_demon",
            name: "Minda Kilat 20s",
            englishName: "20s Lightning Mind",
            title: "Pantas & Tepat",
            category: "Kuiz Pantas",
            level: "Emas",
            xp: "+250 XP",
            unlocked: effectiveQuizScore >= 500,
            date: effectiveQuizScore >= 500 ? "Selesai" : "Belum Dicapai",
            icon: "⚡",
            bgColor: "from-yellow-400 via-amber-500 to-orange-600",
            ringColor: "border-yellow-400",
            description: "Menjawab kuiz 20 saat dengan ketepatan tinggi dan rekod skor melebihi 500 mata!",
            funFact: "Kelajuan dan ketepatan bertindak balas membina ketajaman minda sains!",
            requirement: "Capai skor 500 mata atau lebih dalam Kuiz Pantas 20s.",
        },
        {
            id: "knowledge_seeker",
            name: "Pencari Ilmu STEM",
            englishName: "STEM Knowledge Seeker",
            title: "Peneliti Sains",
            category: "Nota Visual",
            level: "Perak",
            xp: "+200 XP",
            unlocked: readTopicsCount >= 2,
            date: readTopicsCount >= 2 ? "Selesai" : "Belum Dicapai",
            icon: "📚",
            bgColor: "from-sky-400 via-blue-500 to-indigo-600",
            ringColor: "border-sky-400",
            description: "Meneroka dan membaca keseluruhan modul Sains Sistem Suria & Fotosintesis.",
            funFact: "Proses fotosintesis menghasilkan glukosa dan oksigen untuk kehidupan bumi.",
            requirement: "Buka dan selesaikan kedua-dua topik modul nota pembelajaran.",
        },
        {
            id: "streak_champ",
            name: "Bintang 7 Hari",
            englishName: "7-Day Star Streak",
            title: "Konsisten Sejati",
            category: "Ketekunan",
            level: "Emas",
            xp: "+350 XP",
            unlocked: effectiveStreak >= 7,
            date: effectiveStreak >= 7 ? "Selesai" : "Belum Dicapai",
            icon: "🔥",
            bgColor: "from-rose-500 via-red-500 to-amber-500",
            ringColor: "border-rose-400",
            description: "Membuka dan mengulang kaji di portal Exploria selama 7 hari berturut-turut.",
            funFact: "Disiplin belajar setiap hari membina kefahaman STEM yang kukuh dan berkekalan!",
            requirement: "Kekalkan streak belajar sekurang-kurangnya 7 hari berturut-turut.",
        },
        {
            id: "grand_champion",
            name: "Juara Sains Galaksi",
            englishName: "Galaxy Science Champion",
            title: "Legenda Exploria",
            category: "Keseluruhan",
            level: "Platinum",
            xp: "+500 XP",
            unlocked: solarSubmitted && solarScore >= 800 && effectiveQuizScore >= 500 && readTopicsCount >= 2,
            date: (solarSubmitted && solarScore >= 800 && effectiveQuizScore >= 500 && readTopicsCount >= 2) ? "Selesai" : "Belum Dicapai",
            icon: "🏆",
            bgColor: "from-purple-500 via-pink-500 to-amber-400",
            ringColor: "border-purple-400",
            description: "Menamatkan semua modul pembelajaran, kuiz pantas, dan aktiviti interaktif.",
            funFact: "Tahniah! Anda kini tergolong dalam 5% penjelajah STEM terhebat di Exploria!",
            requirement: "Capai kejayaan dalam aktiviti suria (800/800), kuiz (500+ mata), dan semua modul nota.",
        },
    ];

    const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

    // Dynamic Daily Quests (4 quests)
    const quests = [
        {
            id: "quest_solar",
            title: "Susun 8 Planet Sistem Suria",
            category: "Aktiviti Interaktif",
            xp: "+100 XP",
            progress: (solarSubmitted && solarScore > 0) ? 1 : 0,
            total: 1,
            completed: Boolean(solarSubmitted && solarScore > 0),
            icon: "🪐",
            targetView: "solarDragDrop",
            colorBadge: "bg-purple-100 text-purple-700",
        },
        {
            id: "quest_plant",
            title: "Makmal Tumbuhan & Kebun Fotosintesis",
            category: "Aktiviti Interaktif",
            xp: "+120 XP",
            progress: (plantSubmitted && plantScore > 0) ? 1 : 0,
            total: 1,
            completed: Boolean(plantSubmitted && plantScore > 0),
            icon: "🌿",
            targetView: "plantActivity",
            colorBadge: "bg-emerald-100 text-emerald-800",
        },
        {
            id: "quest_quiz",
            title: "Cabar Kuiz Pantas 20s",
            category: "Cabaran Minda",
            xp: "+150 XP",
            progress: effectiveQuizScore > 0 ? 1 : 0,
            total: 1,
            completed: effectiveQuizScore > 0,
            icon: "⚡",
            targetView: "quizList",
            colorBadge: "bg-amber-100 text-amber-800",
        },
        {
            id: "quest_study",
            title: "Ulang Kaji Modul Nota Sains",
            category: "Pembelajaran",
            xp: "+80 XP",
            progress: readTopicsCount > 0 ? 1 : 0,
            total: 1,
            completed: readTopicsCount > 0,
            icon: "🌱",
            targetView: "learningList",
            colorBadge: "bg-emerald-100 text-emerald-800",
        },
    ];

    const completedQuestsCount = quests.filter((q) => q.completed).length;

    // Dynamic STEM Skills
    const astroScore = solarSubmitted ? Math.round((solarScore / 800) * 100) : (readTopics?.includes?.(0) ? 40 : 0);
    const speedScore = effectiveQuizScore > 0 ? Math.min(100, Math.round((effectiveQuizScore / 1500) * 100)) : 0;
    const lifeScore = plantSubmitted ? Math.round((plantScore / 800) * 100) : (readTopics?.includes?.(1) ? 60 : (readTopicsCount > 0 ? 30 : 0));
    const inqScore = Math.round((astroScore + speedScore + lifeScore) / 3);

    const stemSkills = [
        {
            name: "Astronomi & Angkasa Lepas",
            score: astroScore,
            status: astroScore >= 90 ? "Pakar Orbit" : (astroScore >= 50 ? "Penjelajah Mahir" : (astroScore > 0 ? "Asas Orbit" : "Belum Mula")),
            barColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
            textColor: "text-purple-600",
            bgBadge: "bg-purple-100",
            icon: "🪐",
        },
        {
            name: "Inkuiri & Kaedah Saintifik",
            score: inqScore,
            status: inqScore >= 80 ? "Sangat Cemerlang" : (inqScore >= 40 ? "Sedang Berkembang" : "Permulaan"),
            barColor: "bg-gradient-to-r from-teal-500 to-emerald-500",
            textColor: "text-emerald-700",
            bgBadge: "bg-emerald-100",
            icon: "🔬",
        },
        {
            name: "Kepantasan Berfikir (20s Challenge)",
            score: speedScore,
            status: speedScore >= 80 ? "Respons Kilat" : (speedScore >= 40 ? "Pantas" : "Belum Diuji"),
            barColor: "bg-gradient-to-r from-amber-400 to-orange-500",
            textColor: "text-amber-700",
            bgBadge: "bg-amber-100",
            icon: "⚡",
        },
        {
            name: "Sains Hayat & Ekosistem",
            score: lifeScore,
            status: lifeScore >= 80 ? "Kefahaman Mantap" : (lifeScore > 0 ? "Sedang Meneroka" : "Belum Mula"),
            barColor: "bg-gradient-to-r from-sky-500 to-blue-500",
            textColor: "text-blue-700",
            bgBadge: "bg-sky-100",
            icon: "🌿",
        },
    ];

    const skillsAverage = Math.round((astroScore + inqScore + speedScore + lifeScore) / 4);
    return (
        <div className="space-y-6 w-full max-w-4xl anim-fade-in text-left">
            <div className="space-y-6 w-full max-w-4xl anim-fade-in text-left">

                            {/* =========================================================================
                                PANEL PROFIL PELAJAR (STUDENT PROFILE TOP CONTROL & TAB PANEL)
                               ========================================================================= */}
                            <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 rounded-3xl p-4 sm:p-5 border-2 border-sky-200/90 shadow-md space-y-3.5">
                                
                                {/* BARIS ATAS: TAJUK, STATUS & PINTASAN AKSI */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-sky-100 pb-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0099e5] to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
                                            {isLoggedIn ? "🤖" : "👤"}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                                                    {isLoggedIn
                                                        ? (t ? t("Profil Penjelajah STEM", "STEM Explorer Profile") : "Profil Penjelajah STEM")
                                                        : (t ? t("Mod Tetamu (Tanpa Akaun)", "Guest Mode (No Account)") : "Mod Tetamu (Tanpa Akaun)")
                                                    }
                                                </span>
                                                <span className={`text-xs font-bold flex items-center gap-1 ${isLoggedIn ? "text-emerald-600" : "text-amber-600"}`}>
                                                    <span className={`w-2 h-2 rounded-full animate-pulse ${isLoggedIn ? "bg-emerald-500" : "bg-amber-500"}`} />
                                                    {isLoggedIn
                                                        ? (t ? t("Akaun Aktif", "Active Account") : "Akaun Aktif")
                                                        : (t ? t("Sesi Sementara", "Temporary Session") : "Sesi Sementara")
                                                    }
                                                </span>
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 leading-tight">
                                                {isLoggedIn
                                                    ? (t ? t("Profil & Rekod Penjelajah", "Explorer Profile & Records") : "Profil & Rekod Penjelajah")
                                                    : (t ? t("Profil Penjelajah Tetamu", "Guest Explorer Profile") : "Profil Penjelajah Tetamu")
                                                }
                                            </h2>
                                            <p className="text-xs text-slate-500 font-medium">
                                                {isLoggedIn
                                                    ? (t ? t(`Selamat kembali, ${studentName}! Urus profil, pantau rekod kuiz, orbit suria, kemahiran & lencana anda.`, `Welcome back, ${studentName}! Manage your profile, track quiz records, solar orbit, skills & badges.`) : `Selamat kembali, ${studentName}! Urus profil, pantau rekod kuiz, orbit suria, kemahiran & lencana anda.`)
                                                    : (t ? t("Anda sedang meneroka sebagai tetamu. Log masuk atau daftar akaun percuma untuk menyimpan nama, markah & rekod pencapaian anda!", "You are exploring as a guest. Log in or register a free account to save your name, scores & achievement records!") : "Anda sedang meneroka sebagai tetamu. Log masuk atau daftar akaun percuma untuk menyimpan nama, markah & rekod pencapaian anda!")
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* BUTANG PINTASAN DI ATAS PANEL */}
                                    <div className="flex items-center gap-2 flex-wrap self-end sm:self-center shrink-0">
                                        {!isLoggedIn ? (
                                            <>
                                                <button
                                                    onClick={() => { playAudioFeedback("tap"); onNavigate("login"); }}
                                                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                                                    title={t ? t("Log Masuk Akaun", "Log In Account") : "Log Masuk"}
                                                >
                                                    <span>🔑</span>
                                                    <span>{t ? t("Log Masuk", "Log In") : "Log Masuk"}</span>
                                                </button>
                                                <button
                                                    onClick={() => { playAudioFeedback("tap"); onNavigate("register"); }}
                                                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                                                    title={t ? t("Daftar Murid Baharu", "Register New Student") : "Daftar Murid"}
                                                >
                                                    <span>📝</span>
                                                    <span>{t ? t("Daftar", "Register") : "Daftar"}</span>
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    if (onLogout) onLogout();
                                                }}
                                                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                                                title={t ? t("Log Keluar dari Akaun", "Log Out from Account") : "Log Keluar"}
                                            >
                                                <span>🚪</span>
                                                <span>{t ? t("Log Keluar", "Log Out") : "Log Keluar"}</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => { playAudioFeedback("tap"); onNavigate("solarDragDrop"); }}
                                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                                            title="Main Drag & Drop Sistem Suria"
                                        >
                                            <span>🪐</span>
                                            <span className="hidden sm:inline">{t ? t("Main", "Play") : "Main"}</span> Suria
                                        </button>
                                        <button
                                            onClick={() => { playAudioFeedback("tap"); onNavigate("quizList"); }}
                                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                                            title="Cabar Kuiz Pantas 20s"
                                        >
                                            <GraphicLightningBolt className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">{t ? t("Cabar", "Challenge") : "Cabar"}</span> Kuiz
                                        </button>
                                        <button
                                            onClick={() => { playAudioFeedback("tap"); onNavigate("menu"); }}
                                            className="px-3 py-1.5 btn-3d-white text-slate-700 text-xs font-black rounded-xl border border-slate-200 shadow-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                                            title="Kembali ke Menu Utama"
                                        >
                                            <GraphicBackArrow className="w-3.5 h-3.5" />
                                            <span>Menu</span>
                                        </button>
                                    </div>
                                </div>

                                {/* BARIS BAWAH: TAB FILTER KATEGORI (PANEL FILTER ATAS) */}
                                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-0.5">
                                    <span className="text-[11px] font-black uppercase text-slate-400 shrink-0 pr-1 hidden sm:inline">
                                        {t ? t("Bahagian Profil:", "Profile Section:") : "Bahagian Profil:"}
                                    </span>
                                    <button
                                        onClick={() => { playAudioFeedback("tap"); setDashboardActiveTab("all"); }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                            dashboardActiveTab === "all"
                                                ? "bg-[#0099e5] text-white shadow-sm ring-2 ring-sky-300"
                                                : "bg-white hover:bg-sky-50 text-slate-700 border border-slate-200"
                                        }`}
                                    >
                                        <span>📌</span>
                                        <span>{t ? t("Ringkasan Profil", "Profile Summary") : "Ringkasan Profil"}</span>
                                    </button>
                                    <button
                                        onClick={() => { playAudioFeedback("tap"); setDashboardActiveTab("records"); }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                            dashboardActiveTab === "records"
                                                ? "bg-purple-600 text-white shadow-sm ring-2 ring-purple-300"
                                                : "bg-white hover:bg-purple-50 text-slate-700 border border-slate-200"
                                        }`}
                                    >
                                        <span>🎯</span>
                                        <span>Rekod Aktiviti</span>
                                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${dashboardActiveTab === "records" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"}`}>
                                            4
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => { playAudioFeedback("tap"); setDashboardActiveTab("skills"); }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                            dashboardActiveTab === "skills"
                                                ? "bg-teal-600 text-white shadow-sm ring-2 ring-teal-300"
                                                : "bg-white hover:bg-teal-50 text-slate-700 border border-slate-200"
                                        }`}
                                    >
                                        <span>🧬</span>
                                        <span>Kemahiran STEM</span>
                                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${dashboardActiveTab === "skills" ? "bg-white/20 text-white" : "bg-teal-100 text-teal-800"}`}>
                                            {skillsAverage}%
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => { playAudioFeedback("tap"); setDashboardActiveTab("quests"); }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                            dashboardActiveTab === "quests"
                                                ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300"
                                                : "bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200"
                                        }`}
                                    >
                                        <span>📋</span>
                                        <span>Misi Harian</span>
                                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${dashboardActiveTab === "quests" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"}`}>
                                            {completedQuestsCount}/3
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => { playAudioFeedback("sparkle"); setDashboardActiveTab("badges"); }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                            dashboardActiveTab === "badges"
                                                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-sm ring-2 ring-amber-300 font-black"
                                                : "bg-white hover:bg-amber-50 text-amber-800 border border-amber-300"
                                        }`}
                                    >
                                        <span>🏆</span>
                                        <span>Peti Lencana</span>
                                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${dashboardActiveTab === "badges" ? "bg-slate-950 text-amber-300" : "bg-amber-100 text-amber-800"}`}>
                                            {unlockedBadgesCount}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* KAD PROFIL HERO: TAHAP, XP & STREAK (JIKA LOGIN) ATAU KAD TETAMU (JIKA BELUM LOGIN) */}
                            {isLoggedIn ? (
                                <div
                                    className="relative overflow-hidden rounded-[2rem] p-6 sm:p-7 text-white shadow-xl border-3 border-sky-300/40"
                                    style={{
                                        background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                                    }}
                                >
                                    {/* Ambient Light Glow */}
                                    <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

                                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                                        {/* Avatar & Identiti */}
                                        <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                                            <div className="relative shrink-0">
                                                {/* Avatar Glow Ring */}
                                                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-gradient-to-tr from-amber-400 via-pink-400 to-sky-300 p-1 shadow-lg shadow-sky-900/30 anim-float">
                                                    <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center text-4xl border-2 border-white/50 overflow-hidden relative">
                                                        <GraphicMascotRobot className="w-14 h-14" />
                                                    </div>
                                                </div>
                                                <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-md border-2 border-white">
                                                    Lv. {levelNum}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {isEditingName ? (
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="text"
                                                                value={tempStudentName}
                                                                onChange={(e) => setTempStudentName(e.target.value)}
                                                                maxLength={20}
                                                                className="bg-white/20 border-2 border-white/60 rounded-xl px-2.5 py-1 text-white text-base font-black outline-none focus:ring-2 focus:ring-amber-300"
                                                                autoFocus
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        const val = tempStudentName.trim() || "Penjelajah STEM";
                                                                        setStudentName(val);
                                                                        setIsEditingName(false);
                                                                        playAudioFeedback("snap");
                                                                        try {
                                                                            localStorage.setItem("exploria_student_name", val);
                                                                        } catch {}
                                                                    }
                                                                }}
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const val = tempStudentName.trim() || "Penjelajah STEM";
                                                                    setStudentName(val);
                                                                    setIsEditingName(false);
                                                                    playAudioFeedback("snap");
                                                                    try {
                                                                        localStorage.setItem("exploria_student_name", val);
                                                                    } catch {}
                                                                }}
                                                                className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-lg shadow-sm hover:bg-amber-300 cursor-pointer"
                                                            >
                                                                Simpan
                              </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                                                                {studentName || "Penjelajah STEM"}
                                                            </h3>
                                                            <button
                                                                onClick={() => {
                                                                    setTempStudentName(studentName);
                                                                    setIsEditingName(true);
                                                                    playAudioFeedback("tap");
                                                                }}
                                                                title="Tukar Nama Pelajar"
                                                                className="w-7 h-7 bg-white/20 hover:bg-white/35 rounded-lg flex items-center justify-center text-xs text-white/90 cursor-pointer transition-all border border-white/30"
                                                            >
                                                                ✏️
                                                            </button>
                                                        </div>
                                                    )}
                                                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-sky-100 px-2.5 py-0.5 rounded-full border border-white/20">
                                                        {title}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            if (playAudioFeedback) playAudioFeedback("tap");
                                                            if (onLogout) onLogout();
                                                        }}
                                                        className="px-2.5 py-0.5 bg-rose-500/90 hover:bg-rose-600 active:scale-95 text-white font-black text-[11px] rounded-lg shadow-sm flex items-center gap-1 border border-rose-300/40 cursor-pointer transition-all ml-auto sm:ml-0"
                                                        title={t ? t("Log Keluar dari Akaun", "Log Out from Account") : "Log Keluar"}
                                                    >
                                                        <span>🚪</span>
                                                        <span>{t ? t("Log Keluar", "Log Out") : "Log Keluar"}</span>
                                                    </button>
                                                </div>
                                                <p className="text-xs text-sky-100 font-medium mt-1">
                                                    🚀 Gelaran Semasa: <span className="text-amber-300 font-black">{currentRank}</span>
                                                </p>

                                                {/* Progress Bar XP Menuju Tahap Seterusnya */}
                                                <div className="mt-3 w-full max-w-sm">
                                                    <div className="flex items-center justify-between text-[11px] font-black text-sky-100 mb-1">
                                                        <span>Kemajuan Tahap {levelNum}</span>
                                                        <span className="text-amber-300 font-black">{effectiveXP.toLocaleString()} / {maxLevelXP.toLocaleString()} XP</span>
                                                    </div>
                                                    <div className="w-full h-3.5 bg-slate-950/40 rounded-full p-0.5 border border-white/25 overflow-hidden relative shadow-inner">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 rounded-full transition-all duration-1000 relative"
                                                            style={{ width: `${percentage}%` }}
                                                        >
                                                            <div className="shimmer-bar" />
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] text-sky-200 mt-1 block">
                                                        {xpNeeded > 0 ? (
                                                            <>⚡ Perlu <strong className="text-white">{xpNeeded.toLocaleString()} XP</strong> lagi untuk naik ke <strong className="text-white">{nextLevel}</strong></>
                                                        ) : (
                                                            <>🎉 Tahniah! Anda telah mencapai tahap elit tertinggi!</>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3 Quick Badges (Streak, Stars, Total Score) */}
                                        <div className="flex md:flex-col gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 justify-around">
                                            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 shadow-sm">
                                                <span className="text-2xl">🔥</span>
                                                <div>
                                                    <span className="text-[10px] uppercase font-bold text-sky-200 block leading-tight">Streak</span>
                                                    <span className="text-xs sm:text-sm font-black text-amber-300">{effectiveStreak} {t ? t("Hari Aktif", "Active Days") : "Hari Aktif"}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 shadow-sm">
                                                <span className="text-2xl">⭐</span>
                                                <div>
                                                    <span className="text-[10px] uppercase font-bold text-sky-200 block leading-tight">Bintang STEM</span>
                                                    <span className="text-xs sm:text-sm font-black text-amber-300">{totalStars} / 24 {t ? t("Bintang", "Stars") : "Bintang"}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 shadow-sm">
                                                <span className="text-2xl">💎</span>
                                                <div>
                                                    <span className="text-[10px] uppercase font-bold text-sky-200 block leading-tight">Jumlah Skor</span>
                                                    <span className="text-xs sm:text-sm font-black text-emerald-300">{totalScore.toLocaleString()} Pts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* KAD HERO UNTUK PENGGUNA BELUM LOG MASUK (MOD TETAMU - TANPA NAMA) */
                                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-700 via-sky-900 to-indigo-900 p-6 sm:p-7 text-white shadow-xl border-3 border-sky-400/30">
                                    <div className="absolute -right-10 -top-10 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

                                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                                        {/* Avatar & Identiti Tetamu */}
                                        <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                                            <div className="relative shrink-0">
                                                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-gradient-to-tr from-slate-400 via-sky-300 to-indigo-300 p-1 shadow-lg shadow-slate-900/40 anim-float">
                                                    <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center text-4xl border-2 border-white/40 overflow-hidden relative">
                                                        👤
                                                    </div>
                                                </div>
                                                <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-slate-200 to-slate-400 text-slate-900 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md border-2 border-white uppercase">
                                                    {t ? t("Tetamu", "Guest") : "Tetamu"}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                                                        {t ? t("Penjelajah Tetamu", "Guest Explorer") : "Penjelajah Tetamu"}
                                                    </h3>
                                                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-sky-200 px-2.5 py-0.5 rounded-full border border-white/20">
                                                        {t ? t("Sesi Tanpa Nama", "Anonymous Session") : "Sesi Tanpa Nama"}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-sky-100 font-medium mt-1">
                                                    🔒 {t ? t("Nama & rekod pembelajaran belum disimpan secara kekal.", "Name & learning records are not permanently saved.") : "Nama & rekod pembelajaran belum disimpan secara kekal."}
                                                </p>

                                                {/* CTA DAFTAR / LOG MASUK KAD KECIL DALAM HERO */}
                                                <div className="mt-3.5 p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-2">
                                                    <p className="text-xs text-sky-100 font-bold flex items-center gap-1.5">
                                                        <span>✨</span>
                                                        <span>{t ? t("Daftar percuma untuk simpan nama & kumpul lencana!", "Register for free to save your name & collect badges!") : "Daftar percuma untuk simpan nama & kumpul lencana!"}</span>
                                                    </p>
                                                    <div className="flex items-center gap-2 flex-wrap pt-0.5">
                                                        <button
                                                            onClick={() => { playAudioFeedback("sparkle"); onNavigate("register"); }}
                                                            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
                                                        >
                                                            <span>📝</span>
                                                            <span>{t ? t("Daftar Murid Baharu", "Register New Student") : "Daftar Murid Baharu"}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => { playAudioFeedback("tap"); onNavigate("login"); }}
                                                            className="px-3.5 py-1.5 bg-white/20 hover:bg-white/35 text-white font-black text-xs rounded-xl border border-white/30 cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
                                                        >
                                                            <span>🔑</span>
                                                            <span>{t ? t("Log Masuk", "Log In") : "Log Masuk"}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3 Quick Badges (Streak, Stars, Total Score - Sesi Tetamu) */}
                                        <div className="flex md:flex-col gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 justify-around">
                                            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-sm">
                                                <span className="text-2xl">🔥</span>
                                                <div>
                                                    <span className="text-[10px] uppercase font-bold text-slate-300 block leading-tight">{t ? t("Streak", "Streak") : "Streak"}</span>
                                                    <span className="text-xs sm:text-sm font-black text-amber-300">{t ? t("1 Hari (Sesi)", "1 Day (Session)") : "1 Hari (Sesi)"}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-sm">
                                                <span className="text-2xl">⭐</span>
                                                <div>
                                                    <span className="text-[10px] uppercase font-bold text-slate-300 block leading-tight">{t ? t("Bintang STEM", "STEM Stars") : "Bintang STEM"}</span>
                                                    <span className="text-xs sm:text-sm font-black text-sky-300">{solarScore > 0 ? "8 / 24 ⭐" : "0 / 24 ⭐"}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-sm">
                                                <span className="text-2xl">💎</span>
                                                <div>
                                                    <span className="text-[10px] uppercase font-bold text-slate-300 block leading-tight">{t ? t("Markah Sesi", "Session Score") : "Markah Sesi"}</span>
                                                    <span className="text-xs sm:text-sm font-black text-emerald-300">{(quizHighScore || 0) + (solarScore || 0) + (plantScore || 0)} Pts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* KAD REKOD & PENCAPAIAN UTAMA (3D CARDS GRID) */}
                            {(dashboardActiveTab === "all" || dashboardActiveTab === "records") && (
                                <div className="anim-fade-in">
                                    <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2 mb-3">
                                        <span>🎯</span>
                                        <span>Rekod & Pencapaian Aktiviti</span>
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* Kad 1: Makmal Tumbuhan & Kebun Fotosintesis (BARU!) */}
                                        <div className="bg-gradient-to-b from-emerald-500/10 via-white to-emerald-50 rounded-3xl p-5 border-2 border-emerald-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                                                        🌿
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                        !plantSubmitted || plantScore === 0
                                                            ? "bg-slate-100 text-slate-600 border-slate-200"
                                                            : (plantScore >= 800 ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-teal-100 text-teal-800 border-teal-200")
                                                    }`}>
                                                        {!plantSubmitted || plantScore === 0 ? "Belum Mula" : (plantScore >= 800 ? "Sempurna" : "Selesai")}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800">Makmal Tumbuhan</h4>
                                                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                                                    {effectivePlantScore} <span className="text-xs font-bold text-slate-400">/ 800</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                                                    {plantSubmitted && plantScore > 0
                                                        ? "Fotosintesis berjaya dijalankan & anatomi pokok dikuasai!"
                                                        : "Besarkan bunga matahari & padankan 5 anatomi pokok."
                                                    }
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => { playAudioFeedback("tap"); onNavigate("plantActivity"); }}
                                                className="mt-4 w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <span>🌱</span>
                                                <span>{plantSubmitted && plantScore > 0 ? "Main Semula" : "Mula Eksperimen"}</span>
                                            </button>
                                        </div>

                                        {/* Kad 2: Sistem Suria Drag & Drop */}
                                        <div className="bg-gradient-to-b from-purple-500/10 via-white to-purple-50 rounded-3xl p-5 border-2 border-purple-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                                                        🪐
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                        !solarSubmitted || solarScore === 0
                                                            ? "bg-slate-100 text-slate-600 border-slate-200"
                                                            : (solarScore >= 800 ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-sky-100 text-sky-700 border-sky-200")
                                                    }`}>
                                                        {!solarSubmitted || solarScore === 0 ? "Belum Mula" : (solarScore >= 800 ? "Sempurna" : "Selesai")}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-purple-700">Aktiviti Suria</h4>
                                                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                                                    {effectiveSolarScore} <span className="text-xs font-bold text-slate-400">/ 800</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                                                    {solarSubmitted && solarScore > 0
                                                        ? `${Math.round(solarScore / 100)} daripada 8 planet berada di orbit tepat.`
                                                        : "Susun 8 planet ke dalam orbit yang tepat."
                                                    }
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => { playAudioFeedback("tap"); onNavigate("solarDragDrop"); }}
                                                className="mt-4 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <span>🎮</span>
                                                <span>{solarSubmitted && solarScore > 0 ? "Main Semula" : "Mula Main"}</span>
                                            </button>
                                        </div>

                                        {/* Kad: Cabaran Spelling Bee STEM (Baru!) */}
                                        <div className="bg-gradient-to-b from-amber-500/10 via-white to-amber-50 rounded-3xl p-5 border-2 border-amber-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                                                        🐝
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                        !spellingSubmitted || spellingScore === 0
                                                            ? "bg-slate-100 text-slate-600 border-slate-200"
                                                            : (spellingScore >= 800 ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-yellow-100 text-yellow-800 border-yellow-200")
                                                    }`}>
                                                        {!spellingSubmitted || spellingScore === 0 ? "Belum Mula" : (spellingScore >= 800 ? "Pakar Ejaan" : "Selesai")}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-amber-800">Spelling Bee STEM</h4>
                                                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                                                    {effectiveSpellingScore} <span className="text-xs font-bold text-slate-400">PTS</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                                                    {spellingSubmitted && spellingScore > 0
                                                        ? "Kemahiran audio & ejaan istilah sains bahasa Inggeris diuji!"
                                                        : "Dengar sebutan audio dan eja perkataan sains tepat 30s."
                                                    }
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => { playAudioFeedback("tap"); onNavigate("spellingBee"); }}
                                                className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-amber-950 text-xs font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <span>🐝</span>
                                                <span>{spellingSubmitted && spellingScore > 0 ? "Main Semula" : "Mula Cabaran"}</span>
                                            </button>
                                        </div>

                                        {/* Kad: Pertandingan Sifir Kilat (Baru!) */}
                                        <div className="bg-gradient-to-b from-indigo-500/10 via-white to-indigo-50 rounded-3xl p-5 border-2 border-indigo-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                                                        🔢
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                        !mathSubmitted || mathScore === 0
                                                            ? "bg-slate-100 text-slate-600 border-slate-200"
                                                            : (mathScore >= 300 ? "bg-indigo-100 text-indigo-900 border-indigo-300" : "bg-purple-100 text-purple-800 border-purple-200")
                                                    }`}>
                                                        {!mathSubmitted || mathScore === 0 ? "Belum Mula" : (mathScore >= 300 ? "Jaguh Sifir" : "Selesai")}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-800">Pertandingan Sifir</h4>
                                                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                                                    {effectiveMathScore} <span className="text-xs font-bold text-slate-400">PTS</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                                                    {mathSubmitted && mathScore > 0
                                                        ? "Ujian kepantasan congak sifir 1-12 dan ketepatan masa!"
                                                        : "Cabaran 60 saat atau 10 soalan pantas uji ketajaman minda."
                                                    }
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => { playAudioFeedback("tap"); onNavigate("mathQuiz"); }}
                                                className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <span>🔢</span>
                                                <span>{mathSubmitted && mathScore > 0 ? "Main Semula" : "Mula Cabaran"}</span>
                                            </button>
                                        </div>

                                        {/* Kad 2: Kuiz Pantas 20s */}
                                        <div className="bg-gradient-to-b from-amber-500/10 via-white to-amber-50 rounded-3xl p-5 border-2 border-amber-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all shadow-sm">
                                                        ⚡
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                        effectiveQuizScore === 0
                                                            ? "bg-slate-100 text-slate-600 border-slate-200"
                                                            : (effectiveQuizScore >= 1200 ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-emerald-100 text-emerald-800 border-emerald-200")
                                                    }`}>
                                                        {effectiveQuizScore === 0 ? "Belum Dicabar" : (effectiveQuizScore >= 1200 ? "Skor Maks" : "Skor Tertinggi")}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-amber-700">Kuiz Pantas 20s</h4>
                                                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                                                    {effectiveQuizScore.toLocaleString()} <span className="text-xs font-bold text-slate-400">PTS</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                                                    {effectiveQuizScore > 0
                                                        ? "Rekod skor tertinggi peribadi kuiz pantas 20 saat!"
                                                        : "Jawab 5 soalan pantas untuk mengumpul mata XP!"
                                                    }
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => { playAudioFeedback("tap"); onNavigate("quizList"); }}
                                                className="mt-4 w-full py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <GraphicLightningBolt className="w-3.5 h-3.5" />
                                                <span>Cabar Kuiz</span>
                                            </button>
                                        </div>

                                        {/* Kad 3: Modul Nota Dibaca */}
                                        <div className="bg-gradient-to-b from-sky-500/10 via-white to-sky-50 rounded-3xl p-5 border-2 border-sky-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                                                        📖
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                        readTopicsCount === 0
                                                            ? "bg-slate-100 text-slate-600 border-slate-200"
                                                            : (readTopicsCount >= 2 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-sky-100 text-sky-800 border-sky-200")
                                                    }`}>
                                                        {readTopicsCount === 0 ? "Belum Mula" : (readTopicsCount >= 2 ? "100% Selesai" : "50% Selesai")}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-sky-700">Nota Sains</h4>
                                                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                                                    {readTopicsCount} <span className="text-xs font-bold text-slate-400">/ 2 Topik</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                                                    {readTopicsCount >= 2
                                                        ? "Sistem Suria & Fotosintesis berjaya diterokai."
                                                        : (readTopicsCount === 1 ? "1 modul dibaca, 1 modul lagi untuk lengkap!" : "Terokai modul nota visual Sistem Suria & Fotosintesis.")
                                                    }
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => { playAudioFeedback("tap"); onNavigate("learningList"); }}
                                                className="mt-4 w-full py-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <GraphicBookOpen className="w-3.5 h-3.5" />
                                                <span>{readTopicsCount >= 2 ? "Ulang Kaji" : (readTopicsCount === 1 ? "Sambung Baca" : "Mula Baca")}</span>
                                            </button>
                                        </div>

                                        {/* Kad 4: Kepantasan Analisis Minda */}
                                        <div className="bg-gradient-to-b from-emerald-500/10 via-white to-emerald-50 rounded-3xl p-5 border-2 border-emerald-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all shadow-sm">
                                                        ⏱️
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                        effectiveQuizScore === 0
                                                            ? "bg-slate-100 text-slate-600 border-slate-200"
                                                            : (averageQuizSpeed && parseFloat(averageQuizSpeed) <= 8 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-teal-100 text-teal-800 border-teal-200")
                                                    }`}>
                                                        {effectiveQuizScore === 0 ? "Belum Diuji" : (averageQuizSpeed && parseFloat(averageQuizSpeed) <= 8 ? "Respons Kilat" : "Respons Pantas")}
                                                    </span>
                                                </div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700">Kelajuan Minda</h4>
                                                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                                                    {effectiveQuizScore > 0 && averageQuizSpeed ? `${averageQuizSpeed}s` : "- s"} <span className="text-xs font-bold text-slate-400">purata</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">
                                                    {effectiveQuizScore > 0
                                                        ? "Masa respons purata anda daripada had 20 saat!"
                                                        : "Selesaikan kuiz 20 saat untuk merekodkan kelajuan minda."
                                                    }
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => { playAudioFeedback("tap"); onNavigate("quizList"); }}
                                                className="mt-4 w-full py-2 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <span>⚡</span>
                                                <span>{effectiveQuizScore > 0 ? "Latih Laju" : "Uji Minda"}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* DUA LAJUR: KOMPETENSI STEM (KIRI) & MISI HARIAN (KANAN) */}
                            {(dashboardActiveTab === "all" || dashboardActiveTab === "skills" || dashboardActiveTab === "quests") && (
                                <div className={`grid gap-5 pt-2 anim-fade-in ${dashboardActiveTab === "all" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>

                                    {/* Lajur Kiri: Penguasaan Kemahiran STEM */}
                                    {(dashboardActiveTab === "all" || dashboardActiveTab === "skills") && (
                                        <div className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-200/80 shadow-sm flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl">🧬</span>
                                                        <h3 className="text-sm sm:text-base font-black text-slate-800">
                                                            Kompetensi & Kemahiran STEM
                                                        </h3>
                                                    </div>
                                                    <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                                                        Purata {skillsAverage}%
                                                    </span>
                                                </div>

                                                <div className="space-y-4">
                                                    {stemSkills.map((skill, idx) => (
                                                        <div key={idx} className="space-y-1.5">
                                                            <div className="flex items-center justify-between text-xs">
                                                                <span className="font-black text-slate-700 flex items-center gap-1.5">
                                                                    <span>{skill.icon}</span>
                                                                    <span>{skill.name}</span>
                                                                </span>
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${skill.bgBadge} ${skill.textColor}`}>
                                                                        {skill.status}
                                                                    </span>
                                                                    <span className="font-black text-slate-900">{skill.score}%</span>
                                                                </div>
                                                            </div>
                                                            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
                                                                <div
                                                                    className={`h-full rounded-full transition-all duration-700 ${skill.barColor}`}
                                                                    style={{ width: `${skill.score}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-5 p-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-sky-200 flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-sky-200/70 flex items-center justify-center text-lg shrink-0">
                                                    💡
                                                </div>
                                                <p className="text-[11px] text-slate-600 font-medium leading-snug">
                                                    {skillsAverage === 0 ? (
                                                        <><strong>Tip Cikgu Robot:</strong> Selamat datang ke Exploria, {studentName || "Penjelajah"}! Mulakan pengembaraan sains anda dengan membaca modul Nota Sains dan mencuba Aktiviti Susun Suria untuk membina kemahiran STEM anda.</>
                                                    ) : (
                                                        <><strong>Tip Cikgu Robot:</strong> Purata kemahiran STEM anda adalah <strong>{skillsAverage}%</strong>! Teruskan mencabar kuiz pantas dan menyusun planet untuk mencapai penguasaan 100%.</>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Lajur Kanan: Misi Harian & Ganjaran XP */}
                                    {(dashboardActiveTab === "all" || dashboardActiveTab === "quests") && (
                                        <div className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-200/80 shadow-sm flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl">📋</span>
                                                        <h3 className="text-sm sm:text-base font-black text-slate-800">
                                                            Misi Harian Penjelajah
                                                        </h3>
                                                    </div>
                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${completedQuestsCount === 3 ? "text-emerald-700 bg-emerald-100" : "text-amber-800 bg-amber-100"}`}>
                                                        {completedQuestsCount}/3 Selesai
                                                    </span>
                                                </div>

                                                <div className="space-y-3">
                                                    {quests.map((quest) => (
                                                        <div
                                                            key={quest.id}
                                                            className="bg-white rounded-2xl p-3.5 border-2 border-slate-200 flex items-center justify-between gap-3 shadow-xs hover:border-sky-300 transition-all"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                                                                    {quest.icon}
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-xs font-black text-slate-800 leading-snug">
                                                                        {quest.title}
                                                                    </h4>
                                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${quest.colorBadge}`}>
                                                                            {quest.category}
                                                                        </span>
                                                                        <span className="text-[10px] font-black text-amber-600">
                                                                            {quest.xp}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="shrink-0 flex items-center gap-2">
                                                                {quest.completed ? (
                                                                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-sm" title="Selesai">
                                                                        ✓
                                                                    </span>
                                                                ) : (
                                                                    <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-bold" title="Belum Selesai">
                                                                        0/1
                                                                    </span>
                                                                )}
                                                                <button
                                                                    onClick={() => { playAudioFeedback("tap"); onNavigate(quest.targetView); }}
                                                                    className="px-2.5 py-1 text-[11px] font-black text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 rounded-lg cursor-pointer transition-all border border-sky-200"
                                                                >
                                                                    Buka
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Bonus Harian Ditebus atau Peringatan Tetamu */}
                                            {isLoggedIn ? (
                                                <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-yellow-400/20 rounded-2xl border-2 border-amber-300 flex items-center justify-between">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="text-2xl animate-bounce">🎁</span>
                                                        <div>
                                                            <span className="text-[10px] uppercase font-black text-amber-800 block">Bonus Misi Harian</span>
                                                            <span className="text-xs font-black text-slate-900">
                                                                {completedQuestsCount === 3
                                                                    ? "+300 XP Berjaya Ditebus!"
                                                                    : `Selesaikan ${3 - completedQuestsCount} lagi misi untuk tebus +300 XP!`
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 font-black text-xs rounded-xl shadow-sm ${completedQuestsCount === 3 ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-600"}`}>
                                                        {completedQuestsCount === 3 ? "Ditebus ✅" : `${completedQuestsCount}/3 Misi`}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="mt-4 p-3.5 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl border-2 border-sky-200 flex items-center justify-between flex-wrap gap-2">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="text-2xl">🎁</span>
                                                        <div>
                                                            <span className="text-[10px] uppercase font-black text-sky-800 block">{t ? t("Bonus Misi Harian", "Daily Quest Bonus") : "Bonus Misi Harian"}</span>
                                                            <span className="text-xs font-black text-slate-800">{t ? t("Log masuk untuk tebus +300 XP ke akaun anda!", "Log in to claim +300 XP into your account!") : "Log masuk untuk tebus +300 XP ke akaun anda!"}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => { playAudioFeedback("tap"); onNavigate("login"); }}
                                                        className="px-3 py-1.5 bg-[#0099e5] hover:bg-[#0088cc] text-white font-black text-xs rounded-xl shadow-sm cursor-pointer active:scale-95 transition-all"
                                                    >
                                                        {t ? t("Log Masuk", "Log In") : "Log Masuk"} ➔
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                            )}

                            {/* KOLEKSI LENCANA & PETI TROFI STEM (INTERACTIVE CABINET) */}
                            {(dashboardActiveTab === "all" || dashboardActiveTab === "badges") && (
                                <div className="bg-gradient-to-b from-sky-50/70 via-white to-slate-50 rounded-3xl p-6 border-2 border-sky-200 shadow-md anim-fade-in">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                                        <div>
                                            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                                                <span>🏆</span>
                                                <span>Peti Lencana & Trofi Kehormatan STEM</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Klik mana-mana lencana untuk melihat butiran pencapaian dan cara membukanya!
                                            </p>
                                        </div>
                                        <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-center shadow-xs">
                                            {unlockedBadgesCount} / 6 Lencana Terkumpul 🏅
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 pt-2">
                                        {badges.map((badge) => (
                                            <div
                                                key={badge.id}
                                                onClick={() => {
                                                    playAudioFeedback("sparkle");
                                                    setSelectedBadgeModal(badge);
                                                }}
                                                className={`bg-white rounded-2xl p-3 border-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group relative overflow-hidden ${
                                                    badge.unlocked
                                                        ? "border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 active:scale-95"
                                                        : "border-slate-200/80 bg-slate-50/70 opacity-80 hover:opacity-100 hover:border-slate-300"
                                                }`}
                                            >
                                                {/* Top Level Pill */}
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border mb-2 ${
                                                    badge.unlocked
                                                        ? "text-amber-800 bg-amber-50 border-amber-200"
                                                        : "text-slate-500 bg-slate-100 border-slate-200"
                                                }`}>
                                                    {badge.unlocked ? badge.level : "Terkunci"}
                                                </span>

                                                {/* Badge Icon With 3D Halo */}
                                                <div className="relative mb-2">
                                                    <div className={`w-14 h-14 rounded-2xl p-0.5 shadow-md transition-all ${
                                                        badge.unlocked
                                                            ? "bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 group-hover:rotate-6 group-hover:scale-110"
                                                            : "bg-gradient-to-tr from-slate-300 to-slate-400 grayscale"
                                                    }`}>
                                                        <div className={`w-full h-full rounded-[0.9rem] flex items-center justify-center text-2xl ${
                                                            badge.unlocked ? "bg-slate-900" : "bg-slate-800/80"
                                                        }`}>
                                                            {badge.icon}
                                                        </div>
                                                    </div>
                                                    {badge.unlocked ? (
                                                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full text-white text-[10px] font-black flex items-center justify-center border border-white shadow-xs">
                                                            ✓
                                                        </span>
                                                    ) : (
                                                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-700 rounded-full text-white text-[9px] font-black flex items-center justify-center border border-white shadow-xs">
                                                            🔒
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 className={`text-xs font-black line-clamp-1 transition-colors ${
                                                    badge.unlocked ? "text-slate-800 group-hover:text-[#0099e5]" : "text-slate-500"
                                                }`}>
                                                    {badge.name}
                                                </h4>
                                                <span className={`text-[10px] font-bold mt-0.5 ${
                                                    badge.unlocked ? "text-amber-600" : "text-slate-400"
                                                }`}>
                                                    {badge.xp}
                                                </span>
                                                <span className="text-[9px] text-slate-400 mt-1 block">
                                                    {badge.unlocked ? "Klik butiran 🔍" : "Syarat buka 🔒"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PINTASAN PANTAS (QUICK LAUNCHER ACTION BUTTONS) */}
                            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-center sm:text-left">
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-sky-500 text-slate-950 px-2.5 py-0.5 rounded-full inline-block mb-1">
                                        Misi Seterusnya
                                    </span>
                                    <h4 className="text-lg font-black text-white">
                                        Bersedia Untuk Misi Seterusnya?
                                    </h4>
                                    <p className="text-xs text-slate-300 mt-0.5">
                                        Teruskan cabaran untuk mengumpul lebih banyak mata XP dan naik ke {nextLevel}!
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                                    <button
                                        onClick={() => { playAudioFeedback("tap"); onNavigate("solarDragDrop"); }}
                                        className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                                    >
                                        <span>🪐</span>
                                        <span>Susun Suria</span>
                                    </button>
                                    <button
                                        onClick={() => { playAudioFeedback("tap"); onNavigate("quizList"); }}
                                        className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                                    >
                                        <GraphicLightningBolt className="w-3.5 h-3.5" />
                                        <span>Kuiz 20s</span>
                                    </button>
                                    <button
                                        onClick={() => { playAudioFeedback("tap"); onNavigate("learningList"); }}
                                        className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                                    >
                                        <GraphicBookOpen className="w-3.5 h-3.5" />
                                        <span>Nota Sains</span>
                                    </button>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={() => {
                                                if (playAudioFeedback) playAudioFeedback("tap");
                                                if (onLogout) onLogout();
                                            }}
                                            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 active:scale-95 text-rose-700 font-black text-xs rounded-xl shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
                                            title={t ? t("Log keluar dari akaun", "Log out of account") : "Log keluar dari akaun"}
                                        >
                                            <span>🚪</span>
                                            <span>{t ? t("Log Keluar Akaun", "Log Out Account") : "Log Keluar Akaun"}</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => { playAudioFeedback("tap"); onNavigate("login"); }}
                                            className="px-4 py-2.5 bg-[#0099e5] hover:bg-[#0088cc] active:scale-95 text-white font-black text-xs rounded-xl shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
                                            title={t ? t("Log Masuk Murid", "Student Login") : "Log Masuk Murid"}
                                        >
                                            <span>🔑</span>
                                            <span>{t ? t("Log Masuk", "Login") : "Log Masuk"}</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>

            {/* MODAL BUTIRAN LENCANA */}
            {selectedBadgeModal && (
                        <div
                            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 anim-fade-in"
                            onClick={() => { playAudioFeedback("tap"); setSelectedBadgeModal(null); }}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-[2rem] max-w-md w-full p-6 sm:p-7 shadow-2xl border-4 border-amber-400 text-center relative overflow-hidden anim-scale-up"
                            >
                                {/* Background Glow */}
                                <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />
                                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-400/25 rounded-full blur-2xl pointer-events-none" />

                                {/* Close Button */}
                                <button
                                    onClick={() => { playAudioFeedback("tap"); setSelectedBadgeModal(null); }}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-black cursor-pointer transition-all"
                                >
                                    ✕
                                </button>

                                {/* Badge Icon in Glowing Frame */}
                                <div className={`mx-auto w-24 h-24 rounded-3xl p-1 shadow-xl anim-float mt-2 ${
                                    selectedBadgeModal.unlocked
                                        ? "bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 shadow-amber-500/30"
                                        : "bg-gradient-to-tr from-slate-400 to-slate-600 shadow-slate-500/30 grayscale"
                                }`}>
                                    <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center text-5xl">
                                        {selectedBadgeModal.icon}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                                        selectedBadgeModal.unlocked
                                            ? "bg-amber-100 text-amber-800 border-amber-300"
                                            : "bg-slate-100 text-slate-600 border-slate-300"
                                    }`}>
                                        Lencana {selectedBadgeModal.level} • {selectedBadgeModal.category}
                                    </span>
                                    <h3 className="text-2xl font-black text-slate-900 mt-2">
                                        {selectedBadgeModal.name}
                                    </h3>
                                    <p className="text-xs font-black text-[#0099e5] mt-0.5">
                                        {selectedBadgeModal.title}
                                    </p>
                                </div>

                                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                                        {selectedBadgeModal.unlocked ? "Kriteria Diperoleh:" : "Syarat Membuka Lencana:"}
                                    </span>
                                    <p className="text-xs font-bold text-slate-700 leading-relaxed">
                                        {selectedBadgeModal.requirement || selectedBadgeModal.description}
                                    </p>
                                    <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                                        <span className="text-slate-500 font-medium">Status & Tarikh:</span>
                                        {selectedBadgeModal.unlocked ? (
                                            <span className="font-black text-emerald-600 flex items-center gap-1">
                                                <span>✓ Diperoleh</span>
                                                <span className="text-slate-400">({selectedBadgeModal.date})</span>
                                            </span>
                                        ) : (
                                            <span className="font-black text-rose-600 flex items-center gap-1">
                                                <span>🔒 Terkunci</span>
                                                <span className="text-slate-400">(Belum Dicapai)</span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* STEM Fun Fact */}
                                <div className="mt-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-left flex items-start gap-2.5">
                                    <span className="text-lg shrink-0">✨</span>
                                    <p className="text-[11px] text-amber-900 font-semibold leading-snug">
                                        <strong>Fakta Hebat:</strong> {selectedBadgeModal.funFact}
                                    </p>
                                </div>

                                <button
                                    onClick={() => { playAudioFeedback("tap"); setSelectedBadgeModal(null); }}
                                    className="mt-5 w-full py-3 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg cursor-pointer transition-all"
                                >
                                    Tutup Paparan
                                </button>
                            </div>
                        </div>
                    )}
        </div>
    );
}
