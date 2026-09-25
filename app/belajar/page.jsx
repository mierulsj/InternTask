"use client";

import React, { useState, useEffect, useRef } from "react";

/* =========================================================================
   CUSTOM VECTOR GRAPHICS & ICON ILLUSTRATIONS (REPLACING PLAIN EMOJIS)
   ========================================================================= */

// 1. Detailed Graphic Home Icon (For Pure Graphic Home Button)
function GraphicHomeButton({ className = "w-6 h-6" }) {
    return (
        <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="homeRoofGrad" x1="4" y1="4" x2="24" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="homeDoorGrad" x1="11" y1="17" x2="17" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0284c7" />
                    <stop offset="1" stopColor="#0369a1" />
                </linearGradient>
            </defs>
            <path d="M19 6V10.5L21.5 8.5V6C21.5 5.72 21.28 5.5 21 5.5H19.5C19.22 5.5 19 5.72 19 6Z" fill="#ffffff" fillOpacity="0.9" />
            <path d="M14 3.5L2.5 13.5H6V24C6 24.55 6.45 25 7 25H21C21.55 25 22 24.55 22 24V13.5H25.5L14 3.5Z" fill="url(#homeRoofGrad)" />
            <path d="M11 17C11 15.34 12.34 14 14 14C15.66 14 17 15.34 17 17V25H11V17Z" fill="url(#homeDoorGrad)" />
            <circle cx="15.5" cy="20.5" r="0.8" fill="#facc15" />
            <circle cx="14" cy="10" r="2" fill="#0284c7" />
            <path d="M14 8.2V11.8M12.2 10H15.8" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" />
        </svg>
    );
}

// 2. Graphic for "Pembelajaran" / Science Book with Atom
function GraphicScienceBook({ className = "w-16 h-16" }) {
    return (
        <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bookCoverGrad" x1="12" y1="20" x2="68" y2="65" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00b4d8" />
                    <stop offset="1" stopColor="#0077b6" />
                </linearGradient>
                <linearGradient id="bookPagesGrad" x1="14" y1="22" x2="66" y2="58" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="atomGlowGrad" x1="32" y1="12" x2="48" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffb703" />
                    <stop offset="1" stopColor="#fb8500" />
                </linearGradient>
            </defs>
            <ellipse cx="40" cy="72" rx="28" ry="4.5" fill="#000000" fillOpacity="0.12" />
            <path d="M12 28C12 28 24 22 40 25C56 22 68 28 68 28V62C68 62 55 57 40 59C25 57 12 62 12 62V28Z" fill="url(#bookCoverGrad)" />
            <path d="M14 26C14 26 25 21 40 23C55 21 66 26 66 26V58C66 58 54 53 40 55C26 53 14 58 14 58V26Z" fill="url(#bookPagesGrad)" />
            <path d="M40 23V55" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(0, -6)">
                <ellipse cx="40" cy="22" rx="17" ry="6" stroke="#00acc1" strokeWidth="2" fill="none" transform="rotate(-28 40 22)" strokeDasharray="3 2" />
                <ellipse cx="40" cy="22" rx="17" ry="6" stroke="#f43f5e" strokeWidth="2" fill="none" transform="rotate(28 40 22)" strokeDasharray="3 2" />
                <circle cx="40" cy="22" r="5" fill="url(#atomGlowGrad)" />
                <circle cx="27" cy="16" r="2.2" fill="#00acc1" />
                <circle cx="53" cy="28" r="2.2" fill="#f43f5e" />
                <path d="M21 9L22.5 13L26 14.5L22.5 16L21 20L19.5 16L16 14.5L19.5 13L21 9Z" fill="#ffb703" />
                <path d="M59 7L60 10L63 11L60 12L59 15L58 12L55 11L58 10L59 7Z" fill="#38bdf8" />
            </g>
        </svg>
    );
}

