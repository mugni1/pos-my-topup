import { postItemsAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { PostItemPayloadType, PostItemResponse } from '@/types/items'
import { useMutation, } from '@tanstack/vue-query'

const fetch = async (payload: PostItemPayloadType): Promise<PostItemResponse> => {
    try {
        const res = await postItemsAPI(payload)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const usePostItem = () => {
    return useMutation({
        mutationFn: (payload: PostItemPayloadType) => fetch(payload)
    })
}