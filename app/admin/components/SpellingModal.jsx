"use client";

import React, { useState } from "react";
import { SPELLING_THEMES, normalizeDifficulty } from "../../../lib/spellingService";

export default function SpellingModal({
    isOpen,
    mode, // "add" | "edit"
    wordData,
    setWordData,
    isSaving,
    onSave,
    onClose,
}) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    if (!isOpen) return null;

    const playSpeechPreview = () => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        try {
            window.speechSynthesis.cancel();
            const text = (wordData.word || "").trim();
            if (!text) return;
            const u = new SpeechSynthesisUtterance(text);
            u.lang = "en-US";
            u.rate = 0.88;
            u.onstart = () => setIsSpeaking(true);
            u.onend = () => setIsSpeaking(false);
            u.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(u);
        } catch {}
    };

    const autoGenerateHint = () => {
        const w = (wordData.word || "").trim();
        if (!w) return;
        const len = w.length;
        const first = w[0].toUpperCase();
        const last = w[len - 1].toUpperCase();
        const middle = Array(Math.max(0, len - 2)).fill("_").join(" ");
        const hint = len > 2 ? `${first} ${middle} ${last} (${len} letters)` : `${w.toUpperCase()} (${len} letters)`;
        setWordData({ ...wordData, hintLetters: hint });
    };

    const themesList = SPELLING_THEMES.filter(t => t.id !== "all");

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 text-left my-8">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🐝</span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                            {mode === "add" ? "Tambah Kata Spelling Bee" : "Ubah Suai Kata Spelling Bee"}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer text-base"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={onSave} className="space-y-3.5 text-xs">
                    {/* Row 1: Word & Audio Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2 space-y-1">
                            <label className="text-slate-700 font-bold">
                                Perkataan Ejaan (English) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={wordData.word || ""}
                                onChange={(e) => setWordData({ ...wordData, word: e.target.value.toLowerCase() })}
                                required
                                placeholder="e.g. banana, elephant, guitar"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all font-mono"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-slate-700 font-bold">Uji Sebutan</label>
                            <button
                                type="button"
                                onClick={playSpeechPreview}
                                disabled={!wordData.word?.trim()}
                                className="w-full py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all"
                            >
                                <span>{isSpeaking ? "🔊 Berbunyi..." : "🔊 Dengar"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Row 2: Theme & Difficulty */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-slate-700 font-bold">
                                Tema Soalan <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={wordData.theme || "food"}
                                onChange={(e) => setWordData({ ...wordData, theme: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold outline-none cursor-pointer focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                            >
                                {themesList.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.emoji} {t.title} ({t.id})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-slate-700 font-bold">
                                Tahap Kesukaran (Difficulty) <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={normalizeDifficulty(wordData.difficulty)}
                                onChange={(e) => setWordData({ ...wordData, difficulty: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold outline-none cursor-pointer focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                            >
                                <option value="easy">Easy (Mudah)</option>
                                <option value="medium">Medium (Sederhana)</option>
                                <option value="hard">Hard (Sukar)</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Image URL with Live Thumbnail Preview */}
                    <div className="space-y-1">
                        <label className="text-slate-700 font-bold">
                            Pautan Gambar Objek (Image URL) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="url"
                                value={wordData.image || ""}
                                onChange={(e) => setWordData({ ...wordData, image: e.target.value })}
                                placeholder="https://images.unsplash.com/... atau URL gambar terus"
                                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-xs"
                            />
                            {wordData.image && (
                                <div className="w-10 h-10 rounded-lg border border-slate-300 overflow-hidden bg-slate-100 shrink-0 shadow-2xs">
                                    <img
                                        src={wordData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] text-slate-400">
                            Murid akan melihat gambar ini semasa mengeja perkataan dalam kuiz.
                        </p>
                    </div>

                    {/* Row 4: Syllables & Phonetics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-slate-700 font-bold">Pecahan Suku Kata</label>
                            <input
                                type="text"
                                value={wordData.syllables || ""}
                                onChange={(e) => setWordData({ ...wordData, syllables: e.target.value })}
                                placeholder="cth: ba • na • na"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all font-mono"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-slate-700 font-bold">Fonetik IPA (Pilihan)</label>
                            <input
                                type="text"
                                value={wordData.ipa || ""}
                                onChange={(e) => setWordData({ ...wordData, ipa: e.target.value })}
                                placeholder="cth: /bəˈnæn.ə/"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all font-mono"
                            />
                        </div>
                    </div>

                    {/* Row 5: Meaning in English */}
                    <div className="space-y-1">
                        <label className="text-slate-700 font-bold">
                            Definisi / Maksud Ringkas (English) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={2}
                            value={wordData.meaning || wordData.meaningEN || wordData.meaningBM || ""}
                            onChange={(e) => setWordData({ ...wordData, meaning: e.target.value, meaningEN: e.target.value })}
                            required
                            placeholder="e.g. A long curved yellow fruit with sweet soft flesh."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                        />
                    </div>

                    {/* Row 6: Example Sentence */}
                    <div className="space-y-1">
                        <label className="text-slate-700 font-bold">Contoh Ayat (Gunakan [_______] untuk ruangan ejaan)</label>
                        <input
                            type="text"
                            value={wordData.sentence || wordData.sentenceEN || wordData.sentenceBM || ""}
                            onChange={(e) => setWordData({ ...wordData, sentence: e.target.value, sentenceEN: e.target.value })}
                            placeholder="e.g. The monkey peeled a yellow [_______] to eat."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                    </div>

                    {/* Row 7: Hint Letters */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-slate-700 font-bold">Petunjuk Huruf (Hint Clue)</label>
                            <button
                                type="button"
                                onClick={autoGenerateHint}
                                className="text-[11px] text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
                            >
                                JANA AUTOMATIK DARI KATA
                            </button>
                        </div>
                        <input
                            type="text"
                            value={wordData.hintLetters || ""}
                            onChange={(e) => setWordData({ ...wordData, hintLetters: e.target.value })}
                            placeholder="cth: B _ _ _ _ A (6 letters)"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-700 font-bold cursor-pointer transition-all"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 active:scale-98 text-white rounded-lg font-bold cursor-pointer transition-all disabled:opacity-50 shadow-xs"
                        >
                            {isSaving ? "Menyimpan..." : mode === "add" ? "Tambah Kata" : "Kemaskini Kata"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
