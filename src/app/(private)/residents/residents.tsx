import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { authOptions } from "@/lib/auth"
import { Rocket } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { residentsColumn } from "./columns"
import { DataTable } from "../../../components/ui/data-table"
import { AddResidentButton } from "@/components/admin/create-resident-button"
import { getAllResident } from "@/lib/resident/actions"

export default async function Resident() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const residentsData = await getAllResident()
  const totalResidents = residentsData?.data?.length

  return (
    <>
      <Alert>
        <Rocket className="h-4 w-4" />
        <AlertTitle>Total Warga</AlertTitle>
        <AlertDescription>{totalResidents} Jiwa</AlertDescription>
      </Alert>
      <AddResidentButton />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 ">
        <DataTable columns={residentsColumn} data={residentsData?.data} />
      </div>
    </>
  )
}
