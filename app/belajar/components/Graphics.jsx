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

// 10d. Graphic Gold Star Coin (Bentuk Koin Emas Khas Exploria)
export function GraphicCoin({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="expCoinOuter" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.3" stopColor="#f59e0b" />
                    <stop offset="0.7" stopColor="#d97706" />
                    <stop offset="1" stopColor="#92400e" />
                </linearGradient>
                <linearGradient id="expCoinInner" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="0.4" stopColor="#fbbf24" />
                    <stop offset="0.8" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="expCoinStar" x1="12" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#fef08a" />
                </linearGradient>
            </defs>
            {/* Outer Rim */}
            <circle cx="12" cy="12" r="10" fill="url(#expCoinOuter)" stroke="#78350f" strokeWidth="0.5" />
            {/* Inner Recessed Face */}
            <circle cx="12" cy="12" r="8.2" fill="url(#expCoinInner)" stroke="#fef9c3" strokeWidth="0.8" />
            {/* Beaded / Dotted Ring */}
            <circle cx="12" cy="12" r="6.8" stroke="#92400e" strokeWidth="0.6" strokeDasharray="1.2 0.8" opacity="0.55" />
            {/* Center Star Emblem */}
            <path
                d="M12 7.2L13.35 10.35L16.8 10.7L14.2 13L14.9 16.4L12 14.7L9.1 16.4L9.8 13L7.2 10.7L10.65 10.35L12 7.2Z"
                fill="url(#expCoinStar)"
                stroke="#b45309"
                strokeWidth="0.5"
                strokeLinejoin="round"
            />
            {/* Specular Highlight Arc */}
            <path
                d="M6 9C7.2 6.5 9.4 5.2 12 5.2C14.6 5.2 16.8 6.5 18 9C16.4 7.5 14.4 6.8 12 6.8C9.6 6.8 7.6 7.5 6 9Z"
                fill="#ffffff"
                fillOpacity="0.5"
            />
        </svg>
    );
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
        targetView: "menu",
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
   3D GAMIFIED LEVEL ILLUSTRATIONS (FOR TEROKA / LESSON FEED)
   ========================================================================= */

// 1. Level 1: Stacked Travel Suitcases & Map (Travel / Space Explorer Trunks)
export function GraphicLevelLuggage({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="luggageShadow" x1="60" y1="95" x2="60" y2="115" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#000000" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
                {/* Bottom Cyan Trunk */}
                <linearGradient id="trunkCyan" x1="20" y1="70" x2="100" y2="105" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00d2ff" />
                    <stop offset="1" stopColor="#0077b6" />
                </linearGradient>
                {/* Middle Yellow Trunk */}
                <linearGradient id="trunkOrange" x1="25" y1="45" x2="105" y2="78" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffb703" />
                    <stop offset="1" stopColor="#fb8500" />
                </linearGradient>
                {/* Top Pink Trunk */}
                <linearGradient id="trunkPink" x1="30" y1="20" x2="100" y2="52" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff758c" />
                    <stop offset="1" stopColor="#ff416c" />
                </linearGradient>
                {/* Leather Strap */}
                <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9a3412" />
                    <stop offset="1" stopColor="#7c2d12" />
                </linearGradient>
            </defs>

            {/* Cast Shadow */}
            <ellipse cx="62" cy="106" rx="42" ry="7" fill="url(#luggageShadow)" />

            {/* BOTTOM TRUNK (CYAN) */}
            <g id="bottomTrunk">
                <rect x="22" y="74" width="76" height="28" rx="6" fill="url(#trunkCyan)" stroke="#023e8a" strokeWidth="1.5" />
                <path d="M22 88H98" stroke="#0096c7" strokeWidth="1" strokeDasharray="3 2" />
                {/* Metal Lock / Buckle */}
                <rect x="56" y="84" width="8" height="8" rx="2" fill="#ffd166" stroke="#d4a373" strokeWidth="0.8" />
                <circle cx="60" cy="88" r="1.2" fill="#78350f" />
                {/* Corner Protectors */}
                <path d="M23 75H29V81H23V75Z" fill="#ffd166" />
                <path d="M91 75H97V81H91V75Z" fill="#ffd166" />
                <path d="M23 96H29V101H23V96Z" fill="#ffd166" />
                <path d="M91 96H97V101H91V96Z" fill="#ffd166" />
                {/* Dots / Rivets */}
                <circle cx="34" cy="88" r="1" fill="#ffffff" fillOpacity="0.8" />
                <circle cx="86" cy="88" r="1" fill="#ffffff" fillOpacity="0.8" />
            </g>

            {/* MIDDLE TRUNK (ORANGE / YELLOW) */}
            <g id="middleTrunk">
                <rect x="26" y="48" width="70" height="27" rx="5.5" fill="url(#trunkOrange)" stroke="#c2410c" strokeWidth="1.5" />
                <path d="M26 62H96" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
                {/* Straps */}
                <rect x="36" y="48" width="5" height="27" fill="url(#strapGrad)" />
                <rect x="80" y="48" width="5" height="27" fill="url(#strapGrad)" />
                <rect x="35" y="59" width="7" height="6" rx="1.5" fill="#ffd166" />
                <rect x="79" y="59" width="7" height="6" rx="1.5" fill="#ffd166" />
                {/* Central Handle */}
                <rect x="55" y="58" width="12" height="7" rx="2" fill="#ffd166" stroke="#92400e" strokeWidth="0.8" />
                <circle cx="61" cy="61.5" r="1" fill="#78350f" />
                {/* Travel Sticker */}
                <circle cx="70" cy="55" r="4.5" fill="#ffffff" fillOpacity="0.9" />
                <path d="M70 52L71.2 54.5L74 54.9L72 56.8L72.5 59.5L70 58.2L67.5 59.5L68 56.8L66 54.9L68.8 54.5L70 52Z" fill="#ef4444" />
            </g>

            {/* TOP TRUNK (ROSE / PINK) */}
            <g id="topTrunk">
                <rect x="30" y="24" width="60" height="25" rx="5" fill="url(#trunkPink)" stroke="#be123c" strokeWidth="1.5" />
                <path d="M30 36H90" stroke="#fda4af" strokeWidth="1" strokeDasharray="2.5 1.5" />
                {/* Handle */}
                <path d="M52 24V19C52 17.5 54 16.5 56 16.5H64C66 16.5 68 17.5 68 19V24" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
                <rect x="50" y="22" width="4" height="4" rx="1" fill="#ffd166" />
                <rect x="66" y="22" width="4" height="4" rx="1" fill="#ffd166" />
                {/* Center Lock */}
                <rect x="56" y="33" width="8" height="6" rx="1.5" fill="#ffd166" stroke="#9f1239" strokeWidth="0.7" />
                <circle cx="60" cy="36" r="0.9" fill="#881337" />
            </g>

            {/* FOLDED MAP ON TOP */}
            <g id="mapOnTop" transform="translate(68, 12) rotate(14)">
                <polygon points="0,0 26,2 24,16 -2,14" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
                <line x1="8" y1="1" x2="6" y2="15" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 1" />
                <line x1="17" y1="2" x2="15" y2="16" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 1" />
                <circle cx="12" cy="7" r="2.2" fill="#f43f5e" />
                <path d="M12 9.2L12 11" stroke="#f43f5e" strokeWidth="1.2" />
            </g>

            {/* Sparkles */}
            <path d="M18 42L19.5 46L23.5 47.5L19.5 49L18 53L16.5 49L12.5 47.5L16.5 46L18 42Z" fill="#fef08a" />
            <path d="M100 32L101 35L104 36L101 37L100 40L99 37L96 36L99 35L100 32Z" fill="#fef08a" />
        </svg>
    );
}

// 2. Level 2: 3D Striped Hot Air Balloon & Puffy Clouds
export function GraphicLevelBalloon({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="balloonMain" x1="30" y1="10" x2="90" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff7849" />
                    <stop offset="0.5" stopColor="#ffc837" />
                    <stop offset="1" stopColor="#ff3366" />
                </linearGradient>
                <linearGradient id="stripeYellow" x1="50" y1="10" x2="70" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffe600" />
                    <stop offset="1" stopColor="#ff9f1c" />
                </linearGradient>
                <linearGradient id="stripeBlue" x1="30" y1="20" x2="60" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f2fe" />
                    <stop offset="1" stopColor="#4facfe" />
                </linearGradient>
                <linearGradient id="cloudWhite" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="1" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="basketGrad" x1="50" y1="88" x2="70" y2="102" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#d4a373" />
                    <stop offset="1" stopColor="#a9714b" />
                </linearGradient>
            </defs>

            {/* Background Clouds */}
            <path d="M15 82C15 78 18 75 22 75C23.5 75 24.8 75.5 25.8 76.4C27.5 73.7 30.5 72 34 72C39 72 43 75.5 43.8 80.2C45.2 80.4 46.5 81.3 47 82.8C47.8 85.2 46 88 43.5 88H18C16.3 88 15 86.7 15 85V82Z" fill="url(#cloudWhite)" opacity="0.9" />

            {/* BALLOON CANOPY */}
            <g id="hotAirBalloon">
                {/* Outer Canopy Shape */}
                <path d="M60 8C40 8 28 24 28 44C28 58 40 72 52 79L54 82H66L68 79C80 72 92 58 92 44C92 24 80 8 60 8Z" fill="url(#balloonMain)" stroke="#ea580c" strokeWidth="1.2" />

                {/* Central Stripe (Yellow) */}
                <path d="M60 8C54 8 50 24 50 44C50 58 55 72 60 82C65 72 70 58 70 44C70 24 66 8 60 8Z" fill="url(#stripeYellow)" />

                {/* Center Core Stripe (Cyan / Blue) */}
                <path d="M60 8C57 8 55 24 55 44C55 58 58 72 60 82C62 72 65 58 65 44C65 24 63 8 60 8Z" fill="url(#stripeBlue)" opacity="0.85" />

                {/* Highlight Arc on Balloon */}
                <path d="M38 20C44 14 52 11 60 11" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />

                {/* Burner / Collar */}
                <rect x="53" y="82" width="14" height="3" rx="1.5" fill="#dc2626" />

                {/* Ropes to Basket */}
                <line x1="54" y1="85" x2="52" y2="92" stroke="#78350f" strokeWidth="1.2" />
                <line x1="60" y1="85" x2="57" y2="92" stroke="#78350f" strokeWidth="1" />
                <line x1="60" y1="85" x2="63" y2="92" stroke="#78350f" strokeWidth="1" />
                <line x1="66" y1="85" x2="68" y2="92" stroke="#78350f" strokeWidth="1.2" />

                {/* Basket */}
                <rect x="50" y="92" width="20" height="13" rx="3.5" fill="url(#basketGrad)" stroke="#78350f" strokeWidth="1" />
                <line x1="50" y1="96" x2="70" y2="96" stroke="#78350f" strokeWidth="0.8" />
                <line x1="50" y1="100" x2="70" y2="100" stroke="#78350f" strokeWidth="0.8" />
                <line x1="55" y1="92" x2="55" y2="105" stroke="#78350f" strokeWidth="0.8" />
                <line x1="60" y1="92" x2="60" y2="105" stroke="#78350f" strokeWidth="0.8" />
                <line x1="65" y1="92" x2="65" y2="105" stroke="#78350f" strokeWidth="0.8" />
            </g>

            {/* Foreground Fluffy Cloud Overlay */}
            <path d="M72 80C72 74 77 69 83 69C85.5 69 87.7 70 89.4 71.6C91.5 68.5 95.2 66.5 99.5 66.5C106 66.5 111.5 71.5 112 78C114 78.5 116 80.5 116 83C116 86 113.5 88.5 110.5 88.5H76C73.8 88.5 72 86.7 72 84.5V80Z" fill="url(#cloudWhite)" stroke="#e0f2fe" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />

            {/* Tiny Background Hot Air Balloon */}
            <g transform="translate(18, 28) scale(0.35)">
                <path d="M60 8C40 8 28 24 28 44C28 58 40 72 52 79L54 82H66L68 79C80 72 92 58 92 44C92 24 80 8 60 8Z" fill="#ff758c" />
                <rect x="52" y="88" width="16" height="10" rx="3" fill="#a9714b" />
            </g>
        </svg>
    );
}

// 3. Level 3: 3D Yellow Camera with Polaroids & Globe
export function GraphicLevelCamera({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Yellow Camera Gradient */}
                <linearGradient id="cameraYellow" x1="20" y1="35" x2="85" y2="95" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffea00" />
                    <stop offset="0.7" stopColor="#ffc107" />
                    <stop offset="1" stopColor="#ff9800" />
                </linearGradient>
                {/* Lens Outer Rim */}
                <linearGradient id="lensOuter" x1="38" y1="46" x2="74" y2="82" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#374151" />
                    <stop offset="1" stopColor="#111827" />
                </linearGradient>
                {/* Lens Glass Reflection */}
                <linearGradient id="lensGlass" x1="42" y1="50" x2="70" y2="78" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.5" stopColor="#1e3a8a" />
                    <stop offset="1" stopColor="#0f172a" />
                </linearGradient>
                {/* Globe Gradient */}
                <linearGradient id="globeOcean" x1="75" y1="18" x2="105" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#0284c7" />
                </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="60" cy="104" rx="40" ry="7" fill="#000000" fillOpacity="0.22" />

            {/* MINI EARTH GLOBE (BEHIND CAMERA) */}
            <g id="miniGlobe" transform="translate(68, 12)">
                <circle cx="20" cy="20" r="18" fill="url(#globeOcean)" stroke="#0369a1" strokeWidth="1.2" />
                {/* Continents */}
                <path d="M12 14C14 10 18 10 22 13C25 15 28 12 30 14C31 16 28 20 24 21C20 22 17 25 15 28C13 28 10 24 9 20C9 17 11 15 12 14Z" fill="#4ade80" />
                <path d="M22 28C25 26 29 27 32 30C34 32 32 35 30 36C26 36 24 33 22 28Z" fill="#4ade80" />
                {/* Orbit Arc & Airplane */}
                <path d="M2 24C4 10 24 2 36 12" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M5 22L7 17L11 18L9 21L13 22L12 24L5 22Z" fill="#ffffff" />
            </g>

            {/* POLAROID PHOTO 1 (BEHIND CAMERA) */}
            <g id="polaroidBack" transform="translate(64, 42) rotate(16)">
                <rect x="0" y="0" width="28" height="34" rx="2.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))" />
                <rect x="2.5" y="2.5" width="23" height="21" rx="1.5" fill="#38bdf8" />
                {/* Mini landscape */}
                <path d="M2.5 17L9 11L16 18L21 14L25.5 19V23.5H2.5V17Z" fill="#10b981" />
                <circle cx="19" cy="7" r="2.2" fill="#fbbf24" />
            </g>

            {/* 3D CAMERA BODY */}
            <g id="cameraBody">
                {/* Main Body */}
                <rect x="18" y="38" width="70" height="58" rx="14" fill="url(#cameraYellow)" stroke="#d97706" strokeWidth="1.8" />

                {/* Top Shutter Button (Red) */}
                <rect x="28" y="32" width="11" height="7" rx="3.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />

                {/* Top Flash Mound */}
                <path d="M62 38V34C62 32.5 64 31.5 66 31.5H74C76 31.5 78 32.5 78 34V38" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                <rect x="65" y="34" width="9" height="4" rx="1.5" fill="#ffffff" fillOpacity="0.85" />

                {/* Viewfinder Window */}
                <rect x="70" y="44" width="10" height="8" rx="2.5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <circle cx="75" cy="48" r="1.5" fill="#38bdf8" />

                {/* Selfie Mirror / Indicator */}
                <circle cx="32" cy="48" r="3.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />

                {/* BIG 3D LENS */}
                <circle cx="53" cy="67" r="23" fill="url(#lensOuter)" stroke="#0f172a" strokeWidth="2" />
                <circle cx="53" cy="67" r="19" fill="#1f2937" stroke="#475569" strokeWidth="1" />
                <circle cx="53" cy="67" r="15" fill="url(#lensGlass)" />
                <circle cx="53" cy="67" r="10" fill="#0b1329" />

                {/* Glass Reflection Arc */}
                <path d="M43 60C46 56 50 54 55 54" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.85" />
                <circle cx="61" cy="73" r="1.5" fill="#ffffff" fillOpacity="0.6" />

                {/* Camera Stripe Detail */}
                <path d="M19 82H87" stroke="#f59e0b" strokeWidth="2.5" />
            </g>

            {/* Sparkle Stars */}
            <path d="M12 36L13.5 39.5L17 41L13.5 42.5L12 46L10.5 42.5L7 41L10.5 39.5L12 36Z" fill="#fef08a" />
        </svg>
    );
}

