import React, { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircleIcon } from "lucide-react"
import Spinner from "@/components/spinner"
import { updateResidentSchema } from "@/schemas/resident"
import { updateResident, getResidentById } from "@/lib/resident/actions"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormProps {
  id: string
}
import CustomDatePicker from "@/components/admin/custom-datepicker"
import {
  Education,
  FamilyRelation,
  Gender,
  MarriageStatus,
  Nationality,
  Religion,
} from "generated/client"
import SearchableKKSelect from "@/components/admin/custom-select"
import {
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from "@/lib/family-member/actions"

const Form: React.FC<FormProps> = ({ id, ...props }) => {
  const router = useRouter()

  const [nik, setNik] = useState("")
  const [name, setName] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [birthDate, setBirthDate] = useState<Date>()
  const [gender, setGender] = useState<Gender>()
  const [religion, setReligion] = useState<Religion>()
  const [education, setEducation] = useState<Education>()
  const [work, setWork] = useState("")
  const [marriageStatus, setMarriageStatus] = useState<MarriageStatus>()
  const [nationality, setNationality] = useState<Nationality>()
  const [familyMemberId, setFamilyMemberId] = useState<string>()
  const [selectedKK, setSelectedKK] = useState<{
    id: string
    kkNumber: string
  } | null>(null)
  const [oldSelectedKK, setOldSelectedKK] = useState<{
    id: string
    kkNumber: string
  } | null>(null)
  const [familyRelation, setFamilyRelation] = useState<FamilyRelation>()
  const [oldFamilyRelation, setOldFamilyRelation] = useState<FamilyRelation>()

  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (id) {
        try {
          const resident = await getResidentById(id)
          setNik(resident?.data?.nik)
          setName(resident?.data?.name)
          setBirthPlace(resident?.data?.birthPlace)
          setBirthDate(resident?.data?.birthDate || "")
          setGender(resident?.data?.gender)
          setReligion(resident?.data?.religion)
          setEducation(resident?.data?.education)
          setWork(resident?.data?.work)
          setMarriageStatus(resident?.data?.marriageStatus)
          setNationality(resident?.data?.nationality)
          setFamilyMemberId(resident?.data?.familyMember?.id)
          setSelectedKK({
            id: resident?.data?.familyMember?.family?.id,
            kkNumber: resident?.data?.familyMember?.family?.kkNumber,
          })
          setOldSelectedKK({
            id: resident?.data?.familyMember?.family?.id,
            kkNumber: resident?.data?.familyMember?.family?.kkNumber,
          })
          setFamilyRelation(resident?.data?.familyMember?.familyRelation)
          setOldFamilyRelation(resident?.data?.familyMember?.familyRelation)
        } catch (error: any) {
          console.log(error.response)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validation = updateResidentSchema.safeParse({
      id,
      nik,
      name,
      birthPlace,
      birthDate,
      gender,
      religion,
      education,
      work,
      marriageStatus,
      nationality,
    })

    if (!validation.success) {
      setErrorMessage(validation.error.errors[0].message)
      return
    }

    try {
      setLoading(true)
      const res = await updateResident({
        id,
        nik,
        name,
        birthPlace,
        birthDate: birthDate as Date,
        gender: gender as Gender,
        religion: religion as Religion,
        education: education as Education,
        work,
        marriageStatus: marriageStatus as MarriageStatus,
        nationality: nationality as Nationality,
      })

      if (
        selectedKK &&
        (selectedKK.id !== oldSelectedKK?.id ||
          familyRelation !== oldFamilyRelation)
      ) {
        await updateFamilyMember({
          id: familyMemberId as string,
          familyRelation: familyRelation as FamilyRelation,
          familyId: selectedKK.id,
          residentId: id,
        })
      }

      setMessage(res?.message)
      router.push("/residents")
      router.refresh()
    } catch (error: any) {
      setErrorMessage(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {message && (
        <Alert className="text-green-600 border-green-600 mb-4">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <XCircleIcon className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label>Nomor KK</Label>
          <SearchableKKSelect value={selectedKK} onChange={setSelectedKK} />
        </div>
        <div className="grid gap-2">
          <Label>Status Hubungan Dalam Keluarga</Label>
          <Select
            onValueChange={(value: string) =>
              setFamilyRelation(value as FamilyRelation)
            }
            value={familyRelation}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih hubungan dalam keluarga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KEPALA_KELUARGA">Kepala Keluarga</SelectItem>
              <SelectItem value="SUAMI">Suami</SelectItem>
              <SelectItem value="ISTRI">Istri</SelectItem>
              <SelectItem value="ANAK">Anak</SelectItem>
              <SelectItem value="ORANG_TUA">Orang Tua</SelectItem>
              <SelectItem value="MERTUA">Mertua</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Label>
          <Input
            id="nik"
            type="text"
            placeholder="3573011111111111"
            value={nik}
            defaultValue={nik}
            onChange={(e) => setNik(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Nama</Label>
          <Input
            id="name"
            type="text"
            placeholder="Fulan"
            value={name}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="birthPlace">Tempat Lahir</Label>
          <Input
            id="birthPlace"
            type="text"
            placeholder="Malang"
            value={birthPlace}
            defaultValue={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="birthDate">Tanggal Lahir</Label>
          <CustomDatePicker date={birthDate} setDate={setBirthDate} />
        </div>
        <div className="grid gap-2">
          <Select
            onValueChange={(value: string) => setGender(value as Gender)}
            value={gender}
            defaultValue={gender}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Jenis Kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Laki-Laki</SelectItem>
              <SelectItem value="FEMALE">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            onValueChange={(value: string) => setReligion(value as Religion)}
            value={religion}
            defaultValue={religion}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Agama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ISLAM">Islam</SelectItem>
              <SelectItem value="KRISTEN">Kristen</SelectItem>
              <SelectItem value="HINDU">Hindu</SelectItem>
              <SelectItem value="BUDHA">Budha</SelectItem>
              <SelectItem value="KATOLIK">Katolik</SelectItem>
              <SelectItem value="KONGHUCU">Konghucu</SelectItem>
              <SelectItem value="OTHERS">Lainnya</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            onValueChange={(value: string) => setEducation(value as Education)}
            value={education}
            defaultValue={education}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pendidikan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA_SMK">SMA/SMK</SelectItem>
              <SelectItem value="D1">D1</SelectItem>
              <SelectItem value="D2">D2</SelectItem>
              <SelectItem value="D3">D3</SelectItem>
              <SelectItem value="D4">D4</SelectItem>
              <SelectItem value="S1">S1</SelectItem>
              <SelectItem value="S2">S2</SelectItem>
              <SelectItem value="S3">S3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="work">Pekerjaan</Label>
          <Input
            id="work"
            type="text"
            placeholder="Pekerjaan"
            value={work}
            defaultValue={work}
            onChange={(e) => setWork(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Select
            onValueChange={(value: string) =>
              setMarriageStatus(value as MarriageStatus)
            }
            value={marriageStatus}
            defaultValue={marriageStatus}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Status Pernikahan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BELUM_KAWIN">Belum Kawin</SelectItem>
              <SelectItem value="KAWIN">Kawin</SelectItem>
              <SelectItem value="CERAI_HIDUP">Cerai Hidup</SelectItem>
              <SelectItem value="CERAI_MATI">Cerai Mati</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            onValueChange={(value: string) =>
              setNationality(value as Nationality)
            }
            value={nationality}
            defaultValue={nationality}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Kewarganegaraan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WNI">WNI</SelectItem>
              <SelectItem value="WNA">WNA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Ubah"}
        </Button>
      </form>
    </>
  )
}

export default Form
