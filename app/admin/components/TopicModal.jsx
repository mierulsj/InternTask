"use client";

import React from "react";

export default function TopicModal({
    isOpen,
    mode, // "add" | "edit"
    topicData,
    setTopicData,
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
                        {mode === "add" ? "Tambah Topik Nota Baharu" : "Ubah Suai Topik Nota"}
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
                        <label className="text-slate-700 font-bold">Tajuk Topik</label>
                        <input
                            type="text"
                            value={topicData.title}
                            onChange={(e) => setTopicData({ ...topicData, title: e.target.value })}
                            required
                            placeholder="cth: Topik 3: Tenaga & Elektrik"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-slate-700 font-bold">Kategori</label>
                            <input
                                type="text"
                                value={topicData.category}
                                onChange={(e) => setTopicData({ ...topicData, category: e.target.value })}
                                placeholder="cth: Fizik & Tenaga"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-slate-700 font-bold">YouTube Embed URL</label>
                            <input
                                type="text"
                                value={topicData.videoEmbedUrl}
                                onChange={(e) => setTopicData({ ...topicData, videoEmbedUrl: e.target.value })}
                                placeholder="https://www.youtube.com/embed/..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Kandungan Nota Pembelajaran</label>
                        <textarea
                            rows={5}
                            value={topicData.content}
                            onChange={(e) => setTopicData({ ...topicData, content: e.target.value })}
                            required
                            placeholder="Tuliskan nota ringkas sains di sini..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 leading-relaxed font-sans transition-all"
                        />
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
                            disabled={isSaving}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white rounded-lg font-bold cursor-pointer disabled:opacity-50 transition-all shadow-xs"
                        >
                            {isSaving ? "Menyimpan..." : "Simpan Topik"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
