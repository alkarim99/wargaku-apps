import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const families = await prisma.family.findMany({
      select: {
        id: true,
        kkNumber: true,
      },
    })

    if (!families) {
      return NextResponse.json(
        { message: "Families not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ status: 200, data: families })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}
