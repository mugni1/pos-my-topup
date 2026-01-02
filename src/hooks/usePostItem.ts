import { postItemsAPI } from '@/api/services'
import type { PostItemPayloadType, PostItemResponse } from '@/types/items'
import { useMutation, } from '@tanstack/vue-query'
import { AxiosError } from 'axios'

const fetch = async (payload: PostItemPayloadType): Promise<PostItemResponse> => {
    try {
        const res = await postItemsAPI(payload)
        return res.data
    } catch (error: unknown) {
        let message = 'Internal Server Error';
        if (error instanceof AxiosError) {
            message = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            message = error.message;
        }
        return {
            status: 500,
            message: message,
            data: null,
            meta: null,
            errors: null
        };
    }
}

export const usePostItem = () => {
    return useMutation({
        mutationFn: (payload: PostItemPayloadType) => fetch(payload)
    })
}