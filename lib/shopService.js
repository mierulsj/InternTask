/**
 * =========================================================================
 * SHOP SERVICE - EXPLORIA STEM
 * Pengurusan Katalog Kedai, Mata Wang Koin Bintang (🌟), & Item Buka Kunci
 * =========================================================================
 */

import { saveStudentProfile } from "./firestoreService";

export const SHOP_CATALOG = [
    // -------------------------------------------------------------------------
    // 1. BINGKAI BORDER PROFIL (AVATAR FRAMES ALA MOBILE LEGENDS - TIMBUL & GEMPAK)
    // -------------------------------------------------------------------------
    {
        id: "border_cadet",
        type: "border",
        name: "Besi Perintis",
        icon: "🛡️",
        price: 0,
        rarity: "common",
        tagline: "Keluli asas",
    },
    {
        id: "border_lightning",
        type: "border",
        name: "Kilat Petir",
        icon: "lightning",
        price: 45,
        rarity: "rare",
        tagline: "Renjatan neon",
    },
    {
        id: "border_ice",
        type: "border",
        name: "Naga Ais Glosial",
        icon: "ice",
        price: 70,
        rarity: "epic",
        tagline: "Kristal fros beku",
    },
    {
        id: "border_fire",
        type: "border",
        name: "Lava Phoenix",
        icon: "fire",
        price: 80,
        rarity: "epic",
        tagline: "Magma membara",
    },
    {
        id: "border_emerald",
        type: "border",
        name: "Zamrud Bio-Sains",
        icon: "gem",
        price: 90,
        rarity: "epic",
        tagline: "Kristal zamrud hijau",
    },
    {
        id: "border_cosmic",
        type: "border",
        name: "Galaksi Nebula",
        icon: "planet",
        price: 110,
        rarity: "epic",
        tagline: "Cincin kosmik",
    },
    {
        id: "border_abyss",
        type: "border",
        name: "Void Abyss Gelap",
        icon: "abyss",
        price: 120,
        rarity: "epic",
        tagline: "Aura bayang malam",
    },
    {
        id: "border_cyber",
        type: "border",
        name: "Mecha Siberpunk",
        icon: "cyber",
        price: 140,
        rarity: "legendary",
        tagline: "Armor futuristik",
    },
    {
        id: "border_starlight",
        type: "border",
        name: "Starlight Tahunan",
        icon: "starlight",
        price: 150,
        rarity: "legendary",
        tagline: "Permata bintang starlight",
    },
    {
        id: "border_dragon",
        type: "border",
        name: "Naga Emas Magma",
        icon: "dragon",
        price: 160,
        rarity: "legendary",
        tagline: "Sayap naga magma perkasa",
    },
    {
        id: "border_aspirants",
        type: "border",
        name: "Aspirants Mecha Siber",
        icon: "aspirants",
        price: 170,
        rarity: "legendary",
        tagline: "Sayap mecha anime siber",
    },
    {
        id: "border_mythic",
        type: "border",
        name: "Mitik Diraja Emas",
        icon: "crown",
        price: 180,
        rarity: "legendary",
        tagline: "Mahkota emas klasik MLBB",
    },
    {
        id: "border_rainbow",
        type: "border",
        name: "Aurora Prisma",
        icon: "rainbow",
        price: 200,
        rarity: "mythic",
        tagline: "Spektrum pelangi bercahaya",
    },
    {
        id: "border_collector",
        type: "border",
        name: "Kolektor Diraja",
        icon: "collector",
        price: 210,
        rarity: "mythic",
        tagline: "Plat emas & permata kecubung",
    },
    {
        id: "border_glory",
        type: "border",
        name: "Mitik Gemilang (Glory)",
        icon: "glory",
        price: 220,
        rarity: "mythic",
        tagline: "Pangkat 50★ Mitik Gemilang",
    },
    {
        id: "border_mworld",
        type: "border",
        name: "Juara M-World (M5/M6)",
        icon: "mworld",
        price: 235,
        rarity: "mythic",
        tagline: "Armor kejuaraan dunia emas",
    },
    {
        id: "border_mythic_immortal",
        type: "border",
        name: "Mitik Imortal (100★)",
        icon: "immortal",
        price: 250,
        rarity: "mythic",
        tagline: "Pangkat tertinggi 100★ Imortal",
    },

    // -------------------------------------------------------------------------
    // 2. KOSTUM & AVATAR PENJELAJAH (AVATARS)
    // -------------------------------------------------------------------------
    {
        id: "avatar_astro_1",
        type: "avatar",
        name: "Angkasawan Perintis",
        icon: "astro",
        price: 0,
        rarity: "common",
        tagline: "Suit angkasa Exploria standard.",
        badgeColor: "from-sky-400 to-sky-600",
    },
    {
        id: "avatar_scientist",
        type: "avatar",
        name: "Saintis Makmal",
        icon: "scientist",
        price: 50,
        rarity: "rare",
        tagline: "Kot makmal eksperimen kimia & biologi.",
        badgeColor: "from-teal-400 to-teal-600",
    },
    {
        id: "avatar_cyber",
        type: "avatar",
        name: "Penyelidik Siber",
        icon: "cyber",
        price: 80,
        rarity: "rare",
        tagline: "Gogal VR penganalisis data digital.",
        badgeColor: "from-indigo-400 to-indigo-600",
    },
    {
        id: "avatar_explorer",
        type: "avatar",
        name: "Penjelajah Dino",
        icon: "dino",
        price: 110,
        rarity: "epic",
        tagline: "Pakar paleontologi hidupan purba.",
        badgeColor: "from-amber-500 to-amber-600",
    },
    {
        id: "avatar_robot",
        type: "avatar",
        name: "Kadet Mecha",
        icon: "robot",
        price: 140,
        rarity: "epic",
        tagline: "Armor robot ultrasonik pintar.",
        badgeColor: "from-emerald-400 to-emerald-600",
    },
    {
        id: "avatar_commander",
        type: "avatar",
        name: "Komander Emas",
        icon: "commander",
        price: 200,
        rarity: "legendary",
        tagline: "Suit angkasawan bersalut emas juara.",
        badgeColor: "from-yellow-400 to-amber-500",
    },

    // -------------------------------------------------------------------------
    // 3. MASKOT TEMAN PEMBELAJARAN (PETS)
    // -------------------------------------------------------------------------
    {
        id: "pet_robot",
        type: "pet",
        name: "AstroBot",
        icon: "robot",
        price: 80,
        rarity: "rare",
        tagline: "Robot terapung semakan jawapan.",
        tagColor: "bg-sky-50 text-sky-800",
    },
    {
        id: "pet_cat",
        type: "pet",
        name: "Cosmo Meow",
        icon: "cat",
        price: 120,
        rarity: "epic",
        tagline: "Kucing comel bertopi angkasa lepas.",
        tagColor: "bg-rose-50 text-rose-800",
    },
    {
        id: "pet_plant",
        type: "pet",
        name: "Sprout Genius",
        icon: "plant",
        price: 120,
        rarity: "epic",
        tagline: "Tunas fotosintesis hidup comel.",
        tagColor: "bg-emerald-50 text-emerald-800",
    },
    {
        id: "pet_owl",
        type: "pet",
        name: "Athena Si Burung Hantu",
        icon: "owl",
        price: 180,
        rarity: "legendary",
        tagline: "Peneman malam pembisik petua sains.",
        tagColor: "bg-purple-50 text-purple-800",
    },
];

