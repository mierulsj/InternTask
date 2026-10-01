import { NextResponse } from "next/server";
import { verify2FA } from "../../../../lib/adminAuthService";

export async function POST(request) {
    try {
        const body = await request.json();
        const { tempToken, otp } = body;

        const result = verify2FA({ tempToken, otp });

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error("API Error /api/admin/verify-2fa:", err);
        return NextResponse.json(
            { success: false, error: "Ralat dalaman pelayan semasa pengesahan 2FA." },
            { status: 500 }
        );
    }
}
