"use client";

import React, { useState, useEffect } from "react";

export default function StudentModal({
    isOpen = false,
    student = null,
    onClose,
    onSave,
    isSaving = false,
}) {
    const [formData, setFormData] = useState({
        ic: "",
        name: "",
        school: "",
        studentId: "",
        level: 1,
        xp: 100,
        quizScore: 0,
        mathScore: 0,
        spellingScore: 0,
        plantScore: 0,
        solarScore: 0,
        streak: 1,
        status: "Aktif",
    });

    useEffect(() => {
        if (student) {
            setFormData({
                ic: student.ic || "",
                name: student.name || "",
                school: student.school && student.school !== "-" ? student.school : "",
                studentId: student.studentId || "",
                level: Number(student.level) || 1,
                xp: Number(student.xp) || 0,
                quizScore: Number(student.quizScore) || 0,
                mathScore: Number(student.mathScore) || 0,
                spellingScore: Number(student.spellingScore) || 0,
                plantScore: Number(student.plantScore) || 0,
                solarScore: Number(student.solarScore) || 0,
                streak: Number(student.streak) || 1,
                status: student.status || "Aktif",
            });
        }
    }, [student]);

    if (!isOpen || !student) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave(formData);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 anim-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 text-left relative max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
                    <div>
                        <h3 className="text-base font-black text-slate-900">
                            Ubah Data Pelajar
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Kemaskini maklumat profil, sekolah dan rekod skor murid.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Fields (Scrollable) */}
                <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 pr-1 text-xs">
                    {/* Baris 1: Nama & Sekolah */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                Nama Penuh Murid
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                Nama Sekolah
                            </label>
                            <input
                                type="text"
                                placeholder="Cth: SK Taman Melati"
                                value={formData.school}
                                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Baris 2: No IC, ID Pelajar & Tahap */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                No. IC (Kunci Akaun)
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={formData.ic}
                                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono font-bold cursor-not-allowed outline-none"
                                title="No. IC tidak boleh diubah kerana merupakan ID dokumen unik"
                            />
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                ID Pelajar
                            </label>
                            <input
                                type="text"
                                value={formData.studentId}
                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                placeholder="STU-XXXXX"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                Tahap / Tahun
                            </label>
                            <select
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:bg-white focus:border-[#0099e5] outline-none transition-all cursor-pointer"
                            >
                                {[1, 2, 3, 4, 5, 6].map((lvl) => (
                                    <option key={lvl} value={lvl}>
                                        Tahun {lvl}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Baris 3: Mata XP & Streak & Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                Mata XP
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.xp}
                                onChange={(e) => setFormData({ ...formData, xp: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                Streak Hari
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.streak}
                                onChange={(e) => setFormData({ ...formData, streak: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:bg-white focus:border-[#0099e5] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">
                                Status Akaun
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:bg-white focus:border-[#0099e5] outline-none transition-all cursor-pointer"
                            >
                                <option value="Aktif">Aktif</option>
                                <option value="Digantung">Digantung</option>
                                <option value="Tidak Aktif">Tidak Aktif</option>
                            </select>
                        </div>
                    </div>

                    {/* Seksyen Skor Aktiviti (Kemaskini Skor) */}
                    <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                            Skor Aktiviti & Cabaran
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-1">
                                    Kuiz 20s
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.quizScore}
                                    onChange={(e) => setFormData({ ...formData, quizScore: Number(e.target.value) })}
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-center outline-none focus:bg-white focus:border-[#0099e5]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-1">
                                    Sifir Kilat
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.mathScore}
                                    onChange={(e) => setFormData({ ...formData, mathScore: Number(e.target.value) })}
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-center outline-none focus:bg-white focus:border-[#0099e5]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-1">
                                    Spelling Bee
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.spellingScore}
                                    onChange={(e) => setFormData({ ...formData, spellingScore: Number(e.target.value) })}
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-center outline-none focus:bg-white focus:border-[#0099e5]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-1">
                                    Tumbuhan
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.plantScore}
                                    onChange={(e) => setFormData({ ...formData, plantScore: Number(e.target.value) })}
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-center outline-none focus:bg-white focus:border-[#0099e5]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-500 block mb-1">
                                    Suria
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.solarScore}
                                    onChange={(e) => setFormData({ ...formData, solarScore: Number(e.target.value) })}
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-center outline-none focus:bg-white focus:border-[#0099e5]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Butang Tindakan */}
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-5 py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-98 text-white font-bold rounded-lg cursor-pointer transition-all shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                        >
                            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
