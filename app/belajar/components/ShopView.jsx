"use client";

import React, { useState } from "react";
import { SHOP_CATALOG, getShopItemsByType, purchaseShopItem, equipShopItem } from "../../../lib/shopService";
import { GraphicCoin } from "./Graphics";

export default function ShopView({
    studentIC = "",
    studentCoins = 50,
    setStudentCoins,
    ownedItems = ["title_cadet", "avatar_astro_1"],
    setOwnedItems,
    equippedItems = { title: "title_cadet", avatar: "avatar_astro_1", pet: null },
    setEquippedItems,
    playAudioFeedback,
    t,
}) {
    const [shopCategory, setShopCategory] = useState("all"); // "all" | "title" | "avatar" | "pet"
    const [alertMessage, setAlertMessage] = useState(null);

    const filteredItems = getShopItemsByType(shopCategory);

    const handleBuy = (item) => {
        const res = purchaseShopItem({
            studentIC,
            itemId: item.id,
            currentCoins: studentCoins,
            ownedItems,
        });

        if (!res.success) {
            if (playAudioFeedback) playAudioFeedback("wrong");
            setAlertMessage({ type: "error", text: res.error });
            setTimeout(() => setAlertMessage(null), 3000);
            return;
        }

        if (playAudioFeedback) playAudioFeedback("sparkle");
        setStudentCoins(res.nextCoins);
        setOwnedItems(res.nextOwned);

        // Auto-equip item selepas beli untuk kepuasan pengguna
        const equipRes = equipShopItem({
            studentIC,
            item,
            currentEquipped: equippedItems,
        });
        if (equipRes.success) {
            setEquippedItems(equipRes.nextEquipped);
        }

        setAlertMessage({
            type: "success",
            text: `🎉 Tahniah! Anda berjaya membuka kunci "${item.name}" dan telah dipasangkan ke profil!`,
        });
        setTimeout(() => setAlertMessage(null), 4000);
    };

    const handleEquip = (item) => {
        const res = equipShopItem({
            studentIC,
            item,
            currentEquipped: equippedItems,
        });

        if (res.success) {
            if (playAudioFeedback) playAudioFeedback("tap");
            setEquippedItems(res.nextEquipped);
            setAlertMessage({
                type: "info",
                text: `✨ "${item.name}" kini dipasang ke profil anda!`,
            });
            setTimeout(() => setAlertMessage(null), 2500);
        }
    };

    const rarityBadges = {
        common: "bg-slate-100 text-slate-600 border-slate-200",
        rare: "bg-blue-50 text-blue-700 border-blue-200",
        epic: "bg-purple-50 text-purple-700 border-purple-200",
        legendary: "bg-amber-50 text-amber-700 border-amber-200",
    };

    const rarityLabels = {
        common: "Biasa",
        rare: "Istimewa",
        epic: "Epik",
        legendary: "Legenda",
    };

    return (
        <div className="space-y-5 text-left anim-fade-in">
            {/* Header Kedai & Baki Koin */}
            <div className="bg-linear-to-r from-amber-500 via-amber-600 to-yellow-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Background Coin watermark */}
                <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-15 select-none pointer-events-none">
                    <GraphicCoin className="w-full h-full" />
                </div>

                <div className="relative z-10 space-y-1">
                    <div className="flex items-center gap-2">
                        <GraphicCoin className="w-6 h-6" />
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                            Kedai Penjelajah
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-md leading-relaxed">
                        Kumpul Koin Bintang melalui aktiviti dan buka kunci gelaran, kostum, dan maskot teman!
                    </p>
                </div>

                {/* Baki Koin Bintang Semasa */}
                <div className="relative z-10 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/30 flex items-center gap-3 shrink-0 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-300/30 border border-amber-300/50 flex items-center justify-center shadow-xs">
                        <GraphicCoin className="w-6 h-6 drop-shadow-xs" />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-amber-100 block tracking-wider">
                            Baki Koin Bintang
                        </span>
                        <span className="text-xl sm:text-2xl font-black font-mono leading-none block">
                            {studentCoins} <span className="text-xs font-sans font-bold">Koin</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Notifikasi Maklum Balas */}
            {alertMessage && (
                <div
                    className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between shadow-xs ${
                        alertMessage.type === "success"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                            : alertMessage.type === "info"
                            ? "bg-sky-50 border-sky-300 text-sky-900"
                            : "bg-rose-50 border-rose-300 text-rose-900"
                    }`}
                >
                    <span>{alertMessage.text}</span>
                    <button
                        type="button"
                        onClick={() => setAlertMessage(null)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer ml-2"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Tab Kategori Kedai */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                    { id: "all", label: "Semua Item", icon: "✨" },
                    { id: "title", label: "Gelaran Profil", icon: "🎓" },
                    { id: "avatar", label: "Kostum Avatar", icon: "🧑‍🚀" },
                    { id: "pet", label: "Maskot Teman", icon: "🐾" },
                ].map((cat) => {
                    const isActive = shopCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("tap");
                                setShopCategory(cat.id);
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                                isActive
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                            }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Grid Barangan Kedai */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                    const isOwned = ownedItems.includes(item.id);
                    const isEquipped =
                        (item.type === "title" && equippedItems.title === item.id) ||
                        (item.type === "avatar" && equippedItems.avatar === item.id) ||
                        (item.type === "pet" && equippedItems.pet === item.id);
                    const canAfford = studentCoins >= item.price;

                    return (
                        <div
                            key={item.id}
                            className={`bg-white rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                                isEquipped
                                    ? "border-emerald-400 shadow-sm ring-2 ring-emerald-100"
                                    : isOwned
                                    ? "border-slate-200"
                                    : "border-slate-200 hover:border-amber-300 hover:shadow-xs"
                            }`}
                        >
                            <div className="space-y-3">
                                {/* Preview Ikon & Lencana Rarity */}
                                <div className="flex items-start justify-between">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-2xs">
                                        {item.icon}
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <span
                                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${
                                                rarityBadges[item.rarity] || rarityBadges.common
                                            }`}
                                        >
                                            {rarityLabels[item.rarity]}
                                        </span>

                                        {isEquipped && (
                                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                ✓ Dipasang
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Maklumat Item */}
                                <div>
                                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                                        {item.name}
                                    </h4>
                                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Tindakan Beli / Pasang */}
                            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    {isOwned ? (
                                        <span className="text-[11px] font-bold text-slate-400">
                                            Dimiliki
                                        </span>
                                    ) : item.price === 0 ? (
                                        <span className="text-xs font-black text-emerald-600 font-mono">
                                            Percuma
                                        </span>
                                    ) : (
                                        <span className="text-xs font-black text-amber-700 font-mono flex items-center gap-1">
                                            <GraphicCoin className="w-3.5 h-3.5 shrink-0" />
                                            <span>{item.price}</span>
                                        </span>
                                    )}
                                </div>

                                <div>
                                    {isEquipped ? (
                                        <button
                                            type="button"
                                            disabled
                                            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl cursor-default"
                                        >
                                            Aktif
                                        </button>
                                    ) : isOwned ? (
                                        <button
                                            type="button"
                                            onClick={() => handleEquip(item)}
                                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95"
                                        >
                                            Gunakan
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleBuy(item)}
                                            disabled={!canAfford}
                                            className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer active:scale-95 flex items-center gap-1 ${
                                                canAfford
                                                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                                                    : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                                            }`}
                                        >
                                            <span>Buka Kunci</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tip Tambah Koin Ringkas */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                    <span className="text-base">💡</span>
                    <span className="font-bold text-slate-700">Cara dapatkan lebih banyak Koin Bintang:</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500 flex-wrap">
                    <span className="inline-flex items-center gap-1">Kuiz/Pertandingan (+15 <GraphicCoin className="w-3 h-3 inline" />)</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">Streak Harian (+10 <GraphicCoin className="w-3 h-3 inline" />)</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">Skor 100% (+30 <GraphicCoin className="w-3 h-3 inline" />)</span>
                </div>
            </div>
        </div>
    );
}
