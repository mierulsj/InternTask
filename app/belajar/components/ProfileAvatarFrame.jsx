"use client";

import React from "react";
import {
    VectorCrown,
    VectorLightning,
    VectorFlame,
    VectorIce,
    VectorGem,
    VectorPlanet,
    VectorStar,
    VectorRivet,
    VectorWingsLeft,
    VectorWingsRight,
    VectorCornerSpur,
    VectorMlbbWingsLeft,
    VectorMlbbWingsRight,
    VectorMythicImmortalWingsLeft,
    VectorMythicImmortalWingsRight,
    VectorCyberWingsLeft,
    VectorCyberWingsRight,
    VectorImmortalCrown,
    VectorCollectorCrest,
    VectorMWorldCrest,
    VectorStarlightCrest,
    VectorAvatarAstro,
    VectorAvatarScientist,
    VectorAvatarCyber,
    VectorAvatarDino,
    VectorAvatarRobot,
    VectorAvatarCommander,
    VectorAvatarGuest,
} from "./GameIcons";

/**
 * BORDERS CONFIG - GAYA BORDER ALA MOBILE LEGENDS BANG BANG (MLBB EMBOSSED 3D / TIMBUL)
 * 100% Vektor SVG - Tiada sistem emoji biasa
 */
export const BORDER_STYLES = {
    // 1. Asas Keluli
    border_cadet: {
        id: "border_cadet",
        name: "Besi Perintis",
        rarity: "common",
        frameClass:
            "border-[2.5px] border-slate-400 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.6)]",
        innerBg: "bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900",
        topOrnament: <VectorRivet className="w-2.5 h-2.5 text-slate-300" />,
        bottomOrnament: <VectorRivet className="w-2.5 h-2.5 text-slate-300" />,
        glowAura: "shadow-[0_0_8px_rgba(148,163,184,0.4)]",
    },

    // 2. Kilat Neon
    border_lightning: {
        id: "border_lightning",
        name: "Kilat Petir",
        rarity: "rare",
        frameClass:
            "border-[2.5px] border-cyan-300 bg-gradient-to-b from-cyan-300 via-sky-500 to-blue-600 shadow-[0_0_16px_rgba(6,182,212,0.9),0_4px_12px_rgba(0,0,0,0.4),inset_0_0_8px_rgba(165,243,252,0.8)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-cyan-950 to-blue-950",
        topOrnament: <VectorLightning className="w-3.5 h-3.5 text-cyan-300" />,
        bottomOrnament: <VectorLightning className="w-3 h-3 text-cyan-300" />,
        glowAura: "ring-2 ring-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.7)]",
    },

    // 3. Naga Ais Glosial
    border_ice: {
        id: "border_ice",
        name: "Naga Ais Glosial",
        rarity: "epic",
        frameClass:
            "border-3 border-sky-200 bg-gradient-to-b from-sky-100 via-cyan-400 to-blue-700 shadow-[0_0_20px_rgba(56,189,248,0.95),0_0_35px_rgba(14,165,233,0.5),inset_0_0_10px_rgba(224,242,254,0.9)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-sky-950 to-blue-950",
        topOrnament: <VectorIce className="w-3.5 h-3.5 text-sky-200" />,
        bottomOrnament: <VectorGem className="w-3 h-3 text-cyan-300" />,
        sideWings: true,
        wingType: "standard",
        glowAura: "ring-2 ring-sky-300/80 shadow-[0_0_24px_rgba(56,189,248,0.85)]",
    },

    // 4. Lava Phoenix
    border_fire: {
        id: "border_fire",
        name: "Lava Phoenix",
        rarity: "epic",
        frameClass:
            "border-3 border-amber-300 bg-gradient-to-b from-yellow-300 via-amber-500 to-red-600 shadow-[0_0_20px_rgba(245,158,11,0.95),0_0_35px_rgba(239,68,68,0.5),inset_0_0_10px_rgba(254,240,138,0.8)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-amber-950 to-rose-950",
        topOrnament: <VectorFlame className="w-3.5 h-3.5 text-amber-300" />,
        bottomOrnament: <VectorStar className="w-3 h-3 text-yellow-300" />,
        sideWings: true,
        wingType: "standard",
        glowAura: "ring-2 ring-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.8)]",
    },

    // 5. Zamrud Bio-Sains
    border_emerald: {
        id: "border_emerald",
        name: "Zamrud Bio-Sains",
        rarity: "epic",
        frameClass:
            "border-3 border-emerald-300 bg-gradient-to-b from-emerald-200 via-teal-500 to-green-700 shadow-[0_0_20px_rgba(16,185,129,0.9),0_0_30px_rgba(52,211,153,0.5),inset_0_0_10px_rgba(167,243,208,0.8)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-emerald-950 to-teal-950",
        topOrnament: <VectorGem className="w-3.5 h-3.5 text-emerald-300" />,
        bottomOrnament: <VectorGem className="w-3 h-3 text-emerald-400" />,
        glowAura: "ring-2 ring-emerald-400/70 shadow-[0_0_22px_rgba(16,185,129,0.75)]",
    },

    // 6. Galaksi Nebula
    border_cosmic: {
        id: "border_cosmic",
        name: "Galaksi Nebula",
        rarity: "epic",
        frameClass:
            "border-3 border-purple-300 bg-gradient-to-b from-fuchsia-300 via-purple-500 to-indigo-700 shadow-[0_0_20px_rgba(168,85,247,0.9),0_0_32px_rgba(217,70,239,0.5),inset_0_0_10px_rgba(245,208,254,0.8)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-purple-950 to-indigo-950",
        topOrnament: <VectorPlanet className="w-4 h-4 text-purple-200" />,
        bottomOrnament: <VectorStar className="w-3 h-3 text-fuchsia-300" />,
        glowAura: "ring-2 ring-purple-400/70 shadow-[0_0_22px_rgba(168,85,247,0.75)]",
    },

    // 7. Void Abyss Gelap
    border_abyss: {
        id: "border_abyss",
        name: "Void Abyss Gelap",
        rarity: "epic",
        frameClass:
            "border-3 border-violet-400 bg-gradient-to-b from-violet-400 via-purple-800 to-slate-950 shadow-[0_0_22px_rgba(139,92,246,0.95),0_0_35px_rgba(88,28,135,0.7),inset_0_0_12px_rgba(196,181,253,0.8)]",
        innerBg: "bg-gradient-to-tr from-black via-purple-950 to-slate-950",
        topOrnament: <VectorFlame className="w-3.5 h-3.5 text-violet-300" />,
        bottomOrnament: <VectorStar className="w-3 h-3 text-violet-400" />,
        sideWings: true,
        wingType: "standard",
        glowAura: "ring-2 ring-violet-500/80 shadow-[0_0_26px_rgba(139,92,246,0.85)]",
    },

    // 8. Mecha Siberpunk
    border_cyber: {
        id: "border_cyber",
        name: "Mecha Siberpunk",
        rarity: "legendary",
        frameClass:
            "border-3 border-pink-400 bg-gradient-to-b from-pink-400 via-purple-600 to-cyan-500 shadow-[0_0_22px_rgba(236,72,153,0.9),0_0_35px_rgba(6,182,212,0.55),inset_0_0_10px_rgba(251,207,232,0.8)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950",
        topOrnament: <VectorLightning className="w-3.5 h-3.5 text-pink-300" />,
        bottomOrnament: <VectorRivet className="w-3 h-3 text-cyan-300" />,
        glowAura: "ring-2 ring-pink-400/80 shadow-[0_0_25px_rgba(236,72,153,0.8)]",
    },

    // 9. Starlight Tahunan (Ala Starlight Pass MLBB)
    border_starlight: {
        id: "border_starlight",
        name: "Starlight Tahunan",
        rarity: "legendary",
        frameClass:
            "border-3 border-purple-300 bg-gradient-to-b from-purple-200 via-fuchsia-500 to-amber-500 shadow-[0_0_24px_rgba(192,132,252,0.95),0_0_36px_rgba(245,158,11,0.6),inset_0_0_12px_rgba(255,255,255,0.85)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-purple-950 to-amber-950",
        topOrnament: <VectorStarlightCrest className="w-5 h-5 sm:w-6 sm:h-6" />,
        bottomOrnament: <VectorStar className="w-3.5 h-3.5 text-amber-300" />,
        sideWings: true,
        wingType: "mlbb",
        cornerSpurs: true,
        glowAura: "ring-2 ring-purple-300 shadow-[0_0_28px_rgba(192,132,252,0.9)]",
    },

    // 10. Aspirants Mecha Siber (Ala The Aspirants MLBB)
    border_aspirants: {
        id: "border_aspirants",
        name: "Aspirants Siber Mecha",
        rarity: "legendary",
        frameClass:
            "border-3 border-cyan-300 bg-gradient-to-b from-cyan-200 via-pink-500 to-indigo-900 shadow-[0_0_26px_rgba(6,182,212,1),0_0_38px_rgba(236,72,153,0.7),inset_0_0_12px_rgba(255,255,255,0.9)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950",
        topOrnament: <VectorLightning className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]" />,
        bottomOrnament: <VectorRivet className="w-3.5 h-3.5 text-pink-400" />,
        sideWings: true,
        wingType: "cyber",
        cornerSpurs: true,
        glowAura: "ring-2 ring-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.9)]",
    },

    // 11. Naga Emas Magma
    border_dragon: {
        id: "border_dragon",
        name: "Naga Emas Magma",
        rarity: "legendary",
        frameClass:
            "border-4 border-amber-300 bg-gradient-to-b from-red-600 via-amber-400 to-yellow-600 shadow-[0_0_28px_rgba(245,158,11,1),0_0_42px_rgba(220,38,38,0.7),inset_0_0_12px_rgba(254,240,138,0.9)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-red-950 to-amber-950",
        topOrnament: <VectorCrown className="w-4.5 h-4.5 text-amber-200" />,
        bottomOrnament: <VectorFlame className="w-3.5 h-3.5 text-orange-400" />,
        sideWings: true,
        wingType: "immortal",
        cornerSpurs: true,
        glowAura: "ring-3 ring-amber-400/90 shadow-[0_0_32px_rgba(245,158,11,0.95)]",
    },

    // 12. Mitik Diraja Emas (Ala Pangkat Mitik MLBB)
    border_mythic: {
        id: "border_mythic",
        name: "Mitik Diraja Emas",
        rarity: "legendary",
        frameClass:
            "border-4 border-yellow-200 bg-gradient-to-b from-amber-100 via-yellow-400 to-amber-600 shadow-[0_0_30px_rgba(251,191,36,1),0_6px_25px_rgba(0,0,0,0.6),inset_0_0_12px_rgba(254,240,138,0.9)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-amber-950 to-yellow-950",
        topOrnament: <VectorCrown className="w-4.5 h-4.5 text-yellow-200" />,
        bottomOrnament: <VectorGem className="w-3.5 h-3.5 text-amber-300" />,
        sideWings: true,
        wingType: "mlbb",
        cornerSpurs: true,
        glowAura: "ring-3 ring-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.95)]",
    },

    // 13. Kolektor Diraja (Ala Skin Collector MLBB)
    border_collector: {
        id: "border_collector",
        name: "Kolektor Diraja (Collector)",
        rarity: "mythic",
        frameClass:
            "border-4 border-yellow-200 bg-gradient-to-b from-amber-200 via-purple-600 to-yellow-500 shadow-[0_0_32px_rgba(168,85,247,1),0_0_44px_rgba(251,191,36,0.85),inset_0_0_14px_rgba(255,255,255,0.9)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-950",
        topOrnament: <VectorCollectorCrest className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5" />,
        bottomOrnament: <VectorGem className="w-3.5 h-3.5 text-fuchsia-300" />,
        sideWings: true,
        wingType: "mlbb",
        cornerSpurs: true,
        glowAura: "ring-3 ring-purple-400 shadow-[0_0_36px_rgba(168,85,247,0.95),0_0_48px_rgba(251,191,36,0.7)]",
    },

    // 14. Aurora Prisma
    border_rainbow: {
        id: "border_rainbow",
        name: "Aurora Prisma",
        rarity: "mythic",
        frameClass:
            "border-4 border-cyan-200 bg-gradient-to-tr from-pink-400 via-amber-300 via-emerald-400 to-cyan-400 shadow-[0_0_32px_rgba(56,189,248,0.95),0_0_40px_rgba(236,72,153,0.7),inset_0_0_12px_rgba(255,255,255,0.9)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950",
        topOrnament: <VectorStar className="w-4.5 h-4.5 text-amber-200" />,
        bottomOrnament: <VectorGem className="w-3.5 h-3.5 text-cyan-300" />,
        sideWings: true,
        wingType: "mlbb",
        glowAura: "ring-3 ring-cyan-300 shadow-[0_0_35px_rgba(56,189,248,0.9)] animate-pulse",
    },

    // 15. Mitik Gemilang (Ala Mythic Glory 50★ MLBB)
    border_glory: {
        id: "border_glory",
        name: "Mitik Gemilang (Glory)",
        rarity: "mythic",
        frameClass:
            "border-4 border-rose-200 bg-gradient-to-b from-rose-200 via-amber-300 to-purple-600 shadow-[0_0_36px_rgba(244,63,94,1),0_0_48px_rgba(251,191,36,0.95),inset_0_0_14px_rgba(255,255,255,0.95)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-purple-950 to-rose-950",
        topOrnament: <VectorCrown className="w-5 h-5 text-amber-200" />,
        bottomOrnament: <VectorGem className="w-3.5 h-3.5 text-rose-300" />,
        sideWings: true,
        wingType: "mlbb",
        cornerSpurs: true,
        hasHalo: true,
        glowAura: "ring-3 ring-rose-400 shadow-[0_0_42px_rgba(244,63,94,1)] animate-pulse",
    },

    // 16. Juara M-World (Ala Kejohanan M5/M6 Championship MLBB)
    border_mworld: {
        id: "border_mworld",
        name: "Juara M-World (M5/M6)",
        rarity: "mythic",
        frameClass:
            "border-4 border-yellow-300 bg-gradient-to-b from-amber-100 via-slate-900 via-amber-400 to-yellow-600 shadow-[0_0_38px_rgba(251,191,36,1),0_0_50px_rgba(0,0,0,0.85),inset_0_0_14px_rgba(254,240,138,0.95)]",
        innerBg: "bg-gradient-to-tr from-black via-slate-950 to-amber-950",
        topOrnament: <VectorMWorldCrest className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5" />,
        bottomOrnament: <VectorCrown className="w-3.5 h-3.5 text-amber-300" />,
        sideWings: true,
        wingType: "mlbb",
        cornerSpurs: true,
        hasHalo: true,
        glowAura: "ring-3 ring-amber-300 shadow-[0_0_45px_rgba(251,191,36,1),0_0_60px_rgba(245,158,11,0.8)] animate-pulse",
    },

    // 17. Mitik Imortal (Pangkat Tertinggi 100 Bintang MLBB)
    border_mythic_immortal: {
        id: "border_mythic_immortal",
        name: "Mitik Imortal (100★)",
        rarity: "mythic",
        frameClass:
            "border-4 border-red-300 bg-gradient-to-b from-yellow-200 via-red-600 via-amber-500 to-red-900 shadow-[0_0_45px_rgba(239,68,68,1),0_0_60px_rgba(245,158,11,0.9),inset_0_0_16px_rgba(254,240,138,0.95)]",
        innerBg: "bg-gradient-to-tr from-slate-950 via-red-950 to-amber-950",
        topOrnament: <VectorImmortalCrown className="w-6 h-6 sm:w-7 sm:h-7" />,
        bottomOrnament: <VectorGem className="w-3.5 h-3.5 text-red-400" />,
        sideWings: true,
        wingType: "immortal",
        cornerSpurs: true,
        hasHalo: true,
        glowAura: "ring-4 ring-red-500 shadow-[0_0_50px_rgba(239,68,68,1),0_0_70px_rgba(245,158,11,0.95)] animate-pulse",
    },
};

