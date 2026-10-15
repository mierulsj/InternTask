"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginStudentWithFirestore } from "../../lib/firestoreService";
import { VectorAvatarAstro, VectorAvatarGuest } from "./components/GameIcons";

export default function LoginPage({ onNavigate, onSuccess, onContinueAsGuest }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        ic: "",
        password: "",
        rememberMe: false
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const initialIC = localStorage.getItem("exploria_remembered_ic") || "";
                if (initialIC) {
                    setFormData(prev => ({
                        ...prev,
                        ic: initialIC,
                        rememberMe: true
                    }));
                }
            } catch {}
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const [touched, setTouched] = useState({
        ic: false,
        password: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [showForgotModal, setShowForgotModal] = useState(false);

    // Web Audio API Sound Effects
    const playSound = (type) => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            if (type === "tap") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } else if (type === "success") {
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.08);
                    osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
                });
            } else if (type === "error") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(220, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            }
        } catch {
            // Audio silent fallback
        }
    };

    // Validations
    const validateIC = (ic) => {
        if (!ic) return "No. Kad Pengenalan diperlukan.";
        if (!/^\d+$/.test(ic)) return "Nombor sahaja tanpa sebarang simbol.";
        if (ic.length !== 12) return `Perlu 12 digit (semasa: ${ic.length}/12).`;
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Kata laluan diperlukan.";
        if (password.length < 6) return "Kata laluan sekurang-kurangnya 6 aksara.";
        return "";
    };

    const errors = {
        ic: validateIC(formData.ic),
        password: validatePassword(formData.password)
    };

    const isFormValid = !errors.ic && !errors.password;

    const handleICChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 12);
        setFormData(prev => ({ ...prev, ic: digitsOnly }));
        setLoginError("");
    };

    const handlePasswordChange = (e) => {
        setFormData(prev => ({ ...prev, password: e.target.value }));
        setLoginError("");
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        setTouched({ ic: true, password: true });

        if (!isFormValid) {
            playSound("error");
            return;
        }

        setIsSubmitting(true);
        setLoginError("");

        try {
            const result = await loginStudentWithFirestore({
                ic: formData.ic.trim(),
                password: formData.password
            });

            if (!result.success) {
                playSound("error");
                setLoginError(result.error || result.message || "Log masuk gagal. Sila semak No. Kad Pengenalan dan kata laluan.");
                setIsSubmitting(false);
                return;
            }

            try {
                if (formData.rememberMe) {
                    localStorage.setItem("exploria_remembered_ic", formData.ic);
                } else {
                    localStorage.removeItem("exploria_remembered_ic");
                }
            } catch {}

            playSound("success");
            setIsSubmitting(false);

            const cleanIC = formData.ic.replace(/\D/g, "");
            const studentData = {
                ...(result.student || {}),
                ic: cleanIC
            };
            const studentName = studentData.nama || studentData.name || "Penjelajah STEM";
            const schoolName = studentData.namaSekolah || studentData.sekolah || studentData.school || "";
            const schoolType = studentData.jenisSekolah || studentData.schoolType || "SK";
            const studentId = studentData.studentId || `STU-${cleanIC.length >= 5 ? cleanIC.slice(-5) : cleanIC.padStart(5, "0")}`;

            try {
                localStorage.setItem("exploria_is_logged_in", "true");
                localStorage.setItem("exploria_student_name", studentName);
                localStorage.setItem("exploria_student_ic", cleanIC);
                localStorage.setItem("exploria_active_ic", cleanIC);
                localStorage.setItem("exploria_student_session", JSON.stringify({
                    name: studentName,
                    ic: cleanIC,
                    studentId: studentId,
                    school: schoolName,
                    schoolType: schoolType,
                    ...studentData,
                }));
                if (schoolName) {
                    localStorage.setItem("exploria_student_school", schoolName);
                    localStorage.setItem("exploria_student_school_type", schoolType);
                }

                // Segerak Koin Bintang & Barangan Dimiliki/Dipasang dari Firestore ke LocalStorage
                const userCoins = typeof studentData.koinBintang === "number" ? studentData.koinBintang : 50;
                const userOwned = Array.isArray(studentData.barangDimiliki) && studentData.barangDimiliki.length > 0
                    ? Array.from(new Set([...studentData.barangDimiliki, "border_cadet", "avatar_astro_1"]))
                    : ["border_cadet", "avatar_astro_1"];
                const userEquipped = {
                    border: studentData.borderDipilih || "border_cadet",
                    avatar: studentData.avatarDipilih || "avatar_astro_1",
                    pet: studentData.petDipilih || null,
                };
                localStorage.setItem(`exploria_student_${cleanIC}_shop`, JSON.stringify({ coins: userCoins, ownedItems: userOwned }));
                localStorage.setItem(`exploria_student_${cleanIC}_equipped`, JSON.stringify(userEquipped));

                sessionStorage.removeItem("exploria_guest_mode");
            } catch {}

            if (onSuccess) {
                onSuccess({
                    ...studentData,
                    name: studentName,
                    ic: cleanIC
                });
            } else if (onNavigate) {
                onNavigate("menu");
            } else {
                router.push("/belajar");
            }
        } catch (err) {
            console.error("Firestore login error:", err);
            playSound("error");
            setLoginError("Ralat sambungan database. Sila pastikan talian internet aktif.");
            setIsSubmitting(false);
        }
    };

    const handleGuestClick = () => {
        playSound("tap");
        if (onContinueAsGuest) {
            onContinueAsGuest();
        } else if (onNavigate) {
            onNavigate("menu");
        } else {
            router.push("/belajar");
        }
    };

    const handleRegisterClick = () => {
        playSound("tap");
        if (onNavigate) {
            onNavigate("register");
        } else {
            router.push("/register");
        }
    };

    const handleAdminClick = () => {
        playSound("tap");
        router.push("/admin");
    };

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden selection:bg-sky-200 select-none"
            style={{
                fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                background: "#ffffff"
            }}
        >
            {/* Embedded Micro-Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-5px); }
                    40%, 80% { transform: translateX(5px); }
                }
                .anim-fade-in { animation: fadeInUp 0.35s ease-out forwards; }
                .anim-shake { animation: shake 0.35s ease-in-out; }
            `}</style>

            {/* Subtle Single Ambient Glow (Clean, No Rainbow Chaos) */}
            <div className="absolute top-1/3 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

            {/* MAIN LOGIN CARD */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 relative z-10 anim-fade-in">
                
                {/* Header: Logo, Title & Concise Subtitle */}
                <div className="text-center mb-5">
                    <img
                        src="/logoexploria.png"
                        alt="Exploria STEM"
                        className="h-14 sm:h-16 mx-auto object-contain drop-shadow-sm mb-3"
                    />
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        Log Masuk
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        Pilih jenis akaun untuk mengakses portal anda
                    </p>
                </div>

                {/* PILIHAN JENIS PENGGUNA: [Log Masuk Pelajar] vs [Log Masuk Ibu Bapa] */}
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-5 border border-slate-200">
                    <button
                        type="button"
                        onClick={() => playSound("tap")}
                        className="flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white text-[#0088cc] shadow-xs border border-slate-200/80"
                    >
                        <VectorAvatarAstro className="w-4 h-4 text-[#0088cc]" />
                        <span>Log Masuk Pelajar</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            playSound("tap");
                            router.push("/ibu-bapa");
                        }}
                        className="flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer text-slate-500 hover:text-indigo-600 hover:bg-white/60"
                        title="Buka Portal Ibu Bapa"
                    >
                        <VectorAvatarGuest className="w-4 h-4 text-slate-500" />
                        <span>Log Masuk Ibu Bapa</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
                    
                    {/* Error Alert Box */}
                    {loginError && (
                        <div className="bg-rose-50 border border-rose-300 p-3 rounded-xl text-rose-800 text-xs font-bold anim-shake flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">!</span>
                            <span>{loginError}</span>
                        </div>
                    )}

                    {/* 1. NO. KAD PENGENALAN (IC) */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label
                                htmlFor="login-ic"
                                className="block text-xs font-bold text-slate-700"
                            >
                                No. Kad Pengenalan
                            </label>
                            {formData.ic.length > 0 && (
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    formData.ic.length === 12
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-slate-100 text-slate-500"
                                }`}>
                                    {formData.ic.length}/12
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                id="login-ic"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={12}
                                value={formData.ic}
                                onChange={handleICChange}
                                onBlur={() => handleBlur("ic")}
                                placeholder="Contoh: 080512015432"
                                className={`w-full px-4 py-3 rounded-xl border text-sm font-mono font-medium outline-none transition-all placeholder:font-sans placeholder:text-slate-400 ${
                                    (touched.ic || submitAttempted) && errors.ic
                                        ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                        : formData.ic.length === 12
                                            ? "border-emerald-400 bg-emerald-50/20 text-slate-900 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100"
                                            : "border-slate-300 bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-900"
                                }`}
                            />
                            {formData.ic.length === 12 && !errors.ic && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                                    ✓
                                </div>
                            )}
                        </div>
                        {(touched.ic || submitAttempted) && errors.ic && (
                            <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                                <span>⚠️</span>
                                <span>{errors.ic}</span>
                            </p>
                        )}
                    </div>

                    {/* 2. KATA LALUAN */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label
                                htmlFor="login-password"
                                className="block text-xs font-bold text-slate-700"
                            >
                                Kata Laluan
                            </label>
                            <button
                                type="button"
                                onClick={() => { playSound("tap"); setShowForgotModal(true); }}
                                className="text-xs font-semibold text-[#0099e5] hover:underline cursor-pointer"
                            >
                                Lupa kata laluan?
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handlePasswordChange}
                                onBlur={() => handleBlur("password")}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm font-medium outline-none transition-all placeholder:text-slate-400 ${
                                    (touched.password || submitAttempted) && errors.password
                                        ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                        : "border-slate-300 bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-900"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer transition-colors"
                                title={showPassword ? "Sembunyikan" : "Tunjukkan"}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {(touched.password || submitAttempted) && errors.password && (
                            <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                                <span>⚠️</span>
                                <span>{errors.password}</span>
                            </p>
                        )}
                    </div>

                    {/* INGAT SAYA CHECKBOX */}
                    <div className="pt-0.5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
                            <input
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                                className="w-4 h-4 rounded text-[#0099e5] border-slate-300 focus:ring-sky-400 cursor-pointer"
                            />
                            <span>Ingat saya di peranti ini</span>
                        </label>
                    </div>

                    {/* BUTTON 1 (PRIMARY): BRAND BLUE */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3.5 btn-primary font-black text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Mengesahkan...</span>
                                </>
                            ) : (
                                <span>Log Masuk</span>
                            )}
                        </button>
                    </div>

                    {/* CLEAN DIVIDER */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-slate-400 font-bold tracking-wider">
                                Atau
                            </span>
                        </div>
                    </div>

                    {/* BUTTON 2 (SECONDARY): CLEAN WHITE / SLATE */}
                    <div>
                        <button
                            type="button"
                            onClick={handleRegisterClick}
                            className="w-full py-3 btn-secondary font-bold text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                            <span>Daftar Akaun Murid Baharu</span>
                        </button>
                    </div>

                </form>

            </div>

            {/* QUICK TERTIARY LINKS (CLEAN, NO TEXT CLUTTER) */}
            <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-500 z-10 flex-wrap">
                <button
                    type="button"
                    onClick={handleGuestClick}
                    className="hover:text-[#0099e5] transition-colors cursor-pointer"
                >
                    Teroka sebagai Tetamu
                </button>
                <span className="text-slate-300">•</span>
                <button
                    type="button"
                    onClick={handleAdminClick}
                    className="hover:text-[#0099e5] transition-colors cursor-pointer"
                >
                    Akses Pentadbir
                </button>
            </div>

            {/* FORGOT PASSWORD MODAL */}
            {showForgotModal && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 anim-fade-in"
                    onClick={() => setShowForgotModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 relative overflow-hidden"
                    >
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center p-3 text-sky-600">
                            <VectorAvatarAstro className="w-full h-full" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-slate-900">
                                Lupa Kata Laluan?
                            </h3>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                Sila hubungi guru sains atau pentadbir sekolah anda untuk menetapkan semula kata laluan portal Exploria STEM.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { playSound("tap"); setShowForgotModal(false); }}
                            className="w-full py-2.5 btn-primary font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                        >
                            Faham & Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
