import { DefaultSession } from "next-auth";

declare module "next-auth" {
  //  Extend the Session user object type
  interface Session {

    token: {
      id?: string;
      role?: string;
    };
    
    user: {
      id?: string;
      role?: string; // <-- This tells TypeScript that 'role' exists!
    } & DefaultSession["user"];
  }

  // Extend the standard User object type 
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  // Extend the JWT token structure so callbacks recognize it
  interface JWT {
    id?: string;
    role?: string;
  }
}