import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const residents = await prisma.resident.groupBy({
      by: ["gender"],
      _count: {
        gender: true,
      },
    })

    if (!residents) {
      return NextResponse.json(
        { message: "Residents not found." },
        { status: 404 }
      )
    }

    const result = residents.map((resident) => {
      return {
        gender: resident.gender,
        count: resident._count.gender,
      }
    })

    return NextResponse.json({ status: 200, data: result })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}
