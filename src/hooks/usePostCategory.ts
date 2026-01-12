import { postCategoryAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { PostCategoryResponse } from '@/types/categories'
import type { CreateCategoryPayload } from '@/validations/categories'
import { useMutation, } from '@tanstack/vue-query'

const fetch = async (payload: CreateCategoryPayload): Promise<PostCategoryResponse> => {
    try {
        const res = await postCategoryAPI(payload)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const usePostCategory = () => {
    return useMutation({
        mutationFn: (payload: CreateCategoryPayload) => fetch(payload)
    })
}