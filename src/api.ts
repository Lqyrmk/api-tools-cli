import type { Post, Comment, Album, Photo, Todo, User } from "./types.js"
import { request } from "./http.js"
import { PostSchema, CommentSchema, AlbumSchema, PhotoSchema, TodoSchema, UserSchema } from "./schemas.js"
import type { z } from "zod";

// if (result.success) {
//     const user = result.data;
//     console.log("### post data: \n", user);
// } else {
//     const fieldErrors = z.flattenError(result.error).fieldErrors;
//     console.log("### fieldErrors: \n", fieldErrors);
// }

export async function getPosts(
    userId: number
): Promise<z.ZodSafeParseResult<Post[]>> {
    const data = await request(`/posts?userId=${userId}`)
    return PostSchema.array().safeParse(data)
}

export async function getComments(
    postId: number
): Promise<z.ZodSafeParseResult<Comment[]>> {
    const data = await request(`/comments?postId=${postId}`)
    return CommentSchema.array().safeParse(data)
}

export async function getAlbums(
    userId: number
): Promise<z.ZodSafeParseResult<Album[]>> {
    const data = await request(`/albums?userId=${userId}`)
    return AlbumSchema.array().safeParse(data)
}

export async function getPhotos(
    albumId: number
): Promise<z.ZodSafeParseResult<Photo[]>> {
    const data = await request(`/photos?albumId=${albumId}`)
    return PhotoSchema.array().safeParse(data)
}

export async function getTodos(
    userId: number
): Promise<z.ZodSafeParseResult<Todo[]>> {
    const data = await request(`/todos?userId=${userId}`)
    return TodoSchema.array().safeParse(data)
}

export async function getUser(
    id: number
): Promise<z.ZodSafeParseResult<User>> {
    const data = await request(`/users/${id}`)
    return UserSchema.safeParse(data)
}



