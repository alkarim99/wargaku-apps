import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  getDetailResidentSchema,
  deleteResidentSchema,
} from "@/schemas/resident"

export async function GET(
  request: Request,
  { params }: { params: { residentId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const { residentId } = params
    const { id } = getDetailResidentSchema.parse({ id: residentId })

    const resident = await prisma.resident.findUnique({
      where: { id },
      include: {
        familyMember: {
          select: {
            id: true,
            familyRelation: true,
            family: {
              select: {
                id: true,
                kkNumber: true,
              },
            },
          },
        },
      },
    })

    if (!resident) {
      return NextResponse.json(
        { message: "Resident not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ status: 200, data: resident })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { residentId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const { residentId } = params
    const { id } = deleteResidentSchema.parse({ id: residentId })

    // Delete resident
    const resident = await prisma.resident.delete({
      where: { id },
    })

    if (!resident) {
      return NextResponse.json(
        { message: "Resident not found." },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Resident deleted successfully." },
      { status: 200 }
    )
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}
