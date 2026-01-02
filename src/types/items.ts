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
    category: {
        name: string
        code: string
    }
}

export interface GetItemsResponse {
    status: HttpStatusCode,
    message: string,
    data: ItemType[] | null
    meta: MetaType | null
    errors: null
}

export interface PostItemPayloadType {
    image: File
    name: string
    price: string
    category_id: string
    merchant_name: string
}

export interface PostItemResponse {
    status: HttpStatusCode
    message: string
    data: {
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
    } | null
    meta: null
    errors: null
}