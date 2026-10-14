"use client";

import React from "react";

/**
 * 1. Grafik 3D Isometric STEM Blocks (Sama persis seperti kad "Math" dalam rujukan pengguna)
 * - Blok kubus ungu 3D dengan simbol '%'
 * - Blok kubus hijau 3D dengan simbol '✖'
 * - Blok kuning 3D dan simbol floating math
 */
export function Graphic3DMathBlocks({ className = "w-24 h-24" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Bayang lembut kubus */}
                <filter id="cubeShadow" x="-10%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
                </filter>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Gradien Kubus Ungu */}
                <linearGradient id="purpleTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
                <linearGradient id="purpleLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#7E22CE" />
                </linearGradient>
                <linearGradient id="purpleRight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7E22CE" />
                    <stop offset="100%" stopColor="#581C87" />
                </linearGradient>

                {/* Gradien Kubus Hijau */}
                <linearGradient id="greenTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="greenLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="greenRight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#065F46" />
                </linearGradient>

                {/* Gradien Kubus Kuning/Oren Sebelah */}
                <linearGradient id="yellowTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#FACC15" />
                </linearGradient>
                <linearGradient id="yellowLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
                <linearGradient id="yellowRight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#CA8A04" />
                    <stop offset="100%" stopColor="#A16207" />
                </linearGradient>

                {/* Simbol Glow */}
                <linearGradient id="crossGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="100%" stopColor="#FDE047" />
                </linearGradient>
            </defs>

            {/* Bayang tapak asas */}
            <ellipse cx="80" cy="142" rx="55" ry="12" fill="#000000" fillOpacity="0.22" />

            {/* 1. KUBUS KUNING (Kiri Belakang) */}
            <g transform="translate(-10, 20)">
                {/* Muka Atas */}
                <path d="M40 55 L65 42 L90 55 L65 68 Z" fill="url(#yellowTop)" />
                {/* Muka Kiri */}
                <path d="M40 55 L65 68 L65 102 L40 89 Z" fill="url(#yellowLeft)" />
                {/* Muka Kanan */}
                <path d="M65 68 L90 55 L90 89 L65 102 Z" fill="url(#yellowRight)" />
            </g>

            {/* 2. KUBUS UNGU (Kanan Atas) */}
            <g filter="url(#cubeShadow)">
                {/* Muka Atas */}
                <path d="M85 45 L118 28 L151 45 L118 62 Z" fill="url(#purpleTop)" />
                {/* Muka Kiri */}
                <path d="M85 45 L118 62 L118 102 L85 85 Z" fill="url(#purpleLeft)" />
                {/* Muka Kanan */}
                <path d="M118 62 L151 45 L151 85 L118 102 Z" fill="url(#purpleRight)" />

                {/* Simbol '%' Putih 3D pada Muka Atas Kubus Ungu */}
                <g transform="translate(118, 44) rotate(-22) scale(0.9)" opacity="0.95">
                    <circle cx="-10" cy="-6" r="3.5" fill="white" />
                    <circle cx="-10" cy="-6" r="1.5" fill="#A855F7" />
                    <line x1="-8" y1="8" x2="8" y2="-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="10" cy="6" r="3.5" fill="white" />
                    <circle cx="10" cy="6" r="1.5" fill="#A855F7" />
                </g>
            </g>

            {/* 3. KUBUS HIJAU (Tengah Hadapan) */}
            <g filter="url(#cubeShadow)">
                {/* Muka Atas */}
                <path d="M38 78 L78 57 L118 78 L78 99 Z" fill="url(#greenTop)" />
                {/* Muka Kiri */}
                <path d="M38 78 L78 99 L78 142 L38 121 Z" fill="url(#greenLeft)" />
                {/* Muka Kanan */}
                <path d="M78 99 L118 78 L118 121 L78 142 Z" fill="url(#greenRight)" />

                {/* Kilauan / Highlight Garisan Sisi */}
                <path d="M38 78 L78 99 L118 78" stroke="white" strokeWidth="1" strokeOpacity="0.45" fill="none" />
                <path d="M78 99 L78 142" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none" />
            </g>

            {/* Simbol '✖' Terapung 3D Kuning/Kapur (Floating Cross) */}
            <g transform="translate(78, 62) rotate(15)" filter="url(#softGlow)">
                <rect x="-11" y="-3.5" width="22" height="7" rx="3" fill="url(#crossGlow)" />
                <rect x="-3.5" y="-11" width="7" height="22" rx="3" fill="url(#crossGlow)" />
            </g>

            {/* Bintang / Sparkle kecil melayang */}
            <path
                d="M130 18 L132 23 L137 25 L132 27 L130 32 L128 27 L123 25 L128 23 Z"
                fill="#FEF08A"
                opacity="0.9"
            />
            <circle cx="30" cy="50" r="2.5" fill="white" opacity="0.8" />
            <circle cx="145" cy="70" r="2" fill="white" opacity="0.6" />
        </svg>
    );
}

