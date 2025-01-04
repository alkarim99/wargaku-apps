import {
  Education,
  Gender,
  MarriageStatus,
  Nationality,
  Religion,
} from "generated/client"

export interface Resident {
  id: string
  nik: string
  name: string
  birthPlace: string
  birthDate: Date
  gender: Gender
  religion: Religion
  education: Education
  work?: string
  marriageStatus: MarriageStatus
  nationality: Nationality
  phone?: string
}

export interface ResidentResponse {
  status: number
  message: string
  data: any
}

export interface CreateResidentRequest {
  nik: string
  name: string
  birthPlace: string
  birthDate: Date
  gender: Gender
  religion: Religion
  education: Education
  work?: string
  marriageStatus: MarriageStatus
  nationality: Nationality
}

export interface UpdateResidentRequest {
  id: string
  nik: string
  name: string
  birthPlace: string
  birthDate: Date
  gender: Gender
  religion: Religion
  education: Education
  work?: string
  marriageStatus: MarriageStatus
  nationality: Nationality
}
