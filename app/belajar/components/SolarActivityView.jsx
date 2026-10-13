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
    if (currentView !== "solarDragDrop") {
        return null;
    }

    if (currentView === "solarDragDrop") {
        return (
            <div className="space-y-5 w-full max-w-2xl anim-fade-in relative">

                            {/* =========================================
                                1. HALAMAN KEPUTUSAN & SEMAKAN JAWAPAN
                                (Dipaparkan setelah user menek                            {/* =========================================
                                1. HALAMAN KEPUTUSAN & SEMAKAN JAWAPAN
                                (Kemas, ringkas, tanpa teks berlebihan)
                            ========================================== */}
                            {solarSubmitted ? (
                                <div className="space-y-4 w-full anim-pop">
                                    
                                    {/* Header Keputusan Ringkas */}
                                    <div className="flex items-center justify-between gap-3 w-full border-b border-slate-100 pb-3">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => { playAudioFeedback?.("tap"); onResetSolarGame?.(); onNavigate("activityList"); }}
                                                className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0 hover:bg-rose-50 hover:text-rose-700 transition-colors shadow-xs active:scale-95"
                                            >
                                                <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                                <span>Back</span>
                                            </button>
                                            <h2 className="text-base sm:text-lg font-black text-purple-700 leading-tight">
                                                Keputusan Sistem Suria
                                            </h2>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={onResetSolarGame}
                                            className="px-3.5 py-2 bg-transparent border-2 border-[#0099e5] text-[#0099e5] hover:bg-[#0099e5] hover:text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all duration-300 active:scale-95"
                                        >
                                            <GraphicRefresh className="w-4 h-4" />
                                            <span>Main Semula</span>
                                        </button>
                                    </div>

                                    {/* Kad Skor Ringkas & Padat */}
                                    {(() => {
                                        let correctCount = 0;
                                        SOLAR_PLANETS.forEach(p => {
                                            if (placedPlanets[p.orbit] === p.id) correctCount++;
                                        });
                                        const pct = Math.round((correctCount / 8) * 100);
                                        const coinsEarned = correctCount === 8 ? 20 : correctCount >= 5 ? 15 : 10;

                                        return (
                                            <div className="bg-gradient-to-br from-purple-50 via-white to-sky-50 border-2 border-purple-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 text-center">
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto">
                                                    {correctCount === 8 ? (
                                                        <GraphicGrandTrophy className="w-full h-full" />
                                                    ) : correctCount >= 5 ? (
                                                        <GraphicStarMedal className="w-full h-full" />
                                                    ) : (
                                                        <GraphicExploBot className="w-full h-full" />
                                                    )}
                                                </div>

                                                <div>
                                                    <span className={`inline-block font-black text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider border shadow-xs mb-1 ${
                                                        correctCount === 8
                                                            ? "bg-amber-100 text-amber-900 border-amber-300"
                                                            : correctCount >= 5
                                                                ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                                                : "bg-purple-100 text-purple-900 border-purple-300"
                                                    }`}>
                                                        {correctCount === 8 ? "🏆 Sistem Suria Sempurna" : correctCount >= 5 ? "🌟 Pencapaian Hebat" : "🚀 Usaha Baik"}
                                                    </span>
                                                    <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                                                        {correctCount} / 8 Planet Tepat ({pct}%)
                                                    </h3>
                                                </div>

                                                {/* Papan Markah & Koin Ringkas */}
                                                <div className="grid grid-cols-2 gap-2.5 max-w-xs mx-auto pt-1">
                                                    <div className="bg-white p-2.5 rounded-2xl border-2 border-purple-200 shadow-xs">
                                                        <span className="text-[10px] font-black uppercase text-purple-600 block">Jumlah Skor</span>
                                                        <span className="text-lg sm:text-xl font-black text-purple-950">{solarScore} / 800</span>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-amber-50 to-yellow-100/70 p-2.5 rounded-2xl border-2 border-amber-300 shadow-xs">
                                                        <span className="text-[10px] font-black uppercase text-amber-700 block">Ganjaran Koin</span>
                                                        <span className="text-lg sm:text-xl font-black text-amber-950">+{coinsEarned} 🌟</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* SEMAKAN 8 ORBIT (KOMPAK, KEMAS & PANTAS DIFAHAMI) */}
                                    <div className="space-y-2.5 text-left">
                                        <div className="flex items-center justify-between px-1">
                                            <h3 className="text-sm font-black text-slate-800">
                                                Semakan 8 Orbit
                                            </h3>
                                            <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                                                8 Orbit
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {SOLAR_PLANETS.map((planetInfo) => {
                                                const placedId = placedPlanets[planetInfo.orbit];
                                                const placedPlanetObj = SOLAR_PLANETS.find(p => p.id === placedId);
                                                const isMatch = placedPlanetObj?.id === planetInfo.id;

                                                return (
                                                    <div
                                                        key={planetInfo.orbit}
                                                        className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-2 shadow-xs ${
                                                            isMatch
                                                                ? "bg-emerald-50/70 border-emerald-300"
                                                                : "bg-rose-50/70 border-rose-300"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <span className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                                                                isMatch ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                                                            }`}>
                                                                {planetInfo.orbit}
                                                            </span>
                                                            <div className="text-left min-w-0">
                                                                <span className="text-xs font-black text-slate-800 block truncate">
                                                                    Orbit {planetInfo.orbit}: {planetInfo.name}
                                                                </span>
                                                                <div className="flex items-center gap-1.5 text-[11px] font-bold mt-0.5">
                                                                    {isMatch ? (
                                                                        <span className="text-emerald-700 flex items-center gap-1">
                                                                            <GraphicPlanetIcon planetId={planetInfo.id} className="w-4 h-4 inline-block" />
                                                                            <span>Tepat (+100 XP)</span>
                                                                        </span>
                                                                    ) : (
                                                                        <div className="flex items-center gap-1.5 text-slate-600">
                                                                            <span className="flex items-center gap-1 line-through text-rose-600 opacity-80">
                                                                                {placedPlanetObj ? (
                                                                                    <>
                                                                                        <GraphicPlanetIcon planetId={placedPlanetObj.id} className="w-4 h-4 inline-block" />
                                                                                        <span>{placedPlanetObj.name}</span>
                                                                                    </>
                                                                                ) : (
                                                                                    <span>Kosong</span>
                                                                                )}
                                                                            </span>
                                                                            <span className="text-[10px] text-slate-400">➔</span>
                                                                            <span className="flex items-center gap-1 font-black text-purple-900 bg-purple-100/90 px-1.5 py-0.5 rounded-md border border-purple-200">
                                                                                <GraphicPlanetIcon planetId={planetInfo.id} className="w-4 h-4 inline-block" />
                                                                                <span>{planetInfo.name}</span>
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase shrink-0 ${
                                                            isMatch
                                                                ? "bg-emerald-500 text-white border-emerald-400"
                                                                : "bg-rose-500 text-white border-rose-400"
                                                        }`}>
                                                            {isMatch ? "✓ Tepat" : "✕ Salah"}
                                                        </span>
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
                                            <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                            <span>Back</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* =========================================
                                    2. PAPARAN PERMAINAN DRAG & DROP
                                    (Semasa user sedang bermain - tiada skor dipaparkan)
                                ========================================== */
                                <>
                                    {/* Header Permainan Ringkas */}
                                    <div className="flex items-center justify-between gap-3 w-full border-b border-slate-100 pb-3">
                                        <div className="flex items-center gap-3">
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
                                                className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0 hover:bg-rose-50 hover:text-rose-700 transition-colors shadow-xs active:scale-95"
                                                title="Back"
                                            >
                                                <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                                <span>Back</span>
                                            </button>
                                            <h2 className="text-base sm:text-lg font-black text-purple-700 leading-tight">
                                                {t ? t("Susun Sistem Suria", "Arrange Solar System") : "Susun Sistem Suria"}
                                            </h2>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <div className="bg-sky-100 border border-sky-300 text-sky-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5">
                                                <span>🪐</span>
                                                <span>{Object.keys(placedPlanets).length}/8</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={onResetSolarGame}
                                                className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-slate-600 cursor-pointer transition-all"
                                                title="Kosongkan Semua"
                                            >
                                                <GraphicRefresh className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Dynamic Feedback Banner (Hanya jika ada mesej) */}
                                    {solarFeedbackMessage && (
                                        <div className={`p-2.5 rounded-2xl border-2 text-xs font-bold flex items-center justify-between gap-2 shadow-xs ${
                                            solarFeedbackMessage.type === "success"
                                                ? "bg-emerald-50 border-emerald-400 text-emerald-900 anim-pop"
                                                : "bg-sky-50 border-sky-400 text-sky-900"
                                        }`}>
                                            <div className="flex items-center gap-2">
                                                <span>{solarFeedbackMessage.type === "success" ? "🎉" : "💡"}</span>
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
                                    )}

                                    {/* =========================================
                                        RAK PLANET DI ATAS (MUDAH DIGAPAI!)
                                        Pengguna boleh ketuk atau tarik ke orbit di bawah
                                    ========================================== */}
                                    <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-2 border-slate-200/90 shadow-sm w-full transition-all">
                                        <div className="flex items-center justify-between mb-2 px-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                                    <span>Rak Planet</span>
                                                </span>
                                                {selectedTrayPlanet ? (
                                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full animate-pulse">
                                                        Ketuk orbit di bawah
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-slate-400 font-medium">
                                                        Ketuk / Tarik planet ke orbit
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[11px] font-black text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                                                {SOLAR_PLANETS.filter(p => !Object.values(placedPlanets).includes(p.id)).length} Baki
                                            </span>
                                        </div>

                                        {/* Planet-planet Bulat Mudah Digapai */}
                                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 py-1">
                                            {SOLAR_PLANETS.filter(p => !Object.values(placedPlanets).includes(p.id)).map((planet) => {
                                                const isSelected = selectedTrayPlanet === planet.id;

                                                return (
                                                    <div
                                                        key={planet.id}
                                                        draggable={true}
                                                        onDragStart={(e) => onDragStart(e, planet.id)}
                                                        onClick={() => onSelectTrayPlanet(planet.id)}
                                                        title={planet.name}
                                                        className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-all duration-200 relative group shrink-0 ${
                                                            isSelected
                                                                ? "scale-115 ring-4 ring-amber-400 bg-amber-100 border-2 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse"
                                                                : "bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-purple-400 shadow-xs hover:shadow-md hover:scale-110 active:scale-95"
                                                        }`}
                                                    >
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center pointer-events-none">
                                                            <GraphicPlanetIcon planetId={planet.id} className="w-full h-full drop-shadow-sm" />
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {SOLAR_PLANETS.filter(p => !Object.values(placedPlanets).includes(p.id)).length === 0 && (
                                                <div className="py-1 text-center text-xs font-black text-emerald-700 flex items-center justify-center gap-1.5">
                                                    <span>Semua 8 planet telah disusun ke orbit!</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* =========================================
                                        KANVAS SISTEM SURIA ASLI DENGAN MATAHARI DI TENGAH
                                    ========================================== */}
                                    <div className="bg-gradient-to-br from-[#020512] via-[#09153a] to-[#010410] border-2 sm:border-3 border-sky-400/40 rounded-3xl p-3 sm:p-5 shadow-2xl relative overflow-hidden text-white flex flex-col items-center">
                                         
                                        {/* ARENA SISTEM SURIA BULAT CONCENTRIC (MATAHARI DI TENGAH) */}
                                        <div className="relative w-full aspect-square max-w-[430px] sm:max-w-[480px] mx-auto rounded-full border border-sky-500/30 shadow-[inset_0_0_35px_rgba(2,132,199,0.3)] flex items-center justify-center overflow-hidden my-1 select-none">
                                            
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
                                        BAR AKSI HANTAR JAWAPAN (KOMPAK & BERSIH)
                                    ========================================== */}
                                    <div className="w-full flex items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border-2 border-slate-200 shadow-xs">
                                        <div className="flex items-center gap-2 text-left">
                                            <span className="text-xs font-black text-slate-800">
                                                {Object.keys(placedPlanets).length} / 8 Orbit Terisi
                                            </span>
                                            {Object.keys(placedPlanets).length === 8 && (
                                                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                                                    Lengkap
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={onSubmitSolarGame}
                                            disabled={Object.keys(placedPlanets).length === 0}
                                            className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-200 cursor-pointer ${
                                                Object.keys(placedPlanets).length === 8
                                                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md hover:scale-102"
                                                    : Object.keys(placedPlanets).length > 0
                                                        ? "bg-purple-600 hover:bg-purple-700 text-white hover:scale-102"
                                                        : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                                            }`}
                                        >
                                            <span>Hantar Jawapan</span>
                                            <GraphicArrowRight className="w-4 h-4" />
                                        </button>
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
                                                    onNavigate("menu");
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
