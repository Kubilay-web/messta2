

import db from "@/app/lib/db";

export async function createContact(data) {
  const { email, school } = data;

  // Check existing
  const existingEmail = await db.contact.findUnique({
    where: { email },
  });

  const existingSchool = await db.contact.findUnique({
    where: { school },
  });

  if (existingSchool || existingEmail) {
    return {
      error: "We have already recieved a request for this school or email",
      status: 409,
      data: null,
    };
  }

  const newContact = await db.contact.create({
    data,
  });

  return {
    data: newContact,
    error: null,
    status: 201,
  };
}

export async function getContacts() {
  const contacts = await db.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return contacts;
}