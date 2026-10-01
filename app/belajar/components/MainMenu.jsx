"use client";

import React from "react";
import {
    GraphicMascotRobot,
    GraphicArrowRight,
    GraphicScienceBook,
    GraphicBookOpen,
    GraphicQuizLightning,
    GraphicLightningBolt,
    GraphicGamepadActivity,
} from "./Graphics";

export default function MainMenu({
    onNavigate,
    t,
    playAudioFeedback,
    studentName = "Penjelajah",
    isLoggedIn = false,
    studentLevel = 1,
    studentXP = 100,
    studentStreak = 1,
    unlockedBadgesCount = 1
}) {
    return (
        <div className="space-y-6 w-full max-w-2xl anim-fade-in">



                                {/* Maskot Robot STEM Explorer & Speech Balloon */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-3xl border-2 border-sky-200 shadow-sm">
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div className="anim-float shrink-0">
                                            <GraphicMascotRobot className="w-16 h-16 sm:w-20 sm:h-20" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <span className="text-[10px] font-black uppercase text-[#0099e5] bg-sky-100 px-2 py-0.5 rounded-full">
                                                ExploBot STEM
                                            </span>
                                            <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1 leading-snug">
                                                &ldquo;{t(
                                                    "Hai Penjelajah Cilik! Terokai nota sains, kuiz pantas 20s, atau sertai Makmal Tumbuhan & Sistem Suria!",
                                                    "Hi Young Explorer! Explore science notes, 20s fast quiz, or join the Plant Lab & Solar System!"
                                                )}&rdquo;
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 w-full sm:w-auto flex items-center gap-2 justify-end">
                                        {!isLoggedIn ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => { playAudioFeedback("tap"); onNavigate("login"); }}
                                                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-gradient-to-r from-[#0088cc] to-[#0099e5] hover:from-[#0077b6] hover:to-[#0088cc] text-white rounded-2xl shadow-xs text-xs font-black cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                                                    title={t("Log Masuk Murid", "Student Login")}
                                                >
                                                    <span>🔑</span>
                                                    <span>{t("Log Masuk", "Login")}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { playAudioFeedback("sparkle"); onNavigate("profile"); }}
                                                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 rounded-2xl shadow-xs text-xs font-black cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                                                    title={t("Buka Profil", "Open Profile")}
                                                >
                                                    <span>👤</span>
                                                    <span>{t("Profil", "Profile")}</span>
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => { playAudioFeedback("sparkle"); onNavigate("profile"); }}
                                                className="w-full sm:w-auto px-3.5 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 rounded-2xl shadow-xs text-xs font-black cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                                                title={t("Buka Profil", "Open Profile")}
                                            >
                                                <span>👤</span>
                                                <span>{studentName || t("Profil", "Profile")}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>



                                {/* KAD AKSES PROFIL & PRESTASI PELAJAR */}

                                <div

                                    onClick={() => { playAudioFeedback("sparkle"); onNavigate("profile"); }}

                                    className="w-full bg-gradient-to-r from-[#0088cc] via-[#0099e5] to-indigo-600 rounded-3xl p-4 sm:p-5 text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer border-3 border-amber-300/80 relative overflow-hidden group text-left"

                                >

                                    <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                                    <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />



                                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                                        <div className="flex items-center gap-3.5">

                                            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-3xl shadow-inner shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-all">

                                                {isLoggedIn ? "🤖" : "👤"}

                                            </div>

                                            <div>

                                                <div className="flex items-center gap-2">

                                                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">

                                                        🌟 {isLoggedIn ? t("Profil Pelajar", "Student Profile") : t("Profil Penjelajah", "Explorer Profile")}

                                                    </span>

                                                    <span className="text-[10px] font-black text-white/90 bg-white/20 px-2 py-0.5 rounded-full">

                                                        {isLoggedIn ? `${t("Tahap", "Level")} ${studentLevel}` : t("Mod Tetamu", "Guest Mode")}

                                                    </span>

                                                </div>

                                                <h3 className="text-base sm:text-lg font-black text-white mt-1 drop-shadow-sm">

                                                    {isLoggedIn
                                                        ? `${t("Profil & Pencapaian ", "Profile & Achievements: ")}${studentName}`
                                                        : t("Profil & Rekod Pembelajaran", "Learning Profile & Records")
                                                    }

                                                </h3>

                                                <p className="text-[11px] sm:text-xs text-sky-100 font-medium mt-0.5">

                                                    {isLoggedIn
                                                        ? `${studentXP.toLocaleString()} XP • ${unlockedBadgesCount} Lencana • ${studentStreak} Hari Streak 🔥`
                                                        : t("Log masuk untuk simpan lencana, mata XP & rekod aktiviti anda ✨", "Log in to save badges, XP points & activity records ✨")
                                                    }

                                                </p>

                                            </div>

                                        </div>



                                        <div className="self-end sm:self-center shrink-0">

                                            <span className="px-4 py-2 bg-white text-[#0088cc] font-black text-xs rounded-xl shadow-md group-hover:bg-amber-400 group-hover:text-slate-950 transition-all flex items-center gap-1.5">

                                                <span>{isLoggedIn ? t("Buka Profil", "Open Profile") : t("Buka Profil Tetamu", "Open Guest Profile")}</span>

                                                <GraphicArrowRight className="w-3.5 h-3.5" />

                                            </span>

                                        </div>

                                    </div>

                                </div>



                                <div className="text-center space-y-1">

                                    <h2 className="text-2xl sm:text-3xl font-black text-[#0099e5]">

                                        {t("Pilih Mod Pengembaraan Anda!", "Choose Your Adventure Mode!")}

                                    </h2>

                                    <p className="text-slate-600 text-xs sm:text-sm">

                                        {t(

                                            "Pilih nota visual, uji minda pantas 20s, atau sertai permainan interaktif seronok.",

                                            "Choose visual notes, test your mind in 20s, or join fun interactive games."

                                        )}

                                    </p>

                                </div>



                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">

                                    {/* Button Mod 1: Pembelajaran */}

                                    <div

                                        onClick={() => { playAudioFeedback("tap"); onNavigate("learningList"); }}

                                        className="bg-gradient-to-b from-[#00acc1]/10 to-[#00acc1]/20 border-3 border-[#00acc1] hover:border-[#00838f] p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-98 group flex flex-col items-center justify-between text-center relative overflow-hidden"

                                    >

                                        <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-[#00acc1]/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">

                                            <GraphicScienceBook className="w-12 h-12" />

                                        </div>

                                        <span className="text-[9px] font-black uppercase tracking-wider text-[#00838f] bg-white/90 px-2.5 py-0.5 rounded-full mb-1 border border-[#00acc1]/30">

                                            {t("Mod Santai", "Relaxed Mode")}

                                        </span>

                                        <h3 className="text-lg font-black text-[#00838f]">{t("Pembelajaran", "Learning")}</h3>

                                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">

                                            {t("Tonton video & baca nota sains visual.", "Watch videos & read visual science notes.")}

                                        </p>

                                        <div className="mt-4 px-3.5 py-1.5 bg-[#00acc1] text-white text-[11px] font-black rounded-xl shadow-md group-hover:bg-[#00838f] transition-all flex items-center gap-1.5">

                                            <GraphicBookOpen className="w-3.5 h-3.5" />

                                            <span>{t("Mula Belajar", "Start Learning")}</span>

                                            <GraphicArrowRight className="w-3 h-3" />

                                        </div>

                                    </div>



                                    {/* Button Mod 2: Kuiz Topik */}

                                    <div

                                        onClick={() => { playAudioFeedback("tap"); onNavigate("quizList"); }}

                                        className="bg-gradient-to-b from-[#ffa726]/15 to-[#ffa726]/25 border-3 border-[#ffa726] hover:border-[#fb8c00] p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-98 group flex flex-col items-center justify-between text-center relative overflow-hidden"

                                    >

                                        <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-[#ffa726]/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm">

                                            <GraphicQuizLightning className="w-12 h-12" />

                                        </div>

                                        <span className="text-[9px] font-black uppercase tracking-wider text-[#e65100] bg-white/90 px-2.5 py-0.5 rounded-full mb-1 border border-[#ffa726]/30">

                                            {t("20s Per Soalan", "20s Per Question")}

                                        </span>

                                        <h3 className="text-lg font-black text-[#e65100]">{t("Kuiz Topik", "Topic Quiz")}</h3>

                                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">

                                            {t("Cabaran 5 soalan pantas menguji kefahaman!", "5 fast-paced questions to test your knowledge!")}

                                        </p>

                                        <div className="mt-4 px-3.5 py-1.5 bg-gradient-to-r from-[#ffa726] to-[#fb8c00] text-slate-950 text-[11px] font-black rounded-xl shadow-md group-hover:from-[#fb8c00] group-hover:to-[#f57c00] transition-all flex items-center gap-1.5">

                                            <GraphicLightningBolt className="w-3.5 h-3.5" />

                                            <span>{t("Pilih Kuiz", "Select Quiz")}</span>

                                            <GraphicArrowRight className="w-3 h-3" />

                                        </div>

                                    </div>



                                    {/* Button Mod 3: Aktiviti & Permainan (BARU!) */}

                                    <div

                                        onClick={() => { playAudioFeedback("tap"); onNavigate("activityList"); }}

                                        className="bg-gradient-to-b from-purple-500/15 to-purple-500/25 border-3 border-purple-500 hover:border-purple-600 p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-98 group flex flex-col items-center justify-between text-center relative overflow-hidden"

                                    >

                                        <div className="w-16 h-16 rounded-2xl bg-white/90 border-2 border-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">

                                            <GraphicGamepadActivity className="w-12 h-12" />

                                        </div>

                                        <span className="text-[9px] font-black uppercase tracking-wider text-purple-700 bg-white/90 px-2.5 py-0.5 rounded-full mb-1 border border-purple-300">

                                            Drag & Drop

                                        </span>

                                        <h3 className="text-lg font-black text-purple-700">{t("Aktiviti", "Activity")}</h3>

                                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">

                                            {t("Makmal Tumbuhan & Sistem Suria, kumpul skor tanpa timer!", "Plant Lab & Solar System, collect scores without timer!")}

                                        </p>

                                        <div className="mt-4 px-3.5 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[11px] font-black rounded-xl shadow-md group-hover:from-purple-600 group-hover:to-indigo-700 transition-all flex items-center gap-1.5">

                                            <span>🎮</span>

                                            <span>{t("Main Game", "Play Game")}</span>

                                            <GraphicArrowRight className="w-3 h-3" />

                                        </div>

                                    </div>

                                </div>

                            </div>
    );
}
