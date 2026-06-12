"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addArtist(name: string) {
  await prisma.artist.create({
    data: { name, listeners: "0", status: "Active" }
  });
  revalidatePath("/");
}

export async function logTransaction(label: string, amount: number, type: string) {
  await prisma.transaction.create({
    data: { label, amount, type }
  });
  revalidatePath("/");
}

export async function getDashboardData() {
  const artists = await prisma.artist.findMany();
  const transactions = await prisma.transaction.findMany();
  const sessions = await prisma.session.findMany();
  return { artists, transactions, sessions };
}
