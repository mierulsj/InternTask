// lib/levelService.js
// Sistem Tahap & Perkembangan XP Exploria (Sehingga 15,000 XP)

export const MAX_EXPLORIA_XP = 15000;

export const LEVELS_CONFIG = [
    {
        level: 1,
        minXP: 0,
        nextXP: 500,
        titleBM: "Kadet Sains",
        titleEN: "Science Cadet",
        badgeIcon: "🌱",
        descBM: "Langkah pertama penjelajah STEM",
        descEN: "First steps of a STEM explorer",
    },
    {
        level: 2,
        minXP: 500,
        nextXP: 1000,
        titleBM: "Pelatih Orbit",
        titleEN: "Orbit Trainee",
        badgeIcon: "🛰️",
        descBM: "Mula menguasai asas sains & angkasa",
        descEN: "Mastering science & space basics",
    },
    {
        level: 3,
        minXP: 1000,
        nextXP: 1800,
        titleBM: "Penjelajah Angkasa",
        titleEN: "Space Explorer",
        badgeIcon: "🚀",
        descBM: "Meneroka rahsia planet dan alam",
        descEN: "Exploring planets and nature",
    },
    {
        level: 4,
        minXP: 1800,
        nextXP: 2700,
        titleBM: "Pakar Falak",
        titleEN: "Astronomy Specialist",
        badgeIcon: "🔭",
        descBM: "Memahami orbit & sistem suria mendalam",
        descEN: "Deep understanding of solar orbits",
    },
    {
        level: 5,
        minXP: 2700,
        nextXP: 3800,
        titleBM: "Komander Galaksi",
        titleEN: "Galaxy Commander",
        badgeIcon: "🛸",
        descBM: "Memimpin misi sains dengan cemerlang",
        descEN: "Leading science missions with excellence",
    },
    {
        level: 6,
        minXP: 3800,
        nextXP: 5000,
        titleBM: "Kapten Nebula",
        titleEN: "Nebula Captain",
        badgeIcon: "🌌",
        descBM: "Menjelajah gugusan gas & bintang nebula",
        descEN: "Exploring interstellar nebula clusters",
    },
    {
        level: 7,
        minXP: 5000,
        nextXP: 6300,
        titleBM: "Juruterbang Komet",
        titleEN: "Comet Pilot",
        badgeIcon: "☄️",
        descBM: "Pantas dan tangkas menyelesaikan cabaran",
        descEN: "Swift and agile in scientific challenges",
    },
    {
        level: 8,
        minXP: 6300,
        nextXP: 7700,
        titleBM: "Sarjana Kosmik",
        titleEN: "Cosmic Scholar",
        badgeIcon: "⚡",
        descBM: "Pengetahuan luas dalam pelbagai bidang STEM",
        descEN: "Broad knowledge across all STEM fields",
    },
    {
        level: 9,
        minXP: 7700,
        nextXP: 9200,
        titleBM: "Peneroka Supernova",
        titleEN: "Supernova Explorer",
        badgeIcon: "💥",
        descBM: "Ledakan ilmu dan pencapaian luar biasa",
        descEN: "An explosion of brilliance and knowledge",
    },
    {
        level: 10,
        minXP: 9200,
        nextXP: 10800,
        titleBM: "Pengemudi Asteroid",
        titleEN: "Asteroid Navigator",
        badgeIcon: "🪨",
        descBM: "Ketahanan tinggi mengharungi kuiz & cabaran",
        descEN: "High resilience in quizzes & competitions",
    },
    {
        level: 11,
        minXP: 10800,
        nextXP: 12100,
        titleBM: "Satria Bimasakti",
        titleEN: "Milky Way Guardian",
        badgeIcon: "🛡️",
        descBM: "Jaguh utama galaksi Bimasakti",
        descEN: "Prime guardian of the Milky Way galaxy",
    },
    {
        level: 12,
        minXP: 12100,
        nextXP: 13200,
        titleBM: "Penjaga Bintang",
        titleEN: "Star Keeper",
        badgeIcon: "⭐",
        descBM: "Koleksi bintang dan mata ganjaran elit",
        descEN: "Elite collection of stars and accomplishments",
    },
    {
        level: 13,
        minXP: 13200,
        nextXP: 14200,
        titleBM: "Wira Kosmos",
        titleEN: "Cosmos Champion",
        badgeIcon: "🔮",
        descBM: "Di puncak kemahiran minda dan sains",
        descEN: "At the peak of STEM cognitive mastery",
    },
    {
        level: 14,
        minXP: 14200,
        nextXP: 15000,
        titleBM: "Legenda Galaksi",
        titleEN: "Galaxy Legend",
        badgeIcon: "🌟",
        descBM: "Hampir mencapai kemuncak ilmu tertinggi",
        descEN: "Approaching the ultimate pinnacle of learning",
    },
    {
        level: 15,
        minXP: 15000,
        nextXP: 15000,
        titleBM: "Grandmaster Alam Semesta",
        titleEN: "Grandmaster of the Universe",
        badgeIcon: "👑",
        descBM: "Tahap Tertinggi 15,000 XP — Penguasaan STEM Mutlak!",
        descEN: "Maximum Level 15,000 XP — Complete STEM Mastery!",
    },
];

/**
 * Mendapatkan nombor tahap (1 - 15) berdasarkan mata XP terkumpul
 */
export const getLevelFromXP = (xp = 100) => {
    const validXP = Math.max(0, Number(xp) || 0);
    for (let i = LEVELS_CONFIG.length - 1; i >= 0; i--) {
        if (validXP >= LEVELS_CONFIG[i].minXP) {
            return LEVELS_CONFIG[i].level;
        }
    }
    return 1;
};

/**
 * Mendapatkan maklumat terperinci tahap murid untuk Dashboard & paparan profil
 */
export const getLevelDetails = (xp = 100) => {
    const validXP = Math.max(0, Number(xp) || 0);
    const levelNum = getLevelFromXP(validXP);
    const currentConfig = LEVELS_CONFIG.find((l) => l.level === levelNum) || LEVELS_CONFIG[0];
    const isMaxLevel = levelNum === 15 || validXP >= MAX_EXPLORIA_XP;

    let percentage = 0;
    if (isMaxLevel) {
        percentage = 100;
    } else {
        const span = currentConfig.nextXP - currentConfig.minXP;
        const gained = validXP - currentConfig.minXP;
        percentage = Math.min(100, Math.max(0, Math.round((gained / span) * 100)));
    }

    const overallPercentage = Math.min(100, Math.round((validXP / MAX_EXPLORIA_XP) * 100));

    return {
        level: levelNum,
        title: currentConfig.titleBM,
        titleBM: currentConfig.titleBM,
        titleEN: currentConfig.titleEN,
        badgeIcon: currentConfig.badgeIcon,
        descBM: currentConfig.descBM,
        descEN: currentConfig.descEN,
        currentMinXP: currentConfig.minXP,
        nextLevelXP: currentConfig.nextXP,
        maxLevelXP: currentConfig.nextXP,
        overallMaxXP: MAX_EXPLORIA_XP,
        percentage,
        overallPercentage,
        isMaxLevel,
        xpToNext: isMaxLevel ? 0 : Math.max(0, currentConfig.nextXP - validXP),
    };
};
