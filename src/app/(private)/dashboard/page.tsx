import Header from "@/components/admin/header"
import Footer from "@/components/footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { authOptions } from "@/lib/auth"
import { BookA, Users, Home } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { getAllFamily } from "@/lib/family/actions"
import { getAllResident } from "@/lib/resident/actions"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const familiesData = await getAllFamily()
  const totalFamilies = familiesData?.data?.length

  const residentsData = await getAllResident()
  const totalResidents = residentsData?.data?.length

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex min-h-[calc(100vh - _theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">
              RW XI, Purwodadi, Blimbing, Kota Malang
            </h1>
          </div>
          <div className="mx-auto grid lg:grid-cols-3 w-full max-w-6xl items-start gap-6 ">
            <Alert>
              <BookA className="h-4 w-4" />
              <AlertTitle>Total Kartu Keluarga</AlertTitle>
              <AlertDescription>{totalFamilies} KK</AlertDescription>
            </Alert>
            <Alert>
              <Users className="h-4 w-4" />
              <AlertTitle>Total Warga</AlertTitle>
              <AlertDescription>{totalResidents} Jiwa</AlertDescription>
            </Alert>
            <Alert>
              <Home className="h-4 w-4" />
              <AlertTitle>Total Rukun Tetangga</AlertTitle>
              <AlertDescription>12 RT</AlertDescription>
            </Alert>
          </div>
          {/* <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h2 className="text-xl font-semibold">Aktivitas Terbaru</h2>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 ">
            <Alert>
              <Users className="h-4 w-4" />
              <AlertTitle>Kartu Keluarga Baru Terdaftar</AlertTitle>
              <AlertDescription>
                <p>Keluarga John Doe telah terdaftar di RT 01</p>
                <p className="font-light">5 mnt ago</p>
              </AlertDescription>
            </Alert>
          </div> */}
        </main>
        <Footer />
      </div>
    </>
  )
}
