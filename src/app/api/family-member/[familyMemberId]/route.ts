import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  getDetailFamilyMemberSchema,
  deleteFamilyMemberSchema,
} from "@/schemas/familyMember"

export async function GET(
  req: Request,
  { params }: { params: { familyMemberId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const { familyMemberId } = params
    const { id } = getDetailFamilyMemberSchema.parse({ id: familyMemberId })

    const familyMember = await prisma.familyMember.findUnique({
      where: { id },
      select: {
        id: true,
        familyRelation: true,
        family: true,
        resident: true,
      },
    })

    if (!familyMember) {
      return NextResponse.json(
        { message: "Family member not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ status: 200, data: familyMember })
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
  { params }: { params: { familyMemberId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
  }

  try {
    const { familyMemberId } = params
    const { id } = getDetailFamilyMemberSchema.parse({ id: familyMemberId })

    const familyMember = await prisma.familyMember.delete({
      where: { id },
    })

    if (!familyMember) {
      return NextResponse.json(
        { message: "Family member not found." },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Family member deleted successfully." },
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