// 4. Level 4: 3D Champion Trophy Cup with Laurel & Stars
export function GraphicLevelTrophy({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldCup" x1="30" y1="15" x2="90" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fff3b0" />
                    <stop offset="0.3" stopColor="#ffd166" />
                    <stop offset="0.8" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="pedestalGrad" x1="40" y1="80" x2="80" y2="108" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#374151" />
                    <stop offset="1" stopColor="#111827" />
                </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="60" cy="106" rx="38" ry="6" fill="#000000" fillOpacity="0.22" />

            {/* TROPHY CUP */}
            <g id="trophyCup">
                {/* Handles (Left & Right) */}
                <path d="M40 32C24 32 22 48 34 54C38 56 42 56 44 54" stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                <path d="M40 32C24 32 22 48 34 54C38 56 42 56 44 54" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" fill="none" />

                <path d="M80 32C96 32 98 48 86 54C82 56 78 56 76 54" stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                <path d="M80 32C96 32 98 48 86 54C82 56 78 56 76 54" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" fill="none" />

                {/* Cup Body */}
                <path d="M36 20H84V42C84 57 73 69 60 69C47 69 36 57 36 42V20Z" fill="url(#goldCup)" stroke="#b45309" strokeWidth="1.5" />

                {/* Lip / Rim on Top */}
                <ellipse cx="60" cy="20" rx="24" ry="4.5" fill="#ffea00" stroke="#b45309" strokeWidth="1" />
                <ellipse cx="60" cy="20" rx="20" ry="3" fill="#fff3b0" />

                {/* Embossed Star on Cup */}
                <path d="M60 32L62.5 39.5L70 40.5L64.5 45.5L66 53L60 49L54 53L55.5 45.5L50 40.5L57.5 39.5L60 32Z" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))" />

                {/* Cup Stem */}
                <path d="M54 69H66V82C66 84 62 85 60 85C58 85 54 84 54 82V69Z" fill="url(#goldCup)" stroke="#b45309" strokeWidth="1" />
                <ellipse cx="60" cy="84" rx="14" ry="3" fill="#f59e0b" />

                {/* Pedestal Base */}
                <path d="M44 87H76L80 102H40L44 87Z" fill="url(#pedestalGrad)" stroke="#1f2937" strokeWidth="1.5" />
                <rect x="48" y="91" width="24" height="8" rx="1.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
                <line x1="51" y1="95" x2="69" y2="95" stroke="#92400e" strokeWidth="1" strokeDasharray="2 1" />
            </g>

            {/* Laurel Leaves (Left & Right) */}
            <g id="laurelWreath" opacity="0.95">
                <ellipse cx="26" cy="40" rx="4" ry="2.2" fill="#22c55e" transform="rotate(-30 26 40)" />
                <ellipse cx="28" cy="48" rx="4" ry="2.2" fill="#22c55e" transform="rotate(-15 28 48)" />
                <ellipse cx="32" cy="56" rx="4" ry="2.2" fill="#22c55e" transform="rotate(10 32 56)" />

                <ellipse cx="94" cy="40" rx="4" ry="2.2" fill="#22c55e" transform="rotate(30 94 40)" />
                <ellipse cx="92" cy="48" rx="4" ry="2.2" fill="#22c55e" transform="rotate(15 92 48)" />
                <ellipse cx="88" cy="56" rx="4" ry="2.2" fill="#22c55e" transform="rotate(-10 88 56)" />
            </g>

            {/* Floating Sparkles & Confetti */}
            <path d="M22 18L23.5 21.5L27 23L23.5 24.5L22 28L20.5 24.5L17 23L20.5 21.5L22 18Z" fill="#fef08a" />
            <path d="M98 16L99.5 19.5L103 21L99.5 22.5L98 26L96.5 22.5L93 21L96.5 19.5L98 16Z" fill="#fef08a" />
            <circle cx="16" cy="34" r="1.8" fill="#f43f5e" />
            <circle cx="104" cy="34" r="1.8" fill="#38bdf8" />
        </svg>
    );
}

