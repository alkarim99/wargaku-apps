// components/add-family-button.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function AddFamilyButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.push("/families/create")}>Tambah Data</Button>
  )
}
