/**
 * =========================================================================
 * DATA STRUKTUR SEKOLAH MALAYSIA (MALAYSIA SCHOOLS DATA SERVICE)
 * Mengandungi Senarai 16 Negeri, Daerah, dan Sekolah Rendah (SK) & Menengah (SMK).
 * Struktur kemas & mudah ditambah / diubah suai untuk kegunaan Exploria.
 * =========================================================================
 */

// 1. Senarai Semua 16 Negeri & Wilayah Persekutuan di Malaysia
export const MALAYSIA_STATES = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "WP Kuala Lumpur",
    "WP Labuan",
    "WP Putrajaya",
];

// 2. Senarai Daerah Mengikut Negeri
export const DISTRICTS_BY_STATE = {
    Johor: [
        "Johor Bahru",
        "Muar",
        "Batu Pahat",
        "Kluang",
        "Kulai",
        "Segamat",
        "Pontian",
        "Kota Tinggi",
        "Mersing",
        "Tangkak",
    ],
    Kedah: [
        "Kota Setar",
        "Kuala Muda",
        "Kulim",
        "Kubang Pasu",
        "Baling",
        "Langkawi",
        "Yan",
        "Pendang",
        "Sik",
        "Padang Terap",
        "Bandar Baharu",
    ],
    Kelantan: [
        "Kota Bharu",
        "Pasir Mas",
        "Tumpat",
        "Bachok",
        "Tanah Merah",
        "Machang",
        "Pasir Puteh",
        "Kuala Krai",
        "Gua Musang",
        "Jeli",
    ],
    Melaka: [
        "Melaka Tengah",
        "Alor Gajah",
        "Jasin",
    ],
    "Negeri Sembilan": [
        "Seremban",
        "Port Dickson",
        "Jempol",
        "Kuala Pilah",
        "Rembau",
        "Tampin",
        "Jelebu",
    ],
    Pahang: [
        "Kuantan",
        "Temerloh",
        "Pekan",
        "Bentong",
        "Raub",
        "Jerantut",
        "Bera",
        "Maran",
        "Lipis",
        "Rompin",
        "Cameron Highlands",
    ],
    Perak: [
        "Kinta",
        "Larut, Matang & Selama",
        "Manjung",
        "Hilir Perak",
        "Kerian",
        "Batang Padang",
        "Kuala Kangsar",
        "Perak Tengah",
        "Muallim",
        "Kampar",
    ],
    Perlis: [
        "Kangar",
        "Arau",
        "Padang Besar",
    ],
    "Pulau Pinang": [
        "Timur Laut",
        "Barat Daya",
        "Seberang Perai Utara",
        "Seberang Perai Tengah",
        "Seberang Perai Selatan",
    ],
    Sabah: [
        "Kota Kinabalu",
        "Sandakan",
        "Tawau",
        "Penampang",
        "Lahad Datu",
        "Keningau",
        "Tuaran",
        "Papar",
        "Beaufort",
        "Kudat",
    ],
    Sarawak: [
        "Kuching",
        "Miri",
        "Sibu",
        "Bintulu",
        "Samarahan",
        "Sri Aman",
        "Sarikei",
        "Limbang",
        "Kapit",
        "Mukah",
    ],
    Selangor: [
        "Petaling",
        "Hulu Langat",
        "Gombak",
        "Klang",
        "Kuala Langat",
        "Sepang",
        "Kuala Selangor",
        "Hulu Selangor",
        "Sabak Bernam",
    ],
    Terengganu: [
        "Kuala Terengganu",
        "Kemaman",
        "Dungun",
        "Besut",
        "Marang",
        "Hulu Terengganu",
        "Setiu",
        "Kuala Nerus",
    ],
    "WP Kuala Lumpur": [
        "Bangsar",
        "Keramat",
        "Sentul",
        "Cheras",
        "Kepong",
        "Setiawangsa",
    ],
    "WP Labuan": [
        "Labuan",
    ],
    "WP Putrajaya": [
        "Putrajaya",
    ],
};

