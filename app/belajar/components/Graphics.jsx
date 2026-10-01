"use client";

import React from "react";

/* =========================================================================
   CUSTOM VECTOR GRAPHICS & ICON ILLUSTRATIONS (REPLACING PLAIN EMOJIS)
   ========================================================================= */

// 1. Detailed Graphic Home Icon (For Pure Graphic Home Button)
export function GraphicHomeButton({ className = "w-6 h-6" }) {
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
export function GraphicScienceBook({ className = "w-16 h-16" }) {
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
export function GraphicQuizLightning({ className = "w-16 h-16" }) {
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
export function GraphicRocketLaunch({ className = "w-10 h-10" }) {
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
export function GraphicSaturnPlanet({ className = "w-10 h-10" }) {
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
export function GraphicNatureLeaf({ className = "w-10 h-10" }) {
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
export function GraphicMascotRobot({ className = "w-16 h-16", expression = "happy" }) {
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
export function GraphicStopwatch({ className = "w-8 h-8" }) {
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
export function GraphicTarget({ className = "w-8 h-8" }) {
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
export function GraphicGrandTrophy({ className = "w-20 h-20" }) {
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

// 10b. Star Medal Graphic (For Great Performance)
export function GraphicStarMedal({ className = "w-20 h-20" }) {
    return (
        <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="medalRibbonLeft" x1="28" y1="10" x2="36" y2="46" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="medalRibbonRight" x1="52" y1="10" x2="44" y2="46" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="medalGold" x1="24" y1="26" x2="56" y2="68" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.3" stopColor="#facc15" />
                    <stop offset="0.7" stopColor="#eab308" />
                    <stop offset="1" stopColor="#ca8a04" />
                </linearGradient>
                <linearGradient id="medalInnerRing" x1="28" y1="30" x2="52" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ca8a04" />
                    <stop offset="1" stopColor="#eab308" />
                </linearGradient>
            </defs>
            {/* Ribbons */}
            <path d="M30 10L40 38L24 42L16 10H30Z" fill="url(#medalRibbonLeft)" />
            <path d="M50 10L40 38L56 42L64 10H50Z" fill="url(#medalRibbonRight)" />
            <path d="M24 42L16 10H22L40 38L24 42Z" fill="#1e40af" opacity="0.3" />
            <path d="M56 42L64 10H58L40 38L56 42Z" fill="#0369a1" opacity="0.3" />

            {/* Medal Rim & Shadow */}
            <circle cx="40" cy="48" r="22" fill="#000000" fillOpacity="0.12" />
            <circle cx="40" cy="46" r="22" fill="url(#medalGold)" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="40" cy="46" r="18" fill="url(#medalInnerRing)" stroke="#fef08a" strokeWidth="1" strokeDasharray="2 1.5" />

            {/* Center Star */}
            <path
                d="M40 33L42.5 40.5H50.5L44 45.2L46.5 52.8L40 48.2L33.5 52.8L36 45.2L29.5 40.5H37.5L40 33Z"
                fill="#ffffff"
                stroke="#fef08a"
                strokeWidth="0.8"
            />
            {/* Star Sparkle Accents */}
            <circle cx="40" cy="45" r="1.5" fill="#facc15" />
            <path d="M22 24L23 26.5L25.5 27.5L23 28.5L22 31L21 28.5L18.5 27.5L21 26.5L22 24Z" fill="#fde047" />
            <path d="M60 22L61 24.5L63.5 25.5L61 26.5L60 29L59 26.5L56.5 25.5L59 24.5L60 22Z" fill="#fde047" />
        </svg>
    );
}

// 10c. ExploBot Mascot Avatar Graphic
export function GraphicExploBot({ className = "w-16 h-16", expression = "happy" }) {
    return <GraphicMascotRobot className={className} expression={expression} />;
}

// 11. Lightbulb Graphic
export function GraphicLightbulb({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 28H25M17 32H23" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 7C14.5 7 10 11.5 10 17C10 20.5 12 23.5 15 25V28H25V25C28 23.5 30 20.5 30 17C30 11.5 25.5 7 20 7Z" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
            <path d="M17 17C17 15 18 13 20 13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 3V5M8 9L9.5 10.5M32 9L30.5 10.5M4 17H6M34 17H36" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

// 11b. Modern Language Toggle Component (Bahasa Melayu / English)
export function LanguageToggle({ language = "bm", onToggle, variant = "light" }) {
    const isDark = variant === "dark" || variant === "glass";
    return (
        <div
            className={`flex items-center p-0.5 rounded-2xl shadow-inner transition-colors shrink-0 ${
                isDark
                    ? "bg-black/25 hover:bg-black/35 border border-white/25"
                    : "bg-slate-100 hover:bg-slate-200/90 border border-slate-200"
            }`}
            role="group"
            aria-label="Tukar Bahasa / Switch Language"
        >
            <button
                type="button"
                onClick={() => onToggle("bm")}
                title="Bahasa Melayu"
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-black transition-all duration-200 cursor-pointer ${
                    language === "bm"
                        ? isDark
                            ? "bg-white text-blue-900 shadow-sm scale-102"
                            : "bg-white text-[#0088cc] shadow-sm border border-slate-200/80 scale-102"
                        : isDark
                            ? "text-white/80 hover:text-white"
                            : "text-slate-500 hover:text-slate-800"
                }`}
            >
                <span className="text-xs sm:text-sm leading-none">🇲🇾</span>
                <span className="tracking-wide">BM</span>
            </button>
            <button
                type="button"
                onClick={() => onToggle("en")}
                title="English"
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-black transition-all duration-200 cursor-pointer ${
                    language === "en"
                        ? isDark
                            ? "bg-white text-blue-900 shadow-sm scale-102"
                            : "bg-white text-[#0088cc] shadow-sm border border-slate-200/80 scale-102"
                        : isDark
                            ? "text-white/80 hover:text-white"
                            : "text-slate-500 hover:text-slate-800"
                }`}
            >
                <span className="text-xs sm:text-sm leading-none">🇬🇧</span>
                <span className="tracking-wide">EN</span>
            </button>
        </div>
    );
}

// 12. Solar System Infographic
export function GraphicSolarSystemBanner({ language = "bm" }) {
    const isEn = language === "en";
    return (
        <div className="w-full bg-slate-900 rounded-3xl p-5 border-2 border-sky-400/40 relative overflow-hidden shadow-inner text-white">
            <div className="text-center mb-3">
                <span className="text-[10px] uppercase font-black tracking-widest text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-500/30">
                    {isEn ? "Astronomy Visual Infographic" : "Infografik Visual Astronomi"}
                </span>
                <h4 className="text-sm sm:text-base font-black text-amber-300 mt-1">
                    {isEn ? "Arrangement of 8 Planets Orbiting the Sun" : "Susunan 8 Planet Mengelilingi Matahari"}
                </h4>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 py-3 text-center">
                <div className="flex flex-col items-center group">
                    <div className="w-8 h-8 rounded-full bg-slate-400 border border-slate-200 flex items-center justify-center text-[10px] font-bold shadow-md group-hover:scale-125 transition-transform">
                        🌑
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 mt-1">{isEn ? "Mercury" : "Utarid"}</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-125 transition-transform">
                        🌕
                    </div>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">{isEn ? "Venus" : "Zuhrah"}</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-emerald-400 flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-sky-400/50 group-hover:scale-125 transition-transform">
                        🌍
                    </div>
                    <span className="text-[10px] font-black text-sky-300 mt-1">{isEn ? "Earth" : "Bumi"}</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full bg-red-600 border border-red-300 flex items-center justify-center text-xs font-bold shadow-md group-hover:scale-125 transition-transform">
                        🔴
                    </div>
                    <span className="text-[10px] font-bold text-red-300 mt-1">{isEn ? "Mars" : "Marikh"}</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-12 h-12 rounded-full bg-amber-600 border border-amber-300 flex items-center justify-center text-base font-bold shadow-md group-hover:scale-125 transition-transform">
                        🟤
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 mt-1">{isEn ? "Jupiter" : "Musytari"}</span>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-11 h-11 rounded-full bg-yellow-600 border border-yellow-300 flex items-center justify-center text-base font-bold shadow-md group-hover:scale-125 transition-transform">
                        🪐
                    </div>
                    <span className="text-[10px] font-bold text-yellow-300 mt-1">{isEn ? "Saturn" : "Zuhal"}</span>
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
                    <span className="text-[10px] font-bold text-blue-300 mt-1">{isEn ? "Neptune" : "Neptun"}</span>
                </div>
            </div>

            <div className="mt-2 text-center text-xs text-sky-200 bg-sky-900/40 p-2 rounded-xl border border-sky-500/20">
                ✨ <strong>{isEn ? "Quiz Tip:" : "Tip Kuiz:"}</strong>{" "}
                {isEn
                    ? "The Sun is the center of our solar system, Mars is the Red Planet, & Saturn has the most beautiful rings!"
                    : "Matahari adalah pusat sistem suria, Marikh ialah Planet Merah, & Zuhal mempunyai cincin tercantik!"}
            </div>
        </div>
    );
}

// 13. Photosynthesis Infographic
export function GraphicPhotosynthesisBanner({ language = "bm" }) {
    const isEn = language === "en";
    return (
        <div className="w-full bg-gradient-to-br from-emerald-950 to-teal-900 rounded-3xl p-5 border-2 border-emerald-400/40 relative overflow-hidden shadow-inner text-white">
            <div className="text-center mb-3">
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-500/30">
                    {isEn ? "Biology Visual Infographic" : "Infografik Visual Biologi"}
                </span>
                <h4 className="text-sm sm:text-base font-black text-amber-300 mt-1">
                    {isEn ? "How Do Plants Make Their Own Food?" : "Bagaimana Pokok Membuat Makanan Sendiri?"}
                </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2 text-center">
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">☀️</div>
                    <h5 className="text-xs font-black text-amber-300">{isEn ? "Sunlight" : "Cahaya Matahari"}</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">
                        {isEn ? "Primary energy absorbed by leaves" : "Sumber tenaga utama diserap daun"}
                    </p>
                </div>
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">💧</div>
                    <h5 className="text-xs font-black text-sky-300">{isEn ? "Water From Soil" : "Air Dari Tanah"}</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">
                        {isEn ? "Absorbed by plant roots" : "Diserap oleh bahagian akar pokok"}
                    </p>
                </div>
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">🍃</div>
                    <h5 className="text-xs font-black text-emerald-300">{isEn ? "Green Chlorophyll" : "Klorofil Hijau"}</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">
                        {isEn ? "Green pigment inside leaves" : "Zat pewarna hijau dalam daun"}
                    </p>
                </div>
                <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-500/30">
                    <div className="text-2xl mb-1">💨</div>
                    <h5 className="text-xs font-black text-pink-300">{isEn ? "Oxygen Gas" : "Gas Oksigen"}</h5>
                    <p className="text-[10px] text-emerald-200 mt-0.5">
                        {isEn ? "Released for us to breathe!" : "Dibebaskan untuk kita bernafas!"}
                    </p>
                </div>
            </div>

            <div className="mt-2 text-center text-xs text-emerald-200 bg-emerald-900/40 p-2 rounded-xl border border-emerald-500/20">
                🌿 <strong>{isEn ? "Quiz Tip:" : "Tip Kuiz:"}</strong>{" "}
                {isEn
                    ? "Photosynthesis converts sunlight and water into food, while releasing clean Oxygen!"
                    : "Proses fotosintesis menukarkan cahaya matahari dan air kepada makanan, sambil membebaskan Oksigen!"}
            </div>
        </div>
    );
}

// 14. Action & Navigation Icons
export function GraphicBackArrow({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function GraphicArrowRight({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4L13 10L7 16" />
        </svg>
    );
}

export function GraphicCloseCross({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function GraphicTopicList({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="4" height="4" rx="1" fill="currentColor" />
            <rect x="3" y="11" width="4" height="4" rx="1" fill="currentColor" />
            <path d="M10 6H17M10 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function GraphicBookOpen({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C8 3.5 5 3.5 3 4V16C5 15.5 8 15.5 10 17C12 15.5 15 15.5 17 16V4C15 3.5 12 3.5 10 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 5V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

export function GraphicLightningBolt({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
    );
}

export function GraphicRefresh({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
    );
}

// 15. Gamepad Graphic for Activity
export function GraphicGamepadActivity({ className = "w-12 h-12" }) {
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
export function GraphicPlanetIcon({ planetId, className = "w-12 h-12" }) {
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
export const SOLAR_PLANETS = [
    {
        id: "utarid",
        name: "Utarid",
        englishName: "Mercury",
        orbit: 1,
        radiusPercent: 14,
        angleDeg: -40,
        color: "#94a3b8",
        sizeLabel: "Paling Kecil",
        englishSizeLabel: "Smallest",
        diameter: "4,879 km",
        fact: "Planet paling dekat dengan Matahari dan berputar sangat pantas mengelilingi orbitnya.",
        englishFact: "The closest planet to the Sun and orbits around it very quickly.",
        hint: "Orbit 1: Paling hampir dengan Matahari!",
        englishHint: "Orbit 1: Nearest to the Sun!",
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
        englishSizeLabel: "Hottest",
        diameter: "12,104 km",
        fact: "Planet paling panas dalam Sistem Suria kerana diselubungi awan tebal asid dan gas karbon dioksida.",
        englishFact: "The hottest planet in the Solar System, trapped under thick acidic carbon dioxide clouds.",
        hint: "Orbit 2: Planet kedua, paling terang dan terpanas!",
        englishHint: "Orbit 2: Second planet, brightest and hottest!",
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
        englishSizeLabel: "Our Home",
        diameter: "12,742 km",
        fact: "Satu-satunya planet yang diketahui mempunyai air cecair, atmosfera oksigen dan hidupan kita!",
        englishFact: "The only known planet with liquid water, an oxygen-rich atmosphere, and life!",
        hint: "Orbit 3: Planet ketiga, tempat tinggal kita yang kaya dengan lautan!",
        englishHint: "Orbit 3: Third planet, our home blessed with oceans and life!",
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
        englishSizeLabel: "Red Planet",
        diameter: "6,779 km",
        fact: "Dikenali sebagai Planet Merah kerana permukaan tanahnya kaya dengan besi oksida (karat).",
        englishFact: "Known as the Red Planet because its surface soil is rich in iron oxide (rust).",
        hint: "Orbit 4: Planet keempat berpasir merah!",
        englishHint: "Orbit 4: Fourth planet with red dusty terrain!",
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
        englishSizeLabel: "Biggest Giant",
        diameter: "139,820 km",
        fact: "Planet terbesar dalam Sistem Suria, mempunyai ribut 'Bintik Merah Gergasi' yang lebih besar dari Bumi!",
        englishFact: "The largest planet in the Solar System, featuring a 'Great Red Spot' storm larger than Earth!",
        hint: "Orbit 5: Planet gergasi gas pertama selepas zon asteroid!",
        englishHint: "Orbit 5: First gas giant planet past the asteroid belt!",
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
        englishSizeLabel: "Ice Rings",
        diameter: "116,460 km",
        fact: "Mempunyai sistem gelang ais dan batu yang paling megah, cantik dan mempesonakan.",
        englishFact: "Boasts the most magnificent, stunning, and beautiful system of icy rings.",
        hint: "Orbit 6: Planet keenam yang mempunyai gelang paling indah!",
        englishHint: "Orbit 6: Sixth planet with the most dazzling planetary rings!",
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
        englishSizeLabel: "Ice Giant",
        diameter: "50,724 km",
        fact: "Gergasi ais sejuk membeku berwarna biru muda yang berputar secara condong pada sisinya.",
        englishFact: "A frigid pale-blue ice giant that rotates tilted sideways on its axis.",
        hint: "Orbit 7: Planet ketujuh, sangat sejuk dan berputar senget!",
        englishHint: "Orbit 7: Seventh planet, freezing cold and rotating sideways!",
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
        englishSizeLabel: "Farthest",
        diameter: "49,244 km",
        fact: "Planet paling jauh dari Matahari, berwarna biru pekat dengan tiupan angin ribut paling laju!",
        englishFact: "The farthest planet from the Sun, deep vivid blue with supersonic windstorms!",
        hint: "Orbit 8: Planet kelapan, paling jauh dan sejuk membiru!",
        englishHint: "Orbit 8: Eighth planet, farthest away and deeply freezing blue!",
    },
];

/* =========================================================================
   DASHBOARD DATA & CONSTANTS
   ========================================================================= */

export const DASHBOARD_BADGES = [
    {
        id: "welcome_badge",
        name: "Penjelajah Baharu",
        englishName: "New Explorer",
        title: "Kadet Angkasa",
        englishTitle: "Space Cadet",
        category: "Pendaftaran",
        englishCategory: "Registration",
        level: "Gangsa",
        englishLevel: "Bronze",
        xp: "+100 XP",
        unlocked: true,
        date: "Hari Ini",
        englishDate: "Today",
        icon: "🚀",
        bgColor: "from-sky-400 via-blue-500 to-indigo-600",
        ringColor: "border-sky-400",
        description: "Mendaftar akaun murid dan memulakan pengembaraan sains di portal Exploria!",
        englishDescription: "Registering a student account and starting the science journey on Exploria!",
        funFact: "Langkah pertama seorang angkasawan cilik bermula dengan rasa ingin tahu!",
        englishFunFact: "A young astronaut's first step starts with curiosity!",
        requirement: "Daftar akaun murid di Exploria.",
    },
    {
        id: "solar_master",
        name: "Pakar Sistem Suria",
        englishName: "Solar System Master",
        title: "Master Ahli Falak",
        englishTitle: "Master Astronomer",
        category: "Astronomi",
        englishCategory: "Astronomy",
        level: "Emas",
        englishLevel: "Gold",
        xp: "+300 XP",
        unlocked: false,
        date: "Belum Dicapai",
        englishDate: "Not Yet",
        icon: "🪐",
        bgColor: "from-amber-400 via-orange-500 to-rose-500",
        ringColor: "border-amber-400",
        description: "Menyusun kesemua 8 planet dalam orbit yang tepat tanpa kesilapan (800/800)!",
        englishDescription: "Arranging all 8 planets into their correct orbits without any mistakes!",
        funFact: "Anda kini menguasai urutan 8 planet dari Utarid hingga ke Neptun!",
        englishFunFact: "You have now mastered the order of all 8 planets from Mercury to Neptune!",
        requirement: "Susun kesemua 8 planet ke orbit yang tepat dengan skor sempurna 800/800.",
    },
    {
        id: "speed_demon",
        name: "Minda Kilat 20s",
        englishName: "20s Lightning Mind",
        title: "Pantas & Tepat",
        englishTitle: "Fast & Accurate",
        category: "Kuiz Pantas",
        englishCategory: "Speed Quiz",
        level: "Emas",
        englishLevel: "Gold",
        xp: "+250 XP",
        unlocked: false,
        date: "Belum Dicapai",
        englishDate: "Not Yet",
        icon: "⚡",
        bgColor: "from-yellow-400 via-amber-500 to-orange-600",
        ringColor: "border-yellow-400",
        description: "Menjawab kuiz 20 saat dengan ketepatan tinggi dan skor melebihi 500 mata.",
        englishDescription: "Answering 20-second quiz questions with high accuracy and score over 500 points.",
        funFact: "Kelajuan dan ketepatan bertindak balas membina ketajaman minda sains!",
        englishFunFact: "Speed and accuracy build sharp scientific thinking skills!",
        requirement: "Capai markah melebihi 500 mata dalam Kuiz Pantas 20s.",
    },
    {
        id: "knowledge_seeker",
        name: "Pencari Ilmu STEM",
        englishName: "STEM Knowledge Seeker",
        title: "Peneliti Sains",
        englishTitle: "Science Explorer",
        category: "Nota Visual",
        englishCategory: "Visual Notes",
        level: "Perak",
        englishLevel: "Silver",
        xp: "+200 XP",
        unlocked: false,
        date: "Belum Dicapai",
        englishDate: "Not Yet",
        icon: "📚",
        bgColor: "from-sky-400 via-blue-500 to-indigo-600",
        ringColor: "border-sky-400",
        description: "Meneroka dan membaca keseluruhan modul Sains Sistem Suria & Fotosintesis.",
        englishDescription: "Exploring and reading the entire Solar System & Photosynthesis modules.",
        funFact: "Proses fotosintesis menghasilkan glukosa dan oksigen untuk kehidupan bumi.",
        englishFunFact: "Photosynthesis produces glucose and oxygen essential for earthly life.",
        requirement: "Baca kedua-dua topik modul nota pembelajaran.",
    },
    {
        id: "streak_champ",
        name: "Bintang 7 Hari",
        englishName: "7-Day Star Streak",
        title: "Konsisten Sejati",
        englishTitle: "True Dedication",
        category: "Ketekunan",
        englishCategory: "Consistency",
        level: "Emas",
        englishLevel: "Gold",
        xp: "+350 XP",
        unlocked: false,
        date: "Belum Dicapai",
        englishDate: "Not Yet",
        icon: "🔥",
        bgColor: "from-rose-500 via-red-500 to-amber-500",
        ringColor: "border-rose-400",
        description: "Membuka dan mengulang kaji di portal Exploria selama 7 hari berturut-turut.",
        englishDescription: "Visiting and learning on Exploria for 7 consecutive days.",
        funFact: "Disiplin belajar setiap hari membina kefahaman STEM yang kukuh dan berkekalan!",
        englishFunFact: "Daily learning discipline builds solid and lasting STEM mastery!",
        requirement: "Mengekalkan streak pembelajaran selama 7 hari berturut-turut.",
    },
    {
        id: "grand_champion",
        name: "Juara Sains Galaksi",
        englishName: "Galaxy Science Champion",
        title: "Legenda Exploria",
        englishTitle: "Exploria Legend",
        category: "Keseluruhan",
        englishCategory: "Overall",
        level: "Platinum",
        englishLevel: "Platinum",
        xp: "+500 XP",
        unlocked: false,
        date: "Belum Dicapai",
        englishDate: "Not Yet",
        icon: "🏆",
        bgColor: "from-purple-500 via-pink-500 to-amber-400",
        ringColor: "border-purple-400",
        description: "Menamatkan semua modul pembelajaran, kuiz pantas, dan aktiviti interaktif.",
        englishDescription: "Completing all learning modules, speed quizzes, and interactive activities.",
        funFact: "Tahniah! Anda kini tergolong dalam 5% penjelajah STEM terhebat di Exploria!",
        englishFunFact: "Congratulations! You are now among the top 5% STEM explorers on Exploria!",
        requirement: "Kuasai aktiviti suria sempurna (800/800), kuiz pantas, dan membaca semua nota!",
    },
];

export const DAILY_QUESTS = [
    {
        id: "quest_solar",
        title: "Susun 8 Planet Sistem Suria",
        englishTitle: "Sort 8 Solar System Planets",
        category: "Aktiviti Interaktif",
        englishCategory: "Interactive Activity",
        xp: "+100 XP",
        progress: 0,
        total: 1,
        completed: false,
        icon: "🪐",
        targetView: "solarDragDrop",
        colorBadge: "bg-purple-100 text-purple-700",
    },
    {
        id: "quest_quiz",
        title: "Cabar Kuiz Pantas 20s",
        englishTitle: "Take 20s Speed Quiz",
        category: "Cabaran Minda",
        englishCategory: "Mind Challenge",
        xp: "+150 XP",
        progress: 0,
        total: 1,
        completed: false,
        icon: "⚡",
        targetView: "quizList",
        colorBadge: "bg-amber-100 text-amber-800",
    },
    {
        id: "quest_study",
        title: "Ulang Kaji Modul Nota Sains",
        englishTitle: "Review Science Notes Module",
        category: "Pembelajaran",
        englishCategory: "Learning",
        xp: "+80 XP",
        progress: 0,
        total: 1,
        completed: false,
        icon: "🌱",
        targetView: "learningList",
        colorBadge: "bg-emerald-100 text-emerald-800",
    },
];

export const STEM_SKILLS = [
    {
        name: "Astronomi & Angkasa Lepas",
        englishName: "Astronomy & Deep Space",
        score: 96,
        status: "Pakar Orbit",
        englishStatus: "Orbit Master",
        color: "from-purple-500 to-indigo-600",
        barColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
        textColor: "text-purple-600",
        bgBadge: "bg-purple-100",
        icon: "🪐",
    },
    {
        name: "Inkuiri & Kaedah Saintifik",
        englishName: "Inquiry & Scientific Method",
        score: 88,
        status: "Sangat Cemerlang",
        englishStatus: "Outstanding",
        color: "from-teal-500 to-emerald-600",
        barColor: "bg-gradient-to-r from-teal-500 to-emerald-500",
        textColor: "text-emerald-700",
        bgBadge: "bg-emerald-100",
        icon: "🔬",
    },
    {
        name: "Kepantasan Berfikir (20s Challenge)",
        englishName: "Quick Thinking (20s Challenge)",
        score: 92,
        status: "Respons Kilat",
        englishStatus: "Lightning Fast",
        color: "from-amber-400 to-orange-500",
        barColor: "bg-gradient-to-r from-amber-400 to-orange-500",
        textColor: "text-amber-700",
        bgBadge: "bg-amber-100",
        icon: "⚡",
    },
    {
        name: "Sains Hayat & Ekosistem",
        englishName: "Life Sciences & Ecosystems",
        score: 85,
        status: "Kefahaman Mantap",
        englishStatus: "Solid Mastery",
        color: "from-sky-500 to-blue-600",
        barColor: "bg-gradient-to-r from-sky-500 to-blue-500",
        textColor: "text-blue-700",
        bgBadge: "bg-sky-100",
        icon: "🌿",
    },
];

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

