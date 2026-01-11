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