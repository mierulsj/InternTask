"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerStudentWithFirestore } from "../../lib/firestoreService";

export default function RegisterPage({ onNavigate, onSuccess, onContinueAsGuest }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        ic: "",
        password: "",
        confirmPassword: ""
    });

    const [touched, setTouched] = useState({
        name: false,
        ic: false,
        password: false,
        confirmPassword: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [registerError, setRegisterError] = useState("");

    // Audio Feedback helper
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
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
                    gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.09);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + idx * 0.09);
                    osc.stop(ctx.currentTime + idx * 0.09 + 0.3);
                });
            } else if (type === "error") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(220, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.14, ctx.currentTime);
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

    // Validation Functions
    const validateName = (name) => {
        if (!name.trim()) return "Nama penuh diperlukan.";
        if (name.trim().length < 3) return "Nama mestilah sekurang-kurangnya 3 huruf.";
        if (!/^[a-zA-Z\s'@./-]+$/.test(name)) return "Nama hanya boleh mengandungi huruf dan aksara yang sah.";
        return "";
    };

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

    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) return "Sila sahkan kata laluan anda.";
        if (confirmPassword !== password) return "Kata laluan tidak sepadan.";
        return "";
    };

    // Calculated Errors
    const errors = {
        name: validateName(formData.name),
        ic: validateIC(formData.ic),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password)
    };

    const isFormValid = !errors.name && !errors.ic && !errors.password && !errors.confirmPassword;

    // Handle Input Changes
    const handleNameChange = (e) => {
        setFormData(prev => ({ ...prev, name: e.target.value }));
        if (registerError) setRegisterError("");
    };

    const handleICChange = (e) => {
        const rawVal = e.target.value;
        const digitsOnly = rawVal.replace(/\D/g, "").slice(0, 12);
        setFormData(prev => ({ ...prev, ic: digitsOnly }));
        if (registerError) setRegisterError("");
    };

    const handlePasswordChange = (e) => {
        setFormData(prev => ({ ...prev, password: e.target.value }));
        if (registerError) setRegisterError("");
    };

    const handleConfirmPasswordChange = (e) => {
        setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
        if (registerError) setRegisterError("");
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError("");
        setSubmitAttempted(true);
        setTouched({
            name: true,
            ic: true,
            password: true,
            confirmPassword: true
        });

        if (!isFormValid) {
            playSound("error");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await registerStudentWithFirestore({
                name: formData.name.trim(),
                ic: formData.ic.trim(),
                password: formData.password
            });

            if (!result.success) {
                playSound("error");
                setRegisterError(result.error || result.message || "Pendaftaran gagal. Sila semak maklumat anda.");
                setIsSubmitting(false);
                return;
            }

            playSound("success");
            setIsSubmitting(false);
            setIsSuccess(true);

            if (onSuccess) {
                onSuccess({
                    name: formData.name.trim(),
                    ic: formData.ic.trim(),
                    ...result.student
                });
            }
        } catch (err) {
            console.error("Firestore register error:", err);
            playSound("error");
            setRegisterError("Ralat sambungan database Firestore. Sila pastikan anda mempunyai sambungan internet yang stabil.");
            setIsSubmitting(false);
        }
    };

    const handleProceedToLearning = () => {
        playSound("tap");
        if (onNavigate) {
            onNavigate("menu");
        } else {
            router.push("/belajar");
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
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(0, 153, 229, 0.4); }
                    50% { box-shadow: 0 0 16px 4px rgba(0, 153, 229, 0.25); }
                }

                .anim-fade-in { animation: fadeInUp 0.4s ease-out forwards; }
                .anim-float { animation: floatGentle 3.5s ease-in-out infinite; }
                .anim-pop { animation: popScale 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .anim-glow { animation: pulseGlow 2s infinite ease-in-out; }

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

            {/* Back to Portal / Home Button */}
            <div className="w-full max-w-lg flex items-center justify-between mb-3 z-20">
                <button
                    type="button"
                    onClick={() => {
                        playSound("tap");
                        if (onNavigate) {
                            onNavigate("login");
                        } else {
                            router.push("/login");
                        }
                    }}
                    className="px-3.5 py-2 btn-3d-white text-slate-700 font-black rounded-2xl text-xs flex items-center gap-2 cursor-pointer border border-slate-200 shadow-sm"
                >
                    <svg className="w-4 h-4 text-slate-600" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Kembali ke Log Masuk</span>
                </button>

                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-sky-200 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-black text-sky-800 uppercase tracking-wider">
                        Pendaftaran Murid
                    </span>
                </div>
            </div>

            {/* Logo Exploria & Mascot Header */}
            <div className="text-center mb-4 relative z-10 anim-fade-in">
                <img
                    src="/logoexploria.png"
                    alt="Logo Exploria STEM"
                    className="h-16 sm:h-20 mx-auto object-contain drop-shadow-[0_4px_12px_rgba(0,153,229,0.35)]"
                />
            </div>

            {/* MAIN CARD CONTAINER */}
            <div className="w-full max-w-lg bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,120,215,0.25)] border-3 sm:border-4 border-[#0099e5]/30 overflow-hidden relative z-10 anim-fade-in">

                {/* Card Header Banner */}
                <div
                    className="p-5 sm:p-6 text-white text-center relative shadow-sm"
                    style={{
                        background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                    }}
                >
                    <span className="bg-[#ffcc00] text-slate-950 text-[10px] sm:text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs inline-flex items-center gap-1 mb-2">
                        <span>🚀</span>
                        <span>Exploria STEM Explorer</span>
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
                        Daftar Akaun Penjelajah Cilik
                    </h1>
                    <p className="text-xs text-sky-100 font-medium mt-1">
                        Lengkapkan maklumat di bawah untuk menyertai misi pembelajaran Sains & Kuiz STEM.
                    </p>
                </div>

                <div className="p-5 sm:p-8 bg-white">

                    {/* SUCCESS CARD VIEW */}
                    {isSuccess ? (
                        <div className="text-center space-y-4 py-4 anim-pop">
                            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 p-1 shadow-lg shadow-emerald-500/25 anim-float">
                                <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center text-4xl">
                                    🎉
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                                    Pendaftaran Berjaya!
                                </span>
                                <h2 className="text-2xl font-black text-slate-900 mt-2">
                                    Tahniah, {formData.name.trim()}!
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    Akaun anda telah didaftarkan dengan No. Kad Pengenalan:
                                </p>
                                <span className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 rounded-xl font-mono text-sm font-black text-slate-800 mt-1">
                                    {formData.ic.replace(/(\d{6})(\d{2})(\d{4})/, "$1-$2-$3")}
                                </span>
                            </div>

                            <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-200 text-left space-y-1.5">
                                <h3 className="text-xs font-black text-sky-900 flex items-center gap-1.5">
                                    <span>🌟</span>
                                    <span>Faedah Akaun Penjelajah Anda:</span>
                                </h3>
                                <ul className="text-xs text-slate-600 font-medium space-y-1 pl-5 list-disc">
                                    <li>Akses penuh modul nota sains visual & infografik.</li>
                                    <li>Menjawab Kuiz Pantas 20s dengan mata kelajuan.</li>
                                    <li>Main Drag & Drop Sistem Suria dan simpan markah.</li>
                                    <li>Kumpul lencana pencapaian di Profil Penjelajah anda!</li>
                                </ul>
                            </div>

                            <button
                                type="button"
                                onClick={handleProceedToLearning}
                                className="w-full py-4 btn-3d-pink text-white font-black text-base rounded-2xl cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                            >
                                <span>🚀</span>
                                <span>Mula Misi Pembelajaran Sekarang!</span>
                            </button>
                        </div>
                    ) : (

                        /* REGISTRATION FORM VIEW */
                        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
                            {/* Error Alert Box */}
                            {registerError && (
                                <div className="bg-rose-50 border-2 border-rose-400 p-3.5 rounded-2xl text-rose-900 text-xs font-bold anim-shake flex items-center gap-2.5 shadow-xs">
                                    <span className="text-base shrink-0">⚠️</span>
                                    <span className="leading-snug">{registerError}</span>
                                </div>
                            )}

                            {/* 1. NAMA PENUH FIELD */}
                            <div>
                                <label
                                    htmlFor="reg-name"
                                    className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-sm">👤</span>
                                        <span>Nama Penuh</span>
                                        <span className="text-rose-500">*</span>
                                    </span>
                                    {formData.name.trim().length >= 3 && !errors.name && (
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                            ✓ Sah
                                        </span>
                                    )}
                                </label>
                                <div className="relative">
                                    <input
                                        id="reg-name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        onBlur={() => handleBlur("name")}
                                        placeholder="Contoh: Amirul Daniel"
                                        className={`w-full px-4 py-3 rounded-2xl border-2 text-sm font-bold placeholder:text-slate-400 placeholder:font-normal outline-none transition-all ${
                                            (touched.name || submitAttempted) && errors.name
                                                ? "border-rose-400 bg-rose-50/50 text-rose-950 focus:ring-2 focus:ring-rose-300"
                                                : formData.name.trim().length >= 3
                                                    ? "border-emerald-400 bg-emerald-50/30 text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                                    : "border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-slate-900"
                                        }`}
                                    />
                                </div>
                                {(touched.name || submitAttempted) && errors.name && (
                                    <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1 anim-fade-in">
                                        <span>⚠️</span>
                                        <span>{errors.name}</span>
                                    </p>
                                )}
                            </div>

                            {/* 2. NO. KAD PENGENALAN (IC) FIELD */}
                            <div>
                                <label
                                    htmlFor="reg-ic"
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
                                        id="reg-ic"
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

                                {/* IC Helper / Condition notes */}
                                <div className="mt-1 flex items-center justify-between text-[11px]">
                                    {(touched.ic || submitAttempted) && errors.ic ? (
                                        <p className="font-bold text-rose-600 flex items-center gap-1 anim-fade-in">
                                            <span>⚠️</span>
                                            <span>{errors.ic}</span>
                                        </p>
                                    ) : (
                                        <p className="text-slate-500 font-medium">
                                            Perlu <strong>12 nombor sahaja</strong> tanpa sempang &quot;-&quot;
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* 3. PASSWORD (KATA LALUAN) FIELD */}
                            <div>
                                <label
                                    htmlFor="reg-password"
                                    className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-sm">🔒</span>
                                        <span>Kata Laluan</span>
                                        <span className="text-rose-500">*</span>
                                    </span>
                                    {formData.password.length >= 6 && (
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                                            formData.password.length >= 8
                                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                                : "bg-amber-100 text-amber-800 border-amber-300"
                                        }`}>
                                            {formData.password.length >= 8 ? "Kuat" : "Sederhana"}
                                        </span>
                                    )}
                                </label>
                                <div className="relative">
                                    <input
                                        id="reg-password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handlePasswordChange}
                                        onBlur={() => handleBlur("password")}
                                        placeholder="Sekurang-kurangnya 6 aksara"
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

                            {/* 4. RE-ENTER PASSWORD (SAHKAN KATA LALUAN) FIELD */}
                            <div>
                                <label
                                    htmlFor="reg-confirm-password"
                                    className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-sm">🔑</span>
                                        <span>Re-enter Password</span>
                                        <span className="text-rose-500">*</span>
                                    </span>
                                    {formData.confirmPassword && !errors.confirmPassword && (
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                            ✓ Sepadan
                                        </span>
                                    )}
                                </label>
                                <div className="relative">
                                    <input
                                        id="reg-confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={() => handleBlur("confirmPassword")}
                                        placeholder="Masukkan semula kata laluan anda"
                                        className={`w-full px-4 py-3 pr-11 rounded-2xl border-2 text-sm font-bold placeholder:text-slate-400 placeholder:font-normal outline-none transition-all ${
                                            (touched.confirmPassword || submitAttempted) && errors.confirmPassword
                                                ? "border-rose-400 bg-rose-50/50 text-rose-950 focus:ring-2 focus:ring-rose-300"
                                                : formData.confirmPassword && !errors.confirmPassword
                                                    ? "border-emerald-400 bg-emerald-50/30 text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                                                    : "border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-slate-900"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer transition-colors"
                                        title={showConfirmPassword ? "Sembunyi Kata Laluan" : "Tunjuk Kata Laluan"}
                                    >
                                        {showConfirmPassword ? (
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
                                {(touched.confirmPassword || submitAttempted) && errors.confirmPassword && (
                                    <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1 anim-fade-in">
                                        <span>⚠️</span>
                                        <span>{errors.confirmPassword}</span>
                                    </p>
                                )}
                            </div>

                            {/* SUBMIT BUTTON */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 text-white font-black text-base sm:text-lg rounded-2xl cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                                        isSubmitting
                                            ? "bg-slate-400 cursor-not-allowed opacity-80"
                                            : "btn-3d-pink"
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Mendaftar Akaun...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>✨</span>
                                            <span>Daftar Akaun Penjelajah</span>
                                            <span>➔</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* DIVIDER & LOGIN LINK */}
                            <div className="relative my-3">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-3 text-slate-400 font-black tracking-wider">
                                        Sudah ada akaun?
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    playSound("tap");
                                    if (onNavigate) {
                                        onNavigate("login");
                                    } else {
                                        router.push("/login");
                                    }
                                }}
                                className="w-full py-3 btn-3d-white text-[#0088cc] hover:text-[#006699] font-black text-xs rounded-xl border border-sky-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
                            >
                                <span>🔑</span>
                                <span>Log Masuk Penjelajah Sedia Ada</span>
                                <span>➔</span>
                            </button>

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
                                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 font-black text-xs rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all mt-2"
                            >
                                <span>👤</span>
                                <span>Teruskan Sebagai Tetamu (Tanpa Daftar)</span>
                                <span>➔</span>
                            </button>

                            {/* Terms & Privacy Note */}
                            <p className="text-[11px] text-center text-slate-400 font-medium pt-1">
                                Dengan mendaftar, anda bersetuju menyertai komuniti pembelajaran STEM Exploria.
                            </p>
                        </form>
                    )}

                </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-4 text-center text-xs text-white/80 font-bold z-10">
                <span>Exploria STEM Learning Portal • Hak Cipta Terpelihara</span>
            </div>
        </div>
    );
}
