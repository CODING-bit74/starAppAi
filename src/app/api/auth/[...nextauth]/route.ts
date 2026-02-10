import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("[Auth] Authorize called with:", credentials?.email);
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (
                    credentials?.email === adminEmail &&
                    credentials?.password === adminPassword
                ) {
                    console.log("[Auth] Credentials valid. Granting access.");
                    return {
                        id: "1",
                        name: "Admin",
                        email: adminEmail,
                        role: "admin"
                    };
                }
                console.log("[Auth] Credentials invalid.");
                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_build_only",
});

export { handler as GET, handler as POST };