// 5. 3D Spelling Bee (Glossy Cute Bumblebee with Translucent Wings & Sparkles)
export function GraphicLevelBee({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="beeBody" x1="30" y1="35" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.3" stopColor="#facc15" />
                    <stop offset="0.75" stopColor="#eab308" />
                    <stop offset="1" stopColor="#ca8a04" />
                </linearGradient>
                <linearGradient id="wingGradLeft" x1="15" y1="20" x2="48" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="0.5" stopColor="#e0f2fe" stopOpacity="0.75" />
                    <stop offset="1" stopColor="#38bdf8" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="wingGradRight" x1="105" y1="20" x2="72" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="0.5" stopColor="#e0f2fe" stopOpacity="0.75" />
                    <stop offset="1" stopColor="#38bdf8" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="stripeGrad" x1="40" y1="40" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#374151" />
                    <stop offset="1" stopColor="#111827" />
                </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="60" cy="104" rx="34" ry="6" fill="#000000" fillOpacity="0.2" />

            {/* WINGS (Translucent glossy wings in background) */}
            <g id="beeWings">
                {/* Left Wings */}
                <ellipse cx="36" cy="38" rx="16" ry="24" transform="rotate(-32 36 38)" fill="url(#wingGradLeft)" stroke="#bae6fd" strokeWidth="1.2" />
                <ellipse cx="28" cy="48" rx="11" ry="16" transform="rotate(-40 28 48)" fill="url(#wingGradLeft)" stroke="#bae6fd" strokeWidth="1" />
                <path d="M36 30C36 40 38 48 44 54" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

                {/* Right Wings */}
                <ellipse cx="84" cy="38" rx="16" ry="24" transform="rotate(32 84 38)" fill="url(#wingGradRight)" stroke="#bae6fd" strokeWidth="1.2" />
                <ellipse cx="92" cy="48" rx="11" ry="16" transform="rotate(40 92 48)" fill="url(#wingGradRight)" stroke="#bae6fd" strokeWidth="1" />
                <path d="M84 30C84 40 82 48 76 54" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            </g>

            {/* BEE BODY */}
            <g id="beeBodyGroup">
                {/* Main Body Oval */}
                <ellipse cx="60" cy="62" rx="28" ry="32" fill="url(#beeBody)" stroke="#ca8a04" strokeWidth="1.5" />

                {/* Black Stripes */}
                <path d="M34 54C42 51 78 51 86 54C87 59 86 64 85 66C77 63 43 63 35 66C34 62 33 58 34 54Z" fill="url(#stripeGrad)" />
                <path d="M37 72C44 69 76 69 83 72C80 77 77 82 72 86C68 85 52 85 48 86C43 82 40 77 37 72Z" fill="url(#stripeGrad)" />

                {/* Stinger at bottom */}
                <path d="M57 93L60 99L63 93Z" fill="#1f2937" />

                {/* Cute Glossy Eyes */}
                <ellipse cx="50" cy="44" rx="4.5" ry="6" fill="#1f2937" />
                <circle cx="48.5" cy="42" r="2" fill="#ffffff" />
                <circle cx="51.5" cy="46" r="0.8" fill="#ffffff" />

                <ellipse cx="70" cy="44" rx="4.5" ry="6" fill="#1f2937" />
                <circle cx="68.5" cy="42" r="2" fill="#ffffff" />
                <circle cx="71.5" cy="46" r="0.8" fill="#ffffff" />

                {/* Cheerful Smile & Rosy Cheeks */}
                <path d="M56 50Q60 54 64 50" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <circle cx="43" cy="49" r="2.8" fill="#f43f5e" opacity="0.5" />
                <circle cx="77" cy="49" r="2.8" fill="#f43f5e" opacity="0.5" />

                {/* Antennae */}
                <path d="M52 32Q48 20 40 18" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="39" cy="18" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />

                <path d="M68 32Q72 20 80 18" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="81" cy="18" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />

                {/* Highlights / 3D Specular reflection */}
                <ellipse cx="44" cy="40" rx="4" ry="8" transform="rotate(-25 44 40)" fill="#ffffff" opacity="0.45" />
            </g>

            {/* Sparkles */}
            <path d="M20 24L21.5 27.5L25 29L21.5 30.5L20 34L18.5 30.5L15 29L18.5 27.5L20 24Z" fill="#fef08a" />
            <path d="M100 24L101.5 27.5L105 29L101.5 30.5L100 34L98.5 30.5L95 29L98.5 27.5L100 24Z" fill="#fef08a" />
        </svg>
    );
}

