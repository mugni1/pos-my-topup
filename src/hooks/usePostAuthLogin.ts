import { postLoginAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { PostLoginPayloadType, PostLoginResponseType } from '@/types/auth'
import { useMutation, } from '@tanstack/vue-query'

const fetch = async (payload: PostLoginPayloadType): Promise<PostLoginResponseType> => {
    try {
        const res = await postLoginAPI(payload)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const usePostAuthLogin = () => {
    return useMutation({
        mutationFn: (payload: PostLoginPayloadType) => fetch(payload)
    })
}