import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createResidentSchema, updateResidentSchema } from "@/schemas/resident"

export async function GET() {
  try {
    const residents = await prisma.resident.findMany({
      select: {
        id: true,
        nik: true,
        name: true,
        birthDate: true,
        gender: true,
        familyMember: {
          select: {
            family: {
              select: {
                id: true,
                kkNumber: true,
              },
            },
            familyRelation: true,
          },
        },
      },
    })

    if (!residents) {
      return NextResponse.json(
        { message: "Residents not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ status: 200, data: residents })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const {
      nik,
      name,
      birthPlace,
      birthDate,
      gender,
      religion,
      education,
      work,
      marriageStatus,
      nationality,
      phone,
    } = createResidentSchema.parse(await req.json())

    const resident = await prisma.resident.create({
      data: {
        nik,
        name,
        birthPlace,
        birthDate,
        gender,
        religion,
        education,
        work,
        marriageStatus,
        nationality,
        phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { message: "Resident created successfully.", data: resident },
      { status: 201 }
    )
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const {
      id,
      nik,
      name,
      birthPlace,
      birthDate,
      gender,
      religion,
      education,
      work,
      marriageStatus,
      nationality,
      phone,
    } = updateResidentSchema.parse(await req.json())

    await prisma.resident.update({
      where: { id },
      data: {
        nik,
        name,
        birthPlace,
        birthDate,
        gender,
        religion,
        education,
        work,
        marriageStatus,
        nationality,
        phone,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { message: "Resident updated successfully." },
      { status: 201 }
    )
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}
