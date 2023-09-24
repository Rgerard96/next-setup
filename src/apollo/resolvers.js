import Post from '@/models/Post';
import User from '@/models/User';
import { GraphQLError } from 'graphql';
import { Resend } from 'resend';
import StripeWelcomeEmail from '@/react-email-templates/emails/stripe-welcome';
import NotionMagicLinkEmail from '@/react-email-templates/emails/notion-magic-link';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export const resolvers = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();

                return users;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPosts() {
            try {
                const posts = await Post.find();

                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async createCheckoutSession() {
            try {
                const session = await stripe.checkout.sessions.create(
                    {
                        mode: 'payment',
                        line_items: [
                            {
                                price: 'price_1NtnFRKoRQCq5b4xtGYi0XoG',
                                quantity: 1,
                            },
                        ],
                        success_url: "".concat("http://localhost:3000", "/success"), //success
                        cancel_url: "".concat("http://localhost:3000", "/cancel"),  //cancel
                    }
                );

                console.log(session);

                return JSON.stringify({
                    url: session.url
                });
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async post(_, { body }) {
            if (body === '') {
                throw new GraphQLError('Body must not be empty');
            }

            const newPost = new Post({
                body,
                createdAt: new Date().toISOString()
            });

            const res = await newPost.save();

            const token = '3245';

            try {
                const data = await resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>',
                    to: 'rashidgerard@hotmail.com',
                    subject: 'Hello world',
                    react: NotionMagicLinkEmail(token),
                });


                return data;
            } catch (error) {
                throw new Error(error);
            }

            return {
                ...res._doc,
                id: res._id
            };
        }
    },
};