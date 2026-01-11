"use client"

import React, { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircleIcon } from "lucide-react"
import Spinner from "@/components/spinner"
import { updateFamilySchema } from "@/schemas/family"
import { getFamilyById, updateFamily } from "@/lib/family/actions"
import { useRouter } from "next/navigation"
import CustomDatePicker from "@/components/admin/custom-datepicker"

interface FormProps {
  id: string
}

const Form: React.FC<FormProps> = ({ id, ...props }) => {
  const router = useRouter()

  const [kkNumber, setKkNumber] = useState("")
  const [address, setAddress] = useState("")
  const [rt, setRt] = useState("")
  const [rw, setRw] = useState("")
  const [subDistrict, setSubDistrict] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [publishDate, setPublishDate] = useState<Date>()

  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (id) {
        try {
          const family = await getFamilyById(id)
          setKkNumber(family?.data?.kkNumber)
          setAddress(family?.data?.address)
          setRt(family?.data?.rt)
          setRw(family?.data?.rw)
          setSubDistrict(family?.data?.subDistrict)
          setDistrict(family?.data?.district)
          setCity(family?.data?.city)
          setProvince(family?.data?.province)
          setPostalCode(family?.data?.postalCode)
          setPublishDate(family?.data?.publishDate || "")
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

    const validation = updateFamilySchema.safeParse({
      id,
      kkNumber,
      address,
      rt,
      rw,
      subDistrict,
      district,
      city,
      province,
      postalCode,
      publishDate,
    })

    if (!validation.success) {
      setErrorMessage(validation.error.errors[0].message)
      return
    }

    try {
      setLoading(true)
      const res = await updateFamily({
        id,
        kkNumber,
        address,
        rt,
        rw,
        subDistrict,
        district,
        city,
        province,
        postalCode,
        publishDate: publishDate as Date,
      })

      setMessage(res?.message)
      router.push("/families")
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
          <Label htmlFor="kkNumber">Nomor Kartu Keluarga</Label>
          <Input
            id="kkNumber"
            type="text"
            placeholder="3573011111111111"
            value={kkNumber}
            defaultValue={kkNumber}
            onChange={(e) => setKkNumber(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="publishDate">Tanggal Terbit</Label>
          <CustomDatePicker date={publishDate} setDate={setPublishDate} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Alamat Rumah</Label>
          <Input
            id="address"
            type="text"
            placeholder="K3-5"
            value={address}
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rt">RT</Label>
          <Input
            id="rt"
            type="text"
            placeholder="01"
            value={rt}
            defaultValue={rt}
            onChange={(e) => setRt(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rw">RW</Label>
          <Input
            id="rw"
            type="text"
            placeholder="10"
            value={rw}
            defaultValue={rw}
            onChange={(e) => setRw(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subDistrict">Kelurahan</Label>
          <Input
            id="subDistrict"
            type="text"
            placeholder="Purwodadi"
            value={subDistrict}
            defaultValue={subDistrict}
            onChange={(e) => setSubDistrict(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="district">Kecamatan</Label>
          <Input
            id="district"
            type="text"
            placeholder="Blimbing"
            value={district}
            defaultValue={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">Kota</Label>
          <Input
            id="city"
            type="text"
            placeholder="Malang"
            value={city}
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="province">Provinsi</Label>
          <Input
            id="province"
            type="text"
            placeholder="Jawa Timur"
            value={province}
            defaultValue={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="postalCode">Kode Pos</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="65125"
            value={postalCode}
            defaultValue={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Ubah"}
        </Button>
      </form>
    </>
  )
}

export default Form
