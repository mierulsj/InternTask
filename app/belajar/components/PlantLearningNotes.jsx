"use client";

import React, { useState } from "react";
import { GraphicNatureLeaf, GraphicLightbulb } from "./Graphics";

/* =========================================================================
   ANATOMY DATA FOR LEARNING NOTES
   ========================================================================= */

const PLANT_ANATOMY_PARTS = [
    {
        id: "bunga",
        nameBM: "Bunga",
        nameEN: "Flower",
        icon: "🌸",
        badgeColor: "bg-pink-100 text-pink-700 border-pink-300",
        roleBM: "Organ Pembiakan & Penarik Serangga",
        roleEN: "Reproductive Organ & Pollinator Magnet",
        descBM: "Bunga mengandungi kelopak berwarna-warni yang berbau harum untuk menarik serangga seperti lebah dan rama-rama. Proses pendebungaan membolehkan bunga menghasilkan buah dan biji benih bagi memastikan kemandirian spesies pokok.",
        descEN: "Flowers feature colorful, fragrant petals to attract pollinators like bees and butterflies. Pollination enables fertilization to form fruits and seeds, ensuring the plant species survives.",
        funFactBM: "Bunga Rafflesia di Malaysia adalah antara bunga tunggal terbesar di dunia dan tidak mempunyai daun atau akar sebenar!",
        funFactEN: "The Rafflesia flower in Malaysia is among the largest single flowers in the world and has no true leaves or roots!",
    },
    {
        id: "daun",
        nameBM: "Daun",
        nameEN: "Leaf",
        icon: "🍃",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
        roleBM: "Dapur Utama & Pusat Fotosintesis",
        roleEN: "Primary Kitchen & Photosynthesis Hub",
        descBM: "Daun mengandungi pigmen hijau klorofil yang menangkap tenaga cahaya matahari. Melalui liang stoma mikroskopik di bawah daun, pokok menyerap gas karbon dioksida (CO₂) dari udara dan membebaskan gas oksigen (O₂) bersih ke persekitaran.",
        descEN: "Leaves contain green chlorophyll pigments that capture sunlight. Through microscopic stomata on the underside of leaves, plants absorb CO₂ from the air and release pure oxygen gas into the atmosphere.",
        funFactBM: "Klorofil menyerap cahaya merah dan biru dari matahari tetapi memantulkan cahaya hijau, itulah sebabnya daun kelihatan hijau di mata kita!",
        funFactEN: "Chlorophyll absorbs red and blue light waves from the sun but reflects green light, which is why leaves appear green to our eyes!",
    },
    {
        id: "buah",
        nameBM: "Buah / Biji",
        nameEN: "Fruit / Seed",
        icon: "🍎",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        roleBM: "Pelindung & Penyebar Biji Benih",
        roleEN: "Seed Protector & Dispersal Vehicle",
        descBM: "Buah terbentuk daripada ovari bunga yang telah disenyawakan. Isinya yang manis dan berkhasiat menarik haiwan untuk memakannya, lalu menyebarkan biji benih pokok ke kawasan baharu yang jauh.",
        descEN: "Fruits develop from fertilized flower ovaries. Their sweet, nutritious flesh entices animals to eat them, dispersing the plant's seeds across vast new territories.",
        funFactBM: "Ada biji benih yang disebarkan melalui angin (seperti biji lalang), air (kelapa), atau letupan mekanikal (buah getah)!",
        funFactEN: "Seeds can be dispersed by wind (dandelions), water (coconuts), or explosive mechanisms (rubber seed pods)!",
    },
    {
        id: "batang",
        nameBM: "Batang",
        nameEN: "Stem",
        icon: "🪵",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
        roleBM: "Sokongan Pokok & Lebuhraya Vaskular",
        roleEN: "Structural Support & Vascular Highway",
        descBM: "Batang menyokong ranting, daun, dan bunga agar mendapat cahaya matahari yang optimum. Di dalam batang terdapat dua tiub saluran vaskular: Salur Xilem (membawa air & garam mineral dari akar ke daun) dan Salur Floem (membawa glukosa dari daun ke seluruh pokok).",
        descEN: "The stem supports branches, leaves, and flowers toward optimal sunlight. Inside run two vascular highways: Xylem (carries water & minerals from roots up to leaves) and Phloem (transports glucose food from leaves to all plant parts).",
        funFactBM: "Pokok kayu keras seperti Merbau dan Cengal mempunyai gelang tahunan pada batangnya yang menunjukkan usia sebenar pokok!",
        funFactEN: "Hardwood trees produce annual growth rings inside their trunks that accurately reveal the tree's exact age in years!",
    },
    {
        id: "akar",
        nameBM: "Akar",
        nameEN: "Roots",
        icon: "🥕",
        badgeColor: "bg-amber-50 text-amber-950 border-amber-200",
        roleBM: "Pencengkam Tanah & Penyerap Air/Mineral",
        roleEN: "Soil Anchor & Water/Mineral Absorber",
        descBM: "Akar mencengkam tanah dengan kukuh agar pokok tidak tumbang ditiup angin kencang. Rerambut halus pada akar menyerap air dan garam mineral penting (seperti Nitrogen, Fosforus & Kalium) dari dalam tanah.",
        descEN: "Roots anchor the plant firmly into the earth against harsh winds. Microscopic root hairs absorb essential water and dissolved minerals (such as Nitrogen, Phosphorus & Potassium) from deep within the soil.",
        funFactBM: "Terdapat dua jenis sistem akar utama dalam sains: Akar Tunjang (cth: pokok mangga, durian) dan Akar Serabut (cth: pokok jagung, rumput, padi)!",
        funFactEN: "There are two primary root systems in botanical science: Taproot systems (mango, durian) and Fibrous root systems (corn, grass, rice)!",
    },
];