/**
 * 2. Grafik 3D Science Box & Magic Potion Beaker (Sama persis seperti kad "Science" dalam rujukan pengguna)
 * - Kotak kadbod terbuka 3D dengan kepak terbuka
 * - Botol kelalang sains bulat (beaker) dengan cecair ungu berkilauan & buih
 */
export function Graphic3DSciencePotionBox({ className = "w-24 h-24" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="potionShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
                </filter>
                <filter id="potionGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Gradien Kotak Kadbod 3D */}
                <linearGradient id="boxFrontLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="boxFrontRight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B45309" />
                    <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <linearGradient id="boxFlapTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="boxInside" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#78350F" />
                    <stop offset="100%" stopColor="#451A03" />
                </linearGradient>

                {/* Gradien Cecair Potion Ungu */}
                <radialGradient id="liquidGlow" cx="45%" cy="55%" r="50%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="45%" stopColor="#C084FC" />
                    <stop offset="85%" stopColor="#7E22CE" />
                    <stop offset="100%" stopColor="#581C87" />
                </radialGradient>

                {/* Gradien Kaca Kelalang */}
                <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
                </linearGradient>

                {/* Penutup Gabus */}
                <linearGradient id="corkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
            </defs>

            {/* Bayang tapak kotak & botol */}
            <ellipse cx="90" cy="144" rx="55" ry="12" fill="#000000" fillOpacity="0.22" />

            {/* 1. KOTAK KADBOD 3D TERBUKA */}
            <g filter="url(#potionShadow)">
                {/* Bahagian Dalam Kotak (Gelap) */}
                <path d="M48 90 L88 74 L128 90 L88 106 Z" fill="url(#boxInside)" />

                {/* Muka Depan Kiri Kotak */}
                <path d="M48 90 L88 106 L88 140 L48 124 Z" fill="url(#boxFrontLeft)" />

                {/* Muka Depan Kanan Kotak */}
                <path d="M88 106 L128 90 L128 124 L88 140 Z" fill="url(#boxFrontRight)" />

                {/* Kepak Kotak Depan Kiri Terlipat Keluar */}
                <path d="M48 90 L88 106 L72 122 L32 106 Z" fill="url(#boxFlapTop)" opacity="0.95" />

                {/* Kepak Kotak Depan Kanan Terlipat Keluar */}
                <path d="M88 106 L128 90 L144 106 L104 122 Z" fill="url(#boxFrontLeft)" opacity="0.95" />

                {/* Kepak Kotak Belakang Kiri */}
                <path d="M48 90 L88 74 L80 58 L40 74 Z" fill="url(#boxFlapTop)" opacity="0.9" />

                {/* Garisan lipatan kotak */}
                <line x1="88" y1="106" x2="88" y2="140" stroke="#78350F" strokeWidth="1.2" strokeOpacity="0.4" />
            </g>

            {/* 2. BOTOL KELALANG POTION 3D (Keluar dari Kotak di Kanan Atas) */}
            <g filter="url(#potionShadow)" transform="translate(18, -4)">
                {/* Bayang botol pada kotak */}
                <ellipse cx="92" cy="108" rx="20" ry="6" fill="#000000" fillOpacity="0.3" />

                {/* Badan Kaca Kelalang (Bulat) */}
                <circle cx="92" cy="86" r="28" fill="url(#liquidGlow)" />

                {/* Leher Kelalang */}
                <path d="M85 58 L85 40 L99 40 L99 58 Z" fill="#C084FC" opacity="0.75" />

                {/* Bibir Kaca Kelalang */}
                <ellipse cx="92" cy="40" rx="9" ry="3" fill="#E9D5FF" />
                <ellipse cx="92" cy="40" rx="7" ry="2" fill="#7E22CE" />

                {/* Penutup Gabus Kelalang (Cork) */}
                <path d="M86 39 L87 30 L97 30 L98 39 Z" fill="url(#corkGradient)" />
                <ellipse cx="92" cy="30" rx="5" ry="2" fill="#FDE68A" />

                {/* Buih cecair di dalam kelalang */}
                <circle cx="86" cy="94" r="3.5" fill="#FFFFFF" opacity="0.7" />
                <circle cx="96" cy="84" r="2.5" fill="#FFFFFF" opacity="0.6" />
                <circle cx="102" cy="95" r="4" fill="#FFFFFF" opacity="0.5" />
                <circle cx="88" cy="76" r="2" fill="#FFFFFF" opacity="0.8" />

                {/* Kilauan / Refleksi Kaca Melengkung */}
                <path
                    d="M72 82 A22 22 0 0 1 92 64"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.75"
                />
                <circle cx="76" cy="94" r="2" fill="#FFFFFF" opacity="0.8" />
            </g>

            {/* 3. Buih & Sihir Melayang (Floating Magic Sparkles) */}
            <g filter="url(#potionGlow)">
                <circle cx="126" cy="38" r="4" fill="#F472B6" opacity="0.8" />
                <circle cx="132" cy="24" r="2.5" fill="#C084FC" opacity="0.9" />
                <path
                    d="M78 28 L80 32 L84 34 L80 36 L78 40 L76 36 L72 34 L76 32 Z"
                    fill="#FEF08A"
                    opacity="0.9"
                />
            </g>
        </svg>
    );
}

