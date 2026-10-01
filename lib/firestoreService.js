import { db } from "../firebase";
import {
    collection,
    doc,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";

/**
 * =========================================================================
 * FIRESTORE SERVICE - EXPLORIA APP
 * Mengandungi fungsi menulis (write) dan membaca (read) data Firestore
 * =========================================================================
 */

/**
 * 1. Fungsi Hantar / Tulis Data Ujian (Write Test Data)
 * Menyimpan data ke dalam koleksi 'ujian_sambungan' atau mana-mana koleksi.
 */
export async function writeTestData(data = {}) {
    try {
        const payload = {
            mesej: "Ujian sambungan Firebase berjaya!",
            sistem: "Exploria STEM App",
            status: "Aktif",
            diciptaPada: serverTimestamp(),
            ...data,
        };

        const docRef = await addDoc(collection(db, "ujian_sambungan"), payload);
        console.log("✅ [Firestore] Data ujian berjaya ditulis! ID Dokumen:", docRef.id);
        return { success: true, id: docRef.id, data: payload };
    } catch (error) {
        console.error("❌ [Firestore] Ralat semasa menulis data ujian:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 2. Fungsi Baca Data Ujian Mengikut ID (Read Single Document)
 */
export async function readTestData(docId) {
    try {
        const docRef = doc(db, "ujian_sambungan", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("✅ [Firestore] Data dokumen ditemui:", docSnap.data());
            return { success: true, id: docSnap.id, data: docSnap.data() };
        } else {
            console.log("⚠️ [Firestore] Dokumen tidak ditemui untuk ID:", docId);
            return { success: false, error: "Dokumen tidak ditemui" };
        }
    } catch (error) {
        console.error("❌ [Firestore] Ralat semasa membaca data:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 3. Fungsi Baca Semua Data dari Koleksi (Read All Documents)
 */
export async function getAllTestData() {
    try {
        const querySnapshot = await getDocs(collection(db, "ujian_sambungan"));
        const senarai = [];
        querySnapshot.forEach((docSnap) => {
            senarai.push({ id: docSnap.id, ...docSnap.data() });
        });
        console.log(`✅ [Firestore] Berjaya membaca ${senarai.length} rekod.`);
        return { success: true, data: senarai };
    } catch (error) {
        console.error("❌ [Firestore] Ralat membaca senarai rekod:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 4. Fungsi Simpan / Kemas Kini Profil Pelajar (Save Student Profile)
 * Berguna untuk integrasi akaun murid Exploria.
 */
export async function saveStudentProfile(icNumber, studentData) {
    try {
        const docRef = doc(db, "pelajar", icNumber);
        await setDoc(docRef, {
            ...studentData,
            dikemaskiniPada: serverTimestamp(),
        }, { merge: true });

        console.log(`✅ [Firestore] Profil pelajar IC ${icNumber} berjaya disimpan.`);
        return { success: true };
    } catch (error) {
        console.error("❌ [Firestore] Ralat menyimpan profil pelajar:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 5. Fungsi Baca Profil Pelajar Mengikut No IC (Get Student Profile)
 */
export async function getStudentProfile(icNumber) {
    try {
        const docRef = doc(db, "pelajar", icNumber);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { success: true, data: docSnap.data() };
        } else {
            return { success: false, error: "Profil pelajar tidak dijumpai" };
        }
    } catch (error) {
        console.error("❌ [Firestore] Ralat membaca profil pelajar:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 6. Fungsi Kiraan Streak Kalendar Sebenar (Real Calendar Streak System)
 */
export function calculateCalendarStreak(lastActiveDateStr, currentStreak = 0) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    if (!lastActiveDateStr) {
        return { streak: 1, lastActiveDate: todayStr, isNewDay: true };
    }

    if (lastActiveDateStr === todayStr) {
        return { streak: Math.max(1, currentStreak), lastActiveDate: todayStr, isNewDay: false };
    }

    const lastDate = new Date(lastActiveDateStr + "T00:00:00");
    const currDate = new Date(todayStr + "T00:00:00");
    const diffTime = currDate.getTime() - lastDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        // Hari berturut-turut! Tambah 1 hari streak
        return { streak: (currentStreak || 0) + 1, lastActiveDate: todayStr, isNewDay: true };
    } else if (diffDays > 1) {
        // Terputus streak lebih daripada 1 hari, reset semula ke 1
        return { streak: 1, lastActiveDate: todayStr, isNewDay: true };
    }

    return { streak: Math.max(1, currentStreak), lastActiveDate: todayStr, isNewDay: false };
}

/**
 * 7. Fungsi Pendaftaran Pelajar Baharu dengan Semakan IC (Firestore Register)
 */
export async function registerStudentWithFirestore({ name, ic, password }) {
    try {
        const cleanIC = ic.replace(/\D/g, "");
        const docRef = doc(db, "pelajar", cleanIC);

        // Semak jika IC sudah wujud dalam Firestore
        const existingSnap = await getDoc(docRef);
        if (existingSnap.exists()) {
            return {
                success: false,
                error: "No. Kad Pengenalan ini telah pun didaftarkan. Sila gunakan menu Log Masuk."
            };
        }

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        // Cipta profil murid baharu di Firestore
        const newStudentData = {
            nama: name.trim(),
            ic: cleanIC,
            password: password,
            tahap: 1,
            mataXP: 100, // Bonus selamat datang
            streakHari: 1,
            tarikhAktifTerakhir: todayStr,
            lencanaTerkumpul: 1,
            tarikhDaftar: serverTimestamp(),
            statusAkaun: "Aktif"
        };

        await setDoc(docRef, newStudentData);
        console.log(`✅ [Firestore] Murid ${name} (${cleanIC}) berjaya didaftarkan ke Firestore.`);

        return {
            success: true,
            student: newStudentData
        };
    } catch (error) {
        console.error("❌ [Firestore] Ralat pendaftaran murid:", error);
        return {
            success: false,
            error: error.message || "Ralat pangkalan data semasa pendaftaran."
        };
    }
}

/**
 * 8. Fungsi Log Masuk Pelajar dengan Pengesahan Firestore & Kiraan Streak (Firestore Login)
 */
export async function loginStudentWithFirestore({ ic, password }) {
    try {
        const cleanIC = ic.replace(/\D/g, "");
        const docRef = doc(db, "pelajar", cleanIC);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return {
                success: false,
                error: "Akaun dengan No. Kad Pengenalan ini tidak dijumpai. Sila daftar akaun murid baharu terlebih dahulu."
            };
        }

        const data = docSnap.data();
        if (data.password !== password) {
            return {
                success: false,
                error: "Kata laluan tidak tepat. Sila semak semula kata laluan anda."
            };
        }

        // Kira streak kalendar harian murid secara automatik
        const streakResult = calculateCalendarStreak(data.tarikhAktifTerakhir, data.streakHari || 1);
        const updatedStudent = {
            ...data,
            streakHari: streakResult.streak,
            tarikhAktifTerakhir: streakResult.lastActiveDate
        };

        // Kemaskini Firestore jika hari baharu
        if (streakResult.isNewDay) {
            try {
                await setDoc(docRef, {
                    streakHari: streakResult.streak,
                    tarikhAktifTerakhir: streakResult.lastActiveDate,
                    logMasukTerakhir: serverTimestamp()
                }, { merge: true });
            } catch (syncErr) {
                console.warn("⚠️ [Firestore] Gagal kemaskini tarikh streak terkini:", syncErr);
            }
        }

        console.log(`✅ [Firestore] Log masuk berjaya untuk ${data.nama} (${cleanIC}). Streak: ${streakResult.streak} hari.`);
        return {
            success: true,
            student: updatedStudent
        };
    } catch (error) {
        console.error("❌ [Firestore] Ralat log masuk murid:", error);
        return {
            success: false,
            error: error.message || "Ralat pangkalan data semasa log masuk."
        };
    }
}

