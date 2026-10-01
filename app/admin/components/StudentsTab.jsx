"use client";

import React from "react";

export default function StudentsTab({
    studentsList = [],
    isLoadingStudents = false,
    searchTerm = "",
    setSearchTerm,
    onRefresh,
}) {
    const filteredStudents = studentsList.filter((s) => {
        const q = searchTerm.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.ic.includes(q);
    });

    return (
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari Nama / No IC..."
                    className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 w-full sm:w-64 transition-all"
                />
                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={isLoadingStudents}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 cursor-pointer disabled:opacity-50 transition-colors"
                >
                    {isLoadingStudents ? "Memuat..." : "↻ Muat Semula Data"}
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50">
                        <tr className="border-b border-slate-200 text-slate-600 text-[10px] uppercase font-black tracking-wider">
                            <th className="py-2.5 px-3">Nama</th>
                            <th className="py-2.5 px-3">No. IC</th>
                            <th className="py-2.5 px-3">Tahap</th>
                            <th className="py-2.5 px-3">Mata XP</th>
                            <th className="py-2.5 px-3">Skor Sifir</th>
                            <th className="py-2.5 px-3">Skor Spelling</th>
                            <th className="py-2.5 px-3">Skor Tumbuhan</th>
                            <th className="py-2.5 px-3">Skor Suria</th>
                            <th className="py-2.5 px-3">Skor Kuiz</th>
                            <th className="py-2.5 px-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="py-8 text-center text-slate-400">
                                    {isLoadingStudents ? "Memuatkan data murid..." : "Tiada rekod murid dijumpai."}
                                </td>
                            </tr>
                        ) : (
                            filteredStudents.map((st) => (
                                <tr key={st.ic} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-2.5 px-3 font-bold text-slate-900">{st.name}</td>
                                    <td className="py-2.5 px-3 font-mono text-slate-600">{st.ic}</td>
                                    <td className="py-2.5 px-3">
                                        <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-bold text-[10px]">
                                            T{st.level}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-600">{st.xp} XP</td>
                                    <td className="py-2.5 px-3 font-mono text-indigo-700 font-bold">{st.mathScore || 0}</td>
                                    <td className="py-2.5 px-3 font-mono text-amber-700 font-bold">{st.spellingScore || 0}</td>
                                    <td className="py-2.5 px-3 font-mono text-slate-700">{st.plantScore}</td>
                                    <td className="py-2.5 px-3 font-mono text-slate-700">{st.solarScore}</td>
                                    <td className="py-2.5 px-3 font-mono text-slate-700">{st.quizScore}</td>
                                    <td className="py-2.5 px-3">
                                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                            {st.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
