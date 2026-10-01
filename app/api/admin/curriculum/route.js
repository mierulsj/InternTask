import { NextResponse } from "next/server";
import { getCurriculumTopics, saveCurriculumTopics } from "../../../../lib/curriculumService";

export async function GET() {
    try {
        const topics = await getCurriculumTopics();
        return NextResponse.json({ success: true, topics }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer exploria_admin_jwt_")) {
            return NextResponse.json(
                { success: false, error: "Akses ditolak: Hanya pentadbir yang sah dibenarkan mengubah kurikulum." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { topics } = body;

        const result = await saveCurriculumTopics(topics);
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
