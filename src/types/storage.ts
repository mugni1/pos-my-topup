import type { HttpStatusCode } from "axios"

export interface PostFilePayload {
    image: File
}

export interface PostFileResponse {
    status: HttpStatusCode
    message: string
    data: {
        image_url: string
        public_id: string
    } | null
    meta: null
    errors: null
}