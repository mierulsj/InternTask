"use client";
 
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterPage from "../belajar/Register";

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
        <RegisterPage
            onSuccess={() => {
                router.push("/belajar");
            }}
            onNavigate={(view) => {
                if (view === "menu") router.push("/belajar");
                else if (view === "login") router.push("/login");
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
