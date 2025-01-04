import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createFamilySchema, updateFamilySchema } from "@/schemas/family"

export async function GET(request: Request) {
  try {
    const families = await prisma.family.findMany({
      include: {
        familyMembers: true,
      },
    })

    if (!families) {
      return NextResponse.json(
        { message: "Families not found." },
        { status: 404 }
      )
    }

    const formattedFamilies = families.map((family) => ({
      id: family.id,
      kkNumber: family.kkNumber,
      address: family.address,
      rt: family.rt,
      rw: family.rw,
      numberOfFamily: family.familyMembers.length,
    }))

    return NextResponse.json({ status: 200, data: formattedFamilies })
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
      kkNumber,
      address,
      rt,
      rw,
      subDistrict,
      district,
      city,
      province,
      postalCode,
      publishDate,
    } = createFamilySchema.parse(await req.json())

    await prisma.family.create({
      data: {
        kkNumber,
        address,
        rt,
        rw,
        subDistrict,
        district,
        city,
        province,
        postalCode,
        publishDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { message: "Family created successfully." },
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
      kkNumber,
      address,
      rt,
      rw,
      subDistrict,
      district,
      city,
      province,
      postalCode,
      publishDate,
    } = updateFamilySchema.parse(await req.json())

    await prisma.family.update({
      where: { id },
      data: {
        kkNumber,
        address,
        rt,
        rw,
        subDistrict,
        district,
        city,
        province,
        postalCode,
        publishDate,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { message: "Family updated successfully." },
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
