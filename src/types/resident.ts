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

enum Gender {
  MALE,
  FEMALE,
}

enum Religion {
  ISLAM,
  KRISTEN,
  HINDU,
  BUDHA,
  KATOLIK,
  KONGHUCU,
  OTHERS,
}

enum Education {
  SD,
  SMP,
  SMA_SMK,
  D1,
  D2,
  D3,
  D4,
  S1,
  S2,
  S3,
}

enum MarriageStatus {
  BELUM_KAWIN,
  KAWIN,
  CERAI_HIDUP,
  CERAI_MATI,
}

enum Nationality {
  WNI,
  WNA,
}

enum FamilyRelation {
  KEPALA_KELUARGA,
  SUAMI,
  ISTRI,
  ANAK,
  ORANG_TUA,
  MERTUA,
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
