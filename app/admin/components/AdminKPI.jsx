"use client";

import React from "react";

export default function AdminKPI({
    studentsCount = 0,
    topicsCount = 0,
    totalQuestions = 0,
    spellingWordsCount = 0,
}) {
    const kpiCards = [
        {
            title: "Murid Berdaftar",
            value: studentsCount,
            icon: "👥",
        },
        {
            title: "Topik Pembelajaran",
            value: topicsCount,
            icon: "📖",
        },
        {
            title: "Soalan Kuiz 20s",
            value: totalQuestions,
            icon: "⚡",
        },
        {
            title: "Kata Spelling Bee",
            value: spellingWordsCount,
            icon: "🐝",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
            {kpiCards.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between transition-all hover:border-slate-300"
                >
                    <div>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-black tracking-wider block">
                            {card.title}
                        </span>
                        <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 block mt-0.5">
                            {card.value.toLocaleString()}
                        </span>
                    </div>

                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-lg shrink-0 text-slate-700 shadow-2xs">
                        {card.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