export const DEFAULT_OWNED_ITEMS = ["border_cadet", "avatar_astro_1"];

/**
 * Dapatkan Senarai Item Mengikut Jenis
 */
export function getShopItemsByType(type = "all") {
    if (type === "all") return SHOP_CATALOG;
    return SHOP_CATALOG.filter((item) => item.type === type);
}

/**
 * Beli Item dari Kedai
 */
export function purchaseShopItem({ studentIC, itemId, currentCoins, ownedItems = [] }) {
    const item = SHOP_CATALOG.find((i) => i.id === itemId);
    if (!item) {
        return { success: false, error: "Item tidak ditemui dalam katalog." };
    }

    if (ownedItems.includes(itemId)) {
        return { success: false, error: "Item ini telah pun anda miliki." };
    }

    if (currentCoins < item.price) {
        return {
            success: false,
            error: `Koin Bintang tidak mencukupi (${item.price} Koin diperlukan).`,
        };
    }

    const nextCoins = currentCoins - item.price;
    const nextOwned = [...ownedItems, itemId];

    // Simpan ke local storage
    if (typeof window !== "undefined") {
        try {
            const ic = studentIC || localStorage.getItem("exploria_student_ic") || "default";
            const key = `exploria_student_${ic}_shop`;
            const payload = {
                coins: nextCoins,
                ownedItems: nextOwned,
            };
            localStorage.setItem(key, JSON.stringify(payload));
        } catch {}
    }

    // Segerak ke Firestore jika murid berdaftar
    if (studentIC) {
        saveStudentProfile(studentIC, {
            koinBintang: nextCoins,
            barangDimiliki: nextOwned,
        }).catch(() => {});
    }

    return {
        success: true,
        nextCoins,
        nextOwned,
        purchasedItem: item,
    };
}

/**
 * Pasang / Gunakan Item (Equip)
 */
export function equipShopItem({ studentIC, item, currentEquipped = {} }) {
    if (!item || !item.type) {
        return { success: false, error: "Data item tidak sah." };
    }

    const nextEquipped = {
        ...currentEquipped,
        [item.type]: item.id,
    };

    if (typeof window !== "undefined") {
        try {
            const ic = studentIC || localStorage.getItem("exploria_student_ic") || "default";
            const key = `exploria_student_${ic}_equipped`;
            localStorage.setItem(key, JSON.stringify(nextEquipped));
        } catch {}
    }

    if (studentIC) {
        const firestoreKey =
            item.type === "border"
                ? "borderDipilih"
                : item.type === "title"
                ? "gelaranDipilih"
                : item.type === "avatar"
                ? "avatarDipilih"
                : "petDipilih";

        saveStudentProfile(studentIC, {
            [firestoreKey]: item.id,
        }).catch(() => {});
    }

    return {
        success: true,
        nextEquipped,
    };
}
