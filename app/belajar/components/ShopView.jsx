"use client";

import React, { useState } from "react";
import {
    SHOP_CATALOG,
    getShopItemsByType,
    purchaseShopItem,
    equipShopItem,
} from "../../../lib/shopService";
import { GraphicCoin, GraphicBackArrow } from "./Graphics";
import ProfileAvatarFrame, { BORDER_STYLES } from "./ProfileAvatarFrame";
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

const RARITY_THEMES = {
    common: {
        badge: "bg-slate-100 text-slate-600 border-slate-200",
        label: "Biasa",
    },
    rare: {
        badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
        label: "Istimewa",
    },
    epic: {
        badge: "bg-purple-50 text-purple-700 border-purple-200",
        label: "Epik",
    },
    legendary: {
        badge: "bg-amber-50 text-amber-800 border-amber-300",
        label: "Mitik",
    },
    mythic: {
        badge: "bg-rose-50 text-rose-700 border-rose-200",
        label: "Glory",
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
    t = (bm) => bm,
    onNavigate,
    showBackToMenu = false,
}) {
    const [shopCategory, setShopCategory] = useState("border"); // "border" | "avatar" | "pet" | "all"
    const [alertMessage, setAlertMessage] = useState(null);

    const filteredItems = getShopItemsByType(shopCategory);
    const equippedAvatarItem =
        SHOP_CATALOG.find((i) => i.id === equippedItems?.avatar) || { id: "avatar_astro_1", name: "Kadet Angkasa" };
    const equippedBorderItem =
        SHOP_CATALOG.find((i) => i.id === equippedItems?.border) || { id: "border_cadet", name: "Besi Perintis" };
    const equippedPetItem =
        SHOP_CATALOG.find((i) => i.id === equippedItems?.pet);

    const handleBuy = (item) => {
        const res = purchaseShopItem({
            studentIC,
            itemId: item.id,
            currentCoins: studentCoins,
            ownedItems,
        });

        if (!res.success) {
            if (playAudioFeedback) playAudioFeedback("wrong");
            setAlertMessage({ type: "error", text: res.error || "Koin tidak mencukupi!" });
            setTimeout(() => setAlertMessage(null), 3000);
            return;
        }

        if (playAudioFeedback) playAudioFeedback("sparkle");
        if (setStudentCoins) setStudentCoins(res.nextCoins);
        if (setOwnedItems) setOwnedItems(res.nextOwned);

        const equipRes = equipShopItem({
            studentIC,
            item,
            currentEquipped: equippedItems,
        });
        if (equipRes.success && setEquippedItems) {
            setEquippedItems(equipRes.nextEquipped);
        }

        setAlertMessage({
            type: "success",
            text: `Berjaya dibeli & dipakai: ${item.name}! 🎉`,
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
            if (setEquippedItems) setEquippedItems(res.nextEquipped);
            setAlertMessage({
                type: "info",
                text: `Avatar dikemas kini: ${item.name}`,
            });
            setTimeout(() => setAlertMessage(null), 2500);
        }
    };

    return (
        <div className="w-full max-w-md sm:max-w-xl mx-auto space-y-4 text-left anim-fade-in select-none pb-8">

            {/* 1. HEADER ATAS KEDAI (JIKA DIBUKA SECARA LANGSUNG DARI BOTTOM NAV / TOP BAR) */}
            <div className="px-1 pt-1 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    {onNavigate && (
                        <button
                            type="button"
                            onClick={() => {
                                if (playAudioFeedback) playAudioFeedback("tap");
                                onNavigate("menu");
                            }}
                            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all group"
                        >
                            <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                            <span>Kembali</span>
                        </button>
                    )}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#0099e5] tracking-tight">
                            Kedai Penjelajah
                        </h2>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5">
                            Guna koin untuk buka avatar & bingkai!
                        </p>
                    </div>
                </div>

                {/* Baki Koin */}
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-300/80 px-3 py-1.5 rounded-2xl shadow-xs shrink-0">
                    <GraphicCoin className="w-4 h-4 shrink-0" />
                    <span className="font-mono font-black text-amber-900 text-sm">
                        {studentCoins}
                    </span>
                </div>
            </div>

            {/* 2. PENTAS AVATAR LIVE (PREVIEW AVATAR SEMASA MURID) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-50 via-white to-indigo-50/60 p-4 border border-sky-100 shadow-xs flex items-center gap-3.5">
                <div className="relative shrink-0 p-1">
                    <ProfileAvatarFrame
                        avatar={equippedAvatarItem?.id || "avatar_astro_1"}
                        borderId={equippedItems?.border || "border_cadet"}
                        pet={equippedPetItem}
                        size="md"
                        interactive={false}
                    />
                </div>
                <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                        {equippedAvatarItem?.name || "Kadet Angkasa"}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                        {equippedBorderItem?.name || "Besi Perintis"}
                    </p>
                </div>
            </div>

            {/* 3. NOTIFIKASI MAKLUM BALAS / TOAST */}
            {alertMessage && (
                <div
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between shadow-xs anim-pop ${
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

            {/* 4. TAB KATEGORI ITEM (BINGKAI, AVATAR, MASKOT, SEMUA) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
                {[
                    { id: "border", label: "Bingkai", icon: <VectorCrown className="w-4 h-4" /> },
                    { id: "avatar", label: "Avatar", icon: <VectorAvatarAstro className="w-4 h-4" /> },
                    { id: "pet", label: "Maskot", icon: <VectorPaw className="w-4 h-4" /> },
                    { id: "all", label: "Semua", icon: <VectorSparkles className="w-4 h-4" /> },
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
                            className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                                isActive
                                    ? "bg-white text-[#0099e5] shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* 5. GRID KAD ITEM (2 KOLUM PADA MOBILE - MESRA JARI KANAK-KANAK) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {filteredItems.map((item) => {
                    const isOwned =
                        ownedItems.includes(item.id) ||
                        (item.id === "border_cadet" &&
                            (ownedItems.includes("title_cadet") || ownedItems.includes("border_cadet")));

                    const isEquipped =
                        (item.type === "border" &&
                            (equippedItems?.border === item.id || (!equippedItems?.border && item.id === "border_cadet"))) ||
                        (item.type === "avatar" && equippedItems?.avatar === item.id) ||
                        (item.type === "pet" && equippedItems?.pet === item.id);

                    const canAfford = studentCoins >= item.price;
                    const rarityInfo = RARITY_THEMES[item.rarity] || RARITY_THEMES.common;

                    return (
                        <div
                            key={item.id}
                            className={`bg-white rounded-2xl p-3 border-2 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md ${
                                isEquipped
                                    ? "border-emerald-500 ring-2 ring-emerald-400/40"
                                    : "border-slate-100 hover:border-slate-200"
                            }`}
                        >
                            {/* Rarity Tag */}
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${rarityInfo.badge}`}>
                                    {rarityInfo.label}
                                </span>
                                {isEquipped && (
                                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                                        Aktif
                                    </span>
                                )}
                            </div>

                            {/* Center Preview Visual */}
                            <div className="py-2 flex items-center justify-center min-h-[70px]">
                                {item.type === "border" ? (
                                    <ProfileAvatarFrame
                                        avatar={equippedAvatarItem?.id || "avatar_astro_1"}
                                        borderId={item.id}
                                        size="sm"
                                        interactive={false}
                                    />
                                ) : item.type === "avatar" ? (
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-[#0099e5] p-0.5 shadow-2xs flex items-center justify-center">
                                        <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center p-1.5">
                                            {item.id === "avatar_astro_1" && <VectorAvatarAstro className="w-full h-full" />}
                                            {item.id === "avatar_scientist" && <VectorAvatarScientist className="w-full h-full" />}
                                            {item.id === "avatar_cyber" && <VectorAvatarCyber className="w-full h-full" />}
                                            {item.id === "avatar_explorer" && <VectorAvatarDino className="w-full h-full" />}
                                            {item.id === "avatar_robot" && <VectorAvatarRobot className="w-full h-full" />}
                                            {item.id === "avatar_commander" && <VectorAvatarCommander className="w-full h-full" />}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shadow-2xs p-2 text-amber-600">
                                        <VectorPaw className="w-7 h-7" />
                                    </div>
                                )}
                            </div>

                            {/* Item Title */}
                            <div className="text-center my-1">
                                <h4 className="text-xs sm:text-sm font-black text-slate-800 truncate" title={item.name}>
                                    {item.name}
                                </h4>
                            </div>

                            {/* Action Button (Besar & Mudah Ditekan Murid) */}
                            <div className="pt-2 mt-1 border-t border-slate-100">
                                {isEquipped ? (
                                    <div className="w-full py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl text-center border border-emerald-200 flex items-center justify-center gap-1">
                                        <span>✓</span>
                                        <span>Dipakai</span>
                                    </div>
                                ) : isOwned ? (
                                    <button
                                        type="button"
                                        onClick={() => handleEquip(item)}
                                        className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition-all active:scale-95 cursor-pointer shadow-xs"
                                    >
                                        Pakai
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleBuy(item)}
                                        disabled={!canAfford}
                                        className={`w-full py-1.5 text-xs font-black rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1 ${
                                            canAfford
                                                ? "bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-xs"
                                                : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                                        }`}
                                    >
                                        <GraphicCoin className="w-3.5 h-3.5 shrink-0" />
                                        <span>{item.price === 0 ? "Percuma" : item.price}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
