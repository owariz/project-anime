import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { animeId: string; episodeId: string } }) {
    const episodeNum = parseInt(params.episodeId, 10);

    try {
        const episode = await prisma.episode.findFirst({
            where: {
                anime: { animeId: params.animeId },
                episodeNumber: Number(episodeNum),
            },
        });

        if (!episode) {
            return Response.json({ isError: true, message: 'Episode not found' }, { status: 404 });
        }

        // อัปเดตสถานะ Episode เป็น "broken"
        await prisma.episode.update({
            where: { id: episode.id },
            data: { status: 'broken' },  // ถ้าคุณมีฟิลด์ status ใน model
        });

        return Response.json({ isError: false, message: 'Episode marked as broken' });
    } catch (error: unknown) {
        console.error(error);
        return Response.json({ isError: true, message: 'Error marking episode as broken' }, { status: 500 });
    }
}