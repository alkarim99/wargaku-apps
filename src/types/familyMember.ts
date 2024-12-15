import { Resident } from "./resident"
import { Family } from "./family"

export interface FamilyMember {
  id: string
  familyRelation: string
  family: Family
  familyId: string
  residentId: string
  resident: Resident
}
