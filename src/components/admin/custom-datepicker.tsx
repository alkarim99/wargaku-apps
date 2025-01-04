import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect, useMemo } from "react"

interface CustomDatePickerProps {
  date: Date | string | undefined
  setDate: (date: Date) => void
}

const CustomDatePicker = ({ date, setDate }: CustomDatePickerProps) => {
  const years = Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, i) => (1950 + i).toString()
  )

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  )

  const getDateObject = (dateValue: Date | string | undefined) => {
    if (!dateValue) return undefined
    return typeof dateValue === "string" ? new Date(dateValue) : dateValue
  }

  const dateObject = getDateObject(date)

  const [selectedYear, setSelectedYear] = useState<string>(
    dateObject ? dateObject.getFullYear().toString() : ""
  )
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dateObject ? months[dateObject.getMonth()] : ""
  )

  useEffect(() => {
    const newDateObject = getDateObject(date)
    if (newDateObject) {
      setSelectedYear(newDateObject.getFullYear().toString())
      setSelectedMonth(months[newDateObject.getMonth()])
    }
  }, [date, months])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateObject ? format(dateObject, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="grid grid-cols-2 gap-2">
          <Select
            value={selectedYear}
            onValueChange={(year) => {
              setSelectedYear(year)
              const newDate = new Date(dateObject || new Date())
              newDate.setFullYear(parseInt(year))
              setDate(newDate)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent position="popper">
              {years.reverse().map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedMonth}
            onValueChange={(month) => {
              setSelectedMonth(month)
              const newDate = new Date(dateObject || new Date())
              newDate.setMonth(months.indexOf(month))
              setDate(newDate)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent position="popper">
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={dateObject}
          onSelect={(selectedDate) => {
            if (selectedDate && selectedYear && selectedMonth) {
              const newDate = new Date(selectedDate)
              newDate.setFullYear(parseInt(selectedYear))
              newDate.setMonth(months.indexOf(selectedMonth))
              setDate(newDate)
            }
          }}
          month={dateObject || new Date()}
          defaultMonth={dateObject || new Date()}
          disabled={{
            before: new Date(
              parseInt(selectedYear),
              months.indexOf(selectedMonth),
              1
            ),
            after: new Date(
              parseInt(selectedYear),
              months.indexOf(selectedMonth) + 1,
              0
            ),
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default CustomDatePicker
