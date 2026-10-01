"use client";

import React, { useState } from "react";
import {
    GraphicBackArrow,
    GraphicArrowRight,
    GraphicRefresh,
} from "./Graphics";

/* =========================================================================
   CUSTOM VECTOR SVG ILLUSTRATIONS FOR PLANT LAB
   ========================================================================= */

// 1. Detailed Watering Can (Penyiram Air)
function GraphicWateringCan({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="canBodyGrad" x1="10" y1="20" x2="50" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="spoutGrad" x1="40" y1="25" x2="60" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7dd3fc" />
                    <stop offset="1" stopColor="#0369a1" />
                </linearGradient>
            </defs>
            <path d="M12 28C8 28 6 36 6 42C6 48 9 52 14 52" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
            <path d="M22 18C22 12 30 10 36 10C42 10 44 14 44 18" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M14 26H46L43 54C43 56 41 58 38 58H20C17 58 15 56 15 54L14 26Z" fill="url(#canBodyGrad)" stroke="#0369a1" strokeWidth="2" />
            <ellipse cx="30" cy="26" rx="16" ry="4" fill="#7dd3fc" />
            <path d="M42 38L56 24" stroke="url(#spoutGrad)" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="57" cy="23" rx="4" ry="7" transform="rotate(45 57 23)" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="58" cy="14" r="1.8" fill="#38bdf8" />
            <circle cx="63" cy="18" r="1.4" fill="#38bdf8" />
            <circle cx="53" cy="11" r="1.2" fill="#38bdf8" />
        </svg>
    );
}

// 2. Animated Sunray Lamp (Pancaran Cahaya Matahari)
function GraphicSunLamp({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sunGrad" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="0.6" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#ea580c" />
                </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="14" fill="url(#sunGrad)" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="32" cy="32" r="19" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" opacity="0.75" />
            <path d="M32 5V12M32 52V59M5 32H12M52 32H59" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M13 13L18 18M46 46L51 51M13 51L18 46M46 18L51 13" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="28" cy="28" r="2.5" fill="#ffffff" opacity="0.8" />
            <circle cx="28" cy="32" r="1.5" fill="#78350f" />
            <circle cx="36" cy="32" r="1.5" fill="#78350f" />
            <path d="M29 36C30.5 38 33.5 38 35 36" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// 3. CO2 Gas Cloud (Karbon Dioksida)
function GraphicCO2Cloud({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="co2Grad" x1="12" y1="20" x2="52" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#6d28d9" />
                </linearGradient>
            </defs>
            <path
                d="M20 44H46C50.4 44 54 40.4 54 36C54 31.8 50.8 28.4 46.6 28.1C45.6 22.4 40.7 18 34.8 18C30.2 18 26.2 20.7 24.4 24.7C23.6 24.5 22.8 24.4 22 24.4C16.5 24.4 12 28.9 12 34.4C12 39.7 15.6 44 20 44Z"
                fill="url(#co2Grad)"
                stroke="#ffffff"
                strokeWidth="2.5"
            />
            <text x="32" y="36" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="11" fontFamily="sans-serif">
                CO₂
            </text>
            <circle cx="48" cy="19" r="2.5" fill="#c4b5fd" opacity="0.9" />
            <circle cx="16" cy="20" r="2" fill="#c4b5fd" opacity="0.9" />
            <circle cx="44" cy="47" r="1.5" fill="#c4b5fd" opacity="0.7" />
        </svg>
    );
}

// 4. Plant Fertilizer / Soil Nutrients (Baja Organik)
function GraphicFertilizerBottle({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="fertGrad" x1="18" y1="20" x2="46" y2="56" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34d399" />
                    <stop offset="1" stopColor="#059669" />
                </linearGradient>
            </defs>
            <rect x="26" y="10" width="12" height="6" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
            <path d="M28 16V22H36V16H28Z" fill="#10b981" />
            <path d="M22 24H42C45 24 47 26.5 47 29.5V52C47 55 45 57 42 57H22C19 57 17 55 17 52V29.5C17 26.5 19 24 22 24Z" fill="url(#fertGrad)" stroke="#047857" strokeWidth="2" />
            <path d="M28 40C30 34 36 32 36 32C36 32 36 38 34 42C32 44 29 43 28 40Z" fill="#fef08a" />
            <path d="M28 40C31 38 34 36 36 32" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="23" cy="50" r="2.2" fill="#fef08a" />
            <circle cx="41" cy="48" r="1.8" fill="#fef08a" />
            <circle cx="38" cy="27" r="1.5" fill="#ffffff" opacity="0.7" />
        </svg>
    );
}

// 5. Friendly Butterfly Graphic for lush bloom
function GraphicButterfly({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12C14 6 8 6 6 10C4 14 8 18 16 17" fill="#f43f5e" opacity="0.85" />
            <path d="M16 12C18 6 24 6 26 10C28 14 24 18 16 17" fill="#f43f5e" opacity="0.85" />
            <path d="M16 17C13 18 10 22 12 25C14 27 16 23 16 20" fill="#fb7185" opacity="0.8" />
            <path d="M16 17C19 18 22 22 20 25C18 27 16 23 16 20" fill="#fb7185" opacity="0.8" />
            <line x1="16" y1="10" x2="16" y2="24" stroke="#4c0519" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="9" r="1" fill="#4c0519" />
        </svg>
    );
}

/* =========================================================================
   LIVE IN-ACTION ANIMATION OVERLAYS (EXAGGERATED TACTILE FEEDBACK)
   ========================================================================= */

function GraphicActionOverlay({ tool }) {
    if (!tool) return null;

    if (tool === "water") {
        return (
            <div className="absolute inset-0 pointer-events-none z-40 flex flex-col items-center justify-center anim-fade-in">
                <div
                    className="absolute top-10 left-1/2 -translate-x-1/2 -ml-12 anim-shake"
                    style={{ transform: "rotate(-40deg) scale(1.3)" }}
                >
                    <GraphicWateringCan className="w-24 h-24 drop-shadow-2xl" />
                </div>
                <svg className="w-56 h-56 mt-16" viewBox="0 0 160 160" fill="none">
                    <path
                        d="M68 20 C68 60, 76 100, 78 142"
                        stroke="#38bdf8"
                        strokeWidth="5"
                        strokeDasharray="10 6"
                        className="animate-pulse"
                        strokeLinecap="round"
                    />
                    <path
                        d="M76 22 C82 65, 88 105, 90 142"
                        stroke="#0284c7"
                        strokeWidth="4"
                        strokeDasharray="8 5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M62 25 C64 65, 68 105, 70 142"
                        stroke="#7dd3fc"
                        strokeWidth="3.5"
                        strokeDasharray="7 5"
                        strokeLinecap="round"
                    />
                    <circle cx="78" cy="144" r="8" fill="#38bdf8" className="animate-ping" opacity="0.8" />
                    <circle cx="90" cy="142" r="6" fill="#7dd3fc" className="animate-ping" opacity="0.7" />
                    <circle cx="68" cy="143" r="5" fill="#0284c7" className="animate-ping" opacity="0.85" />
                </svg>
                <div className="absolute bottom-16 bg-sky-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white anim-pop flex items-center gap-1.5">
                    <span>💧</span>
                    <span>Air Diserap Akar!</span>
                </div>
            </div>
        );
    }

    if (tool === "sun") {
        return (
            <div className="absolute inset-0 pointer-events-none z-40 flex flex-col items-center justify-start pt-2 anim-fade-in">
                <div className="anim-float">
                    <GraphicSunLamp className="w-24 h-24 drop-shadow-[0_0_35px_rgba(251,191,36,1)]" />
                </div>
                <div className="w-64 h-56 bg-gradient-to-b from-yellow-300/50 via-amber-200/35 to-transparent rounded-b-full blur-md animate-pulse -mt-6 pointer-events-none" />
                <div className="absolute top-28 flex gap-8">
                    <span className="text-3xl animate-spin">✨</span>
                    <span className="text-3xl animate-bounce">🌟</span>
                    <span className="text-3xl animate-spin">✨</span>
                </div>
                <div className="absolute bottom-16 bg-amber-500 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white anim-pop flex items-center gap-1.5">
                    <span>☀️</span>
                    <span>Cahaya Diserap Klorofil!</span>
                </div>
            </div>
        );
    }

    if (tool === "co2") {
        return (
            <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center anim-fade-in">
                <div className="absolute top-8 right-12 anim-float">
                    <GraphicCO2Cloud className="w-22 h-22 drop-shadow-[0_0_24px_rgba(167,139,250,0.9)]" />
                </div>
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                    <circle cx="120" cy="80" r="22" fill="#c4b5fd" opacity="0.45" className="animate-ping" />
                    <circle cx="85" cy="110" r="16" fill="#a78bfa" opacity="0.4" className="animate-ping" />
                    <circle cx="105" cy="95" r="10" fill="#8b5cf6" opacity="0.6" />
                    <path d="M140 60 Q110 90 90 120" stroke="#a78bfa" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" />
                </svg>
                <div className="absolute bottom-16 bg-purple-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white anim-pop flex items-center gap-1.5">
                    <span>💨</span>
                    <span>Stoma Daun Menyerap CO₂!</span>
                </div>
            </div>
        );
    }

    if (tool === "nutrients") {
        return (
            <div className="absolute inset-0 pointer-events-none z-40 flex flex-col items-center justify-center anim-fade-in">
                <div
                    className="absolute top-10 right-14 anim-shake"
                    style={{ transform: "rotate(-38deg) scale(1.2)" }}
                >
                    <GraphicFertilizerBottle className="w-22 h-22 drop-shadow-2xl" />
                </div>
                <svg className="w-56 h-56 mt-20" viewBox="0 0 160 160" fill="none">
                    <circle cx="90" cy="60" r="3.5" fill="#facc15" />
                    <circle cx="84" cy="80" r="4" fill="#34d399" />
                    <circle cx="102" cy="75" r="3" fill="#38bdf8" />
                    <circle cx="94" cy="100" r="4.5" fill="#f59e0b" />
                    <circle cx="80" cy="115" r="3.5" fill="#10b981" />
                    <circle cx="98" cy="120" r="4" fill="#facc15" />
                    <circle cx="88" cy="138" r="9" fill="#10b981" className="animate-ping" opacity="0.8" />
                </svg>
                <div className="absolute bottom-16 bg-emerald-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white anim-pop flex items-center gap-1.5">
                    <span>🧪</span>
                    <span>Tanah Diperkaya Baja N-P-K!</span>
                </div>
            </div>
        );
    }

    return null;
}

/* =========================================================================
   DYNAMIC PLANT STAGE CANVAS (VECTOR GRAPHICS WITH LIVING DETAILS)
   ========================================================================= */

function GraphicPlantStage({
    stage = 1,
    isPhotosynthesizing = false,
    hasWater = false,
    hasSunlight = false,
    hasCO2 = false,
    hasNutrients = false,
}) {
    const isLushAndHealthy = stage === 4;

    return (
        <div className="relative w-full h-72 sm:h-80 flex flex-col items-center justify-end select-none">
            {/* Ambient Background Aura when Plant is Lush & Healthy or Photosynthesizing */}
            {(isPhotosynthesizing || isLushAndHealthy) && (
                <div className="absolute inset-x-4 bottom-6 top-4 bg-gradient-to-t from-emerald-400/35 via-yellow-300/40 to-sky-300/30 rounded-full blur-3xl animate-pulse pointer-events-none z-0" />
            )}

            {/* Sunlight Ambient Aura if Sun was applied */}
            {hasSunlight && !isLushAndHealthy && (
                <div className="absolute top-2 inset-x-12 h-36 bg-gradient-to-b from-amber-300/25 via-yellow-200/15 to-transparent rounded-full blur-xl pointer-events-none z-0" />
            )}

            {/* Fluttering Butterfly for Lush Stage 4 */}
            {isLushAndHealthy && (
                <div className="absolute top-8 left-10 anim-float pointer-events-none z-30">
                    <GraphicButterfly className="w-8 h-8 drop-shadow-md" />
                </div>
            )}

            {/* Main Stage Canvas */}
            <svg className="w-full h-64 sm:h-72 relative z-10" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="soilPotGrad" x1="60" y1="170" x2="180" y2="235" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#b45309" />
                        <stop offset="0.6" stopColor="#92400e" />
                        <stop offset="1" stopColor="#78350f" />
                    </linearGradient>
                    <linearGradient id="soilEarthGradDry" x1="75" y1="160" x2="165" y2="185" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#785324" />
                        <stop offset="1" stopColor="#4d3210" />
                    </linearGradient>
                    <linearGradient id="soilEarthGradWet" x1="75" y1="160" x2="165" y2="185" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2c1a06" />
                        <stop offset="1" stopColor="#1a0f03" />
                    </linearGradient>
                    <linearGradient id="stemGrad" x1="110" y1="70" x2="130" y2="170" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4ade80" />
                        <stop offset="0.7" stopColor="#22c55e" />
                        <stop offset="1" stopColor="#15803d" />
                    </linearGradient>
                    <linearGradient id="leafGradMain" x1="60" y1="60" x2="160" y2="150" gradientUnits="userSpaceOnUse">
                        <stop stopColor={hasSunlight || isLushAndHealthy ? "#4ade80" : "#34d399"} />
                        <stop offset="0.6" stopColor={hasSunlight || isLushAndHealthy ? "#16a34a" : "#10b981"} />
                        <stop offset="1" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="flowerPetalGrad" x1="80" y1="20" x2="160" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fde047" />
                        <stop offset="0.7" stopColor="#f59e0b" />
                        <stop offset="1" stopColor="#ea580c" />
                    </linearGradient>
                </defs>

                {/* Pot Shadow & Terracotta Base */}
                <ellipse cx="120" cy="235" rx="55" ry="6" fill="#000000" fillOpacity="0.14" />
                <path d="M68 175L80 230C80.8 233 83.5 235 86.5 235H153.5C156.5 235 159.2 233 160 230L172 175H68Z" fill="url(#soilPotGrad)" stroke="#78350f" strokeWidth="2.5" />
                <rect x="62" y="165" width="116" height="13" rx="6.5" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />

                {/* Terracotta Pot Cute Mascot Face */}
                <g transform="translate(120, 205)">
                    <circle cx="-16" cy="3" r="3.5" fill="#ea580c" opacity="0.35" />
                    <circle cx="16" cy="3" r="3.5" fill="#ea580c" opacity="0.35" />
                    {hasWater || isLushAndHealthy ? (
                        <>
                            <path d="M-13 -2C-10 -5 -7 -5 -4 -2" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 -2C7 -5 10 -5 13 -2" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                            <path d="M-6 4C-3 9 3 9 6 4" stroke="#451a03" strokeWidth="2.2" strokeLinecap="round" />
                        </>
                    ) : (
                        <>
                            <circle cx="-9" cy="-2" r="2.5" fill="#451a03" />
                            <circle cx="-8" cy="-3" r="0.8" fill="#ffffff" />
                            <circle cx="9" cy="-2" r="2.5" fill="#451a03" />
                            <circle cx="10" cy="-3" r="0.8" fill="#ffffff" />
                            <path d="M-5 5C-2 4 2 4 5 5" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}
                </g>

                {/* Soil Earth (Turns moist/dark with glistening water droplets when watered) */}
                <ellipse cx="120" cy="171" rx="52" ry="7" fill={hasWater || isLushAndHealthy ? "url(#soilEarthGradWet)" : "url(#soilEarthGradDry)"} />
                {(hasWater || isLushAndHealthy) && (
                    <g>
                        <ellipse cx="100" cy="170" rx="6" ry="1.5" fill="#38bdf8" opacity="0.75" />
                        <ellipse cx="136" cy="172" rx="8" ry="2" fill="#7dd3fc" opacity="0.8" />
                        <ellipse cx="118" cy="173" rx="4" ry="1.2" fill="#bae6fd" opacity="0.9" />
                    </g>
                )}

                {/* Subterranean Roots in Soil */}
                <g opacity={stage >= 1 ? "0.95" : "0.3"}>
                    <path
                        d="M120 174C120 188 114 198 108 206M120 174C122 188 128 198 135 208M120 174V216M114 192C106 195 98 198 94 204M126 192C134 196 142 199 148 205"
                        stroke={hasNutrients || isLushAndHealthy ? "#fde047" : "#fde68a"}
                        strokeWidth={hasNutrients || isLushAndHealthy ? "2.6" : "2"}
                        strokeLinecap="round"
                    />
                    {(hasNutrients || isLushAndHealthy) && (
                        <g>
                            <circle cx="108" cy="206" r="3" fill="#34d399" className="animate-ping" />
                            <circle cx="135" cy="208" r="3" fill="#facc15" className="animate-ping" />
                            <circle cx="120" cy="216" r="2.5" fill="#38bdf8" />
                        </g>
                    )}
                </g>

                {/* STAGE 1: Biji Benih Tercambah (Seed Germination) */}
                {stage === 1 && (
                    <g className="anim-pop">
                        <ellipse cx="120" cy="168" rx="10" ry="13" fill="#854d0e" stroke="#583101" strokeWidth="2" transform="rotate(-15 120 168)" />
                        <path d="M117 158C117 166 122 168 122 177" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M117 159C115 146 123 138 125 132" stroke="url(#stemGrad)" strokeWidth="3.5" strokeLinecap="round" />
                        <ellipse cx="127" cy="130" rx="5" ry="3" fill="#22c55e" transform="rotate(30 127 130)" />
                        <ellipse cx="122" cy="132" rx="4" ry="2.5" fill="#4ade80" transform="rotate(-30 122 132)" />
                        <circle cx="128" cy="126" r="2.5" fill="#fde047" />
                    </g>
                )}

                {/* STAGE 2: Anak Benih Bertunas (Seedling with Primary Leaves) */}
                {stage === 2 && (
                    <g className="anim-pop">
                        <path d="M120 171C120 148 118 120 120 95" stroke="url(#stemGrad)" strokeWidth="5.5" strokeLinecap="round" />
                        <path d="M119 135C100 132 86 120 84 105C98 106 112 118 119 130" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="1.8" />
                        <path d="M118 132C106 124 96 116 86 107" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M120 115C138 112 152 100 154 85C140 86 126 98 120 110" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="1.8" />
                        <path d="M120 112C132 104 142 96 152 87" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" />
                        <ellipse cx="116" cy="90" rx="6" ry="10" fill="#4ade80" transform="rotate(-20 116 90)" />
                        <ellipse cx="124" cy="90" rx="6" ry="10" fill="#22c55e" transform="rotate(20 124 90)" />
                        <circle cx="120" cy="85" r="3" fill="#a3e635" />
                    </g>
                )}

                {/* STAGE 3: Pokok Menghijau Rimbun (Vegetative Vigorous Growth) */}
                {stage === 3 && (
                    <g className="anim-pop">
                        <path d="M120 171C119 135 121 95 120 62" stroke="url(#stemGrad)" strokeWidth="7.5" strokeLinecap="round" />
                        <path d="M119 140C92 140 70 124 64 100C88 102 110 122 119 135" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2" />
                        <path d="M118 137C98 126 84 116 68 103" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
                        <path d="M121 130C148 130 170 114 176 90C152 92 130 112 121 125" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2" />
                        <path d="M121 127C141 116 155 106 171 93" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
                        <path d="M120 102C100 95 86 80 82 62C100 66 114 80 120 96" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2" />
                        <path d="M120 98C108 88 98 78 85 66" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M120 90C140 83 154 68 158 50C140 54 126 68 120 84" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2" />
                        <path d="M120 86C132 76 142 66 155 54" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
                        <ellipse cx="120" cy="56" rx="10" ry="14" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2.2" />
                        <circle cx="120" cy="54" r="5.5" fill="#facc15" />
                    </g>
                )}

                {/* STAGE 4: Pokok Berbunga Mekar, Subur & Sihat (Grand Sunflower Bloom) */}
                {stage === 4 && (
                    <g className="anim-pop">
                        <path d="M120 171C119 135 121 95 120 72" stroke="url(#stemGrad)" strokeWidth="8.5" strokeLinecap="round" />
                        {/* Extra Broad lush deep green leaves */}
                        <path d="M119 142C90 142 66 124 58 98C84 100 108 122 119 136" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2.2" />
                        <path d="M118 138C96 126 80 114 62 101" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
                        <path d="M121 134C150 134 174 116 182 90C156 92 132 114 121 128" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2.2" />
                        <path d="M121 130C143 118 159 106 177 93" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
                        <path d="M120 104C98 97 84 80 80 60C100 64 114 80 120 98" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2" />
                        <path d="M120 95C142 88 156 71 160 51C140 55 126 71 120 89" fill="url(#leafGradMain)" stroke="#15803d" strokeWidth="2" />

                        {/* Glistening dew drops on leaves */}
                        <circle cx="86" cy="98" r="2" fill="#e0f2fe" opacity="0.9" />
                        <circle cx="156" cy="90" r="2.2" fill="#e0f2fe" opacity="0.9" />

                        {/* Grand Golden Sunflower Head */}
                        <g transform="translate(120, 60)">
                            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                                <ellipse
                                    key={deg}
                                    cx="0"
                                    cy="-25"
                                    rx="8"
                                    ry="17"
                                    fill="url(#flowerPetalGrad)"
                                    stroke="#b45309"
                                    strokeWidth="1.2"
                                    transform={`rotate(${deg})`}
                                />
                            ))}
                            <circle cx="0" cy="0" r="18" fill="#78350f" stroke="#451a03" strokeWidth="2.5" />
                            <circle cx="0" cy="0" r="15" fill="#92400e" strokeDasharray="3 2" stroke="#fde047" strokeWidth="1.8" />
                            <circle cx="-6" cy="-3" r="2.5" fill="#fde047" />
                            <circle cx="6" cy="-3" r="2.5" fill="#fde047" />
                            <path d="M-6 4C-3 9 3 9 6 4" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" />
                        </g>

                        {/* Cheerful Friendly Bee */}
                        <g transform="translate(172, 38)" className="anim-float">
                            <ellipse cx="0" cy="0" rx="9" ry="6" fill="#facc15" stroke="#0f172a" strokeWidth="1.6" />
                            <path d="M-2 -6V6M2 -6V6" stroke="#0f172a" strokeWidth="2" />
                            <ellipse cx="-2" cy="-8" rx="4.5" ry="3" fill="#e0f2fe" opacity="0.85" transform="rotate(-25 -2 -8)" />
                            <ellipse cx="2" cy="-8" rx="4.5" ry="3" fill="#e0f2fe" opacity="0.85" transform="rotate(25 2 -8)" />
                            <circle cx="8" cy="-1" r="1.2" fill="#0f172a" />
                        </g>
                    </g>
                )}

                {/* Floating Oxygen (O2) Bubbles during Photosynthesis or Lush Stage */}
                {(isPhotosynthesizing || isLushAndHealthy) && (
                    <g className="anim-float">
                        <circle cx="86" cy="65" r="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" opacity="0.9" />
                        <text x="86" y="69" textAnchor="middle" fontSize="7" fontWeight="900" fill="#0284c7">O₂</text>
                        <circle cx="152" cy="45" r="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" opacity="0.9" />
                        <text x="152" y="49" textAnchor="middle" fontSize="8" fontWeight="900" fill="#0284c7">O₂</text>
                        <circle cx="118" cy="24" r="9.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" opacity="0.95" />
                        <text x="118" y="29" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0284c7">O₂</text>
                    </g>
                )}
            </svg>
        </div>
    );
}

/* =========================================================================
   TOOLS CONFIGURATION (EXAGGERATED CLARITY & TARGET ZONE MAPPING)
   ========================================================================= */

const TOOLS_CONFIG = [
    {
        id: "water",
        targetZone: "soil",
        nameBM: "Penyiram Air",
        nameEN: "Watering Can",
        subBM: "Air (H₂O)",
        subEN: "Water (H₂O)",
        badge: "Air 💧",
        targetZoneLabelBM: "Zon Pasu & Tanah",
        targetZoneLabelEN: "Pot & Soil Zone",
        colorBadge: "bg-sky-100 text-sky-800 border-sky-300",
        colorBorder: "border-sky-300 hover:border-sky-500",
        bgGradient: "bg-gradient-to-b from-sky-50 to-blue-50/80",
        hintBM: "Seret atau ketik ke PASU untuk siram tanah!",
        hintEN: "Drag or tap onto POT to hydrate soil!",
        scienceBM: "Air (H₂O) diserap oleh akar dan dihantar ke daun melalui salur Xilem.",
        scienceEN: "Water (H₂O) is absorbed by roots and transported to leaves via Xylem vessels.",
        Graphic: GraphicWateringCan,
    },
    {
        id: "sun",
        targetZone: "foliage",
        nameBM: "Pancar Cahaya",
        nameEN: "Sunlight Beam",
        subBM: "Tenaga Suria",
        subEN: "Solar Light",
        badge: "Cahaya ☀️",
        targetZoneLabelBM: "Zon Dedaun",
        targetZoneLabelEN: "Foliage Leaves Zone",
        colorBadge: "bg-amber-100 text-amber-800 border-amber-300",
        colorBorder: "border-amber-300 hover:border-amber-500",
        bgGradient: "bg-gradient-to-b from-amber-50 to-yellow-50/80",
        hintBM: "Seret atau ketik ke DEDAUN untuk pancarkan cahaya!",
        hintEN: "Drag or tap onto LEAVES to beam sunlight!",
        scienceBM: "Klorofil dalam daun menyerap tenaga cahaya untuk memecahkan molekul air.",
        scienceEN: "Chlorophyll inside leaves captures light energy to split water molecules.",
        Graphic: GraphicSunLamp,
    },
    {
        id: "co2",
        targetZone: "foliage",
        nameBM: "Gas Karbon Dioksida",
        nameEN: "CO₂ Gas Cloud",
        subBM: "Aliran Udara CO₂",
        subEN: "CO₂ Air Supply",
        badge: "Gas CO₂ 💨",
        targetZoneLabelBM: "Zon Dedaun",
        targetZoneLabelEN: "Foliage Leaves Zone",
        colorBadge: "bg-purple-100 text-purple-800 border-purple-300",
        colorBorder: "border-purple-300 hover:border-purple-500",
        bgGradient: "bg-gradient-to-b from-purple-50 to-indigo-50/80",
        hintBM: "Seret atau ketik ke DEDAUN untuk bekalkan CO₂!",
        hintEN: "Drag or tap onto LEAVES to supply CO₂!",
        scienceBM: "Gas CO₂ masuk melalui liang stoma halus di bahagian bawah permukaan daun.",
        scienceEN: "CO₂ enters through microscopic stomata pores beneath the leaf surface.",
        Graphic: GraphicCO2Cloud,
    },
    {
        id: "nutrients",
        targetZone: "soil",
        nameBM: "Baja Nutrien",
        nameEN: "Soil Fertilizer",
        subBM: "Garam Mineral",
        subEN: "Soil Minerals",
        badge: "Baja 🧪",
        targetZoneLabelBM: "Zon Pasu & Tanah",
        targetZoneLabelEN: "Pot & Soil Zone",
        colorBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
        colorBorder: "border-emerald-300 hover:border-emerald-500",
        bgGradient: "bg-gradient-to-b from-emerald-50 to-teal-50/80",
        hintBM: "Seret atau ketik ke PASU untuk suburkan tanah!",
        hintEN: "Drag or tap onto POT to enrich soil minerals!",
        scienceBM: "Garam mineral N-P-K membina protein, enzim dan tisu baru untuk pokok membesar.",
        scienceEN: "N-P-K minerals synthesize essential proteins, enzymes and strong plant tissues.",
        Graphic: GraphicFertilizerBottle,
    },
];

/* =========================================================================
   MAIN COMPONENT: PLANT ACTIVITY VIEW (100% FOCUSED GAME EXPERIENCE)
   ========================================================================= */

export default function PlantActivityView({
    plantScore = 0,
    plantSubmitted = false,
    onSubmitPlantGame,
    onResetPlantGame,
    onNavigate,
    t = null,
    language = "bm",
    playAudioFeedback,
    isLoggedIn = true,
    onBlockedAction = null,
}) {
    const translate = (bm, en) => {
        if (typeof t === "function") return t(bm, en);
        return language === "en" ? en : bm;
    };

    /* -------------------------------------------------------------
       STATE FOR GROWTH LAB (SIMULATOR TUMBESARAN POKOK)
       ------------------------------------------------------------- */
    const [growthStage, setGrowthStage] = useState(1); // 1 (Seed) -> 2 (Sprout) -> 3 (Vegetative) -> 4 (Full Bloom)
    const [hasWater, setHasWater] = useState(false);
    const [hasSunlight, setHasSunlight] = useState(false);
    const [hasCO2, setHasCO2] = useState(false);
    const [hasNutrients, setHasNutrients] = useState(false);
    const [isPhotosynthesizing, setIsPhotosynthesizing] = useState(false);
    const [growthGameScore, setGrowthGameScore] = useState(0);
    const [growthGameFinished, setGrowthGameFinished] = useState(false);

    // Active tool state for Drag & Drop + Click-to-Apply
    const [draggedTool, setDraggedTool] = useState(null);
    const [selectedToolToApply, setSelectedToolToApply] = useState(null);
    const [activeHoverZone, setActiveHoverZone] = useState(null);
    const [activeActionOverlay, setActiveActionOverlay] = useState(null);
    const [scienceFactBanner, setScienceFactBanner] = useState(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Web Audio Sound Synthesizer
    const playToolSound = (tool) => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) {
                playAudioFeedback?.("snap");
                return;
            }
            const ctx = new AudioCtx();

            if (tool === "water") {
                [320, 480, 620, 540, 780, 920].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.04);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.04 + 0.14);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.04);
                    osc.stop(ctx.currentTime + idx * 0.04 + 0.14);
                });
            } else if (tool === "sun") {
                [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
                    gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.06);
                    osc.stop(ctx.currentTime + idx * 0.06 + 0.3);
                });
            } else if (tool === "co2") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(180, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.25, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else if (tool === "nutrients") {
                [659.25, 830.61, 987.77, 1318.5].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.05);
                    osc.stop(ctx.currentTime + idx * 0.05 + 0.25);
                });
            } else if (tool === "growth") {
                const notes = [392, 523.25, 659.25, 783.99, 1046.5];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
                    gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.07);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.35);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.07);
                    osc.stop(ctx.currentTime + idx * 0.07 + 0.35);
                });
            } else {
                playAudioFeedback?.("snap");
            }
        } catch {
            playAudioFeedback?.("snap");
        }
    };

    // Calculate current completed elements count (0 to 4)
    const elementsFulfilledCount = [hasWater, hasSunlight, hasCO2, hasNutrients].filter(Boolean).length;
    const photosynthesisPercent = elementsFulfilledCount * 25;

    // Determine the next recommended mission step to guide the student clearly
    let currentMission = null;
    if (!hasWater) {
        currentMission = {
            step: 1,
            toolId: "water",
            textBM: "Langkah 1: Pokok dahaga! Ambil PENYIRAM AIR dan seret ke Zon Pasu / Tanah 🪴",
            textEN: "Step 1: The plant is thirsty! Grab the WATERING CAN and drag to the Pot / Soil Zone 🪴",
            targetZone: "soil",
        };
    } else if (!hasSunlight) {
        currentMission = {
            step: 2,
            toolId: "sun",
            textBM: "Langkah 2: Daun perlukan cahaya suria! Ambil PANCAR CAHAYA dan seret ke Zon Dedaun 🌿",
            textEN: "Step 2: Leaves need solar energy! Grab SUNLIGHT and drag to the Foliage Leaves Zone 🌿",
            targetZone: "foliage",
        };
    } else if (!hasCO2) {
        currentMission = {
            step: 3,
            toolId: "co2",
            textBM: "Langkah 3: Pokok perlukan nafas fotosintesis! Ambil GAS CO₂ dan seret ke Zon Dedaun 🌿",
            textEN: "Step 3: Plant needs to breathe! Grab CO₂ GAS and drag to the Foliage Leaves Zone 🌿",
            targetZone: "foliage",
        };
    } else if (!hasNutrients) {
        currentMission = {
            step: 4,
            toolId: "nutrients",
            textBM: "Langkah 4: Suburkan akar dengan mineral! Ambil BAJA NUTRIEN dan seret ke Zon Pasu 🪴",
            textEN: "Step 4: Enrich roots with minerals! Grab FERTILIZER and drag to the Pot / Soil Zone 🪴",
            targetZone: "soil",
        };
    } else {
        currentMission = {
            step: 5,
            toolId: null,
            textBM: "✨ FOTOSINTESIS LENGKAP! Pokok anda telah tumbuh menjadi sangat SUBUR & SIHAT! 🌻",
            textEN: "✨ PHOTOSYNTHESIS COMPLETE! Your plant has grown LUSH & HEALTHY! 🌻",
            targetZone: null,
        };
    }

    /* ==============================================================
       TOOL APPLICATION & DROP HANDLERS (IMMEDIATE GROWTH PROGRESSION)
       ============================================================== */

    const handleApplyTool = (toolId, dropZoneName = null) => {
        playToolSound(toolId);
        setActiveActionOverlay(toolId);

        setTimeout(() => {
            setActiveActionOverlay(null);
        }, 1800);

        const config = TOOLS_CONFIG.find((t) => t.id === toolId);
        if (config) {
            setScienceFactBanner(translate(config.scienceBM, config.scienceEN));
        }

        const nextWater = toolId === "water" ? true : hasWater;
        const nextSun = toolId === "sun" ? true : hasSunlight;
        const nextCO2 = toolId === "co2" ? true : hasCO2;
        const nextNutrients = toolId === "nutrients" ? true : hasNutrients;

        if (toolId === "water") setHasWater(true);
        if (toolId === "sun") setHasSunlight(true);
        if (toolId === "co2") setHasCO2(true);
        if (toolId === "nutrients") setHasNutrients(true);

        const activeCount = [nextWater, nextSun, nextCO2, nextNutrients].filter(Boolean).length;

        // Visual growth surge progression:
        // 1 element: Stage 2 (Sprout)
        // 2 or 3 elements: Stage 3 (Vegetative leafy green)
        // 4 elements (ALL DRAGGED): Flourishes into Stage 4 (Subur dan sihat, full bloom!)
        if (activeCount === 1) {
            setGrowthStage(2);
            playToolSound("growth");
        } else if (activeCount === 2 || activeCount === 3) {
            setGrowthStage(3);
            playToolSound("growth");
        } else if (activeCount === 4) {
            setGrowthStage(4);
            setIsPhotosynthesizing(true);
            setGrowthGameFinished(true);
            setGrowthGameScore(800);
            playAudioFeedback?.("victory");
            if (onSubmitPlantGame) {
                onSubmitPlantGame(800);
            }
        }
    };

    /* Drag Event Handlers */
    const handleDragStartTool = (e, toolId) => {
        e.dataTransfer.setData("text/plain", toolId);
        e.dataTransfer.effectAllowed = "copy";
        setDraggedTool(toolId);
        setSelectedToolToApply(toolId);
        playAudioFeedback?.("pick");
    };

    const handleDragEndTool = () => {
        setDraggedTool(null);
        setActiveHoverZone(null);
    };

    /* Drop onto Specific Zones */
    const handleDropOnZone = (e, zoneName) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveHoverZone(null);
        const toolId = e.dataTransfer.getData("text/plain") || draggedTool || selectedToolToApply;
        if (toolId) {
            handleApplyTool(toolId, zoneName);
        }
        setDraggedTool(null);
        setSelectedToolToApply(null);
    };

    /* Handle Click-To-Apply on Zones (for Touch / Mobile & Instant Click) */
    const handleZoneClick = (zoneName) => {
        if (selectedToolToApply) {
            handleApplyTool(selectedToolToApply, zoneName);
            setSelectedToolToApply(null);
        }
    };

    /* Reset Growth Game ("Main Semula") */
    const handleResetGrowth = () => {
        playAudioFeedback?.("tap");
        setGrowthStage(1);
        setHasWater(false);
        setHasSunlight(false);
        setHasCO2(false);
        setHasNutrients(false);
        setIsPhotosynthesizing(false);
        setGrowthGameScore(0);
        setGrowthGameFinished(false);
        setActiveActionOverlay(null);
        setScienceFactBanner(null);
        setSelectedToolToApply(null);
        onResetPlantGame?.();
    };

    /* Button Selesai: Submit & Navigate Forward ("Ke Seterusnya") */
    const handleFinishAndNext = () => {
        playAudioFeedback?.("victory");
        if (onSubmitPlantGame) {
            onSubmitPlantGame(800);
        }
        if (typeof onNavigate === "function") {
            onNavigate("activityList");
        }
    };

    const totalCalculatedScore = Math.max(growthGameScore, plantScore);

    return (
        <div className="space-y-6 w-full max-w-3xl anim-fade-in relative text-slate-800">
            {/* Top Navigation & Sub-Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={() => {
                            playAudioFeedback?.("tap");
                            if ((growthStage > 1 || hasWater || hasSunlight || hasCO2 || hasNutrients) && !growthGameFinished) {
                                setShowExitConfirm(true);
                            } else {
                                onNavigate("activityList");
                            }
                        }}
                        className="px-3.5 py-2 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        title={translate("Kembali ke Senarai Aktiviti", "Back to Activities List")}
                    >
                        <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                        <span>{translate("Pusat Aktiviti", "Activity Hub")}</span>
                    </button>
                    <div className="text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                                🌿 STEM Sains Hayat
                            </span>
                            <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                                800 XP Maks
                            </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-emerald-800 leading-tight mt-0.5">
                            {translate("Makmal Tumbuhan & Kebun Fotosintesis", "Plant Lab & Photosynthesis Garden")}
                        </h2>
                    </div>
                </div>

                {/* Score Chip */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <div className="px-3.5 py-1.5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-2 shadow-xs">
                        <span className="text-base">⭐</span>
                        <div className="text-left leading-none">
                            <span className="text-[9px] font-black uppercase text-emerald-600 block">
                                {translate("Skor Anda", "Your Score")}
                            </span>
                            <span className="text-sm font-black text-emerald-800">
                                {totalCalculatedScore} / 800
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==============================================================
                MAIN GAME: MAKMAL FOTOSINTESIS & SIMULATOR TUMBESARAN POKOK
                ============================================================== */}
            <div className="space-y-4 w-full anim-fade-in">
                {/* Mission Header Banner (Statik) */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-3.5 sm:p-4 rounded-3xl shadow-md border-2 border-emerald-400 relative overflow-hidden flex items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shrink-0 border border-white/30">
                            {growthGameFinished ? "🌻" : "🎯"}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                                    {growthGameFinished
                                        ? translate("Selesai 100%!", "100% Done!")
                                        : translate(`Langkah ${elementsFulfilledCount + 1} daripada 4`, `Step ${elementsFulfilledCount + 1} of 4`)}
                                </span>
                                <span className="text-[11px] font-bold text-emerald-200">
                                    {growthGameFinished
                                        ? translate("Pokok Subur & Sihat!", "Lush & Healthy Plant!")
                                        : growthStage === 1
                                        ? translate("Biji Benih", "Seed Stage")
                                        : growthStage === 2
                                        ? translate("Anak Benih Bertunas", "Sprout Stage")
                                        : translate("Pokok Rimbun", "Vegetative Stage")}
                                </span>
                            </div>
                            <h3 className="text-xs sm:text-sm font-black text-white mt-1 leading-snug">
                                {translate(currentMission.textBM, currentMission.textEN)}
                            </h3>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end shrink-0">
                        <span className="text-[10px] font-bold text-emerald-200 uppercase">
                            {translate("Fotosintesis", "Photosynthesis")}
                        </span>
                        <span className="text-base font-black text-amber-300">
                            {photosynthesisPercent}%
                        </span>
                    </div>
                </div>

                {/* ==============================================================
                    THE GARDEN CANVAS (POKOK SENTIASA KELIHATAN & MEMBESAR SUBUR)
                    ============================================================== */}
                <div className="bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50/50 rounded-3xl p-4 sm:p-5 shadow-inner relative overflow-hidden border-3 border-emerald-300">
                    {/* Status Bar */}
                    <div className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-emerald-200 shadow-xs mb-3">
                        <div className="flex items-center justify-between text-[11px] font-black mb-1.5">
                            <span className="flex items-center gap-1.5 text-emerald-800">
                                <span>⚡</span>
                                <span>{translate("Tolok Kuasa Fotosintesis:", "Photosynthesis Power Gauge:")}</span>
                            </span>
                            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md text-[10px]">
                                {elementsFulfilledCount} / 4 {translate("Keperluan Lengkap", "Supplies Ready")}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5">
                            <div
                                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-500 shadow-xs"
                                style={{ width: `${photosynthesisPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Interactive Plant Canvas */}
                    <div className="relative w-full flex items-center justify-center">
                        {/* If game is still in progress, show the 2 drop target zones */}
                        {!growthGameFinished && (
                            <>
                                {/* TARGET ZONE 1: DEDAUN (Upper Half for Sunlight & CO2) */}
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.dataTransfer.dropEffect = "copy";
                                        if (activeHoverZone !== "foliage") setActiveHoverZone("foliage");
                                    }}
                                    onDragLeave={() => setActiveHoverZone(null)}
                                    onDrop={(e) => handleDropOnZone(e, "foliage")}
                                    onClick={() => handleZoneClick("foliage")}
                                    className={`absolute top-2 inset-x-4 sm:inset-x-12 h-36 rounded-3xl z-20 transition-all flex flex-col items-center justify-start pt-2 cursor-pointer ${
                                        activeHoverZone === "foliage"
                                            ? "border-4 border-dashed border-amber-500 bg-amber-200/50 ring-4 ring-amber-300 scale-102"
                                            : draggedTool === "sun" || draggedTool === "co2" || selectedToolToApply === "sun" || selectedToolToApply === "co2"
                                            ? "border-3 border-dashed border-amber-400 bg-amber-100/40 animate-pulse ring-2 ring-amber-300"
                                            : "border-2 border-dashed border-emerald-300/40 hover:border-emerald-400/80 bg-white/10"
                                    }`}
                                >
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs transition-all bg-white/90 text-emerald-900 border border-emerald-300">
                                        <span>🌿</span>
                                        <span>{translate("Zon Dedaun (Cahaya ☀️ & CO₂ 💨)", "Foliage Zone (Light ☀️ & CO₂ 💨)")}</span>
                                    </div>

                                    {(activeHoverZone === "foliage" || draggedTool === "sun" || draggedTool === "co2" || selectedToolToApply === "sun" || selectedToolToApply === "co2") && (
                                        <div className="mt-2 bg-amber-500 text-white font-black text-xs px-3 py-1 rounded-xl shadow-md anim-pop flex items-center gap-1.5">
                                            <span>👇</span>
                                            <span>{translate("Lepaskan Sini untuk Dedaun!", "Drop Here for Leaves!")}</span>
                                        </div>
                                    )}
                                </div>

                                {/* TARGET ZONE 2: PASU & TANAH (Lower Half for Water & Fertilizer) */}
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.dataTransfer.dropEffect = "copy";
                                        if (activeHoverZone !== "soil") setActiveHoverZone("soil");
                                    }}
                                    onDragLeave={() => setActiveHoverZone(null)}
                                    onDrop={(e) => handleDropOnZone(e, "soil")}
                                    onClick={() => handleZoneClick("soil")}
                                    className={`absolute bottom-2 inset-x-6 sm:inset-x-16 h-36 rounded-3xl z-20 transition-all flex flex-col items-center justify-end pb-3 cursor-pointer ${
                                        activeHoverZone === "soil"
                                            ? "border-4 border-dashed border-sky-500 bg-sky-200/50 ring-4 ring-sky-300 scale-102"
                                            : draggedTool === "water" || draggedTool === "nutrients" || selectedToolToApply === "water" || selectedToolToApply === "nutrients"
                                            ? "border-3 border-dashed border-sky-400 bg-sky-100/40 animate-pulse ring-2 ring-sky-300"
                                            : "border-2 border-dashed border-amber-600/30 hover:border-amber-600/70 bg-white/10"
                                    }`}
                                >
                                    {(activeHoverZone === "soil" || draggedTool === "water" || draggedTool === "nutrients" || selectedToolToApply === "water" || selectedToolToApply === "nutrients") && (
                                        <div className="mb-2 bg-sky-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-md anim-pop flex items-center gap-1.5">
                                            <span>👇</span>
                                            <span>{translate("Lepaskan Sini ke dalam Tanah!", "Drop Here into Soil!")}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs transition-all bg-white/90 text-amber-950 border border-amber-300">
                                        <span>🪴</span>
                                        <span>{translate("Zon Pasu & Tanah (Air 💧 & Baja 🧪)", "Pot & Soil Zone (Water 💧 & Fertilizer 🧪)")}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Badge if Plant is Subur & Sihat */}
                        {growthGameFinished && (
                            <div className="absolute top-2 z-30 bg-emerald-600 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full border-2 border-white shadow-lg anim-pop flex items-center gap-2">
                                <span>🌟</span>
                                <span>{translate("POKOK SUBUR & SIHAT (100% MEKAR)!", "LUSH & HEALTHY PLANT (100% BLOOM)!")}</span>
                                <span>🌻</span>
                            </div>
                        )}

                        {/* Animated Plant Stage Visualizer */}
                        <GraphicPlantStage
                            stage={growthStage}
                            isPhotosynthesizing={isPhotosynthesizing}
                            hasWater={hasWater}
                            hasSunlight={hasSunlight}
                            hasCO2={hasCO2}
                            hasNutrients={hasNutrients}
                        />

                        {/* Live Pouring / Lighting Action Overlay */}
                        <GraphicActionOverlay tool={activeActionOverlay} />
                    </div>

                    {/* Real-time Status of the 4 Essential Elements */}
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                        <div
                            className={`p-2.5 rounded-2xl border transition-all ${
                                hasWater
                                    ? "bg-sky-100 text-sky-900 border-sky-400 font-black shadow-xs"
                                    : "bg-white text-slate-500 border-slate-200"
                            }`}
                        >
                            <div className="text-xl mb-0.5">💧</div>
                            <span className="text-[11px] font-black block">{translate("Air (H₂O)", "Water")}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                                hasWater ? "bg-sky-200 text-sky-900" : "bg-slate-100 text-slate-400"
                            }`}>
                                {hasWater ? "✓ Lengkap" : "+ Perlu"}
                            </span>
                        </div>

                        <div
                            className={`p-2.5 rounded-2xl border transition-all ${
                                hasSunlight
                                    ? "bg-amber-100 text-amber-900 border-amber-400 font-black shadow-xs"
                                    : "bg-white text-slate-500 border-slate-200"
                            }`}
                        >
                            <div className="text-xl mb-0.5">☀️</div>
                            <span className="text-[11px] font-black block">{translate("Cahaya Mentari", "Sunlight")}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                                hasSunlight ? "bg-amber-200 text-amber-900" : "bg-slate-100 text-slate-400"
                            }`}>
                                {hasSunlight ? "✓ Lengkap" : "+ Perlu"}
                            </span>
                        </div>

                        <div
                            className={`p-2.5 rounded-2xl border transition-all ${
                                hasCO2
                                    ? "bg-purple-100 text-purple-900 border-purple-400 font-black shadow-xs"
                                    : "bg-white text-slate-500 border-slate-200"
                            }`}
                        >
                            <div className="text-xl mb-0.5">💨</div>
                            <span className="text-[11px] font-black block">{translate("Gas CO₂", "CO₂ Gas")}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                                hasCO2 ? "bg-purple-200 text-purple-900" : "bg-slate-100 text-slate-400"
                            }`}>
                                {hasCO2 ? "✓ Lengkap" : "+ Perlu"}
                            </span>
                        </div>

                        <div
                            className={`p-2.5 rounded-2xl border transition-all ${
                                hasNutrients
                                    ? "bg-emerald-100 text-emerald-900 border-emerald-400 font-black shadow-xs"
                                    : "bg-white text-slate-500 border-slate-200"
                            }`}
                        >
                            <div className="text-xl mb-0.5">🧪</div>
                            <span className="text-[11px] font-black block">{translate("Baja Nutrien", "Nutrients")}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                                hasNutrients ? "bg-emerald-200 text-emerald-900" : "bg-slate-100 text-slate-400"
                            }`}>
                                {hasNutrients ? "✓ Lengkap" : "+ Perlu"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Did You Know? Science Fact Banner */}
                {scienceFactBanner && !growthGameFinished && (
                    <div className="p-3 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold text-center anim-pop flex items-center justify-between gap-2 shadow-xs">
                        <div className="flex items-center gap-2 text-left">
                            <span className="text-base">💡</span>
                            <span>{scienceFactBanner}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setScienceFactBanner(null)}
                            className="text-emerald-700 hover:text-emerald-950 font-black cursor-pointer text-sm"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* ==============================================================
                    WHEN FINISHED: CELEBRATION CARD WITH THE 2 REQUESTED BUTTONS!
                    ============================================================== */}
                {growthGameFinished ? (
                    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 p-5 sm:p-6 rounded-3xl border-3 border-emerald-400 shadow-xl text-center space-y-4 anim-pop">
                        <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 font-black text-xs border border-emerald-400">
                                <span>🌟</span>
                                <span>{translate("Fotosintesis Selesai & Berjaya!", "Photosynthesis Complete & Successful!")}</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                                {translate("Pokok Anda Telah Tumbuh Sangat Subur & Sihat! 🌻", "Your Plant Has Grown Lush & Healthy! 🌻")}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
                                {translate(
                                    "Air 💧, Cahaya Mentari ☀️, Gas CO₂ 💨 dan Baja Nutrien 🧪 diserap dengan sempurna. Pokok kini membesar mekar, menghasilkan glukosa dan membebaskan gas oksigen bersih untuk hidupan bernafas!",
                                    "Water 💧, Sunlight ☀️, CO₂ 💨 and Nutrients 🧪 were absorbed in harmony. The plant bloomed, producing glucose and releasing clean oxygen!"
                                )}
                            </p>
                        </div>

                        {/* Score Chip */}
                        <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border-2 border-emerald-300 shadow-sm">
                            <span className="text-2xl">⭐</span>
                            <div className="text-left leading-tight">
                                <span className="text-[10px] font-black uppercase text-emerald-600 block">
                                    {translate("Markah Aktiviti", "Activity Score")}
                                </span>
                                <span className="text-base font-black text-emerald-900">800 / 800 XP</span>
                            </div>
                        </div>

                        {/* THE REQUIRED BUTTONS: "SELESAI", "MAIN SEMULA", "PUSAT AKTIVITI" */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            {/* Button 1: Selesai (Bawa ke Page Tumbuhan) */}
                            <button
                                type="button"
                                onClick={() => {
                                    playAudioFeedback?.("victory");
                                    if (onSubmitPlantGame) onSubmitPlantGame(800);
                                    handleResetGrowth();
                                }}
                                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-emerald-300"
                            >
                                <span>✅</span>
                                <span>{translate("Selesai", "Done")}</span>
                            </button>

                            {/* Button 2: Main Semula */}
                            <button
                                type="button"
                                onClick={handleResetGrowth}
                                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-black text-sm rounded-2xl shadow-xs border-2 border-emerald-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <GraphicRefresh className="w-4 h-4 text-emerald-700" />
                                <span>{translate("Main Semula", "Play Again")}</span>
                            </button>

                            {/* Button 3: Pusat Aktiviti */}
                            <button
                                type="button"
                                onClick={handleFinishAndNext}
                                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-black text-sm rounded-2xl shadow-xs border-2 border-slate-300 hover:border-slate-400 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>🏠</span>
                                <span>{translate("Pusat Aktiviti", "Activity Hub")}</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* ==============================================================
                        WHILE PLAYING: TOOLS TRAY AT THE BOTTOM
                        ============================================================== */
                    <div className="space-y-3 text-left bg-gradient-to-r from-emerald-50/70 via-slate-50 to-teal-50/70 p-4 sm:p-5 rounded-3xl border-2 border-emerald-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black uppercase text-slate-800 tracking-wider">
                                        🛠️ {translate("Kotak Alatan Penjagaan Pokok:", "Botanical Care Tools:")}
                                    </span>
                                    <span className="text-[10px] font-black uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                                        🖐️ Seret ATAU Ketik Alatan
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                                    {translate(
                                        "Seret alatan ke zon sasaran di atas, ATAU ketik alatan lalu ketik zon pokok untuk menggunakannya!",
                                        "Drag the tool to target zone above, OR tap the tool then tap the plant zone to apply!"
                                    )}
                                </p>
                            </div>

                            {selectedToolToApply && (
                                <div className="bg-amber-400 text-slate-950 px-3 py-1 rounded-xl text-[11px] font-black border border-amber-500 animate-bounce shrink-0 shadow-xs">
                                    {translate("👉 Alatan Dipegang! Sekarang ketik zon pokok di atas.", "👉 Tool in hand! Now tap the plant zone above.")}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                            {TOOLS_CONFIG.map((tool) => {
                                const ToolGraphic = tool.Graphic;
                                const isHeld = selectedToolToApply === tool.id || draggedTool === tool.id;
                                const isRecommendedNext = currentMission.toolId === tool.id;
                                const isAlreadyProvided =
                                    (tool.id === "water" && hasWater) ||
                                    (tool.id === "sun" && hasSunlight) ||
                                    (tool.id === "co2" && hasCO2) ||
                                    (tool.id === "nutrients" && hasNutrients);

                                return (
                                    <div
                                        key={tool.id}
                                        draggable={true}
                                        onDragStart={(e) => handleDragStartTool(e, tool.id)}
                                        onDragEnd={handleDragEndTool}
                                        onClick={() => {
                                            if (selectedToolToApply === tool.id) {
                                                setSelectedToolToApply(null);
                                            } else {
                                                setSelectedToolToApply(tool.id);
                                                playAudioFeedback?.("pick");
                                            }
                                        }}
                                        title={translate(tool.hintBM, tool.hintEN)}
                                        className={`p-3.5 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-between text-center cursor-grab active:cursor-grabbing select-none group relative shadow-xs hover:shadow-md hover:-translate-y-1 ${
                                            isHeld
                                                ? "scale-105 border-amber-500 ring-4 ring-amber-300 bg-amber-50 shadow-lg animate-bounce"
                                                : isRecommendedNext
                                                ? `${tool.bgGradient} border-amber-400 ring-2 ring-amber-300/80`
                                                : isAlreadyProvided
                                                ? "bg-slate-50 border-emerald-300 opacity-80"
                                                : `${tool.bgGradient} ${tool.colorBorder}`
                                        }`}
                                    >
                                        {isAlreadyProvided ? (
                                            <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mb-1 border border-emerald-300">
                                                ✓ {translate("Selesai", "Ready")}
                                            </span>
                                        ) : isRecommendedNext ? (
                                            <span className="text-[9px] font-black uppercase text-amber-950 bg-amber-300 px-2 py-0.5 rounded-full mb-1 border border-amber-400 animate-pulse">
                                                👉 {translate("Perlu!", "Next!")}
                                            </span>
                                        ) : (
                                            <span className="text-[9px] font-black uppercase text-slate-500 bg-white/90 px-2 py-0.5 rounded-full mb-1 border border-slate-200">
                                                {translate("Seret / Ketik", "Drag / Tap")}
                                            </span>
                                        )}

                                        <div className="w-14 h-14 flex items-center justify-center my-1 group-hover:scale-115 group-hover:rotate-3 transition-transform">
                                            <ToolGraphic className="w-full h-full drop-shadow-sm" />
                                        </div>

                                        <div className="w-full">
                                            <h4 className="text-xs font-black text-slate-800 leading-tight">
                                                {translate(tool.nameBM, tool.nameEN)}
                                            </h4>
                                            <span className="text-[9px] text-slate-500 block mt-0.5 font-bold">
                                                ➔ {translate(tool.targetZoneLabelBM, tool.targetZoneLabelEN)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Pop-up Pengesahan Keluar Aktiviti */}
            {showExitConfirm && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 anim-fade-in">
                    <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-3 border-emerald-300 shadow-2xl text-center space-y-4 anim-pop">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-emerald-300">
                            🌿
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900">
                                {translate("Sahkan Keluar Aktiviti?", "Exit Plant Lab?")}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {translate(
                                    "Adakah anda pasti mahu keluar? Kemajuan eksperimen fotosintesis pokok anda sedang berjalan dan tidak akan disimpan.",
                                    "Are you sure you want to exit? Your plant growth experiment is currently in progress and will not be saved."
                                )}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                            <button
                                type="button"
                                onClick={() => {
                                    playAudioFeedback?.("tap");
                                    setShowExitConfirm(false);
                                }}
                                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                            >
                                {translate("Teruskan Eksperimen", "Keep Experimenting")}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    playAudioFeedback?.("tap");
                                    setShowExitConfirm(false);
                                    onNavigate("activityList");
                                }}
                                className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black rounded-xl text-xs border border-rose-200 active:scale-95 transition-all cursor-pointer"
                            >
                                {translate("Ya, Keluar", "Yes, Exit")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
