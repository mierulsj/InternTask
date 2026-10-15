"use client";
 
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "../belajar/Login";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        try {
            const loggedIn = localStorage.getItem("exploria_is_logged_in") === "true";
            if (loggedIn) {
                router.replace("/belajar");
            }
        } catch {}
    }, [router]);

    return (
        <LoginPage
            onSuccess={() => {
                try {
                    sessionStorage.setItem("exploria_trigger_luckydraw", "true");
                } catch {}
                router.push("/belajar");
            }}
            onNavigate={(view) => {
                if (view === "menu") router.push("/belajar");
                else if (view === "register") router.push("/register");
            }}
            onContinueAsGuest={() => {
                try {
                    sessionStorage.setItem("exploria_guest_mode", "true");
                } catch {}
                router.push("/belajar");
            }}
        />
    );
}
