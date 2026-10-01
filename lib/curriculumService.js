import { db } from "../firebase.js";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

/* =========================================================================
   CURRICULUM & QUIZ MANAGEMENT SERVICE - EXPLORIA STEM
   Pengurusan Nota Pembelajaran & Soalan Kuiz Dinamik
   ========================================================================= */

export const INITIAL_CURRICULUM_TOPICS = [
    {
        id: "topic-1",
        title: "Topik 1: Planet & Sistem Suria",
        shortTitle: "Planet & Sistem Suria",
        category: "Astronomi & Angkasa",
        themeColor: "#0099e5",
        accentBadge: "bg-sky-100 text-sky-800 border-sky-200",
        videoEmbedUrl: "https://www.youtube.com/embed/m8NVEFNX9p0",
        videoRawUrl: "https://youtu.be/m8NVEFNX9p0",
        content: "Sistem Suria kita mempunyai 8 planet yang mengelilingi Matahari. Planet Marikh dikenali sebagai planet merah, manakala Bumi adalah satu-satunya rumah kita yang mempunyai air dan hidupan!",
        questions: [
            {
                question: "Apakah planet tempat tinggal kita di dalam sistem suria?",
                options: ["Planet Marikh", "Planet Bumi", "Planet Zuhal"],
                correctAnswer: "Planet Bumi",
            },
            {
                question: "Apakah pusat bagi sistem suria kita?",
                options: ["Bulan", "Matahari", "Bintang Utara"],
                correctAnswer: "Matahari",
            },
            {
                question: "Planet manakah yang terkenal dengan gelaran 'Planet Merah'?",
                options: ["Marikh", "Utarid", "Zuhrah"],
                correctAnswer: "Marikh",
            },
            {
                question: "Berapakah jumlah planet utama di dalam sistem suria kita?",
                options: ["5 planet", "8 planet", "10 planet"],
                correctAnswer: "8 planet",
            },
            {
                question: "Planet manakah yang mempunyai cincin yang paling cantik dan besar?",
                options: ["Zuhal", "Neptun", "Bumi"],
                correctAnswer: "Zuhal",
            },
        ],
    },
    {
        id: "topic-2",
        title: "Topik 2: Keajaiban Tumbuhan & Alam",
        shortTitle: "Keajaiban Tumbuhan & Alam",
        category: "Biologi & Ekologi",
        themeColor: "#10b981",
        accentBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        videoEmbedUrl: "https://www.youtube.com/embed/sample-plants",
        videoRawUrl: "https://youtube.com",
        content: "Tumbuhan adalah hidupan yang sangat penting. Melalui proses fotosintesis, pokok menggunakan cahaya matahari untuk membuat makanan sendiri dan menghasilkan udara bersih untuk kita bernafas!",
        questions: [
            {
                question: "Apakah proses pokok membuat makanannya sendiri?",
                options: ["Fotosintesis", "Respirasi", "Evaporasi"],
                correctAnswer: "Fotosintesis",
            },
            {
                question: "Apakah sumber tenaga utama untuk tumbuhan menghasilkan makanan?",
                options: ["Cahaya Matahari", "Lampu Bilik", "Air Batu"],
                correctAnswer: "Cahaya Matahari",
            },
            {
                question: "Bahagian pokok manakah yang menyerap air dari dalam tanah?",
                options: ["Daun", "Akar", "Bunga"],
                correctAnswer: "Akar",
            },
            {
                question: "Apakah warna lazim bagi daun pokok yang sihat?",
                options: ["Hijau", "Merah", "Ungu"],
                correctAnswer: "Hijau",
            },
            {
                question: "Apakah gas yang dibebaskan oleh tumbuhan untuk kita bernafas?",
                options: ["Oksigen", "Karbon Dioksida", "Helium"],
                correctAnswer: "Oksigen",
            },
        ],
    },
];

/**
 * 1. Dapatkan senarai kurikulum semasa dari Firestore / LocalStorage
 */
export async function getCurriculumTopics() {
    let localData = null;
    if (typeof window !== "undefined") {
        try {
            const raw = localStorage.getItem("exploria_curriculum_topics");
            if (raw) localData = JSON.parse(raw);
        } catch {}
    }

    try {
        const docRef = doc(db, "kurikulum", "stem");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && Array.isArray(docSnap.data().topics)) {
            const topics = docSnap.data().topics;
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem("exploria_curriculum_topics", JSON.stringify(topics));
                } catch {}
            }
            return topics;
        }
    } catch (err) {
        console.warn("⚠️ [Curriculum] Menggunakan data kurikulum tempatan / lalai:", err.message);
    }

    return localData || INITIAL_CURRICULUM_TOPICS;
}

/**
 * 2. Simpan keseluruhan kurikulum ke Firestore & LocalStorage
 */
export async function saveCurriculumTopics(topics) {
    if (!Array.isArray(topics)) return { success: false, error: "Format topik tidak sah." };

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem("exploria_curriculum_topics", JSON.stringify(topics));
            // Trigger storage event so other open tabs/windows update immediately
            window.dispatchEvent(new Event("exploria_curriculum_updated"));
        } catch {}
    }

    try {
        const docRef = doc(db, "kurikulum", "stem");
        await setDoc(docRef, {
            topics,
            dikemaskiniPada: serverTimestamp(),
        }, { merge: true });
        return { success: true };
    } catch (err) {
        console.error("Ralat menyimpan ke Firestore:", err);
        return { success: true, localOnly: true };
    }
}
