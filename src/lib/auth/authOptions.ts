import GoogleProvider from 'next-auth/providers/google'
import { db } from '../db/db';
import { users } from '../db/schema';
import { AuthOptions } from 'next-auth';
import { eq } from 'drizzle-orm';

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
        async jwt({ token, user }: { token: any; user: any }) {
            // Initial sign-in
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            // Subsequent visits: Fetch freshest role straight from Supabase
            else if (token.email) {
                try {
                    console.log("PRODUCTION CHECK: Attempting to fetch user for email:", token.email);

                    const dbUser = await db
                        .select({ id: users.id, role: users.role })
                        .from(users)
                        .where(eq(users.email, token.email))
                        .limit(1);

                    if (dbUser && dbUser[0]) {
                        console.log("PRODUCTION CHECK: Found user role:", dbUser[0].role);
                        token.id = String(dbUser[0].id);
                        token.role = dbUser[0].role;
                    } else {
                        console.log("PRODUCTION CHECK: No user found in DB for this email.");
                    }
                } catch (error) {
                    // This log will reveal exactly why Supabase is blocking Vercel
                    console.error("PRODUCTION CRITICAL DATABASE ERROR:", error);
                }
            }

            return token;
        },

        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    }
}

