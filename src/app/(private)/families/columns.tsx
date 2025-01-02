"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
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
import { deleteFamily } from "@/lib/family/actions"

export type Families = {
  id: string
  kkNumber: string
  address: string
  rt: string
  rw: string
  numberOfFamily: number
}

// Create a separate component for the actions cell
const ActionCell = ({ family }: { family: Families }) => {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // Add loading state

  const handleDetail = (id: string) => {
    router.push(`/families/detail/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/families/update/${id}`)
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      await deleteFamily(id)
      setIsDeleteDialogOpen(false)
      // Instead of router.refresh(), reload the window
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
          <DropdownMenuItem onClick={() => handleDetail(family.id)}>
            Lihat Kartu Keluarga
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleEdit(family.id)}>
            Ubah Kartu Keluarga
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive"
          >
            Hapus Kartu Keluarga
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          // Only allow closing if not in the middle of deleting
          if (!isDeleting) {
            setIsDeleteDialogOpen(open)
          }
        }}
      >
        <AlertDialogContent
          onEscapeKeyDown={(e) => {
            // Prevent closing with Escape key while deleting
            if (isDeleting) {
              e.preventDefault()
            }
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus Kartu Keluarga dengan nomor{" "}
              {family.kkNumber}? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(family?.id)}
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

export const familiesColumn: ColumnDef<Families>[] = [
  {
    accessorKey: "kkNumber",
    header: "KK Number",
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "rt",
    header: "RT",
  },
  {
    accessorKey: "rw",
    header: "RW",
  },
  {
    accessorKey: "numberOfFamily",
    header: "Number of Family",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell family={row.original} />,
  },
]
