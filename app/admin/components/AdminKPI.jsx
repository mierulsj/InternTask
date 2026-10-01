"use client";

import React from "react";

export default function AdminKPI({ studentsCount = 0, topicsCount = 0, totalQuestions = 0, spellingWordsCount = 0 }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-left">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Jumlah Murid</span>
                <span className="text-2xl font-mono font-black text-cyan-600">{studentsCount}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Jumlah Topik Nota</span>
                <span className="text-2xl font-mono font-black text-emerald-600">{topicsCount}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Jumlah Soalan Kuiz</span>
                <span className="text-2xl font-mono font-black text-amber-600">{totalQuestions}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Kata Spelling Bee</span>
                <span className="text-2xl font-mono font-black text-purple-600">{spellingWordsCount}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Status Sistem</span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                    Bcrypt • 2FA • Firestore
                </span>
            </div>
        </div>
    );
}