// 6. 3D Solar System & Orbiting Planets (Saturn with Rings, Orbiting Earth & Mars, Stars)
export function GraphicLevelPlanets({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="saturnBody3D" x1="30" y1="28" x2="90" y2="88" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.3" stopColor="#f59e0b" />
                    <stop offset="0.75" stopColor="#ea580c" />
                    <stop offset="1" stopColor="#9a3412" />
                </linearGradient>
                <linearGradient id="saturnRing3D" x1="10" y1="45" x2="110" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde68a" />
                    <stop offset="0.4" stopColor="#fbbf24" />
                    <stop offset="0.7" stopColor="#d97706" />
                    <stop offset="1" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="earthBody3D" x1="16" y1="18" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.5" stopColor="#0284c7" />
                    <stop offset="1" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="marsBody3D" x1="88" y1="78" x2="108" y2="98" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f87171" />
                    <stop offset="0.6" stopColor="#dc2626" />
                    <stop offset="1" stopColor="#7f1d1d" />
                </linearGradient>
            </defs>

            {/* Ambient Shadow */}
            <ellipse cx="60" cy="106" rx="38" ry="7" fill="#000000" fillOpacity="0.22" />

            {/* Orbit paths (Elliptical Dashed Rings) */}
            <ellipse cx="60" cy="58" rx="52" ry="24" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" transform="rotate(-16 60 58)" />

            {/* SATURN RING (BACK HALF) */}
            <path
                d="M14 54C18 42 66 32 102 44C108 46 109 50 104 53C96 44 56 38 22 47C16 49 13 52 14 54Z"
                fill="url(#saturnRing3D)"
                opacity="0.7"
                transform="rotate(-18 60 58)"
            />

            {/* MAIN SATURN GLOBE */}
            <circle cx="60" cy="58" r="26" fill="url(#saturnBody3D)" stroke="#ca8a04" strokeWidth="0.8" />

            {/* Atmospheric Cloud Bands on Saturn */}
            <path d="M37 53C47 50 73 50 83 53C81 56 79 58 77 60C69 57 51 57 43 60C41 58 39 56 37 53Z" fill="#fed7aa" opacity="0.45" />
            <path d="M40 64C48 62 72 62 80 64C78 67 75 70 71 73C65 70 55 70 49 73C45 70 42 67 40 64Z" fill="#7c2d12" opacity="0.35" />

            {/* Specular Highlight on Saturn */}
            <ellipse cx="50" cy="45" rx="7" ry="4" transform="rotate(-30 50 45)" fill="#ffffff" opacity="0.55" />

            {/* SATURN RING (FRONT HALF) */}
            <path
                d="M12 55C18 69 72 78 106 63C111 61 109 56 103 54C75 67 36 62 18 50C13 48 11 52 12 55Z"
                fill="url(#saturnRing3D)"
                stroke="#d97706"
                strokeWidth="0.8"
                transform="rotate(-18 60 58)"
            />
            {/* Ring Shadow on Body */}
            <path d="M35 56C47 59 73 59 85 56C84 59 83 61 82 62C72 65 48 65 38 62C37 61 36 59 35 56Z" fill="#000000" opacity="0.25" />

            {/* ORBITING EARTH (Mini Planet Top Left) */}
            <g id="miniEarth" className="drop-shadow-md">
                <circle cx="26" cy="26" r="10" fill="url(#earthBody3D)" stroke="#38bdf8" strokeWidth="0.8" />
                <path d="M22 24C24 22 28 23 29 26C27 28 25 29 23 28Z" fill="#22c55e" opacity="0.85" />
                <path d="M27 30C29 29 32 31 31 33C29 34 27 33 27 30Z" fill="#22c55e" opacity="0.85" />
                <circle cx="23" cy="23" r="1.5" fill="#ffffff" opacity="0.75" />
            </g>

            {/* ORBITING MARS (Mini Red Planet Bottom Right) */}
            <g id="miniMars" className="drop-shadow-md">
                <circle cx="98" cy="88" r="7.5" fill="url(#marsBody3D)" stroke="#f87171" strokeWidth="0.6" />
                <circle cx="96" cy="86" r="1.2" fill="#ffffff" opacity="0.75" />
            </g>

            {/* SPARKLES & STARS */}
            <path d="M16 48L17.5 51.5L21 53L17.5 54.5L16 58L14.5 54.5L11 53L14.5 51.5L16 48Z" fill="#fef08a" />
            <path d="M96 22L97.5 25.5L101 27L97.5 28.5L96 32L94.5 28.5L91 27L94.5 25.5L96 22Z" fill="#fef08a" />
            <circle cx="48" cy="14" r="1.5" fill="#ffffff" opacity="0.9" />
            <circle cx="82" cy="18" r="2" fill="#fde047" opacity="0.9" />
            <circle cx="88" cy="40" r="1.2" fill="#ffffff" opacity="0.8" />
        </svg>
    );
}

