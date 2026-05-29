import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = process.env.DATABASE_URL as string;

if (!queryString) {
    throw new Error("DATABASE_URL environment variable is missing!");
}

let connection: postgres.Sql;

if (process.env.NODE_ENV === "production") {
    // CRITICAL FOR SUPABASE: prepare: false turns off prepared statements, 
    // allowing Drizzle to work flawlessly with Supabase's connection pooler.
    connection = postgres(queryString, { prepare: false });
} else {
    // Local development: use global object to prevent closing connections on file save
    if (!(global as any).postgresConnection) {
        (global as any).postgresConnection = postgres(queryString);
    }
    connection = (global as any).postgresConnection;
}

export const db = drizzle(connection);