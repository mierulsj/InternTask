"use client";

import React from "react";

export default function StudentsTab({
    studentsList = [],
    isLoadingStudents = false,
    searchTerm = "",
    setSearchTerm,
    onRefresh,
    onEditStudent,
}) {
    const filteredStudents = studentsList.filter((s) => {
        const q = searchTerm.toLowerCase();
        return (
            (s.name && s.name.toLowerCase().includes(q)) ||
            (s.ic && s.ic.includes(q)) ||
            (s.studentId && s.studentId.toLowerCase().includes(q)) ||
            (s.school && s.school.toLowerCase().includes(q))
        );
    });

    return (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4 text-left">
            {/* Toolbar: Carian & Muat Semula */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2.5">
                <div className="relative flex-1 max-w-sm">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari nama, IC, ID atau sekolah..."
                        className="w-full px-3 py-2 pl-8 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 transition-all font-medium"
                    />
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-[11px] font-bold text-slate-400">
                        {filteredStudents.length} murid dijumpai
                    </span>
                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={isLoadingStudents}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 cursor-pointer disabled:opacity-50 transition-all flex items-center gap-1.5"
                    >
                        <span>↻</span>
                        <span>{isLoadingStudents ? "Memuat..." : "Muat Semula"}</span>
                    </button>
                </div>
            </div>

            {/* Jadual Senarai Murid */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/90 text-slate-600 text-[10px] uppercase font-black tracking-wider border-b border-slate-200">
                        <tr>
                            <th className="py-3 px-3.5">Pelajar</th>
                            <th className="py-3 px-3">Sekolah</th>
                            <th className="py-3 px-3">Tahap</th>
                            <th className="py-3 px-3">Mata XP</th>
                            <th className="py-3 px-3">Skor Cabaran</th>
                            <th className="py-3 px-3">Status</th>
                            <th className="py-3 px-3 text-right">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                                    {isLoadingStudents ? "Memuatkan data murid..." : "Tiada rekod murid dijumpai."}
                                </td>
                            </tr>
                        ) : (
                            filteredStudents.map((st) => (
                                <tr key={st.ic} className="hover:bg-slate-50/70 transition-colors">
                                    {/* Pelajar: Nama + IC & ID */}
                                    <td className="py-3 px-3.5">
                                        <div className="font-bold text-slate-900 leading-tight">
                                            {st.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5 font-mono text-[10px] text-slate-400">
                                            <span className="text-slate-600">{st.ic}</span>
                                            <span>•</span>
                                            <span className="text-[#0099e5] font-bold">
                                                {st.studentId || `STU-${st.ic.slice(-5)}`}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Sekolah */}
                                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                                        <span className="text-slate-800 font-medium">
                                            {st.school && st.school !== "-" ? st.school : "Tiada Sekolah"}
                                        </span>
                                    </td>

                                    {/* Tahap */}
                                    <td className="py-3 px-3 whitespace-nowrap">
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-bold text-[10px]">
                                            Tahun {st.level}
                                        </span>
                                    </td>

                                    {/* Mata XP */}
                                    <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                                        {(st.xp || 0).toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">XP</span>
                                    </td>

                                    {/* Skor Ringkas (Sifir, Spelling, Tumbuhan, Suria, Kuiz) */}
                                    <td className="py-3 px-3 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                                            <span title="Sifir Kilat" className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-bold">
                                                Sifir: {st.mathScore || 0}
                                            </span>
                                            <span title="Spelling Bee" className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-bold">
                                                Spell: {st.spellingScore || 0}
                                            </span>
                                            <span title="Kuiz Pantas" className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-bold">
                                                Kuiz: {st.quizScore || 0}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="py-3 px-3 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                                st.status === "Aktif"
                                                    ? "bg-slate-50 text-slate-700 border-slate-200"
                                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                            }`}
                                        >
                                            {st.status || "Aktif"}
                                        </span>
                                    </td>

                                    {/* Tindakan: Butang Edit */}
                                    <td className="py-3 px-3 text-right whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => onEditStudent && onEditStudent(st)}
                                            className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 active:scale-95 text-[#0099e5] border border-sky-200 rounded-lg text-[11px] font-bold cursor-pointer transition-all inline-flex items-center gap-1"
                                            title="Ubah maklumat pelajar"
                                        >
                                            <span>✏️</span>
                                            <span>Ubah</span>
                                        </button>
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
