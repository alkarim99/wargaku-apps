import { FamilyMember } from "./familyMember"

export interface Family {
  id: string
  kkNumber: string
  address: string
  rt: string
  rw: string
  subDistrict: string
  district: string
  city: string
  province: string
  postalCode: string
  publishDate: Date
  familyMembers: FamilyMember[]
}
