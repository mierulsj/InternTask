import { NextResponse } from "next/server";
import { unlockAdminAccount, DEFAULT_ADMIN_EMAIL } from "../../../../lib/adminAuthService";

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const email = body.email || DEFAULT_ADMIN_EMAIL;
        const result = unlockAdminAccount(email);
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
