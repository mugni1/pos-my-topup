import { postCategoryAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { PostCategoryPayloadType, PostCategoryResponse } from '@/types/categories'
import { useMutation, } from '@tanstack/vue-query'

const fetch = async (payload: PostCategoryPayloadType): Promise<PostCategoryResponse> => {
    try {
        const res = await postCategoryAPI(payload)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const usePostCategory = () => {
    return useMutation({
        mutationFn: (payload: PostCategoryPayloadType) => fetch(payload)
    })
}