"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { redirect } from "next/navigation"
import Header from "@/components/admin/header"
import Footer from "@/components/footer"
import { getFamilyById, deleteFamily } from "@/lib/family/actions"
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

interface DetailFamilyPageProps {
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

export default function Page({ params }: DetailFamilyPageProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [kkNumber, setKkNumber] = useState("")
  const [address, setAddress] = useState("")
  const [rt, setRt] = useState("")
  const [rw, setRw] = useState("")
  const [subDistrict, setSubDistrict] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [publishDate, setPublishDate] = useState("")

  useEffect(() => {
    if (!session) {
      redirect("/login")
    }

    const fetchData = async () => {
      if (params.id) {
        try {
          const family = await getFamilyById(params.id)
          setKkNumber(family?.data?.kkNumber)
          setAddress(family?.data?.address)
          setRt(family?.data?.rt)
          setRw(family?.data?.rw)
          setSubDistrict(family?.data?.subDistrict)
          setDistrict(family?.data?.district)
          setCity(family?.data?.city)
          setProvince(family?.data?.province)
          setPostalCode(family?.data?.postalCode)
          setPublishDate(family?.data?.publishDate)
        } catch (error: any) {
          console.log(error.response)
        }
      }
    }

    fetchData()
  }, [session, params.id])

  const handleEdit = () => {
    router.push(`/families/update/${params.id}`)
  }

  const handleDelete = async () => {
    try {
      await deleteFamily(params.id)
      router.push("/families")
      router.refresh()
    } catch (error) {
      console.error("Error deleting family:", error)
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
                <CardTitle className="text-2xl">
                  Detail Kartu Keluarga
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Nomor KK: {kkNumber}
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
                        Apakah Anda yakin ingin menghapus data kartu keluarga
                        ini? Tindakan ini tidak dapat dibatalkan.
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
                  <h3 className="font-semibold">Informasi Alamat</h3>
                  <Separator className="my-4" />
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <InfoItem label="Alamat Lengkap" value={address} />
                    <div className="grid grid-cols-2 gap-4">
                      <InfoItem label="RT" value={rt} />
                      <InfoItem label="RW" value={rw} />
                    </div>
                    <InfoItem label="Kelurahan" value={subDistrict} />
                    <InfoItem label="Kecamatan" value={district} />
                    <InfoItem label="Kota" value={city} />
                    <InfoItem label="Provinsi" value={province} />
                    <InfoItem label="Kode Pos" value={postalCode} />
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold">Informasi Dokumen</h3>
                  <Separator className="my-4" />
                  <dl className="grid gap-4">
                    <InfoItem
                      label="Tanggal Terbit"
                      value={new Date(publishDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
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
