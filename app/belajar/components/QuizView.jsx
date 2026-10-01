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

                                <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">

                                    <div>

                                        <h2 className="text-xl sm:text-2xl font-black text-[#e65100] text-left">

                                            {t("Pilih Topik Kuiz", "Choose Quiz Topic")}

                                        </h2>

                                        <p className="text-xs text-slate-500 text-left mt-0.5">

                                            {t("Pilih topik untuk membaca peraturan & memulakan kuiz", "Select a topic to read the rules & start the quiz")}

                                        </p>

                                    </div>

                                    <button

                                        onClick={() => { playAudioFeedback?.("tap"); onNavigate("menu"); }}

                                        className="px-4 py-2.5 btn-3d-white text-slate-700 font-black rounded-xl text-xs cursor-pointer flex items-center gap-2 border border-slate-200"

                                    >

                                        <GraphicBackArrow className="w-4 h-4 text-slate-600" />

                                        <span>{t("Kembali", "Back")}</span>

                                    </button>

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

                                                className="w-full sm:w-auto px-5 py-2.5 btn-3d-orange text-slate-950 font-black rounded-xl cursor-pointer text-xs whitespace-nowrap flex items-center justify-center gap-2"

                                            >

                                                <GraphicLightningBolt className="w-4 h-4" />

                                                <span>{t("Pilih Kuiz", "Start Quiz")}</span>

                                                <GraphicArrowRight className="w-3.5 h-3.5" />

                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>
        );
    }

    if (currentView === "quizRules") {
        return (
            <div className="space-y-6 w-full max-w-lg text-center">



                                {/* Top Badge & Maskot Robot */}

                                <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-3xl border-2 border-amber-200 shadow-sm cursor-default select-none">

                                    <div className="shrink-0">

                                        <GraphicMascotRobot className="w-14 h-14" />

                                    </div>

                                    <div className="text-left">

                                        <span className="text-[10px] font-black uppercase text-[#e65100] bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">

                                            {t("Panduan Kuiz", "Quiz Guide")}

                                        </span>

                                        <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">

                                            {t(

                                                "“Kekal tenang! Fikir pantas kerana anda ada 20 saat untuk setiap soalan!”",

                                                "“Stay calm! Think fast because you have 20 seconds for each question!”"

                                            )}

                                        </p>

                                    </div>

                                </div>



                                <div className="space-y-1">

                                    <h2 className="text-2xl sm:text-3xl font-black text-[#0099e5]">

                                        {t("Bersedia Untuk Kuiz?", "Ready For The Quiz?")}

                                    </h2>

                                    <p className="text-xs sm:text-sm text-slate-600">

                                        {t(

                                            "Sila baca peraturan kuiz di bawah sebelum melancarkan misi anda!",

                                            "Please read the quiz rules below before launching your mission!"

                                        )}

                                    </p>

                                </div>



                                {/* Selected Topic Pill */}

                                <div className="bg-[#0099e5]/10 border-2 border-[#0099e5]/30 p-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-inner cursor-default select-none">

                                    <div className="w-8 h-8 flex items-center justify-center">

                                        {currentTopic.graphic}

                                    </div>

                                    <span className="font-black text-[#007bb8] text-sm sm:text-base">

                                        {currentTopic.title}

                                    </span>

                                </div>



                                {/* Rules Cards Grid (Statik & Tidak Nampak Boleh Ditekan) */}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left cursor-default select-none">

                                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-200/90 shadow-xs flex items-start gap-3">

                                        <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">

                                            <GraphicStopwatch className="w-7 h-7" />

                                        </div>

                                        <div>

                                            <h4 className="text-xs font-black text-sky-800 uppercase tracking-wide flex items-center gap-1.5">

                                                <span>{t("Masa 20 Saat", "20 Seconds Time")}</span>

                                                <span className="bg-sky-100 text-sky-700 text-[9px] px-1.5 py-0.2 rounded-full font-black">20s</span>

                                            </h4>

                                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">

                                                {t(

                                                    "Setiap soalan diberikan masa 20 saat sahaja. Masa anda menentukan bonus kelajuan!",

                                                    "Each question is given only 20 seconds. Your remaining time determines the speed bonus!"

                                                )}

                                            </p>

                                        </div>

                                    </div>



                                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-200/90 shadow-xs flex items-start gap-3">

                                        <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">

                                            <GraphicTarget className="w-7 h-7" />

                                        </div>

                                        <div>

                                            <h4 className="text-xs font-black text-amber-800 uppercase tracking-wide">

                                                {t("1 Percubaan", "1 Attempt")}

                                            </h4>

                                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">

                                                {t(

                                                    "Pilih 1 jawapan sahaja. Pilihan dikunci sebaik ditekan.",

                                                    "Choose 1 answer only. Selection is locked once clicked."

                                                )}

                                            </p>

                                        </div>

                                    </div>



                                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-200/90 shadow-xs flex items-start gap-3">

                                        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">

                                            <GraphicGrandTrophy className="w-7 h-7" />

                                        </div>

                                        <div>

                                            <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">

                                                <span>{t("Skor Ikut Kelajuan", "Speed-Based Score")}</span>

                                                <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded-full font-black">Maks 1,500</span>

                                            </h4>

                                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">

                                                {t(

                                                    "Makin cepat anda jawab, makin banyak mata! Asas 100 mata + Bonus pantas sehingga 200 mata per soalan!",

                                                    "The faster you answer, the more points! Base 100 points + Speed bonus up to 200 points per question!"

                                                )}

                                            </p>

                                        </div>

                                    </div>



                                    <div className="bg-white p-4 rounded-2xl border-2 border-slate-200/90 shadow-xs flex items-start gap-3">

                                        <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">

                                            <GraphicLightbulb className="w-7 h-7" />

                                        </div>

                                        <div>

                                            <h4 className="text-xs font-black text-purple-800 uppercase tracking-wide">

                                                {t("Semakan Jawapan", "Answer Review")}

                                            </h4>

                                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">

                                                {t(

                                                    "Semakan jawapan betul dan skor kelajuan disediakan di akhir kuiz.",

                                                    "Review of correct answers and speed score is provided at the end."

                                                )}

                                            </p>

                                        </div>

                                    </div>

                                </div>



                                {/* Banner Formula Skor Kelajuan (Statik) */}

                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/90 p-3 sm:p-3.5 rounded-2xl text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs cursor-default select-none">

                                    <div className="flex items-center gap-2">

                                        <span className="text-xl">⚡</span>

                                        <div>

                                            <span className="text-xs font-black text-amber-950 block">

                                                {t("Formula Kiraan Skor:", "Score Calculation Formula:")}

                                            </span>

                                            <span className="text-[11px] text-amber-800 font-bold">

                                                {t("100 Mata Asas + (Masa Baki × 10 Bonus Mata)", "100 Base Points + (Remaining Seconds × 10 Bonus Points)")}

                                            </span>

                                        </div>

                                    </div>

                                    <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-xl shadow-xs self-start sm:self-center whitespace-nowrap">

                                        {t("Sehingga 300 Mata / Soalan", "Up to 300 Pts / Question")}

                                    </span>

                                </div>



                                {/* BUTTON MULA KUIZ DENGAN GRAFIK MENARIK & 3D TACTILE FEEL */}

                                <div className="pt-2 space-y-3">

                                    <button

                                        onClick={onStartQuiz}

                                        className="w-full relative overflow-hidden py-4 px-6 btn-3d-pink text-white font-black text-base sm:text-lg rounded-2xl cursor-pointer flex items-center justify-center gap-3 border-t-2 border-white/40 group"

                                    >

                                        <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">

                                            <GraphicRocketLaunch className="w-8 h-8" />

                                        </div>

                                        <span className="tracking-wide">{t("MULA KUIZ SEKARANG!", "START QUIZ NOW!")}</span>

                                        <GraphicArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />

                                    </button>



                                    <button

                                        onClick={() => { playAudioFeedback?.("tap"); onNavigate("quizList"); }}

                                        className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto border border-slate-200 shadow-sm"

                                    >

                                        <GraphicBackArrow className="w-3.5 h-3.5" />

                                        <span>{t("Pilih Topik Lain", "Choose Other Topic")}</span>

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

                                    <div className="space-y-6 w-full anim-fade-in relative">



                                        {/* Confetti Particles */}

                                        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

                                            <div className="absolute top-2 left-6 w-3 h-3 bg-amber-400 rounded-sm" style={{ animation: "confettiShower 2s ease-out infinite" }} />

                                            <div className="absolute top-0 left-1/4 w-2 h-4 bg-sky-400 rotate-45" style={{ animation: "confettiShower 2.5s ease-out infinite 0.2s" }} />

                                            <div className="absolute top-2 left-1/2 w-3 h-2 bg-pink-500 rounded-full" style={{ animation: "confettiShower 2.2s ease-out infinite 0.5s" }} />

                                            <div className="absolute top-0 right-1/4 w-3 h-3 bg-emerald-400 rotate-12" style={{ animation: "confettiShower 2.4s ease-out infinite 0.3s" }} />

                                            <div className="absolute top-3 right-8 w-2 h-3 bg-yellow-400 rounded-sm" style={{ animation: "confettiShower 2.1s ease-out infinite 0.7s" }} />

                                        </div>



                                        {/* Trophy & Score Card */}

                                        <div className="text-center py-8 px-6 space-y-3 bg-gradient-to-b from-[#00acc1]/10 via-[#00acc1]/20 to-white rounded-3xl border-3 border-[#00acc1] shadow-lg relative overflow-hidden">



                                            <div className="flex justify-center items-center gap-3 anim-float">

                                                <GraphicMascotRobot className="w-16 h-16" expression="celebrate" />

                                                <GraphicGrandTrophy className="w-24 h-24" />

                                            </div>



                                            <div className="inline-block bg-[#00acc1] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">

                                                {t("Misi Selesai!", "Mission Complete!")}

                                            </div>



                                            <h3 className="text-2xl sm:text-3xl font-black text-[#00838f]">

                                                {t("Tahniah! Anda Selesai!", "Congratulations! You Finished!")}

                                            </h3>



                                            {/* Grand Speed Score Badge */}

                                            <div className="py-2 space-y-2">

                                                <div className="inline-flex flex-col items-center justify-center bg-white px-8 py-3.5 rounded-3xl shadow-md border-3 border-[#00acc1]">

                                                    <div className="flex items-baseline gap-2">

                                                        <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">

                                                            {quizTotalPoints}

                                                        </span>

                                                        <span className="text-xs sm:text-sm font-black text-slate-400 uppercase">

                                                            / 1,500 PTS

                                                        </span>

                                                    </div>

                                                    <span className="text-[11px] font-extrabold text-[#00838f] uppercase tracking-wider">

                                                        {t("Skor Kelajuan STEM", "STEM Speed Score")}

                                                    </span>

                                                </div>



                                                {/* Accuracy & Breakdown Pills */}

                                                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">

                                                    <span className="text-xs font-black bg-sky-100 text-sky-800 px-3 py-1 rounded-xl border border-sky-200 flex items-center gap-1.5 shadow-xs">

                                                        <span>🎯</span>

                                                        <span>{scoreCount} / {currentTopic.questions.length} {t("Betul", "Correct")} ({scorePercentage}%)</span>

                                                    </span>

                                                    <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-1.5 shadow-xs">

                                                        <span>⚡</span>

                                                        <span>{t("Bonus Pantas:", "Speed Bonus:")} +{Math.max(0, quizTotalPoints - (scoreCount * 100))} PTS</span>

                                                    </span>

                                                </div>

                                            </div>



                                            <p className="text-slate-700 font-bold text-sm">

                                                {quizTotalPoints >= 1350

                                                    ? t("⚡ Refleks Kilat! Anda menjawab dengan sepantas kilat dan sangat tepat! Genius STEM Sejati!", "⚡ Lightning Reflexes! You answered with lightning speed and great precision! True STEM Genius!")

                                                    : quizTotalPoints >= 1000

                                                        ? t("🚀 Fikiran Pantas! Skor kelajuan anda sangat mengagumkan! Calon Juara STEM!", "🚀 Speed Thinker! Your speed score is impressive! STEM Champion Candidate!")

                                                        : scoreCount >= 3

                                                            ? t("👏 Pencapaian cemerlang! Cuba jawab lebih pantas lagi untuk kumpul markah maksimum!", "👏 Outstanding achievement! Try answering even faster to collect maximum marks!")

                                                            : t("💪 Jangan berputus asa! Ulangkaji semula nota dan uji ketangkasan minda anda sekali lagi!", "💪 Don't give up! Review the notes and test your mental agility once more!")}

                                            </p>

                                        </div>



                                        {/* Detailed Answer Review with Speed Points */}

                                        <div className="space-y-3 w-full text-left">

                                            <h4 className="font-black text-slate-700 text-sm flex items-center justify-between">

                                                <span>{t("Semakan Jawapan & Mata Kelajuan:", "Answer Review & Speed Points:")}</span>

                                                <span className="text-xs text-slate-500 font-normal">

                                                    {t(`${scoreCount} daripada ${currentTopic.questions.length} betul`, `${scoreCount} of ${currentTopic.questions.length} correct`)}

                                                </span>

                                            </h4>



                                            {currentTopic.questions.map((q, idx) => {

                                                const userAns = selectedAnswers[idx];

                                                const isCorrect = userAns === q.correctAnswer;

                                                const wasTimeout = userAns === "__TIMEOUT__";

                                                const reward = questionRewards[idx] || { pointsEarned: 0, speedBonus: 0, timeLeft: 0, timeSpent: 20 };



                                                return (

                                                    <div

                                                        key={idx}

                                                        className={`p-4 rounded-2xl border-2 transition-all shadow-sm ${isCorrect

                                                            ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"

                                                            : wasTimeout

                                                                ? "bg-amber-50/80 border-amber-300 text-amber-950"

                                                                : "bg-rose-50/80 border-rose-300 text-rose-950"

                                                            }`}

                                                    >

                                                        <div className="flex items-start justify-between gap-2">

                                                            <p className="font-black text-sm mb-1">

                                                                {idx + 1}. {q.question}

                                                            </p>

                                                            <div className="flex items-center gap-1.5 shrink-0">

                                                                {isCorrect ? (

                                                                    <span className="bg-emerald-200 text-emerald-900 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">

                                                                        <span>⚡</span>

                                                                        <span>+{reward.pointsEarned} PTS</span>

                                                                    </span>

                                                                ) : (

                                                                    <span className="bg-slate-200 text-slate-700 font-bold text-xs px-2 py-0.5 rounded-full">

                                                                        0 PTS

                                                                    </span>

                                                                )}

                                                                <span className="text-base font-bold">

                                                                    {isCorrect ? "✓" : wasTimeout ? "⏱️" : "✕"}

                                                                </span>

                                                            </div>

                                                        </div>



                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mt-1">

                                                            <p>

                                                                {t("Jawapan anda:", "Your answer:")}{" "}

                                                                <span className="font-bold">

                                                                    {wasTimeout ? t("Masa Tamat (Tiada Jawapan)", "Time's Up (No Answer)") : userAns || t("Tiada", "None")}

                                                                </span>

                                                            </p>

                                                            {isCorrect && (

                                                                <span className="text-emerald-800 font-bold">

                                                                    • {t(`Dijawab dalam ${reward.timeSpent || (20 - reward.timeLeft)}s (+${reward.speedBonus} bonus pantas)`, `Answered in ${reward.timeSpent || (20 - reward.timeLeft)}s (+${reward.speedBonus} speed bonus)`)}

                                                                </span>

                                                            )}

                                                        </div>



                                                        {!isCorrect && (

                                                            <p className="text-xs mt-1 text-emerald-800 font-bold bg-white/70 p-2 rounded-xl inline-block border border-emerald-200">

                                                                {t("Jawapan Betul:", "Correct Answer:")} {q.correctAnswer}

                                                            </p>

                                                        )}

                                                    </div>

                                                );

                                            })}

                                        </div>



                                        {/* Actions with 3D tactile buttons */}
                                        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                                            <button
                                                onClick={() => { onResetQuiz(); onNavigate("quizRules"); }}
                                                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
                                            >
                                                <span>✅</span>
                                                <span>{t("Selesai", "Done")}</span>
                                            </button>

                                            <button
                                                onClick={() => { onResetQuiz(); onNavigate("quizRules"); }}
                                                className="px-5 py-3 btn-3d-blue text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                                            >

                                                <GraphicRefresh className="w-4 h-4" />

                                                <span>{t("Cuba Kuiz Semula", "Retake Quiz")}</span>

                                            </button>

                                            <button

                                                onClick={() => { onResetQuiz(); onNavigate("learningDetail"); }}

                                                className="px-5 py-3 btn-3d-orange text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"

                                            >

                                                <GraphicScienceBook className="w-4 h-4" />

                                                <span>{t("Ulangkaji Nota", "Review Notes")}</span>

                                            </button>

                                            <button

                                                onClick={() => { onResetQuiz(); onNavigate("menu"); }}

                                                className="px-5 py-3 btn-3d-white text-slate-700 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-200"

                                            >

                                                <GraphicHomeButton className="w-4 h-4" />

                                                <span>{t("Menu Utama", "Main Menu")}</span>

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
