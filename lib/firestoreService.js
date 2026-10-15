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
        const cleanIC = String(
            icNumber ||
            (typeof window !== "undefined" ? localStorage.getItem("exploria_student_ic") || localStorage.getItem("exploria_active_ic") : "") ||
            ""
        ).replace(/\D/g, "");

        if (!cleanIC) {
            console.warn("⚠️ [Firestore] IC tidak sah untuk simpanan profil:", icNumber);
            return { success: false, error: "IC tidak sah" };
        }

        const docRef = doc(db, "pelajar", cleanIC);
        await setDoc(docRef, {
            ...studentData,
            dikemaskiniPada: serverTimestamp(),
        }, { merge: true });

        console.log(`✅ [Firestore] Profil pelajar IC ${cleanIC} berjaya disimpan.`);
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
        const cleanIC = String(
            icNumber ||
            (typeof window !== "undefined" ? localStorage.getItem("exploria_student_ic") || localStorage.getItem("exploria_active_ic") : "") ||
            ""
        ).replace(/\D/g, "");

        if (!cleanIC) {
            return { success: false, error: "IC tidak sah" };
        }

        const docRef = doc(db, "pelajar", cleanIC);
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
export async function registerStudentWithFirestore({
    name,
    ic,
    password,
    schoolType = "SK",
    state = "",
    district = "",
    schoolName = "",
}) {
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

        // Jana ID Pelajar Unik (Format: STU-XXXXX)
        const studentId = `STU-${cleanIC.length >= 5 ? cleanIC.slice(-5) : cleanIC.padStart(5, "0")}`;

        const cleanSchoolName = schoolName ? schoolName.trim() : "";

        // Cipta profil murid baharu di Firestore termasuk Maklumat Sekolah
        const newStudentData = {
            nama: name.trim(),
            ic: cleanIC,
            studentId: studentId,
            password: password,
            jenisSekolah: schoolType || "SK",
            negeri: state || "",
            daerah: district || "",
            namaSekolah: cleanSchoolName,
            sekolah: cleanSchoolName, // Alias untuk Papan Pendahulu / Leaderboard
            tahap: 1,
            mataXP: 100, // Bonus selamat datang
            koinBintang: 50, // Bonus Koin Bintang permulaan
            barangDimiliki: ["title_cadet", "avatar_astro_1"],
            avatarDipilih: "avatar_astro_1",
            gelaranDipilih: "title_cadet",
            petDipilih: null,
            streakHari: 1,
            tarikhAktifTerakhir: todayStr,
            lencanaTerkumpul: 1,
            tarikhDaftar: serverTimestamp(),
            statusAkaun: "Aktif"
        };

        await setDoc(docRef, newStudentData);
        console.log(`✅ [Firestore] Murid ${name} (${cleanIC} / ${studentId} - ${cleanSchoolName}) berjaya didaftarkan.`);

        // Simpan maklumat sekolah ke localStorage untuk sandaran Papan Pendahulu
        if (typeof window !== "undefined") {
            try {
                const statsKey = `exploria_stats_${cleanIC}`;
                const stats = JSON.parse(localStorage.getItem(statsKey) || "{}");
                stats.name = name.trim();
                stats.school = cleanSchoolName;
                stats.schoolType = schoolType;
                stats.district = district;
                stats.state = state;
                localStorage.setItem(statsKey, JSON.stringify(stats));
                if (cleanSchoolName) {
                    localStorage.setItem("exploria_student_school", cleanSchoolName);
                    localStorage.setItem("exploria_student_school_type", schoolType);
                }
                localStorage.setItem("exploria_is_logged_in", "true");
                localStorage.setItem("exploria_student_name", name.trim());
                localStorage.setItem("exploria_student_ic", cleanIC);
                localStorage.setItem("exploria_active_ic", cleanIC);
                localStorage.setItem("exploria_student_session", JSON.stringify({
                    name: name.trim(),
                    ic: cleanIC,
                    studentId: studentId,
                    school: cleanSchoolName,
                    schoolType: schoolType,
                    ...newStudentData,
                }));
                sessionStorage.removeItem("exploria_guest_mode");
            } catch {}
        }

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

        // Pastikan studentId wujud (STU-XXXXX)
        const resolvedStudentId = data.studentId || `STU-${cleanIC.length >= 5 ? cleanIC.slice(-5) : cleanIC.padStart(5, "0")}`;

        // Kira streak kalendar harian murid secara automatik
        const streakResult = calculateCalendarStreak(data.tarikhAktifTerakhir, data.streakHari || 1);
        const updatedStudent = {
            ...data,
            ic: cleanIC,
            studentId: resolvedStudentId,
            streakHari: streakResult.streak,
            tarikhAktifTerakhir: streakResult.lastActiveDate
        };

        // Kemaskini Firestore jika hari baharu atau jika studentId belum wujud
        if (streakResult.isNewDay || !data.studentId) {
            try {
                await setDoc(docRef, {
                    studentId: resolvedStudentId,
                    streakHari: streakResult.streak,
                    tarikhAktifTerakhir: streakResult.lastActiveDate,
                    logMasukTerakhir: serverTimestamp()
                }, { merge: true });
            } catch (syncErr) {
                console.warn("⚠️ [Firestore] Gagal kemaskini tarikh streak/studentId terkini:", syncErr);
            }
        }

        // Simpan maklumat sesi & profil murid ke localStorage untuk sandaran segera
        if (typeof window !== "undefined") {
            try {
                const school = data.namaSekolah || data.sekolah || "";
                if (school) {
                    localStorage.setItem("exploria_student_school", school);
                }
                if (data.jenisSekolah) {
                    localStorage.setItem("exploria_student_school_type", data.jenisSekolah);
                }
                const resolvedName = data.nama || data.name || "Penjelajah STEM";
                localStorage.setItem("exploria_is_logged_in", "true");
                localStorage.setItem("exploria_student_name", resolvedName);
                localStorage.setItem("exploria_student_ic", cleanIC);
                localStorage.setItem("exploria_active_ic", cleanIC);
                localStorage.setItem("exploria_student_session", JSON.stringify({
                    name: resolvedName,
                    ic: cleanIC,
                    studentId: resolvedStudentId,
                    school: school,
                    schoolType: data.jenisSekolah || "SK",
                    ...updatedStudent,
                }));

                // Segerak Koin Bintang & Barangan Dimiliki/Dipasang dari Firestore ke LocalStorage
                const userCoins = typeof data.koinBintang === "number" ? data.koinBintang : 50;
                const userOwned = Array.isArray(data.barangDimiliki) && data.barangDimiliki.length > 0
                    ? Array.from(new Set([...data.barangDimiliki, "border_cadet", "avatar_astro_1"]))
                    : ["border_cadet", "avatar_astro_1"];
                const userEquipped = {
                    border: data.borderDipilih || "border_cadet",
                    avatar: data.avatarDipilih || "avatar_astro_1",
                    pet: data.petDipilih || null,
                };
                localStorage.setItem(`exploria_student_${cleanIC}_shop`, JSON.stringify({ coins: userCoins, ownedItems: userOwned }));
                localStorage.setItem(`exploria_student_${cleanIC}_equipped`, JSON.stringify(userEquipped));

                sessionStorage.removeItem("exploria_guest_mode");
            } catch {}
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

/**
 * 9. Fungsi Segerak ID Pelajar (STU-XXXXX) ke Semua Dokumen Firestore Pelajar
 */
export async function syncAllStudentIds() {
    try {
        const querySnapshot = await getDocs(collection(db, "pelajar"));
        let updatedCount = 0;

        for (const docSnap of querySnapshot.docs) {
            const data = docSnap.data();
            const ic = docSnap.id;
            const cleanIC = ic.replace(/\D/g, "");
            const studentId = `STU-${cleanIC.length >= 5 ? cleanIC.slice(-5) : cleanIC.padStart(5, "0")}`;

            if (data.studentId !== studentId) {
                await setDoc(doc(db, "pelajar", ic), {
                    studentId: studentId
                }, { merge: true });
                updatedCount++;
            }
        }

        console.log(`✅ [Firestore] ${updatedCount} pelajar berjaya disegerakkan dengan studentId.`);
        return { success: true, updatedCount };
    } catch (error) {
        console.error("❌ [Firestore] Ralat segerak ID pelajar:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 10. Fungsi Kemas Kini Kata Laluan Murid (Update Student Password)
 */
export async function updateStudentPassword(ic, currentPassword, newPassword) {
    try {
        const cleanIC = String(ic || "").replace(/\D/g, "");
        if (!cleanIC) {
            return { success: false, error: "No. Kad Pengenalan tidak sah." };
        }
        if (!currentPassword || !newPassword) {
            return { success: false, error: "Sila isi kata laluan semasa dan baharu." };
        }
        if (newPassword.length < 6) {
            return { success: false, error: "Kata laluan baharu mestilah sekurang-kurangnya 6 aksara." };
        }

        const docRef = doc(db, "pelajar", cleanIC);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return { success: false, error: "Akaun pelajar tidak dijumpai." };
        }

        const data = docSnap.data();
        if (data.password !== currentPassword) {
            return { success: false, error: "Kata laluan semasa tidak tepat." };
        }

        await setDoc(docRef, {
            password: newPassword,
            dikemaskiniPada: serverTimestamp(),
        }, { merge: true });

        if (typeof window !== "undefined") {
            try {
                const rawSession = localStorage.getItem("exploria_student_session");
                if (rawSession) {
                    const parsed = JSON.parse(rawSession);
                    parsed.password = newPassword;
                    localStorage.setItem("exploria_student_session", JSON.stringify(parsed));
                }
            } catch {}
        }

        return { success: true, message: "Kata laluan berjaya dikemas kini." };
    } catch (error) {
        console.error("❌ [Firestore] Ralat kemas kini kata laluan murid:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 11. Fungsi Membaca Papan Pendahulu / Leaderboard Pelajar
 * Mengambil senarai murid daripada koleksi 'pelajar', disusun mengikut mataXP tertinggi
 */
export async function getLeaderboardData() {
    try {
        const querySnapshot = await getDocs(collection(db, "pelajar"));
        const students = [];

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const ic = docSnap.id;
            const cleanIC = ic.replace(/\D/g, "");
            students.push({
                id: docSnap.id,
                ic: cleanIC,
                studentId: data.studentId || `STU-${cleanIC.length >= 5 ? cleanIC.slice(-5) : cleanIC.padStart(5, "0")}`,
                name: data.nama || "Pelajar",
                level: Number(data.tahap) || 1,
                xp: Number(data.mataXP) || 0,
                coins: Number(data.koinBintang) || 0,
                school: data.namaSekolah || data.sekolah || "-",
                schoolType: data.jenisSekolah || "",
                district: data.daerah || "",
                state: data.negeri || "",
                avatarId: data.avatarDipilih || "avatar_astro_1",
                borderId: data.borderDipilih || data.equippedBorderId || null,
                streak: Number(data.streakHari ?? data.streak) || 1,
            });
        });

        // Susun murid sebenar mengikut mataXP tertinggi
        students.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        // Berikan nombor kedudukan (rank) rasmi berdasarkan susunan mataXP
        const rankedStudents = students.map((s, idx) => ({
            ...s,
            rank: idx + 1,
            trend: "same",
        }));

        return { success: true, students: rankedStudents };
    } catch (error) {
        console.error("❌ [Firestore] Ralat membaca data papan pendahulu:", error);
        return { success: false, error: error.message, students: [] };
    }
}



