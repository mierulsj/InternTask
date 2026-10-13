"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ShopView from "../belajar/components/ShopView";
import { GraphicHomeButton, GraphicBackArrow, GraphicMascotRobot, LanguageToggle, GraphicCoin } from "../belajar/components/Graphics";
import { SHOP_CATALOG, DEFAULT_OWNED_ITEMS } from "../../lib/shopService";

export default function KedaiPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [studentIC, setStudentIC] = useState("");
    const [studentName, setStudentName] = useState("Penjelajah STEM");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentCoins, setStudentCoins] = useState(150); // Baki permulaan demo jika belum login
    const [ownedItems, setOwnedItems] = useState(DEFAULT_OWNED_ITEMS);
    const [equippedItems, setEquippedItems] = useState({
        title: "title_cadet",
        avatar: "avatar_astro_1",
        pet: null,
    });
    const [language, setLanguage] = useState("bm");
    const [toastMessage, setToastMessage] = useState(null);

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
        } catch {
            // Audio context fallback
        }
    };

    const toggleLanguage = () => {
        playAudioFeedback("sparkle");
        const next = language === "bm" ? "en" : "bm";
        setLanguage(next);
        try {
            localStorage.setItem("exploria_lang", next);
        } catch {}
    };

    const t = (bm, en) => (language === "en" ? en : bm);

    useEffect(() => {
        setIsMounted(true);
        try {
            const savedLang = localStorage.getItem("exploria_lang");
            if (savedLang) setLanguage(savedLang);

            const activeIC = localStorage.getItem("exploria_student_ic") || localStorage.getItem("exploria_active_ic");
            const rawSession = localStorage.getItem("exploria_student_session");
            if (rawSession) {
                const s = JSON.parse(rawSession);
                if (s?.name) setStudentName(s.name);
                if (s?.ic) setStudentIC(s.ic);
                setIsLoggedIn(true);
            }

            // Muat data kedai & koin murid
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

    // Tambah Koin Percuma Ujian (+100 🌟)
    const handleClaimTestCoins = () => {
        playAudioFeedback("sparkle");
        const next = studentCoins + 100;
        setStudentCoins(next);
        try {
            const ic = studentIC || localStorage.getItem("exploria_student_ic") || "default";
            const key = `exploria_student_${ic}_shop`;
            const payload = {
                coins: next,
                ownedItems,
            };
            localStorage.setItem(key, JSON.stringify(payload));
        } catch {}

        setToastMessage("🎁 +100 Koin Bintang berjaya ditambahkan ke akaun anda!");
        setTimeout(() => setToastMessage(null), 3000);
    };

    if (!isMounted) return null;

    const equippedAvatarItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.avatar);
    const equippedTitleItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.title);
    const equippedPetItem = SHOP_CATALOG.find((i) => i.id === equippedItems?.pet);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-slate-800 flex flex-col font-sans relative selection:bg-amber-400 selection:text-amber-950">
            {/* Background Glows */}
            <div className="fixed -top-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* TOP BAR / NAVIGASI */}
            <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/belajar"
                            onClick={() => playAudioFeedback("tap")}
                            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all active:scale-95"
                            title="Kembali ke Portal Belajar"
                        >
                            <GraphicHomeButton className="w-5 h-5 text-white" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-white font-black text-sm sm:text-base tracking-tight">
                                    Kedai Penjelajah <span className="text-amber-400">STEM</span>
                                </span>
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                                    <GraphicCoin className="w-3 h-3" /> Buka Kunci
                                </span>
                            </div>
                            <span className="text-[10px] text-slate-400 block font-medium">
                                Tukar Koin Bintang untuk Kostum, Gelaran & Maskot Comel
                            </span>
                        </div>
                    </div>

                    {/* Navigation Links Desktop */}
                    <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
                        <Link
                            href="/belajar"
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                            🏠 Utama
                        </Link>
                        <Link
                            href="/aktiviti"
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                            🎮 Aktiviti
                        </Link>
                        <Link
                            href="/pertandingan"
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                            🏆 Pertandingan
                        </Link>
                    </div>

                    {/* Profile & Coins Badge */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleClaimTestCoins}
                            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-transparent border-2 border-amber-400 hover:bg-amber-400/15 text-amber-400 font-black text-xs active:scale-95 transition-all cursor-pointer"
                            title="Tekan untuk tambah koin ujian percuma"
                        >
                            <span>🎁</span>
                            <span>+100 Koin Ujian</span>
                        </button>

                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-2xl">
                            <span className="text-base">{equippedAvatarItem?.icon || "🧑‍🚀"}</span>
                            <div className="text-left hidden sm:block">
                                <span className="text-[11px] font-black text-white block leading-tight">
                                    {studentName}
                                </span>
                                <span className="text-[9px] font-bold text-amber-300">
                                    {equippedTitleItem?.name || "Kadet STEM"}
                                </span>
                            </div>
                            <span className="font-mono font-black text-amber-300 text-xs sm:text-sm pl-1 border-l border-white/20 flex items-center gap-1">
                                <GraphicCoin className="w-3.5 h-3.5 shrink-0" />
                                <span>{studentCoins}</span>
                            </span>
                        </div>

                        {/* BUTANG CART EMOJI KEDAI & DUIT SEMASA (SEBELAH BAHASA) */}
                        <div
                            className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl sm:rounded-2xl bg-amber-300 text-amber-950 border border-amber-400 ring-2 ring-amber-300/50 shadow-md flex items-center gap-1.5 select-none"
                            title={t(`Kedai Penjelajah • Baki: ${studentCoins} Koin Bintang`, `Explorer Shop • Balance: ${studentCoins} Star Coins`)}
                            aria-label="Kedai Penjelajah"
                        >
                            <GraphicCoin className="w-4 h-4 shrink-0 drop-shadow-xs" />
                            <span className="text-xs font-mono font-black text-amber-950">
                                {studentCoins}
                            </span>
                        </div>

                        <LanguageToggle language={language} onToggle={toggleLanguage} variant="dark" />
                    </div>
                </div>
            </header>

            {/* TOAST MESSAGE */}
            {toastMessage && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 px-5 py-2.5 rounded-2xl shadow-2xl font-black text-xs sm:text-sm border-2 border-white anim-pop">
                    {toastMessage}
                </div>
            )}

            {/* MAIN CONTENT CONTAINER */}
            <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                {/* Banner Mobile untuk Tambah Koin Ujian */}
                <div className="sm:hidden flex items-center justify-between bg-amber-400/10 border border-amber-400/30 rounded-2xl p-3 text-amber-200">
                    <div className="text-xs font-bold flex items-center gap-1">
                        Baki Koin: <span className="text-amber-400 font-mono font-black inline-flex items-center gap-1"><GraphicCoin className="w-3.5 h-3.5 shrink-0" />{studentCoins}</span>
                    </div>
                    <button
                        type="button"
                        onClick={handleClaimTestCoins}
                        className="px-3 py-1 bg-transparent border-2 border-amber-400 text-amber-300 hover:bg-amber-400/15 rounded-xl text-xs font-black active:scale-95 transition-all"
                    >
                        🎁 +100 Koin Ujian
                    </button>
                </div>

                {/* Container Kad Kedai (White Shell) */}
                <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl border-4 border-[#0099e5]/30">
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
                    />

                    {/* Footer Navigasi Pantas */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                            <span>🎮</span>
                            <span>Main kuiz & aktiviti STEM di portal untuk kumpul lebih banyak Koin Bintang.</span>
                        </div>
                        <Link
                            href="/belajar"
                            className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0088cc] font-black flex items-center gap-1.5 transition-all"
                        >
                            <span>Kembali ke Laman Pembelajaran</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
