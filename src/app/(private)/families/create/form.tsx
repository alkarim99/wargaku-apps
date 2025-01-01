import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircleIcon } from "lucide-react"
import Spinner from "@/components/spinner"
import { createFamilySchema } from "@/schemas/family"
import { createFamily } from "@/lib/family/actions"
import { redirect } from "next/navigation"

const Form = () => {
  const [kkNumber, setKkNumber] = useState("")
  const [address, setAddress] = useState("")
  const [rt, setRt] = useState("")
  const [rw, setRw] = useState("")
  const [subDistrict, setSubDistrict] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [publishDate, setPublishDate] = useState<Date>(new Date())

  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validation = createFamilySchema.safeParse({
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
      const res = await createFamily({
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

      if (res?.status !== 200) {
        setErrorMessage(res?.message)
      } else {
        setErrorMessage("")
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
      redirect("/families")
    }
  }

  return (
    <>
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
            onChange={(e) => setKkNumber(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Alamat Rumah</Label>
          <Input
            id="address"
            type="text"
            placeholder="K3-5"
            value={address}
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
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="postalCode">Tanggal Terbit</Label>
          <Input
            id="publishDate"
            type="date"
            // Format the Date object to YYYY-MM-DD for the input
            value={publishDate.toISOString().split("T")[0]}
            onChange={(e) => {
              // Convert the string date to a Date object
              setPublishDate(new Date(e.target.value))
            }}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner /> : "Tambah"}
        </Button>
      </form>
    </>
  )
}

export default Form