// 7. 3D Photosynthesis & Botany Plant Sprout (Golden Sun, Emerald Leaves, Dewdrop)
export function GraphicLevelPlantSprout({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sunGrad3D" x1="60" y1="12" x2="105" y2="58" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.4" stopColor="#fde047" />
                    <stop offset="0.8" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="leafMain3D" x1="30" y1="35" x2="85" y2="95" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6ee7b7" />
                    <stop offset="0.3" stopColor="#10b981" />
                    <stop offset="0.75" stopColor="#059669" />
                    <stop offset="1" stopColor="#065f46" />
                </linearGradient>
                <linearGradient id="leafSecond3D" x1="18" y1="45" x2="65" y2="95" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a7f3d0" />
                    <stop offset="0.3" stopColor="#34d399" />
                    <stop offset="0.75" stopColor="#059669" />
                    <stop offset="1" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="stemGrad3D" x1="55" y1="60" x2="68" y2="105" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34d399" />
                    <stop offset="0.5" stopColor="#059669" />
                    <stop offset="1" stopColor="#064e3b" />
                </linearGradient>
                <linearGradient id="dewDropGrad" x1="68" y1="46" x2="78" y2="58" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.5" stopColor="#bae6fd" />
                    <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
            </defs>

            {/* Ambient Shadow */}
            <ellipse cx="60" cy="106" rx="36" ry="6.5" fill="#000000" fillOpacity="0.22" />

            {/* GLOWING BACKGROUND SUN (Photosynthesis Energy Source) */}
            <g id="sunBackdrop">
                <circle cx="82" cy="34" r="22" fill="url(#sunGrad3D)" opacity="0.95" />
                <path d="M82 6V11M82 57V62M54 34H59M105 34H110M62 14L66 18M98 50L102 54M62 54L66 50M98 18L102 14" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <circle cx="76" cy="28" r="3.5" fill="#ffffff" opacity="0.6" />
            </g>

            {/* PLANT STEM */}
            <path d="M58 104C58 88 56 74 62 62" stroke="url(#stemGrad3D)" strokeWidth="6" strokeLinecap="round" />

            {/* LEFT LEAF */}
            <g id="leftLeaf">
                <path d="M60 76C42 74 24 64 22 46C38 44 56 56 60 76Z" fill="url(#leafSecond3D)" stroke="#047857" strokeWidth="1" />
                <path d="M24 48C34 54 48 64 58 74" stroke="#d1fae5" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
                <path d="M36 55C34 58 32 62 30 64" stroke="#d1fae5" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                <path d="M46 62C45 66 43 69 41 72" stroke="#d1fae5" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                <path d="M26 47C36 45 48 52 52 60" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            </g>

            {/* RIGHT MAIN LEAF WITH MORNING DEWDROP */}
            <g id="rightLeaf">
                <path d="M60 68C68 46 88 34 98 42C100 58 82 78 60 68Z" fill="url(#leafMain3D)" stroke="#065f46" strokeWidth="1.2" />
                <path d="M96 44C86 52 72 60 62 67" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <path d="M86 52C87 56 89 60 91 63" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                <path d="M76 58C77 62 79 66 81 69" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                <path d="M88 43C78 43 68 50 64 58" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

                {/* MORNING DEWDROP */}
                <circle cx="78" cy="52" r="4.2" fill="url(#dewDropGrad)" stroke="#38bdf8" strokeWidth="0.6" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))" />
                <circle cx="76.8" cy="50.5" r="1.3" fill="#ffffff" />
            </g>

            {/* PHOTOSYNTHESIS BUBBLES */}
            <circle cx="48" cy="36" r="3.2" fill="#67e8f9" opacity="0.85" />
            <circle cx="47" cy="35" r="1" fill="#ffffff" />
            <circle cx="34" cy="30" r="2.2" fill="#a7f3d0" opacity="0.85" />
            <circle cx="68" cy="88" r="2.5" fill="#fde047" opacity="0.7" />

            {/* Sparkles */}
            <path d="M18 26L19.5 29.5L23 31L19.5 32.5L18 36L16.5 32.5L13 31L16.5 29.5L18 26Z" fill="#fef08a" />
            <path d="M98 76L99.5 79.5L103 81L99.5 82.5L98 86L96.5 82.5L93 81L96.5 79.5L98 76Z" fill="#fef08a" />
        </svg>
    );
}

