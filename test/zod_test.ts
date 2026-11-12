import type { Post } from "../src/types.js"
import { PostSchema } from "../src/schemas.js"
import { z } from "zod";

let rawPostData = {
    userId: 111,
    id: 24341,
    title: "邮件通知",
};


console.log("### Post Schema: \n", PostSchema);
console.log("### raw post data: \n", rawPostData);

console.log("=========================================");

// parse
// 校验成功返回深度克隆的类型化数据；
// 失败则抛出 ZodError。
try {
    const post = PostSchema.parse(rawPostData);
    console.log("### post data: \n", post);
} catch (e) {
    if (e instanceof z.ZodError) {
        console.log("### raw e: \n", e);
        console.log("### e issues: \n", e.issues);
    }
}

console.log("=========================================");

// safeParse
// 校验成功返回 { success: true, data: ... }；
// 失败返回 { success: false, error: ZodError }，永不抛错。
const result = PostSchema.safeParse(rawPostData);
console.log("### safeParse result: \n", result)

if (result.success) {
    const post = result.data;
    console.log("### post data: \n", post);
} else {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    console.log("### fieldErrors: \n", fieldErrors);
}
