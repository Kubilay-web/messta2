
import { redirect as nav } from "next/navigation";
import { validateRequest } from "@/app/auth";
import RegisterForm from "./register-form";

export const dynamic = "force-dynamic";

export default async function Register({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const target = redirect && redirect.startsWith("/") ? redirect : "/sahibinden";

  const { user } = await validateRequest();
  if (user) nav(target);

  return <RegisterForm redirect={target} />;
}
