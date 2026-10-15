"use client";

import React, { useState, useRef, useCallback } from "react";
import { GraphicCoin } from "./Graphics";
import { VectorSparkles, VectorAvatarCyber, VectorAvatarRobot } from "./GameIcons";
import ProfileAvatarFrame from "./ProfileAvatarFrame";
import { SHOP_CATALOG } from "../../../lib/shopService";
import { saveStudentProfile } from "../../../lib/firestoreService";

// Format tarikh piawai Exploria (YYYY-MM-DD)
const getTodayDateStr = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

// Paparan Gambar / Ikon Item Sebenar di dalam Roda Putaran
function renderSliceVisual(slice) {
    if (slice.type === "coin") {
        return (
            <div className="w-7 h-7 flex items-center justify-center drop-shadow-sm scale-95">
                <GraphicCoin className="w-full h-full" />
            </div>
        );
    }
    if (slice.type === "avatar") {
        return (
            <div className="w-7 h-7 rounded-xl bg-slate-900 border-2 border-white/90 p-0.5 flex items-center justify-center shadow-xs">
                {slice.itemId === "avatar_cyber" ? (
                    <VectorAvatarCyber className="w-full h-full" />
                ) : (
                    <VectorAvatarRobot className="w-full h-full" />
                )}
            </div>
        );
    }
    if (slice.type === "border") {
        return (
            <div className="w-8 h-8 flex items-center justify-center scale-85 drop-shadow-sm">
                <ProfileAvatarFrame
                    avatar="avatar_astro_1"
                    borderId={slice.itemId}
                    size="xs"
                    interactive={false}
                />
            </div>
        );
    }
    return <span className="text-sm">{slice.icon}</span>;
}

// 8 Segmen Hadiah Roda Bertuah
export const LUCKY_SLICES = [
    {
        id: "slice_coin_50",
        type: "coin",
        name: "50 Koin Bintang",
        shortName: "50 Koin",
        amount: 50,
        color: "#0099e5",
        icon: "🪙",
    },
    {
        id: "border_lightning",
        type: "border",
        name: "Bingkai Kilat Petir",
        shortName: "Kilat Petir",
        itemId: "border_lightning",
        color: "#06b6d4",
        icon: "⚡",
    },
    {
        id: "avatar_cyber",
        type: "avatar",
        name: "Avatar Penyelidik Siber",
        shortName: "Penyelidik",
        itemId: "avatar_cyber",
        color: "#6366f1",
        icon: "🧑‍💻",
    },
    {
        id: "slice_coin_100",
        type: "coin",
        name: "100 Koin Bintang",
        shortName: "100 Koin",
        amount: 100,
        color: "#f59e0b",
        icon: "🌟",
    },
    {
        id: "border_ice",
        type: "border",
        name: "Bingkai Naga Ais",
        shortName: "Naga Ais",
        itemId: "border_ice",
        color: "#0284c7",
        icon: "❄️",
    },
    {
        id: "avatar_robot",
        type: "avatar",
        name: "Avatar Kadet Mecha",
        shortName: "Kadet Mecha",
        itemId: "avatar_robot",
        color: "#10b981",
        icon: "🤖",
    },
    {
        id: "slice_coin_30",
        type: "coin",
        name: "30 Koin Bintang",
        shortName: "30 Koin",
        amount: 30,
        color: "#f97316",
        icon: "🪙",
    },
    {
        id: "border_fire",
        type: "border",
        name: "Bingkai Lava Phoenix",
        shortName: "Lava Phoenix",
        itemId: "border_fire",
        color: "#ef4444",
        icon: "🔥",
    },
];

