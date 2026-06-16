import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic";
import { Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "./lib/prisma";


const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      displayName: databaseUserAttributes.displayName,
      email: databaseUserAttributes.email,
      avatarUrl: databaseUserAttributes.avatarUrl,
      googleId: databaseUserAttributes.googleId,
      role: databaseUserAttributes.role,
      rolejob: databaseUserAttributes.rolejob,
      roleshop:databaseUserAttributes.roleshop,
      roleestate:databaseUserAttributes.roleestate,
      rolemedical:databaseUserAttributes.rolemedical,
      roleproject:databaseUserAttributes.roleproject,
      roleinvoice:databaseUserAttributes.roleinvoice,
      roleschool:databaseUserAttributes.roleschool,
      schoolId:databaseUserAttributes.schoolId,
      roleGayrimenkul:databaseUserAttributes.roleGayrimenkul,
      agencyId:databaseUserAttributes.agencyId,
      agencyName:databaseUserAttributes.agencyName,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  googleId: string | null;
  role: string | null;
  rolejob: string | null;
  roleshop:string|null;
  roleestate:string|null;
  rolemedical:string|null;
  email: string;
  roleproject:string;
  roleinvoice:string;
  schoolId:string;
  roleschool:string;
  roleGayrimenkul: string | null;
  agencyId: string | null;
  agencyName: string | null;
}

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
);

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}

    return result;
  },
);
