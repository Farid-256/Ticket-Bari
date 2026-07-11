import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTHDB_NAME);

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
                default: 'user'
            }
        }
    }
});