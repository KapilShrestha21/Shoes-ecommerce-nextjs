import GoogleProvider from 'next-auth/providers/google'
import { db } from '../db/db';
import { users } from '../db/schema';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile, token: any) {
                console.log('Google raw profile received:', profile.email);

                // Map exactly to your Drizzle schema keys
                const data = {
                    fname: profile.given_name || "",
                    lname: profile.family_name || "",
                    email: profile.email,
                    provider: 'Google',
                    externalId: profile.sub,
                    image: profile.picture || "",
                };

                try {
                    const user = await db
                        .insert(users)
                        .values(data)
                        .onConflictDoUpdate({
                            target: users.email,
                            set: {
                                fname: data.fname,
                                lname: data.lname,
                                image: data.image,
                                externalId: data.externalId,
                            },
                        })
                        .returning();

                    if (!user[0]) {
                        throw new Error("User creation failed");
                    }

                    return {
                        id: String(user[0].id),
                        name: `${user[0].fname} ${user[0].lname}`.trim(),
                        email: user[0].email,
                        image: user[0].image,
                        role: user[0].role,
                    };

                } catch (err) {
                    console.error("DATABASE INSERTION CRASHED:", err);

                    throw err;
                }
            }
        })
    ],

    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            console.log("SESSION:", session);
            console.log("TOKEN:", token);

            if (session.user) {
                session.user.role = token.role,
                    session.user.id = token.id;
            }

            return session;
        },

        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        }
    }
}

