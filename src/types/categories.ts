import type { HttpStatusCode } from "axios"
import type { MetaType } from "./global.type"

export interface CategoryTable {
    id: string
    amount: number
    status: string
    email: string
}

export interface CategoryType {
    id: string
    name: string
    code: string
    createdAt: string
    updatedAt: string
}

export interface GetCategoriesResponse {
    status: HttpStatusCode,
    message: string,
    data: CategoryType[] | null
    meta: MetaType | null
    errors: null
}

export interface DeleteCategoryResponse {
    status: HttpStatusCode,
    message: string,
    data: CategoryType | null
    meta: null
    errors: null
}

export interface PostCategoryPayloadType {
    name: string
    code: string
}

export interface PostCategoryResponse {
    status: HttpStatusCode,
    message: string,
    data: CategoryType | null,
    meta: null,
    errors: null
}

export interface PutCategoryPayloadType {
    id: string
    name: string
    code: string
}

export interface PutCategoryResponse {
    status: HttpStatusCode,
    message: string,
    data: CategoryType | null,
    meta: null,
    errors: null
}