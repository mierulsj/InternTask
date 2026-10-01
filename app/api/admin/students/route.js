import { NextResponse } from "next/server";
import { getAdminStudentsList } from "../../../../lib/adminAuthService";

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
        console.error("API Error /api/admin/students:", err);
        return NextResponse.json(
            { success: false, error: "Ralat mendapatkan senarai murid.", students: [] },
            { status: 500 }
        );
    }
}
