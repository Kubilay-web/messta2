import { createContact, getContacts } from "@/app/api/controllers/contactController";


export async function GET() {
  try {
    const contacts = await getContacts();

    return Response.json(contacts, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    const result = await createContact(body);

    return Response.json(
      {
        data: result.data,
        error: result.error,
      },
      { status: result.status }
    );
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}