// 3. Pangkalan Data Contoh Sekolah Mengikut Negeri, Daerah, & Jenis (SK / SMK)
// Anda boleh menambah atau mengubah suai senarai ini dengan mudah mengikut keperluan sekolah sebenar.
export const SCHOOLS_CATALOG = {
    Pahang: {
        Kuantan: {
            SK: [
                "SK Teruntum",
                "SK St. Thomas",
                "SK Sultan Abdullah",
                "SK Bandar Indera Mahkota",
                "SK Beserah",
                "SK Sungai Karang",
                "SK Bukit Sekilau",
                "SK Assunta Convent",
                "SK Galing",
            ],
            SMK: [
                "SMK Sultan Abu Bakar (SABS)",
                "SMK St. Thomas",
                "SMK Abdul Rahman Talib (SMART)",
                "SMK Cenderawasih",
                "SMK Bukit Rangin",
                "SMK Alor Akar",
                "SMK Tengku Afzan",
                "SMK Beserah",
            ],
        },
        Temerloh: {
            SK: [
                "SK Bandar Temerloh",
                "SK Jalan Bahagia",
                "SK Paya Pulai",
                "SK Kuala Krau",
                "SK Tanjung Lalang",
            ],
            SMK: [
                "SMK Abu Bakar Temerloh",
                "SMK Seri Bahagia",
                "SMK Temerloh",
                "SMK Mentakab",
            ],
        },
        Pekan: {
            SK: [
                "SK Ahmad",
                "SK Seri Terentang",
                "SK Peramu Jaya",
                "SK Pulau Serai",
            ],
            SMK: [
                "SMK Ahmad Pekan",
                "SMK Seri Pekan",
                "SMK Peramu Jaya",
                "SMK Tengku Abdullah",
            ],
        },
        Bentong: {
            SK: [
                "SK Sulaiman",
                "SK Tuanku Fatimah",
                "SK Karak",
            ],
            SMK: [
                "SMK Sulaiman",
                "SMK Bentong",
                "SMK Karak",
            ],
        },
    },
    Selangor: {
        Petaling: {
            SK: [
                "SK Subang Jaya",
                "SK Seksyen 9 Shah Alam",
                "SK Bandar Utama Damansara",
                "SK Damansara Utama",
                "SK Taman Megah",
                "SK Puchong Perdana",
                "SK Sri Petaling",
            ],
            SMK: [
                "SMK Subang Jaya",
                "SMK Seksyen 9 Shah Alam",
                "SMK Damansara Utama",
                "SMK Bandar Utama Damansara 3",
                "SMK USJ 12",
                "SMK Puchong Perdana",
            ],
        },
        "Hulu Langat": {
            SK: [
                "SK Kajang",
                "SK Bandar Baru Bangi",
                "SK Jalan Empat Bangi",
                "SK Saujana Impian",
                "SK Cheras Jaya",
            ],
            SMK: [
                "SMK Tinggi Kajang",
                "SMK Jalan Empat Bangi",
                "SMK Bandar Baru Bangi",
                "SMK Cheras Perdana",
                "SMK Sultan Abdul Aziz Shah",
            ],
        },
        Gombak: {
            SK: [
                "SK Taman Melawati",
                "SK Selayang Baru",
                "SK Rawang",
                "SK Gombak Setia",
            ],
            SMK: [
                "SMK Taman Melawati",
                "SMK Seri Gombak",
                "SMK Rawang",
                "SMK Hillcrest",
            ],
        },
        Klang: {
            SK: [
                "SK Klang",
                "SK Bukit Tinggi",
                "SK Telok Gadong",
                "SK Taman Klang Utama",
            ],
            SMK: [
                "SMK Tinggi Klang",
                "SMK La Salle Klang",
                "SMK Bukit Tinggi",
                "SMK Tengku Ampuan Rahimah",
            ],
        },
    },
    "WP Kuala Lumpur": {
        Bangsar: {
            SK: [
                "SK Bukit Damansara",
                "SK Bukit Pantai",
                "SK Bangsar",
                "SK Taman Tun Dr. Ismail 1",
            ],
            SMK: [
                "SMK Bukit Bandaraya",
                "SMK Seri Pantai",
                "SMK Taman Tun Dr. Ismail",
                "Victoria Institution",
            ],
        },
        Keramat: {
            SK: [
                "SK Datok Keramat 1",
                "SK Setiawangsa",
                "SK Padang Tembak 1",
            ],
            SMK: [
                "SMK Seri Keramat",
                "SMK Padang Tembak",
                "SMK Taman Keramat",
            ],
        },
        Sentul: {
            SK: [
                "SK Sentul 1",
                "SK Bandar Baru Sentul",
                "SK Convent Sentul",
            ],
            SMK: [
                "SMK Sentul Utama",
                "SMK Bandar Baru Sentul",
                "SMK Maxwell",
            ],
        },
        Cheras: {
            SK: [
                "SK Seri Bintang Utara",
                "SK Cochrane Perkasa",
                "SK Taman Maluri",
            ],
            SMK: [
                "SMK Seri Bintang Selatan",
                "SMK Cochrane",
                "SMK Taman Maluri",
            ],
        },
    },
    Johor: {
        "Johor Bahru": {
            SK: [
                "SK Temenggong Abdul Rahman 1",
                "SK Sri Tebrau",
                "SK Taman Mount Austin",
                "SK Taman Universiti 1",
            ],
            SMK: [
                "English College (Maktab Sultan Abu Bakar)",
                "SMK Sultan Ismail",
                "SMK Taman Mount Austin",
                "SMK Taman Universiti",
            ],
        },
        Muar: {
            SK: [
                "SK Bandar Maharani",
                "SK Ismail 1",
                "SK Parit Bakar",
            ],
            SMK: [
                "SMK Tinggi Muar",
                "SMK St. Andrew",
                "SMK Convent Muar",
            ],
        },
        "Batu Pahat": {
            SK: [
                "SK Bandar Penggaram",
                "SK Lim Poon 1",
                "SK Bukit Soga",
            ],
            SMK: [
                "SMK Tinggi Batu Pahat",
                "SMK Temenggong Ibrahim Penggaram",
            ],
        },
    },
    "WP Putrajaya": {
        Putrajaya: {
            SK: [
                "SK Putrajaya Presint 8 (1)",
                "SK Putrajaya Presint 9 (1)",
                "SK Putrajaya Presint 9 (2)",
                "SK Putrajaya Presint 11 (1)",
                "SK Putrajaya Presint 16 (1)",
            ],
            SMK: [
                "SMK Putrajaya Presint 8 (1)",
                "SMK Putrajaya Presint 9 (1)",
                "SMK Putrajaya Presint 11 (1)",
                "SMK Putrajaya Presint 16 (1)",
            ],
        },
    },
};

