import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { email: string } }) {
    const email = params.email;

    try {
        const user = await prisma.user.findFirst({
            where: { email },
            include: {
                accounts: true
            }
        });

        const accountId = user?.accounts[0].userId;

        const accountRoles = await prisma.accountRole.findMany({
            where: { accountId },
        });

        const roleIds = accountRoles.map(accountRole => accountRole.roleId);

        const roles = await prisma.role.findMany({
            where: { id: { in: roleIds } },
        });

        const roleName = roles.map(role => role.name);

        return Response.json({ isError: false, roles: roleName });
    } catch (error: unknown) {
        console.error("Error:", error);
        return Response.json({ isError: true, message: 'Error' }, { status: 500 });
    }
}