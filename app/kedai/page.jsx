"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ShopView from "../belajar/components/ShopView";
import ProfileAvatarFrame from "../belajar/components/ProfileAvatarFrame";
import MobileBottomNav from "../belajar/components/MobileBottomNav";
import { GraphicCoin } from "../belajar/components/Graphics";
import { SHOP_CATALOG, DEFAULT_OWNED_ITEMS } from "../../lib/shopService";

export default function KedaiPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [studentIC, setStudentIC] = useState("");
    const [studentName, setStudentName] = useState("Penjelajah");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentCoins, setStudentCoins] = useState(150);
    const [ownedItems, setOwnedItems] = useState(DEFAULT_OWNED_ITEMS);
    const [equippedItems, setEquippedItems] = useState({
        border: "border_cadet",
        avatar: "avatar_astro_1",
        pet: null,
    });

    // Audio Feedback Web Audio API
    const playAudioFeedback = (type) => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;
            if (type === "sparkle") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === "tap") {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(320, now);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === "wrong") {
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(180, now);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            }
        } catch {}
    };

    const t = (bm) => bm;

    useEffect(() => {
        setIsMounted(true);
        try {
            const activeIC = localStorage.getItem("exploria_student_ic") || localStorage.getItem("exploria_active_ic");
            const rawSession = localStorage.getItem("exploria_student_session");
            if (rawSession) {
                const s = JSON.parse(rawSession);
                if (s?.name) setStudentName(s.name);
                if (s?.ic) setStudentIC(s.ic);
                setIsLoggedIn(true);
            }

            const icKey = activeIC || "default";
            const shopRaw = localStorage.getItem(`exploria_student_${icKey}_shop`);
            if (shopRaw) {
                const parsed = JSON.parse(shopRaw);
                if (typeof parsed.coins === "number") setStudentCoins(parsed.coins);
                if (Array.isArray(parsed.ownedItems)) setOwnedItems(parsed.ownedItems);
            }

            const equippedRaw = localStorage.getItem(`exploria_student_${icKey}_equipped`);
            if (equippedRaw) {
                const parsed = JSON.parse(equippedRaw);
                setEquippedItems((prev) => ({ ...prev, ...parsed }));
            }
        } catch (e) {
            console.error("Gagal memuat sesi kedai:", e);
        }
    }, []);

    if (!isMounted) return null;

    const equippedBorderId = equippedItems?.border || "border_cadet";
    const equippedAvatarItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.avatar);
    const equippedPetItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.pet);

    const handleNavigate = (view) => {
        if (view === "menu") {
            window.location.href = "/belajar";
        } else if (view === "profile") {
            window.location.href = "/belajar";
        } else if (view === "leaderboard") {
            window.location.href = "/belajar";
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans select-none relative">
            {/* TOP BAR / NAVIGASI MINIMALIS */}
            <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs select-none">
                <div className="max-w-md sm:max-w-xl mx-auto px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
                    {/* KIRI: LOGO EXPLORIA */}
                    <Link
                        href="/belajar"
                        onClick={() => playAudioFeedback("tap")}
                        className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
                    >
                        <img
                            src="/logoexploria.png"
                            alt="Logo Exploria"
                            className="h-7 sm:h-8 w-auto object-contain"
                        />
                    </Link>

                    {/* KANAN: KOIN & AVATAR */}
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 sm:h-9 px-3 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 font-black text-xs flex items-center gap-1.5 shadow-xs"
                            title={`Koin: ${studentCoins}`}
                        >
                            <GraphicCoin className="w-3.5 h-3.5 shrink-0" />
                            <span>{studentCoins}</span>
                        </div>

                        <Link
                            href="/belajar"
                            className="flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-sky-200 transition-all cursor-pointer active:scale-95"
                            title={studentName}
                        >
                            <ProfileAvatarFrame
                                avatar={equippedAvatarItem?.id || "avatar_astro_1"}
                                borderId={equippedBorderId}
                                pet={equippedPetItem}
                                size="sm"
                            />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT CONTAINER */}
            <main className="flex-1 w-full max-w-md sm:max-w-xl mx-auto px-3.5 sm:px-4 pt-3 pb-24 flex flex-col items-center justify-start relative z-10">
                <ShopView
                    studentIC={studentIC}
                    studentCoins={studentCoins}
                    setStudentCoins={setStudentCoins}
                    ownedItems={ownedItems}
                    setOwnedItems={setOwnedItems}
                    equippedItems={equippedItems}
                    setEquippedItems={setEquippedItems}
                    playAudioFeedback={playAudioFeedback}
                    t={t}
                    onNavigate={handleNavigate}
                    showBackToMenu={true}
                />
            </main>

            {/* MOBILE BOTTOM NAVIGATION BAR */}
            <MobileBottomNav
                currentView="shop"
                onNavigate={handleNavigate}
                playAudioFeedback={playAudioFeedback}
                t={t}
            />
        </div>
    );
}
