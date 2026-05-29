import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = process.env.DATABASE_URL;

if (!queryString) {
    throw new Error("DATABASE_URL environment variable is missing!");
}

declare global {
    // eslint-disable-next-line no-var
    var postgresConnection: postgres.Sql | undefined;
}

export let connection: postgres.Sql;

if (process.env.NODE_ENV === "production") {

    connection = postgres(queryString, {
        ssl: "require",
        prepare: false,
    });

} else {

    if (!global.postgresConnection) {

        global.postgresConnection = postgres(queryString, {
            ssl: "require",
        });

    }

    connection = global.postgresConnection;
}

export const db = drizzle(connection);