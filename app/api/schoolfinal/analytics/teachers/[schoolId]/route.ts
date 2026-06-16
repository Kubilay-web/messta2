

export async function GET(req, { params }) {
  try {
    const data = await getTeachersAnalytics(params.schoolId);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Error" }, { status: 500 });
  }
}