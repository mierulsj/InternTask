import { NextResponse } from "next/server";
import { loginAdmin } from "../../../../lib/adminAuthService";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const result = await loginAdmin({ email, password });

        if (!result.success) {
            const status = result.isLocked ? 423 : 401;
            return NextResponse.json(result, { status });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error("API Error /api/admin/login:", err);
        return NextResponse.json(
            { success: false, error: "Ralat dalaman pelayan semasa log masuk pentadbir." },
            { status: 500 }
        );
    }
}
