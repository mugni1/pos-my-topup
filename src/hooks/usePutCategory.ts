import { putCategoryAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { PutCategoryPayloadType, PutCategoryResponse } from '@/types/categories'
import { useMutation, } from '@tanstack/vue-query'

const fetch = async (payload: PutCategoryPayloadType): Promise<PutCategoryResponse> => {
    try {
        const res = await putCategoryAPI(payload)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const usePutCategory = () => {
    return useMutation({
        mutationFn: (payload: PutCategoryPayloadType) => fetch(payload)
    })
}