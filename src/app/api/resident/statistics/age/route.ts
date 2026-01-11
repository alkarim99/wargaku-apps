import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { Gender } from "generated/client"

// Interface untuk hasil pengelompokan usia
interface AgeGroupStats {
  category: string
  count: number
  percentage: string
  maleCount: number
  femaleCount: number
}

const ageCategories = [
  {
    name: "Batita (0-3 tahun)",
    condition: getAgeCondition(0, 3),
  },
  {
    name: "Balita (<5 tahun)",
    condition: getAgeCondition(0, 5),
  },
  {
    name: "Anak (5-11 tahun)",
    condition: getAgeCondition(5, 11),
  },
  {
    name: "Remaja (12-25 tahun)",
    condition: getAgeCondition(12, 25),
  },
  {
    name: "Dewasa (26-59 tahun)",
    condition: getAgeCondition(26, 59),
  },
  {
    name: "Lansia (≥60 tahun)",
    condition: getAgeCondition(60),
  },
]

// Fungsi helper untuk menghitung usia
function getAgeCondition(minYears: number, maxYears?: number) {
  const currentDate = new Date()

  const minDate = new Date(currentDate)
  minDate.setFullYear(currentDate.getFullYear() - minYears)

  if (maxYears) {
    const maxDate = new Date(currentDate)
    maxDate.setFullYear(currentDate.getFullYear() - maxYears)
    return {
      lte: minDate,
      gt: maxDate,
    }
  }

  return {
    lte: minDate,
  }
}

export async function GET(request: Request) {
  try {
    // Menggunakan Promise.all untuk menunggu semua promise selesai
    const totalResidents = await prisma.resident.count()

    const result = await Promise.all(
      ageCategories.map(async (category) => {
        // Hitung total dalam kategori
        const totalInCategory = await prisma.resident.count({
          where: {
            birthDate: category.condition,
          },
        })

        // Hitung jumlah laki-laki dalam kategori
        const maleCount = await prisma.resident.count({
          where: {
            birthDate: category.condition,
            gender: Gender.MALE,
          },
        })

        // Hitung jumlah perempuan dalam kategori
        const femaleCount = await prisma.resident.count({
          where: {
            birthDate: category.condition,
            gender: Gender.FEMALE,
          },
        })

        // Hitung total penduduk untuk persentase
        const percentage =
          totalResidents > 0
            ? ((totalInCategory / totalResidents) * 100).toFixed(2)
            : "0.00"

        return {
          category: category.name,
          count: totalInCategory,
          percentage: `${percentage}%`,
          maleCount,
          femaleCount,
        }
      })
    )

    return NextResponse.json({
      status: 200,
      data: result,
    })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}
