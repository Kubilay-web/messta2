import { z } from "zod";

// Ortak validatorlar
const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

// ✅ Şirket logosu dosya kontrolü (opsiyonel)
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

// ✅ Jobs modeline uygun Zod şema
export const createJobSchema = z
  .object({
    // Modeldeki string alanlar
    title: requiredString.max(100),
    slug: requiredString.max(100),
    vacancies: numericRequiredString,

    // Maaşlar
    min_salary: z.coerce.number().min(0).optional(),
    max_salary: z.coerce.number().min(0).optional(),
    custom_salary: z.coerce.number().min(0).optional(),

    deadline: z.coerce.date().optional(),
    description: z.string().max(5000).optional(),

    status: z.enum(["pending", "approved", "rejected"]).default("pending"),

    // Başvuru alanları
    apply_on: z.enum(["app", "email", "url"]).default("app"),
    apply_email: z.string().email().max(100).optional().or(z.literal("")),
    apply_url: z.string().url().max(100).optional().or(z.literal("")),

    featured: z.boolean().optional(),
    highlight: z.boolean().optional(),

    fetaured_until: z.coerce.date().optional(),
    highlight_until: z.coerce.date().optional(),

    jobcount: z.number().int().default(0).optional(),
    total_views: z.number().int().default(0).optional(),

    address: z.string().optional(),

    salary_mode: z.enum(["custom", "range"]).default("custom"),

    // 🔗 Relations: ID string olarak
    companyId: z.string().optional(),
    jobCategoryId: z.string().optional(),
    jobRoleId: z.string().optional(),
    jobExperienceId: z.string().optional(),
    educationId: z.string().optional(),
    jobTypeId: z.string().optional(),
    salaryTypeId: z.string().optional(),
    cityId: z.string().optional(),
    stateId: z.string().optional(),
    countryId: z.string().optional(),

    // Opsiyonel logo
    companyLogo: companyLogoSchema.optional(),
  })
  .refine((data) => data.apply_email || data.apply_url, {
    message: "Email or URL is required",
    path: ["apply_email"],
  });

// ✅ Type export
export type CreateJobValues = z.infer<typeof createJobSchema>;

// ✅ Filtreleme için schema
export const jobFilterSchema = z.object({
  q: z.string().optional(),
  jobTypeId: z.string().optional(),
  cityId: z.string().optional(),
  stateId: z.string().optional(),
  countryId: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  highlight: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
