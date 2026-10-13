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
            title: "Jumlah Pelajar",
            value: studentsCount,
            icon: "👥",
            color: "text-[#0099e5]",
            bgIcon: "bg-sky-50 text-[#0099e5]",
        },
        {
            title: "Topik Pembelajaran",
            value: topicsCount,
            icon: "📖",
            color: "text-emerald-600",
            bgIcon: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Soalan Kuiz 20s",
            value: totalQuestions,
            icon: "⚡",
            color: "text-amber-600",
            bgIcon: "bg-amber-50 text-amber-600",
        },
        {
            title: "Kata Spelling Bee",
            value: spellingWordsCount,
            icon: "🐝",
            color: "text-purple-600",
            bgIcon: "bg-purple-50 text-purple-600",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
            {kpiCards.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between transition-all hover:shadow-sm"
                >
                    <div>
                        <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-black tracking-wider block">
                            {card.title}
                        </span>
                        <span className={`text-2xl sm:text-3xl font-mono font-black ${card.color} block mt-0.5`}>
                            {card.value}
                        </span>
                    </div>

                    <div className={`w-11 h-11 rounded-2xl ${card.bgIcon} flex items-center justify-center text-xl shrink-0 shadow-2xs`}>
                        {card.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
