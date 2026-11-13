#!/usr/bin/env node

import { parseArgs } from "node:util"
import { z } from "zod"
import { getPosts, getComments, getAlbums, getPhotos, getTodos, getUser } from "../src/api.js"
import type { Album, Comment, Photo, Post, Todo, User } from "../src/types.js"


const { values, positionals } = parseArgs({
    options: {
        desc: { type: "string", short: "d" },
        help: { type: "boolean", short: "h" },
    },
    allowPositionals: true,
    strict: true,
});


const description = values.desc;
const [command, rawId] = positionals;
console.log('positionals :>> ', positionals);

const helpInfo = `
Usage: tool-cli [options] <command> <rawId>

Options:
-d, --desc <description> Description of operation
-h, --help               Show this help

These are common commands used in various situations:
    user       get a user by user ID
    post       get posts by user ID
    comment    get comments by post ID
    album      get albums by user ID
    photo      get photos by album ID
    todo       get todos by user ID

`;


function printHelp(): void {
    console.error(helpInfo);
}

if (values.help) {
    printHelp();
    process.exit(1);
}

if (command === undefined) {  // command: string | undefined
    console.error('Error: Missing <command>');
    printHelp();
    process.exit(1);
}

if (rawId === undefined) {  // rawId: number | undefined
    console.error('Error: Missing <rawId>');
    printHelp();
    process.exit(1);
}

const commandSet = new Set<string>(['user', 'posts', 'comments', 'albums', 'photos', 'todos']);

if (!commandSet.has(command)) {  // command: string
    console.error(`Error: Unknown command '${command}' \n<command> must be in ['user', 'posts', 'comments', 'albums', 'photos', 'todos']`);
    printHelp();
    process.exit(1);
}

const id = Number(rawId);

if (!Number.isInteger(id) || id <= 0) {
    console.error("Error: <rawId> must be a valid integer!");
    printHelp();
    process.exit(1);
}


function handle_result<T>(result: z.ZodSafeParseResult<T>): void {
    if (!result.success) {
        throw result.error; // 抛 ZodError，上层 catch 接住
    }

    const data = result.data;
    if (Array.isArray(data)) {
        // 遍历数组
        console.log("\n## Data list: \n", data);
        for (const item of data) {
            console.log(item);
        }
    } else {
        console.log("\n## Data: \n", data);
    }
}

const start = description === undefined ? "GET API" : description

try {
    if (command === "posts") {

        let userId = id;
        console.log(`${start}:\n/${command}?userId=${userId}`)
        const postsResult = await getPosts(userId);
        handle_result<Post[]>(postsResult);

    } else if (command === "comments") {

        let postId = id;
        console.log(`${start}:\n/${command}?postId=${postId}`)
        const commentsResult = await getComments(postId);
        handle_result<Comment[]>(commentsResult);

    } else if (command === "albums") {

        let userId = id;
        console.log(`${start}:\n/${command}?userId=${userId}`)
        const albumsResult = await getAlbums(userId);
        handle_result<Album[]>(albumsResult);

    } else if (command === "photos") {

        let albumId = id;
        console.log(`${start}:\n/${command}?albumId=${albumId}`)
        const photosResult = await getPhotos(albumId);
        handle_result<Photo[]>(photosResult);

    } else if (command === "todos") {

        let userId = id;
        console.log(`${start}:\n/${command}?userId=${userId}`)
        const todosResult = await getTodos(userId);
        handle_result<Todo[]>(todosResult);

    } else if (command === "user") {

        let userId = id;
        console.log(`${start}:\n/${command}/${userId}`)
        const userResult = await getUser(userId);
        handle_result<User>(userResult);

    } else {
        console.error(`Error: Unknown command '${command}'`);
        process.exit(1);
    }
} catch(e) {
    if (e instanceof z.ZodError) {
        console.error("Error: ", e.issues);
    } else if (e instanceof Error) {
        console.error("Error: ", e.message);
    } else {
        console.error("Error: ", e);
    }
}

