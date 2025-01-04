"use client"

import React, { useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Header from "@/components/admin/header"
import Footer from "@/components/footer"
import Form from "./form"

interface UpdateResidentPageProps {
  params: {
    id: string
  }
}

export default function Page({ params }: UpdateResidentPageProps) {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      redirect("/login")
    }
  }, [session])

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex min-h-[calc(100vh - _theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Ubah Data Warga</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
            <Form id={params.id} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
