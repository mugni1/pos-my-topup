import type { HttpStatusCode } from "axios"
import type { UserType } from "./global.type"

export interface PostLoginPayloadType {
    email: string
    password: string
}

export interface PostLoginResponseType {
    status: HttpStatusCode,
    message: string
    data: {
        token: string
        user: UserType | null
    },
    meta: null,
    errors: null
}