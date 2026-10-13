"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerStudentWithFirestore } from "../../lib/firestoreService";
import {
    MALAYSIA_STATES,
    getDistricts,
    getSchools,
} from "../../lib/malaysiaSchoolsData";

export default function RegisterPage({ onNavigate, onSuccess, onContinueAsGuest }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        ic: "",
        password: "",
        confirmPassword: "",
        schoolType: "SK", // "SK" | "SMK"
        state: "", // Langkah 1: Negeri
        district: "", // Langkah 2: Daerah
        schoolName: "", // Langkah 3: Nama Sekolah
        customSchoolName: "", // Manual input jika tiada dalam senarai
    });

    const [touched, setTouched] = useState({
        name: false,
        ic: false,
        password: false,
        confirmPassword: false,
        state: false,
        district: false,
        schoolName: false,
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

    // Senarai Daerah dan Sekolah Dinamik (Cascading)
    const availableDistricts = formData.state ? getDistricts(formData.state) : [];
    const availableSchools = (formData.state && formData.district)
        ? getSchools(formData.state, formData.district, formData.schoolType)
        : [];

    // Validation Functions
    const validateName = (name) => {
        if (!name.trim()) return "Nama penuh diperlukan.";
        if (name.trim().length < 3) return "Sekurang-kurangnya 3 huruf.";
        return "";
    };

    const validateIC = (ic) => {
        if (!ic) return "No. Kad Pengenalan diperlukan.";
        if (!/^\d+$/.test(ic)) return "Nombor sahaja.";
        if (ic.length !== 12) return `Perlu 12 digit (semasa: ${ic.length}/12).`;
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Kata laluan diperlukan.";
        if (password.length < 6) return "Sekurang-kurangnya 6 aksara.";
        return "";
    };

    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) return "Sahkan kata laluan.";
        if (confirmPassword !== password) return "Kata laluan tidak sepadan.";
        return "";
    };

    const validateState = (state) => {
        if (!state) return "Sila pilih negeri sekolah.";
        return "";
    };

    const validateDistrict = (district, state) => {
        if (!state) return "";
        if (!district) return "Sila pilih daerah sekolah.";
        return "";
    };

    const validateSchoolName = (schoolName, customSchoolName) => {
        if (!schoolName) return "Sila pilih nama sekolah.";
        if (schoolName === "LAIN_LAIN" && !customSchoolName.trim()) {
            return "Sila masukkan nama sekolah anda.";
        }
        return "";
    };

    const errors = {
        name: validateName(formData.name),
        ic: validateIC(formData.ic),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
        state: validateState(formData.state),
        district: validateDistrict(formData.district, formData.state),
        schoolName: validateSchoolName(formData.schoolName, formData.customSchoolName),
    };

    const isFormValid =
        !errors.name &&
        !errors.ic &&
        !errors.password &&
        !errors.confirmPassword &&
        !errors.state &&
        !errors.district &&
        !errors.schoolName;

    // Field Handlers
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

    // Cascading Handlers
    const handleSchoolTypeChange = (type) => {
        if (formData.schoolType === type) return;
        playSound("tap");
        setFormData(prev => ({
            ...prev,
            schoolType: type,
            schoolName: "",
            customSchoolName: "",
        }));
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        playSound("tap");
        setFormData(prev => ({
            ...prev,
            state: selectedState,
            district: "", // Reset daerah
            schoolName: "", // Reset sekolah
            customSchoolName: "",
        }));
        if (registerError) setRegisterError("");
    };

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        playSound("tap");
        setFormData(prev => ({
            ...prev,
            district: selectedDistrict,
            schoolName: "", // Reset sekolah
            customSchoolName: "",
        }));
        if (registerError) setRegisterError("");
    };

    const handleSchoolChange = (e) => {
        const selectedSchool = e.target.value;
        playSound("tap");
        setFormData(prev => ({
            ...prev,
            schoolName: selectedSchool,
            customSchoolName: selectedSchool === "LAIN_LAIN" ? prev.customSchoolName : "",
        }));
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
            confirmPassword: true,
            state: true,
            district: true,
            schoolName: true,
        });

        if (!isFormValid) {
            playSound("error");
            return;
        }

        setIsSubmitting(true);

        const finalSchool = formData.schoolName === "LAIN_LAIN"
            ? formData.customSchoolName.trim()
            : formData.schoolName;

        try {
            const result = await registerStudentWithFirestore({
                name: formData.name.trim(),
                ic: formData.ic.trim(),
                password: formData.password,
                schoolType: formData.schoolType,
                state: formData.state,
                district: formData.district,
                schoolName: finalSchool,
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

            const cleanIC = formData.ic.replace(/\D/g, "");
            const studentName = formData.name.trim();
            const schoolName = finalSchool;
            const schoolType = formData.schoolType;
            const studentId = result?.student?.studentId || `STU-${cleanIC.length >= 5 ? cleanIC.slice(-5) : cleanIC.padStart(5, "0")}`;

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
                    ...result?.student,
                }));
                if (schoolName) {
                    localStorage.setItem("exploria_student_school", schoolName);
                    localStorage.setItem("exploria_student_school_type", schoolType);
                }
                sessionStorage.removeItem("exploria_guest_mode");
            } catch {}

            if (onSuccess) {
                onSuccess({
                    name: studentName,
                    ic: cleanIC,
                    school: schoolName,
                    namaSekolah: schoolName,
                    jenisSekolah: schoolType,
                    daerah: formData.district,
                    negeri: formData.state,
                    ...result.student,
                }, true);
            }
        } catch (err) {
            console.error("Firestore register error:", err);
            playSound("error");
            setRegisterError("Ralat sambungan. Sila pastikan capaian internet anda stabil.");
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

    // Nama Paparan Sekolah Terpilih untuk Tag Pratonton
    const selectedSchoolPreview = formData.schoolName === "LAIN_LAIN"
        ? formData.customSchoolName.trim()
        : formData.schoolName;

    return (
        <div
            className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-x-hidden selection:bg-sky-200 select-none font-sans"
            style={{
                background: "#ffffff"
            }}
        >
            {/* Logo Exploria */}
            <div className="text-center mb-3 sm:mb-4 relative z-10">
                <img
                    src="/logoexploria.png"
                    alt="Logo Exploria STEM"
                    className="h-14 sm:h-20 mx-auto object-contain drop-shadow-md"
                />
            </div>

            {/* MAIN CARD CONTAINER */}
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border-2 border-slate-200 overflow-hidden relative z-10 text-left">

                {/* Card Header */}
                <div className="p-4 sm:p-6 text-white text-center bg-gradient-to-r from-[#0088cc] to-[#0099e5] shadow-xs">
                    <h1 className="text-xl sm:text-2xl font-black text-white">
                        Daftar Akaun Murid
                    </h1>
                    <p className="text-xs text-sky-100 font-medium mt-1">
                        Sila lengkapkan maklumat diri dan pilihan sekolah.
                    </p>
                </div>

                <div className="p-4 sm:p-6 bg-white">

                    {/* SUCCESS VIEW */}
                    {isSuccess ? (
                        <div className="text-center space-y-4 py-4">
                            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>

                            <div className="space-y-1.5">
                                <h2 className="text-xl font-black text-slate-900">
                                    Pendaftaran Berjaya!
                                </h2>
                                <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                                    Selamat datang, <strong className="text-slate-800">{formData.name.trim()}</strong>!
                                </p>
                                {selectedSchoolPreview && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mt-1">
                                        <span>{selectedSchoolPreview} ({formData.district})</span>
                                    </div>
                                )}
                            </div>

                            {/* PRIMARY BLUE BUTTON */}
                            <button
                                type="button"
                                onClick={handleProceedToLearning}
                                className="w-full py-3.5 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] active:scale-98 text-white font-black text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-sm transition-all"
                            >
                                <span>Mula Misi Pembelajaran</span>
                            </button>
                        </div>
                    ) : (

                        /* REGISTRATION FORM VIEW */
                        <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                            {/* Error Alert Box */}
                            {registerError && (
                                <div className="bg-rose-50 border border-rose-300 p-3 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <span>{registerError}</span>
                                </div>
                            )}

                            {/* BAHAGIAN 1: IDENTITI PELAJAR */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* 1. NAMA PENUH */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="reg-name"
                                        className="block text-xs font-bold text-slate-700 mb-1"
                                    >
                                        Nama Penuh Pelajar
                                    </label>
                                    <input
                                        id="reg-name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        onBlur={() => handleBlur("name")}
                                        placeholder="Contoh: Muhammad Adam"
                                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all placeholder:text-slate-400 ${
                                            (touched.name || submitAttempted) && errors.name
                                                ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                                : "border-slate-300 bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-900"
                                        }`}
                                    />
                                    {(touched.name || submitAttempted) && errors.name && (
                                        <p className="text-[11px] font-bold text-rose-600 mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* 2. NO. KAD PENGENALAN (IC) */}
                                <div className="sm:col-span-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <label
                                            htmlFor="reg-ic"
                                            className="block text-xs font-bold text-slate-700"
                                        >
                                            No. Kad Pengenalan
                                        </label>
                                        {formData.ic.length > 0 && (
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                                formData.ic.length === 12
                                                    ? "bg-emerald-50 text-emerald-700 font-mono"
                                                    : "bg-slate-100 text-slate-500 font-mono"
                                            }`}>
                                                {formData.ic.length}/12
                                            </span>
                                        )}
                                    </div>
                                    <input
                                        id="reg-ic"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={12}
                                        value={formData.ic}
                                        onChange={handleICChange}
                                        onBlur={() => handleBlur("ic")}
                                        placeholder="12 digit tanpa tanda sempang (-)"
                                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono font-medium outline-none transition-all placeholder:font-sans placeholder:text-slate-400 ${
                                            (touched.ic || submitAttempted) && errors.ic
                                                ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                                : "border-slate-300 bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-900"
                                        }`}
                                    />
                                    {(touched.ic || submitAttempted) && errors.ic && (
                                        <p className="text-[11px] font-bold text-rose-600 mt-1">
                                            {errors.ic}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* =========================================================
                                BAHAGIAN 2: MAKLUMAT SEKOLAH (CASCADING DROPDOWNS)
                                ========================================================= */}
                            <div className="bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 space-y-3">
                                <div className="border-b border-slate-200/80 pb-2">
                                    <span className="text-xs font-black text-slate-800">
                                        Pilihan Sekolah Pelajar
                                    </span>
                                </div>

                                {/* 1. Pilihan Jenis Sekolah: Sek. Keb. vs Sek. Men. Keb. (Checkbox Style) */}
                                <div>
                                    <span className="block text-[11px] font-bold text-slate-700 mb-1.5">
                                        Jenis Sekolah:
                                    </span>
                                    <div className="flex items-center gap-6 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-xs">
                                        <label className="flex items-center gap-2 cursor-pointer select-none group">
                                            <input
                                                type="checkbox"
                                                name="schoolTypeSK"
                                                checked={formData.schoolType === "SK"}
                                                onChange={() => handleSchoolTypeChange("SK")}
                                                className="w-4 h-4 rounded border-slate-300 text-[#0099e5] accent-[#0099e5] focus:ring-sky-400 cursor-pointer"
                                            />
                                            <span className={`text-xs transition-colors ${
                                                formData.schoolType === "SK"
                                                    ? "font-black text-[#0088cc]"
                                                    : "font-bold text-slate-600 group-hover:text-slate-800"
                                            }`}>
                                                Sek. Keb.
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer select-none group">
                                            <input
                                                type="checkbox"
                                                name="schoolTypeSMK"
                                                checked={formData.schoolType === "SMK"}
                                                onChange={() => handleSchoolTypeChange("SMK")}
                                                className="w-4 h-4 rounded border-slate-300 text-[#0099e5] accent-[#0099e5] focus:ring-sky-400 cursor-pointer"
                                            />
                                            <span className={`text-xs transition-colors ${
                                                formData.schoolType === "SMK"
                                                    ? "font-black text-[#0088cc]"
                                                    : "font-bold text-slate-600 group-hover:text-slate-800"
                                            }`}>
                                                Sek. Men. Keb.
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* 2. Sistem Dropdown Bertahap: Langkah 1 (Negeri) & Langkah 2 (Daerah) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {/* Langkah 1: Pilih Negeri */}
                                    <div>
                                        <label htmlFor="reg-state" className="block text-[11px] font-bold text-slate-700 mb-1">
                                            1. Pilih Negeri
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="reg-state"
                                                value={formData.state}
                                                onChange={handleStateChange}
                                                onBlur={() => handleBlur("state")}
                                                className={`w-full min-h-[44px] px-3 py-2 rounded-xl border text-xs font-bold outline-none transition-all bg-white appearance-none pr-8 cursor-pointer ${
                                                    (touched.state || submitAttempted) && errors.state
                                                        ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                                        : "border-slate-300 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-800"
                                                }`}
                                            >
                                                <option value="">-- Pilih Negeri --</option>
                                                {MALAYSIA_STATES.map((st) => (
                                                    <option key={st} value={st}>
                                                        {st}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                        {(touched.state || submitAttempted) && errors.state && (
                                            <p className="text-[11px] font-bold text-rose-600 mt-1">{errors.state}</p>
                                        )}
                                    </div>

                                    {/* Langkah 2: Pilih Daerah */}
                                    <div>
                                        <label htmlFor="reg-district" className="block text-[11px] font-bold text-slate-700 mb-1">
                                            2. Pilih Daerah
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="reg-district"
                                                value={formData.district}
                                                onChange={handleDistrictChange}
                                                onBlur={() => handleBlur("district")}
                                                disabled={!formData.state}
                                                className={`w-full min-h-[44px] px-3 py-2 rounded-xl border text-xs font-bold outline-none transition-all appearance-none pr-8 cursor-pointer ${
                                                    !formData.state
                                                        ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                                                        : (touched.district || submitAttempted) && errors.district
                                                        ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                                        : "bg-white border-slate-300 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-800"
                                                }`}
                                            >
                                                <option value="">
                                                    {!formData.state ? "-- Pilih negeri dahulu --" : "-- Pilih Daerah --"}
                                                </option>
                                                {availableDistricts.map((dst) => (
                                                    <option key={dst} value={dst}>
                                                        {dst}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                        {(touched.district || submitAttempted) && errors.district && (
                                            <p className="text-[11px] font-bold text-rose-600 mt-1">{errors.district}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Langkah 3: Pilih Nama Sekolah */}
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label htmlFor="reg-school" className="block text-[11px] font-bold text-slate-700">
                                            3. Pilih Nama Sekolah ({formData.schoolType === "SK" ? "Sek. Keb." : "Sek. Men. Keb."})
                                        </label>
                                        {formData.district && (
                                            <span className="text-[10px] text-slate-400 font-bold">
                                                {availableSchools.length} pilihan
                                            </span>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <select
                                            id="reg-school"
                                            value={formData.schoolName}
                                            onChange={handleSchoolChange}
                                            onBlur={() => handleBlur("schoolName")}
                                            disabled={!formData.district}
                                            className={`w-full min-h-[44px] px-3 py-2 rounded-xl border text-xs font-bold outline-none transition-all appearance-none pr-8 cursor-pointer ${
                                                !formData.district
                                                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                                                    : (touched.schoolName || submitAttempted) && errors.schoolName
                                                    ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                                    : "bg-white border-slate-300 focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-800"
                                            }`}
                                        >
                                            <option value="">
                                                {!formData.district
                                                    ? "-- Pilih daerah dahulu --"
                                                    : `-- Pilih Nama ${formData.schoolType === "SK" ? "Sek. Keb." : "Sek. Men. Keb."} --`}
                                            </option>
                                            {availableSchools.map((sch) => (
                                                <option key={sch} value={sch}>
                                                    {sch}
                                                </option>
                                            ))}
                                            {formData.district && (
                                                <option value="LAIN_LAIN">
                                                    Lain-lain (Nama Sekolah Tiada Dalam Senarai)
                                                </option>
                                            )}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </div>
                                    </div>
                                    {(touched.schoolName || submitAttempted) && errors.schoolName && (
                                        <p className="text-[11px] font-bold text-rose-600 mt-1">{errors.schoolName}</p>
                                    )}

                                    {/* Input Manual Jika Memilih 'Lain-lain' */}
                                    {formData.schoolName === "LAIN_LAIN" && (
                                        <div className="mt-2">
                                            <label className="block text-[10px] font-bold text-sky-800 mb-1">
                                                Nama Sekolah Anda:
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.customSchoolName}
                                                onChange={(e) => setFormData(prev => ({ ...prev, customSchoolName: e.target.value }))}
                                                placeholder={`Contoh: ${formData.schoolType === "SK" ? "SK Seri Mutiara" : "SMK Seri Mutiara"}`}
                                                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-sky-300 bg-white text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-200 placeholder:text-slate-400"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* BAHAGIAN 3: KESELAMATAN KATA LALUAN */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* 3. KATA LALUAN */}
                                <div>
                                    <label
                                        htmlFor="reg-password"
                                        className="block text-xs font-bold text-slate-700 mb-1"
                                    >
                                        Kata Laluan
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="reg-password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handlePasswordChange}
                                            onBlur={() => handleBlur("password")}
                                            placeholder="Min. 6 aksara"
                                            className={`w-full min-h-[44px] px-3.5 py-2.5 pr-10 rounded-xl border text-sm font-medium outline-none transition-all placeholder:text-slate-400 ${
                                                (touched.password || submitAttempted) && errors.password
                                                    ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                                    : "border-slate-300 bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-900"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                            title={showPassword ? "Sembunyikan" : "Tunjukkan"}
                                        >
                                            {showPassword ? (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {(touched.password || submitAttempted) && errors.password && (
                                        <p className="text-[11px] font-bold text-rose-600 mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* 4. SAHKAN KATA LALUAN */}
                                <div>
                                    <label
                                        htmlFor="reg-confirm-password"
                                        className="block text-xs font-bold text-slate-700 mb-1"
                                    >
                                        Sahkan Kata Laluan
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="reg-confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            onBlur={() => handleBlur("confirmPassword")}
                                            placeholder="Ulang kata laluan"
                                            className={`w-full min-h-[44px] px-3.5 py-2.5 pr-10 rounded-xl border text-sm font-medium outline-none transition-all placeholder:text-slate-400 ${
                                                (touched.confirmPassword || submitAttempted) && errors.confirmPassword
                                                    ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200"
                                                    : "border-slate-300 bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 text-slate-900"
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                            title={showConfirmPassword ? "Sembunyikan" : "Tunjukkan"}
                                        >
                                            {showConfirmPassword ? (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {(touched.confirmPassword || submitAttempted) && errors.confirmPassword && (
                                        <p className="text-[11px] font-bold text-rose-600 mt-1">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* BUTTON 1: PRIMARY BLUE */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full min-h-[46px] py-3.5 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] text-white font-black text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 ${
                                        isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <span>Mendaftar Murid & Sekolah...</span>
                                    ) : (
                                        <>
                                            <span>Daftar Akaun Pelajar</span>
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* BUTTON 2: SECONDARY WHITE */}
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
                                className="w-full min-h-[44px] py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-slate-200 transition-all active:scale-98"
                            >
                                <span>Sudah ada akaun? Log Masuk</span>
                            </button>

                            {/* GUEST MODE & PARENT PORTAL LINK */}
                            <div className="text-center pt-1 space-y-2">
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
                                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline cursor-pointer block mx-auto py-1"
                                >
                                    Teruskan Sebagai Tetamu
                                </button>
                                <div className="pt-2 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            playSound("tap");
                                            router.push("/ibu-bapa?mode=register");
                                        }}
                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer inline-flex items-center gap-1 py-1"
                                    >
                                        <span>Ibu bapa atau penjaga? Daftar di Portal Ibu Bapa</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