/* =========================================================================
   COMPONENT: PLANT LEARNING NOTES
   ========================================================================= */

export default function PlantLearningNotes({ t, language = "bm", playAudioFeedback }) {
    const isEn = language === "en";
    const [selectedPartId, setSelectedPartId] = useState("daun");

    const selectedPart = PLANT_ANATOMY_PARTS.find((p) => p.id === selectedPartId) || PLANT_ANATOMY_PARTS[1];

    const translate = (bm, en) => {
        if (typeof t === "function") return t(bm, en);
        return isEn ? en : bm;
    };

    return (
        <div className="space-y-6 w-full text-slate-800 anim-fade-in pt-2">
            {/* 1. SECTION: ANATOMI TUMBUHAN (INTERACTIVE DIAGRAM & CALLOUTS) */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl p-5 sm:p-6 border-2 border-emerald-300 shadow-sm text-left space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-xs">
                            🌿
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                                {translate("Nota Visual Biologi", "Biology Visual Notes")}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-slate-800 mt-0.5">
                                {translate("Anatomi 5 Bahagian Utama Tumbuhan", "Anatomy of the 5 Main Plant Parts")}
                            </h3>
                        </div>
                    </div>
                    <span className="text-xs text-slate-500 font-bold hidden sm:inline-block">
                        {translate("Ketik bahagian untuk teroka", "Tap a part to explore")}
                    </span>
                </div>

                {/* Interactive Selector Pill Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    {PLANT_ANATOMY_PARTS.map((part) => {
                        const isSelected = selectedPartId === part.id;
                        return (
                            <button
                                key={part.id}
                                type="button"
                                onClick={() => {
                                    playAudioFeedback?.("pick");
                                    setSelectedPartId(part.id);
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border-2 ${
                                    isSelected
                                        ? "bg-emerald-600 text-white border-emerald-700 shadow-md scale-105 ring-2 ring-emerald-300"
                                        : "bg-white hover:bg-emerald-50 text-slate-700 border-slate-200 hover:border-emerald-300 shadow-2xs"
                                }`}
                            >
                                <span className="text-base">{part.icon}</span>
                                <span>{translate(part.nameBM, part.nameEN)}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Plant Part Detail Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-200/90 shadow-xs space-y-3 anim-pop">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2.5">
                            <span className="text-3xl p-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                                {selectedPart.icon}
                            </span>
                            <div>
                                <h4 className="text-base font-black text-slate-900 leading-tight">
                                    {translate(selectedPart.nameBM, selectedPart.nameEN)}
                                </h4>
                                <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                                    🎯 {translate(selectedPart.roleBM, selectedPart.roleEN)}
                                </span>
                            </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${selectedPart.badgeColor}`}>
                            {translate("Fungsi Utama", "Core Function")}
                        </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {translate(selectedPart.descBM, selectedPart.descEN)}
                    </p>

                    {/* Fun Fact Callout */}
                    <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs text-amber-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-black text-amber-800 text-[11px] uppercase tracking-wide">
                            <GraphicLightbulb className="w-4 h-4 text-amber-500" />
                            <span>{translate("Tahukah Anda?", "Did You Know?")}</span>
                        </div>
                        <p className="leading-snug">
                            {translate(selectedPart.funFactBM, selectedPart.funFactEN)}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. SECTION: FORMULA FOTOSINTESIS */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white p-5 sm:p-6 rounded-3xl border-2 border-emerald-400/40 shadow-inner text-left space-y-3.5">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-500/30">
                        {translate("Persamaan Biokimia", "Biochemical Equation")}
                    </span>
                    <span className="text-xs text-amber-300 font-bold">
                        {translate("Topik Wajib Sains Sekolah", "Core Science Syllabus")}
                    </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-amber-300 leading-tight">
                    {translate("Formula Fotosintesis (Bagaimana Tumbuhan Menghasilkan Makanan)", "Photosynthesis Equation (How Plants Produce Food)")}
                </h3>

                {/* Equation Badges */}
                <div className="bg-emerald-950/80 p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 text-xs sm:text-sm font-black text-center text-emerald-100 flex flex-wrap items-center justify-center gap-2 shadow-inner">
                    <span className="bg-sky-500/30 px-3 py-1.5 rounded-xl text-sky-200 border border-sky-400/30 flex items-center gap-1.5">
                        <span>💧</span>
                        <span>{translate("Air (H₂O)", "Water")}</span>
                    </span>
                    <span className="text-slate-400 text-base">+</span>
                    <span className="bg-purple-500/30 px-3 py-1.5 rounded-xl text-purple-200 border border-purple-400/30 flex items-center gap-1.5">
                        <span>💨</span>
                        <span>{translate("Karbon Dioksida (CO₂)", "Carbon Dioxide")}</span>
                    </span>
                    <span className="text-slate-400 text-base">+</span>
                    <span className="bg-amber-500/30 px-3 py-1.5 rounded-xl text-amber-200 border border-amber-400/30 flex items-center gap-1.5">
                        <span>☀️</span>
                        <span>{translate("Cahaya Matahari", "Sunlight")}</span>
                    </span>
                    <span className="text-amber-400 text-lg">➔</span>
                    <span className="bg-emerald-500/40 px-3 py-1.5 rounded-xl text-emerald-200 border border-emerald-400/40 flex items-center gap-1.5">
                        <span>🍯</span>
                        <span>{translate("Glukosa (Makanan)", "Glucose (Food)")}</span>
                    </span>
                    <span className="text-slate-400 text-base">+</span>
                    <span className="bg-teal-500/40 px-3 py-1.5 rounded-xl text-teal-200 border border-teal-400/40 flex items-center gap-1.5">
                        <span>🫧</span>
                        <span>{translate("Gas Oksigen (O₂)", "Oxygen Gas")}</span>
                    </span>
                </div>

                <p className="text-xs text-emerald-200/90 leading-relaxed font-medium pt-1">
                    {translate(
                        "Air diserap oleh akar dari tanah, karbon dioksida diserap melalui stoma daun, dan klorofil menangkap foton cahaya matahari untuk mensintesis glukosa. Hasil sampingan paling berharga ialah gas oksigen bersih yang kita hirup setiap hari.",
                        "Water is absorbed by roots from soil, carbon dioxide enters through leaf stomata, and chlorophyll captures sunlight photons to synthesize glucose. The most precious byproduct is clean oxygen gas that we breathe every second."
                    )}
                </p>
            </div>

            {/* 3. SECTION: FAKTA SAINS BOTANIK MENAKJUBKAN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-2 hover:border-emerald-400 transition-colors">
                    <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2 bg-emerald-50 rounded-2xl border border-emerald-200">🌳</span>
                        <div>
                            <h4 className="text-sm font-black text-emerald-900 leading-tight">
                                {translate("Paru-Paru Planet Bumi", "The Lungs of Planet Earth")}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Ekologi & Oksigen</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        {translate(
                            "Hutan hujan tropika seperti Hutan Belum dan Hutan Amazon menyerap berbilion tan gas rumah hijau karbon dioksida setiap tahun dan membebaskan oksigen bersih untuk hidupan bernafas.",
                            "Tropical rainforests like Royal Belum and the Amazon absorb billions of tons of greenhouse CO₂ annually, recharging Earth's atmospheric oxygen supply."
                        )}
                    </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-emerald-200 shadow-xs space-y-2 hover:border-emerald-400 transition-colors">
                    <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2 bg-emerald-50 rounded-2xl border border-emerald-200">🧪</span>
                        <div>
                            <h4 className="text-sm font-black text-emerald-900 leading-tight">
                                {translate("Sistem Xilem & Floem", "Xylem & Phloem Highway")}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Pengangkutan Tumbuhan</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        {translate(
                            "Pokok tidak mempunyai jantung, tetapi menggunakan tarikan transpirasi untuk menarik air setinggi 100 meter ke pucuk melalui salur Xilem, manakala Floem mengagihkan glukosa ke buah dan akar.",
                            "Plants lack a pumping heart, yet utilize transpiration pull to draw water up to 100 meters high through Xylem vessels, while Phloem distributes glucose to fruits and roots."
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
