import { z } from "zod"

export const getDetailFamilySchema = z.object({
  id: z.string({ message: "Family ID is required." }),
})

export const createFamilySchema = z.object({
  kkNumber: z
    .string()
    .min(16, { message: "KK number must be at least 16 characters long." })
    .max(16, { message: "KK number must be at most 16 characters long." }),
  address: z.string().min(1, { message: "Address is required." }),
  rt: z.string().min(1, { message: "RT is required." }),
  rw: z.string().min(1, { message: "RW is required." }),
  subDistrict: z.string().min(1, { message: "Sub-district is required." }),
  district: z.string().min(1, { message: "District is required." }),
  city: z.string().min(1, { message: "City is required." }),
  province: z.string().min(1, { message: "Province is required." }),
  postalCode: z
    .string()
    .min(5, { message: "Postal code must be at least 5 characters long." })
    .max(5, { message: "Postal code must be at most 5 characters long." }),
  publishDate: z.coerce.date({
    message: "Publish date must be a valid ISO-8601 date string.",
  }),
})

export const updateFamilySchema = z.object({
  id: z.string({ message: "Family ID is required." }),
  kkNumber: z
    .string()
    .min(16, { message: "KK number must be at least 16 characters long." })
    .max(16, { message: "KK number must be at most 16 characters long." }),
  address: z.string().min(1, { message: "Address is required." }),
  rt: z.string().min(1, { message: "RT is required." }),
  rw: z.string().min(1, { message: "RW is required." }),
  subDistrict: z.string().min(1, { message: "Sub-district is required." }),
  district: z.string().min(1, { message: "District is required." }),
  city: z.string().min(1, { message: "City is required." }),
  province: z.string().min(1, { message: "Province is required." }),
  postalCode: z
    .string()
    .min(5, { message: "Postal code must be at least 5 characters long." })
    .max(5, { message: "Postal code must be at most 5 characters long." }),
  publishDate: z.coerce.date({
    message: "Publish date must be a valid ISO-8601 date string.",
  }),
})

export const deleteFamilySchema = z.object({
  id: z.string({ message: "Family ID is required." }),
})
