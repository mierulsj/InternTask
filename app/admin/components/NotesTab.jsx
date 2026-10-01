"use client";

import React from "react";

export default function NotesTab({
    topics = [],
    onAddTopic,
    onEditTopic,
    onDeleteTopic,
}) {
    return (
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4 text-left">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800">
                    Senarai Topik Nota ({topics.length})
                </h3>
                <button
                    type="button"
                    onClick={onAddTopic}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs rounded-lg cursor-pointer transition-all shadow-xs"
                >
                    + Tambah Topik Baharu
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2.5 relative hover:border-cyan-400 hover:shadow-sm transition-all"
                    >
                        <div className="flex justify-between items-start gap-2">
                            <div>
                                <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 font-bold">
                                    {topic.category || "Sains"}
                                </span>
                                <h4 className="text-sm font-black text-slate-900 mt-1">{topic.title}</h4>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => onEditTopic(topic)}
                                    className="px-2.5 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-[11px] rounded font-bold cursor-pointer transition-colors"
                                >
                                    Ubah
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDeleteTopic(topic.id)}
                                    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11px] rounded font-bold cursor-pointer transition-colors"
                                >
                                    Padam
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {topic.content}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200 font-mono">
                            <span className="font-bold text-slate-700">Soalan Kuiz: {topic.questions?.length || 0}</span>
                            <span className="truncate max-w-[200px] text-slate-400">
                                {topic.videoEmbedUrl || "Tiada Video"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
