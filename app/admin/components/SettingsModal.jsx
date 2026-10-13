"use client";

import React, { useState } from "react";

export default function SettingsModal({
    isOpen = false,
    adminSession = null,
    onClose,
}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

    if (!isOpen) return null;

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setStatusMessage({ type: "", text: "" });

        if (!currentPassword || !newPassword || !confirmPassword) {
            setStatusMessage({ type: "error", text: "Sila lengkapkan semua ruangan." });
            return;
        }

        if (newPassword.length < 6) {
            setStatusMessage({ type: "error", text: "Kata laluan baharu sekurang-kurangnya 6 aksara." });
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatusMessage({ type: "error", text: "Kata laluan baharu tidak sepadan." });
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminSession?.token}`,
                },
                body: JSON.stringify({
                    email: adminSession?.email || "mierulsj@gmail.com",
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await res.json();
            if (data.success) {
                setStatusMessage({ type: "success", text: "Kata laluan berjaya ditukar." });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setStatusMessage({ type: "error", text: data.error || "Gagal menukar kata laluan." });
            }
        } catch {
            setStatusMessage({ type: "error", text: "Ralat sambungan pelayan." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 anim-fade-in text-left select-none"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-xl border border-slate-200 text-slate-800 space-y-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Ringkas */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                        <h3 className="text-base font-black text-slate-900">
                            Tetapan Pentadbir
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Akaun dan keselamatan portal.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Info Pentadbir */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500">E-mel:</span>
                        <span className="font-mono font-bold text-slate-900">{adminSession?.email || "admin@exploria.com"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500">Peranan:</span>
                        <span className="font-bold text-slate-700">Super Administrator</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500">2FA OTP:</span>
                        <span className="font-bold text-slate-700">Aktif</span>
                    </div>
                </div>

                {/* Borang Tukar Kata Laluan */}
                <form onSubmit={handleChangePassword} className="space-y-3 pt-1 text-xs">
                    <span className="font-bold text-slate-900 block">
                        Tukar Kata Laluan
                    </span>

                    {statusMessage.text && (
                        <div
                            className={`p-2 rounded-lg text-xs font-bold text-center border ${
                                statusMessage.type === "success"
                                    ? "bg-slate-100 text-slate-800 border-slate-300"
                                    : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                        >
                            {statusMessage.text}
                        </div>
                    )}

                    <div>
                        <label className="text-slate-600 block mb-1">
                            Kata Laluan Semasa
                        </label>
                        <input
                            type="password"
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-slate-800 transition-all font-mono"
                        />
                    </div>

                    <div>
                        <label className="text-slate-600 block mb-1">
                            Kata Laluan Baharu
                        </label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Min 6 aksara"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-slate-800 transition-all font-mono"
                        />
                    </div>

                    <div>
                        <label className="text-slate-600 block mb-1">
                            Sahkan Kata Laluan Baharu
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Min 6 aksara"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white focus:border-slate-800 transition-all font-mono"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
                        >
                            Tutup
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold rounded-lg cursor-pointer transition-all disabled:opacity-50"
                        >
                            {isLoading ? "Menyimpan..." : "Simpan Kata Laluan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