const SIZE_CONFIGS = {
    xs: {
        outer: "w-8 h-8 rounded-xl p-[2px]",
        inner: "rounded-[8px]",
        topIcon: "-top-2",
        botIcon: "-bottom-1.5",
        petBadge: "-bottom-1 -right-1",
        levelBadge: "text-[8px] -bottom-2 -left-1 px-1",
        spurSize: "w-2 h-2",
        wings: false,
    },
    sm: {
        outer: "w-10 h-10 rounded-2xl p-[2.5px]",
        inner: "rounded-[12px]",
        topIcon: "-top-2.5",
        botIcon: "-bottom-2",
        petBadge: "-bottom-1 -right-1.5",
        levelBadge: "text-[9px] -bottom-2 -left-1.5 px-1.5",
        spurSize: "w-2.5 h-2.5",
        wings: true,
        wingScale: "scale-85",
        leftWingPos: "-left-2.5",
        rightWingPos: "-right-2.5",
    },
    md: {
        outer: "w-13 h-13 rounded-2xl p-[3px]",
        inner: "rounded-[13px]",
        topIcon: "-top-3",
        botIcon: "-bottom-2.5",
        petBadge: "-bottom-1.5 -right-2",
        levelBadge: "text-[10px] -bottom-2.5 -left-1.5 px-2",
        spurSize: "w-3 h-3",
        wings: true,
        wingScale: "scale-95",
        leftWingPos: "-left-3",
        rightWingPos: "-right-3",
    },
    lg: {
        outer: "w-18 h-18 sm:w-20 sm:h-20 rounded-3xl p-[4px]",
        inner: "rounded-[20px]",
        topIcon: "-top-4 sm:-top-5",
        botIcon: "-bottom-3.5 sm:-bottom-4",
        petBadge: "-bottom-2 -right-2",
        levelBadge: "text-[10px] sm:text-[11px] -bottom-3 -left-2 px-2 py-0.5",
        spurSize: "w-4 h-4 sm:w-4.5 sm:h-4.5",
        wings: true,
        wingScale: "scale-110 sm:scale-125",
        leftWingPos: "-left-4 sm:-left-5",
        rightWingPos: "-right-4 sm:-right-5",
    },
};