// 8. 3D Space Rocket (Sleek red/white rocket with thruster flame & stars)
export function GraphicLevelRocket({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="rocketBody3D" x1="45" y1="20" x2="85" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffffff" />
                    <stop offset="0.6" stopColor="#e2e8f0" />
                    <stop offset="1" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="rocketNose3D" x1="50" y1="12" x2="70" y2="35" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff4b6e" />
                    <stop offset="1" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="flameGrad3D" x1="45" y1="80" x2="75" y2="110" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.4" stopColor="#f97316" />
                    <stop offset="1" stopColor="#dc2626" />
                </linearGradient>
            </defs>
            <ellipse cx="60" cy="106" rx="30" ry="6" fill="#000000" fillOpacity="0.2" />
            {/* Flames */}
            <path d="M52 82C48 94 56 108 60 112C64 108 72 94 68 82Z" fill="url(#flameGrad3D)" />
            <path d="M56 82C54 90 58 98 60 102C62 98 66 90 64 82Z" fill="#fef08a" />
            {/* Fins */}
            <path d="M42 66L32 82C40 84 48 78 48 74Z" fill="url(#rocketNose3D)" />
            <path d="M78 66L88 82C80 84 72 78 72 74Z" fill="url(#rocketNose3D)" />
            {/* Main Rocket Body */}
            <path d="M60 14C52 24 46 48 46 82H74C74 48 68 24 60 14Z" fill="url(#rocketBody3D)" stroke="#cbd5e1" strokeWidth="1" />
            {/* Nose Cone */}
            <path d="M60 14C56 20 52 30 50 36H70C68 30 64 20 60 14Z" fill="url(#rocketNose3D)" />
            {/* Porthole Window */}
            <circle cx="60" cy="50" r="9" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="60" cy="50" r="6.5" fill="#38bdf8" />
            <circle cx="62" cy="48" r="2" fill="#ffffff" />
            {/* Sparkles */}
            <path d="M22 28L23.5 31.5L27 33L23.5 34.5L22 38L20.5 34.5L17 33L20.5 31.5L22 28Z" fill="#fef08a" />
            <path d="M96 44L97.5 47.5L101 49L97.5 50.5L96 54L94.5 50.5L91 49L94.5 47.5L96 44Z" fill="#fef08a" />
        </svg>
    );
}

