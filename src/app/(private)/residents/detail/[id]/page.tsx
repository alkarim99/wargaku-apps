"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { redirect } from "next/navigation"
import Header from "@/components/admin/header"
import Footer from "@/components/footer"
import { getResidentById, deleteResident } from "@/lib/resident/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DetailResidentPageProps {
  params: {
    id: string
  }
}

interface InfoItemProps {
  label: string
  value: string
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="space-y-1.5">
    <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
    <dd className="text-base">{value || "-"}</dd>
  </div>
)

export default function Page({ params }: DetailResidentPageProps) {
  const router = useRouter()
  const { data: session } = useSession()

  const [nik, setNik] = useState("")
  const [name, setName] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [birthDate, setBirthDate] = useState<Date>()
  const [gender, setGender] = useState("")
  const [religion, setReligion] = useState("")
  const [education, setEducation] = useState("")
  const [work, setWork] = useState("")
  const [marriageStatus, setMarriageStatus] = useState("")
  const [nationality, setNationality] = useState("")

  useEffect(() => {
    if (!session) {
      redirect("/login")
    }

    const fetchData = async () => {
      if (params.id) {
        try {
          const resident = await getResidentById(params.id)
          setNik(resident?.data?.nik)
          setName(resident?.data?.name)
          setBirthPlace(resident?.data?.birthPlace)
          setBirthDate(resident?.data?.birthDate)
          setGender(resident?.data?.gender)
          setReligion(resident?.data?.religion)
          setEducation(resident?.data?.education)
          setWork(resident?.data?.work)
          setMarriageStatus(resident?.data?.marriageStatus)
          setNationality(resident?.data?.nationality)
        } catch (error: any) {
          console.log(error.response)
        }
      }
    }

    fetchData()
  }, [session, params.id])

  const formatDate = (date: Date | undefined) => {
    if (!date) return "-"

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const d = new Date(date)
    const day = d.getDate().toString().padStart(2, "0")
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day} ${month} ${year}`
  }

  const handleEdit = () => {
    router.push(`/residents/update/${params.id}`)
  }

  const handleDelete = async () => {
    try {
      await deleteResident(params.id)
      router.push("/residents")
      router.refresh()
    } catch (error) {
      console.error("Error deleting resident:", error)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full max-w-4xl">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Detail Warga</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Nomor Induk Kependudukan (NIK): {nik}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleEdit}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus data warga ini?
                        Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="font-semibold">Informasi Pribadi</h3>
                  <Separator className="my-4" />
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <InfoItem label="NIK" value={nik} />
                    <InfoItem label="Nama" value={name} />
                    <InfoItem
                      label="Jenis Kelamin"
                      value={gender == "MALE" ? "Laki-laki" : "Perempuan"}
                    />
                    <InfoItem label="Kewarganegaraan" value={nationality} />
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold">Informasi Lahir</h3>
                  <Separator className="my-4" />
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <InfoItem label="Tempat Lahir" value={birthPlace} />
                    <InfoItem
                      label="Tanggal Lahir"
                      value={formatDate(birthDate)}
                    />
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold">Informasi Lainnya</h3>
                  <Separator className="my-4" />
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <InfoItem label="Agama" value={religion} />
                    <InfoItem label="Pendidikan" value={education} />
                    <InfoItem label="Pekerjaan" value={work} />
                    <InfoItem
                      label="Status Pernikahan"
                      value={marriageStatus}
                    />
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
