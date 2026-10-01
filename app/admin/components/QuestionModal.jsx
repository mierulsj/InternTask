"use client";

import React from "react";

export default function QuestionModal({
    isOpen,
    mode, // "add" | "edit"
    targetTopicTitle,
    questionData,
    setQuestionData,
    isSaving,
    onSave,
    onClose,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full p-5 space-y-4 text-left">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-black text-slate-900">
                        {mode === "add" ? "Tambah Soalan Kuiz" : "Ubah Suai Soalan Kuiz"}{" "}
                        <span className="text-amber-600">({targetTopicTitle})</span>
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer text-base"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={onSave} className="space-y-3 text-xs">
                    <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Teks Soalan</label>
                        <input
                            type="text"
                            value={questionData.question}
                            onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                            required
                            placeholder="cth: Apakah sumber tenaga utama di Bumi?"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-700 font-bold">3 Pilihan Jawapan</label>
                        {questionData.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-2">
                                <span className="font-mono text-slate-500 font-black w-4">
                                    {String.fromCharCode(65 + oIdx)}.
                                </span>
                                <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                        const newOpts = [...questionData.options];
                                        newOpts[oIdx] = e.target.value;
                                        setQuestionData({ ...questionData, options: newOpts });
                                    }}
                                    required
                                    placeholder={`Pilihan ${String.fromCharCode(65 + oIdx)}`}
                                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1 pt-1">
                        <label className="text-slate-700 font-bold">Jawapan Betul</label>
                        <select
                            value={questionData.correctAnswer}
                            onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
                            required
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-emerald-700 font-bold outline-none cursor-pointer focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        >
                            <option value="">-- Pilih Jawapan Betul --</option>
                            {questionData.options.filter(Boolean).map((opt, idx) => (
                                <option key={idx} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold cursor-pointer transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving || !questionData.correctAnswer}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white rounded-lg font-bold cursor-pointer disabled:opacity-50 transition-all shadow-xs"
                        >
                            {isSaving ? "Menyimpan..." : "Simpan Soalan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
