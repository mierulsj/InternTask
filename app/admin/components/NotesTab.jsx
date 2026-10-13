"use client";

import React from "react";

export default function NotesTab({
    topics = [],
    onAddTopic,
    onEditTopic,
    onDeleteTopic,
}) {
    return (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                    <h3 className="text-sm font-black text-slate-900">
                        Topik Pembelajaran ({topics.length})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Kandungan nota dan video untuk murid teroka.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onAddTopic}
                    className="px-3.5 py-2 bg-[#0099e5] hover:bg-[#0088cc] active:scale-98 text-white font-bold text-xs rounded-lg cursor-pointer transition-all shadow-xs"
                >
                    + Tambah Topik
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topics.map((topic, idx) => (
                    <div
                        key={topic.id}
                        className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2 relative hover:border-slate-300 transition-all"
                    >
                        <div className="flex justify-between items-start gap-2">
                            <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] font-mono text-[#0099e5] bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">
                                        Pelajaran {idx + 1}
                                    </span>
                                    <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium">
                                        {topic.category || "Sains"}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-slate-900 mt-1">{topic.title}</h4>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => onEditTopic(topic)}
                                    className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-[#0099e5] border border-sky-200 text-[11px] rounded font-bold cursor-pointer transition-colors"
                                >
                                    Ubah
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDeleteTopic(topic.id)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 text-[11px] rounded font-bold cursor-pointer transition-colors"
                                >
                                    Padam
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {topic.content}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
                            <span className="font-bold text-slate-700">Soalan: {topic.questions?.length || 0}</span>
                            <span className="truncate max-w-[180px] text-slate-400">
                                {topic.videoEmbedUrl ? "🎥 Ada Video" : "Tiada Video"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