// 9. 3D Energy & Physics Lightbulb / Lightning
export function GraphicLevelEnergy({ className = "w-28 h-28" }) {
    return (
        <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="energyBulb3D" x1="35" y1="20" x2="85" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.5" stopColor="#facc15" />
                    <stop offset="1" stopColor="#f59e0b" />
                </linearGradient>
            </defs>
            <ellipse cx="60" cy="106" rx="30" ry="6" fill="#000000" fillOpacity="0.2" />
            {/* Glow Aura */}
            <circle cx="60" cy="50" r="34" fill="#fef08a" opacity="0.3" filter="blur(6px)" />
            {/* Bulb Glass */}
            <path d="M60 16C42 16 34 32 34 48C34 60 44 70 48 80H72C76 70 86 60 86 48C86 32 78 16 60 16Z" fill="url(#energyBulb3D)" stroke="#eab308" strokeWidth="1.2" />
            {/* Specular */}
            <path d="M44 28C50 22 58 20 64 20" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            {/* Filament */}
            <path d="M52 54L58 40L62 48L68 36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Screw Base */}
            <rect x="50" y="80" width="20" height="5" rx="1.5" fill="#94a3b8" />
            <rect x="51" y="85" width="18" height="5" rx="1.5" fill="#64748b" />
            <rect x="52" y="90" width="16" height="5" rx="1.5" fill="#475569" />
            <path d="M54 95H66L63 100H57L54 95Z" fill="#334155" />
            {/* Sparkles */}
            <path d="M18 36L19.5 39.5L23 41L19.5 42.5L18 46L16.5 42.5L13 41L16.5 39.5L18 36Z" fill="#fef08a" />
            <path d="M100 36L101.5 39.5L105 41L101.5 42.5L100 46L98.5 42.5L95 41L98.5 39.5L100 36Z" fill="#fef08a" />
        </svg>
    );
}