export default function LuckyDrawModal({
    isOpen = false,
    onClose,
    studentIC = "",
    studentCoins = 50,
    setStudentCoins,
    ownedItems = ["border_cadet", "avatar_astro_1"],
    setOwnedItems,
    equippedItems = { border: "border_cadet", avatar: "avatar_astro_1", pet: null },
    setEquippedItems,
    playAudioFeedback,
}) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winningPrize, setWinningPrize] = useState(null);
    const [prizeDetails, setPrizeDetails] = useState(null);
    const [tickPointer, setTickPointer] = useState(false);
    const [hasSpunSession, setHasSpunSession] = useState(false);

    // Semak had putaran harian (1 kali sehari)
    const todayStr = getTodayDateStr();
    const effectiveIC = studentIC || (typeof window !== "undefined" ? localStorage.getItem("exploria_student_ic") : "") || "default";
    const isSavedToday = typeof window !== "undefined" ? localStorage.getItem(`exploria_lucky_draw_date_${effectiveIC}`) === todayStr : false;
    const hasSpunToday = isSavedToday || hasSpunSession;

    const audioCtxRef = useRef(null);

    // Main bunyi 'tick' sintetik semasa roda berpusing
    const playTickSound = useCallback(() => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
            const ctx = audioCtxRef.current;
            if (ctx.state === "suspended") ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(650, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.03);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.03);
        } catch {}
    }, []);

    // Pemberian ganjaran & kemas kini rekod akaun
    const awardPrize = useCallback((slice) => {
        const ic = studentIC || (typeof window !== "undefined" ? localStorage.getItem("exploria_student_ic") : "") || "default";
        const isRegistered = Boolean(studentIC);
        const todayStr = getTodayDateStr();

        // 1. Kunci had 1x sehari
        setHasSpunSession(true);
        try {
            localStorage.setItem(`exploria_lucky_draw_date_${ic}`, todayStr);
        } catch {}

        if (isRegistered) {
            saveStudentProfile(studentIC, { tarikhPutaranTerakhir: todayStr }).catch(() => {});
        }

        // 2. Berikan hadiah mengikut jenis
        if (slice.type === "coin") {
            const addCoins = slice.amount;
            const nextCoins = studentCoins + addCoins;

            if (setStudentCoins) setStudentCoins(nextCoins);

            try {
                const shopKey = `exploria_student_${ic}_shop`;
                const raw = localStorage.getItem(shopKey);
                const prev = raw ? JSON.parse(raw) : { coins: studentCoins, ownedItems };
                localStorage.setItem(shopKey, JSON.stringify({ ...prev, coins: nextCoins }));
            } catch {}

            if (isRegistered) {
                saveStudentProfile(studentIC, { koinBintang: nextCoins }).catch(() => {});
            }

            setPrizeDetails({
                type: "coin",
                title: `+${addCoins} Koin Bintang!`,
                subtitle: "Koin dimasukkan ke akaun anda.",
                item: null,
                isDuplicate: false,
            });
        } else {
            const itemInCatalog = SHOP_CATALOG.find((it) => it.id === slice.itemId) || {
                id: slice.itemId,
                name: slice.name,
                type: slice.type,
            };

            const alreadyOwned = ownedItems.includes(slice.itemId);

            if (alreadyOwned) {
                const bonusCoins = slice.type === "avatar" ? 60 : 50;
                const nextCoins = studentCoins + bonusCoins;

                if (setStudentCoins) setStudentCoins(nextCoins);

                try {
                    const shopKey = `exploria_student_${ic}_shop`;
                    const raw = localStorage.getItem(shopKey);
                    const prev = raw ? JSON.parse(raw) : { coins: studentCoins, ownedItems };
                    localStorage.setItem(shopKey, JSON.stringify({ ...prev, coins: nextCoins }));
                } catch {}

                if (isRegistered) {
                    saveStudentProfile(studentIC, { koinBintang: nextCoins }).catch(() => {});
                }

                setPrizeDetails({
                    type: "duplicate",
                    title: `+${bonusCoins} Koin Bintang!`,
                    subtitle: `Pampasan koin (${itemInCatalog.name} sudah dimiliki)`,
                    item: itemInCatalog,
                    isDuplicate: true,
                    bonusCoins,
                });
            } else {
                const nextOwned = [...ownedItems, slice.itemId];
                if (setOwnedItems) setOwnedItems(nextOwned);

                try {
                    const shopKey = `exploria_student_${ic}_shop`;
                    const raw = localStorage.getItem(shopKey);
                    const prev = raw ? JSON.parse(raw) : { coins: studentCoins, ownedItems };
                    localStorage.setItem(shopKey, JSON.stringify({ ...prev, ownedItems: nextOwned }));
                } catch {}

                if (isRegistered) {
                    saveStudentProfile(studentIC, { barangDimiliki: nextOwned }).catch(() => {});
                }

                setPrizeDetails({
                    type: slice.type,
                    title: `${itemInCatalog.name}!`,
                    subtitle: slice.type === "avatar" ? "Avatar baharu dibuka!" : "Bingkai baharu dibuka!",
                    item: itemInCatalog,
                    isDuplicate: false,
                });
            }
        }
    }, [studentIC, studentCoins, setStudentCoins, ownedItems, setOwnedItems]);

    // Fungsi putar roda
    const handleSpin = () => {
        if (isSpinning || hasSpunToday) return;

        if (playAudioFeedback) playAudioFeedback("tap");
        setIsSpinning(true);
        setWinningPrize(null);
        setPrizeDetails(null);

        const sliceCount = LUCKY_SLICES.length;
        const sliceAngle = 360 / sliceCount;

        const winningIndex = Math.floor(Math.random() * sliceCount);
        const selectedSlice = LUCKY_SLICES[winningIndex];

        const fullSpins = (6 + Math.floor(Math.random() * 3)) * 360;
        const targetOffset = 360 - (winningIndex * sliceAngle + sliceAngle / 2);
        const targetRotation = rotation + fullSpins + (targetOffset - (rotation % 360));

        setRotation(targetRotation);

        const totalDuration = 4500;
        const startTime = Date.now();

        const scheduleTicks = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= totalDuration) return;

            playTickSound();
            setTickPointer((prev) => !prev);

            const progress = elapsed / totalDuration;
            const nextTickDelay = 60 + Math.pow(progress, 2.5) * 400;

            setTimeout(scheduleTicks, nextTickDelay);
        };
        setTimeout(scheduleTicks, 60);

        setTimeout(() => {
            setIsSpinning(false);
            setWinningPrize(selectedSlice);

            if (playAudioFeedback) {
                playAudioFeedback("victory");
            }

            awardPrize(selectedSlice);
        }, totalDuration + 200);
    };

    // Pasang item yang dimenangi sekarang
    const handleEquipNow = () => {
        if (!prizeDetails?.item) return;
        const item = prizeDetails.item;
        const ic = studentIC || (typeof window !== "undefined" ? localStorage.getItem("exploria_student_ic") : "") || "default";

        const nextEquipped = {
            ...equippedItems,
            [item.type]: item.id,
        };

        if (setEquippedItems) setEquippedItems(nextEquipped);
        if (playAudioFeedback) playAudioFeedback("sparkle");

        try {
            const eqKey = `exploria_student_${ic}_equipped`;
            localStorage.setItem(eqKey, JSON.stringify(nextEquipped));
        } catch {}

        if (studentIC) {
            const field = item.type === "border" ? "borderDipilih" : "avatarDipilih";
            saveStudentProfile(studentIC, { [field]: item.id }).catch(() => {});
        }

        if (onClose) onClose();
    };

    if (!isOpen) return null;

    const sliceAngle = 360 / LUCKY_SLICES.length;

    return (
        <div
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 anim-fade-in select-none"
            onClick={() => {
                if (!isSpinning && onClose) onClose();
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[2.2rem] max-w-sm sm:max-w-md w-full p-5 sm:p-6 text-center shadow-2xl border-4 border-sky-100 relative overflow-hidden anim-pop"
            >
                {/* Pantulan Cahaya Lembut */}
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

                {/* Butang Tutup (X) */}
                <button
                    type="button"
                    disabled={isSpinning}
                    onClick={() => {
                        if (playAudioFeedback) playAudioFeedback("tap");
                        if (onClose) onClose();
                    }}
                    className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer transition-all ${
                        isSpinning ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                    title="Tutup"
                >
                    ✕
                </button>

                {/* 1. TAJUK RINGKAS & KEMAS (TANPA TEKS BERLEBIHAN) */}
                <div className="mb-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                        Roda Bertuah
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                        Putar dan menangi hadiah harian!
                    </p>
                </div>

                {/* 2. RODA PUTARAN BERSIH */}
                <div className="relative mx-auto my-2 flex items-center justify-center w-60 h-60 sm:w-68 sm:h-68">
                    {/* Jarum Penunjuk Atas (Pointer) */}
                    <div
                        className={`absolute -top-2 z-30 transition-transform duration-75 ${
                            tickPointer ? "-rotate-6 scale-110" : "rotate-0 scale-100"
                        }`}
                        style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.25))" }}
                    >
                        <div className="w-0 h-0 border-l-[13px] border-l-transparent border-r-[13px] border-r-transparent border-t-[24px] border-t-rose-500 relative">
                            <div className="absolute -top-[23px] -left-[9px] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[16px] border-t-amber-400" />
                        </div>
                    </div>

                    {/* Bingkai Luar Roda Bersih */}
                    <div className="absolute inset-0 rounded-full border-4 border-white ring-4 ring-sky-200/90 shadow-lg pointer-events-none z-20">
                        {Array.from({ length: 16 }).map((_, idx) => {
                            const angle = (idx * 360) / 16;
                            const isAmber = idx % 2 === 0;
                            return (
                                <div
                                    key={idx}
                                    className={`absolute w-2 h-2 rounded-full border border-white shadow-xs ${
                                        isAmber ? "bg-amber-300" : "bg-sky-400"
                                    }`}
                                    style={{
                                        top: "50%",
                                        left: "50%",
                                        transform: `rotate(${angle}deg) translate(0, -117px)`,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Badan Roda Berpusing */}
                    <div
                        className="w-full h-full rounded-full overflow-hidden shadow-inner relative"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transition: isSpinning
                                ? "transform 4.5s cubic-bezier(0.12, 0.8, 0.25, 1)"
                                : "none",
                        }}
                    >
                        <svg viewBox="0 0 300 300" className="w-full h-full">
                            <g transform="translate(150, 150)">
                                {LUCKY_SLICES.map((slice, i) => {
                                    const startAngle = (i * sliceAngle - 90) * (Math.PI / 180);
                                    const endAngle = ((i + 1) * sliceAngle - 90) * (Math.PI / 180);

                                    const r = 145;
                                    const x1 = r * Math.cos(startAngle);
                                    const y1 = r * Math.sin(startAngle);
                                    const x2 = r * Math.cos(endAngle);
                                    const y2 = r * Math.sin(endAngle);

                                    const pathData = `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
                                    const midAngle = i * sliceAngle + sliceAngle / 2;

                                    return (
                                        <g key={slice.id}>
                                            <path
                                                d={pathData}
                                                fill={slice.color}
                                                stroke="#ffffff"
                                                strokeWidth="3"
                                            />
                                            {/* Teks & Ikon Item Sebenar */}
                                            <g transform={`rotate(${midAngle}) translate(0, -96)`}>
                                                <foreignObject
                                                    x="-16"
                                                    y="-22"
                                                    width="32"
                                                    height="32"
                                                    className="overflow-visible pointer-events-none"
                                                >
                                                    <div className="w-8 h-8 flex items-center justify-center pointer-events-none select-none">
                                                        {renderSliceVisual(slice)}
                                                    </div>
                                                </foreignObject>
                                                <text
                                                    textAnchor="middle"
                                                    y="21"
                                                    fill="#ffffff"
                                                    style={{
                                                        fontSize: "9px",
                                                        fontWeight: 900,
                                                        letterSpacing: "-0.2px",
                                                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
                                                    }}
                                                >
                                                    {slice.shortName}
                                                </text>
                                            </g>
                                        </g>
                                    );
                                })}
                            </g>
                        </svg>
                    </div>

                    {/* Hab Tengah (Center Hub) */}
                    <button
                        type="button"
                        onClick={handleSpin}
                        disabled={isSpinning || hasSpunToday}
                        className={`absolute z-30 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-4 shadow-md flex flex-col items-center justify-center transition-all ${
                            hasSpunToday
                                ? "border-slate-300 opacity-80 cursor-not-allowed"
                                : isSpinning
                                ? "border-[#0099e5] opacity-80 scale-95"
                                : "border-[#0099e5] hover:scale-105 active:scale-95 cursor-pointer"
                        }`}
                    >
                        <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wide ${
                            hasSpunToday ? "text-slate-400" : "text-[#0099e5]"
                        }`}>
                            {hasSpunToday ? "SELESAI" : isSpinning ? "..." : "PUTAR"}
                        </span>
                        {!hasSpunToday && <VectorSparkles className="w-3.5 h-3.5 text-amber-500" />}
                    </button>
                </div>

                {/* 3. HASIL PEMENANG (KAD RINGKAS & TEPAT) */}
                {winningPrize && prizeDetails && (
                    <div className="mt-2.5 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl anim-pop text-left">
                        <div className="flex items-center gap-3">
                            <div className="shrink-0">
                                {prizeDetails.type === "coin" ? (
                                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center shadow-xs">
                                        <GraphicCoin className="w-6 h-6" />
                                    </div>
                                ) : prizeDetails.item?.type === "avatar" ? (
                                    <ProfileAvatarFrame
                                        avatar={prizeDetails.item.id}
                                        borderId={equippedItems?.border || "border_cadet"}
                                        size="xs"
                                        interactive={false}
                                    />
                                ) : prizeDetails.item?.type === "border" ? (
                                    <ProfileAvatarFrame
                                        avatar={equippedItems?.avatar || "avatar_astro_1"}
                                        borderId={prizeDetails.item.id}
                                        size="xs"
                                        interactive={false}
                                    />
                                ) : (
                                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center shadow-xs">
                                        <GraphicCoin className="w-6 h-6" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-black text-slate-800 truncate">
                                    {prizeDetails.title}
                                </h3>
                                <p className="text-[11px] font-semibold text-slate-400 truncate">
                                    {prizeDetails.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Butang Tindakan */}
                        <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-slate-200/60">
                            {!prizeDetails.isDuplicate && prizeDetails.item && (
                                <button
                                    type="button"
                                    onClick={handleEquipNow}
                                    className="flex-1 py-2 bg-[#0099e5] hover:bg-[#0284c7] text-white text-xs font-black rounded-xl cursor-pointer active:scale-95 transition-all shadow-xs text-center"
                                >
                                    Pakai Sekarang
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    if (playAudioFeedback) playAudioFeedback("tap");
                                    if (onClose) onClose();
                                }}
                                className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl cursor-pointer active:scale-95 transition-all text-center"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}

                {/* 4. BUTANG UTAMA PUTAR / STATUS */}
                {!winningPrize && (
                    <div className="mt-3">
                        {hasSpunToday ? (
                            <div className="py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200/80 text-center">
                                <span className="text-xs font-bold text-slate-500">
                                    ✓ Putaran hari ini selesai • Kembali esok!
                                </span>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSpin}
                                disabled={isSpinning}
                                className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98 ${
                                    isSpinning
                                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                                        : "bg-[#0099e5] hover:bg-[#0284c7] text-white"
                                }`}
                            >
                                <VectorSparkles className="w-4 h-4 text-white" />
                                <span>{isSpinning ? "Memutar..." : "Putar Sekarang"}</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
