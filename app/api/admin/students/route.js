import { NextResponse } from "next/server";
import { getAdminStudentsList, updateAdminStudent } from "../../../../lib/adminAuthService";

export async function GET(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer exploria_admin_jwt_")) {
            return NextResponse.json(
                { success: false, error: "Akses ditolak: Token sesi pentadbir tidak sah atau tiada." },
                { status: 403 }
            );
        }

        const result = await getAdminStudentsList();
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error("API Error /api/admin/students GET:", err);
        return NextResponse.json(
            { success: false, error: "Ralat mendapatkan senarai murid.", students: [] },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer exploria_admin_jwt_")) {
            return NextResponse.json(
                { success: false, error: "Akses ditolak: Token sesi pentadbir tidak sah atau tiada." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const result = await updateAdminStudent(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error || "Gagal mengemas kini data murid." },
                { status: 400 }
            );
        }

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error("API Error /api/admin/students PUT:", err);
        return NextResponse.json(
            { success: false, error: "Ralat pelayan mengemas kini data murid." },
            { status: 500 }
        );
    }
}

