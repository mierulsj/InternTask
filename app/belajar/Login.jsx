"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginStudentWithFirestore } from "../../lib/firestoreService";

export default function LoginPage({ onNavigate, onSuccess, onContinueAsGuest }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        ic: "",
        password: "",
        rememberMe: false
    });

    useEffect(() => {
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
        if (!/^\d+$/.test(ic)) return "No. Kad Pengenalan mestilah nombor sahaja (tanpa huruf atau simbol).";
        if (ic.length !== 12) return `No. Kad Pengenalan mestilah tepat 12 digit (sekarang: ${ic.length}/12 digit).`;
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Kata laluan diperlukan.";
        if (password.length < 6) return "Kata laluan mestilah sekurang-kurangnya 6 aksara.";
        return "";
    };

    const errors = {
        ic: validateIC(formData.ic),
        password: validatePassword(formData.password)
    };

    const isFormValid = !errors.ic && !errors.password;

    const handleICChange = (e) => {
        // Enforce digits only and limit to 12 digits
        const rawVal = e.target.value;
        const digitsOnly = rawVal.replace(/\D/g, "").slice(0, 12);
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

            // Remember IC preference
            try {
                if (formData.rememberMe) {
                    localStorage.setItem("exploria_remembered_ic", formData.ic);
                } else {
                    localStorage.removeItem("exploria_remembered_ic");
                }
            } catch {
                // fallback
            }

            playSound("success");
            setIsSubmitting(false);

            const studentData = result.student || {};
            const studentName = studentData.nama || studentData.name || "Penjelajah STEM";

            if (onSuccess) {
                onSuccess({
                    name: studentName,
                    ic: formData.ic,
                    ...studentData
                });
            } else if (onNavigate) {
                onNavigate("menu");
            } else {
                router.push("/belajar");
            }
        } catch (err) {
            console.error("Firestore login error:", err);
            playSound("error");
            setLoginError("Ralat sambungan database Firestore. Sila pastikan sambungan internet aktif.");
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden selection:bg-sky-200 select-none"
            style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                background: "url('/paper-bg.jpg') top center / cover no-repeat fixed"
            }}
        >
            {/* Embedded CSS Animations & Tactile Button Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes floatGentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes popScale {
                    0% { transform: scale(0.9); opacity: 0; }
                    70% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-6px); }
                    40%, 80% { transform: translateX(6px); }
                }

                .anim-fade-in { animation: fadeInUp 0.4s ease-out forwards; }
                .anim-float { animation: floatGentle 3.5s ease-in-out infinite; }
                .anim-pop { animation: popScale 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .anim-shake { animation: shake 0.4s ease-in-out; }

                .btn-3d-blue {
                    background: linear-gradient(180deg, #00b4d8 0%, #0099e5 100%);
                    box-shadow: 0 5px 0 #0077b6, 0 10px 15px -3px rgba(0, 153, 229, 0.35);
                    transition: all 0.15s ease;
                }
                .btn-3d-blue:hover {
                    transform: translateY(2px);
                    box-shadow: 0 3px 0 #0077b6, 0 6px 10px -3px rgba(0, 153, 229, 0.3);
                }
                .btn-3d-blue:active {
                    transform: translateY(5px);
                    box-shadow: 0 0 0 #0077b6;
                }

                .btn-3d-pink {
                    background: linear-gradient(180deg, #ff2a7a 0%, #e91e63 100%);
                    box-shadow: 0 6px 0 #ad1457, 0 12px 20px -3px rgba(233, 30, 99, 0.45);
                    transition: all 0.15s ease;
                }
                .btn-3d-pink:hover {
                    transform: translateY(2px);
                    box-shadow: 0 4px 0 #ad1457, 0 8px 15px -3px rgba(233, 30, 99, 0.4);
                }
                .btn-3d-pink:active {
                    transform: translateY(6px);
                    box-shadow: 0 0 0 #ad1457;
                }

                .btn-3d-white {
                    background: #ffffff;
                    box-shadow: 0 4px 0 #cbd5e1;
                    transition: all 0.15s ease;
                }
                .btn-3d-white:hover {
                    transform: translateY(2px);
                    box-shadow: 0 2px 0 #cbd5e1;
                }
                .btn-3d-white:active {
                    transform: translateY(4px);
                    box-shadow: 0 0 0 #cbd5e1;
                }
            `}</style>

            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-pink-300/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar Actions */}
            <div className="w-full max-w-lg flex items-center justify-between mb-3 z-20">
                <button
                    type="button"
                    onClick={() => {
                        playSound("tap");
                        if (onContinueAsGuest) {
                            onContinueAsGuest();
                        } else if (onNavigate) {
                            onNavigate("menu");
                        } else {
                            router.push("/belajar");
                        }
                    }}
                    className="px-3.5 py-2 btn-3d-white text-slate-700 font-black rounded-2xl text-xs flex items-center gap-2 cursor-pointer border border-slate-200 shadow-sm"
                    title="Teroka portal tanpa log masuk"
                >
                    <span>👤</span>
                    <span>Teroka Sebagai Tetamu</span>
                    <span>➔</span>
                </button>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            playSound("tap");
                            router.push("/admin");
                        }}
                        className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-950 text-cyan-300 hover:text-white font-black rounded-2xl text-[11px] flex items-center gap-1.5 cursor-pointer border border-cyan-500/40 shadow-xs transition-all active:scale-95"
                        title="Pergi ke Portal Pentadbir"
                    >
                        <span>🛡️</span>
                        <span>Akses Admin</span>
                    </button>

                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-sky-200 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[10px] font-black text-sky-800 uppercase tracking-wider">
                            Log Masuk Murid
                        </span>
                    </div>
                </div>
            </div>

            {/* Logo Exploria Header */}
            <div className="text-center mb-4 relative z-10 anim-fade-in">
                <img
                    src="/logoexploria.png"
                    alt="Logo Exploria STEM"
                    className="h-16 sm:h-20 mx-auto object-contain drop-shadow-[0_4px_12px_rgba(0,153,229,0.35)]"
                />
            </div>

            {/* MAIN LOGIN CARD */}
            <div className="w-full max-w-lg bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,120,215,0.25)] border-3 sm:border-4 border-[#0099e5]/30 overflow-hidden relative z-10 anim-fade-in">

                {/* Card Header Banner */}
                <div
                    className="p-5 sm:p-6 text-white text-center relative shadow-sm"
                    style={{
                        background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                    }}
                >
                    <span className="bg-[#ffcc00] text-slate-950 text-[10px] sm:text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs inline-flex items-center gap-1 mb-2">
                        <span>👋</span>
                        <span>Selamat Kembali Penjelajah!</span>
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
                        Log Masuk Portal STEM
                    </h1>
                    <p className="text-xs text-sky-100 font-medium mt-1">
                        Sila masukkan No. Kad Pengenalan dan Kata Laluan anda untuk meneruskan misi.
                    </p>
                </div>

                <div className="p-5 sm:p-8 bg-white">
                    <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">

                        {/* Error Alert Box */}
                        {loginError && (
                            <div className="bg-rose-50 border-2 border-rose-400 p-3 rounded-2xl text-rose-900 text-xs font-bold anim-shake flex items-center gap-2">
                                <span>⚠️</span>
                                <span>{loginError}</span>
                            </div>
                        )}

                        {/* 1. NO. KAD PENGENALAN (IC) FIELD */}
                        <div>
                            <label
                                htmlFor="login-ic"
                                className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between"
                            >
                                <span className="flex items-center gap-1.5">
                                    <span className="text-sm">🪪</span>
                                    <span>No. Kad Pengenalan (IC)</span>
                                    <span className="text-rose-500">*</span>
                                </span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                                    formData.ic.length === 12
                                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                        : "bg-slate-100 text-slate-600 border-slate-200"
                                }`}>
                                    {formData.ic.length} / 12 Digit
                                </span>
                            </label>
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
                                    placeholder="080512015432 (12 Digit Nombor Sahaja)"
                                    className={`w-full px-4 py-3 rounded-2xl border-2 text-sm font-mono font-bold tracking-wider placeholder:tracking-normal placeholder:font-sans placeholder:text-slate-400 placeholder:font-normal outline-none transition-all ${
                                        (touched.ic || submitAttempted) && errors.ic
                                            ? "border-rose-400 bg-rose-50/50 text-rose-950 focus:ring-2 focus:ring-rose-300"
                                            : formData.ic.length === 12
                                                ? "border-emerald-400 bg-emerald-50/30 text-emerald-950 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                                : "border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-slate-900"
                                    }`}
                                />
                                {formData.ic.length === 12 && !errors.ic && (
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                                        ✓
                                    </div>
                                )}
                            </div>

                            <div className="mt-1 flex items-center justify-between text-[11px]">
                                {(touched.ic || submitAttempted) && errors.ic ? (
                                    <p className="font-bold text-rose-600 flex items-center gap-1 anim-fade-in">
                                        <span>⚠️</span>
                                        <span>{errors.ic}</span>
                                    </p>
                                ) : (
                                    <p className="text-slate-500 font-medium">
                                        Perlu <strong>12 nombor sahaja</strong> tanpa sebarang tanda sempang.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 2. PASSWORD (KATA LALUAN) FIELD */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label
                                    htmlFor="login-password"
                                    className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
                                >
                                    <span className="text-sm">🔒</span>
                                    <span>Kata Laluan</span>
                                    <span className="text-rose-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => { playSound("tap"); setShowForgotModal(true); }}
                                    className="text-[11px] font-bold text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                                >
                                    Lupa Kata Laluan?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                    onBlur={() => handleBlur("password")}
                                    placeholder="Masukkan kata laluan anda"
                                    className={`w-full px-4 py-3 pr-11 rounded-2xl border-2 text-sm font-bold placeholder:text-slate-400 placeholder:font-normal outline-none transition-all ${
                                        (touched.password || submitAttempted) && errors.password
                                            ? "border-rose-400 bg-rose-50/50 text-rose-950 focus:ring-2 focus:ring-rose-300"
                                            : formData.password.length >= 6
                                                ? "border-emerald-400 bg-emerald-50/30 text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                                : "border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-slate-900"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer transition-colors"
                                    title={showPassword ? "Sembunyi Kata Laluan" : "Tunjuk Kata Laluan"}
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
                                <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1 anim-fade-in">
                                    <span>⚠️</span>
                                    <span>{errors.password}</span>
                                </p>
                            )}
                        </div>

                        {/* REMEMBER ME CHECKBOX */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600 select-none">
                                <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                                    className="w-4 h-4 rounded-md text-[#0099e5] border-slate-300 focus:ring-sky-400 cursor-pointer"
                                />
                                <span>Ingat No. Kad Pengenalan saya</span>
                            </label>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 text-white font-black text-base sm:text-lg rounded-2xl cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                                    isSubmitting
                                        ? "bg-slate-400 cursor-not-allowed opacity-80"
                                        : "btn-3d-blue"
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Mengesahkan Log Masuk...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>🚀</span>
                                        <span>Log Masuk Penjelajah</span>
                                        <span>➔</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* DIVIDER */}
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-3 text-slate-400 font-black tracking-wider">
                                    Atau
                                </span>
                            </div>
                        </div>

                        {/* OPTIONS DAFTAR & TETAMU */}
                        <div className="text-center pt-1 space-y-3">
                            <p className="text-xs text-slate-600 font-bold">
                                Belum mempunyai akaun penjelajah?
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    playSound("tap");
                                    if (onNavigate) {
                                        onNavigate("register");
                                    } else {
                                        router.push("/register");
                                    }
                                }}
                                className="w-full py-3.5 btn-3d-white text-[#0088cc] hover:text-[#006699] font-black text-xs sm:text-sm rounded-2xl border-2 border-sky-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                            >
                                <span>📝</span>
                                <span>Daftar Akaun Murid Baharu (Percuma)</span>
                                <span>➔</span>
                            </button>

                            <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase">
                                    <span className="bg-white px-2.5 text-slate-400 font-black tracking-wider">
                                        Atau Terus Teroka
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    playSound("tap");
                                    if (onContinueAsGuest) {
                                        onContinueAsGuest();
                                    } else if (onNavigate) {
                                        onNavigate("menu");
                                    } else {
                                        router.push("/belajar");
                                    }
                                }}
                                className="w-full py-3 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 active:scale-98 text-slate-700 font-black text-xs sm:text-sm rounded-2xl border border-slate-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
                            >
                                <span>👤</span>
                                <span>Teruskan Sebagai Tetamu (Tanpa Daftar)</span>
                                <span>➔</span>
                            </button>
                            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                                * Tetamu boleh membaca nota sains secara percuma. Log masuk/daftar diperlukan untuk menjawab kuiz & bermain aktiviti.
                            </p>

                            {/* DIVIDER AKSES PENTADBIR */}
                            <div className="relative my-3 pt-1">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase">
                                    <span className="bg-white px-3 text-slate-400 font-black tracking-wider">
                                        Pengurusan Sistem
                                    </span>
                                </div>
                            </div>

                            {/* BUTANG LOGIN AS ADMIN */}
                            <button
                                type="button"
                                onClick={() => {
                                    playSound("tap");
                                    router.push("/admin");
                                }}
                                className="w-full py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 hover:from-slate-800 hover:to-cyan-900 text-cyan-300 hover:text-white font-black text-xs sm:text-sm rounded-2xl border-2 border-cyan-500/50 hover:border-cyan-400 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-cyan-900/30 active:scale-98 transition-all group"
                            >
                                <span className="text-base group-hover:scale-110 transition-transform">🛡️</span>
                                <span>Log Masuk Sebagai Pentadbir (Login as Admin)</span>
                                <span className="group-hover:translate-x-1 transition-transform font-bold">➔</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* FORGOT PASSWORD MODAL */}
            {showForgotModal && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 anim-fade-in"
                    onClick={() => setShowForgotModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border-4 border-sky-400 anim-pop relative overflow-hidden"
                    >
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-3xl">
                            🔑
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900">
                                Lupa Kata Laluan?
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                Sila hubungi guru atau pentadbir sekolah anda untuk menetapkan semula kata laluan portal Exploria STEM.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-left text-xs text-slate-600 space-y-1">
                            <p className="font-bold text-slate-800">💡 Tip Penjelajah:</p>
                            <p>Pastikan anda mengingati No. Kad Pengenalan 12 digit yang didaftarkan.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { playSound("tap"); setShowForgotModal(false); }}
                            className="w-full py-2.5 bg-gradient-to-r from-[#0088cc] to-[#0099e5] text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                        >
                            Faham & Tutup
                        </button>
                    </div>
                </div>
            )}

            {/* Bottom Footer */}
            <div className="mt-4 text-center text-xs text-white/80 font-bold z-10">
                <span>Exploria STEM Learning Portal • Hak Cipta Terpelihara</span>
            </div>
        </div>
    );
}