/**
 * 3. Grafik 3D Golden Championship Trophy & Arena Stars (Untuk kad "Pertandingan")
 * - Piala emas 3D berkilauan dengan pemegang melengkung
 * - Bintang 3D timbul pada piala & tapak piala
 */
export function Graphic3DGoldenTrophy({ className = "w-24 h-24" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="trophyShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
                </filter>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Gradien Emas Berkilau 3D */}
                <linearGradient id="goldCup" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="30%" stopColor="#FACC15" />
                    <stop offset="70%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
                <linearGradient id="goldHandle" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="50%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#A16207" />
                </linearGradient>
                <linearGradient id="trophyBase" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="stemGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#A16207" />
                </linearGradient>
            </defs>

            {/* Bayang tapak asas */}
            <ellipse cx="80" cy="144" rx="48" ry="10" fill="#000000" fillOpacity="0.22" />

            {/* 1. PEMEGANG PIALA KIRI & KANAN */}
            <g filter="url(#trophyShadow)">
                {/* Pemegang Kiri */}
                <path
                    d="M54 52 C30 52 30 84 54 88 C50 78 50 62 54 52 Z"
                    fill="url(#goldHandle)"
                    stroke="#B45309"
                    strokeWidth="1.5"
                />
                {/* Pemegang Kanan */}
                <path
                    d="M106 52 C130 52 130 84 106 88 C110 78 110 62 106 52 Z"
                    fill="url(#goldHandle)"
                    stroke="#B45309"
                    strokeWidth="1.5"
                />
            </g>

            {/* 2. TAPAK PIALA 3D */}
            <g filter="url(#trophyShadow)">
                {/* Batang Piala */}
                <path d="M74 98 L74 116 L86 116 L86 98 Z" fill="url(#stemGold)" />
                <ellipse cx="80" cy="98" rx="8" ry="3" fill="#CA8A04" />
                <ellipse cx="80" cy="116" rx="12" ry="3" fill="#FDE047" />

                {/* Blok Tapak Piala (Podium) */}
                <path d="M52 118 L108 118 L104 138 L56 138 Z" fill="url(#trophyBase)" />
                <ellipse cx="80" cy="118" rx="28" ry="5" fill="#64748B" />

                {/* Plat Emas Tapak */}
                <rect x="64" y="125" width="32" height="8" rx="2" fill="url(#goldCup)" />
            </g>

            {/* 3. MANGKUK PIALA EMAS UTAMA */}
            <g filter="url(#trophyShadow)">
                {/* Mangkuk piala */}
                <path
                    d="M50 42 C50 86 64 98 80 98 C96 98 110 86 110 42 Z"
                    fill="url(#goldCup)"
                />

                {/* Bibir Piala Atas */}
                <ellipse cx="80" cy="42" rx="30" ry="7" fill="#FEF08A" />
                <ellipse cx="80" cy="42" rx="26" ry="5" fill="#EAB308" />

                {/* Bintang Timbul 3D pada Muka Piala */}
                <path
                    d="M80 58 L83 66 L91 67 L85 73 L87 81 L80 77 L73 81 L75 73 L69 67 L77 66 Z"
                    fill="#FFFFFF"
                    filter="url(#goldGlow)"
                    opacity="0.95"
                />

                {/* Kilauan Kaca/Emas Vertikal */}
                <path
                    d="M60 48 C60 76 68 86 74 92"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.75"
                />
            </g>

            {/* Bintang & Kilauan Melayang di Sekitar Piala */}
            <g filter="url(#goldGlow)">
                <path
                    d="M36 28 L38 33 L43 35 L38 37 L36 42 L34 37 L29 35 L34 33 Z"
                    fill="#FEF08A"
                    opacity="0.95"
                />
                <path
                    d="M124 34 L126 39 L131 41 L126 43 L124 48 L122 43 L117 41 L122 39 Z"
                    fill="#FEF08A"
                    opacity="0.9"
                />
                <circle cx="44" cy="98" r="2.5" fill="#FEF08A" opacity="0.8" />
                <circle cx="118" cy="96" r="2.5" fill="#FEF08A" opacity="0.8" />
            </g>
        </svg>
    );
}

