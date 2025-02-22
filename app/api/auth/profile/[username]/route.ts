import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { username: string } }) {
    const username = params.username;

    try {
        const users = await prisma.user.findMany({
            where: { name: username },
            include: {
                accounts: true,
                profile: {
                    include: {
                        favoriteAnimes: true
                    }
                }
            }
        });

        if (users.length === 0) return Response.json({ isError: true, message: 'User not found' }, { status: 404 });

        const user = users[0];
        const account = user.accounts[0];
        const accountId = account.userId;

        const accountRoles = await prisma.accountRole.findMany({
            where: { accountId: accountId },
        });

        const roleIds = accountRoles.map(accountRole => accountRole.roleId);

        const roles = await prisma.role.findMany({
            where: { id: { in: roleIds } },
        });

        const profile = {
            accountId: account.providerAccountId,
            username: user.name,
            email: user.email,
            provider: account.provider,
            profileImage: user.image,
            roles: roles.map(role => role.name),
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            favoriteAnimes: user.profile?.favoriteAnimes || [] // ข้อมูลอนิเมที่ถูกบันทึกเป็นรายการโปรด
        };

        return Response.json({ isError: false, profile });
    } catch (error: unknown) {
        console.error("Error:", error);
        return Response.json({ isError: true, message: 'Error' }, { status: 500 });
    }
}