// Sayap Sisi Mengikut Jenis & Pangkat MLBB
function renderSideWings(border, size) {
    if (!border.sideWings) return null;
    const sz = SIZE_CONFIGS[size] || SIZE_CONFIGS.sm;
    if (!sz.wings) return null;

    const wingType = border.wingType || "standard";

    let LeftWingComp = VectorWingsLeft;
    let RightWingComp = VectorWingsRight;
    let wingDimensions = "w-3 h-4 text-amber-300";

    if (wingType === "immortal") {
        LeftWingComp = VectorMythicImmortalWingsLeft;
        RightWingComp = VectorMythicImmortalWingsRight;
        wingDimensions = size === "lg" ? "w-5 h-8 sm:w-6 sm:h-10" : size === "md" ? "w-4 h-7" : "w-3.5 h-6";
    } else if (wingType === "mlbb") {
        LeftWingComp = VectorMlbbWingsLeft;
        RightWingComp = VectorMlbbWingsRight;
        wingDimensions = size === "lg" ? "w-5 h-8 sm:w-5.5 sm:h-9" : size === "md" ? "w-4 h-7" : "w-3.5 h-6";
    } else if (wingType === "cyber") {
        LeftWingComp = VectorCyberWingsLeft;
        RightWingComp = VectorCyberWingsRight;
        wingDimensions = size === "lg" ? "w-5 h-8 sm:w-5.5 sm:h-9" : size === "md" ? "w-4 h-7" : "w-3.5 h-6";
    }

    return (
        <>
            <span
                className={`absolute ${sz.leftWingPos} top-1/2 -translate-y-1/2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] pointer-events-none select-none z-20 ${sz.wingScale || ""}`}
                aria-hidden="true"
            >
                <LeftWingComp className={wingDimensions} />
            </span>
            <span
                className={`absolute ${sz.rightWingPos} top-1/2 -translate-y-1/2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] pointer-events-none select-none z-20 ${sz.wingScale || ""}`}
                aria-hidden="true"
            >
                <RightWingComp className={wingDimensions} />
            </span>
        </>
    );
}

