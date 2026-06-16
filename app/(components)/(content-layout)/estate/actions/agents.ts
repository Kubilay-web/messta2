"use server";

import db from "@/app/lib/db";
import { hash } from "@node-rs/argon2";
import { revalidatePath } from "next/cache";

export type AgentProps = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappNo?: string;
  gender: string;
  dateOfBirth?: string;
  NIN: string;
  contactMethod: string;
  employeeId: string;
  dateOfJoining: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  licenseNo?: string;
  qualification: string;
  experience?: number;
  commissionRate?: number;
  bio?: string;
  skills?: string;
  socialLinks?: {
    twitter?:   string;
    linkedin?:  string;
    instagram?: string;
    facebook?:  string;
    website?:   string;
  };
  specializationTypes: string[];
  specializationCities: string[];
  imageUrl: string;
  password: string;
  agencyId: string;
  agencyName: string;
};

function toIso(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr))
    throw new Error("Geçersiz tarih formatı. YYYY-MM-DD bekleniyor.");
  return `${dateStr}T00:00:00.000Z`;
}

const PATH = "/estate/dashboard/agents";

// ==================== CREATE ====================
export async function createAgent(data: AgentProps) {
  const [byNIN, byEmail, byPhone, byEmpId, byUser] = await Promise.all([
    db.agent.findUnique({ where: { NIN: data.NIN } }),
    db.agent.findUnique({ where: { email: data.email } }),
    db.agent.findUnique({ where: { phone: data.phone } }),
    db.agent.findUnique({ where: { employeeId: data.employeeId } }),
    db.user.findUnique({ where: { email: data.email } }),
  ]);

  if (byNIN)    throw new Error("Bu TC Kimlik No zaten kayıtlı.");
  if (byEmail)  throw new Error("Bu e-posta adresi zaten kullanılıyor.");
  if (byPhone)  throw new Error("Bu telefon numarası zaten kayıtlı.");
  if (byEmpId)  throw new Error("Bu çalışan numarası zaten mevcut.");
  if (byUser)   throw new Error("Bu e-posta adresiyle kayıtlı kullanıcı mevcut.");

  const hashedPassword = await hash(data.password);

  const user = await db.user.create({
    data: {
      name: `${data.firstName} ${data.lastName}`,
      username: data.email,
      email: data.email,
      phone: data.phone,
      passwordHash: hashedPassword,
      image: data.imageUrl,
      agencyId: data.agencyId,
      agencyName: data.agencyName,
      roleGayrimenkul: "AGENT",
    },
  });

  const agent = await db.agent.create({
    data: {
      userId:               user.id,
      title:                data.title,
      firstName:            data.firstName,
      lastName:             data.lastName,
      email:                data.email,
      phone:                data.phone,
      whatsappNo:           data.whatsappNo ?? null,
      dateOfBirth:          data.dateOfBirth ? (toIso(data.dateOfBirth) as any) : null,
      gender:               data.gender as any,
      imageUrl:             data.imageUrl || null,
      NIN:                  data.NIN,
      password:             data.password,
      contactMethod:        data.contactMethod,
      employeeId:           data.employeeId,
      dateOfJoining:        toIso(data.dateOfJoining) as any,
      designation:          data.designation,
      departmentId:         data.departmentId,
      departmentName:       data.departmentName,
      licenseNo:            data.licenseNo ?? null,
      qualification:        data.qualification,
      experience:           data.experience ? Number(data.experience) : null,
      commissionRate:       data.commissionRate ? parseFloat(String(data.commissionRate)) : 2.5,
      bio:                  data.bio ?? null,
      skills:               data.skills ?? null,
      socialLinks:          data.socialLinks ?? null,
      specializationTypes:  data.specializationTypes as any,
      specializationCities: data.specializationCities,
      agencyId:             data.agencyId,
      agencyName:           data.agencyName,
    },
  });

  revalidatePath(PATH);
  return agent;
}

