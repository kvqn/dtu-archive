"use server";

import { prisma } from "@/prisma";
import { Session } from "next-auth";

export async function getFile(name: string, session: Session | null) {
  let user;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  }

  const file = await prisma.file.findUnique({
    where: {
      name: name,
    },
  });
  if (!file) return null;

  await prisma.fileViews.create({
    data: {
      fileId: file.id,
      userId: user?.id ? user.id : null,
    },
  });

  return JSON.parse(JSON.stringify(file));
}
