"use client";

import React from "react";
import {
    GraphicCoin,
    GraphicBackArrow,
    GraphicLevelRocket,
    GraphicLevelPlanets,
    GraphicLevelPlantSprout,
} from "./Graphics";
import { VectorAvatarAstro, VectorAvatarGuest } from "./GameIcons";

export default function ActivityView({
    onNavigate,
    t = (bm, en) => bm,
    playAudioFeedback,
    studentName = "Penjelajah",
    isLoggedIn = false,
    studentCoins = 50,
    equippedAvatarIcon = "avatar_astro_1",
    quizHighScore = 0,
    solarSubmitted = false,
    plantSubmitted = false,
    onResetSolarGame,
    onBlockedAction = null,
}) {
    const handleAction = (sound, cb) => {
        try {
            if (playAudioFeedback) playAudioFeedback(sound);
        } catch (e) {}
        if (cb) cb();
    };

    // Pengiraan peratus kemajuan 3 aktiviti interaktif
    const completedCount =
        (quizHighScore > 0 ? 1 : 0) +
        (solarSubmitted ? 1 : 0) +
        (plantSubmitted ? 1 : 0);
    const progressPercent = Math.min(100, Math.round((completedCount / 3) * 100));

    return (
        <div className="w-full max-w-sm sm:max-w-md mx-auto anim-fade-in space-y-6 pb-8 select-none text-left">

            {/* 1. HEADER ATAS DENGAN BUTANG NAVIGASI, KOIN & AVATAR */}
            <div className="px-1 pt-1 space-y-3">
                <div className="flex items-center justify-between">
                    {/* Kiri: Butang Back & Tajuk */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => handleAction("tap", () => onNavigate && onNavigate("menu"))}
                            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all group"
                        >
                            <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                            <span>Back</span>
                        </button>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#0099e5] tracking-tight">
                                {t ? t("Aktiviti", "Activities") : "Aktiviti"}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
                                {t ? t("Pilih aktiviti anda", "Pick your activity") : "Pilih aktiviti anda"}
                            </p>
                        </div>
                    </div>

                    {/* Kanan: Koin & Profil Avatar */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Koin */}
                        <button
                            type="button"
                            onClick={() => handleAction("sparkle", () => onNavigate && onNavigate("shop"))}
                            className="h-10 px-3 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                            title={t ? t(`${studentCoins} Koin`, `${studentCoins} Coins`) : `${studentCoins} Koin`}
                        >
                            <GraphicCoin className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs">{studentCoins}</span>
                        </button>

                        {/* Profil Avatar */}
                        <button
                            type="button"
                            onClick={() => handleAction("sparkle", () => onNavigate && onNavigate("profile"))}
                            className="w-10 h-10 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all shrink-0 p-1.5"
                            title={isLoggedIn ? studentName : (t ? t("Buka Profil", "Open Profile") : "Buka Profil")}
                        >
                            {isLoggedIn ? (
                                <VectorAvatarAstro className="w-full h-full" />
                            ) : (
                                <VectorAvatarGuest className="w-full h-full text-sky-500" />
                            )}
                        </button>
                    </div>
                </div>

                {/* BAR KEMAJUAN / PROGRESS BAR */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-600 font-bold text-[11px] sm:text-xs">
                            {t ? t("Kemajuan", "Progress") : "Kemajuan"}
                        </span>
                        <span className="font-black text-[#0099e5] font-mono text-xs sm:text-sm">
                            {progressPercent}%
                        </span>
                    </div>
                    <div className="w-full h-2.5 sm:h-3 bg-slate-200/70 rounded-full overflow-hidden p-0.5 shadow-inner">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#0099e5] via-[#0284c7] to-[#38bdf8] transition-all duration-700 ease-out shadow-xs"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* 2. SENARAI KAD AKTIVITI: KUIZ DI ATAS SEKALI */}
            <div className="space-y-6 pt-3">

                {/* KAD 1: KUIZ PANTAS SAINS (ATAS SEKALI - VIBRANT INDIGO/VIOLET + 3D ROCKET) */}
                <div
                    onClick={() => handleAction("sparkle", () => {
                        if (onNavigate) onNavigate("quizList");
                    })}
                    className="relative w-full rounded-[2.2rem] p-6 pr-28 sm:pr-32 min-h-[148px] sm:min-h-[162px] flex flex-col justify-between text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer group"
                    style={{
                        background: "linear-gradient(135deg, #5c9de5 0%, #4a8fd8 55%, #3a7ec8 100%)",
                    }}
                >
                    {/* Ilustrasi 3D Rocket Terapung Di Penjuru Kanan Atas */}
                    <div className="absolute -top-7 sm:-top-8 -right-1 sm:right-1 w-28 h-28 sm:w-34 sm:h-34 drop-shadow-xl group-hover:scale-108 group-hover:-rotate-3 transition-transform duration-300 pointer-events-none select-none z-10 flex items-center justify-center">
                        <GraphicLevelRocket className="w-full h-full" />
                    </div>

                    {/* Ikon Bulat Status (Circle Badge) */}
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                        {quizHighScore > 0 ? (
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                    </div>

                    {/* Teks: Ringkas, Simple & Padat */}
                    <div className="mt-4">
                        <span className="text-xs sm:text-sm font-medium text-white/80 block">
                            {t ? t("aktiviti 1", "activity 1") : "aktiviti 1"}
                        </span>
                        <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight mt-0.5">
                            {t ? t("Kuiz Pantas Sains", "Speed Science Quiz") : "Kuiz Pantas Sains"}
                        </h3>
                    </div>
                </div>

                {/* KAD 2: SUSUN SISTEM SURIA (SKY BLUE GRADIENT + 3D PLANETS) */}
                <div
                    onClick={() => handleAction("sparkle", () => {
                        if (!isLoggedIn && onBlockedAction) {
                            onBlockedAction();
                            return;
                        }
                        if (onResetSolarGame) onResetSolarGame();
                        if (onNavigate) onNavigate("solarDragDrop");
                    })}
                    className="relative w-full rounded-[2.2rem] p-6 pr-28 sm:pr-32 min-h-[148px] sm:min-h-[162px] flex flex-col justify-between text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer group"
                    style={{
                        background: "linear-gradient(135deg, #5c9de5 0%, #4a8fd8 55%, #3a7ec8 100%)",
                    }}
                >
                    {/* Ilustrasi 3D Planets Terapung Di Penjuru Kanan Atas */}
                    <div className="absolute -top-7 sm:-top-8 -right-1 sm:right-1 w-28 h-28 sm:w-34 sm:h-34 drop-shadow-xl group-hover:scale-108 group-hover:rotate-3 transition-transform duration-300 pointer-events-none select-none z-10 flex items-center justify-center">
                        <GraphicLevelPlanets className="w-full h-full" />
                    </div>

                    {/* Ikon Bulat Status (Circle Badge) */}
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                        {solarSubmitted ? (
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                    </div>

                    {/* Teks: Ringkas, Simple & Padat */}
                    <div className="mt-4">
                        <span className="text-xs sm:text-sm font-medium text-white/80 block">
                            {t ? t("aktiviti 2", "activity 2") : "aktiviti 2"}
                        </span>
                        <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight mt-0.5">
                            {t ? t("Susun Sistem Suria", "Solar System Order") : "Susun Sistem Suria"}
                        </h3>
                    </div>
                </div>

                {/* KAD 3: MAKMAL TUMBUHAN (EMERALD GRADIENT + 3D PLANT SPROUT) */}
                <div
                    onClick={() => handleAction("sparkle", () => {
                        if (!isLoggedIn && onBlockedAction) {
                            onBlockedAction();
                            return;
                        }
                        if (onNavigate) onNavigate("plantActivity");
                    })}
                    className="relative w-full rounded-[2.2rem] p-6 pr-28 sm:pr-32 min-h-[148px] sm:min-h-[162px] flex flex-col justify-between text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer group"
                    style={{
                        background: "linear-gradient(135deg, #5c9de5 0%, #4a8fd8 55%, #3a7ec8 100%)",
                    }}
                >
                    {/* Ilustrasi 3D Plant Sprout Terapung Di Penjuru Kanan Atas */}
                    <div className="absolute -top-7 sm:-top-8 -right-1 sm:right-1 w-28 h-28 sm:w-34 sm:h-34 drop-shadow-xl group-hover:scale-108 group-hover:-rotate-3 transition-transform duration-300 pointer-events-none select-none z-10 flex items-center justify-center">
                        <GraphicLevelPlantSprout className="w-full h-full" />
                    </div>

                    {/* Ikon Bulat Status (Circle Badge) */}
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                        {plantSubmitted ? (
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                    </div>

                    {/* Teks: Ringkas, Simple & Padat */}
                    <div className="mt-4">
                        <span className="text-xs sm:text-sm font-medium text-white/80 block">
                            {t ? t("aktiviti 3", "activity 3") : "aktiviti 3"}
                        </span>
                        <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight mt-0.5">
                            {t ? t("Makmal Tumbuhan", "Plant Lab") : "Makmal Tumbuhan"}
                        </h3>
                    </div>
                </div>

            </div>

        </div>
    );
}
