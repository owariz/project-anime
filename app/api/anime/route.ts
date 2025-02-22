import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const animes = await prisma.anime.findMany();

        return Response.json({ isError: false, data: animes }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ isError: true, message: 'Error fetching anime data' }, { status: 500 });
    }
}