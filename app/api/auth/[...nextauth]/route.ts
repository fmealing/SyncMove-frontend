import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "833634892989-g24qq8bogit62gsjjoqbdllb5mfsp2mg.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
