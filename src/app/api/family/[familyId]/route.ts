import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDetailFamilySchema, deleteFamilySchema } from "@/schemas/family"

export async function GET(
  req: Request,
  { params }: { params: { familyId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const { familyId } = params
    const { id } = getDetailFamilySchema.parse({ id: familyId })

    const family = await prisma.family.findUnique({
      where: { id },
      select: {
        id: true,
        kkNumber: true,
        address: true,
        rt: true,
        rw: true,
        subDistrict: true,
        district: true,
        city: true,
        province: true,
        postalCode: true,
        publishDate: true,
        familyMembers: {
          select: {
            familyRelation: true,
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
        },
      },
    })

    if (!family) {
      return NextResponse.json(
        { message: "Family not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ status: 200, data: family })
  } catch (error) {
    const err = error as Error
    return NextResponse.json(
      { message: `Internal server error. ${err.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { familyId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const { familyId } = params
    const { id } = deleteFamilySchema.parse({ id: familyId })

    const familyData = await prisma.family.findUnique({
      where: { id },
      include: {
        familyMembers: true,
      },
    })

    if (!familyData) {
      return NextResponse.json(
        { message: "Family not found." },
        { status: 404 }
      )
    }

    if (familyData.familyMembers.length > 0) {
      return NextResponse.json(
        { message: "Family has family members." },
        { status: 400 }
      )
    }

    const family = await prisma.family.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Family deleted successfully." },
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