// 3. Graphic for "Kuiz Topik" / Energetic STEM Lightning Brain
function GraphicQuizLightning({ className = "w-16 h-16" }) {
    return (
        <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="boltGrad" x1="20" y1="12" x2="60" y2="68" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffe600" />
                    <stop offset="0.6" stopColor="#ff9100" />
                    <stop offset="1" stopColor="#ff3d00" />
                </linearGradient>
                <linearGradient id="shieldGrad" x1="15" y1="15" x2="65" y2="65" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffa726" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#fb8c00" stopOpacity="0.05" />
                </linearGradient>
            </defs>
            <ellipse cx="40" cy="72" rx="26" ry="4.5" fill="#000000" fillOpacity="0.12" />
            <circle cx="40" cy="38" r="28" fill="url(#shieldGrad)" stroke="#ffa726" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="40" cy="38" r="20" stroke="#ffcc00" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M45 10L24 40H39L33 68L56 34H41L45 10Z" fill="url(#boltGrad)" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M43 14L28 38H39L35 56L50 36H41L43 14Z" fill="#ffffff" fillOpacity="0.5" />
            <circle cx="20" cy="22" r="3" fill="#ffb703" />
            <circle cx="62" cy="26" r="2.5" fill="#ffd166" />
            <path d="M58 52L60 55L63 56L60 57L58 60L56 57L53 56L56 55L58 52Z" fill="#ff9e00" />
        </svg>
    );
}

// 4. Graphic for Big "Mula Kuiz Sekarang" Button (Rocket Launch)
function GraphicRocketLaunch({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="rocketBodyGrad" x1="20" y1="10" x2="45" y2="45" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.7" stopColor="#f1f5f9" />
                    <stop offset="1" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="rocketNoseGrad" x1="30" y1="8" x2="40" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff007f" />
                    <stop offset="1" stopColor="#d81b60" />
                </linearGradient>
                <linearGradient id="exhaustGrad" x1="30" y1="42" x2="30" y2="58" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffff00" />
                    <stop offset="0.5" stopColor="#ff7700" />
                    <stop offset="1" stopColor="#ff0044" />
                </linearGradient>
            </defs>
            <path d="M24 43C24 43 21 53 30 58C39 53 36 43 36 43H24Z" fill="url(#exhaustGrad)" />
            <path d="M27 43C27 43 25 50 30 53C35 50 33 43 33 43H27Z" fill="#ffffff" />
            <path d="M21 34L12 44C12 44 17 46 24 43L22 34H21Z" fill="#ff7700" />
            <path d="M39 34L48 44C48 44 43 46 36 43L38 34H39Z" fill="#ff7700" />
            <path d="M30 8C23 16 20 28 22 43H38C40 28 37 16 30 8Z" fill="url(#rocketBodyGrad)" stroke="#94a3b8" strokeWidth="1" />
            <path d="M30 8C26 14 24 19 24 21H36C36 19 34 14 30 8Z" fill="url(#rocketNoseGrad)" />
            <circle cx="30" cy="27" r="5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="31.5" cy="25.5" r="1.8" fill="#ffffff" />
        </svg>
    );
}

// 5. Graphic for Topic 1: Saturn / Solar System Planet
function GraphicSaturnPlanet({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="saturnGrad" x1="12" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.6" stopColor="#0284c7" />
                    <stop offset="1" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="saturnRing" x1="4" y1="20" x2="46" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fbbf24" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
            </defs>
            <path d="M6 23C8 18 20 16 33 19C41 21 45 24 45 27C44 28 42 28 39 27C34 26 24 23 15 24C10 25 7 25 6 23Z" fill="url(#saturnRing)" opacity="0.6" />
            <circle cx="25" cy="25" r="14" fill="url(#saturnGrad)" />
            <path d="M12 21C16 23 28 24 38 21C38.5 22.3 38.8 23.6 38.9 25C29 27 19 26 11.2 23.5C11.4 22.6 11.7 21.8 12 21Z" fill="#bae6fd" opacity="0.4" />
            <path d="M4 27C5 31 16 34 29 32C38 31 44 28 46 25C47 23 45 22 43 23C38 25 28 28 17 28C10 28 6 27 4 27Z" fill="url(#saturnRing)" />
            <circle cx="10" cy="10" r="1.5" fill="#fef08a" />
            <circle cx="40" cy="12" r="1.8" fill="#ffffff" />
        </svg>
    );
}

// 6. Graphic for Topic 2: Nature Plant Sprout
function GraphicNatureLeaf({ className = "w-10 h-10" }) {
    return (
        <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="leafGrad" x1="12" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34d399" />
                    <stop offset="0.6" stopColor="#10b981" />
                    <stop offset="1" stopColor="#047857" />
                </linearGradient>
            </defs>
            <path d="M14 42C18 36 22 28 25 10C37 14 40 28 35 37C31 43 23 44 14 42Z" fill="url(#leafGrad)" />
            <path d="M16 40C20 34 23 27 25 10" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 27C27 25 31 23 35 21" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <circle cx="31" cy="27" r="2.5" fill="#e0f2fe" opacity="0.9" />
            <circle cx="31.8" cy="26.2" r="0.8" fill="#ffffff" />
            <circle cx="12" cy="14" r="3" fill="#fde047" opacity="0.8" />
            <path d="M12 8V10M12 18V20M6 14H8M16 14H18" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

// 7. Cute STEM Explorer Robot Mascot Graphic
function GraphicMascotRobot({ className = "w-16 h-16", expression = "happy" }) {
    return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="botHead" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00b4d8" />
                    <stop offset="1" stopColor="#0077b6" />
                </linearGradient>
                <linearGradient id="botScreen" x1="25" y1="35" x2="75" y2="65" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0f172a" />
                    <stop offset="1" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="botGold" x1="40" y1="5" x2="60" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="1" stopColor="#f59e0b" />
                </linearGradient>
            </defs>
            <path d="M50 20V10" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="8" r="6" fill="url(#botGold)" />
            <circle cx="50" cy="8" r="9" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
            <rect x="20" y="20" width="60" height="52" rx="18" fill="url(#botHead)" stroke="#ffffff" strokeWidth="2.5" />
            <rect x="26" y="27" width="48" height="36" rx="12" fill="url(#botScreen)" stroke="#38bdf8" strokeWidth="1.5" />
            {expression === "celebrate" ? (
                <>
                    <path d="M35 44C35 40 43 40 43 44" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M57 44C57 40 65 40 65 44" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                </>
            ) : (
                <>
                    <circle cx="39" cy="43" r="5" fill="#38bdf8" />
                    <circle cx="41" cy="41" r="2" fill="#ffffff" />
                    <circle cx="61" cy="43" r="5" fill="#38bdf8" />
                    <circle cx="63" cy="41" r="2" fill="#ffffff" />
                </>
            )}
            <path d="M43 53C47 57 53 57 57 53" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="32" cy="51" r="3" fill="#f43f5e" fillOpacity="0.7" />
            <circle cx="68" cy="51" r="3" fill="#f43f5e" fillOpacity="0.7" />
            <rect x="13" y="34" width="7" height="20" rx="3.5" fill="#ffb703" />
            <rect x="80" y="34" width="7" height="20" rx="3.5" fill="#ffb703" />
            <path d="M36 72L42 84H58L64 72" fill="#0284c7" />
            <circle cx="50" cy="79" r="2.5" fill="#38bdf8" />
        </svg>
    );
}

// 8. Stopwatch Graphic
function GraphicStopwatch({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="22" r="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            <path d="M20 4V8M17 4H23" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M29 9L31 11" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="22" r="2" fill="#ef4444" />
            <path d="M20 22L20 13" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 22L25 25" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="11" r="1" fill="#0284c7" />
            <circle cx="31" cy="22" r="1" fill="#0284c7" />
            <circle cx="20" cy="33" r="1" fill="#0284c7" />
            <circle cx="9" cy="22" r="1" fill="#0284c7" />
        </svg>
    );
}

// 9. Dartboard Target Graphic
function GraphicTarget({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <circle cx="20" cy="20" r="11" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
            <circle cx="20" cy="20" r="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="2.5" fill="#ef4444" />
            <path d="M20 20L31 9" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            <path d="M28 8L33 7L32 12L28 8Z" fill="#3b82f6" />
        </svg>
    );
}

// 10. Grand Gold Trophy
function GraphicGrandTrophy({ className = "w-20 h-20" }) {
    return (
        <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="trophyGold" x1="20" y1="10" x2="60" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.3" stopColor="#facc15" />
                    <stop offset="0.8" stopColor="#eab308" />
                    <stop offset="1" stopColor="#ca8a04" />
                </linearGradient>
            </defs>
            <ellipse cx="40" cy="74" rx="24" ry="4" fill="#000000" fillOpacity="0.15" />
            <path d="M26 62H54V66C54 68 52 70 50 70H30C28 70 26 68 26 66V62Z" fill="#1e293b" />
            <path d="M30 52H50L48 62H32L30 52Z" fill="#334155" />
            <rect x="33" y="64" width="14" height="4" rx="1" fill="#fbbf24" />
            <path d="M22 18H58V36C58 46 50 54 40 54C30 54 22 46 22 36V18Z" fill="url(#trophyGold)" stroke="#b45309" strokeWidth="1.5" />
            <path d="M22 22C14 22 12 32 20 38L22 38" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M58 22C66 22 68 32 60 38L58 38" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M26 22V36C26 43 32 49 40 49" stroke="#fef9c3" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M40 28L42 32.5L47 33L43.2 36.5L44.5 41.5L40 38.8L35.5 41.5L36.8 36.5L33 33L38 32.5L40 28Z" fill="#ffffff" />
            <path d="M16 12L17.5 15L20 16.5L17.5 18L16 21L14.5 18L12 16.5L14.5 15L16 12Z" fill="#fde047" />
            <path d="M64 14L65 17L68 18L65 19L64 22L63 19L60 18L63 17L64 14Z" fill="#fde047" />
        </svg>
    );
}

// 11. Lightbulb Graphic
function GraphicLightbulb({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 28H25M17 32H23" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 7C14.5 7 10 11.5 10 17C10 20.5 12 23.5 15 25V28H25V25C28 23.5 30 20.5 30 17C30 11.5 25.5 7 20 7Z" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
            <path d="M17 17C17 15 18 13 20 13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 3V5M8 9L9.5 10.5M32 9L30.5 10.5M4 17H6M34 17H36" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

// 12. Solar System Infographic
function GraphicSolarSystemBanner() {
    return (
        <div className="w-full bg-slate-900 rounded-3xl p-5 border-2 border-sky-400/40 relative overflow-hidden shadow-inner text-white">
            <div className="text-center mb-3">
                <span className="text-[10px] uppercase font-black tracking-widest text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-500/30">
                    Infografik Visual Astronomi
                </span>
                <h4 className="text-sm sm:text-base font-black text-amber-300 mt-1">
                    Susunan 8 Planet Mengelilingi Matahari
                </h4>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 py-3 text-center">
                <div className="flex flex-col items-center group">
                    <div className="w-8 h-8 rounded-full bg-slate-400 border border-slate-200 flex items-center justify-center text-[10px] font-bold shadow-md group-hover:scale-125 transition-transform">
                        🌑
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 mt-1">Utarid</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-125 transition-transform">
                        🌕
                    </div>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">Zuhrah</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-emerald-400 flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-sky-400/50 group-hover:scale-125 transition-transform">
                        🌍
                    </div>
                    <span className="text-[10px] font-black text-sky-300 mt-1">Bumi</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full bg-red-600 border border-red-300 flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-125 transition-transform">
                        🔴
                    </div>
                    <span className="text-[10px] font-bold text-red-300 mt-1">Marikh</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-12 h-12 rounded-full bg-amber-600 border border-amber-300 flex items-center justify-center text-base font-bold shadow-md group-hover:scale-125 transition-transform">
                        🟤
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 mt-1">Musytari</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-11 h-11 rounded-full bg-yellow-600 border border-yellow-300 flex items-center justify-center text-base font-bold shadow-md group-hover:scale-125 transition-transform">
                        🪐
                    </div>
                    <span className="text-[10px] font-bold text-yellow-300 mt-1">Zuhal</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full bg-cyan-400 border border-cyan-200 flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-125 transition-transform">
                        🔵
                    </div>
                    <span className="text-[10px] font-bold text-cyan-300 mt-1">Uranus</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full bg-blue-700 border border-blue-400 flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-125 transition-transform">
                        🌊
                    </div>
                    <span className="text-[10px] font-bold text-blue-300 mt-1">Neptun</span>
                </div>
            </div>

            <div className="mt-2 text-center text-xs text-sky-200 bg-sky-900/40 p-2 rounded-xl border border-sky-500/20">
                ✨ <strong>Tip Kuiz:</strong> Matahari adalah pusat sistem suria, Marikh ialah Planet Merah, & Zuhal mempunyai cincin tercantik!
            </div>
        </div>
    );
}

// 13. Photosynthesis Infographic
function GraphicPhotosynthesisBanner() {
    return (
        <div className="w-full bg-gradient-to-br from-emerald-950 to-teal-900 rounded-3xl p-5 border-2 border-emerald-400/40 relative overflow-hidden shadow-inner text-white">
            <div className="text-center mb-3">
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-500/30">
                    Infografik Visual Biologi
                </span>
                <h4 className="text-sm sm:text-base font-black text-amber-300 mt-1">
                    Bagaimana Pokok Membuat Makanan Sendiri?
                </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2 text-center">
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">☀️</div>
                    <h5 className="text-xs font-black text-amber-300">Cahaya Matahari</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">Sumber tenaga utama diserap daun</p>
                </div>
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">💧</div>
                    <h5 className="text-xs font-black text-sky-300">Air Dari Tanah</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">Diserap oleh bahagian akar pokok</p>
                </div>
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">🍃</div>
                    <h5 className="text-xs font-black text-emerald-300">Klorofil Hijau</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">Zat pewarna hijau dalam daun</p>
                </div>
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">💨</div>
                    <h5 className="text-xs font-black text-pink-300">Gas Oksigen</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">Dibebaskan untuk kita bernafas!</p>
                </div>
            </div>

            <div className="mt-2 text-center text-xs text-emerald-200 bg-emerald-900/40 p-2 rounded-xl border border-emerald-500/20">
                🌿 <strong>Tip Kuiz:</strong> Proses fotosintesis menukarkan cahaya matahari dan air kepada makanan, sambil membebaskan Oksigen!
            </div>
        </div>
    );
}

// 14. Action & Navigation Icons
function GraphicBackArrow({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function GraphicArrowRight({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4L13 10L7 16" />
        </svg>
    );
}

function GraphicCloseCross({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function GraphicTopicList({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="4" height="4" rx="1" fill="currentColor" />
            <rect x="3" y="11" width="4" height="4" rx="1" fill="currentColor" />
            <path d="M10 6H17M10 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function GraphicBookOpen({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C8 3.5 5 3.5 3 4V16C5 15.5 8 15.5 10 17C12 15.5 15 15.5 17 16V4C15 3.5 12 3.5 10 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 5V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function GraphicLightningBolt({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
    );
}

function GraphicRefresh({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
    );
}

// 15. Gamepad Graphic for Activity
function GraphicGamepadActivity({ className = "w-12 h-12" }) {
    return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="padGrad" x1="12" y1="16" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c084fc" />
                    <stop offset="0.5" stopColor="#9333ea" />
                    <stop offset="1" stopColor="#6b21a8" />
                </linearGradient>
            </defs>
            <path d="M16 22C10 22 6 28 6 36C6 44 11 50 17 50C21 50 24 46 27 41L30 36H34L37 41C40 46 43 50 47 50C53 50 58 44 58 36C58 28 54 22 48 22H16Z" fill="url(#padGrad)" stroke="#e9d5ff" strokeWidth="2" />
            <path d="M19 28V38M14 33H24" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="43" cy="30" r="2.5" fill="#38bdf8" />
            <circle cx="49" cy="33" r="2.5" fill="#ec4899" />
            <circle cx="43" cy="36" r="2.5" fill="#22c55e" />
            <circle cx="37" cy="33" r="2.5" fill="#facc15" />
            <circle cx="32" cy="27" r="1.5" fill="#cbd5e1" />
        </svg>
    );
}

// 16. Dedicated High-Definition SVG Icons for Solar System Planets & Sun
function GraphicPlanetIcon({ planetId, className = "w-12 h-12" }) {
    switch (planetId) {
        case "matahari":
            return (
                <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="sunGrad" cx="30" cy="30" r="22" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fef08a" />
                            <stop offset="0.55" stopColor="#f59e0b" />
                            <stop offset="1" stopColor="#ea580c" />
                        </radialGradient>
                    </defs>
                    <circle cx="30" cy="30" r="28" fill="#fbbf24" fillOpacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="30" cy="30" r="24" fill="#f97316" fillOpacity="0.35" />
                    <circle cx="30" cy="30" r="19" fill="url(#sunGrad)" stroke="#fef08a" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="4.5" fill="#ffffff" fillOpacity="0.4" />
                </svg>
            );
        case "utarid":
            return (
                <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="mercuryGrad" cx="22" cy="20" r="18" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#cbd5e1" />
                            <stop offset="0.7" stopColor="#64748b" />
                            <stop offset="1" stopColor="#334155" />
                        </radialGradient>
                    </defs>
                    <circle cx="25" cy="25" r="17" fill="url(#mercuryGrad)" stroke="#94a3b8" strokeWidth="1.5" />
                    <circle cx="20" cy="19" r="3" fill="#475569" stroke="#334155" strokeWidth="0.8" />
                    <circle cx="30" cy="28" r="2.5" fill="#475569" stroke="#334155" strokeWidth="0.8" />
                    <circle cx="20" cy="31" r="1.8" fill="#475569" />
                    <circle cx="28" cy="17" r="1.5" fill="#475569" />
                    <circle cx="21" cy="20" r="1" fill="#ffffff" fillOpacity="0.4" />
                </svg>
            );
        case "zuhrah":
            return (
                <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="venusGrad" cx="22" cy="20" r="19" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fef08a" />
                            <stop offset="0.6" stopColor="#f59e0b" />
                            <stop offset="1" stopColor="#b45309" />
                        </radialGradient>
                    </defs>
                    <circle cx="25" cy="25" r="18" fill="url(#venusGrad)" stroke="#fde047" strokeWidth="1.5" />
                    <path d="M11 20C18 22 28 17 39 21" stroke="#d97706" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <path d="M9 27C17 29 27 24 41 28" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                    <path d="M14 34C22 36 28 32 36 34" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
                    <circle cx="20" cy="17" r="3" fill="#ffffff" fillOpacity="0.35" />
                </svg>
            );
        case "bumi":
            return (
                <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="earthGrad" cx="20" cy="18" r="20" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#38bdf8" />
                            <stop offset="0.6" stopColor="#0284c7" />
                            <stop offset="1" stopColor="#0369a1" />
                        </radialGradient>
                    </defs>
                    <circle cx="25" cy="25" r="19" fill="url(#earthGrad)" stroke="#7dd3fc" strokeWidth="1.5" />
                    <path d="M17 14C22 13 26 16 25 20C23 23 19 22 17 19C16 17 16 15 17 14Z" fill="#22c55e" />
                    <path d="M28 19C33 20 36 24 34 27C32 30 28 29 27 26C26 23 27 21 28 19Z" fill="#16a34a" />
                    <path d="M14 28C17 27 21 30 22 34C20 37 16 37 14 34C12 32 13 29 14 28Z" fill="#22c55e" />
                    <path d="M25 35C29 34 33 37 32 40C30 42 27 42 25 39Z" fill="#16a34a" />
                    <path d="M12 22C18 20 24 24 30 22C33 21 38 23 39 25" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
                    <path d="M15 32C20 30 25 33 32 30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
                </svg>
            );
        case "marikh":
            return (
                <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="marsGrad" cx="20" cy="18" r="18" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#f87171" />
                            <stop offset="0.6" stopColor="#dc2626" />
                            <stop offset="1" stopColor="#991b1b" />
                        </radialGradient>
                    </defs>
                    <circle cx="25" cy="25" r="18" fill="url(#marsGrad)" stroke="#fca5a5" strokeWidth="1.5" />
                    <ellipse cx="25" cy="9" rx="6" ry="2.5" fill="#f8fafc" opacity="0.85" />
                    <ellipse cx="25" cy="41" rx="5" ry="2" fill="#f8fafc" opacity="0.7" />
                    <circle cx="18" cy="24" r="3" fill="#7f1d1d" opacity="0.7" />
                    <circle cx="31" cy="22" r="3.5" fill="#7f1d1d" opacity="0.7" />
                    <circle cx="24" cy="33" r="2.5" fill="#7f1d1d" opacity="0.6" />
                    <path d="M13 18C18 21 24 20 28 23" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case "musytari":
            return (
                <svg className={className} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="jupGrad" cx="24" cy="22" r="24" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fed7aa" />
                            <stop offset="0.5" stopColor="#f97316" />
                            <stop offset="1" stopColor="#9a3412" />
                        </radialGradient>
                    </defs>
                    <circle cx="27" cy="27" r="23" fill="url(#jupGrad)" stroke="#fdba74" strokeWidth="1.5" />
                    <path d="M6 21C14 19 28 22 48 20" stroke="#7c2d12" strokeWidth="2.8" strokeLinecap="round" opacity="0.7" />
                    <path d="M5 26C15 24 32 27 49 25" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                    <path d="M6 31C16 33 34 29 48 32" stroke="#9a3412" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
                    <ellipse cx="36" cy="33" rx="4.5" ry="3" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" />
                    <ellipse cx="36" cy="33" rx="2" ry="1.2" fill="#fca5a5" />
                </svg>
            );
        case "zuhal":
            return (
                <svg className={className} viewBox="0 0 64 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="saturnBody" cx="30" cy="24" r="18" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fef08a" />
                            <stop offset="0.6" stopColor="#eab308" />
                            <stop offset="1" stopColor="#a16207" />
                        </radialGradient>
                    </defs>
                    <ellipse cx="32" cy="27" rx="28" ry="8" fill="none" stroke="#ca8a04" strokeWidth="4.5" transform="rotate(-18 32 27)" opacity="0.85" />
                    <ellipse cx="32" cy="27" rx="24" ry="5.5" fill="none" stroke="#fef08a" strokeWidth="2.5" transform="rotate(-18 32 27)" opacity="0.95" />
                    <circle cx="32" cy="27" r="17" fill="url(#saturnBody)" stroke="#fef08a" strokeWidth="1.2" />
                    <path d="M19 25C24 24 32 26 42 25" stroke="#854d0e" strokeWidth="1.8" opacity="0.6" />
                    <path d="M7 34C15 31 28 32 40 37" stroke="#ca8a04" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
                    <path d="M11 34C17 32 26 33 36 36.5" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
                </svg>
            );
        case "uranus":
            return (
                <svg className={className} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="uranusGrad" cx="24" cy="22" r="20" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#a5f3fc" />
                            <stop offset="0.6" stopColor="#06b6d4" />
                            <stop offset="1" stopColor="#0e7490" />
                        </radialGradient>
                    </defs>
                    <ellipse cx="27" cy="27" rx="6" ry="24" fill="none" stroke="#cffafe" strokeWidth="2.5" opacity="0.75" />
                    <circle cx="27" cy="27" r="18" fill="url(#uranusGrad)" stroke="#cffafe" strokeWidth="1.5" />
                    <path d="M11 25C17 26 30 25 43 27" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="22" cy="19" r="3" fill="#ffffff" fillOpacity="0.4" />
                </svg>
            );
        case "neptun":
            return (
                <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="neptuneGrad" cx="20" cy="18" r="19" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#60a5fa" />
                            <stop offset="0.5" stopColor="#2563eb" />
                            <stop offset="1" stopColor="#1e3a8a" />
                        </radialGradient>
                    </defs>
                    <circle cx="25" cy="25" r="18" fill="url(#neptuneGrad)" stroke="#93c5fd" strokeWidth="1.5" />
                    <path d="M10 23C16 21 28 25 40 22" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
                    <path d="M8 30C15 28 25 32 38 29" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <circle cx="32" cy="26" r="2.5" fill="#1e3a8a" />
                    <circle cx="18" cy="18" r="3" fill="#ffffff" fillOpacity="0.35" />
                </svg>
            );
        default:
            return <div className="w-10 h-10 rounded-full bg-slate-400" />;
    }
}

// Data 8 Planet Sistem Suria Mengikut Urutan Dari Matahari (Termasuk jejari orbit & sudut angkasa)
const SOLAR_PLANETS = [
    {
        id: "utarid",
        name: "Utarid",
        englishName: "Mercury",
        orbit: 1,
        radiusPercent: 14,
        angleDeg: -40,
        color: "#94a3b8",
        sizeLabel: "Paling Kecil",
        diameter: "4,879 km",
        fact: "Planet paling dekat dengan Matahari dan berputar sangat pantas mengelilingi orbitnya.",
        hint: "Orbit 1: Paling hampir dengan Matahari!",
    },
    {
        id: "zuhrah",
        name: "Zuhrah",
        englishName: "Venus",
        orbit: 2,
        radiusPercent: 19,
        angleDeg: 140,
        color: "#f59e0b",
        sizeLabel: "Paling Panas",
        diameter: "12,104 km",
        fact: "Planet paling panas dalam Sistem Suria kerana diselubungi awan tebal asid dan gas karbon dioksida.",
        hint: "Orbit 2: Planet kedua, paling terang dan terpanas!",
    },
    {
        id: "bumi",
        name: "Bumi",
        englishName: "Earth",
        orbit: 3,
        radiusPercent: 24,
        angleDeg: 45,
        color: "#0284c7",
        sizeLabel: "Rumah Kita",
        diameter: "12,742 km",
        fact: "Satu-satunya planet yang diketahui mempunyai air cecair, atmosfera oksigen dan hidupan kita!",
        hint: "Orbit 3: Planet ketiga, tempat tinggal kita yang kaya dengan lautan!",
    },
    {
        id: "marikh",
        name: "Marikh",
        englishName: "Mars",
        orbit: 4,
        radiusPercent: 29,
        angleDeg: -135,
        color: "#ef4444",
        sizeLabel: "Planet Merah",
        diameter: "6,779 km",
        fact: "Dikenali sebagai Planet Merah kerana permukaan tanahnya kaya dengan besi oksida (karat).",
        hint: "Orbit 4: Planet keempat berpasir merah!",
    },
    {
        id: "musytari",
        name: "Musytari",
        englishName: "Jupiter",
        orbit: 5,
        radiusPercent: 34,
        angleDeg: -10,
        color: "#d97706",
        sizeLabel: "Paling Gergasi",
        diameter: "139,820 km",
        fact: "Planet terbesar dalam Sistem Suria, mempunyai ribut 'Bintik Merah Gergasi' yang lebih besar dari Bumi!",
        hint: "Orbit 5: Planet gergasi gas pertama selepas zon asteroid!",
    },
    {
        id: "zuhal",
        name: "Zuhal",
        englishName: "Saturn",
        orbit: 6,
        radiusPercent: 39,
        angleDeg: 110,
        color: "#eab308",
        sizeLabel: "Gelang Ais",
        diameter: "116,460 km",
        fact: "Mempunyai sistem gelang ais dan batu yang paling megah, cantik dan mempesonakan.",
        hint: "Orbit 6: Planet keenam yang mempunyai gelang paling indah!",
    },
    {
        id: "uranus",
        name: "Uranus",
        englishName: "Uranus",
        orbit: 7,
        radiusPercent: 43.5,
        angleDeg: -75,
        color: "#06b6d4",
        sizeLabel: "Gergasi Ais",
        diameter: "50,724 km",
        fact: "Gergasi ais sejuk membeku berwarna biru muda yang berputar secara condong pada sisinya.",
        hint: "Orbit 7: Planet ketujuh, sangat sejuk dan berputar senget!",
    },
    {
        id: "neptun",
        name: "Neptun",
        englishName: "Neptune",
        orbit: 8,
        radiusPercent: 48,
        angleDeg: 180,
        color: "#2563eb",
        sizeLabel: "Paling Jauh",
        diameter: "49,244 km",
        fact: "Planet paling jauh dari Matahari, berwarna biru pekat dengan tiupan angin ribut paling laju!",
        hint: "Orbit 8: Planet kelapan, paling jauh dan sejuk membiru!",
    },
];

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export default function LessonPage() {
    const [currentView, setCurrentView] = useState("menu");
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

    // Quiz states
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [scoreCount, setScoreCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [showScorePopup, setShowScorePopup] = useState(false);
    const [bgTheme, setBgTheme] = useState("sky"); // "sky" | "sunset" | "mint"
    const timerRef = useRef(null);

    // Permainan Drag & Drop Sistem Suria States
    const [placedPlanets, setPlacedPlanets] = useState({}); // { [orbitNumber]: planetId }
    const [selectedTrayPlanet, setSelectedTrayPlanet] = useState(null); // for click-to-place & mobile
    const [solarScore, setSolarScore] = useState(0); // 100 mata per planet betul (Max 800)
    const [solarWrongSlot, setSolarWrongSlot] = useState(null); // for shake animation
    const [solarFeedbackMessage, setSolarFeedbackMessage] = useState(null);
    const [showSolarVictory, setShowSolarVictory] = useState(false);
    const [solarSubmitted, setSolarSubmitted] = useState(false); // Halaman keputusan setelah dihantar

    // Dynamic background style based on theme (Cerah, Berwarna & Menarik - Bukan Putih & Bukan Gelap)
    const getBackgroundStyle = () => {
        if (bgTheme === "sunset") {
            // Mentari Ceria: Kuning Suria & Jingga Karang yang Hangat dan Ceria
            return "linear-gradient(135deg, #fde047 0%, #fb923c 40%, #f472b6 75%, #c084fc 100%)";
        }
        if (bgTheme === "mint") {
            // Mint Segar: Hijau Mint Berseri & Biru Pirus (Turquoise)
            return "linear-gradient(135deg, #6ee7b7 0%, #2dd4bf 35%, #38bdf8 70%, #818cf8 100%)";
        }
        // Default: Langit Sains Ceria: Biru Langit Ceria, Sian & Lilac (Terang, Berwarna, Bukan Gelap & Bukan Putih)
        return "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 35%, #818cf8 70%, #f472b6 100%)";
    };

    const courseData = {
        courseTitle: "Nota Pembelajaran & Kuiz STEM",
        topics: [
            {
                id: "topic-1",
                title: "Topik 1: Planet & Sistem Suria",
                shortTitle: "Planet & Sistem Suria",
                graphic: <GraphicSaturnPlanet className="w-10 h-10 shrink-0" />,
                infographic: <GraphicSolarSystemBanner />,
                category: "Astronomi & Angkasa",
                themeColor: "#0099e5",
                accentBadge: "bg-sky-100 text-sky-800 border-sky-200",
                videoEmbedUrl: "https://www.youtube.com/embed/m8NVEFNX9p0",
                videoRawUrl: "https://youtu.be/m8NVEFNX9p0",
                content: "Sistem Suria kita mempunyai 8 planet yang mengelilingi Matahari. Planet Marikh dikenali sebagai planet merah, manakala Bumi adalah satu-satunya rumah kita yang mempunyai air dan hidupan!",
                questions: [
                    {
                        question: "Apakah planet tempat tinggal kita di dalam sistem suria?",
                        options: ["Planet Marikh", "Planet Bumi", "Planet Zuhal"],
                        correctAnswer: "Planet Bumi"
                    },
                    {
                        question: "Apakah pusat bagi sistem suria kita?",
                        options: ["Bulan", "Matahari", "Bintang Utara"],
                        correctAnswer: "Matahari"
                    },
                    {
                        question: "Planet manakah yang terkenal dengan gelaran 'Planet Merah'?",
                        options: ["Marikh", "Utarid", "Zuhrah"],
                        correctAnswer: "Marikh"
                    },
                    {
                        question: "Berapakah jumlah planet utama di dalam sistem suria kita?",
                        options: ["5 planet", "8 planet", "10 planet"],
                        correctAnswer: "8 planet"
                    },
                    {
                        question: "Planet manakah yang mempunyai cincin yang paling cantik dan besar?",
                        options: ["Zuhal", "Neptun", "Bumi"],
                        correctAnswer: "Zuhal"
                    }
                ]
            },
            {
                id: "topic-2",
                title: "Topik 2: Keajaiban Tumbuhan & Alam",
                shortTitle: "Keajaiban Tumbuhan & Alam",
                graphic: <GraphicNatureLeaf className="w-10 h-10 shrink-0" />,
                infographic: <GraphicPhotosynthesisBanner />,
                category: "Biologi & Ekologi",
                themeColor: "#10b981",
                accentBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
                videoEmbedUrl: "https://www.youtube.com/embed/sample-plants",
                videoRawUrl: "https://youtube.com",
                content: "Tumbuhan adalah hidupan yang sangat penting. Melalui proses fotosintesis, pokok menggunakan cahaya matahari untuk membuat makanan sendiri dan menghasilkan udara bersih untuk kita bernafas!",
                questions: [
                    {
                        question: "Apakah proses pokok membuat makanannya sendiri?",
                        options: ["Fotosintesis", "Respirasi", "Evaporasi"],
                        correctAnswer: "Fotosintesis"
                    },
                    {
                        question: "Apakah sumber tenaga utama untuk tumbuhan menghasilkan makanan?",
                        options: ["Cahaya Matahari", "Lampu Bilik", "Air Batu"],
                        correctAnswer: "Cahaya Matahari"
                    },
                    {
                        question: "Bahagian pokok manakah yang menyerap air dari dalam tanah?",
                        options: ["Daun", "Akar", "Bunga"],
                        correctAnswer: "Akar"
                    },
                    {
                        question: "Apakah warna lazim bagi daun pokok yang sihat?",
                        options: ["Hijau", "Merah", "Ungu"],
                        correctAnswer: "Hijau"
                    },
                    {
                        question: "Apakah gas yang dibebaskan oleh tumbuhan untuk kita bernafas?",
                        options: ["Oksigen", "Karbon Dioksida", "Helium"],
                        correctAnswer: "Oksigen"
                    }
                ]
            }
        ]
    };

    const currentTopic = courseData.topics[selectedTopicIndex];

    const playAudioFeedback = (type) => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            if (type === "pick") {
                // Bunyi 'Pop / Gelembung Kosmik' comel bila klik atau seret planet
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(320, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.24, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === "snap") {
                // Bunyi 'Kunci Kosmik' dwitone berkilau bila masukkan planet ke orbit
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = "sine";
                osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc1.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.09); // E5
                gain1.gain.setValueAtTime(0.22, ctx.currentTime);
                gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.start();
                osc1.stop(ctx.currentTime + 0.18);

                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = "triangle";
                osc2.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6 sparkle
                gain2.gain.setValueAtTime(0.12, ctx.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start();
                osc2.stop(ctx.currentTime + 0.12);
            } else if (type === "remove") {
                // Bunyi 'Swoosh Pop' lembut bila keluarkan planet dari orbit ke rak
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(640, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === "launch") {
                // Bunyi 'Pelancaran Roket & Arpeggio Angkasa' bila tekan submit semakan
                const freqs = [392.00, 523.25, 659.25, 783.99, 1046.50];
                freqs.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.07);
                    osc.stop(ctx.currentTime + idx * 0.07 + 0.25);
                });
            } else if (type === "sparkle") {
                // Bunyi 'Kilauan Bintang' ceria 3 nada pantas
                const sparkles = [880, 1174.66, 1760];
                sparkles.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.06);
                    osc.stop(ctx.currentTime + idx * 0.06 + 0.2);
                });
            } else if (type === "tap") {
                // Bunyi 'Klik UI' moden dan lembut
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(900, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.04);
                gain.gain.setValueAtTime(0.09, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.04);
            } else if (type === "correct") {
                // Bunyi 'Ding-Ding' ceria dwitone kemenangan
                const notes = [659.25, 987.77, 1318.51];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
                    gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.1);
                    osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
                });
            } else if (type === "wrong") {
                // Bunyi 'Boing' kartun lembut yang mesra
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(260, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.25);
                gain.gain.setValueAtTime(0.16, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.28);
            } else if (type === "timeout") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(320, ctx.currentTime);
                osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else if (type === "start") {
                const freqs = [440, 554.37, 659.25, 880];
                freqs.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.22);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.08);
                    osc.stop(ctx.currentTime + idx * 0.08 + 0.22);
                });
            } else if (type === "victory") {
                const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.11);
                    gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.11);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.11 + 0.4);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.11);
                    osc.stop(ctx.currentTime + idx * 0.11 + 0.4);
                });
            }
        } catch (e) {
            // Audio error silent fallback
        }
    };

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < currentTopic.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(20);
            setIsTimeOut(false);
            setShowScorePopup(false);
        } else {
            setCurrentQuestionIndex("finished");
            clearInterval(timerRef.current);
        }
    };

    // 20-second timer logic
    useEffect(() => {
        if (currentView !== "quiz" || currentQuestionIndex === "finished") {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        if (selectedAnswers[currentQuestionIndex] !== undefined) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [currentView, currentQuestionIndex, selectedAnswers]);

    const handleTimeOut = () => {
        if (selectedAnswers[currentQuestionIndex] !== undefined) return;

        playAudioFeedback("timeout");
        setIsTimeOut(true);

        const updatedAnswers = {
            ...selectedAnswers,
            [currentQuestionIndex]: "__TIMEOUT__"
        };
        setSelectedAnswers(updatedAnswers);

        setTimeout(() => {
            moveToNextQuestion();
        }, 2200);
    };

    const handleAnswerSelect = (option) => {
        if (selectedAnswers[currentQuestionIndex] !== undefined) return;

        if (timerRef.current) clearInterval(timerRef.current);

        const isCorrect = option === currentTopic.questions[currentQuestionIndex].correctAnswer;
        if (isCorrect) {
            setScoreCount((prev) => prev + 1);
            setShowScorePopup(true);
            playAudioFeedback("correct");
        } else {
            playAudioFeedback("wrong");
        }

        const updatedAnswers = {
            ...selectedAnswers,
            [currentQuestionIndex]: option
        };
        setSelectedAnswers(updatedAnswers);

        setTimeout(() => {
            moveToNextQuestion();
        }, 1400);
    };

    const resetQuizState = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setScoreCount(0);
        setTimeLeft(20);
        setIsTimeOut(false);
        setShowScorePopup(false);
    };

    const startQuizWithRules = (topicIndex) => {
        setSelectedTopicIndex(topicIndex);
        resetQuizState();
        setCurrentView("quizRules");
    };

    const startQuizConfirmed = () => {
        playAudioFeedback("start");
        resetQuizState();
        setCurrentView("quiz");
    };

    const resetSolarGame = () => {
        playAudioFeedback("sparkle");
        setPlacedPlanets({});
        setSelectedTrayPlanet(null);
        setSolarScore(0);
        setSolarWrongSlot(null);
        setSolarFeedbackMessage(null);
        setShowSolarVictory(false);
        setSolarSubmitted(false);
    };

    const handleDragStart = (e, planetId) => {
        playAudioFeedback("pick");
        e.dataTransfer.setData("text/plain", planetId);
        setSelectedTrayPlanet(planetId);
    };

    const handleDropOnOrbit = (e, targetOrbit) => {
        e.preventDefault();
        const planetId = e.dataTransfer.getData("text/plain") || selectedTrayPlanet;
        if (!planetId) return;
        attemptPlacePlanet(planetId, targetOrbit);
    };

    const handleSelectTrayPlanet = (planetId) => {
        playAudioFeedback("pick");
        if (selectedTrayPlanet === planetId) {
            setSelectedTrayPlanet(null);
            setSolarFeedbackMessage(null);
        } else {
            setSelectedTrayPlanet(planetId);
            setSolarFeedbackMessage({
                type: "info",
                text: "🪐 Satu planet telah dipilih! Sekarang klik bulatan orbit sasaran anda di atas untuk meletakkannya."
            });
        }
    };

    const handleClickOrbitSlot = (targetOrbit) => {
        if (selectedTrayPlanet) {
            attemptPlacePlanet(selectedTrayPlanet, targetOrbit);
            return;
        }

        const targetSlotPlanet = SOLAR_PLANETS.find(p => p.orbit === targetOrbit);
        if (placedPlanets[targetOrbit]) {
            setSolarFeedbackMessage({
                type: "info",
                text: `Orbit '${targetSlotPlanet?.name}' telah diisi. Anda boleh tekan ikon '✕' pada planet untuk mengeluarkannya semula.`
            });
            return;
        }

        setSolarFeedbackMessage({
            type: "info",
            text: `Orbit ini untuk planet '${targetSlotPlanet?.name}'. Pilih satu planet dari rak di bawah dan klik sini untuk meletakkannya!`
        });
    };

    const attemptPlacePlanet = (planetId, targetOrbit) => {
        const planet = SOLAR_PLANETS.find(p => p.id === planetId);
        const targetSlotPlanet = SOLAR_PLANETS.find(p => p.orbit === targetOrbit);
        if (!planet || !targetSlotPlanet) return;

        // Clone current placements and remove planetId if it was already in another slot
        const updated = { ...placedPlanets };
        Object.keys(updated).forEach(slotKey => {
            if (updated[slotKey] === planetId) {
                delete updated[slotKey];
            }
        });

        // Place into targetOrbit neutrally without revealing score or right/wrong
        updated[targetOrbit] = planetId;
        setPlacedPlanets(updated);
        setSelectedTrayPlanet(null);

        playAudioFeedback("snap");

        const placedCount = Object.keys(updated).length;
        if (placedCount === 8) {
            setSolarFeedbackMessage({
                type: "success",
                text: `🎉 Kesemua 8 orbit telah diisi! Tekan butang 'Hantar & Semak Keputusan' di bawah untuk semakan markah dan jawapan sebenar.`
            });
        } else {
            setSolarFeedbackMessage({
                type: "info",
                text: `🪐 Planet berjaya diletakkan pada orbit '${targetSlotPlanet.name}'. (${placedCount}/8 planet diletakkan)`
            });
        }
    };

    const removePlanetFromSlot = (targetOrbit) => {
        if (!placedPlanets[targetOrbit]) return;
        const updated = { ...placedPlanets };
        delete updated[targetOrbit];
        setPlacedPlanets(updated);

        playAudioFeedback("remove");
        setSolarFeedbackMessage({
            type: "info",
            text: "Planet telah dikeluarkan dan dikembalikan ke rak pilihan."
        });
    };

    const handleSubmitSolarGame = () => {
        playAudioFeedback("launch");
        let calculatedScore = 0;
        let correctCount = 0;
        SOLAR_PLANETS.forEach((planetInfo) => {
            const placedId = placedPlanets[planetInfo.orbit];
            if (placedId === planetInfo.id) {
                calculatedScore += 100;
                correctCount += 1;
            }
        });

        setSolarScore(calculatedScore);
        setSolarSubmitted(true);
        setSelectedTrayPlanet(null);
        setSolarFeedbackMessage(null);

        setTimeout(() => {
            if (correctCount === 8) {
                playAudioFeedback("victory");
            } else if (correctCount >= 5) {
                playAudioFeedback("correct");
            } else {
                playAudioFeedback("timeout");
            }
        }, 400);
    };

    const scorePercentage = Math.round((scoreCount / currentTopic.questions.length) * 100);

    return (
        <div 
            className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 text-slate-800 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 select-none" 
            style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                background: getBackgroundStyle()
            }}
        >

            {/* AMBIENT GLOW BLOOMS (PANTULAN CAHAYA CERAH & CERIA) */}
            <div className="absolute top-6 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-white/40 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
            <div className="absolute top-1/2 right-8 w-80 sm:w-96 h-80 sm:h-96 bg-amber-200/35 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
            <div className="absolute bottom-6 left-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-pink-200/35 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

            {/* Custom Embedded CSS Animation Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseUrgent {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                    50% { transform: scale(1.05); box-shadow: 0 0 16px 4px rgba(239, 68, 68, 0.45); }
                }
                @keyframes shimmerEffect {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                @keyframes floatGentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(3deg); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-6px); }
                    40%, 80% { transform: translateX(6px); }
                }
                @keyframes popCheck {
                    0% { transform: scale(0.5); opacity: 0; }
                    70% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes scoreFloatUp {
                    0% { opacity: 0; transform: translateY(10px) scale(0.8); }
                    20% { opacity: 1; transform: translateY(0) scale(1.1); }
                    80% { opacity: 1; transform: translateY(-8px) scale(1); }
                    100% { opacity: 0; transform: translateY(-20px) scale(0.9); }
                }
                @keyframes confettiShower {
                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
                }

                .anim-fade-in { animation: fadeInUp 0.35s ease-out forwards; }
                .anim-pulse-urgent { animation: pulseUrgent 1s infinite ease-in-out; }
                .anim-shake { animation: shake 0.4s ease-in-out; }
                .anim-pop { animation: popCheck 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .anim-float { animation: floatGentle 3s ease-in-out infinite; }
                .anim-float-slow { animation: floatSlow 5s ease-in-out infinite; }
                .anim-score-popup { animation: scoreFloatUp 1.2s ease-out forwards; }

                /* 3D TACTILE BUTTONS */
                .btn-3d-pink {
                    background: linear-gradient(180deg, #ff2a7a 0%, #e91e63 100%);
                    box-shadow: 0 6px 0 #ad1457, 0 12px 20px -3px rgba(233, 30, 99, 0.45);
                    transition: all 0.15s ease;
                }
                .btn-3d-pink:hover {
                    transform: translateY(2px);
                    box-shadow: 0 4px 0 #ad1457, 0 8px 15px -3px rgba(233, 30, 99, 0.4);
                }
                .btn-3d-pink:active {
                    transform: translateY(6px);
                    box-shadow: 0 0 0 #ad1457, 0 2px 4px rgba(233, 30, 99, 0.3);
                }

                .btn-3d-blue {
                    background: linear-gradient(180deg, #00b4d8 0%, #0099e5 100%);
                    box-shadow: 0 5px 0 #0077b6, 0 10px 15px -3px rgba(0, 153, 229, 0.35);
                    transition: all 0.15s ease;
                }
                .btn-3d-blue:hover {
                    transform: translateY(2px);
                    box-shadow: 0 3px 0 #0077b6, 0 6px 10px -3px rgba(0, 153, 229, 0.3);
                }
                .btn-3d-blue:active {
                    transform: translateY(5px);
                    box-shadow: 0 0 0 #0077b6;
                }

                .btn-3d-orange {
                    background: linear-gradient(180deg, #ffa726 0%, #fb8c00 100%);
                    box-shadow: 0 5px 0 #e65100, 0 10px 15px -3px rgba(251, 140, 0, 0.35);
                    transition: all 0.15s ease;
                }
                .btn-3d-orange:hover {
                    transform: translateY(2px);
                    box-shadow: 0 3px 0 #e65100, 0 6px 10px -3px rgba(251, 140, 0, 0.3);
                }
                .btn-3d-orange:active {
                    transform: translateY(5px);
                    box-shadow: 0 0 0 #e65100;
                }

                .btn-3d-white {
                    background: #ffffff;
                    box-shadow: 0 4px 0 #cbd5e1;
                    transition: all 0.15s ease;
                }
                .btn-3d-white:hover {
                    transform: translateY(2px);
                    box-shadow: 0 2px 0 #cbd5e1;
                }
                .btn-3d-white:active {
                    transform: translateY(4px);
                    box-shadow: 0 0 0 #cbd5e1;
                }

                .shimmer-bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
                    transform: skewX(-25deg);
                    animation: shimmerEffect 2.8s infinite;
                }
            `}</style>

            {/* FLOATING AMBIENT BACKGROUND PARTICLES (GRAFIK BERSINAR & JELAS PADA LATAR CERAH) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                <div className="absolute top-12 left-10 anim-float-slow opacity-75 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(0,100,200,0.25)]">
                    <GraphicSaturnPlanet className="w-14 h-14" />
                </div>
                <div className="absolute top-24 right-12 anim-float opacity-75 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(0,150,100,0.25)]">
                    <GraphicNatureLeaf className="w-12 h-12" />
                </div>
                <div className="absolute bottom-20 left-12 anim-float opacity-70 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(0,120,200,0.25)]">
                    <GraphicScienceBook className="w-14 h-14" />
                </div>
                <div className="absolute bottom-16 right-10 anim-float-slow opacity-75 hover:opacity-100 drop-shadow-[0_6px_14px_rgba(200,100,0,0.25)]">
                    <GraphicRocketLaunch className="w-12 h-12" />
                </div>
            </div>

            {/* TEMA WARNA LATAR BELAKANG INTERAKTIF (PILIHAN CERIA & TERANG) */}
            <div className="mb-4 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border-2 border-white/80 shadow-[0_8px_20px_rgba(0,100,200,0.15)] select-none">
                <span className="text-[10px] font-black uppercase text-slate-700 pr-1 tracking-wider hidden sm:inline">
                    Pilih Suasana Ceria:
                </span>
                <button
                    type="button"
                    onClick={() => { playAudioFeedback("sparkle"); setBgTheme("sky"); }}
                    className={`px-3 py-1 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                        bgTheme === "sky" 
                            ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md scale-105 border border-white/40" 
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                >
                    <span>☀️</span>
                    <span>Langit Sains</span>
                </button>
                <button
                    type="button"
                    onClick={() => { playAudioFeedback("sparkle"); setBgTheme("sunset"); }}
                    className={`px-3 py-1 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                        bgTheme === "sunset" 
                            ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md scale-105 border border-white/40" 
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                >
                    <span>🌅</span>
                    <span>Mentari Ceria</span>
                </button>
                <button
                    type="button"
                    onClick={() => { playAudioFeedback("sparkle"); setBgTheme("mint"); }}
                    className={`px-3 py-1 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                        bgTheme === "mint" 
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-105 border border-white/40" 
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                >
                    <span>🌿</span>
                    <span>Mint Segar</span>
                </button>
            </div>

            {/* LOGO DI LUAR PAD (ATAS & CENTER) - GLOWING STATIK & SAIZ PROMINENT */}
            <div className="mb-6 text-center relative flex items-center justify-center">
                {/* Ambient Aura Cahaya Lembut di Belakang Logo */}
                <div
                    className="absolute w-80 sm:w-96 h-24 sm:h-28 bg-gradient-to-r from-sky-300/50 via-yellow-200/50 to-pink-300/50 rounded-full blur-2xl pointer-events-none"
                    aria-hidden="true"
                />

                <img
                    src="/logoexploria.png"
                    alt="Logo Exploria"
                    className="relative z-10 h-28 sm:h-32 mx-auto object-contain select-none transition-all duration-300"
                    style={{
                        filter: 'drop-shadow(0 4px 14px rgba(0, 153, 229, 0.45)) drop-shadow(0 0 24px rgba(255, 204, 0, 0.55)) drop-shadow(0 10px 25px rgba(0, 80, 160, 0.2))'
                    }}
                />
            </div>

            {/* KOTAK UTAMA (PAD) DENGAN TEMA WARNA LOGO EXPLORIA & BAYANG CERAH */}
            <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,120,215,0.25)] overflow-hidden border-4 border-[#0099e5]/30 text-center transition-all duration-300 relative z-10">

                {/* Header dengan warna Biru Khas Logo Exploria */}
                <div className="bg-gradient-to-r from-[#0088cc] via-[#0099e5] to-[#00b0ff] p-6 sm:p-8 text-white relative shadow-md flex flex-col items-center justify-center">

                    {/* BUTTON MENU UTAMA: HANYA GRAFIK HOME SAHAJA (ICON BUTTON) */}
                    {currentView !== "menu" && (
                        <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                            <button
                                onClick={() => { setCurrentView("menu"); resetQuizState(); resetSolarGame(); }}
                                title="Menu Utama"
                                aria-label="Menu Utama"
                                className="w-11 h-11 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/35 active:scale-90 text-white rounded-2xl transition-all flex items-center justify-center cursor-pointer backdrop-blur-md shadow-md border-2 border-white/35 hover:border-white/60 group"
                            >
                                <div className="group-hover:scale-115 transition-transform duration-200">
                                    <GraphicHomeButton className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                            </button>
                        </div>
                    )}

                    <span className="bg-[#ffcc00] text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm inline-flex items-center gap-1.5 mb-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                        Portal STEM Eksklusif
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
                        {courseData.courseTitle}
                    </h1>
                </div>

                <div className="p-6 sm:p-10 bg-white flex flex-col items-center justify-center">

                    {/* =========================================
                        PAPARAN 1: MAIN MENU DENGAN MASKOT EXPLORIA
                    ========================================== */}
                    {currentView === "menu" && (
                        <div className="space-y-6 w-full max-w-2xl anim-fade-in">

                            {/* Maskot Robot STEM Explorer & Speech Balloon */}
                            <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-3xl border-2 border-sky-200 shadow-sm">
                                <div className="anim-float shrink-0">
                                    <GraphicMascotRobot className="w-16 h-16 sm:w-20 sm:h-20" />
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] font-black uppercase text-[#0099e5] bg-sky-100 px-2 py-0.5 rounded-full">
                                        ExploBot STEM
                                    </span>
                                    <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1 leading-snug">
                                        &ldquo;Hai Penjelajah Cilik! Terokai nota sains, cabaran kuiz pantas, atau main aktiviti Drag & Drop Sistem Suria!&rdquo;
                                    </p>
                                </div>
                            </div>

                            <div className="text-center space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black text-[#0099e5]">
                                    Pilih Mod Pengembaraan Anda!
                                </h2>
                                <p className="text-slate-600 text-xs sm:text-sm">
                                    Pilih nota visual, uji minda pantas 20s, atau sertai permainan interaktif seronok.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                                {/* Button Mod 1: Pembelajaran */}
                                <div
                                    onClick={() => { playAudioFeedback("tap"); setCurrentView("learningList"); }}
                                    className="bg-gradient-to-b from-[#00acc1]/10 to-[#00acc1]/20 border-3 border-[#00acc1] hover:border-[#00838f] p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-98 group flex flex-col items-center justify-between text-center relative overflow-hidden"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-[#00acc1]/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                                        <GraphicScienceBook className="w-12 h-12" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-wider text-[#00838f] bg-white/90 px-2.5 py-0.5 rounded-full mb-1 border border-[#00acc1]/30">
                                        Mod Santai
                                    </span>
                                    <h3 className="text-lg font-black text-[#00838f]">Pembelajaran</h3>
                                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                        Tonton video & baca nota sains visual.
                                    </p>
                                    <div className="mt-4 px-3.5 py-1.5 bg-[#00acc1] text-white text-[11px] font-black rounded-xl shadow-md group-hover:bg-[#00838f] transition-all flex items-center gap-1.5">
                                        <GraphicBookOpen className="w-3.5 h-3.5" />
                                        <span>Mula Belajar</span>
                                        <GraphicArrowRight className="w-3 h-3" />
                                    </div>
                                </div>

                                {/* Button Mod 2: Kuiz Topik */}
                                <div
                                    onClick={() => { playAudioFeedback("tap"); setCurrentView("quizList"); }}
                                    className="bg-gradient-to-b from-[#ffa726]/15 to-[#ffa726]/25 border-3 border-[#ffa726] hover:border-[#fb8c00] p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-98 group flex flex-col items-center justify-between text-center relative overflow-hidden"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-[#ffa726]/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                                        <GraphicQuizLightning className="w-12 h-12" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-wider text-[#e65100] bg-white/90 px-2.5 py-0.5 rounded-full mb-1 border border-[#ffa726]/30">
                                        20s Per Soalan
                                    </span>
                                    <h3 className="text-lg font-black text-[#e65100]">Kuiz Topik</h3>
                                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                        Cabaran 5 soalan pantas menguji kefahaman!
                                    </p>
                                    <div className="mt-4 px-3.5 py-1.5 bg-gradient-to-r from-[#ffa726] to-[#fb8c00] text-slate-950 text-[11px] font-black rounded-xl shadow-md group-hover:from-[#fb8c00] group-hover:to-[#f57c00] transition-all flex items-center gap-1.5">
                                        <GraphicLightningBolt className="w-3.5 h-3.5" />
                                        <span>Pilih Kuiz</span>
                                        <GraphicArrowRight className="w-3 h-3" />
                                    </div>
                                </div>

                                {/* Button Mod 3: Aktiviti & Permainan (BARU!) */}
                                <div
                                    onClick={() => { playAudioFeedback("tap"); setCurrentView("activityList"); }}
                                    className="bg-gradient-to-b from-purple-500/15 to-purple-500/25 border-3 border-purple-500 hover:border-purple-600 p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-98 group flex flex-col items-center justify-between text-center relative overflow-hidden"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                                        <GraphicGamepadActivity className="w-12 h-12" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-wider text-purple-700 bg-white/90 px-2.5 py-0.5 rounded-full mb-1 border border-purple-300">
                                        Drag & Drop
                                    </span>
                                    <h3 className="text-lg font-black text-purple-700">Aktiviti</h3>
                                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                        Susun Sistem Suria, kumpul skor tanpa timer!
                                    </p>
                                    <div className="mt-4 px-3.5 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[11px] font-black rounded-xl shadow-md group-hover:from-purple-600 group-hover:to-indigo-700 transition-all flex items-center gap-1.5">
                                        <span>🎮</span>
                                        <span>Main Game</span>
                                        <GraphicArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        PAPARAN 2: SENARAI TOPIK PEMBELAJARAN
                    ========================================== */}
                    {currentView === "learningList" && (
                        <div className="space-y-6 w-full max-w-lg anim-fade-in">
                            <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-[#0099e5] text-left">
                                        Pilih Topik Pembelajaran
                                    </h2>
                                    <p className="text-xs text-slate-500 text-left mt-0.5">Pilih topik sains untuk mula membaca & menonton</p>
                                </div>
                                <button
                                    onClick={() => setCurrentView("menu")}
                                    className="px-4 py-2.5 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-2 border border-slate-200"
                                >
                                    <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                    <span>Kembali</span>
                                </button>
                            </div>

                            <div className="space-y-4 w-full">
                                {courseData.topics.map((topic, idx) => (
                                    <div
                                        key={topic.id}
                                        className="bg-white border-2 border-[#00acc1]/40 hover:border-[#00acc1] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center sm:text-left group"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 border border-sky-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                                                {topic.graphic}
                                            </div>
                                            <div>
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${topic.accentBadge}`}>
                                                    {topic.category}
                                                </span>
                                                <h3 className="text-base font-black text-[#00838f] mt-1">{topic.title}</h3>
                                                <p className="text-xs text-slate-500 mt-0.5">Nota visual, infografik & video interaktif</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedTopicIndex(idx); setCurrentView("learningDetail"); resetQuizState(); }}
                                            className="w-full sm:w-auto px-5 py-2.5 btn-3d-blue text-white font-black rounded-xl cursor-pointer text-xs whitespace-nowrap flex items-center justify-center gap-2"
                                        >
                                            <GraphicBookOpen className="w-4 h-4" />
                                            <span>Mula Belajar</span>
                                            <GraphicArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        PAPARAN 3: SENARAI PILIHAN KUIZ TOPIK
                    ========================================== */}
                    {currentView === "quizList" && (
                        <div className="space-y-6 w-full max-w-lg anim-fade-in">
                            <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-[#e65100] text-left">
                                        Pilih Topik Kuiz
                                    </h2>
                                    <p className="text-xs text-slate-500 text-left mt-0.5">Pilih topik untuk membaca peraturan & memulakan kuiz</p>
                                </div>
                                <button
                                    onClick={() => setCurrentView("menu")}
                                    className="px-4 py-2.5 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-2 border border-slate-200"
                                >
                                    <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                    <span>Kembali</span>
                                </button>
                            </div>

                            <div className="space-y-4 w-full">
                                {courseData.topics.map((topic, idx) => (
                                    <div
                                        key={topic.id}
                                        className="bg-white border-2 border-[#ffa726]/40 hover:border-[#ffa726] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center sm:text-left group"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                                                {topic.graphic}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${topic.accentBadge}`}>
                                                        {topic.category}
                                                    </span>
                                                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                                                        <GraphicStopwatch className="w-3.5 h-3.5 text-amber-600" />
                                                        <span>20s / Soalan</span>
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-black text-[#e65100] mt-1">{topic.title}</h3>
                                                <p className="text-xs text-slate-500 mt-0.5">5 soalan objektif aneka pilihan</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => startQuizWithRules(idx)}
                                            className="w-full sm:w-auto px-5 py-2.5 btn-3d-orange text-slate-950 font-black rounded-xl cursor-pointer text-xs whitespace-nowrap flex items-center justify-center gap-2"
                                        >
                                            <GraphicLightningBolt className="w-4 h-4" />
                                            <span>Pilih Kuiz</span>
                                            <GraphicArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        PAPARAN 4: NOTA PEMBELAJARAN DETAIL + INFOGRAFIK
                    ========================================== */}
                    {currentView === "learningDetail" && (
                        <div className="space-y-6 w-full max-w-lg anim-fade-in">
                            <div className="flex items-center justify-between border-b border-[#0099e5]/20 pb-3 w-full">
                                <div className="flex items-center gap-2.5 truncate mr-2">
                                    <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                                        {currentTopic.graphic}
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-black text-[#0099e5] truncate text-left">
                                        {currentTopic.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setCurrentView("learningList")}
                                    className="px-3.5 py-2 btn-3d-white text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 border border-slate-200 flex items-center gap-1.5"
                                >
                                    <GraphicTopicList className="w-4 h-4 text-slate-600" />
                                    <span>Senarai Topik</span>
                                </button>
                            </div>

                            {/* Infografik Visual Interaktif */}
                            {currentTopic.infographic}

                            {/* Video Player */}
                            <div className="relative bg-slate-950 rounded-3xl overflow-hidden shadow-lg border-2 border-[#0099e5] aspect-video flex items-center justify-center w-full">
                                <iframe
                                    className="w-full h-full"
                                    src={currentTopic.videoEmbedUrl}
                                    title={currentTopic.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="text-center">
                                <a
                                    href={currentTopic.videoRawUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#0099e5] hover:text-[#007bb8] font-bold underline bg-[#0099e5]/10 px-4 py-2 rounded-xl border border-[#0099e5]/30 inline-block transition-all hover:scale-102"
                                >
                                    🔗 Buka Video Ini Terus di YouTube ↗
                                </a>
                            </div>

                            {/* Nota Card */}
                            <div className="bg-[#ffa726]/10 border-l-6 border-[#ffa726] p-5 rounded-r-2xl border-y border-r border-[#ffa726]/30 text-left shadow-sm">
                                <h3 className="font-black text-[#e65100] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <GraphicLightbulb className="w-5 h-5 text-amber-500" />
                                    <span>Nota Pembelajaran</span>
                                </h3>
                                <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
                                    {currentTopic.content}
                                </p>
                            </div>

                            {/* Bottom actions */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 w-full">
                                <button
                                    onClick={() => setCurrentView("learningList")}
                                    className="w-full sm:w-auto px-4 py-2.5 btn-3d-white text-slate-700 font-bold rounded-xl text-xs cursor-pointer border border-slate-200 flex items-center justify-center gap-2"
                                >
                                    <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                    <span>Topik Lain</span>
                                </button>
                                <button
                                    onClick={() => startQuizWithRules(selectedTopicIndex)}
                                    className="w-full sm:w-auto px-6 py-3 btn-3d-pink text-white font-black rounded-xl text-sm cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <GraphicRocketLaunch className="w-5 h-5" />
                                    <span>Selesai Belajar, Jom Kuiz!</span>
                                    <GraphicArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        PAPARAN 5: PERATURAN KUIZ (RULES SCREEN)
                    ========================================== */}
                    {currentView === "quizRules" && (
                        <div className="space-y-6 w-full max-w-lg anim-fade-in text-center">

                            {/* Top Badge & Maskot Robot */}
                            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-3xl border-2 border-amber-200 shadow-sm">
                                <div className="anim-float shrink-0">
                                    <GraphicMascotRobot className="w-14 h-14" />
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] font-black uppercase text-[#e65100] bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                                        Panduan Kuiz
                                    </span>
                                    <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                                        &ldquo;Kekal tenang! Fikir pantas kerana anda ada 20 saat untuk setiap soalan!&rdquo;
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-2xl sm:text-3xl font-black text-[#0099e5]">
                                    Bersedia Untuk Kuiz?
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600">
                                    Sila baca peraturan kuiz di bawah sebelum melancarkan misi anda!
                                </p>
                            </div>

                            {/* Selected Topic Pill */}
                            <div className="bg-[#0099e5]/10 border-2 border-[#0099e5]/30 p-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-inner">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    {currentTopic.graphic}
                                </div>
                                <span className="font-black text-[#007bb8] text-sm sm:text-base">
                                    {currentTopic.title}
                                </span>
                            </div>

                            {/* Rules Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                                <div className="bg-white p-4 rounded-2xl border-2 border-sky-100 shadow-sm flex items-start gap-3 hover:border-sky-300 transition-colors">
                                    <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 shadow-inner">
                                        <GraphicStopwatch className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-sky-800 uppercase tracking-wide">
                                            Masa 20 Saat
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                            Setiap soalan diberikan masa 20 saat sahaja untuk dijawab.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border-2 border-amber-100 shadow-sm flex items-start gap-3 hover:border-amber-300 transition-colors">
                                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 shadow-inner">
                                        <GraphicTarget className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-amber-800 uppercase tracking-wide">
                                            1 Percubaan
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                            Pilih 1 jawapan sahaja. Pilihan dikunci sebaik ditekan.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border-2 border-emerald-100 shadow-sm flex items-start gap-3 hover:border-emerald-300 transition-colors">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-inner">
                                        <GraphicGrandTrophy className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                                            5 Soalan Menguji
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                            Kumpul markah penuh untuk membuktikan kehebatan STEM anda!
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 shadow-sm flex items-start gap-3 hover:border-purple-300 transition-colors">
                                    <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 shadow-inner">
                                        <GraphicLightbulb className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-purple-800 uppercase tracking-wide">
                                            Semakan Jawapan
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                            Semakan jawapan betul dan skor disediakan di akhir kuiz.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* BUTTON MULA KUIZ DENGAN GRAFIK MENARIK & 3D TACTILE FEEL */}
                            <div className="pt-2 space-y-3">
                                <button
                                    onClick={startQuizConfirmed}
                                    className="w-full relative overflow-hidden py-4 px-6 btn-3d-pink text-white font-black text-base sm:text-lg rounded-2xl cursor-pointer flex items-center justify-center gap-3 border-t-2 border-white/40 group"
                                >
                                    <div className="shimmer-bar" />

                                    <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">
                                        <GraphicRocketLaunch className="w-8 h-8" />
                                    </div>
                                    <span className="tracking-wide">MULA KUIZ SEKARANG!</span>
                                    <GraphicArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                                </button>

                                <button
                                    onClick={() => setCurrentView("quizList")}
                                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto border border-slate-200 shadow-sm"
                                >
                                    <GraphicBackArrow className="w-3.5 h-3.5" />
                                    <span>Pilih Topik Lain</span>
                                </button>
                            </div>

                        </div>
                    )}

                    {/* =========================================
                        PAPARAN 6: KUIZ TOPIK AKTIF & KEPUTUSAN
                    ========================================== */}
                    {currentView === "quiz" && (
                        <div className="space-y-6 w-full max-w-lg anim-fade-in relative">

                            {/* Status Header Bar */}
                            <div className="flex items-center justify-between bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 w-full shadow-sm">
                                <div className="flex items-center gap-2.5 truncate mr-2">
                                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                        {currentTopic.graphic}
                                    </div>
                                    <span className="font-black text-[#0099e5] text-xs sm:text-sm truncate">
                                        {currentTopic.shortTitle}
                                    </span>
                                </div>
                                <button
                                    onClick={() => { resetQuizState(); setCurrentView("quizList"); }}
                                    className="px-3.5 py-1.5 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold rounded-xl text-xs border border-slate-200 shadow-sm transition-all cursor-pointer shrink-0 active:scale-95 flex items-center gap-1.5"
                                >
                                    <GraphicCloseCross className="w-3.5 h-3.5 text-rose-500" />
                                    <span>Keluar</span>
                                </button>
                            </div>

                            {/* PAPARAN RESULT AKHIR KUIZ */}
                            {currentQuestionIndex === "finished" ? (
                                <div className="space-y-6 w-full anim-fade-in relative">

                                    {/* Confetti Particles */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                                        <div className="absolute top-2 left-6 w-3 h-3 bg-amber-400 rounded-sm" style={{ animation: "confettiShower 2s ease-out infinite" }} />
                                        <div className="absolute top-0 left-1/4 w-2 h-4 bg-sky-400 rotate-45" style={{ animation: "confettiShower 2.5s ease-out infinite 0.2s" }} />
                                        <div className="absolute top-2 left-1/2 w-3 h-2 bg-pink-500 rounded-full" style={{ animation: "confettiShower 2.2s ease-out infinite 0.5s" }} />
                                        <div className="absolute top-0 right-1/4 w-3 h-3 bg-emerald-400 rotate-12" style={{ animation: "confettiShower 2.4s ease-out infinite 0.3s" }} />
                                        <div className="absolute top-3 right-8 w-2 h-3 bg-yellow-400 rounded-sm" style={{ animation: "confettiShower 2.1s ease-out infinite 0.7s" }} />
                                    </div>

                                    {/* Trophy & Score Card */}
                                    <div className="text-center py-8 px-6 space-y-3 bg-gradient-to-b from-[#00acc1]/10 via-[#00acc1]/20 to-white rounded-3xl border-3 border-[#00acc1] shadow-lg relative overflow-hidden">

                                        <div className="flex justify-center items-center gap-3 anim-float">
                                            <GraphicMascotRobot className="w-16 h-16" expression="celebrate" />
                                            <GraphicGrandTrophy className="w-24 h-24" />
                                        </div>

                                        <div className="inline-block bg-[#00acc1] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            Misi Selesai!
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-black text-[#00838f]">
                                            Tahniah! Anda Selesai!
                                        </h3>

                                        {/* Score Badge */}
                                        <div className="py-2">
                                            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-md border-2 border-[#00acc1]">
                                                <span className="text-3xl font-black text-[#0099e5]">
                                                    {scoreCount}
                                                </span>
                                                <span className="text-slate-400 font-bold text-xl">/</span>
                                                <span className="text-xl font-bold text-slate-700">
                                                    {currentTopic.questions.length}
                                                </span>
                                                <span className="ml-2 text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                                                    {scorePercentage}%
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-slate-700 font-bold text-sm">
                                            {scorePercentage === 100
                                                ? "🌟 Hebat! Anda menjawab semua soalan dengan tepat! Calon Juara STEM!"
                                                : scorePercentage >= 60
                                                    ? "👏 Pencapaian cemerlang! Teruskan semangat belajar STEM anda!"
                                                    : "💪 Jangan berputus asa! Ulangkaji semula nota dan cuba lagi!"}
                                        </p>
                                    </div>

                                    {/* Detailed Answer Review */}
                                    <div className="space-y-3 w-full text-left">
                                        <h4 className="font-black text-slate-700 text-sm flex items-center justify-between">
                                            <span>Semakan Jawapan Terperinci:</span>
                                            <span className="text-xs text-slate-500 font-normal">
                                                {scoreCount} daripada {currentTopic.questions.length} betul
                                            </span>
                                        </h4>

                                        {currentTopic.questions.map((q, idx) => {
                                            const userAns = selectedAnswers[idx];
                                            const isCorrect = userAns === q.correctAnswer;
                                            const wasTimeout = userAns === "__TIMEOUT__";

                                            return (
                                                <div
                                                    key={idx}
                                                    className={`p-4 rounded-2xl border-2 transition-all shadow-sm ${isCorrect
                                                            ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                                                            : wasTimeout
                                                                ? "bg-amber-50/80 border-amber-300 text-amber-950"
                                                                : "bg-rose-50/80 border-rose-300 text-rose-950"
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className="font-black text-sm mb-1">
                                                            {idx + 1}. {q.question}
                                                        </p>
                                                        <span className="text-base shrink-0 font-bold">
                                                            {isCorrect ? "✓" : wasTimeout ? "⏱️" : "✕"}
                                                        </span>
                                                    </div>

                                                    <p className="text-xs mt-1">
                                                        Jawapan anda:{" "}
                                                        <span className="font-bold">
                                                            {wasTimeout ? "Masa Tamat (Tiada Jawapan)" : userAns || "Tiada"}
                                                        </span>
                                                    </p>

                                                    {!isCorrect && (
                                                        <p className="text-xs mt-1 text-emerald-800 font-bold bg-white/70 p-2 rounded-xl inline-block border border-emerald-200">
                                                            Jawapan Betul: {q.correctAnswer}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Actions with 3D tactile buttons */}
                                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                                        <button
                                            onClick={() => { resetQuizState(); setCurrentView("quizRules"); }}
                                            className="px-5 py-3 btn-3d-blue text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <GraphicRefresh className="w-4 h-4" />
                                            <span>Cuba Kuiz Semula</span>
                                        </button>
                                        <button
                                            onClick={() => { resetQuizState(); setCurrentView("learningDetail"); }}
                                            className="px-5 py-3 btn-3d-orange text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <GraphicScienceBook className="w-4 h-4" />
                                            <span>Ulangkaji Nota</span>
                                        </button>
                                        <button
                                            onClick={() => { setCurrentView("menu"); resetQuizState(); }}
                                            className="px-5 py-3 btn-3d-white text-slate-700 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                                        >
                                            <GraphicHomeButton className="w-4 h-4" />
                                            <span>Menu Utama</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* SOALAN KUIZ AKTIF */
                                <div className="space-y-5 w-full anim-fade-in relative">

                                    {/* Floating Score Reward Banner Popup */}
                                    {showScorePopup && (
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 anim-score-popup pointer-events-none">
                                            <span className="bg-emerald-500 text-white font-black text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5">
                                                <span>✨</span> +1 Markah Tepat!
                                            </span>
                                        </div>
                                    )}

                                    {/* Top Bar Soalan & Timer Graphic */}
                                    <div className="flex items-center justify-between gap-3 w-full">
                                        <span className="bg-[#0099e5]/10 text-[#0099e5] border border-[#0099e5]/30 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                            <span>Soalan</span>
                                            <span className="bg-[#0099e5] text-white px-2 py-0.5 rounded-full text-[11px]">
                                                {currentQuestionIndex + 1} / {currentTopic.questions.length}
                                            </span>
                                        </span>

                                        {/* TIMER 20 SAAT INTERAKTIF */}
                                        <div className={`px-4 py-1.5 rounded-full border-2 font-black text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all duration-300 ${timeLeft <= 5
                                                ? "bg-rose-50 border-rose-500 text-rose-600 anim-pulse-urgent"
                                                : timeLeft <= 10
                                                    ? "bg-amber-50 border-amber-400 text-amber-700"
                                                    : "bg-sky-50 border-sky-400 text-sky-700"
                                            }`}>
                                            <GraphicStopwatch className={`w-4 h-4 ${timeLeft <= 5 ? "animate-spin" : ""}`} />
                                            <span>{timeLeft}s</span>
                                            <span className="text-[10px] text-slate-400 uppercase hidden sm:inline">
                                                Tinggal
                                            </span>
                                        </div>
                                    </div>

                                    {/* Visual Timer Progress Bar */}
                                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 5
                                                    ? "bg-gradient-to-r from-rose-500 to-red-600"
                                                    : timeLeft <= 10
                                                        ? "bg-gradient-to-r from-amber-400 to-orange-500"
                                                        : "bg-gradient-to-r from-[#0099e5] to-[#00d2ff]"
                                                }`}
                                            style={{ width: `${(timeLeft / 20) * 100}%` }}
                                        />
                                    </div>

                                    {/* Question Card */}
                                    <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm text-left">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 block">
                                            Sila Baca & Pilih:
                                        </span>
                                        <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
                                            {currentTopic.questions[currentQuestionIndex].question}
                                        </h3>
                                    </div>

                                    {/* Timeout Warning Message */}
                                    {isTimeOut && (
                                        <div className="bg-amber-100 border-2 border-amber-400 p-3 rounded-2xl text-amber-900 text-xs font-bold anim-shake flex items-center justify-center gap-2">
                                            <GraphicStopwatch className="w-5 h-5" />
                                            <span>Masa telah tamat untuk soalan ini! Jawapan betul telah ditandakan.</span>
                                        </div>
                                    )}

                                    {/* Pilihan Jawapan 3D Tactile Buttons */}
                                    <div className="space-y-3.5 w-full">
                                        {currentTopic.questions[currentQuestionIndex].options.map((option, idx) => {
                                            const optionLetter = String.fromCharCode(65 + idx);
                                            const isSelected = selectedAnswers[currentQuestionIndex] === option;
                                            const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
                                            const isCorrectOption = option === currentTopic.questions[currentQuestionIndex].correctAnswer;

                                            let cardStyle = "border-slate-200 bg-white hover:border-[#0099e5] hover:bg-sky-50/40 text-slate-700 shadow-[0_5px_0_#cbd5e1] hover:shadow-[0_3px_0_#cbd5e1] hover:translate-y-[2px] active:shadow-none active:translate-y-[5px]";
                                            let badgeStyle = "bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700 border-slate-300";

                                            if (isAnswered) {
                                                if (isSelected && !isCorrectOption) {
                                                    cardStyle = "border-rose-500 bg-rose-50 text-rose-950 font-bold anim-shake shadow-[0_4px_0_#e11d48]";
                                                    badgeStyle = "bg-rose-500 text-white border-rose-600";
                                                } else if (isCorrectOption) {
                                                    cardStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-[0_4px_0_#059669] ring-2 ring-emerald-400/50";
                                                    badgeStyle = "bg-emerald-500 text-white border-emerald-600";
                                                } else {
                                                    cardStyle = "border-slate-200 bg-slate-50 text-slate-400 opacity-60 shadow-none";
                                                    badgeStyle = "bg-slate-200 text-slate-400 border-slate-300";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    disabled={isAnswered}
                                                    onClick={() => handleAnswerSelect(option)}
                                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-150 text-left select-none ${isAnswered ? "cursor-default" : "cursor-pointer"
                                                        } ${cardStyle}`}
                                                >
                                                    <div className="flex items-center gap-3.5">
                                                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs border shadow-sm shrink-0 transition-colors ${badgeStyle}`}>
                                                            {optionLetter}
                                                        </span>
                                                        <span className="text-sm sm:text-base font-bold">
                                                            {option}
                                                        </span>
                                                    </div>

                                                    {isAnswered && (
                                                        <div className="shrink-0 anim-pop">
                                                            {isCorrectOption ? (
                                                                <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-md border-2 border-white">
                                                                    ✓
                                                                </span>
                                                            ) : isSelected ? (
                                                                <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-black shadow-md border-2 border-white">
                                                                    ✕
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* =========================================
                        PAPARAN: SENARAI AKTIVITI & PERMAINAN
                    ========================================== */}
                    {currentView === "activityList" && (
                        <div className="space-y-6 w-full max-w-xl anim-fade-in">
                            <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-purple-700 text-left">
                                        Pusat Permainan & Aktiviti
                                    </h2>
                                    <p className="text-xs text-slate-500 text-left mt-0.5">Pilih aktiviti santai untuk bermain sambil belajar</p>
                                </div>
                                <button
                                    onClick={() => setCurrentView("menu")}
                                    className="px-4 py-2.5 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-2 border border-slate-200"
                                >
                                    <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                    <span>Kembali</span>
                                </button>
                            </div>

                            {/* Maskot Robot Speech */}
                            <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-3xl border-2 border-purple-200 text-left">
                                <div className="anim-float shrink-0">
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
                                    onClick={() => { resetSolarGame(); setCurrentView("solarDragDrop"); }}
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
                                                    Susun Sistem Suria
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

                                {/* Permainan 2: Teaser Makmal Tumbuhan (Akan Datang) */}
                                <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-5 rounded-3xl opacity-75 relative text-left flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shrink-0">
                                            <GraphicNatureLeaf className="w-9 h-9" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-full">
                                                    Akan Datang
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500">
                                                    Fotosintesis
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold text-slate-700">
                                                Makmal Tumbuhan Cilik
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Susun keperluan fotosintesis (cahaya, air, klorofil) untuk tumbesaran pokok.
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-200 px-3 py-1 rounded-xl shrink-0">
                                        Terkunci 🔒
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* =========================================
                        PAPARAN: PERMAINAN DRAG & DROP SISTEM SURIA
                    ========================================== */}
                    {currentView === "solarDragDrop" && (
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
                                                onClick={() => { resetSolarGame(); setCurrentView("activityList"); }}
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
                                            onClick={resetSolarGame}
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
                                                                    <span>Orbit {planetInfo.orbit}: {planetInfo.name}</span>
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
                                    <div className="flex flex-col sm:flex-row gap-3 pt-3">
                                        <button
                                            onClick={resetSolarGame}
                                            className="flex-1 py-3.5 btn-3d-blue text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                        >
                                            <GraphicRefresh className="w-5 h-5" />
                                            <span>Cuba Lagi / Main Semula</span>
                                        </button>
                                        <button
                                            onClick={() => { resetSolarGame(); setCurrentView("activityList"); }}
                                            className="flex-1 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                                        >
                                            <span>🎮</span>
                                            <span>Kembali ke Pusat Aktiviti</span>
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
                                                onClick={() => setCurrentView("activityList")}
                                                className="px-3.5 py-2 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0"
                                                title="Kembali ke Senarai Aktiviti"
                                            >
                                                <GraphicBackArrow className="w-4 h-4 text-slate-600" />
                                                <span>Aktiviti</span>
                                            </button>
                                            <div className="text-left">
                                                <h2 className="text-lg sm:text-xl font-black text-purple-700 leading-tight">
                                                    Susun Sistem Suria
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
                                                onClick={resetSolarGame}
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
                                                onClick={() => setSolarFeedbackMessage(null)}
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
                                                        onDrop={(e) => handleDropOnOrbit(e, planetInfo.orbit)}
                                                        onClick={() => handleClickOrbitSlot(planetInfo.orbit)}
                                                        className={`absolute z-30 flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-2xl transition-all duration-200 cursor-pointer select-none ${
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
                                                                        removePlanetFromSlot(planetInfo.orbit);
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
                                            onClick={handleSubmitSolarGame}
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
                                        Tiada kotak petak, tiada nama planet, tiada teks nombor
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
                                                        : "Hebat! Kesemua planet telah ditempatkan. Sila klik 'Hantar & Semak Keputusan' di atas!"}
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
                                                        onDragStart={(e) => handleDragStart(e, planet.id)}
                                                        onClick={() => handleSelectTrayPlanet(planet.id)}
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
                                                🎉 Hebat! Semua 8 planet berada di orbit. Klik butang 'Hantar & Semak Keputusan' di atas untuk melihat skor dan semakan jawapan!
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}