"use client";

import React, { useState } from "react";
import {
    SHOP_CATALOG,
    getShopItemsByType,
    purchaseShopItem,
    equipShopItem,
} from "../../../lib/shopService";
import { GraphicCoin } from "./Graphics";
import ProfileAvatarFrame from "./ProfileAvatarFrame";
import {
    VectorCrown,
    VectorAvatarAstro,
    VectorAvatarScientist,
    VectorAvatarCyber,
    VectorAvatarDino,
    VectorAvatarRobot,
    VectorAvatarCommander,
    VectorPaw,
    VectorSparkles,
} from "./GameIcons";

// TEMA WARNA PADDING & KAD MENGIKUT TAHAP (RARITY / LEVEL) ITEM
const RARITY_THEMES = {
    common: {
        cardBg:
            "bg-gradient-to-b from-slate-50 to-slate-100/90 border-slate-300 hover:border-slate-400",
        badge: "bg-slate-200 text-slate-700 border-slate-300",
        label: "Biasa",
        priceText: "text-slate-700",
    },
    rare: {
        cardBg:
            "bg-gradient-to-b from-sky-50/90 via-cyan-50/50 to-blue-50/80 border-cyan-400 hover:border-cyan-500 shadow-[0_2px_8px_rgba(6,182,212,0.15)]",
        badge: "bg-cyan-100 text-cyan-800 border-cyan-300 font-bold",
        label: "Istimewa",
        priceText: "text-cyan-800",
    },
    epic: {
        cardBg:
            "bg-gradient-to-b from-purple-50/95 via-fuchsia-50/40 to-indigo-50/80 border-purple-400 hover:border-purple-500 shadow-[0_2px_10px_rgba(168,85,247,0.18)]",
        badge: "bg-purple-100 text-purple-800 border-purple-300 font-bold",
        label: "Epik",
        priceText: "text-purple-800",
    },
    legendary: {
        cardBg:
            "bg-gradient-to-b from-amber-50/95 via-yellow-50/40 to-orange-50/80 border-amber-400 hover:border-amber-500 shadow-[0_2px_10px_rgba(245,158,11,0.2)]",
        badge: "bg-amber-100 text-amber-900 border-amber-300 font-black",
        label: "Mitik",
        priceText: "text-amber-900",
    },
    mythic: {
        cardBg:
            "bg-gradient-to-b from-rose-50/95 via-pink-50/40 to-purple-50/80 border-rose-400 hover:border-rose-500 shadow-[0_2px_12px_rgba(244,63,94,0.22)]",
        badge: "bg-rose-100 text-rose-900 border-rose-300 font-black animate-pulse",
        label: "Glory",
        priceText: "text-rose-900",
    },
};

