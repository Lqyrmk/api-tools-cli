import { request } from "./http.js"

const path: string = "/users/1"
const data: unknown = await request(path)
console.log(data);