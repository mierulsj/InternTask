"use client";

import React from "react";
import { GraphicMascotRobot, GraphicArrowRight } from "./Graphics";

export default function AuthGatewayView({
    onNavigate,
    onContinueAsGuest,
    t,
    playAudioFeedback,
}) {
    const handleAction = (sound, callback) => {
        if (playAudioFeedback) playAudioFeedback(sound);
        if (callback) callback();
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 px-2 sm:px-4 anim-fade-in text-center space-y-6">
            {/* 1. HEADER & ROBOT MASCOT GREETING */}
            <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 rounded-3xl p-5 sm:p-7 border-2 border-sky-200/90 shadow-md relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-sky-400 to-indigo-500 p-1 shadow-lg anim-float shrink-0">
                        <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center text-4xl border-2 border-white/40">
                            <GraphicMascotRobot className="w-14 h-14 sm:w-16 sm:h-16" />
                        </div>
                    </div>

                    <div className="space-y-1 max-w-lg">
                        <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-xs inline-block">
                            🌟 {t ? t("Portal Pembelajaran STEM", "STEM Learning Portal") : "Portal Pembelajaran STEM"}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                            {t ? t("Pilih Cara Anda Meneroka!", "Choose How You Explore!") : "Pilih Cara Anda Meneroka!"}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium">
                            {t
                                ? t(
                                      "Selamat datang ke Exploria! Sila pilih salah satu daripada 3 cara di bawah untuk memulakan pengembaraan sains anda.",
                                      "Welcome to Exploria! Please choose one of the 3 options below to begin your science journey."
                                  )
                                : "Selamat datang ke Exploria! Sila pilih salah satu daripada 3 cara di bawah untuk memulakan pengembaraan sains anda."}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. THE 3 INTERACTIVE OPTIONS (CARDS GRID) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-left">
                {/* PILIHAN 1: LOG MASUK */}
                <div
                    onClick={() => handleAction("tap", () => onNavigate && onNavigate("login"))}
                    className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-sky-300 hover:border-sky-500 shadow-md hover:shadow-2xl hover:-translate-y-1.5 active:scale-98 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group"
                >
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-sky-100 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                    <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full border border-sky-200">
                                {t ? t("Akaun Sedia Ada", "Existing Account") : "Akaun Sedia Ada"}
                            </span>
                            <span className="text-2xl">🔑</span>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0088cc] to-sky-400 text-white flex items-center justify-center text-2xl shadow-md mb-3 group-hover:rotate-6 transition-transform">
                            🚀
                        </div>

                        <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0088cc] transition-colors">
                            {t ? t("1. Log Masuk", "1. Log In") : "1. Log Masuk"}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                            {t
                                ? t(
                                      "Masukkan No. IC dan kata laluan untuk sambung rekod kuiz, streak dan lencana terkumpul anda.",
                                      "Enter your IC number and password to resume your quiz records, streak and collected badges."
                                  )
                                : "Masukkan No. IC dan kata laluan untuk sambung rekod kuiz, streak dan lencana terkumpul anda."}
                        </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            className="w-full py-2.5 bg-gradient-to-r from-[#0088cc] to-[#0099e5] group-hover:from-[#0077b6] group-hover:to-[#0088cc] text-white font-black text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                        >
                            <span>{t ? t("Log Masuk Sekarang", "Log In Now") : "Log Masuk Sekarang"}</span>
                            <GraphicArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* PILIHAN 2: DAFTAR AKAUN (HIGHLIGHTED / RECOMMENDED) */}
                <div
                    onClick={() => handleAction("sparkle", () => onNavigate && onNavigate("register"))}
                    className="bg-gradient-to-b from-white via-amber-50/30 to-orange-50/40 rounded-3xl p-5 sm:p-6 border-3 border-amber-400 hover:border-amber-500 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 active:scale-98 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ring-3 ring-amber-300/40"
                >
                    {/* Pulsing Recommended Pill */}
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-orange-400 text-slate-950 font-black text-[9px] uppercase px-3 py-1 rounded-bl-xl shadow-xs">
                        ⭐ {t ? t("Disyorkan • Bonus 100 XP", "Recommended • 100 XP") : "Disyorkan • Bonus 100 XP"}
                    </div>

                    <div>
                        <div className="flex items-center justify-between gap-2 mb-3 mt-1">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                                {t ? t("Murid Baharu", "New Student") : "Murid Baharu"}
                            </span>
                            <span className="text-2xl">✨</span>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 text-slate-950 flex items-center justify-center text-2xl shadow-md mb-3 group-hover:rotate-6 transition-transform">
                            📝
                        </div>

                        <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                            {t ? t("2. Daftar Murid", "2. Register Student") : "2. Daftar Murid"}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                            {t
                                ? t(
                                      "Cipta akaun percuma dalam 30 saat! Rekod pembelajaran dan nama anda akan disimpan secara kekal dalam Firestore.",
                                      "Create a free account in 30 seconds! Your learning records and name will be permanently saved in Firestore."
                                  )
                                : "Cipta akaun percuma dalam 30 saat! Rekod pembelajaran dan nama anda akan disimpan secara kekal dalam Firestore."}
                        </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-amber-100">
                        <button
                            type="button"
                            className="w-full py-2.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                        >
                            <span>{t ? t("Daftar Percuma", "Register Free") : "Daftar Percuma"}</span>
                            <GraphicArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* PILIHAN 3: TERUSKAN SEBAGAI TETAMU */}
                <div
                    onClick={() => {
                        handleAction("tap", () => {
                            if (onContinueAsGuest) onContinueAsGuest();
                            if (onNavigate) onNavigate("menu");
                        });
                    }}
                    className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-slate-300 hover:border-slate-400 shadow-md hover:shadow-2xl hover:-translate-y-1.5 active:scale-98 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group"
                >
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-slate-100 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                    <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200">
                                {t ? t("Cuba Dahulu", "Try First") : "Cuba Dahulu"}
                            </span>
                            <span className="text-2xl">👤</span>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-600 to-indigo-700 text-white flex items-center justify-center text-2xl shadow-md mb-3 group-hover:rotate-6 transition-transform">
                            🪐
                        </div>

                        <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {t ? t("3. Teruskan Sebagai Tetamu", "3. Continue as Guest") : "3. Teruskan Sebagai Tetamu"}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                            {t
                                ? t(
                                      "Mula teroka nota sains, jawab kuiz dan main simulasi suria secara terus tanpa perlu memasukkan No. IC atau kata laluan.",
                                      "Explore science notes, quizzes and solar simulations right away without needing IC or password."
                                  )
                                : "Mula teroka nota sains, jawab kuiz dan main simulasi suria secara terus tanpa perlu memasukkan No. IC atau kata laluan."}
                        </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                            <span>{t ? t("Mula Teroka (Tetamu)", "Start as Guest") : "Mula Teroka (Tetamu)"}</span>
                            <GraphicArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. FOOTER GUARANTEE PILLS */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap pt-2 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                    <span>🛡️</span>
                    <span>{t ? t("Pangkalan Data Selamat Firestore", "Secure Firestore Database") : "Pangkalan Data Selamat Firestore"}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                    <span>🌟</span>
                    <span>{t ? t("100% Percuma Untuk Murid", "100% Free For Students") : "100% Percuma Untuk Murid"}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                    <span>🪐</span>
                    <span>{t ? t("Kurikulum Sains KSSR", "KSSR Science Curriculum") : "Kurikulum Sains KSSR"}</span>
                </span>
            </div>
        </div>
    );
}
