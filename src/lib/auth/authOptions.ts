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
                console.log('profile', profile);
                console.log('tokens', token);

                // to extract data form profile which is from google provider and then store in database
                const data = {
                    fname: profile.given_name,
                    lname: profile.family_name,
                    email: profile.email,
                    provider: 'Google',
                    externalId: profile.sub,
                    image: profile.picture,
                };

                // storing in database
                try {
                    const user = await db
                        .insert(users)
                        .values(data)
                        .onConflictDoUpdate({ target: users.email, set: data }) // email could be repeat so target it and set data again to update
                        .returning();

                    // returning the data to use to store it in cookies/ token  
                    return {
                        ...data,
                        name: data.fname,
                        id: String(user[0].id),
                        role: user[0].role,
                    }
                } catch (err) {
                    console.log(err);
                    return {
                        id: '',
                    }
                }
            }
        })
    ],

    callbacks: {
        async session({session, token}: { session: any; token: any }) {
            if (session.user) {
                session.user.role = token.role,
                session.user.id = token.id;
            }

            return session;
        },
        
        async jwt({token, user}: { token: any; user: any}) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        }
    }
}