/**
 * Helper Pintar: Menghasilkan senarai sekolah dinamik sekiranya daerah tiada dalam katalog terperinci
 * Memastikan setiap kombinasi Negeri, Daerah, dan Jenis Sekolah sentiasa ada pilihan yang sah.
 */
function generateDynamicSchools(state, district, type) {
    const cleanDist = district || "Utama";
    if (type === "SK") {
        return [
            `SK ${cleanDist}`,
            `SK Bandar ${cleanDist}`,
            `SK Seri ${cleanDist}`,
            `SK Convent ${cleanDist}`,
            `SK Taman ${cleanDist}`,
            `SK Methodist ${cleanDist}`,
        ];
    }
    return [
        `SMK ${cleanDist}`,
        `SMK Tinggi ${cleanDist}`,
        `SMK Seri ${cleanDist}`,
        `SMK Sains ${cleanDist}`,
        `SMK Bandar ${cleanDist}`,
        `SMK Methodist ${cleanDist}`,
    ];
}

/**
 * 4. Fungsi Utama untuk Mendapatkan Senarai Sekolah Bertahap
 */
export function getDistricts(state) {
    if (!state) return [];
    return DISTRICTS_BY_STATE[state] || [];
}

export function getSchools(state, district, schoolType = "SK") {
    if (!state || !district) return [];

    const normType = schoolType === "SMK" ? "SMK" : "SK";
    const explicitSchools = SCHOOLS_CATALOG[state]?.[district]?.[normType];

    if (Array.isArray(explicitSchools) && explicitSchools.length > 0) {
        return explicitSchools;
    }

    return generateDynamicSchools(state, district, normType);
}
