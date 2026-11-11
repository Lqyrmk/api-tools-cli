import type { Result } from "./types.js";


const BASE_URL = "https://jsonplaceholder.typicode.com"

export async function request(path: string): Promise<unknown> {

    let res: Response;

    try {
        res = await fetch(`${BASE_URL}${path}`, {
            headers: { Accept: "application/json" },
        });
    } catch(e) {
        throw new Error(`NETWORK: ${String(e)}`);
    }

    if (!res.ok) {
        throw new Error(`HTTP: ${res.status}`);
    }

    try {
        return await res.json();
    } catch {
        throw new Error("PARSE: invalid JSON");
    }

}


