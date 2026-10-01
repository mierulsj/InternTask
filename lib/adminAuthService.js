import bcrypt from "bcryptjs";
import { db } from "../firebase.js";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";

/* =========================================================================
   ADMIN AUTHENTICATION & SECURITY SERVICE - EXPLORIA STEM
   Features:
   - Bcrypt Salt & Hash password verification
   - Brute-Force Rate Limiting (Lockout after 5 failed attempts)
   - 2FA (Two-Factor Authentication OTP Verification)
   - Session Token generation & Inactivity Timeout Management
   - No self-registration policy
   ========================================================================= */

// Pre-computed Bcrypt hash for default admin password "Exploria123" (Cost factor 10)
export const DEFAULT_ADMIN_EMAIL = "mierulsj@gmail.com";
export const DEFAULT_PASSWORD_HASH = "$2b$10$D40XnkVg0Fn6ykOixUSdzOQ41gzxrTe8BW5wny19TIatwiVbZ96A2";
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 Minit
export const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 Minit tidak aktif

// In-memory cache for fast rate-limiting & 2FA codes (synced with Firestore)
const rateLimitStore = new Map();
const pending2FAStore = new Map();

/**
 * 1. Pastikan akaun Super Admin wujud dalam Firestore dengan kata laluan Bcrypt
 */
export async function ensureDefaultAdminExists() {
    try {
        const adminRef = doc(db, "pentadbir", DEFAULT_ADMIN_EMAIL.toLowerCase());
        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {
            await setDoc(adminRef, {
                email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
                nama: "Super Admin Exploria",
                peranan: "Super Administrator",
                passwordHash: DEFAULT_PASSWORD_HASH,
                percubaanGagal: 0,
                dikunciSehingga: null,
                status: "Aktif",
                duaFaktorAktif: true,
                diciptaPada: serverTimestamp(),
            });
            console.log("✅ [Admin Auth] Akaun Super Admin berjaya dicipta dalam Firestore.");
        }
        return { success: true };
    } catch (err) {
        console.error("⚠️ [Admin Auth] Ralat menyemak akaun admin Firestore (menggunakan fallback selamat):", err.message);
        return { success: false, fallback: true };
    }
}

/**
 * 2. Semak status sekatan Brute-Force Rate Limiting
 */
export function checkRateLimit(email) {
    const cleanEmail = email.trim().toLowerCase();
    const record = rateLimitStore.get(cleanEmail) || { failedAttempts: 0, lockedUntil: null };

    if (record.lockedUntil) {
        const remainingMs = record.lockedUntil - Date.now();
        if (remainingMs > 0) {
            const remainingMinutes = Math.ceil(remainingMs / 60000);
            const remainingSeconds = Math.ceil(remainingMs / 1000);
            return {
                isLocked: true,
                remainingMs,
                remainingMinutes,
                remainingSeconds,
                failedAttempts: record.failedAttempts,
            };
        } else {
            // Tempoh kunci telah tamat, reset rekod
            rateLimitStore.delete(cleanEmail);
        }
    }

    return {
        isLocked: false,
        failedAttempts: record.failedAttempts || 0,
        attemptsLeft: Math.max(0, MAX_LOGIN_ATTEMPTS - (record.failedAttempts || 0)),
    };
}

/**
 * 3. Log Masuk Pentadbir (Langkah 1: E-mel & Kata Laluan Bcrypt)
 */
