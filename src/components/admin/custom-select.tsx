"use client"

import React, { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { getAllKkNumber } from "@/lib/family/actions"
import { useRouter } from "next/navigation"

interface SearchableKKSelectProps {
  onChange: (value: { id: string; kkNumber: string } | null) => void
  value?: { id: string; kkNumber: string } | null
}

const SearchableKKSelect = ({
  onChange,
  value: externalValue,
}: SearchableKKSelectProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [kkNumbers, setKkNumbers] = useState<
    { id: string; kkNumber: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchKKNumbers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getAllKkNumber()
      const data = await response.data
      setKkNumbers(data)
    } catch (err: any) {
      setError(err.message)
      console.error("Error fetching KK numbers:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchKKNumbers()
  }, []) // Initial load

  // Refresh data when popover opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      fetchKKNumbers()
    }
    setOpen(newOpen)
  }

  const filteredKKNumbers = kkNumbers.filter((kk) =>
    kk.kkNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (selectedKK: { id: string; kkNumber: string }) => {
    onChange(selectedKK)
    setOpen(false)
  }

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            role="combobox"
            aria-expanded={open}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading KK Numbers...
              </div>
            ) : externalValue?.kkNumber ? (
              externalValue.kkNumber
            ) : (
              "Pilih nomor KK"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[var(--radix-popover-trigger-width)] p-4">
          <div className="flex items-center border rounded-md px-3 mb-4">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search KK number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {error ? (
              <div className="py-2 text-center text-sm text-red-500">
                Error: {error}
              </div>
            ) : isLoading ? (
              <div className="py-2 text-center text-sm text-gray-500 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </div>
            ) : filteredKKNumbers.length === 0 ? (
              <div className="py-2 text-center text-sm text-gray-500">
                No KK number found.
              </div>
            ) : (
              filteredKKNumbers.map((kk) => (
                <Button
                  key={kk?.id}
                  variant="ghost"
                  className="w-full justify-start mb-1"
                  onClick={() => handleSelect(kk)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      externalValue?.id === kk?.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {kk?.kkNumber}
                </Button>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default SearchableKKSelect
