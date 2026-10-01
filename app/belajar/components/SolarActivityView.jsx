"use client";

import React, { useState } from "react";
import {
    GraphicBackArrow,
    GraphicNatureLeaf,
    GraphicArrowRight,
    GraphicPlanetIcon,
    GraphicGrandTrophy,
    GraphicStarMedal,
    GraphicExploBot,
    GraphicMascotRobot,
    GraphicRefresh,
    SOLAR_PLANETS,
} from "./Graphics";

export default function SolarActivityView({
    currentView,
    placedPlanets = {},
    selectedTrayPlanet = null,
    solarScore = 0,
    solarWrongSlot = null,
    solarFeedbackMessage = null,
    setSolarFeedbackMessage = null,
    solarSubmitted = false,
    onSelectTrayPlanet,
    onDropOnOrbit,
    onClickOrbitSlot,
    onRemovePlanetFromSlot,
    onDragStart,
    onSubmitSolarGame,
    onResetSolarGame,
    onNavigate,
    t = null,
    language = "bm",
    playAudioFeedback,
    isLoggedIn = true,
    onBlockedAction = null,
}) {
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    if (currentView === "activityList") {
        return (
            <div className="space-y-6 w-full max-w-xl anim-fade-in">
                            <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-purple-700 text-left">
                                        Pusat Permainan & Aktiviti
                                    </h2>
                                    <p className="text-xs text-slate-500 text-left mt-0.5">Pilih aktiviti santai untuk bermain sambil belajar</p>
                                </div>
                                <button
                                    onClick={() => { playAudioFeedback?.("tap"); onNavigate("menu"); }}
                                    className="px-4 py-2.5 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-2 border border-slate-200"
                                >
                                    <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                    <span>Kembali</span>
                                </button>
                            </div>

                            {/* Maskot Robot Speech (Statik) */}
                            <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-3xl border-2 border-purple-200 text-left">
                                <div className="shrink-0">
                                    <GraphicMascotRobot className="w-14 h-14" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                                        Aktiviti Tanpa Timer
                                    </span>
                                    <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1 leading-snug">
                                        &ldquo;Uji ketepatan minda anda! Seret planet ke orbit yang betul dan kumpulkan markah maksimum!&rdquo;
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 w-full">
                                {/* Permainan 1: Susun Sistem Suria (Aktif & Boleh Dimainkan) */}
                                <div
                                    onClick={() => {
                                        if (!isLoggedIn) {
                                            if (onBlockedAction) onBlockedAction();
                                            return;
                                        }
                                        onResetSolarGame?.();
                                        onNavigate("solarDragDrop");
                                    }}
                                    className="bg-gradient-to-r from-purple-50 via-indigo-50 to-sky-50 border-3 border-purple-400 hover:border-purple-600 p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 group relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-purple-400/50 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                                <GraphicPlanetIcon planetId="zuhal" className="w-12 h-12" />
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                                                        Drag & Drop
                                                    </span>
                                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                                                        8 Planet • Tiada Timer
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-black text-slate-800 group-hover:text-purple-700 transition-colors">
                                                    {t ? t("Susun Sistem Suria", "Arrange Solar System") : "Susun Sistem Suria"}
                                                </h3>
                                                <p className="text-xs text-slate-600 mt-0.5">
                                                    Susun 8 planet ke dalam orbit mengikut jarak dari Matahari. Kumpul 800 mata!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-purple-700 group-hover:scale-105 transition-all">
                                            <GraphicArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Permainan 2: Makmal Tumbuhan Cilik & Kebun Fotosintesis (BARU & AKTIF!) */}
                                <div
                                    onClick={() => {
                                        if (!isLoggedIn && onBlockedAction) {
                                            onBlockedAction();
                                            return;
                                        }
                                        playAudioFeedback?.("sparkle");
                                        onNavigate("plantActivity");
                                    }}
                                    className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-3 border-emerald-400 hover:border-emerald-600 p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 group relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 border-2 border-emerald-300 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform text-white">
                                                <GraphicNatureLeaf className="w-11 h-11" />
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                                                        🌿 {t ? t("Baru & Interaktif", "New & Interactive") : "Baru & Interaktif"}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                                                        Fotosintesis & Anatomi
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                                                    {t ? t("Makmal Tumbuhan & Kebun Fotosintesis", "Plant Lab & Photosynthesis Garden") : "Makmal Tumbuhan & Kebun Fotosintesis"}
                                                </h3>
                                                <p className="text-xs text-slate-600 mt-0.5">
                                                    {t ? t("Bantu pokok membesar dari benih ke bunga mekar! Bekalkan air, cahaya & CO₂ serta padankan anatomi pokok.", "Help the plant grow from seed to full bloom! Supply water, light & CO₂ and match plant anatomy.") : "Bantu pokok membesar dari benih ke bunga mekar! Bekalkan air, cahaya & CO₂ serta padankan anatomi pokok."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-emerald-700 group-hover:scale-105 transition-all">
                                            <GraphicArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Permainan 3: Cabaran Ejaan Spelling Bee STEM (Audio & Ejaan Baru!) */}
                                <div
                                    onClick={() => {
                                        if (!isLoggedIn && onBlockedAction) {
                                            onBlockedAction();
                                            return;
                                        }
                                        playAudioFeedback?.("sparkle");
                                        onNavigate("spellingBee");
                                    }}
                                    className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-3 border-amber-400 hover:border-amber-600 p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 group relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-amber-300 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform text-white text-3xl">
                                                <span>🐝</span>
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                                                        🐝 {t ? t("English • Audio & Gambar", "English • Audio & Pictures") : "English • Audio & Pictures"}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                                        8 Soalan • 9 Tema
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-black text-slate-800 group-hover:text-amber-800 transition-colors">
                                                    {t ? t("Cabaran Spelling Bee English", "English Spelling Bee Challenge") : "Cabaran Spelling Bee English"}
                                                </h3>
                                                <p className="text-xs text-slate-600 mt-0.5">
                                                    {t ? t("Dengar sebutan audio, kenal pasti gambar dan pilih 9 tema menarik untuk cabaran ejaan bahasa Inggeris!", "Listen to English pronunciations, identify the picture clue, and choose from 9 fun themes!") : "Dengar sebutan audio, kenal pasti gambar dan pilih 9 tema menarik untuk cabaran ejaan bahasa Inggeris!"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-amber-600 group-hover:scale-105 transition-all">
                                            <GraphicArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Permainan 4: Pertandingan Sifir (Math Speed Quiz) */}
                                <div
                                    onClick={() => {
                                        if (!isLoggedIn && onBlockedAction) {
                                            onBlockedAction();
                                            return;
                                        }
                                        playAudioFeedback?.("sparkle");
                                        onNavigate("mathQuiz");
                                    }}
                                    className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-3 border-indigo-400 hover:border-indigo-600 p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 group relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 border-2 border-indigo-300 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform text-white text-3xl">
                                                <span>🔢</span>
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-300">
                                                        ⚡ {t ? t("Baru • Congak Pantas", "New • Speed Math") : "Baru • Congak Pantas"}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                                                        Sifir 1-12 • 60s & 10 Soalan
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-800 transition-colors">
                                                    {t ? t("Pertandingan Sifir Kilat", "Math Speed Quiz Challenge") : "Pertandingan Sifir Kilat"}
                                                </h3>
                                                <p className="text-xs text-slate-600 mt-0.5">
                                                    {t ? t("Pilih julat sifir 1-12, cabar kepantasan dalam masa 60 saat atau 10 soalan pantas dan raih skor tertinggi!", "Choose tables 1-12, test your speed in 60s or 10 fast questions, and achieve high scores!") : "Pilih julat sifir 1-12, cabar kepantasan dalam masa 60 saat atau 10 soalan pantas dan raih skor tertinggi!"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-indigo-700 group-hover:scale-105 transition-all">
                                            <GraphicArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        );
    }

    if (currentView === "solarDragDrop") {
        return (
            <div className="space-y-5 w-full max-w-2xl anim-fade-in relative">

                            {/* =========================================
                                1. HALAMAN KEPUTUSAN & SEMAKAN JAWAPAN
                                (Dipaparkan setelah user menekan SUBMIT)
                            ========================================== */}
                            {solarSubmitted ? (
                                <div className="space-y-5 w-full anim-pop">
                                    
                                    {/* Header Keputusan */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full border-b border-slate-100 pb-3">
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => { playAudioFeedback?.("tap"); onResetSolarGame?.(); onNavigate("activityList"); }}
                                                className="px-3.5 py-2 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0"
                                            >
                                                <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                                <span>Aktiviti</span>
                                            </button>
                                            <div className="text-left">
                                                <h2 className="text-lg sm:text-xl font-black text-purple-700 leading-tight">
                                                    Keputusan Sistem Suria
                                                </h2>
                                                <span className="text-[11px] text-slate-500 font-bold block">
                                                    Semakan Jawapan & Pembelajaran
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={onResetSolarGame}
                                            className="px-4 py-2 btn-3d-blue text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <GraphicRefresh className="w-4 h-4" />
                                            <span>Main Semula</span>
                                        </button>
                                    </div>

                                    {/* Kad Skor & Ucapan ExploBot */}
                                    {(() => {
                                        let correctCount = 0;
                                        SOLAR_PLANETS.forEach(p => {
                                            if (placedPlanets[p.orbit] === p.id) correctCount++;
                                        });
                                        const pct = Math.round((correctCount / 8) * 100);

                                        return (
                                            <div className="bg-gradient-to-br from-purple-50 via-white to-sky-50 border-3 border-purple-300 rounded-3xl p-5 sm:p-7 shadow-lg space-y-4 text-center">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                                                    {correctCount === 8 ? (
                                                        <GraphicGrandTrophy className="w-full h-full" />
                                                    ) : correctCount >= 5 ? (
                                                        <GraphicStarMedal className="w-full h-full" />
                                                    ) : (
                                                        <GraphicExploBot className="w-full h-full" />
                                                    )}
                                                </div>

                                                <div className="space-y-1">
                                                    <span className={`inline-block font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider border shadow-sm ${
                                                        correctCount === 8
                                                            ? "bg-amber-100 text-amber-900 border-amber-300"
                                                            : correctCount >= 5
                                                                ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                                                : "bg-purple-100 text-purple-900 border-purple-300"
                                                    }`}>
                                                        {correctCount === 8 ? "🏆 Sistem Suria Sempurna!" : correctCount >= 5 ? "🌟 Pencapaian Hebat!" : "🚀 Usaha yang Baik!"}
                                                    </span>
                                                    <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                                                        {correctCount === 8
                                                            ? "Tahniah! Semua Planet Tepat!"
                                                            : `Anda Mendapat ${correctCount} daripada 8 Tepat!`}
                                                    </h3>
                                                </div>

                                                {/* Papan Markah */}
                                                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                                                    <div className="bg-white p-3 rounded-2xl border-2 border-amber-300 shadow-sm">
                                                        <span className="text-[10px] font-black uppercase text-amber-600 block">Jumlah Skor</span>
                                                        <span className="text-2xl font-black text-amber-950">{solarScore} / 800</span>
                                                    </div>
                                                    <div className="bg-white p-3 rounded-2xl border-2 border-emerald-300 shadow-sm">
                                                        <span className="text-[10px] font-black uppercase text-emerald-600 block">Ketepatan</span>
                                                        <span className="text-2xl font-black text-emerald-600">{pct}%</span>
                                                    </div>
                                                </div>

                                                {/* Ulasan ExploBot */}
                                                <div className="bg-white/80 border border-purple-200 rounded-2xl p-3 text-xs text-slate-700 font-bold flex items-center justify-center gap-2">
                                                    <span>🤖</span>
                                                    <span>
                                                        {correctCount === 8
                                                            ? "Luar biasa! Anda mengenali setiap rupa planet dan kedudukan orbitnya dengan sempurna!"
                                                            : correctCount >= 5
                                                                ? "Hebat! Anda hampir menguasai semuanya. Perhatikan jawapan yang benar di bawah untuk membetulkan kesilapan!"
                                                                : "Jangan berputus asa! Teliti jawapan yang sebenar di bawah dan cuba lagi untuk mendapatkan skor penuh!"}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* SEMAKAN JAWAPAN BAGI SETIAP 8 ORBIT (TERMASUK JAWAPAN SEBENAR JIKA SALAH) */}
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center justify-between px-1">
                                            <div>
                                                <h3 className="text-base font-black text-slate-800">
                                                    Semakan Jawapan Mengikut Orbit
                                                </h3>
                                                <p className="text-[11px] text-slate-500">
                                                    Berikut ialah semakan perbandingan jawapan anda dengan susunan Sistem Suria yang sebenar:
                                                </p>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                                                8 Orbit
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {SOLAR_PLANETS.map((planetInfo) => {
                                                const placedId = placedPlanets[planetInfo.orbit];
                                                const placedPlanetObj = SOLAR_PLANETS.find(p => p.id === placedId);
                                                const isMatch = placedPlanetObj?.id === planetInfo.id;
                                                const isBlank = !placedId;

                                                return (
                                                    <div
                                                        key={planetInfo.orbit}
                                                        className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between shadow-sm ${
                                                            isMatch
                                                                ? "bg-emerald-50/70 border-emerald-400"
                                                                : "bg-rose-50/70 border-rose-300"
                                                        }`}
                                                    >
                                                        {/* Header Orbit */}
                                                        <div>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                                                    <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-bold">
                                                                        {planetInfo.orbit}
                                                                    </span>
                                                                    <span>Orbit {planetInfo.orbit}: {language === "en" && planetInfo.englishName ? planetInfo.englishName : planetInfo.name}</span>
                                                                </span>

                                                                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                                                                    isMatch
                                                                        ? "bg-emerald-500 text-white border-emerald-400 shadow-sm"
                                                                        : isBlank
                                                                            ? "bg-slate-500 text-white border-slate-400"
                                                                            : "bg-rose-500 text-white border-rose-400 shadow-sm"
                                                                }`}>
                                                                    {isMatch ? "✓ Tepat (+100)" : isBlank ? "✕ Kosong (0pt)" : "✕ Salah (0pt)"}
                                                                </span>
                                                            </div>

                                                            {/* Perbandingan Jawapan Anda vs Sebenar */}
                                                            <div className="bg-white/90 rounded-2xl p-3 border border-slate-200/80 space-y-2.5">
                                                                
                                                                {/* 1. Apa yang user letak */}
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span className="font-bold text-slate-500 text-[11px]">Jawapan Anda:</span>
                                                                    {placedPlanetObj ? (
                                                                        <div className="flex items-center gap-1.5 font-black text-slate-800">
                                                                            <GraphicPlanetIcon planetId={placedPlanetObj.id} className="w-6 h-6" />
                                                                            <span>{placedPlanetObj.name}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-slate-400 italic text-[11px]">Tiada planet diletakkan</span>
                                                                    )}
                                                                </div>

                                                                {/* 2. JAWAPAN YANG SEBENAR (Jika salah atau kosong) */}
                                                                {!isMatch && (
                                                                    <div className="pt-2 border-t border-rose-100 flex flex-col gap-1.5">
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="font-black text-amber-700 text-[11px] flex items-center gap-1">
                                                                                <span>✨</span>
                                                                                <span>Jawapan yang Sebenar:</span>
                                                                            </span>
                                                                            <div className="flex items-center gap-1.5 font-black text-purple-900 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200 text-xs">
                                                                                <GraphicPlanetIcon planetId={planetInfo.id} className="w-6 h-6" />
                                                                                <span>{planetInfo.name}</span>
                                                                                <span className="text-[10px] text-purple-500 font-bold">({planetInfo.englishName})</span>
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-[11px] text-slate-600 bg-amber-50/70 p-2 rounded-xl border border-amber-200/70 leading-relaxed font-medium">
                                                                            💡 <strong>Fakta:</strong> {planetInfo.fact}
                                                                        </p>
                                                                    </div>
                                                                )}

                                                                {/* Jika tepat: paparkan fakta menarik */}
                                                                {isMatch && (
                                                                    <div className="pt-1.5 border-t border-emerald-100">
                                                                        <p className="text-[11px] text-emerald-800 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/80 leading-relaxed font-medium">
                                                                            🌟 <strong>Tahniah:</strong> {planetInfo.fact}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Info Ciri Fizikal Tambahan */}
                                                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-bold px-1">
                                                            <span>Ciri: {planetInfo.sizeLabel}</span>
                                                            <span>Saiz: {planetInfo.diameter}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Butang Tindakan Bawah Keputusan */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                playAudioFeedback?.("tap");
                                                onResetSolarGame?.();
                                            }}
                                            className="py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
                                        >
                                            <span>✅</span>
                                            <span>Selesai</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                playAudioFeedback?.("tap");
                                                onResetSolarGame?.();
                                            }}
                                            className="py-3.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border-2 border-purple-200 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                                        >
                                            <GraphicRefresh className="w-4 h-4 text-purple-700" />
                                            <span>Main Semula</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                playAudioFeedback?.("tap");
                                                onResetSolarGame?.();
                                                onNavigate("activityList");
                                            }}
                                            className="py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs border-2 border-slate-200 transition-all active:scale-98"
                                        >
                                            <span>🎮</span>
                                            <span>Pusat Aktiviti</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* =========================================
                                    2. PAPARAN PERMAINAN DRAG & DROP
                                    (Semasa user sedang bermain - tiada skor dipaparkan)
                                ========================================== */
                                <>
                                    {/* Header Permainan (Bebas dari Skor Semasa) */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full border-b border-slate-100 pb-3">
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    playAudioFeedback?.("tap");
                                                    if (Object.keys(placedPlanets || {}).length > 0 && !solarSubmitted) {
                                                        setShowExitConfirm(true);
                                                    } else {
                                                        onResetSolarGame?.();
                                                        onNavigate("activityList");
                                                    }
                                                }}
                                                className="px-3.5 py-2 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                                                title="Kembali ke Senarai Aktiviti"
                                            >
                                                <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                                <span>Aktiviti</span>
                                            </button>
                                            <div className="text-left">
                                                <h2 className="text-lg sm:text-xl font-black text-purple-700 leading-tight">
                                                    {t ? t("Susun Sistem Suria", "Arrange Solar System") : "Susun Sistem Suria"}
                                                </h2>
                                                <span className="text-[11px] text-slate-500 font-bold block">
                                                    Kenal Pasti Rupa Planet & Masukkan ke Orbit
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status Bilangan Planet Diletakkan & Reset (Tiada Paparan Skor!) */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <div className="bg-sky-100 border-2 border-sky-300 text-sky-950 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                                                <span>🪐</span>
                                                <span>{Object.keys(placedPlanets).length} / 8 Planet Diletakkan</span>
                                            </div>
                                            <button
                                                onClick={onResetSolarGame}
                                                className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-slate-600 cursor-pointer transition-all"
                                                title="Kosongkan Semua"
                                            >
                                                <GraphicRefresh className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Dynamic Feedback Banner */}
                                    {solarFeedbackMessage ? (
                                        <div className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between gap-2 shadow-sm ${
                                            solarFeedbackMessage.type === "success"
                                                ? "bg-emerald-50 border-emerald-400 text-emerald-900 anim-pop"
                                                : "bg-sky-50 border-sky-400 text-sky-900"
                                        }`}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-base">
                                                    {solarFeedbackMessage.type === "success" ? "🎉" : "💡"}
                                                </span>
                                                <span>{solarFeedbackMessage.text}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSolarFeedbackMessage?.(null)}
                                                className="text-slate-400 hover:text-slate-700 text-xs px-2 py-0.5 rounded-lg"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-sky-50/80 border border-sky-200 p-2.5 rounded-2xl text-[11px] text-sky-800 font-bold flex items-center justify-center gap-2">
                                            <span>💡</span>
                                            <span>Tip: Kenal pasti planet dari rupanya di rak, kemudian seret atau klik untuk meletakkannya ke orbit sasaran!</span>
                                        </div>
                                    )}

                                    {/* =========================================
                                        KANVAS SISTEM SURIA ASLI DENGAN MATAHARI DI TENGAH
                                    ========================================== */}
                                    <div className="bg-gradient-to-br from-[#020512] via-[#09153a] to-[#010410] border-3 border-sky-400/40 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden text-white flex flex-col items-center">
                                        
                                        {/* Info Tajuk Atas Kanvas */}
                                        <div className="w-full flex items-center justify-between text-left mb-2 z-20">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                                                    Model Sistem Suria Asli
                                                </span>
                                                <p className="text-[11px] text-slate-300 mt-0.5">
                                                    Matahari di tengah. Masukkan planet ke orbit mengikut nama yang tertera.
                                                </p>
                                            </div>
                                            <div className="text-right text-[10px] text-amber-300 font-bold bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-400/30">
                                                ✨ Seret atau Klik
                                            </div>
                                        </div>

                                        {/* ARENA SISTEM SURIA BULAT CONCENTRIC (MATAHARI DI TENGAH) */}
                                        <div className="relative w-full aspect-square max-w-[540px] sm:max-w-[580px] mx-auto rounded-full border-2 border-sky-500/30 shadow-[inset_0_0_40px_rgba(2,132,199,0.3)] flex items-center justify-center overflow-hidden my-2 select-none">
                                            
                                            {/* Bintang-bintang Angkasa */}
                                            <div className="absolute top-1/4 left-1/5 text-[10px] opacity-40">✨</div>
                                            <div className="absolute bottom-1/4 right-1/5 text-[10px] opacity-40">✨</div>
                                            <div className="absolute top-1/6 right-1/3 text-[10px] opacity-35">⭐️</div>
                                            <div className="absolute bottom-1/6 left-1/3 text-[10px] opacity-35">⭐️</div>

                                            {/* Garisan 8 Orbit Concentric */}
                                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                                                {SOLAR_PLANETS.map((p) => (
                                                    <g key={p.id}>
                                                        <circle
                                                            cx="50"
                                                            cy="50"
                                                            r={p.radiusPercent}
                                                            fill="none"
                                                            stroke={placedPlanets[p.orbit] ? "rgba(56, 189, 248, 0.5)" : "rgba(56, 189, 248, 0.2)"}
                                                            strokeWidth="0.45"
                                                            strokeDasharray="1.2 1.2"
                                                        />
                                                    </g>
                                                ))}
                                            </svg>

                                            {/* MATAHARI DI PUSAT TENGAH (THE SUN) */}
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none select-none">
                                                <div className="relative">
                                                    <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-xl animate-pulse" />
                                                    <GraphicPlanetIcon planetId="matahari" className="w-12 h-12 sm:w-16 sm:h-16 relative z-10 drop-shadow-[0_0_20px_rgba(251,191,36,0.95)]" />
                                                </div>
                                                <span className="text-[8px] sm:text-[9px] font-black uppercase text-amber-200 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-400/40 shadow-sm mt-0.5 whitespace-nowrap">
                                                    ☀️ Matahari
                                                </span>
                                            </div>

                                            {/* 8 TEMPAT KOSONG ORBIT DENGAN NAMA PLANET SEPATUTNYA */}
                                            {SOLAR_PLANETS.map((planetInfo) => {
                                                const isFilled = Boolean(placedPlanets[planetInfo.orbit]);
                                
                                                const placedId = placedPlanets[planetInfo.orbit];
                                                const rad = (planetInfo.angleDeg * Math.PI) / 180;
                                                const leftPercent = 50 + planetInfo.radiusPercent * Math.cos(rad);
                                                const topPercent = 50 + planetInfo.radiusPercent * Math.sin(rad);

                                                return (
                                                    <div
                                                        key={planetInfo.orbit}
                                                        style={{
                                                            left: `${leftPercent}%`,
                                                            top: `${topPercent}%`,
                                                            transform: 'translate(-50%, -50%)',
                                                        }}
                                                        onDragOver={(e) => e.preventDefault()}
                                                        onDrop={(e) => onDropOnOrbit(e, planetInfo.orbit)}
                                                        onClick={() => onClickOrbitSlot(planetInfo.orbit)}
                                                        className={`absolute z-30 flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-2xl transition-all duration-200 cursor-pointer select-none ${solarWrongSlot === planetInfo.orbit ? "anim-shake " : ""}${
                                                            isFilled
                                                                ? "bg-slate-950/90 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105 ring-1 ring-cyan-400/50"
                                                                : selectedTrayPlanet
                                                                    ? "bg-sky-950/90 border-2 border-dashed border-amber-300 hover:border-amber-400 hover:scale-115 animate-pulse shadow-lg"
                                                                    : "bg-slate-950/70 border-2 border-dashed border-sky-400/50 hover:border-sky-300 hover:scale-110 shadow-md"
                                                        }`}
                                                    >
                                                        {/* Lencana Nama Planet Sasaran Orbit */}
                                                        <span className={`text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full border uppercase tracking-wider mb-0.5 whitespace-nowrap shadow-sm ${
                                                            isFilled
                                                                ? "bg-cyan-600 text-white border-cyan-300"
                                                                : "bg-sky-900/90 text-sky-200 border-sky-500/40"
                                                        }`}>
                                                            {planetInfo.name}
                                                        </span>

                                                        {/* Isi Tempat Kosong / Planet yang Diletakkan (Neutral tanpa skor!) */}
                                                        {isFilled ? (
                                                            <div className="relative group/slot flex flex-col items-center">
                                                                <GraphicPlanetIcon
                                                                    planetId={placedId}
                                                                    className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                                                                />
                                                                {/* Butang Padam / Keluarkan */}
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        onRemovePlanetFromSlot(planetInfo.orbit);
                                                                    }}
                                                                    title="Keluarkan planet dari orbit"
                                                                    className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 hover:bg-rose-700 text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-md border border-white cursor-pointer"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex flex-col items-center justify-center">
                                                                <span className={`text-[9px] sm:text-[11px] font-black ${
                                                                    selectedTrayPlanet ? "text-amber-300 font-extrabold" : "text-sky-300/60"
                                                                }`}>
                                                                    {selectedTrayPlanet ? "TAP" : "?"}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* =========================================
                                        BAR HANTAR JAWAPAN & SEMAK KEPUTUSAN
                                    ========================================== */}
                                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-purple-100 via-indigo-100 to-sky-100 p-4 rounded-3xl border-2 border-purple-300 shadow-md">
                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black text-purple-950">
                                                    {Object.keys(placedPlanets).length === 8 
                                                        ? "✨ Kesemua 8 orbit telah diisi!" 
                                                        : `🪐 ${Object.keys(placedPlanets).length} daripada 8 orbit telah diisi`}
                                                </span>
                                                {Object.keys(placedPlanets).length === 8 && (
                                                    <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                                                        Sedia Dihantar!
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-slate-600 mt-0.5">
                                                {Object.keys(placedPlanets).length === 8
                                                    ? "Sedia menyemak? Tekan butang di sebelah untuk lihat markah & semakan jawapan sebenar!"
                                                    : "Anda boleh letakkan kesemua planet atau hantar bila-bila masa untuk semakan."}
                                            </p>
                                        </div>
                                        <button
                                            onClick={onSubmitSolarGame}
                                            disabled={Object.keys(placedPlanets).length === 0}
                                            className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 shrink-0 cursor-pointer ${
                                                Object.keys(placedPlanets).length === 8
                                                    ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white hover:scale-105 shadow-emerald-400/40 ring-4 ring-emerald-300/60"
                                                    : Object.keys(placedPlanets).length > 0
                                                        ? "bg-purple-600 hover:bg-purple-700 text-white hover:scale-102 shadow-purple-300/40"
                                                        : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                                            }`}
                                        >
                                            <span>🚀</span>
                                            <span>Hantar & Semak Keputusan</span>
                                            <GraphicArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* =========================================
                                        RAK PLANET (TERUS BULAT & HANYA GAMBAR PLANET SAHAJA!)
                                        Tiada kotak petak, tiada nama planet = null, tiada teks nombor
                                    ========================================== */}
                                    <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm text-left w-full space-y-3">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                            <div>
                                                <h3 className="text-sm font-black text-slate-800">
                                                    Pilihan Planet (Kenal Pasti Rupa Bentuk)
                                                </h3>
                                                <p className="text-[11px] text-slate-500">
                                                    {SOLAR_PLANETS.filter(p => !Object.values(placedPlanets).includes(p.id)).length > 0
                                                        ? "Kenal pasti planet daripada rupanya. Seret atau klik bulatan planet untuk diletakkan ke orbit!"
                                                        : "Hebat! Kesemua planet telah ditempatkan. Sila klik &ldquo;Hantar &amp; Semak Keputusan&rdquo; di atas!"}
                                                </p>
                                            </div>
                                            <span className="text-xs font-black text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full shrink-0">
                                                {SOLAR_PLANETS.filter(p => !Object.values(placedPlanets).includes(p.id)).length} Baki
                                            </span>
                                        </div>

                                        {/* Pilihan Planet: BULAT SEMPURNA & HANYA GAMBAR PLANET SAHAJA */}
                                        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 py-3">
                                            {SOLAR_PLANETS.filter(p => !Object.values(placedPlanets).includes(p.id)).map((planet) => {
                                                const isSelected = selectedTrayPlanet === planet.id;

                                                return (
                                                    <div
                                                        key={planet.id}
                                                        draggable={true}
                                                        onDragStart={(e) => onDragStart(e, planet.id)}
                                                        onClick={() => onSelectTrayPlanet(planet.id)}
                                                        title="Klik atau seret bulatan planet ini ke orbit"
                                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-all duration-300 relative group shrink-0 ${
                                                            isSelected
                                                                ? "scale-115 ring-4 ring-amber-400 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 border-2 border-amber-500 shadow-[0_0_24px_rgba(245,158,11,0.7)] animate-bounce"
                                                                : "bg-gradient-to-b from-white via-sky-50/70 to-slate-100 hover:from-sky-50 hover:to-indigo-50 border-2 border-sky-300/80 hover:border-purple-400 shadow-md hover:shadow-xl hover:scale-115 hover:-translate-y-1"
                                                        }`}
                                                    >
                                                        {/* Halo cahaya lembut bila hover */}
                                                        <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                                        {/* HANYA GAMBAR PLANET SAHAJA (TIADA NAMA, TIADA KOTAK PETAK, TERUS BULAT) */}
                                                        <div className="relative z-10 w-13 h-13 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 pointer-events-none">
                                                            <GraphicPlanetIcon planetId={planet.id} className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]" />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {SOLAR_PLANETS.filter(p => !Object.values(placedPlanets).includes(p.id)).length === 0 && (
                                            <div className="py-4 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-2xl border border-emerald-200">
                                                🎉 Hebat! Semua 8 planet berada di orbit. Klik butang &ldquo;Hantar &amp; Semak Keputusan&rdquo; di atas untuk melihat skor dan semakan jawapan!
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Pop-up Pengesahan Keluar Aktiviti */}
                            {showExitConfirm && (
                                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 anim-fade-in">
                                    <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-3 border-purple-300 shadow-2xl text-center space-y-4 anim-pop">
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-purple-300">
                                            🪐
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900">
                                                {t ? t("Sahkan Keluar Aktiviti?", "Exit Solar Activity?") : "Sahkan Keluar Aktiviti?"}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                {t
                                                    ? t(
                                                          "Adakah anda pasti mahu keluar dari aktiviti Sistem Suria sekarang? Susunan planet anda belum selesai dan tidak akan disimpan.",
                                                          "Are you sure you want to exit the Solar System activity? Your planet arrangement is not yet complete and will not be saved."
                                                      )
                                                    : "Adakah anda pasti mahu keluar dari aktiviti Sistem Suria sekarang? Susunan planet anda belum selesai dan tidak akan disimpan."}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    playAudioFeedback?.("tap");
                                                    setShowExitConfirm(false);
                                                }}
                                                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-xl text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                                            >
                                                {t ? t("Teruskan Menyusun", "Keep Arranging") : "Teruskan Menyusun"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    playAudioFeedback?.("tap");
                                                    setShowExitConfirm(false);
                                                    onResetSolarGame?.();
                                                    onNavigate("activityList");
                                                }}
                                                className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black rounded-xl text-xs border border-rose-200 active:scale-95 transition-all cursor-pointer"
                                            >
                                                {t ? t("Ya, Keluar", "Yes, Exit") : "Ya, Keluar"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
        );
    }

    return null;
}
