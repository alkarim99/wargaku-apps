import { Family, FamilyRelation, Resident } from "generated/client"

export interface FamilyMember {
  id: string
  familyRelation: string
  family: Family
  familyId: string
  residentId: string
  resident: Resident
}

export interface FamilyMemberResponse {
  status: number
  message: string
  data: any
}

export interface CreateFamilyMemberRequest {
  familyRelation: FamilyRelation
  familyId: string
  residentId: string
}

export interface UpdateFamilyMemberRequest {
  id: string
  familyRelation: FamilyRelation
  familyId: string
  residentId: string
}
