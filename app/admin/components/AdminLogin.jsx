"use client";

import React from "react";

export default function AdminLogin({
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    errorMessage,
    isLocked,
    lockoutRemaining,
    onEmergencyUnlock,
    onSubmit,
}) {
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, "0");
        const s = (secs % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <main className="w-full max-w-sm mx-auto my-auto px-4 py-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-4">
                <div className="text-center space-y-1">
                    <img
                        src="/logoexploria.png"
                        alt="Logo Exploria"
                        className="h-12 mx-auto object-contain mb-2 drop-shadow-xs"
                    />
                    <h2 className="text-lg font-black text-slate-900">Log Masuk Pentadbir</h2>
                    <p className="text-xs text-slate-500">Portal Pengurusan STEM Exploria</p>
                </div>

                {isLocked ? (
                    <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-center space-y-2">
                        <span className="text-xs font-black text-red-700">AKAUN DIKUNCI (5 KALI GAGAL)</span>
                        <div className="font-mono text-lg font-black text-red-600">
                            {formatTime(lockoutRemaining)}
                        </div>
                        <button
                            type="button"
                            onClick={onEmergencyUnlock}
                            className="text-[11px] text-cyan-600 hover:text-cyan-800 underline font-bold cursor-pointer"
                        >
                            Nyahkunci Demo
                        </button>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-3">
                        {errorMessage && (
                            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-bold">
                                {errorMessage}
                            </div>
                        )}

                        <div className="space-y-1 text-left">
                            <label className="text-xs font-bold text-slate-700">E-mel Pentadbir</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@exploria.com"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                            />
                        </div>

                        <div className="space-y-1 text-left">
                            <label className="text-xs font-bold text-slate-700">Kata Laluan</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 active:scale-98 text-white font-bold text-xs rounded-lg transition-all cursor-pointer disabled:opacity-50 mt-1 shadow-sm"
                        >
                            {isLoading ? "Menyemak..." : "Log Masuk Pentadbir"}
                        </button>

                        <div className="pt-2 text-center text-[11px] text-slate-400 font-mono">
                            Bcrypt Hash • Anti Brute-force (5x) • 2FA
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}
