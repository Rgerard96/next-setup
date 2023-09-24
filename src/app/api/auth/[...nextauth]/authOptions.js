import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import generateAuthtoken from "@/lib/generateAuthtoken";
import { Resend } from 'resend';
import NotionMagicLinkEmail from "@/react-email-templates/emails/notion-magic-link";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            maxAge: 5 * 60,
            generateVerificationToken: async () => {
                const token = generateAuthtoken();
                return token;
            },
            sendVerificationRequest: async ({
                identifier: email,
                url,
                token,
                baseUrl,
                provider
            }) => {
                const { from } = provider;

                try {
                    const data = await resend.emails.send({
                        from: 'Acme <onboarding@resend.dev>',
                        to: email,
                        subject: `Sign in code ${token}`,
                        react: NotionMagicLinkEmail({ url, token }),
                    });

                    return data;
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: '/auth/signin',
    }
};