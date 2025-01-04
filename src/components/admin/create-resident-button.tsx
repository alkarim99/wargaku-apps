"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AddResidentButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.push("/residents/create")}>
      Tambah Data
    </Button>
  )
}
