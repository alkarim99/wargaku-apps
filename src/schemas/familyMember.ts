import { z } from "zod"

export const getDetailFamilyMemberSchema = z.object({
  id: z.string({ message: "Family member ID is required." }),
})

export const createFamilyMemberSchema = z.object({
  familyRelation: z.enum(
    ["KEPALA_KELUARGA", "SUAMI", "ISTRI", "ANAK", "ORANG_TUA", "MERTUA"],
    {
      message: "Family relation is required.",
    }
  ),
  familyId: z.string({ message: "Family ID is required." }),
  residentId: z.string({ message: "Resident ID is required." }),
})

export const updateFamilyMemberSchema = z.object({
  id: z.string({ message: "Family member ID is required." }),
  familyRelation: z.enum(
    ["KEPALA_KELUARGA", "SUAMI", "ISTRI", "ANAK", "ORANG_TUA", "MERTUA"],
    {
      message: "Family relation is required.",
    }
  ),
  familyId: z.string({ message: "Family ID is required." }),
  residentId: z.string({ message: "Resident ID is required." }),
})

export const deleteFamilyMemberSchema = z.object({
  id: z.string({ message: "Family member ID is required." }),
})
