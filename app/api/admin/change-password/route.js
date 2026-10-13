import { NextResponse } from "next/server";
import { changeAdminPassword } from "../../../../lib/adminAuthService";

export async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer exploria_admin_jwt_")) {
            return NextResponse.json(
                { success: false, error: "Akses ditolak: Token sesi pentadbir tidak sah." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const result = await changeAdminPassword(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error || "Gagal menukar kata laluan." },
                { status: 400 }
            );
        }

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error("API Error /api/admin/change-password:", err);
        return NextResponse.json(
            { success: false, error: "Ralat pelayan memproses pertukaran kata laluan." },
            { status: 500 }
        );
    }
}
