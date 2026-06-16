import { getAnalyticsBySchoolId } from "@/app/api/controllers/analyticsController";

export async function GET(req, { params }) {
  try {
    const data = await getAnalyticsBySchoolId(params.schoolId);

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}