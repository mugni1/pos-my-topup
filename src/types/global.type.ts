export interface GetParamsType {
    search: string
    limit: number
    page: number
    orderBy: string
    sortBy: "asc" | "desc"
}

export interface DeleteParamsType {
    id: string
}

export interface MetaType {
    search: string
    page: number
    limit: number
    offset: number
    orderBy: string
    sortBy: string
    total: number
}

export interface UserType {
    id: string
    name: string
    email: string
    phone: string
    password: null
    bio: null | string
    provider: null | string
    gender: null | string
    role: string
    createdAt: string
    updatedAt: string
}

export interface SortColumnType {
    columnId: string
    direction: 'asc' | 'desc' | null
}