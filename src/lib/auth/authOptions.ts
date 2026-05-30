import GoogleProvider from 'next-auth/providers/google'
import { db } from '../db/db';
import { users } from '../db/schema';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile) {
                console.log('Google Profile Payload:', profile);

                const data = {
                    fname: profile.given_name || "",
                    lname: profile.family_name || "",
                    email: profile.email,
                    provider: 'Google',
                    externalId: profile.sub, // Make sure this matches your schema property name
                    image: profile.picture || "",
                };

                try {
                    const user = await db
                        .insert(users)
                        .values({
                            fname: data.fname,
                            lname: data.lname,
                            email: data.email,
                            provider: data.provider,
                            externalId: data.externalId, // Drizzle maps this to external_id automatically
                            image: data.image
                        })
                        .onConflictDoUpdate({
                            target: users.email,
                            set: {
                                fname: data.fname,
                                lname: data.lname,
                                image: data.image,
                            }
                        })
                        .returning();

                    if (user && user[0]) {
                        return {
                            id: String(user[0].id),
                            name: `${user[0].fname} ${user[0].lname}`.trim(),
                            email: user[0].email,
                            image: user[0].image,
                            role: user[0].role,
                        }
                    }
                } catch (err) {
                    // This will print the exact database constraint violation in your Vercel logs
                    console.error("❌ SUPABASE INSERTION CRASHED:", err);
                    throw new Error("Database sync failed: " + JSON.stringify(err));
                }

                throw new Error("User creation failed completely.");
            }
        })
    ],

    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
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

