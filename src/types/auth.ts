import type { HttpStatusCode } from "axios"

export interface PostLoginPayloadType {
    email: string
    password: string
}

export interface PostLoginResponseType {
    status: HttpStatusCode,
    message: string
    data: {
        token: string
        user: {
            id: string,
            name: string
            email: string
            phone: string
            bio: null | string,
            gender: null | string,
            role: string,
            createdAt: string
            updatedAt: string
        }
    } | null
    meta: null,
    errors: null
}