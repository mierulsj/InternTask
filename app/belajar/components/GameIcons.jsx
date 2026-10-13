"use client";

import React from "react";

/* =========================================================================
   CUSTOM VECTOR ICONS (100% SVG - NO SYSTEM EMOJIS)
   Dihasilkan khusus untuk Exploria STEM: Bersih, Minimalis & Vektor Penuh
   ========================================================================= */

// --- 1. ORNAMENT ICONS UNTUK BORDER ALA MOBILE LEGENDS ---

export function VectorCrown({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M3 18L5 8L9.5 13L12 5L14.5 13L19 8L21 18H3Z"
                fill="url(#crownGrad)"
                stroke="#d97706"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="5" r="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
            <circle cx="5" cy="8" r="1.2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
            <circle cx="19" cy="8" r="1.2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
            <rect x="4" y="17" width="16" height="2.5" rx="1" fill="#b45309" />
            <defs>
                <linearGradient id="crownGrad" x1="12" y1="5" x2="12" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorLightning({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
                fill="url(#cyanBoltGrad)"
                stroke="#67e8f9"
                strokeWidth="1"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient id="cyanBoltGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a5f3fc" />
                    <stop offset="0.6" stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#0284c7" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorFlame({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M12 2C10 5 7 8 7 12C7 15.87 9.69 19 13 19C16.31 19 19 16.31 19 13C19 8 15 5 12 2Z"
                fill="url(#flameOuterGrad)"
            />
            <path
                d="M12 9C10.5 11 9 13 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13 13.5 11 12 9Z"
                fill="#fef08a"
            />
            <defs>
                <linearGradient id="flameOuterGrad" x1="12" y1="2" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fbbf24" />
                    <stop offset="0.5" stopColor="#f97316" />
                    <stop offset="1" stopColor="#dc2626" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorIce({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2V22M2 12H22M5 5L19 19M5 19L19 5" stroke="#38bdf8" />
            <circle cx="12" cy="12" r="2.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
            <path d="M12 6L10 8M12 6L14 8M12 18L10 16M12 18L14 16M6 12L8 10M6 12L8 14M18 12L16 10M18 12L16 14" stroke="#7dd3fc" strokeWidth="1.2" />
        </svg>
    );
}

export function VectorGem({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M6 3H18L22 9L12 22L2 9L6 3Z" fill="url(#gemGrad)" stroke="#10b981" strokeWidth="1" />
            <path d="M2 9H22M12 22L7 9L10 3M12 22L17 9L14 3" stroke="#a7f3d0" strokeWidth="0.8" strokeOpacity="0.8" />
            <defs>
                <linearGradient id="gemGrad" x1="12" y1="3" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6ee7b7" />
                    <stop offset="0.6" stopColor="#10b981" />
                    <stop offset="1" stopColor="#047857" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorLeaf({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M20 4C14 4 6 8 6 15C6 18.31 8.69 21 12 21C19 21 21 13 21 4H20Z"
                fill="url(#leafGrad)"
                stroke="#059669"
                strokeWidth="1"
            />
            <path d="M6 21C11 16 14 12 20 4" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" />
            <defs>
                <linearGradient id="leafGrad" x1="20" y1="4" x2="6" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34d399" />
                    <stop offset="1" stopColor="#059669" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorPlanet({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="6" fill="url(#planetGrad)" stroke="#a855f7" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#e879f9" strokeWidth="1.4" transform="rotate(-20 12 12)" />
            <defs>
                <linearGradient id="planetGrad" x1="8" y1="8" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c084fc" />
                    <stop offset="1" stopColor="#7e22ce" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorStar({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="url(#starGrad)"
                stroke="#fbbf24"
                strokeWidth="1"
            />
            <defs>
                <linearGradient id="starGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#b45309" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorRivet({ className = "w-3 h-3" }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="3" fill="#475569" />
            <circle cx="6.5" cy="6.5" r="1" fill="#ffffff" fillOpacity="0.8" />
        </svg>
    );
}

export function VectorWingsLeft({ className = "w-3.5 h-3.5" }) {
    return (
        <svg className={className} viewBox="0 0 16 20" fill="none">
            <path
                d="M15 10C10 7 4 4 1 1C2 6 3 11 1 18C5 15 10 13 15 10Z"
                fill="url(#wingGrad)"
                stroke="#f59e0b"
                strokeWidth="0.8"
            />
            <defs>
                <linearGradient id="wingGrad" x1="0" y1="0" x2="15" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorWingsRight({ className = "w-3.5 h-3.5" }) {
    return (
        <svg className={className} viewBox="0 0 16 20" fill="none" style={{ transform: "scaleX(-1)" }}>
            <path
                d="M15 10C10 7 4 4 1 1C2 6 3 11 1 18C5 15 10 13 15 10Z"
                fill="url(#wingGrad2)"
                stroke="#f59e0b"
                strokeWidth="0.8"
            />
            <defs>
                <linearGradient id="wingGrad2" x1="0" y1="0" x2="15" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="1" stopColor="#d97706" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// --- MLBB HIGH-TIER ORNAMENTS (ALA MOBILE LEGENDS BANG BANG) ---

// 1. Corner Armor Spurs (Plat Sudut Timbul 3D)
export function VectorCornerSpur({ position = "tl", className = "w-3 h-3" }) {
    const rotation =
        position === "tr" ? "rotate-90" :
        position === "br" ? "rotate-180" :
        position === "bl" ? "-rotate-90" : "";

    return (
        <svg className={`${className} ${rotation}`} viewBox="0 0 16 16" fill="none">
            <path
                d="M1 1H9L12 4L4 12L1 9V1Z"
                fill="url(#cornerSpurGrad)"
                stroke="#fef08a"
                strokeWidth="0.8"
                strokeLinejoin="bevel"
            />
            <circle cx="5" cy="5" r="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
            <defs>
                <linearGradient id="cornerSpurGrad" x1="1" y1="1" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#78350f" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// 2. Triple-Tier Golden Wings (Sayap Emas MLBB Bertingkat - Kiri)
export function VectorMlbbWingsLeft({ className = "w-4 h-7" }) {
    return (
        <svg className={className} viewBox="0 0 20 36" fill="none">
            {/* Top primary feather */}
            <path
                d="M19 12C13 8 7 3 1 1C2 7 5 12 1 17C6 14 12 13 19 12Z"
                fill="url(#mlbbWing1)"
                stroke="#d97706"
                strokeWidth="0.8"
            />
            {/* Middle feather */}
            <path
                d="M19 18C13 16 6 13 1 17C2 22 5 26 2 31C7 26 13 22 19 18Z"
                fill="url(#mlbbWing2)"
                stroke="#d97706"
                strokeWidth="0.8"
            />
            {/* Bottom feather */}
            <path
                d="M19 23C14 22 8 21 3 28C6 32 9 35 7 36C11 33 15 28 19 23Z"
                fill="url(#mlbbWing3)"
                stroke="#b45309"
                strokeWidth="0.8"
            />
            {/* Wing core jewel socket */}
            <circle cx="18" cy="18" r="2.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />
            <circle cx="17.5" cy="17.5" r="0.8" fill="#ffffff" />
            <defs>
                <linearGradient id="mlbbWing1" x1="0" y1="0" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.6" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="mlbbWing2" x1="0" y1="12" x2="20" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="0.7" stopColor="#d97706" />
                    <stop offset="1" stopColor="#92400e" />
                </linearGradient>
                <linearGradient id="mlbbWing3" x1="0" y1="20" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#78350f" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// 3. Triple-Tier Golden Wings (Sayap Emas MLBB Bertingkat - Kanan)
export function VectorMlbbWingsRight({ className = "w-4 h-7" }) {
    return (
        <div style={{ transform: "scaleX(-1)" }} className="inline-block">
            <VectorMlbbWingsLeft className={className} />
        </div>
    );
}

// 4. Mythic Immortal Fiery Dragon Wings (Sayap Naga Magma Merah/Emas)
export function VectorMythicImmortalWingsLeft({ className = "w-5 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 40" fill="none">
            {/* Fiery top wing blade */}
            <path
                d="M23 14C16 9 8 3 1 1C2 8 7 14 2 20C9 17 16 16 23 14Z"
                fill="url(#immortalWingGrad1)"
                stroke="#dc2626"
                strokeWidth="0.9"
            />
            {/* Mid fiery wing blade */}
            <path
                d="M23 20C16 18 7 16 2 21C4 27 7 32 3 38C9 31 16 26 23 20Z"
                fill="url(#immortalWingGrad2)"
                stroke="#b91c1c"
                strokeWidth="0.9"
            />
            {/* Ruby wing joint core */}
            <polygon points="21,18 24,21 21,24 18,21" fill="#ef4444" stroke="#fef08a" strokeWidth="0.8" />
            <circle cx="21" cy="21" r="1.2" fill="#ffffff" />
            <defs>
                <linearGradient id="immortalWingGrad1" x1="0" y1="0" x2="24" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fde047" />
                    <stop offset="0.3" stopColor="#f97316" />
                    <stop offset="0.8" stopColor="#dc2626" />
                    <stop offset="1" stopColor="#7f1d1d" />
                </linearGradient>
                <linearGradient id="immortalWingGrad2" x1="0" y1="15" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fbbf24" />
                    <stop offset="0.5" stopColor="#ea580c" />
                    <stop offset="1" stopColor="#991b1b" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorMythicImmortalWingsRight({ className = "w-5 h-8" }) {
    return (
        <div style={{ transform: "scaleX(-1)" }} className="inline-block">
            <VectorMythicImmortalWingsLeft className={className} />
        </div>
    );
}

// 5. Aspirants Cyber Mecha Wings (Sayap Siber Cyan/Magenta)
export function VectorCyberWingsLeft({ className = "w-4 h-7" }) {
    return (
        <svg className={className} viewBox="0 0 20 34" fill="none">
            <path
                d="M19 8L5 2L1 8L15 15L19 8Z"
                fill="url(#cyberWingCyan)"
                stroke="#67e8f9"
                strokeWidth="1"
            />
            <path
                d="M19 16L3 13L1 20L15 23L19 16Z"
                fill="url(#cyberWingPink)"
                stroke="#f472b6"
                strokeWidth="1"
            />
            <path
                d="M19 24L7 22L5 28L15 31L19 24Z"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1"
            />
            <rect x="16" y="14" width="3" height="6" fill="#a5f3fc" />
            <defs>
                <linearGradient id="cyberWingCyan" x1="0" y1="0" x2="20" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a5f3fc" />
                    <stop offset="1" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="cyberWingPink" x1="0" y1="10" x2="20" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fbcfe8" />
                    <stop offset="1" stopColor="#db2777" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function VectorCyberWingsRight({ className = "w-4 h-7" }) {
    return (
        <div style={{ transform: "scaleX(-1)" }} className="inline-block">
            <VectorCyberWingsLeft className={className} />
        </div>
    );
}

// 6. Mythic Glory / Immortal Royal Crown Crest (Mahkota Mitik Agung)
export function VectorImmortalCrown({ className = "w-6 h-6" }) {
    return (
        <svg className={className} viewBox="0 0 32 26" fill="none">
            {/* Crown Base Rim */}
            <path
                d="M2 20L5 8L11 13L16 2L21 13L27 8L30 20H2Z"
                fill="url(#immortalCrownGrad)"
                stroke="#b45309"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            {/* Ruby Core Jewel */}
            <polygon points="16,8 19,14 16,20 13,14" fill="url(#rubyGrad)" stroke="#fde047" strokeWidth="0.9" />
            <circle cx="16" cy="14" r="1" fill="#ffffff" />
            {/* 5 Tip Spheres */}
            <circle cx="16" cy="2" r="2.2" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="5" cy="8" r="1.6" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="27" cy="8" r="1.6" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="2" cy="20" r="1.2" fill="#ef4444" />
            <circle cx="30" cy="20" r="1.2" fill="#ef4444" />
            {/* Bottom Plated Inset */}
            <rect x="4" y="19" width="24" height="4" rx="1.5" fill="#92400e" stroke="#fef08a" strokeWidth="0.6" />
            <defs>
                <linearGradient id="immortalCrownGrad" x1="16" y1="2" x2="16" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.4" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="rubyGrad" x1="16" y1="8" x2="16" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fca5a5" />
                    <stop offset="0.5" stopColor="#dc2626" />
                    <stop offset="1" stopColor="#7f1d1d" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// 7. Collector Royal Amethyst Crest (Crest Kolektor Diraja)
export function VectorCollectorCrest({ className = "w-6 h-6" }) {
    return (
        <svg className={className} viewBox="0 0 32 26" fill="none">
            {/* Laurel Wreath Wings */}
            <path d="M6 16C4 10 7 5 12 3C11 8 10 13 13 18" stroke="#fde047" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M26 16C28 10 25 5 20 3C21 8 22 13 19 18" stroke="#fde047" strokeWidth="1.6" strokeLinecap="round" />
            {/* Central Diamond Amethyst */}
            <polygon points="16,3 23,12 16,23 9,12" fill="url(#collectorAmethyst)" stroke="#fef08a" strokeWidth="1.2" />
            <polygon points="16,6 20,12 16,19 12,12" fill="#e879f9" fillOpacity="0.4" />
            <circle cx="16" cy="12" r="1.5" fill="#ffffff" />
            <defs>
                <linearGradient id="collectorAmethyst" x1="16" y1="3" x2="16" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f5d0fe" />
                    <stop offset="0.4" stopColor="#c084fc" />
                    <stop offset="0.8" stopColor="#7e22ce" />
                    <stop offset="1" stopColor="#3b0764" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// 8. M-World / M-Series Championship Crest (Piala M5/M6 Emas Geometrik)
export function VectorMWorldCrest({ className = "w-6 h-6" }) {
    return (
        <svg className={className} viewBox="0 0 32 26" fill="none">
            <polygon points="16,1 25,6 25,18 16,24 7,18 7,6" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.4" />
            <polygon points="16,5 22,9 22,16 16,20 10,16 10,9" fill="url(#mworldGrad)" />
            <path d="M11 15L14 9L16 13L18 9L21 15" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="mworldGrad" x1="16" y1="5" x2="16" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.6" stopColor="#d97706" />
                    <stop offset="1" stopColor="#78350f" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// 9. Starlight Member Shining Star Crest (Bintang Permata Starlight)
export function VectorStarlightCrest({ className = "w-6 h-6" }) {
    return (
        <svg className={className} viewBox="0 0 32 26" fill="none">
            {/* Back Star Rays */}
            <path d="M16 1L18 9L26 11L18 13L16 21L14 13L6 11L14 9Z" fill="#e879f9" opacity="0.8" />
            <path d="M16 4L17.5 9.5L23 11L17.5 12.5L16 18L14.5 12.5L9 11L14.5 9.5Z" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
            <circle cx="16" cy="11" r="2" fill="#ffffff" />
            <circle cx="9" cy="11" r="1.2" fill="#fde047" />
            <circle cx="23" cy="11" r="1.2" fill="#fde047" />
        </svg>
    );
}

// --- 2. VECTOR AVATARS (REPLACING EMOJI AVATAR CHARACTERS) ---

export function VectorAvatarAstro({ className = "w-full h-full" }) {
    return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="8" y="11" width="20" height="12" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
            <ellipse cx="14" cy="15" rx="4" ry="2" fill="#ffffff" fillOpacity="0.4" />
            <path d="M12 28C14 26 22 26 24 28" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="4" r="1.5" fill="#f59e0b" />
            <path d="M18 5.5V7.5" stroke="#f59e0b" strokeWidth="1.2" />
        </svg>
    );
}

export function VectorAvatarScientist({ className = "w-full h-full" }) {
    return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="14" r="8" fill="#fde68a" />
            <circle cx="14.5" cy="14" r="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx="21.5" cy="14" r="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
            <path d="M17.5 14H18.5" stroke="#0f172a" strokeWidth="1.2" />
            <path d="M8 32C8 25 12 23 18 23C24 23 28 25 28 32H8Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            <path d="M18 23V32" stroke="#0f766e" strokeWidth="1.5" />
            <circle cx="25" cy="27" r="2.5" fill="#14b8a6" />
        </svg>
    );
}

export function VectorAvatarCyber({ className = "w-full h-full" }) {
    return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="13" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
            <rect x="7" y="13" width="22" height="7" rx="3.5" fill="#06b6d4" stroke="#22d3ee" strokeWidth="1.2" />
            <path d="M10 16.5H26" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2 1" />
            <path d="M14 26H22" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function VectorAvatarDino({ className = "w-full h-full" }) {
    return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
            <path d="M10 28C8 23 11 16 17 12C23 8 28 9 29 14C30 19 26 21 21 21C18 21 16 24 16 28H10Z" fill="#10b981" stroke="#047857" strokeWidth="1.2" />
            <circle cx="24" cy="13" r="1.5" fill="#ffffff" />
            <circle cx="24.5" cy="13" r="0.8" fill="#0f172a" />
            <path d="M22 17C24 17 26 18 28 17" stroke="#047857" strokeWidth="1" strokeLinecap="round" />
            <path d="M13 14L15 16M11 18L13 20" stroke="#059669" strokeWidth="1.2" />
        </svg>
    );
}

export function VectorAvatarRobot({ className = "w-full h-full" }) {
    return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
            <rect x="9" y="10" width="18" height="15" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="14" cy="16" r="2.5" fill="#ffffff" />
            <circle cx="14" cy="16" r="1.2" fill="#0369a1" />
            <circle cx="22" cy="16" r="2.5" fill="#ffffff" />
            <circle cx="22" cy="16" r="1.2" fill="#0369a1" />
            <path d="M14 21H22" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="5" r="1.5" fill="#ef4444" />
            <path d="M18 6.5V10" stroke="#0284c7" strokeWidth="1.2" />
            <rect x="6" y="14" width="3" height="7" rx="1.5" fill="#0284c7" />
            <rect x="27" y="14" width="3" height="7" rx="1.5" fill="#0284c7" />
        </svg>
    );
}

export function VectorAvatarCommander({ className = "w-full h-full" }) {
    return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="13" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
            <path d="M18 8L24 24L18 20L12 24L18 8Z" fill="#ffffff" stroke="#b45309" strokeWidth="1" />
            <circle cx="18" cy="16" r="2" fill="#ef4444" />
        </svg>
    );
}

export function VectorAvatarGuest({ className = "w-full h-full" }) {
    return (
        <svg className={className} viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="13" r="6" fill="#94a3b8" />
            <path d="M8 29C8 23 13 21 18 21C23 21 28 23 28 29H8Z" fill="#64748b" />
        </svg>
    );
}

// --- 3. UI / TAB / BUTTON ICONS (REPLACING EMOJIS IN DASHBOARD & SHOP) ---

export function VectorSchool({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 22V12H10V22M18 22V6M6 22V6M2 6L12 2L22 6V22H2V6Z" />
            <path d="M12 7V9" strokeWidth="2" />
        </svg>
    );
}

export function VectorTrophy({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M6 3H18V10C18 13.31 15.31 16 12 16C8.69 16 6 13.31 6 10V3Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2" />
            <path d="M6 6H3C2.45 6 2 6.45 2 7C2 9.5 4 11 6 11V6ZM18 6H21C21.55 6 22 6.45 22 7C22 9.5 20 11 18 11V6Z" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M12 16V19M8 21H16" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

export function VectorDiamond({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M6 3H18L22 9L12 21L2 9L6 3Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M2 9H22M12 21L7 9M12 21L17 9" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.7" />
        </svg>
    );
}

export function VectorTarget({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
    );
}

export function VectorClipboard({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4H19C19.55 4 20 4.45 20 5V20C20 20.55 19.55 21 19 21H5C4.45 21 4 20.55 4 20V5C4 4.45 4.45 4 5 4H8" />
            <rect x="8" y="2" width="8" height="4" rx="1.5" />
            <path d="M9 12L11 14L15 10" strokeWidth="2" />
        </svg>
    );
}

export function VectorDna({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 4C8 7 16 11 20 14M4 20C8 17 16 13 20 10M7 6L5 8M10 9L8 11M14 13L12 15M17 16L15 18" />
            <circle cx="5" cy="7" r="1.5" fill="currentColor" />
            <circle cx="19" cy="17" r="1.5" fill="currentColor" />
        </svg>
    );
}

export function VectorPencil({ className = "w-3.5 h-3.5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3L21 7L7 21H3V17L17 3Z" />
        </svg>
    );
}

export function VectorPaw({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="6.5" cy="8" r="2.5" />
            <circle cx="12" cy="5.5" r="2.8" />
            <circle cx="17.5" cy="8" r="2.5" />
            <path d="M12 11C7.5 11 5 14.5 5 17C5 19.5 7.5 21 12 21C16.5 21 19 19.5 19 17C19 14.5 16.5 11 12 11Z" />
        </svg>
    );
}

export function VectorGrid({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    );
}

export function VectorSparkles({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 7.5L19 9L13.5 10.5L12 16L10.5 10.5L5 9L10.5 7.5L12 2Z" fill="#fbbf24" />
            <path d="M19 15L20 18L23 19L20 20L19 23L18 20L15 19L18 18L19 15Z" fill="#38bdf8" />
            <path d="M5 16L5.8 18.2L8 19L5.8 19.8L5 22L4.2 19.8L2 19L4.2 18.2L5 16Z" fill="#f43f5e" />
        </svg>
    );
}

export function VectorBee({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="13" rx="5" ry="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2" />
            <path d="M8 11H16M8 14H16M9 17H15" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="6" r="3" fill="#1e293b" />
            <path d="M10 4L8 2M14 4L16 2" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
            <ellipse cx="7" cy="11" rx="4" ry="2.5" transform="rotate(-30 7 11)" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
            <ellipse cx="17" cy="11" rx="4" ry="2.5" transform="rotate(30 17 11)" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
        </svg>
    );
}

export function VectorMath({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7H10M7 4V10" stroke="#0284c7" />
            <path d="M14 7H20" stroke="#d97706" />
            <path d="M4 17H10M4 20H10" stroke="#16a34a" />
            <path d="M15 15L19 19M19 15L15 19" stroke="#dc2626" />
        </svg>
    );
}

export function VectorMicroscope({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18H18M10 22H14" />
            <path d="M7 18A5 5 0 0 1 12 13" />
            <path d="M9 3L15 9M13 1L17 5" stroke="#0284c7" strokeWidth="2" />
            <path d="M10 11L14 7" stroke="#0284c7" strokeWidth="2" />
            <circle cx="12" cy="13" r="1.5" fill="#f59e0b" stroke="none" />
        </svg>
    );
}

export function VectorBook({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3H8C10.2 3 12 4.8 12 7V21C12 19.3 10.2 18 8 18H2V3Z" fill="#f0fdf4" />
            <path d="M22 3H16C13.8 3 12 4.8 12 7V21C12 19.3 13.8 18 16 18H22V3Z" fill="#f0fdf4" />
            <path d="M12 7V21" />
        </svg>
    );
}

export function VectorPlant({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M12 21V10" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 14C8 14 6 10 6 7C9 7 12 9 12 14Z" fill="#4ade80" stroke="#16a34a" strokeWidth="1.2" />
            <path d="M12 11C16 11 18 7 18 4C15 4 12 6 12 11Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.2" />
        </svg>
    );
}
