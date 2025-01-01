"use client"

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

export type Families = {
  id: string
  kkNumber: string
  address: string
  rt: string
  rw: string
  numberOfFamily: number
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
    cell: ({ row }) => {
      const family = row.original
      const router = useRouter()
      const handleEdit = (id: string) => {
        router.push(`/families/update/${id}`)
      }

      return (
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
            <DropdownMenuItem onClick={() => alert(family.id)}>
              Lihat Kartu Keluarga
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(family.id)}>
              Ubah Kartu Keluarga
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(family.id)}>
              Hapus Kartu Keluarga
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
