"use client";

import React, { useState } from "react";
import { SPELLING_THEMES, normalizeDifficulty } from "../../../lib/spellingService";

export default function SpellingBeeTab({
    words = [],
    onAddWord,
    onEditWord,
    onDeleteWord,
    onResetDefaultWords,
    isSaving = false,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [themeFilter, setThemeFilter] = useState("all");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [speakingWordId, setSpeakingWordId] = useState(null);

    const playWordAudio = (wordItem) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        try {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(wordItem.word);
            u.lang = "en-US";
            u.rate = 0.88;
            u.onstart = () => setSpeakingWordId(wordItem.id || wordItem.word);
            u.onend = () => setSpeakingWordId(null);
            u.onerror = () => setSpeakingWordId(null);
            window.speechSynthesis.speak(u);
        } catch {}
    };

    const filteredWords = words.filter((w) => {
        const matchesQuery =
            !searchQuery ||
            w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (w.meaning && w.meaning.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (w.meaningEN && w.meaningEN.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (w.theme && w.theme.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTheme =
            themeFilter === "all" || (w.theme || "").toLowerCase() === themeFilter.toLowerCase();

        const normDiff = normalizeDifficulty(w.difficulty);
        const matchesDiff =
            difficultyFilter === "all" || normDiff === difficultyFilter;

        return matchesQuery && matchesTheme && matchesDiff;
    });

    return (
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4 text-left">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3.5">
                <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <span>🐝</span>
                        <span>Pengurusan Kata Spelling Bee ({words.length} Perkataan)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                        Urus 9 tema perbendaharaan kata (Home, Subject, Music, Body, Animal, Food, Jobs, Clothes, Sport), gambar objek, sebutan dan tahap kesukaran (Easy, Medium, Hard).
                    </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={onResetDefaultWords}
                        disabled={isSaving}
                        className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-lg cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                        title="Pulihkan senarai 90 perkataan berserta gambar lalai"
                    >
                        🔄 Pulihkan Asal
                    </button>
                    <button
                        type="button"
                        onClick={onAddWord}
                        className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg cursor-pointer transition-all shadow-xs active:scale-98 flex items-center gap-1.5"
                    >
                        <span>+</span>
                        <span>Tambah Kata</span>
                    </button>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <div className="relative flex-1 max-w-sm">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari perkataan, tema, atau maksud..."
                            className="w-full px-3 py-2 pl-8 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Difficulty Filters (Easy, Medium, Hard) */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        <span className="text-[11px] font-bold text-slate-400 shrink-0">Tahap:</span>
                        {[
                            { key: "all", label: "Semua" },
                            { key: "easy", label: "Easy" },
                            { key: "medium", label: "Medium" },
                            { key: "hard", label: "Hard" },
                        ].map((btn) => (
                            <button
                                key={btn.key}
                                type="button"
                                onClick={() => setDifficultyFilter(btn.key)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                                    difficultyFilter === btn.key
                                        ? "bg-amber-500 text-white border-amber-600 shadow-2xs"
                                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme Selector Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5">
                    <span className="text-[11px] font-bold text-slate-400 shrink-0">Tema:</span>
                    {SPELLING_THEMES.map((theme) => {
                        const isSelected = themeFilter === theme.id;
                        return (
                            <button
                                key={theme.id}
                                type="button"
                                onClick={() => setThemeFilter(theme.id)}
                                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 border ${
                                    isSelected
                                        ? "bg-amber-100 text-amber-900 border-amber-400 shadow-2xs"
                                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                            >
                                <span>{theme.emoji}</span>
                                <span>{theme.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Words List */}
            <div className="space-y-2.5">
                {filteredWords.length === 0 ? (
                    <div className="py-10 text-center text-slate-400 text-xs space-y-1 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <div>Tiada perkataan yang sepadan dengan carian / penapis.</div>
                        <div className="text-[11px] text-slate-400">Klik &apos;+ Tambah Kata&apos; untuk mencipta perkataan baharu.</div>
                    </div>
                ) : (
                    filteredWords.map((item, idx) => {
                        const isSpeaking = speakingWordId === (item.id || item.word);
                        const normDiff = normalizeDifficulty(item.difficulty);
                        return (
                            <div
                                key={item.id || idx}
                                className="bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-white transition-all space-y-2"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        {/* Image Thumbnail */}
                                        <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shrink-0 shadow-2xs">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.word}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-base">
                                                    📷
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-mono font-black text-amber-600 text-xs">#{idx + 1}</span>
                                                <span className="font-mono font-black text-sm text-slate-900 uppercase tracking-wide">
                                                    {item.word}
                                                </span>
                                                {item.syllables && (
                                                    <span className="text-xs text-slate-500 font-mono">
                                                        ({item.syllables})
                                                    </span>
                                                )}
                                                {item.ipa && (
                                                    <span className="text-[11px] text-slate-400 font-mono">
                                                        {item.ipa}
                                                    </span>
                                                )}
                                                {/* Theme Pill */}
                                                {item.theme && (
                                                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                                        {item.theme}
                                                    </span>
                                                )}
                                                {/* Difficulty Badge */}
                                                <span
                                                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                                        normDiff === "easy"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : normDiff === "medium"
                                                            ? "bg-sky-50 text-sky-700 border-sky-200"
                                                            : "bg-rose-50 text-rose-700 border-rose-200"
                                                    }`}
                                                >
                                                    {normDiff.toUpperCase()}
                                                </span>
                                            </div>

                                            {/* Meaning & Clue */}
                                            <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                                                {item.meaning || item.meaningEN || item.meaningBM}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => playWordAudio(item)}
                                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                                                isSpeaking
                                                    ? "bg-amber-100 text-amber-900 border-amber-300"
                                                    : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-2xs"
                                            }`}
                                            title="Uji Sebutan Audio"
                                        >
                                            <span>{isSpeaking ? "🔊..." : "🔊 Sebut"}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onEditWord(item)}
                                            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-lg border border-slate-200 shadow-2xs cursor-pointer transition-all"
                                        >
                                            Sunting
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteWord(item)}
                                            className="px-2.5 py-1.5 bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs rounded-lg border border-slate-200 shadow-2xs cursor-pointer transition-all"
                                        >
                                            Padam
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
