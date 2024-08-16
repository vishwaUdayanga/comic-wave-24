import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {token: string}}) {
    const { token } = params

    const student = await prisma.student.findFirst({
        where: {
            ActivateToken: {
                some: {
                    AND: [
                        {
                            activatedAt: null,
                        },
                        {
                            createdAt: {
                                gt: new Date(Date.now() - 24*60*60*1000)
                            }
                        },
                        {
                            token
                        }
                    ]
                }
            }
        }
    })

    if (!student) {
        throw new Error('Invalid token.')
    }

    await prisma.student.update({
        where: {
            id: student.id
        },
        data: {
            active: true
        }
    })

    await prisma.activateToken.update({
        where: {
            token,
        },
        data: {
            activatedAt: new Date(),
        }
    })

    redirect('/login')
} 