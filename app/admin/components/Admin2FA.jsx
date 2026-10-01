"use client";

import React from "react";

export default function Admin2FA({
    otpInput,
    setOtpInput,
    demoOtp,
    otpError,
    isLoading,
    onSubmit,
    onCancel,
}) {
    return (
        <main className="w-full max-w-sm mx-auto my-auto px-4 py-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-4">
                <div className="text-center space-y-1">
                    <img
                        src="/logoexploria.png"
                        alt="Logo Exploria"
                        className="h-10 mx-auto object-contain mb-1 drop-shadow-xs"
                    />
                    <h2 className="text-lg font-black text-slate-900">Pengesahan 2FA</h2>
                    <p className="text-xs text-slate-500">
                        Masukkan 6 digit kod keselamatan untuk meneruskan.
                    </p>
                </div>

                {demoOtp && (
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center space-y-1">
                        <span className="text-[10px] text-emerald-700 uppercase font-black tracking-wider block">
                            Kod 2FA Demo (Simulasi)
                        </span>
                        <div className="font-mono text-xl font-black text-emerald-600 tracking-widest">
                            {demoOtp}
                        </div>
                        <button
                            type="button"
                            onClick={() => setOtpInput(demoOtp)}
                            className="text-[11px] text-emerald-700 hover:text-emerald-900 underline font-bold cursor-pointer"
                        >
                            Auto-Isi Kod
                        </button>
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-3">
                    {otpError && (
                        <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-bold text-center">
                            {otpError}
                        </div>
                    )}

                    <input
                        type="text"
                        maxLength={6}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        autoFocus
                        required
                        className="w-full text-center py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-xl font-bold tracking-widest outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />

                    <button
                        type="submit"
                        disabled={isLoading || otpInput.length !== 6}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs rounded-lg cursor-pointer disabled:opacity-50 shadow-sm transition-all"
                    >
                        {isLoading ? "Mengesahkan..." : "Sahkan & Masuk"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full text-center text-xs text-slate-500 hover:text-slate-800 cursor-pointer py-1 font-bold"
                    >
                        ← Batal & Kembali
                    </button>
                </form>
            </div>
        </main>
    );
}