// ==================== UPDATE ====================
export async function updateAgent(id: string, data: Partial<AgentProps>) {
  const dateOfBirth  = data.dateOfBirth  ? toIso(data.dateOfBirth)  : undefined;
  const dateOfJoining = data.dateOfJoining ? toIso(data.dateOfJoining) : undefined;

  const specializationCities = data.specializationCities
    ? Array.isArray(data.specializationCities)
      ? data.specializationCities
      : String(data.specializationCities).split(",").map((c) => c.trim()).filter(Boolean)
    : undefined;

  const agent = await db.agent.update({
    where: { id },
    data: {
      ...(data.title         && { title: data.title }),
      ...(data.firstName     && { firstName: data.firstName }),
      ...(data.lastName      && { lastName: data.lastName }),
      ...(data.phone         && { phone: data.phone }),
      ...(data.whatsappNo !== undefined && { whatsappNo: data.whatsappNo }),
      ...(data.gender        && { gender: data.gender as any }),
      ...(dateOfBirth        && { dateOfBirth: dateOfBirth as any }),
      ...(data.imageUrl      && { imageUrl: data.imageUrl }),
      ...(data.contactMethod && { contactMethod: data.contactMethod }),
      ...(data.designation   && { designation: data.designation }),
      ...(data.departmentId  && { departmentId: data.departmentId }),
      ...(data.departmentName && { departmentName: data.departmentName }),
      ...(data.licenseNo !== undefined && { licenseNo: data.licenseNo }),
      ...(data.qualification && { qualification: data.qualification }),
      ...(data.experience !== undefined && { experience: data.experience ? Number(data.experience) : null }),
      ...(data.commissionRate !== undefined && { commissionRate: data.commissionRate ? parseFloat(String(data.commissionRate)) : null }),
      ...(data.bio         !== undefined && { bio:         data.bio }),
      ...(data.skills      !== undefined && { skills:      data.skills }),
      ...(data.socialLinks !== undefined && { socialLinks: data.socialLinks ?? null }),
      ...(data.specializationTypes?.length && { specializationTypes: data.specializationTypes as any }),
      ...(specializationCities && { specializationCities }),
      ...(dateOfJoining && { dateOfJoining: dateOfJoining as any }),
    },
  });

  if (data.firstName || data.lastName || data.phone || data.imageUrl) {
    await db.user.update({
      where: { id: agent.userId },
      data: {
        ...(data.firstName && data.lastName && { name: `${data.firstName} ${data.lastName}` }),
        ...(data.phone    && { phone: data.phone }),
        ...(data.imageUrl && { image: data.imageUrl }),
      },
    });
  }

  revalidatePath(PATH);
  return agent;
}

