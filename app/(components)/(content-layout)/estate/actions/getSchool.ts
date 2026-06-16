import { NextApiRequest, NextApiResponse } from "next";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await validateRequest(req, res);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { schoolId: true },
  });

  if (!dbUser?.schoolId) return res.status(404).json({ error: "No school found" });

  const school = await db.school.findUnique({
    where: { id: dbUser.schoolId },
  });

  res.status(200).json(school);
}