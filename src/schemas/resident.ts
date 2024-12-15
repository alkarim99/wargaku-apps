import { z } from "zod"

export const getDetailResidentSchema = z.object({
  id: z.string({ message: "Resident ID is required." }),
})

export const createResidentSchema = z.object({
  nik: z
    .string()
    .min(16, { message: "NIK must be at least 16 characters long." })
    .max(16, { message: "NIK must be at most 16 characters long." }),
  name: z.string().min(1, { message: "Name is required." }),
  birthPlace: z.string().min(1, { message: "Birth place is required." }),
  birthDate: z.coerce.date({
    message: "Birth date must be a valid ISO-8601 date string.",
  }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required." }),
  religion: z.enum(
    ["ISLAM", "KRISTEN", "HINDU", "BUDHA", "KATOLIK", "KONGHUCU", "OTHERS"],
    { message: "Religion is required." }
  ),
  education: z.enum(
    ["SD", "SMP", "SMA_SMK", "D1", "D2", "D3", "D4", "S1", "S2", "S3"],
    { message: "Education is required." }
  ),
  work: z.string().optional(),
  marriageStatus: z.enum(
    ["BELUM_KAWIN", "KAWIN", "CERAI_HIDUP", "CERAI_MATI"],
    {
      message: "Marriage status is required.",
    }
  ),
  nationality: z.enum(["WNI", "WNA"], {
    message: "Nationality is required.",
  }),
  phone: z.optional(
    z
      .string()
      .min(10, { message: "Phone must be at least 10 characters long." })
  ),
})

export const updateResidentSchema = z.object({
  id: z.string({ message: "Resident ID is required." }),
  nik: z
    .string()
    .min(16, { message: "NIK must be at least 16 characters long." })
    .max(16, { message: "NIK must be at most 16 characters long." }),
  name: z.string().min(1, { message: "Name is required." }),
  birthPlace: z.string().min(1, { message: "Birth place is required." }),
  birthDate: z.coerce.date({
    message: "Birth date must be a valid ISO-8601 date string.",
  }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required." }),
  religion: z.enum(
    ["ISLAM", "KRISTEN", "HINDU", "BUDHA", "KATOLIK", "KONGHUCU", "OTHERS"],
    { message: "Religion is required." }
  ),
  education: z.enum(
    ["SD", "SMP", "SMA_SMK", "D1", "D2", "D3", "D4", "S1", "S2", "S3"],
    { message: "Education is required." }
  ),
  work: z.string().optional(),
  marriageStatus: z.enum(
    ["BELUM_KAWIN", "KAWIN", "CERAI_HIDUP", "CERAI_MATI"],
    {
      message: "Marriage status is required.",
    }
  ),
  nationality: z.enum(["WNI", "WNA"], {
    message: "Nationality is required.",
  }),
  phone: z.optional(
    z
      .string()
      .min(10, { message: "Phone must be at least 10 characters long." })
  ),
})

export const deleteResidentSchema = z.object({
  id: z.string({ message: "Resident ID is required." }),
})