/**
 * KOMPONEN UTAMA: ModuleNavCards
 * Menampilkan 3 kad modul pembelajaran interaktif berorientasikan reka bentuk rujukan:
 * 1. Kad "Teroka" (Coral-Pink Gradient + 3D STEM Blocks)
 * 2. Kad "Aktiviti" (Emerald-Mint Gradient + 3D Science Box & Potion)
 * 3. Kad "Pertandingan" (Purple-Violet Gradient + 3D Golden Trophy)
 */
export default function ModuleNavCards({
    currentView = "menu",
    onSelectView,
    t = (bm, en) => bm,
    playAudioFeedback,
}) {
    const handleCardClick = (viewId) => {
        if (playAudioFeedback) {
            playAudioFeedback("tap");
        }
        if (onSelectView) {
            onSelectView(viewId);
        }
    };

    const isTeroka = currentView === "menu";
    const isAktiviti =
        currentView === "activityList" ||
        currentView === "solarDragDrop" ||
        currentView === "plantActivity" ||
        currentView === "quizList" ||
        currentView === "quizRules" ||
        currentView === "quiz";
    const isPertandingan =
        currentView === "competitionList" ||
        currentView === "competition" ||
        currentView === "pertandingan" ||
        currentView === "mathQuiz" ||
        currentView === "spellingBee";

    return (
        <div className="w-full max-w-sm sm:max-w-md mx-auto mb-6 select-none">
            {/* Header Tajuk Seksyen Modul Pembelajaran */}
            <div className="mb-3 px-1">
                <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                    {t("Pilih Mod Pembelajaran", "Choose Learning Mode")}
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5">
                    {t("Ketik kad untuk mula meneroka", "Tap a card to start exploring")}
                </p>
            </div>

            {/* Container 3 Kad Bersebelahan (Side-by-side Carousel / Grid) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3.5 w-full">

                {/* ========================================================
                    KAD 1: TEROKA (Coral-Pink Gradient + 3D Blocks)
                   ======================================================== */}
                <button
                    type="button"
                    onClick={() => handleCardClick("menu")}
                    className={`relative rounded-[1.6rem] sm:rounded-[2rem] p-3 sm:p-4 h-[180px] sm:h-[210px] flex flex-col justify-between text-left text-white transition-all duration-300 cursor-pointer overflow-hidden group active:scale-95 ${
                        isTeroka
                            ? "ring-4 ring-rose-400/80 shadow-[0_14px_30px_rgba(244,63,94,0.38)] scale-[1.03] -translate-y-1 z-10"
                            : "opacity-85 hover:opacity-100 hover:scale-[1.02] shadow-md hover:shadow-xl"
                    }`}
                    style={{
                        background: "linear-gradient(145deg, #FF5B79 0%, #FF6E89 45%, #FF8A65 100%)",
                    }}
                >
                    {/* Bentuk Gelombang Latar Belakang (Subtle Wave Overlay) */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Bahagian Atas: Tajuk & Butang Bulat Play (▶) */}
                    <div className="relative z-10 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30">
                                {isTeroka ? t("Aktif", "Active") : "KSSR"}
                            </span>
                        </div>

                        <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                            {t("Teroka", "Explore")}
                        </h3>

                        {/* Butang Bulat Play Kaca (▶) */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-inner group-hover:scale-110 group-hover:bg-white/40 transition-transform">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="6 4 20 12 6 20 6 4" />
                            </svg>
                        </div>
                    </div>

                    {/* Bahagian Bawah: Grafik 3D Isometric Math/STEM Cubes */}
                    <div className="relative z-10 flex justify-end items-end -mr-1 -mb-1 drop-shadow-lg group-hover:scale-108 transition-transform duration-300">
                        <Graphic3DMathBlocks className="w-20 h-20 sm:w-26 sm:h-26" />
                    </div>
                </button>


                {/* ========================================================
                    KAD 2: AKTIVITI (Emerald-Mint Gradient + 3D Science Box)
                   ======================================================== */}
                <button
                    type="button"
                    onClick={() => handleCardClick("activityList")}
                    className={`relative rounded-[1.6rem] sm:rounded-[2rem] p-3 sm:p-4 h-[180px] sm:h-[210px] flex flex-col justify-between text-left text-white transition-all duration-300 cursor-pointer overflow-hidden group active:scale-95 ${
                        isAktiviti
                            ? "ring-4 ring-emerald-400/80 shadow-[0_14px_30px_rgba(16,185,129,0.38)] scale-[1.03] -translate-y-1 z-10"
                            : "opacity-85 hover:opacity-100 hover:scale-[1.02] shadow-md hover:shadow-xl"
                    }`}
                    style={{
                        background: "linear-gradient(145deg, #00D284 0%, #05B376 45%, #029B63 100%)",
                    }}
                >
                    {/* Bentuk Gelombang Latar Belakang */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Bahagian Atas: Tajuk & Butang Bulat Play (▶) */}
                    <div className="relative z-10 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30">
                                {isAktiviti ? t("Aktif", "Active") : "Kuiz"}
                            </span>
                        </div>

                        <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                            {t("Aktiviti", "Activity")}
                        </h3>

                        {/* Butang Bulat Play Kaca (▶) */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-inner group-hover:scale-110 group-hover:bg-white/40 transition-transform">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="6 4 20 12 6 20 6 4" />
                            </svg>
                        </div>
                    </div>

                    {/* Bahagian Bawah: Grafik 3D Science Box & Potion */}
                    <div className="relative z-10 flex justify-end items-end -mr-1 -mb-1 drop-shadow-lg group-hover:scale-108 transition-transform duration-300">
                        <Graphic3DSciencePotionBox className="w-20 h-20 sm:w-26 sm:h-26" />
                    </div>
                </button>


                {/* ========================================================
                    KAD 3: PERTANDINGAN (Purple-Violet Gradient + 3D Trophy)
                   ======================================================== */}
                <button
                    type="button"
                    onClick={() => handleCardClick("competitionList")}
                    className={`relative rounded-[1.6rem] sm:rounded-[2rem] p-3 sm:p-4 h-[180px] sm:h-[210px] flex flex-col justify-between text-left text-white transition-all duration-300 cursor-pointer overflow-hidden group active:scale-95 ${
                        isPertandingan
                            ? "ring-4 ring-purple-400/80 shadow-[0_14px_30px_rgba(147,51,234,0.38)] scale-[1.03] -translate-y-1 z-10"
                            : "opacity-85 hover:opacity-100 hover:scale-[1.02] shadow-md hover:shadow-xl"
                    }`}
                    style={{
                        background: "linear-gradient(145deg, #8B5CF6 0%, #7C3AED 45%, #6366F1 100%)",
                    }}
                >
                    {/* Bentuk Gelombang Latar Belakang */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/15 blur-xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Bahagian Atas: Tajuk & Butang Bulat Play (▶) */}
                    <div className="relative z-10 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30">
                                {isPertandingan ? t("Aktif", "Active") : "Arena"}
                            </span>
                        </div>

                        <h3 className="text-sm sm:text-lg md:text-xl font-black text-white tracking-tight leading-none drop-shadow-sm truncate">
                            {t("Pertandingan", "Competitions")}
                        </h3>

                        {/* Butang Bulat Play Kaca (▶) */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-inner group-hover:scale-110 group-hover:bg-white/40 transition-transform">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="6 4 20 12 6 20 6 4" />
                            </svg>
                        </div>
                    </div>

                    {/* Bahagian Bawah: Grafik 3D Golden Trophy */}
                    <div className="relative z-10 flex justify-end items-end -mr-1 -mb-1 drop-shadow-lg group-hover:scale-108 transition-transform duration-300">
                        <Graphic3DGoldenTrophy className="w-20 h-20 sm:w-26 sm:h-26" />
                    </div>
                </button>

            </div>
        </div>
    );
}
