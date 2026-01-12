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
    name: string
    price: number
    category_id: string
    merchant_name: string
    image_url: string
    image_id: string
}

interface PostDeleteItemType {
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

export interface PostItemResponse {
    status: HttpStatusCode
    message: string
    data: PostDeleteItemType | null
    meta: null
    errors: null
}

export interface DeleteItemResponse {
    status: HttpStatusCode
    message: string
    data: PostDeleteItemType | null
    meta: null
    errors: null
}

export interface PutItemPayloadType {
    id: string
    name: string | undefined
    price: number | undefined
    category_id: string | undefined
    merchant_name: string | undefined
    image_url: string | undefined
    image_id: string | undefined
}

export interface PutItemResponse {
    status: HttpStatusCode
    message: string
    data: PostDeleteItemType | null
    meta: null
    errors: null
}