// Penukaran Ikon Karakter Vektor
function renderVectorAvatar(avatar) {
    if (avatar === "avatar_astro_1" || avatar === "🧑‍🚀" || avatar === "astro") {
        return <VectorAvatarAstro className="w-4/5 h-4/5" />;
    }
    if (avatar === "avatar_scientist" || avatar === "🥼" || avatar === "scientist") {
        return <VectorAvatarScientist className="w-4/5 h-4/5" />;
    }
    if (avatar === "avatar_cyber" || avatar === "🥽" || avatar === "cyber") {
        return <VectorAvatarCyber className="w-4/5 h-4/5" />;
    }
    if (avatar === "avatar_explorer" || avatar === "🦖" || avatar === "dino") {
        return <VectorAvatarDino className="w-4/5 h-4/5" />;
    }
    if (avatar === "avatar_robot" || avatar === "🤖" || avatar === "robot") {
        return <VectorAvatarRobot className="w-4/5 h-4/5" />;
    }
    if (avatar === "avatar_commander" || avatar === "🚀" || avatar === "commander") {
        return <VectorAvatarCommander className="w-4/5 h-4/5" />;
    }
    return <VectorAvatarAstro className="w-4/5 h-4/5" />;
}

export default function ProfileAvatarFrame({
    avatar = "avatar_astro_1",
    borderId = "border_cadet",
    pet = null,
    level = null,
    size = "sm",
    interactive = false,
    className = "",
    title = "",
}) {
    const border = BORDER_STYLES[borderId] || BORDER_STYLES.border_cadet;
    const sz = SIZE_CONFIGS[size] || SIZE_CONFIGS.sm;

    return (
        <div
            className={`relative inline-flex items-center justify-center shrink-0 select-none ${
                interactive ? "transition-transform hover:scale-105 active:scale-95 cursor-pointer" : ""
            } ${className}`}
            title={title || border.name}
        >
            {/* Halo Bulatan Cahaya Kosmik Berputar (Tier Tertinggi MLBB) */}
            {border.hasHalo && (
                <div
                    className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-gradient-to-r from-amber-400/35 via-rose-500/35 to-purple-500/35 blur-[3px] -z-10 animate-spin"
                    style={{ animationDuration: "10s" }}
                    aria-hidden="true"
                />
            )}

            {/* Sayap Hiasan Kiri & Kanan (Ala Mobile Legends Vektor Bertingkat) */}
            {renderSideWings(border, size)}

            {/* Rangka Luar Border 3D Timbul */}
            <div
                className={`relative ${sz.outer} ${border.frameClass} ${border.glowAura} flex items-center justify-center`}
            >
                {/* 4 Plat Sudut Armor Timbul 3D (Corner Spurs Ala MLBB) */}
                {border.cornerSpurs && (
                    <>
                        <div className="absolute -top-1 -left-1 z-35 pointer-events-none drop-shadow-sm">
                            <VectorCornerSpur position="tl" className={sz.spurSize} />
                        </div>
                        <div className="absolute -top-1 -right-1 z-35 pointer-events-none drop-shadow-sm">
                            <VectorCornerSpur position="tr" className={sz.spurSize} />
                        </div>
                        <div className="absolute -bottom-1 -left-1 z-35 pointer-events-none drop-shadow-sm">
                            <VectorCornerSpur position="bl" className={sz.spurSize} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 z-35 pointer-events-none drop-shadow-sm">
                            <VectorCornerSpur position="br" className={sz.spurSize} />
                        </div>
                    </>
                )}

                {/* Bekas Avatar Dalaman */}
                <div
                    className={`w-full h-full ${sz.inner} ${border.innerBg} flex items-center justify-center overflow-hidden shadow-inner relative`}
                >
                    {renderVectorAvatar(avatar)}
                </div>

                {/* Hiasan Puncak Atas (Mahkota / Crest Vektor) */}
                {border.topOrnament && (
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 ${sz.topIcon} z-40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] pointer-events-none flex items-center justify-center`}
                    >
                        {border.topOrnament}
                    </div>
                )}

                {/* Hiasan Bawah (Vektor Permata / Api / Rivet) */}
                {border.bottomOrnament && !level && (
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 ${sz.botIcon} z-40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] pointer-events-none flex items-center justify-center`}
                    >
                        {border.bottomOrnament}
                    </div>
                )}
            </div>

            {/* Lencana Tahap (Level) */}
            {typeof level === "number" && (
                <span
                    className={`absolute ${sz.levelBadge} bg-slate-900 text-amber-300 font-black rounded-full shadow-md border border-amber-400/80 z-40 whitespace-nowrap`}
                >
                    Lv.{level}
                </span>
            )}
        </div>
    );
}
