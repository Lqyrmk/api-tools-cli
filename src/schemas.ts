import { z } from "zod"

export const PostSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
});

export const CommentSchema = z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.string(),
    body: z.string(),
});

export const AlbumSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
});

export const PhotoSchema = z.object({
    albumId: z.number(),
    id: z.number(),
    title: z.string(),
    url: z.string(),
    thumbnailUrl: z.string(),
});

export const TodoSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    address: z.object({
        street: z.string(),
        suite: z.string(),
        city: z.string(),
        zipcode: z.string(),
        geo: z.object({
            lat: z.string(),
            lng: z.string(),
        }),
    }),
    phone: z.string(),
    website: z.string(),
    company: z.object({
        name: z.string(),
        catchPhrase: z.string(),
        bs: z.string(),
    }),
});