export default function ShopView({
    studentIC = "",
    studentCoins = 50,
    setStudentCoins,
    ownedItems = ["border_cadet", "avatar_astro_1"],
    setOwnedItems,
    equippedItems = { border: "border_cadet", avatar: "avatar_astro_1", pet: null },
    setEquippedItems,
    playAudioFeedback,
    t,
}) {
    const [shopCategory, setShopCategory] = useState("border"); // "border" | "avatar" | "pet" | "all"
    const [alertMessage, setAlertMessage] = useState(null);

    const filteredItems = getShopItemsByType(shopCategory);
    const equippedAvatarItem =
        SHOP_CATALOG.find((i) => i.id === equippedItems?.avatar) || { id: "avatar_astro_1" };

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
            text: `Berjaya dipasang: ${item.name}`,
        });
        setTimeout(() => setAlertMessage(null), 3000);
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
                text: `Aktif: ${item.name}`,
            });
            setTimeout(() => setAlertMessage(null), 2000);
        }
    };

    return (
        <div className="space-y-2.5 text-left anim-fade-in select-none">
            {/* BAR KATEGORI & BAKI KOIN: TIGHT & COMPACT (100% SVG - TIADA EMOJI) */}
            <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
                {/* Kategori Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {[
                        { id: "border", label: "Border", icon: <VectorCrown className="w-3.5 h-3.5" /> },
                        { id: "avatar", label: "Avatar", icon: <VectorAvatarAstro className="w-3.5 h-3.5" /> },
                        { id: "pet", label: "Maskot", icon: <VectorPaw className="w-3.5 h-3.5" /> },
                        { id: "all", label: "Semua", icon: <VectorSparkles className="w-3.5 h-3.5" /> },
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
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
                                    isActive
                                        ? "bg-slate-900 text-white shadow-xs"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                <span className="flex items-center justify-center">{cat.icon}</span>
                                <span>{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Baki Koin Ringkas */}
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-300/80 px-2 py-0.5 rounded-lg shrink-0 shadow-2xs">
                    <GraphicCoin className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-mono font-black text-amber-900 text-xs">
                        {studentCoins}
                    </span>
                </div>
            </div>

            {/* Notifikasi Maklum Balas Ringkas */}
            {alertMessage && (
                <div
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all flex items-center justify-between shadow-2xs ${
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
                        className="text-slate-400 hover:text-slate-700 cursor-pointer ml-2 text-xs"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* GRID KAD ITEM: PADDING KECIL, TIDAK MAKAN RUANG & MENGIKUT WARNA LEVEL */}
            <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {filteredItems.map((item) => {
                    const isOwned =
                        ownedItems.includes(item.id) ||
                        (item.id === "border_cadet" &&
                            (ownedItems.includes("title_cadet") ||
                                ownedItems.includes("border_cadet")));

                    const isEquipped =
                        (item.type === "border" &&
                            (equippedItems?.border === item.id ||
                                (!equippedItems?.border && item.id === "border_cadet"))) ||
                        (item.type === "avatar" && equippedItems?.avatar === item.id) ||
                        (item.type === "pet" && equippedItems?.pet === item.id);

                    const canAfford = studentCoins >= item.price;
                    const theme = RARITY_THEMES[item.rarity] || RARITY_THEMES.common;

                    return (
                        <div
                            key={item.id}
                            className={`group relative rounded-xl p-2 border-2 transition-all flex flex-col justify-between select-none ${
                                theme.cardBg
                            } ${
                                isEquipped
                                    ? "ring-2 ring-emerald-400/80 border-emerald-500 shadow-md"
                                    : ""
                            }`}
                        >
                            {/* Rarity & Status Badge (Compact) */}
                            <div className="flex items-center justify-between mb-1">
                                <span
                                    className={`text-[8.5px] uppercase px-1.5 py-0.2 rounded-md border ${theme.badge}`}
                                >
                                    {theme.label}
                                </span>

                                {isEquipped && (
                                    <span className="text-[8.5px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-1 py-0.2 rounded-md">
                                        Aktif
                                    </span>
                                )}
                            </div>

                            {/* Center Visual: 3D Border Timbul / Avatar / Pet (100% Vector SVG) */}
                            <div className="py-1 flex items-center justify-center">
                                {item.type === "border" ? (
                                    <ProfileAvatarFrame
                                        avatar={equippedAvatarItem?.id || "avatar_astro_1"}
                                        borderId={item.id}
                                        size="sm"
                                        interactive={false}
                                    />
                                ) : item.type === "avatar" ? (
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-[#0099e5] p-0.5 shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center">
                                        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center p-1">
                                            {item.id === "avatar_astro_1" && <VectorAvatarAstro className="w-full h-full" />}
                                            {item.id === "avatar_scientist" && <VectorAvatarScientist className="w-full h-full" />}
                                            {item.id === "avatar_cyber" && <VectorAvatarCyber className="w-full h-full" />}
                                            {item.id === "avatar_explorer" && <VectorAvatarDino className="w-full h-full" />}
                                            {item.id === "avatar_robot" && <VectorAvatarRobot className="w-full h-full" />}
                                            {item.id === "avatar_commander" && <VectorAvatarCommander className="w-full h-full" />}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-xl bg-white/90 border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform p-2 text-[#0099e5]">
                                        <VectorPaw className="w-6 h-6" />
                                    </div>
                                )}
                            </div>

                            {/* Nama Item */}
                            <div className="text-center my-0.5">
                                <h4 className="text-[11px] font-black text-slate-900 truncate">
                                    {item.name}
                                </h4>
                            </div>

                            {/* Harga & Butang Tindakan */}
                            <div className="pt-1 mt-1 border-t border-slate-200/60 flex items-center justify-between gap-1">
                                <div>
                                    {isOwned ? (
                                        <span className="text-[9.5px] font-bold text-slate-400">
                                            Dimiliki
                                        </span>
                                    ) : item.price === 0 ? (
                                        <span className="text-[10px] font-black text-emerald-600">
                                            Percuma
                                        </span>
                                    ) : (
                                        <span className={`text-[10.5px] font-black font-mono flex items-center gap-0.5 ${theme.priceText}`}>
                                            <GraphicCoin className="w-3 h-3 shrink-0 inline" />
                                            <span>{item.price}</span>
                                        </span>
                                    )}
                                </div>

                                <div>
                                    {isEquipped ? (
                                        <span className="text-[9px] font-black text-emerald-700 px-1.5 py-0.5 bg-emerald-100/80 rounded">
                                            ✓
                                        </span>
                                    ) : isOwned ? (
                                        <button
                                            type="button"
                                            onClick={() => handleEquip(item)}
                                            className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-white text-[9.5px] font-bold rounded-md transition-all active:scale-95 cursor-pointer"
                                        >
                                            Pakai
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleBuy(item)}
                                            disabled={!canAfford}
                                            className={`px-2 py-0.5 text-[9.5px] font-black rounded-md transition-all active:scale-95 cursor-pointer flex items-center gap-0.5 ${
                                                canAfford
                                                    ? "bg-[#0099e5] hover:bg-[#0088cc] text-white shadow-2xs"
                                                    : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                                            }`}
                                        >
                                            <span>Beli</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
