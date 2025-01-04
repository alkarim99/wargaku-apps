import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircleIcon } from "lucide-react"
import Spinner from "@/components/spinner"
import { createResidentSchema } from "@/schemas/resident"
import { createResident } from "@/lib/resident/actions"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CustomDatePicker from "@/components/admin/custom-datepicker"
import { Gender } from "generated/client"

const Form = () => {
  const router = useRouter()

  const [nik, setNik] = useState("")
  const [name, setName] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [birthDate, setBirthDate] = useState<Date>()
  const [gender, setGender] = useState<Gender>()
  const [religion, setReligion] = useState("")
  const [education, setEducation] = useState("")
  const [work, setWork] = useState("")
  const [marriageStatus, setMarriageStatus] = useState("")
  const [nationality, setNationality] = useState("")

  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validation = createResidentSchema.safeParse({
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
      const res = await createResident({
        nik,
        name,
        birthPlace,
        birthDate: birthDate as Date,
        gender,
        religion,
        education,
        work,
        marriageStatus,
        nationality,
      })

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
          <Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Label>
          <Input
            id="nik"
            type="text"
            placeholder="3573011111111111"
            value={nik}
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
            onChange={(e) => setBirthPlace(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="birthDate">Tanggal Lahir</Label>
          <CustomDatePicker date={birthDate} setDate={setBirthDate} />
        </div>
        <div className="grid gap-2">
          <Select onValueChange={setGender} value={gender} required>
            <SelectTrigger>
              <SelectValue placeholder="Jenis Kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Laki-Laki</SelectItem>
              <SelectItem value="FEMALE">Wanita</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select onValueChange={setReligion} value={religion} required>
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
          <Select onValueChange={setEducation} value={education} required>
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
            onChange={(e) => setWork(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Select
            onValueChange={setMarriageStatus}
            value={marriageStatus}
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
          <Select onValueChange={setNationality} value={nationality} required>
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
          {loading ? <Spinner /> : "Tambah"}
        </Button>
      </form>
    </>
  )
}

export default Form
