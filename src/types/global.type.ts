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