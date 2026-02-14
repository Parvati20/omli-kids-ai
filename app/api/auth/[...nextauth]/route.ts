import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getMongoClient } from "@/lib/mongodb";

const handler = NextAuth({
  adapter: MongoDBAdapter(getMongoClient(), {
    databaseName: "omliKids",
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const client = await getMongoClient();
      const db = client.db("omliKids");
      
      if (user?.email) {
        // Store full Google account data
        await db.collection("users").updateOne(
          { email: user.email },
          {
            $set: {
              name: user.name || profile?.name || "",
              email: user.email,
              image: user.image || (profile as any)?.picture || "",
              googleId: account?.providerAccountId || "",
              provider: account?.provider || "google",
              lastLoginAt: new Date(),
            },
            $setOnInsert: { 
              createdAt: new Date(),
            },
          },
          { upsert: true }
        );
      }
      return true;
    },
    
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.image = user.image || (profile as any)?.picture || "";
        token.googleId = account?.providerAccountId || "";
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.image = (token.image as string) || "";
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
