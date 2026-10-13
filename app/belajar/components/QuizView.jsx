"use client";

import React, { useState } from "react";
import {
    GraphicBackArrow,
    GraphicStopwatch,
    GraphicLightningBolt,
    GraphicArrowRight,
    GraphicMascotRobot,
    GraphicTarget,
    GraphicGrandTrophy,
    GraphicLightbulb,
    GraphicRocketLaunch,
    GraphicCloseCross,
    GraphicRefresh,
    GraphicScienceBook,
    GraphicHomeButton,
} from "./Graphics";

export default function QuizView({
    currentView,
    courseData,
    selectedTopicIndex,
    currentQuestionIndex,
    selectedAnswers,
    scoreCount,
    quizTotalPoints,
    timeLeft,
    isTimeOut,
    showScorePopup,
    lastReward,
    questionRewards,
    onSelectTopic,
    onStartQuiz,
    onAnswerSelect,
    onResetQuiz,
    onNavigate,
    t,
    playAudioFeedback,
}) {
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const currentTopic = courseData?.topics?.[selectedTopicIndex] || courseData?.topics?.[0];
    const scorePercentage = currentTopic?.questions?.length
        ? Math.round((scoreCount / currentTopic.questions.length) * 100)
        : 0;

    if (currentView === "quizList") {
        return (
            <div className="space-y-6 w-full max-w-lg anim-fade-in">

                                <div className="flex items-center gap-3 w-full border-b border-slate-100 pb-3">

                                    <button
                                        onClick={() => { playAudioFeedback?.("tap"); onNavigate("activityList"); }}
                                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all group"
                                    >
                                        <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                                        <span>Back</span>
                                    </button>

                                    <div>

                                        <h2 className="text-xl sm:text-2xl font-black text-[#e65100] text-left">

                                            {t("Pilih Topik Kuiz", "Choose Quiz Topic")}

                                        </h2>

                                        <p className="text-xs text-slate-500 text-left mt-0.5">

                                            {t("Pilih topik untuk membaca peraturan & memulakan kuiz", "Select a topic to read the rules & start the quiz")}

                                        </p>

                                    </div>

                                </div>



                                <div className="space-y-4 w-full">

                                    {courseData.topics.map((topic, idx) => (

                                        <div

                                            key={topic.id}

                                            className="bg-white border-2 border-[#ffa726]/40 hover:border-[#ffa726] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center sm:text-left group"

                                        >

                                            <div className="flex items-center gap-3.5">

                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">

                                                    {topic.graphic}

                                                </div>

                                                <div>

                                                    <div className="flex items-center gap-2">

                                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${topic.accentBadge}`}>

                                                            {topic.category}

                                                        </span>

                                                        <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">

                                                            <GraphicStopwatch className="w-3.5 h-3.5 text-amber-600" />

                                                            <span>{t("20s / Soalan", "20s / Question")}</span>

                                                        </span>

                                                    </div>

                                                    <h3 className="text-base font-black text-[#e65100] mt-1">{topic.title}</h3>

                                                    <p className="text-xs text-slate-500 mt-0.5">

                                                        {topic.questions?.length || 0} {t("soalan objektif aneka pilihan", "multiple-choice questions")}

                                                    </p>

                                                </div>

                                            </div>

                                            <button
                                                onClick={() => onSelectTopic(idx)}
                                                className="w-full sm:w-auto px-4 py-2 bg-transparent border-2 border-[#0099e5] text-[#0099e5] group-hover:bg-[#0099e5] group-hover:text-white text-xs font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs active:scale-95"
                                            >
                                                <GraphicLightningBolt className="w-3.5 h-3.5" />
                                                <span>{t("Pilih Kuiz", "Start Quiz")}</span>
                                                <GraphicArrowRight className="w-3 h-3" />
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>
        );
    }

    if (currentView === "quizRules") {
        const totalQuestions = currentTopic?.questions?.length || 5;

        return (
            <div className="space-y-5 w-full max-w-md mx-auto anim-fade-in text-center">

                {/* 1. Header Ringkas dengan Butang Back di Kiri */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3 w-full">
                    <button
                        type="button"
                        onClick={() => { playAudioFeedback?.("tap"); onNavigate("menu"); }}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95 transition-all group"
                        title={t("Kembali", "Back")}
                    >
                        <GraphicBackArrow className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back</span>
                    </button>
                    <div className="flex items-center gap-2 truncate">
                        <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                            {currentTopic?.graphic}
                        </div>
                        <h2 className="text-base sm:text-lg font-black text-slate-800 truncate text-left">
                            {currentTopic?.title}
                        </h2>
                    </div>
                </div>

                {/* 2. Visual & Tajuk Kuiz Ringkas */}
                <div className="py-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 shadow-lg flex items-center justify-center mb-3">
                        <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                            <GraphicStopwatch className="w-9 h-9 sm:w-11 sm:h-11 text-amber-500" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        {t("Kuiz Pantas 20 Saat", "20-Second Speed Quiz")}
                    </h2>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                        {t("Jawab pantas untuk skor maksimum!", "Answer fast for maximum score!")}
                    </p>
                </div>

                {/* 3. Tiga Kad Info Ringkas (Minimal Teks, Fokus Nombor & Ikon) */}
                <div className="grid grid-cols-3 gap-2.5">
                    {/* Kad 1: Masa */}
                    <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-3 text-center">
                        <span className="text-lg font-mono font-black text-sky-700 block">20s</span>
                        <span className="text-[11px] font-bold text-sky-900 mt-0.5 block">
                            {t("Masa/Soalan", "Time/Question")}
                        </span>
                    </div>

                    {/* Kad 2: Bilangan Soalan */}
                    <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-3 text-center">
                        <span className="text-lg font-mono font-black text-purple-700 block">{totalQuestions}</span>
                        <span className="text-[11px] font-bold text-purple-900 mt-0.5 block">
                            {t("Soalan", "Questions")}
                        </span>
                    </div>

                    {/* Kad 3: Bonus Kelajuan */}
                    <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 text-center">
                        <span className="text-lg font-mono font-black text-amber-700 block">+Bonus</span>
                        <span className="text-[11px] font-bold text-amber-900 mt-0.5 block">
                            {t("Kelajuan", "Speed")}
                        </span>
                    </div>
                </div>

                {/* 4. Butang Mula Kuiz */}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={onStartQuiz}
                        className="w-full py-3.5 px-6 bg-gradient-to-r from-[#0099e5] to-blue-600 hover:from-[#0088cc] hover:to-blue-700 text-white font-black text-sm sm:text-base rounded-2xl cursor-pointer flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg active:scale-98"
                    >
                        <GraphicRocketLaunch className="w-5 h-5" />
                        <span>{t("Mula Kuiz Sekarang", "Start Quiz Now")}</span>
                        <GraphicArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

            </div>
        );
    }

    if (currentView === "quiz") {
        return (
            <div className="space-y-6 w-full max-w-lg anim-fade-in relative">



                                {/* Status Header Bar */}

                                <div className="flex items-center justify-between bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 w-full shadow-sm">

                                    <div className="flex items-center gap-2.5 truncate mr-2">

                                        <div className="w-6 h-6 flex items-center justify-center shrink-0">

                                            {currentTopic.graphic}

                                        </div>

                                        <span className="font-black text-[#0099e5] text-xs sm:text-sm truncate">

                                            {currentTopic.shortTitle}

                                        </span>

                                    </div>

                                    <button

                                        onClick={() => { onResetQuiz(); onNavigate("quizList"); }}

                                        className="px-3.5 py-1.5 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold rounded-xl text-xs border border-slate-200 shadow-sm transition-all cursor-pointer shrink-0 active:scale-95 flex items-center gap-1.5"

                                    >

                                        <GraphicCloseCross className="w-3.5 h-3.5 text-rose-500" />

                                        <span>{t("Keluar", "Exit")}</span>

                                    </button>

                                </div>



                                {/* PAPARAN RESULT AKHIR KUIZ */}

                                {currentQuestionIndex === "finished" ? (

                                    <div className="space-y-5 w-full anim-fade-in relative">

                                        {/* Confetti Particles */}
                                        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                                            <div className="absolute top-2 left-6 w-3 h-3 bg-amber-400 rounded-sm" style={{ animation: "confettiShower 2s ease-out infinite" }} />
                                            <div className="absolute top-0 left-1/4 w-2 h-4 bg-sky-400 rotate-45" style={{ animation: "confettiShower 2.5s ease-out infinite 0.2s" }} />
                                            <div className="absolute top-2 left-1/2 w-3 h-2 bg-pink-500 rounded-full" style={{ animation: "confettiShower 2.2s ease-out infinite 0.5s" }} />
                                            <div className="absolute top-0 right-1/4 w-3 h-3 bg-emerald-400 rotate-12" style={{ animation: "confettiShower 2.4s ease-out infinite 0.3s" }} />
                                            <div className="absolute top-3 right-8 w-2 h-3 bg-yellow-400 rounded-sm" style={{ animation: "confettiShower 2.1s ease-out infinite 0.7s" }} />
                                        </div>

                                        {/* Score Card — Compact */}
                                        <div className="text-center py-6 px-5 bg-gradient-to-b from-[#00acc1]/10 via-[#00acc1]/20 to-white rounded-3xl border-3 border-[#00acc1] shadow-lg relative overflow-hidden">

                                            <div className="flex justify-center items-center gap-2 anim-float mb-2">
                                                <GraphicGrandTrophy className="w-20 h-20" />
                                            </div>

                                            <div className="inline-block bg-[#00acc1] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm mb-1">
                                                {t("Misi Selesai!", "Mission Complete!")}
                                            </div>

                                            {/* Score Display */}
                                            <div className="inline-flex flex-col items-center justify-center bg-white px-8 py-3 rounded-2xl shadow-md border-2 border-[#00acc1] mt-2">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                                                        {quizTotalPoints}
                                                    </span>
                                                    <span className="text-xs font-black text-slate-400 uppercase">
                                                        / 1,500 PTS
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Stats Pills — Compact Row */}
                                            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                                                <span className="text-xs font-black bg-sky-100 text-sky-800 px-3 py-1 rounded-xl border border-sky-200 flex items-center gap-1 shadow-xs">
                                                    🎯 {scoreCount}/{currentTopic.questions.length} ({scorePercentage}%)
                                                </span>
                                                <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-1 shadow-xs">
                                                    ⚡ +{Math.max(0, quizTotalPoints - (scoreCount * 100))} PTS
                                                </span>
                                                <span className="text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 px-3 py-1 rounded-xl border border-amber-300 flex items-center gap-1 shadow-xs anim-pop">
                                                    🌟 +{scoreCount === currentTopic.questions.length ? 25 : scoreCount >= 3 ? 20 : 10} {t("Koin", "Coins")}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Collapsible Answer Review */}
                                        <details className="w-full group">
                                            <summary className="cursor-pointer list-none flex items-center justify-between bg-white rounded-2xl px-4 py-3 border-2 border-slate-200 shadow-sm hover:border-[#00acc1] transition-all">
                                                <span className="font-black text-slate-700 text-sm flex items-center gap-2">
                                                    📋 {t("Semakan Jawapan", "Answer Review")}
                                                </span>
                                                <span className="text-xs text-slate-400 font-bold group-open:rotate-180 transition-transform">▼</span>
                                            </summary>
                                            <div className="space-y-2 mt-3">
                                                {currentTopic.questions.map((q, idx) => {
                                                    const userAns = selectedAnswers[idx];
                                                    const isCorrect = userAns === q.correctAnswer;
                                                    const wasTimeout = userAns === "__TIMEOUT__";
                                                    const reward = questionRewards[idx] || { pointsEarned: 0, speedBonus: 0, timeLeft: 0, timeSpent: 20 };
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`p-3 rounded-xl border-2 ${isCorrect
                                                                ? "bg-emerald-50/80 border-emerald-300"
                                                                : wasTimeout
                                                                    ? "bg-amber-50/80 border-amber-300"
                                                                    : "bg-rose-50/80 border-rose-300"
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between gap-2">
                                                                <p className="font-bold text-xs">
                                                                    {idx + 1}. {q.question}
                                                                </p>
                                                                <div className="flex items-center gap-1 shrink-0">
                                                                    {isCorrect ? (
                                                                        <span className="bg-emerald-200 text-emerald-900 font-black text-[10px] px-2 py-0.5 rounded-full">
                                                                            +{reward.pointsEarned}
                                                                        </span>
                                                                    ) : null}
                                                                    <span className="text-sm font-bold">
                                                                        {isCorrect ? "✓" : wasTimeout ? "⏱️" : "✕"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {!isCorrect && (
                                                                <p className="text-[10px] mt-1 text-emerald-800 font-bold bg-white/70 px-2 py-1 rounded-lg inline-block border border-emerald-200">
                                                                    ✅ {q.correctAnswer}
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </details>

                                        {/* Action Buttons — Clean */}
                                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                                            <button
                                                onClick={() => { playAudioFeedback?.("tap"); onResetQuiz(); onNavigate("quizRules"); }}
                                                className="col-span-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
                                            >
                                                <GraphicRefresh className="w-4 h-4" />
                                                <span>{t("Cuba Lagi", "Try Again")}</span>
                                            </button>
                                            <button
                                                onClick={() => { playAudioFeedback?.("tap"); onResetQuiz(); onNavigate("learningDetail"); }}
                                                className="px-4 py-2 bg-transparent border-2 border-[#0099e5] text-[#0099e5] hover:bg-[#0099e5] hover:text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 active:scale-95"
                                            >
                                                <GraphicScienceBook className="w-3.5 h-3.5" />
                                                <span>{t("Nota", "Notes")}</span>
                                            </button>
                                            <button
                                                onClick={() => { playAudioFeedback?.("tap"); onResetQuiz(); onNavigate("menu"); }}
                                                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 shadow-xs active:scale-95 transition-all"
                                            >
                                                <GraphicHomeButton className="w-3.5 h-3.5" />
                                                <span>{t("Menu", "Menu")}</span>
                                            </button>
                                        </div>

                                    </div>

                                ) : (

                                    /* SOALAN KUIZ AKTIF */

                                    <div className="space-y-5 w-full anim-fade-in relative">



                                        {/* Floating Score Reward Banner Popup */}

                                        {showScorePopup && lastReward && (

                                            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 anim-score-popup pointer-events-none">

                                                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2 whitespace-nowrap">

                                                    <span className="text-base sm:text-lg">⚡</span>

                                                    <span>+{lastReward.pointsEarned} {t("Mata!", "Points!")}</span>

                                                    <span className="bg-white/25 px-2 py-0.5 rounded-lg text-[10px] sm:text-xs">

                                                        +{lastReward.speedBonus} {t("Bonus Pantas", "Speed Bonus")} ({lastReward.timeLeft}s)

                                                    </span>

                                                </div>

                                            </div>

                                        )}



                                        {/* Top Bar Soalan, Live Score & Timer Graphic */}
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        playAudioFeedback?.("tap");
                                                        setShowExitConfirm(true);
                                                    }}
                                                    className="px-2.5 py-1 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold rounded-xl text-xs flex items-center gap-1 border border-slate-200 cursor-pointer transition-colors"
                                                    title={t("Keluar dari Kuiz", "Exit Quiz")}
                                                >
                                                    <GraphicBackArrow className="w-3.5 h-3.5" />
                                                    <span>{t("Keluar", "Exit")}</span>
                                                </button>

                                                <span className="bg-[#0099e5]/10 text-[#0099e5] border border-[#0099e5]/30 text-xs font-black px-2.5 sm:px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                                    <span className="hidden min-[380px]:inline">{t("Soalan", "Question")}</span>
                                                    <span className="bg-[#0099e5] text-white px-2 py-0.5 rounded-full text-[11px]">
                                                        {currentQuestionIndex + 1} / {currentTopic.questions.length}
                                                    </span>
                                                </span>
                                            </div>



                                            {/* SKOR KELAJUAN TERKUMPUL SECARA LIVE */}

                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 px-3 py-1 sm:py-1.5 rounded-full font-black text-xs sm:text-sm shadow-sm border border-amber-300">

                                                <span className="text-sm">⚡</span>

                                                <span className="tracking-wide">{quizTotalPoints}</span>

                                                <span className="text-[10px] uppercase font-bold opacity-80">PTS</span>

                                            </div>



                                            {/* TIMER 20 SAAT INTERAKTIF */}

                                            <div className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 font-black text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-sm transition-all duration-300 ${timeLeft <= 5

                                                ? "bg-rose-50 border-rose-500 text-rose-600 anim-pulse-urgent"

                                                : timeLeft <= 10

                                                    ? "bg-amber-50 border-amber-400 text-amber-700"

                                                    : "bg-sky-50 border-sky-400 text-sky-700"

                                                }`}>

                                                <GraphicStopwatch className={`w-4 h-4 ${timeLeft <= 5 ? "animate-spin" : ""}`} />

                                                <span>{timeLeft}s</span>

                                                <span className="text-[10px] text-slate-400 uppercase hidden md:inline">

                                                    {t("Tinggal", "Left")}

                                                </span>

                                            </div>

                                        </div>



                                        {/* Visual Timer Progress Bar */}

                                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">

                                            <div

                                                className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 5

                                                    ? "bg-gradient-to-r from-rose-500 to-red-600"

                                                    : timeLeft <= 10

                                                        ? "bg-gradient-to-r from-amber-400 to-orange-500"

                                                        : "bg-gradient-to-r from-[#0099e5] to-[#00d2ff]"

                                                    }`}

                                                style={{ width: `${(timeLeft / 20) * 100}%` }}

                                            />

                                        </div>



                                        {/* Question Card */}

                                        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm text-left">

                                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 block">

                                                {t("Sila Baca & Pilih:", "Please Read & Select:")}

                                            </span>

                                            <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-snug">

                                                {currentTopic.questions[currentQuestionIndex].question}

                                            </h3>

                                        </div>



                                        {/* Timeout Warning Message */}

                                        {isTimeOut && (

                                            <div className="bg-amber-100 border-2 border-amber-400 p-3 rounded-2xl text-amber-900 text-xs font-bold anim-shake flex items-center justify-center gap-2">

                                                <GraphicStopwatch className="w-5 h-5" />

                                                <span>{t("Masa telah tamat untuk soalan ini! Jawapan betul telah ditandakan.", "Time is up for this question! Correct answer has been highlighted.")}</span>

                                            </div>

                                        )}



                                        {/* Pilihan Jawapan 3D Tactile Buttons */}

                                        <div className="space-y-3.5 w-full">

                                            {currentTopic.questions[currentQuestionIndex].options.map((option, idx) => {

                                                const optionLetter = String.fromCharCode(65 + idx);

                                                const isSelected = selectedAnswers[currentQuestionIndex] === option;

                                                const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

                                                const isCorrectOption = option === currentTopic.questions[currentQuestionIndex].correctAnswer;



                                                let cardStyle = "border-slate-200 bg-white hover:border-[#0099e5] hover:bg-sky-50/40 text-slate-700 shadow-[0_5px_0_#cbd5e1] hover:shadow-[0_3px_0_#cbd5e1] hover:translate-y-[2px] active:shadow-none active:translate-y-[5px]";

                                                let badgeStyle = "bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700 border-slate-300";



                                                if (isAnswered) {

                                                    if (isSelected && !isCorrectOption) {

                                                        cardStyle = "border-rose-500 bg-rose-50 text-rose-950 font-bold anim-shake shadow-[0_4px_0_#e11d48]";

                                                        badgeStyle = "bg-rose-500 text-white border-rose-600";

                                                    } else if (isCorrectOption) {

                                                        cardStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-[0_4px_0_#059669] ring-2 ring-emerald-400/50";

                                                        badgeStyle = "bg-emerald-500 text-white border-emerald-600";

                                                    } else {

                                                        cardStyle = "border-slate-200 bg-slate-50 text-slate-400 opacity-60 shadow-none";

                                                        badgeStyle = "bg-slate-200 text-slate-400 border-slate-300";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    disabled={isAnswered}
                                                    onClick={() => onAnswerSelect(option)}
                                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-150 text-left select-none ${isAnswered ? "cursor-default" : "cursor-pointer"
                                                        } ${cardStyle}`}
                                                >
                                                    <div className="flex items-center gap-3.5">
                                                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs border shadow-sm shrink-0 transition-colors ${badgeStyle}`}>
                                                            {optionLetter}
                                                        </span>
                                                        <span className="text-sm sm:text-base font-bold">
                                                            {option}
                                                        </span>
                                                    </div>

                                                    {isAnswered && (
                                                        <div className="shrink-0 anim-pop">
                                                            {isCorrectOption ? (
                                                                <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-md border-2 border-white">
                                                                    ✓
                                                                </span>
                                                            ) : isSelected ? (
                                                                <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-black shadow-md border-2 border-white">
                                                                    ✕
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Pop-up Pengesahan Keluar Kuiz */}
                            {showExitConfirm && (
                                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 anim-fade-in">
                                    <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-3 border-amber-300 shadow-2xl text-center space-y-4 anim-pop">
                                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-amber-300">
                                            ❓
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900">
                                                {t("Sahkan Keluar Kuiz?", "Exit Quiz?")}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                {t(
                                                    "Adakah anda pasti mahu keluar dari kuiz ini sekarang? Markah semasa anda tidak akan disimpan.",
                                                    "Are you sure you want to exit the quiz now? Your current score will not be saved."
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    playAudioFeedback?.("tap");
                                                    setShowExitConfirm(false);
                                                }}
                                                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                                            >
                                                {t("Teruskan Kuiz", "Keep Answering")}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    playAudioFeedback?.("tap");
                                                    setShowExitConfirm(false);
                                                    onResetQuiz();
                                                    onNavigate("quizList");
                                                }}
                                                className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black rounded-xl text-xs border border-rose-200 active:scale-95 transition-all cursor-pointer"
                                            >
                                                {t("Ya, Keluar", "Yes, Exit")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
        );
    }

    return null;
}
