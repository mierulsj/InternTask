"use client";

import React, { useState, useEffect } from "react";
import { GraphicBackArrow } from "./Graphics";
import ProfileAvatarFrame from "./ProfileAvatarFrame";
import {
    VectorAvatarAstro,
    VectorAvatarScientist,
    VectorAvatarCyber,
    VectorAvatarDino,
    VectorAvatarRobot,
    VectorAvatarCommander,
    VectorAvatarGuest,
} from "./GameIcons";
import { getLeaderboardData } from "../../../lib/firestoreService";

// Helper untuk memilih ikon avatar berdasarkan avatarId
function renderStudentAvatar(avatarId = "avatar_astro_1", borderId = null, size = "md") {
    return (
        <ProfileAvatarFrame
            avatar={avatarId || "avatar_astro_1"}
            borderId={borderId || null}
            size={size}
        />
    );
}

export default function LeaderboardView({
    onNavigate,
    t = (bm, en) => bm,
    playAudioFeedback,
    isLoggedIn = false,
    studentName = "Penjelajah",
    studentIC = "",
    studentXP = 100,
}) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterTab, setFilterTab] = useState("all"); // "all" | "weekly"

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const res = await getLeaderboardData();
            if (res.success && Array.isArray(res.students)) {
                setStudents(res.students);
            }
        } catch (e) {
            console.error("Ralat membaca leaderboard:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const handleAction = (sound, cb) => {
        try {
            if (playAudioFeedback) playAudioFeedback(sound);
        } catch (e) {}
        if (cb) cb();
    };

    // Pisahkan Top 3 (Podium) dan Rank 4 ke bawah
    const top1 = students[0] || null;
    const top2 = students[1] || null;
    const top3 = students[2] || null;
    const restStudents = students.slice(3);

    // Cari kedudukan pengguna semasa
    const userRankIndex = students.findIndex(
        (s) =>
            (studentIC && s.ic === studentIC) ||
            (studentName && s.name.toLowerCase() === studentName.toLowerCase())
    );
    const userRank = userRankIndex !== -1 ? userRankIndex + 1 : null;

    return (
        <div className="w-full max-w-sm sm:max-w-md mx-auto anim-fade-in select-none text-left pb-16">

            {/* 1. HEADER ATAS DENGAN BUTANG KEMBALI & TAJUK LEADERBOARD */}
            <div className="px-1 pt-1 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => handleAction("tap", () => onNavigate && onNavigate("menu"))}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all group"
                        title={t("Kembali", "Back")}
                    >
                        <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                        <span>{t("Kembali", "Back")}</span>
                    </button>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#0099e5] tracking-tight">
                            Leaderboard
                        </h2>
                        <p className="text-xs text-slate-400 font-semibold">
                            {t("Papan Juara Sains STEM KSSR", "STEM Science Champions")}
                        </p>
                    </div>
                </div>

                {/* Butang Refresh Live Data dari Firebase */}
                <button
                    type="button"
                    onClick={() => handleAction("tap", fetchLeaderboard)}
                    disabled={loading}
                    className="w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 text-[#0099e5] border border-sky-200/80 flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all"
                    title={t("Muat semula data", "Refresh data")}
                >
                    <svg
                        className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                        <path d="M16 21h5v-5" />
                    </svg>
                </button>
            </div>

            {/* 2. TAB PENAPIS (FILTER PILLS: KESELURUHAN & MINGGUAN) */}
            <div className="flex items-center gap-2 mb-4 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
                <button
                    type="button"
                    onClick={() => handleAction("tap", () => setFilterTab("all"))}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                        filterTab === "all"
                            ? "bg-white text-blue-900 shadow-xs border border-slate-200/60"
                            : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                    {t("Keseluruhan", "All Time")}
                </button>
                <button
                    type="button"
                    onClick={() => handleAction("tap", () => setFilterTab("weekly"))}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                        filterTab === "weekly"
                            ? "bg-white text-blue-900 shadow-xs border border-slate-200/60"
                            : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                    {t("Mingguan", "Weekly")}
                </button>
            </div>

            {/* 3. PODIUM 3D UNTUK TOP 3 (PERSIS REKA BENTUK SKRIN 3 RUJUKAN) */}
            <div className="relative rounded-[2.2rem] pt-6 pb-4 px-3 mb-5 overflow-hidden shadow-md"
                style={{
                    background: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 55%, #4f46e5 80%, #7c3aed 100%)"
                }}
            >
                {/* Latar Belakang Gelombang/Cahaya Halus */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 left-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-3.5 pt-4">

                    {/* =====================
                        RANK 2 (KIRI / PERAK)
                       ===================== */}
                    <div className="flex-1 flex flex-col items-center">
                        {/* Avatar & Lencana #2 */}
                        <div className="relative mb-2">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                                {top2 ? (
                                    renderStudentAvatar(top2.avatarId, top2.borderId, "sm")
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/50 text-xs">
                                        -
                                    </div>
                                )}
                            </div>
                            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-300 border-2 border-white text-slate-800 font-black text-[11px] flex items-center justify-center shadow-md">
                                2
                            </span>
                        </div>

                        {/* Nama & Mata */}
                        <div className="text-center w-full px-1 mb-2">
                            <span className="font-black text-xs sm:text-sm text-white block truncate leading-tight drop-shadow-xs">
                                {top2 ? top2.name : "-"}
                            </span>
                            <span className="font-bold text-[11px] text-sky-200 block">
                                {top2 ? `${top2.xp.toLocaleString()} pts` : "-"}
                            </span>
                        </div>

                        {/* Kolum Blok Podium 3D (Perak) */}
                        <div className="w-full h-24 sm:h-28 rounded-t-2xl relative shadow-lg overflow-hidden flex flex-col items-center justify-start pt-2 border-t-2 border-slate-200/80"
                            style={{
                                background: "linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%)"
                            }}
                        >
                            {/* Muka Atas 3D */}
                            <div className="absolute top-0 left-0 right-0 h-2.5 bg-slate-200/90" />
                            <span className="text-2xl sm:text-3xl font-black text-white/90 drop-shadow-sm mt-3">
                                2
                            </span>
                        </div>
                    </div>

                    {/* =====================
                        RANK 1 (TENGAH / EMAS - PALING TINGGI)
                       ===================== */}
                    <div className="flex-1 flex flex-col items-center -mt-6 z-10">
                        {/* Mahkota / Avatar & Lencana Emas #1 */}
                        <div className="relative mb-2">
                            {/* Ikon Mahkota Emas */}
                            <div className="flex justify-center -mb-1">
                                <svg className="w-6 h-6 text-amber-300 drop-shadow-md animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                                </svg>
                            </div>

                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                                {top1 ? (
                                    renderStudentAvatar(top1.avatarId, top1.borderId || "border_mythic_immortal", "md")
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/50 text-xs">
                                        -
                                    </div>
                                )}
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-white text-slate-950 font-black text-xs flex items-center justify-center shadow-lg">
                                1
                            </span>
                        </div>

                        {/* Nama & Mata */}
                        <div className="text-center w-full px-1 mb-2">
                            <span className="font-black text-sm sm:text-base text-white block truncate leading-tight drop-shadow-sm">
                                {top1 ? top1.name : "-"}
                            </span>
                            <span className="font-black text-xs sm:text-sm text-amber-300 block drop-shadow-xs">
                                {top1 ? `${top1.xp.toLocaleString()} pts` : "-"}
                            </span>
                        </div>

                        {/* Kolum Blok Podium 3D (Emas Paling Tinggi) */}
                        <div className="w-full h-32 sm:h-36 rounded-t-2xl relative shadow-2xl overflow-hidden flex flex-col items-center justify-start pt-2 border-t-2 border-yellow-200"
                            style={{
                                background: "linear-gradient(180deg, #f59e0b 0%, #ea580c 60%, #c2410c 100%)"
                            }}
                        >
                            {/* Muka Atas 3D Berkilau */}
                            <div className="absolute top-0 left-0 right-0 h-3 bg-yellow-300" />
                            <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-md mt-4">
                                1
                            </span>
                        </div>
                    </div>

                    {/* =====================
                        RANK 3 (KANAN / GANGSA)
                       ===================== */}
                    <div className="flex-1 flex flex-col items-center">
                        {/* Avatar & Lencana #3 */}
                        <div className="relative mb-2">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                                {top3 ? (
                                    renderStudentAvatar(top3.avatarId, top3.borderId, "sm")
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/50 text-xs">
                                        -
                                    </div>
                                )}
                            </div>
                            <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-700 border-2 border-white text-white font-black text-[11px] flex items-center justify-center shadow-md">
                                3
                            </span>
                        </div>

                        {/* Nama & Mata */}
                        <div className="text-center w-full px-1 mb-2">
                            <span className="font-black text-xs sm:text-sm text-white block truncate leading-tight drop-shadow-xs">
                                {top3 ? top3.name : "-"}
                            </span>
                            <span className="font-bold text-[11px] text-amber-200 block">
                                {top3 ? `${top3.xp.toLocaleString()} pts` : "-"}
                            </span>
                        </div>

                        {/* Kolum Blok Podium 3D (Gangsa) */}
                        <div className="w-full h-20 sm:h-24 rounded-t-2xl relative shadow-lg overflow-hidden flex flex-col items-center justify-start pt-2 border-t-2 border-amber-500/80"
                            style={{
                                background: "linear-gradient(180deg, #d97706 0%, #b45309 60%, #92400e 100%)"
                            }}
                        >
                            {/* Muka Atas 3D */}
                            <div className="absolute top-0 left-0 right-0 h-2.5 bg-amber-300" />
                            <span className="text-2xl sm:text-3xl font-black text-white/90 drop-shadow-sm mt-2">
                                3
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. SENARAI KAD PELAJAR RANK 4 KE ATAS (GAYA SKRIN 3 RUJUKAN) */}
            <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1 mb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                        {t("Kedudukan Murid", "Student Standings")}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                        {students.length} {t("Peserta", "Participants")}
                    </span>
                </div>

                {loading ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                        <div className="w-8 h-8 mx-auto border-3 border-[#0099e5] border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs font-bold text-slate-500">
                            {t("Menyambung ke data Firestore...", "Loading Firestore data...")}
                        </p>
                    </div>
                ) : (
                    restStudents.map((student) => {
                        const isCurrentUser =
                            (studentIC && student.ic === studentIC) ||
                            (studentName && student.name.toLowerCase() === studentName.toLowerCase());

                        return (
                            <div
                                key={student.id || `rank-${student.rank}`}
                                className={`rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-xs transition-all duration-200 border ${
                                    isCurrentUser
                                        ? "bg-sky-50/80 border-[#0099e5] ring-2 ring-[#0099e5]/30 shadow-md"
                                        : "bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200"
                                }`}
                            >
                                {/* Kiri: Avatar & Maklumat Murid */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                                        {renderStudentAvatar(student.avatarId, student.borderId, "sm")}
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <h4 className="font-black text-slate-900 text-xs sm:text-sm truncate">
                                                {student.name}
                                            </h4>
                                            {isCurrentUser && (
                                                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-[#0099e5] text-white shrink-0">
                                                    {t("Anda", "You")}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-semibold truncate mt-0.5">
                                            <span className="font-black text-[#0099e5] font-mono">
                                                {student.xp.toLocaleString()} {t("mata", "pts")}
                                            </span>
                                            {student.school && student.school !== "-" && (
                                                <span className="text-slate-400"> • {student.school}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Kanan: Nombor Rank & Penunjuk Trend (▲ / ▼ / —) */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/70">
                                        <span className="font-black text-xs sm:text-sm text-slate-700 font-mono">
                                            {student.rank}
                                        </span>
                                        {/* Trend Panah: Hijau naik, Merah turun, Kelabu sama */}
                                        {student.trend === "up" && (
                                            <span className="text-emerald-500 text-[10px] leading-none" title="Menaik">
                                                ▲
                                            </span>
                                        )}
                                        {student.trend === "down" && (
                                            <span className="text-rose-500 text-[10px] leading-none" title="Menurun">
                                                ▼
                                            </span>
                                        )}
                                        {student.trend === "same" && (
                                            <span className="text-slate-400 text-xs leading-none" title="Kekal">
                                                •
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* 5. KAD KEDUDUKAN PENGGUNA TERAPUNG (STICKY USER POSITION) */}
            {isLoggedIn && userRank && userRank > 3 && (
                <div className="fixed bottom-18 left-3 right-3 max-w-sm sm:max-w-md mx-auto bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl border border-sky-400/40 shadow-xl flex items-center justify-between gap-3 z-30">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                            #{userRank}
                        </div>
                        <div className="min-w-0">
                            <span className="font-black text-xs text-white block truncate leading-tight">
                                {t("Kedudukan Anda", "Your Rank")} • {studentName}
                            </span>
                            <span className="text-[10px] text-sky-200 font-mono font-bold">
                                {studentXP.toLocaleString()} XP
                            </span>
                        </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-1 rounded-lg bg-sky-500 text-white shrink-0 shadow-xs">
                        {t("Tahap", "Level")} {Math.floor(studentXP / 200) + 1}
                    </span>
                </div>
            )}

        </div>
    );
}
