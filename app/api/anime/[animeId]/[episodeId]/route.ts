import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { animeId: string; episodeId: string } }) {
    try {
        const episodeNum = parseInt(params.episodeId, 10);

        if (isNaN(episodeNum)) return Response.json({ isError: true, message: 'Invalid episode number' }, { status: 400 })

        const episode = await prisma.episode.findFirst({
            where: {
                anime: {
                    animeId: params.animeId,
                },
                episodeNumber: episodeNum,
            },
            include: { anime: false },
        });

        if (!episode) return Response.json({ isError: true, message: 'Episode not found' }, { status: 404 })

        return Response.json({ isError: false, data: episode }, { status: 200 })
    } catch (error: unknown) {
        console.error(error);
        return Response.json({ isError: true, message: 'Error fetching episode data' }, { status: 500 })
    }
}