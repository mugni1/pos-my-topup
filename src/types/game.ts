import type { HttpStatusCode } from "axios"
import type { MetaType } from "./global.type"

export interface GetGameType {
    id: string
    title: string
    studio: string
    coverUrl: string
    coverId: string
    imageUrl: string
    imageId: string
    createdAt: string
    updatedAt: string
}

export interface GetGamesResponse {
    status: HttpStatusCode
    message: string
    data: GetGameType[] | null
    meta: MetaType | null
    errors: null
}


export interface PostGamePayload {
    title: string
    studio: string
    image_url: string
    image_id: string
    cover_url: string
    cover_id: string
}

export interface PostGameResponse {
    status: HttpStatusCode
    message: string
    data: GetGameType | null
    meta: null
    errors: null
}