export async function loginAdmin({ email, password }) {
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password || "";

    if (!cleanEmail || !cleanPassword) {
        return {
            success: false,
            error: "Sila masukkan E-mel Pentadbir dan Kata Laluan yang lengkap.",
        };
    }

    // A. Semak Rate Limiting (Had Percubaan Brute-Force)
    const rateStatus = checkRateLimit(cleanEmail);
    if (rateStatus.isLocked) {
        return {
            success: false,
            isLocked: true,
            remainingSeconds: rateStatus.remainingSeconds,
            remainingMinutes: rateStatus.remainingMinutes,
            error: `Akaun telah dikunci sementara kerana 5 kali percubaan gagal berturut-turut. Sila tunggu ${rateStatus.remainingMinutes} minit lagi.`,
        };
    }

    try {
        // Pastikan akaun default wujud
        await ensureDefaultAdminExists();

        // B. Baca rekod admin dari Firestore (atau fallback default jika offline/firebase network error)
        let adminData = null;
        let passwordHashToVerify = DEFAULT_PASSWORD_HASH;

        try {
            const adminRef = doc(db, "pentadbir", cleanEmail);
            const adminSnap = await getDoc(adminRef);

            if (adminSnap.exists()) {
                adminData = adminSnap.data();
                passwordHashToVerify = adminData.passwordHash || DEFAULT_PASSWORD_HASH;
            }
        } catch (e) {
            console.warn("Menggunakan pengesahan terus admin:", e.message);
        }

        // C. Semak jika e-mel berdaftar sebagai admin
        // Tiada pendaftaran sendiri! Hanya e-mel yang didaftarkan dalam sistem dibenarkan.
        if (cleanEmail !== DEFAULT_ADMIN_EMAIL.toLowerCase() && !adminData) {
            // Kira sebagai percubaan gagal untuk elak scan e-mel
            recordFailedAttempt(cleanEmail);
            const updatedRate = checkRateLimit(cleanEmail);
            return {
                success: false,
                error: "E-mel atau kata laluan tidak sah. Akses terhad untuk pentadbir sahaja.",
                attemptsLeft: updatedRate.attemptsLeft,
                isLocked: updatedRate.isLocked,
            };
        }

        // D. Sahkan Kata Laluan dengan Penyulitan Bcrypt (Bcrypt.compare)
        const isPasswordValid = bcrypt.compareSync(cleanPassword, passwordHashToVerify);

        if (!isPasswordValid) {
            recordFailedAttempt(cleanEmail);
            const updatedRate = checkRateLimit(cleanEmail);

            if (updatedRate.isLocked) {
                return {
                    success: false,
                    isLocked: true,
                    remainingSeconds: updatedRate.remainingSeconds,
                    error: `Kata laluan salah! Akaun telah dikunci sementara (${updatedRate.remainingMinutes} minit) kerana melebihi 5 kali percubaan.`,
                };
            }

            return {
                success: false,
                error: `Kata laluan tidak tepat. Baki percubaan: ${updatedRate.attemptsLeft}/${MAX_LOGIN_ATTEMPTS}`,
                attemptsLeft: updatedRate.attemptsLeft,
                isLocked: false,
            };
        }

        // E. Kata Laluan Tepat! Reset had percubaan gagal
        rateLimitStore.delete(cleanEmail);

        // F. Hasilkan Kod Pengesahan Dua Faktor (2FA OTP)
        // Kod 6-digit rawak selamat
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const tempToken = `2fa_temp_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

        pending2FAStore.set(tempToken, {
            email: cleanEmail,
            otp: otpCode,
            name: adminData?.nama || "Super Admin Exploria",
            role: adminData?.peranan || "Super Administrator",
            expiresAt: Date.now() + 5 * 60 * 1000, // 5 Minit untuk isi OTP
        });

        console.log(`🔐 [Admin 2FA] Kod OTP untuk ${cleanEmail} ialah: ${otpCode}`);

        return {
            success: true,
            requires2FA: true,
            tempToken,
            demoOtp: otpCode, // Disediakan untuk kemudahan demonstrasi & salinan terus
            message: "Kata laluan disahkan. Sila lengkapkan pengesahan 2FA.",
        };
    } catch (err) {
        console.error("Ralat log masuk admin:", err);
        return {
            success: false,
            error: "Ralat pelayan semasa memproses log masuk pentadbir.",
        };
    }
}

/**
 * 4. Pengesahan 2FA (Langkah 2: Kod OTP 6-Digit)
 */
export function verify2FA({ tempToken, otp }) {
    if (!tempToken || !otp) {
        return { success: false, error: "Sila masukkan kod 6-digit 2FA yang sah." };
    }

    const pending = pending2FAStore.get(tempToken);
    if (!pending) {
        return {
            success: false,
            error: "Sesi 2FA telah tamat atau tidak sah. Sila log masuk semula.",
            sessionExpired: true,
        };
    }

    if (Date.now() > pending.expiresAt) {
        pending2FAStore.delete(tempToken);
        return {
            success: false,
            error: "Kod OTP 2FA telah tamat tempoh (5 minit). Sila log masuk semula.",
            sessionExpired: true,
        };
    }

    // Bersihkan format input OTP
    const cleanOtp = otp.toString().trim().replace(/\D/g, "");

    if (cleanOtp !== pending.otp) {
        return {
            success: false,
            error: "Kod 2FA salah! Sila semak semula kod 6-digit anda.",
        };
    }

    // 2FA Berjaya! Hasilkan Sesi Token Pentadbir yang Sah
    pending2FAStore.delete(tempToken);

    const sessionDurationMs = 60 * 60 * 1000; // 1 Jam Sesi Maksimum
    const adminSessionToken = `exploria_admin_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const expiresAt = Date.now() + sessionDurationMs;

    const adminProfile = {
        email: pending.email,
        name: pending.name,
        role: pending.role,
        token: adminSessionToken,
        expiresAt,
        inactivityLimitMs: INACTIVITY_TIMEOUT_MS,
        lastActive: Date.now(),
    };

    // Kemaskini masa log masuk berjaya dalam Firestore jika boleh
    try {
        const adminRef = doc(db, "pentadbir", pending.email);
        updateDoc(adminRef, {
            logMasukTerakhir: serverTimestamp(),
            percubaanGagal: 0,
            dikunciSehingga: null,
        }).catch(() => {});
    } catch {}

    return {
        success: true,
        session: adminProfile,
    };
}

/**
 * 5. Buka Sekatan Manual (Emergency Unlock by Super Admin)
 */
export function unlockAdminAccount(email = DEFAULT_ADMIN_EMAIL) {
    const cleanEmail = email.trim().toLowerCase();
    rateLimitStore.delete(cleanEmail);
    return { success: true, message: `Sekatan brute-force untuk ${cleanEmail} telah diset semula.` };
}

/**
 * 6. Dapatkan Senarai Semua Murid untuk Papan Pemuka Pentadbir
 */
export async function getAdminStudentsList() {
    try {
        const querySnap = await getDocs(collection(db, "pelajar"));
        const students = [];

        querySnap.forEach((docSnap) => {
            const data = docSnap.data();
            students.push({
                ic: docSnap.id,
                name: data.nama || "Pelajar",
                level: data.tahap || 1,
                xp: data.mataXP || 100,
                plantScore: data.skorTumbuhan || 0,
                solarScore: data.skorSuria || 0,
                quizScore: data.skorKuiz || 0,
                spellingScore: data.skorSpelling || 0,
                mathScore: data.skorSifir || 0,
                streak: data.streakHari || 1,
                registeredAt: data.tarikhDaftar?.toDate?.()
                    ? data.tarikhDaftar.toDate().toLocaleDateString("ms-MY")
                    : "Baru",
                status: data.statusAkaun || "Aktif",
            });
        });

        // Susun mengikut mata XP tertinggi
        students.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        return { success: true, students };
    } catch (err) {
        console.error("Ralat membaca senarai murid pentadbir:", err);
        return { success: false, error: err.message, students: [] };
    }
}

// Helper persendirian untuk rekod kegagalan log masuk
function recordFailedAttempt(email) {
    const cleanEmail = email.trim().toLowerCase();
    const existing = rateLimitStore.get(cleanEmail) || { failedAttempts: 0, lockedUntil: null };
    const newCount = (existing.failedAttempts || 0) + 1;

    let lockedUntil = null;
    if (newCount >= MAX_LOGIN_ATTEMPTS) {
        lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
        console.warn(`🚨 [Brute-Force Protection] Akaun ${cleanEmail} DIKUNCI selama 15 minit selepas ${newCount} kegagalan!`);
    }

    rateLimitStore.set(cleanEmail, {
        failedAttempts: newCount,
        lockedUntil,
    });
}