// ==================== DELETE ====================
export async function deleteAgent(id: string) {
  const agent = await db.agent.findUnique({ where: { id }, select: { userId: true } });
  if (!agent) throw new Error("Danışman bulunamadı.");

  // Sözleşme bağımlılarını topla ve sil
  const contractRows = await db.propertyContract.findMany({ where: { agentId: id }, select: { id: true } });
  const contractIds  = contractRows.map((c) => c.id);
  if (contractIds.length) {
    await db.contractPayment.deleteMany({ where: { contractId: { in: contractIds } } });
    await db.contractDocument.deleteMany({ where: { contractId: { in: contractIds } } });
    await db.propertyContract.deleteMany({ where: { id: { in: contractIds } } });
  }

  // Danışmanın ilanlarını unlink et (agentId opsiyonel)
  await db.listing.updateMany({ where: { agentId: id }, data: { agentId: null } });

  await db.$transaction([
    db.agentDocument.deleteMany({ where: { agentId: id } }),
    db.agentAttendance.deleteMany({ where: { agentId: id } }),
    db.agentLeave.deleteMany({ where: { agentId: id } }),
    db.propertyVisit.deleteMany({ where: { agentId: id } }),
    db.agent.delete({ where: { id } }),
    db.user.delete({ where: { id: agent.userId } }),
  ]);

  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllAgents(agencyId: string) {
  return db.agent.findMany({
    where: { agencyId },
    include: {
      _count: { select: { listings: true, contracts: true, visits: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ==================== GET BY ID ====================
export async function getAgentById(id: string) {
  return db.agent.findUnique({
    where: { id },
    include: {
      listings:  { select: { id: true, title: true, status: true } },
      contracts: { select: { id: true, contractNo: true, status: true } },
      visits:    { select: { id: true, scheduledAt: true, status: true } },
      documents: { select: { id: true, title: true, type: true, url: true, uploadedAt: true } },
      _count:    { select: { listings: true, contracts: true, visits: true } },
    },
  });
}

// ==================== GET DEPARTMENTS ====================
export async function getAgencyDepartments(agencyId: string) {
  return db.agencyDepartment.findMany({
    where: { agencyId },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

// ==================== GET AVAILABLE USERS (no Agent yet) ====================
export async function getAvailableUsersForAgent() {
  const agentUserIds = await db.agent.findMany({ select: { userId: true } });
  const excludedIds  = agentUserIds.map((a) => a.userId);

  return db.user.findMany({
    where: { id: { notIn: excludedIds }, isActive: true },
    select: {
      id: true, name: true, email: true, phone: true,
      image: true, firstName: true, lastName: true,
      agencyId: true, agencyName: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export type AssignAgentProps = {
  userId:               string;
  agencyId:             string;
  agencyName:           string;
  imageUrl?:            string;
  title:                string;
  NIN:                  string;
  gender:               string;
  dateOfBirth?:         string;
  contactMethod:        string;
  employeeId:           string;
  dateOfJoining:        string;
  designation:          string;
  departmentId:         string;
  departmentName:       string;
  licenseNo?:           string;
  qualification:        string;
  experience?:          number;
  commissionRate?:      number;
  bio?:                 string;
  skills?:              string;
  specializationTypes:  string[];
  specializationCities: string[];
};

// ==================== ASSIGN EXISTING USER AS AGENT ====================
export async function assignUserAsAgent(data: AssignAgentProps) {
  const user = await db.user.findUnique({
    where: { id: data.userId },
    select: {
      id: true, name: true, email: true, phone: true,
      image: true, firstName: true, lastName: true, passwordHash: true,
    },
  });
  if (!user) throw new Error("Kullanıcı bulunamadı.");

  const existing = await db.agent.findUnique({ where: { userId: data.userId } });
  if (existing) throw new Error("Bu kullanıcı zaten danışman olarak kayıtlı.");

  const byNIN   = await db.agent.findUnique({ where: { NIN: data.NIN } });
  if (byNIN)   throw new Error("Bu TC Kimlik No zaten kayıtlı.");

  const byEmpId = await db.agent.findUnique({ where: { employeeId: data.employeeId } });
  if (byEmpId) throw new Error("Bu çalışan numarası zaten mevcut.");

  const fallbackName = user.name ?? user.email?.split("@")[0] ?? "Danışman";
  const firstName = user.firstName || user.name?.split(" ")[0] || fallbackName;
  const lastName  = user.lastName  || user.name?.split(" ").slice(1).join(" ") || "";

  const specializationCities = Array.isArray(data.specializationCities)
    ? data.specializationCities
    : String(data.specializationCities).split(",").map((c) => c.trim()).filter(Boolean);

  const [agent] = await db.$transaction([
    db.agent.create({
      data: {
        userId:               data.userId,
        title:                data.title,
        firstName,
        lastName,
        email:                user.email!,
        phone:                user.phone ?? "",
        gender:               data.gender as any,
        dateOfBirth:          data.dateOfBirth ? (toIso(data.dateOfBirth) as any) : null,
        imageUrl:             data.imageUrl || user.image || null,
        NIN:                  data.NIN,
        password:             user.passwordHash ?? "",
        contactMethod:        data.contactMethod,
        employeeId:           data.employeeId,
        dateOfJoining:        toIso(data.dateOfJoining) as any,
        designation:          data.designation,
        departmentId:         data.departmentId,
        departmentName:       data.departmentName,
        licenseNo:            data.licenseNo ?? null,
        qualification:        data.qualification,
        experience:           data.experience ? Number(data.experience) : null,
        commissionRate:       data.commissionRate ? parseFloat(String(data.commissionRate)) : 2.5,
        bio:                  data.bio ?? null,
        skills:               data.skills ?? null,
        specializationTypes:  data.specializationTypes as any,
        specializationCities,
        agencyId:             data.agencyId,
        agencyName:           data.agencyName,
      },
    }),
    db.user.update({
      where: { id: data.userId },
      data: {
        roleGayrimenkul: "AGENT",
        agencyId:        data.agencyId,
        agencyName:      data.agencyName,
        ...(data.imageUrl && { image: data.imageUrl }),
      },
    }),
  ]);

  revalidatePath(PATH);
  return agent;
}
