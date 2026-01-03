import type { HttpStatusCode } from "axios"
import type { MetaType } from "./global.type"

export interface GetOrderType {
    id: string
    trxId: string
    destination: string
    status: string
    grossAmount: number
    paymentType: string | null
    userId: string
    createdAt: string
    updatedAt: string
    user: {
        name: string
        email: string
    }
}

export interface GetOrdersResponse {
    status: HttpStatusCode
    message: string
    data: GetOrderType[] | null
    meta: MetaType | null
    errors: null
}