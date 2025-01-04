"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteResident } from "@/lib/resident/actions"

export type Residents = {
  id: string
  nik: string
  name: string
  birthDate: string
  gender: string
  familyRelation: string
}

const ActionCell = ({ resident }: { resident: Residents }) => {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDetail = (id: string) => {
    router.push(`/residents/detail/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/residents/update/${id}`)
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      await deleteResident(id)
      setIsDeleteDialogOpen(false)
      window.location.reload()
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDetail(resident.id)}>
            Lihat Warga
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleEdit(resident.id)}>
            Ubah Warga
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive"
          >
            Hapus Warga
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!isDeleting) {
            setIsDeleteDialogOpen(open)
          }
        }}
      >
        <AlertDialogContent
          onEscapeKeyDown={(e) => {
            if (isDeleting) {
              e.preventDefault()
            }
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus Warga dengan NIK {resident.nik}?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(resident?.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

const calculateAge = (birthDate: Date | string): number => {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export const residentsColumn: ColumnDef<Residents>[] = [
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "birthDate",
    header: "Usia",
    cell: ({ row }) => {
      const birthDate = row.getValue("birthDate") as string
      const age = calculateAge(birthDate)
      return `${age} tahun`
    },
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string
      return gender === "MALE" ? "Laki-laki" : "Perempuan"
    },
  },
  {
    accessorKey: "familyMember",
    header: "Nomor KK",
    cell: ({ row }) => {
      const familyMember = row.getValue("familyMember") as any
      return familyMember?.family?.kkNumber
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell resident={row.original} />,
  },
]
