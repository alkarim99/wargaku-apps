import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { authOptions } from "@/lib/auth"
import { Rocket } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { familiesColumn } from "./columns"
import { DataTable } from "../../../components/ui/data-table"
import { AddFamilyButton } from "@/components/admin/create-family-button"
import { getAllFamily } from "@/lib/family/actions"

export default async function Family() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const familiesData = await getAllFamily()
  const totalFamilies = familiesData?.data?.length

  return (
    <>
      <Alert>
        <Rocket className="h-4 w-4" />
        <AlertTitle>Total Kartu Keluarga</AlertTitle>
        <AlertDescription>{totalFamilies} KK</AlertDescription>
      </Alert>
      <AddFamilyButton />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 ">
        <DataTable columns={familiesColumn} data={familiesData?.data} />
      </div>
    </>
  )
}
