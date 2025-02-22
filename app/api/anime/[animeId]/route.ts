import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { animeId: string } }) {
    try {
        const anime = await prisma.anime.findUnique({
            where: { animeId: params.animeId },
            include: { episodes: true },
        });

        if (!anime) return Response.json({ isError: true, message: 'Anime not found' }, { status: 404 });

        return Response.json({ isError: false, data: anime }, { status: 200 });
    } catch (error: unknown) {
        console.error(error);
        return Response.json({ isError: true, message: 'Error fetching anime data' }, { status: 500 });
    }
}