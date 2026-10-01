"use client";

import React from "react";
import {
    GraphicBackArrow,
    GraphicBookOpen,
    GraphicArrowRight,
    GraphicTopicList,
    GraphicLightbulb,
    GraphicRocketLaunch,
} from "./Graphics";
import PlantLearningNotes from "./PlantLearningNotes";

export default function LearningView({
    currentView,
    courseData,
    selectedTopicIndex,
    setSelectedTopicIndex,
    onNavigate,
    onStartQuiz,
    resetQuizState,
    t,
    language = "bm",
    playAudioFeedback,
}) {
    const currentTopic = courseData?.topics?.[selectedTopicIndex] || courseData?.topics?.[0];

    if (currentView === "learningList") {
        return (
            <div className="space-y-6 w-full max-w-lg anim-fade-in">

                                <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3">

                                    <div>

                                        <h2 className="text-xl sm:text-2xl font-black text-[#0099e5] text-left">

                                            {t("Pilih Topik Pembelajaran", "Choose Learning Topic")}

                                        </h2>

                                        <p className="text-xs text-slate-500 text-left mt-0.5">

                                            {t("Pilih topik sains untuk mula membaca & menonton", "Select a science topic to start reading & watching")}

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

                                            className="bg-white border-2 border-[#00acc1]/40 hover:border-[#00acc1] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center sm:text-left group"

                                        >

                                            <div className="flex items-center gap-3.5">

                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 border border-sky-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">

                                                    {topic.graphic}

                                                </div>

                                                <div>

                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${topic.accentBadge}`}>

                                                        {topic.category}

                                                    </span>

                                                    <h3 className="text-base font-black text-[#00838f] mt-1">{topic.title}</h3>

                                                    <p className="text-xs text-slate-500 mt-0.5">

                                                        {t("Nota visual, infografik & video interaktif", "Visual notes, infographics & interactive video")}

                                                    </p>

                                                </div>

                                            </div>

                                            <button

                                                onClick={() => { playAudioFeedback?.("tap"); setSelectedTopicIndex(idx); onNavigate("learningDetail"); resetQuizState(); }}

                                                className="w-full sm:w-auto px-5 py-2.5 btn-3d-blue text-white font-black rounded-xl cursor-pointer text-xs whitespace-nowrap flex items-center justify-center gap-2"

                                            >

                                                <GraphicBookOpen className="w-4 h-4" />

                                                <span>{t("Mula Belajar", "Start Learning")}</span>

                                                <GraphicArrowRight className="w-3.5 h-3.5" />

                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>
        );
    }

    if (currentView === "learningDetail") {
        return (
            <div className="space-y-6 w-full max-w-lg anim-fade-in">

                                <div className="flex items-center justify-between border-b border-[#0099e5]/20 pb-3 w-full">

                                    <div className="flex items-center gap-2.5 truncate mr-2">

                                        <div className="w-8 h-8 shrink-0 flex items-center justify-center">

                                            {currentTopic.graphic}

                                        </div>

                                        <h2 className="text-lg sm:text-xl font-black text-[#0099e5] truncate text-left">

                                            {currentTopic.title}

                                        </h2>

                                    </div>

                                    <button

                                        onClick={() => { playAudioFeedback?.("tap"); onNavigate("learningList"); }}

                                        className="px-3.5 py-2 btn-3d-white text-slate-700 font-bold rounded-xl text-xs cursor-pointer shrink-0 border border-slate-200 flex items-center gap-1.5"

                                    >

                                        <GraphicTopicList className="w-4 h-4 text-slate-600" />

                                        <span>{t("Senarai Topik", "Topic List")}</span>

                                    </button>

                                </div>



                                {/* Infografik Visual Interaktif */}

                                {currentTopic.infographic}



                                {/* Video Player */}

                                <div className="relative bg-slate-950 rounded-3xl overflow-hidden shadow-lg border-2 border-[#0099e5] aspect-video flex items-center justify-center w-full">

                                    <iframe

                                        className="w-full h-full"

                                        src={currentTopic.videoEmbedUrl}

                                        title={currentTopic.title}

                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                                        allowFullScreen

                                    ></iframe>

                                </div>



                                <div className="text-center">

                                    <a

                                        href={currentTopic.videoRawUrl}

                                        target="_blank"

                                        rel="noopener noreferrer"

                                        className="text-xs text-[#0099e5] hover:text-[#007bb8] font-bold underline bg-[#0099e5]/10 px-4 py-2 rounded-xl border border-[#0099e5]/30 inline-block transition-all hover:scale-102"

                                    >

                                        {t("🔗 Buka Video Ini Terus di YouTube ↗", "🔗 Open This Video Directly on YouTube ↗")}

                                    </a>

                                </div>



                                {/* Nota Card */}

                                <div className="bg-[#ffa726]/10 border-l-6 border-[#ffa726] p-5 rounded-r-2xl border-y border-r border-[#ffa726]/30 text-left shadow-sm">

                                    <h3 className="font-black text-[#e65100] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">

                                        <GraphicLightbulb className="w-5 h-5 text-amber-500" />

                                        <span>{t("Nota Pembelajaran", "Learning Notes")}</span>

                                    </h3>

                                    <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">

                                        {currentTopic.content}

                                    </p>

                                </div>

                                {/* Nota Anatomi Pokok & Fakta Sains Khas untuk Topik 2 (Tumbuhan & Alam) */}
                                {currentTopic.id === "topic-2" && (
                                    <PlantLearningNotes
                                        t={t}
                                        language={language}
                                        playAudioFeedback={playAudioFeedback}
                                    />
                                )}

                                {/* Bottom actions */}

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 w-full">

                                    <button

                                        onClick={() => { playAudioFeedback?.("tap"); onNavigate("learningList"); }}

                                        className="w-full sm:w-auto px-4 py-2.5 btn-3d-white text-slate-700 font-bold rounded-xl text-xs cursor-pointer border border-slate-200 flex items-center justify-center gap-2"

                                    >

                                        <GraphicBackArrow className="w-4 h-4 text-slate-600" />

                                        <span>{t("Topik Lain", "Other Topics")}</span>

                                    </button>

                                    <button

                                        onClick={() => { playAudioFeedback?.("start"); onStartQuiz(selectedTopicIndex); }}

                                        className="w-full sm:w-auto px-6 py-3 btn-3d-pink text-white font-black rounded-xl text-sm cursor-pointer flex items-center justify-center gap-2"

                                    >

                                        <GraphicRocketLaunch className="w-5 h-5" />

                                        <span>{t("Selesai Belajar, Jom Kuiz!", "Finished Learning, Take Quiz!")}</span>

                                        <GraphicArrowRight className="w-4 h-4" />

                                    </button>

                                </div>

                            </div>
        );
    }

    return null;
}
