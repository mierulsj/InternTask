"use client";

import React from "react";

export default function QuizzesTab({
    topics = [],
    selectedTopicId,
    setSelectedTopicId,
    onAddQuestion,
    onEditQuestion,
    onDeleteQuestion,
}) {
    const currentTargetTopic = topics.find((t) => t.id === selectedTopicId) || topics[0] || {};
    const questions = currentTargetTopic.questions || [];

    return (
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-700">Pilih Topik:</label>
                    <select
                        value={selectedTopicId}
                        onChange={(e) => setSelectedTopicId(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-bold outline-none cursor-pointer focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    >
                        {topics.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.title} ({t.questions?.length || 0} Soalan)
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    onClick={onAddQuestion}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white font-bold text-xs rounded-lg cursor-pointer transition-all shadow-xs"
                >
                    + Tambah Soalan Kuiz
                </button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
                {questions.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                        Tiada soalan kuiz untuk topik ini. Sila klik &apos;+ Tambah Soalan Kuiz&apos; di atas.
                    </div>
                ) : (
                    questions.map((q, qIdx) => (
                        <div
                            key={qIdx}
                            className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2.5 hover:border-amber-300 hover:shadow-xs transition-all"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div className="font-bold text-xs text-slate-900 leading-snug">
                                    <span className="text-amber-600 font-mono font-black mr-2">#{qIdx + 1}</span>
                                    {q.question}
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => onEditQuestion(q, qIdx)}
                                        className="px-2.5 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-[11px] rounded font-bold cursor-pointer transition-colors"
                                    >
                                        Ubah
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDeleteQuestion(qIdx)}
                                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11px] rounded font-bold cursor-pointer transition-colors"
                                    >
                                        Padam
                                    </button>
                                </div>
                            </div>

                            {/* Pilihan Jawapan */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                                {q.options.map((opt, optIdx) => {
                                    const isCorrect = opt === q.correctAnswer;
                                    return (
                                        <div
                                            key={optIdx}
                                            className={`p-2.5 rounded-lg text-[11px] font-mono border transition-all ${
                                                isCorrect
                                                    ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold shadow-2xs"
                                                    : "bg-white border-slate-200 text-slate-600"
                                            }`}
                                        >
                                            <span className={`mr-1.5 font-bold ${isCorrect ? "text-emerald-600" : "text-slate-400"}`}>
                                                {isCorrect ? "✓" : "•"}
                                            </span>
                                            {opt}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
