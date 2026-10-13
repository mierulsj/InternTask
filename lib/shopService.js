/**
 * =========================================================================
 * SHOP SERVICE - EXPLORIA STEM
 * Pengurusan Katalog Kedai, Mata Wang Koin Bintang (🌟), & Item Buka Kunci
 * =========================================================================
 */

import { saveStudentProfile } from "./firestoreService";

export const SHOP_CATALOG = [
    // -------------------------------------------------------------------------
    // 1. GELARAN PROFIL (TITLES)
    // -------------------------------------------------------------------------
    {
        id: "title_cadet",
        type: "title",
        name: "Kadet STEM",
        icon: "🎓",
        price: 0,
        rarity: "common",
        description: "Peneroka muda yang bersedia meneroka dunia sains.",
        tagColor: "bg-slate-100 text-slate-700 border-slate-300",
    },
    {
        id: "title_speed",
        type: "title",
        name: "Kilat Sifir",
        icon: "⚡",
        price: 40,
        rarity: "rare",
        description: "Pantas mencongak sifir tanpa ragu.",
        tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
        id: "title_spelling",
        type: "title",
        name: "Raja Ejaan",
        icon: "📖",
        price: 40,
        rarity: "rare",
        description: "Kamus bergerak yang menewaskan cabaran Spelling Bee.",
        tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
        id: "title_botany",
        type: "title",
        name: "Penjaga Alam",
        icon: "🌿",
        price: 70,
        rarity: "epic",
        description: "Mahir mengenali sel dan fungsi bahagian tumbuhan.",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
        id: "title_cosmo",
        type: "title",
        name: "Penakluk Galaksi",
        icon: "🪐",
        price: 100,
        rarity: "epic",
        description: "Menjelajah 8 planet dalam orbit Sistem Suria.",
        tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
        id: "title_genius",
        type: "title",
        name: "Profesor Cilik",
        icon: "👑",
        price: 160,
        rarity: "legendary",
        description: "Gelaran terunggul untuk penjelajah STEM serba boleh.",
        tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    },

    // -------------------------------------------------------------------------
    // 2. KOSTUM & AVATAR PENJELAJAH (AVATARS)
    // -------------------------------------------------------------------------
    {
        id: "avatar_astro_1",
        type: "avatar",
        name: "Angkasawan Perintis",
        icon: "🧑‍🚀",
        price: 0,
        rarity: "common",
        description: "Suit standard penjelajah orbit Exploria.",
        badgeColor: "from-sky-400 to-sky-600",
    },
    {
        id: "avatar_scientist",
        type: "avatar",
        name: "Saintis Makmal",
        icon: "🥼",
        price: 50,
        rarity: "rare",
        description: "Kot putih makmal untuk uji kaji kimia & biologi.",
        badgeColor: "from-teal-400 to-teal-600",
    },
    {
        id: "avatar_cyber",
        type: "avatar",
        name: "Penyelidik Siber",
        icon: "🥽",
        price: 80,
        rarity: "rare",
        description: "Gogal realiti maya untuk analisis data digital.",
        badgeColor: "from-indigo-400 to-indigo-600",
    },
    {
        id: "avatar_explorer",
        type: "avatar",
        name: "Penjelajah Dino",
        icon: "🦖",
        price: 110,
        rarity: "epic",
        description: "Pakar paleontologi mengkaji hidupan purba.",
        badgeColor: "from-amber-500 to-amber-600",
    },
    {
        id: "avatar_robot",
        type: "avatar",
        name: "Kadet Mecha",
        icon: "🤖",
        price: 140,
        rarity: "epic",
        description: "Armor robot pintar dengan penderia ultrasonik.",
        badgeColor: "from-emerald-400 to-emerald-600",
    },
    {
        id: "avatar_commander",
        type: "avatar",
        name: "Komander Emas",
        icon: "🚀",
        price: 200,
        rarity: "legendary",
        description: "Suit angkasawan bersalut emas khas untuk juara.",
        badgeColor: "from-yellow-400 to-amber-500",
    },

    // -------------------------------------------------------------------------
    // 3. MASKOT TEMAN PEMBELAJARAN (PETS)
    // -------------------------------------------------------------------------
    {
        id: "pet_robot",
        type: "pet",
        name: "AstroBot",
        icon: "🛸",
        price: 80,
        rarity: "rare",
        description: "Robot mini yang terapung membantu semakan jawapan.",
        tagColor: "bg-sky-50 text-sky-800",
    },
    {
        id: "pet_cat",
        type: "pet",
        name: "Cosmo Meow",
        icon: "🐱",
        price: 120,
        rarity: "epic",
        description: "Kucing comel bertopi angkasa yang menceriakan hari.",
        tagColor: "bg-rose-50 text-rose-800",
    },
    {
        id: "pet_plant",
        type: "pet",
        name: "Sprout Genius",
        icon: "🌱",
        price: 120,
        rarity: "epic",
        description: "Tunas ajaib yang fotosintesis semasa murid belajar.",
        tagColor: "bg-emerald-50 text-emerald-800",
    },
    {
        id: "pet_owl",
        type: "pet",
        name: "Athena Si Burung Hantu",
        icon: "🦉",
        price: 180,
        rarity: "legendary",
        description: "Peneman malam yang membisikkan petua sains.",
        tagColor: "bg-purple-50 text-purple-800",
    },
];

export const DEFAULT_OWNED_ITEMS = ["title_cadet", "avatar_astro_1"];

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
            error: `Koin Bintang tidak mencukupi. Anda perlukan ${item.price} 🌟 (Baki: ${currentCoins} 🌟).`,
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
            item.type === "title"
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
