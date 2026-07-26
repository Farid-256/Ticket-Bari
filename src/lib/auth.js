import { betterAuth } from "better-auth";
import { getOAuthState } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTHDB_NAME);

const ALLOWED_ROLES = ["user", "vendor"];

function resolveRole(userRole, oauthRole) {
    if (userRole && ALLOWED_ROLES.includes(userRole)) return userRole;
    if (oauthRole && ALLOWED_ROLES.includes(oauthRole)) return oauthRole;
    return "user";
}

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google :{
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
    },
    database: mongodbAdapter(db, {
        client
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                input: true,
            }
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const oauthState = await getOAuthState();
                    return {
                        data: {
                            ...user,
                            role: resolveRole(user.role, oauthState?.role),
                        },
                    };
                },
            },
        },
    },
});