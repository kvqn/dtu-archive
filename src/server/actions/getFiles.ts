"use server"

import { prisma } from "@/prisma"

import { getUser } from "./getUser"

export async function getFiles(tags?: number[]) {
  const user = await getUser()
  const userId = user?.email
    ? (
        await prisma.user.findUnique({
          select: {
            id: true,
          },
          where: {
            email: user.email,
          },
        })
      )?.id
    : undefined

  const files = await prisma.file.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      createdAt: true,
      _count: {
        select: {
          FileHearts: true,
          FileViews: true,
        },
      },
      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      FileTags: {
        select: {
          tag: true,
        },
      },
      FileHearts: userId
        ? {
            select: {
              userId: true,
            },
            where: {
              userId,
            },
          }
        : false,
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(tags
      ? {
          where: {
            FileTags: {
              some: {
                tagId: {
                  in: tags,
                },
              },
            },
          },
        }
      : {}),
  })

  return files.map((file) => ({
    id: file.id,
    name: file.name,
    type: file.type,
    createdAt: file.createdAt,
    hearts: file._count.FileHearts,
    views: file._count.FileViews,
    uploadedBy: file.uploadedBy,
    tags: file.FileTags.map((fileTag) => fileTag.tag),
    hearted: file.FileHearts.length > 0,
  }))
}
