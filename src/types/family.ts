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

export interface FamilyResponse {
  status: number
  message: string
  data: any
}

export interface CreateFamilyRequest {
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
}

export interface UpdateFamilyRequest {
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
}
