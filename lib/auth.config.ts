import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      lastLogin?: Date | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GoogleProvider({ // เพิ่ม Google Provider
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      try {
        if (!user.email) {
          console.log("User email is missing");
          return false;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (existingUser) {
          if (!account) {
            console.log("Account information is missing");
            return false;
          }

          const existingAccount = existingUser.accounts.find(
            (acc) => acc.provider === account.provider
          );

          if (!existingAccount) {
            console.log("User attempted to sign in with a different provider");
            return false;
          }

          await prisma.user.update({
            where: { id: existingUser.id },
            data: { lastLogin: new Date() },
          });
        } else {
          if (!account) {
            console.log("Account information is missing");
            return false;
          }

          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
              lastLogin: new Date(),
            },
          });

          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token ?? null,
              access_token: account.access_token ?? null,
              expires_at: account.expires_at ?? null,
              token_type: account.token_type ?? null,
              scope: account.scope ?? null,
              id_token: account.id_token ?? null,
              session_state: account.session_state ?? null,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error updating/creating user:", error);
        return false;
      }
    },
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = Number(user.id);
        const dbUser = await prisma.user.findUnique({
          where: { id: Number(user.id) },
          select: { lastLogin: true },
        });
        if (dbUser?.lastLogin) {
          session.user.lastLogin = dbUser.lastLogin;
        }
      }
      return session;
    },
  },
//   pages: {
//     error: "/auth/error",
//   },
};
