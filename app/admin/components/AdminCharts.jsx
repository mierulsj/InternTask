"use client";

import React, { useMemo } from "react";

export default function AdminCharts({ studentsList = [] }) {
    // Pengiraan data statistik & papan pendahulu
    const { modules, topStudents, totalStudents, activeRate, avgXP, highestAvg } = useMemo(() => {
        const count = studentsList.length;

        if (count === 0) {
            return {
                modules: [
                    { id: "sifir", name: "Cabaran Sifir", icon: "⚡", avg: 0, color: "from-indigo-500 to-indigo-600" },
                    { id: "spelling", name: "Spelling Bee", icon: "🐝", avg: 0, color: "from-amber-500 to-amber-600" },
                    { id: "plant", name: "Bahagian Tumbuhan", icon: "🌿", avg: 0, color: "from-emerald-500 to-emerald-600" },
                    { id: "solar", name: "Sistem Suria", icon: "🪐", avg: 0, color: "from-sky-500 to-sky-600" },
                    { id: "quiz", name: "Kuiz Sains 20s", icon: "🧪", avg: 0, color: "from-purple-500 to-purple-600" },
                ],
                topStudents: [],
                totalStudents: 0,
                activeRate: 0,
                avgXP: 0,
                highestAvg: 100,
            };
        }

        const sumMath = studentsList.reduce((acc, s) => acc + (Number(s.mathScore) || 0), 0);
        const sumSpelling = studentsList.reduce((acc, s) => acc + (Number(s.spellingScore) || 0), 0);
        const sumPlant = studentsList.reduce((acc, s) => acc + (Number(s.plantScore) || 0), 0);
        const sumSolar = studentsList.reduce((acc, s) => acc + (Number(s.solarScore) || 0), 0);
        const sumQuiz = studentsList.reduce((acc, s) => acc + (Number(s.quizScore) || 0), 0);
        const sumXP = studentsList.reduce((acc, s) => acc + (Number(s.xp) || 0), 0);

        const activeCount = studentsList.filter((s) => s.status === "Aktif" || (Number(s.xp) || 0) > 0).length;

        const modStats = [
            { id: "sifir", name: "Cabaran Sifir", icon: "⚡", avg: Math.round(sumMath / count), color: "from-indigo-500 to-indigo-600" },
            { id: "spelling", name: "Spelling Bee", icon: "🐝", avg: Math.round(sumSpelling / count), color: "from-amber-500 to-amber-600" },
            { id: "plant", name: "Bahagian Tumbuhan", icon: "🌿", avg: Math.round(sumPlant / count), color: "from-emerald-500 to-emerald-600" },
            { id: "solar", name: "Sistem Suria", icon: "🪐", avg: Math.round(sumSolar / count), color: "from-sky-500 to-sky-600" },
            { id: "quiz", name: "Kuiz Sains 20s", icon: "🧪", avg: Math.round(sumQuiz / count), color: "from-purple-500 to-purple-600" },
        ];

        // Top 5 Murid mengikut XP
        const sorted = [...studentsList]
            .sort((a, b) => (Number(b.xp) || 0) - (Number(a.xp) || 0))
            .slice(0, 5);

        return {
            modules: modStats,
            topStudents: sorted,
            totalStudents: count,
            activeRate: Math.round((activeCount / count) * 100),
            avgXP: Math.round(sumXP / count),
            highestAvg: Math.max(...modStats.map((m) => m.avg), 100),
        };
    }, [studentsList]);

    const maxStudentXP = topStudents[0]?.xp || 100;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-left">
            {/* =========================================================================
                KAD 1: PURATA SKOR AKTIVITI (Bar Chart)
                ========================================================================= */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                        <div className="flex items-center gap-2">
                            <span className="text-base">📊</span>
                            <h3 className="text-sm font-black text-slate-800">
                                Purata Skor Aktiviti
                            </h3>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                            Sasaran: <strong className="text-slate-700">70 pts</strong>
                        </span>
                    </div>

                    <div className="space-y-3">
                        {modules.map((mod) => {
                            const pct = Math.min(100, Math.round((mod.avg / highestAvg) * 100));
                            return (
                                <div key={mod.id} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                            <span>{mod.icon}</span>
                                            <span>{mod.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-black text-slate-900">
                                                {mod.avg} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                                            </span>
                                            <span
                                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${mod.avg >= 70
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        : mod.avg >= 40
                                                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                            : "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {mod.avg >= 70 ? "Cemerlang" : mod.avg >= 40 ? "Sederhana" : "Permulaan"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bar Graf */}
                                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                                        {/* Tanda Sasaran 70% */}
                                        <div
                                            className="absolute top-0 bottom-0 w-0.5 bg-slate-300 z-10"
                                            style={{ left: "70%" }}
                                            title="Sasaran 70 pts"
                                        />
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r ${mod.color} transition-all duration-700`}
                                            style={{ width: `${pct > 0 ? pct : 3}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Garis kelabu: sasaran standard 70 pts</span>
                    <span className="font-mono text-slate-600 font-bold">{totalStudents} murid dinilai</span>
                </div>
            </div>

            {/* =========================================================================
                KAD 2: PAPAN PENDAHULU XP (Top 5 Murid)
                ========================================================================= */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                        <div className="flex items-center gap-2">
                            <span className="text-base">🏆</span>
                            <h3 className="text-sm font-black text-slate-800">
                                Kedudukan Murid (XP)
                            </h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            Top 5
                        </span>
                    </div>

                    {topStudents.length === 0 ? (
                        <div className="py-10 text-center text-slate-400 text-xs">
                            Tiada rekod murid lagi
                        </div>
                    ) : (
                        <div className="space-y-2.5">
                            {topStudents.map((st, idx) => {
                                const rankMedals = ["🥇", "🥈", "🥉", "4", "5"];
                                const rankColors = [
                                    "bg-amber-100 text-amber-800 border-amber-300",
                                    "bg-slate-100 text-slate-700 border-slate-300",
                                    "bg-orange-100 text-orange-800 border-orange-300",
                                    "bg-slate-50 text-slate-500 border-slate-200",
                                    "bg-slate-50 text-slate-500 border-slate-200",
                                ];
                                const widthPct = Math.min(100, Math.round(((Number(st.xp) || 0) / maxStudentXP) * 100));

                                return (
                                    <div
                                        key={st.ic || idx}
                                        className="p-2 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span
                                                    className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] font-black shrink-0 ${rankColors[idx]}`}
                                                >
                                                    {rankMedals[idx]}
                                                </span>
                                                <span className="font-bold text-slate-800 truncate max-w-[130px] sm:max-w-[150px]">
                                                    {st.name}
                                                </span>
                                                {st.school && st.school !== "-" && (
                                                    <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.2 rounded font-bold truncate max-w-[120px] hidden sm:inline">
                                                        🏫 {st.school}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-mono font-black text-amber-700 text-xs shrink-0">
                                                {st.xp || 0} <span className="text-[10px] text-slate-400 font-normal">XP</span>
                                            </span>
                                        </div>

                                        {/* Slim Progress Bar */}
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                                                style={{ width: `${widthPct > 0 ? widthPct : 5}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Kad 2 */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Aktif: <strong className="text-emerald-700">{activeRate}%</strong>
                    </span>
                    <span className="font-bold text-slate-600">
                        Purata: <strong className="text-[#0099e5]">{avgXP} XP</strong>
                    </span>
                </div>
            </div>
        </div>
    );
}
