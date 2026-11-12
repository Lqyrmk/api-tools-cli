import type { Album, Comment, Photo, Post, Todo, User } from "../src/types.js"
import { getPosts, getComments, getAlbums, getPhotos, getTodos, getUser } from "../src/api.js"
import { z } from "zod";


function handle_result<T>(result: z.ZodSafeParseResult<T>): void {
    if (result.success) {
        const data = result.data;
        if (Array.isArray(data)) {
            // 遍历数组
            console.log("## Data list: \n", data);
            for (const item of data) {
                console.log(item)
            }
        } else {
            console.log("## Data: \n", data)
        }
    } else {
        console.error(result.error.issues);
    }
}

// Post
const postsResult = await getPosts(1)
handle_result<Post[]>(postsResult)


// Comment
const commentsResult = await getComments(1)
handle_result<Comment[]>(commentsResult)


// Album
const albumsResult = await getAlbums(1)
handle_result<Album[]>(albumsResult)


// Photo
const photosResult = await getPhotos(1)
handle_result<Photo[]>(photosResult)


// Todo
const todosResult = await getTodos(1)
handle_result<Todo[]>(todosResult)


// User
const userResult = await getUser(1)
handle_result<User>(userResult)