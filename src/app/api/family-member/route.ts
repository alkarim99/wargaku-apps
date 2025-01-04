import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  createFamilyMemberSchema,
  updateFamilyMemberSchema,
} from "@/schemas/familyMember"

export async function GET() {
  // const session = await getServerSession(authOptions)

  // if (!session?.user?.email) {
  //   return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  // }

  try {
    const familyMembers = await prisma.familyMember.findMany({
      select: {
        id: true,
        family: {
          select: {
            id: true,
            kkNumber: true,
            rt: true,
            rw: true,
          },
        },
        resident: {
          select: {
            id: true,
            nik: true,
            name: true,
            birthDate: true,
            gender: true,
          },
        },
      },
    })

    if (!familyMembers) {
      return NextResponse.json(
        { message: "Residents not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ status: 200, data: familyMembers })
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
    const { familyRelation, familyId, residentId } =
      createFamilyMemberSchema.parse(await req.json())

    await prisma.familyMember.create({
      data: {
        familyRelation,
        family: { connect: { id: familyId } },
        resident: { connect: { id: residentId } },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { message: "Family member created successfully." },
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
    const { id, familyRelation, familyId, residentId } =
      updateFamilyMemberSchema.parse(await req.json())

    await prisma.familyMember.update({
      where: { id },
      data: {
        familyRelation,
        familyId,
        residentId,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { message: "Family member updated successfully." },
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
