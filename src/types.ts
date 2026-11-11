export type Post = {
    userId: number
    id: number
    title: string
    body: string
}

export type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export type Album = {
    userId: number
    id: number
    title: string
}

export type Photo = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}

export type User = {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export type ApiError =
  | { kind: "network"; message: string }
  | { kind: "http"; status: number }
  | { kind: "parse"; message: string }
  | { kind: "validation"; message: string }

export type Result<T> =
  | { ok: true; data: T}
  | { ok: false; error: ApiError}