// Helper Pintar: Pilih Ilustrasi 3D Sesuai dengan Tajuk / Kategori / Grafik Pilihan Modul
export function getTopicIllustration(topic) {
    const iconKey = (topic?.graphicType || topic?.icon || "").toLowerCase();
    if (iconKey === "planet" || iconKey === "suria") return <GraphicLevelPlanets className="w-full h-full" />;
    if (iconKey === "plant" || iconKey === "tumbuhan" || iconKey === "fotosintesis") return <GraphicLevelPlantSprout className="w-full h-full" />;
    if (iconKey === "rocket" || iconKey === "roket") return <GraphicLevelRocket className="w-full h-full" />;
    if (iconKey === "energy" || iconKey === "tenaga" || iconKey === "elektrik") return <GraphicLevelEnergy className="w-full h-full" />;

    // Padanan Pintar Mengikut Kandungan Tajuk & Kategori
    const text = `${topic?.title || ""} ${topic?.shortTitle || ""} ${topic?.category || ""} ${topic?.id || ""}`.toLowerCase();
    if (text.includes("suria") || text.includes("planet") || text.includes("solar") || text.includes("marikh") || text.includes("bumi") || text.includes("astronomi")) {
        return <GraphicLevelPlanets className="w-full h-full" />;
    }
    if (text.includes("fotosintesis") || text.includes("tumbuhan") || text.includes("alam") || text.includes("pokok") || text.includes("daun") || text.includes("biologi") || text.includes("plant")) {
        return <GraphicLevelPlantSprout className="w-full h-full" />;
    }
    if (text.includes("roket") || text.includes("rocket") || text.includes("angkasa") || text.includes("bulan")) {
        return <GraphicLevelRocket className="w-full h-full" />;
    }
    if (text.includes("tenaga") || text.includes("elektrik") || text.includes("cahaya") || text.includes("fizik") || text.includes("kuasa")) {
        return <GraphicLevelEnergy className="w-full h-full" />;
    }

    // Lalai: Buku Sains
    return <GraphicScienceBook className="w-20 h-20 sm:w-24 sm:h-24" />;
}



