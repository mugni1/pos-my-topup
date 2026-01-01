import type { HttpStatusCode } from "axios"
import type { MetaType } from "./global.type"

export interface ItemType {
    id: string
    name: string
    merchantName: string
    imageUrl: string
    imageId: string
    price: number
    quantity: number
    categoryId: string
    createdAt: string
    updatedAt: string
}

export interface GetItemsResponse {
    status: HttpStatusCode,
    message: string,
    data: ItemType[] | null
    meta: MetaType | null
    errors: null
}