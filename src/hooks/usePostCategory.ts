import { postCategoryAPI } from '@/api/services'
import type { PostCategoryPayloadType, PostCategoryResponse } from '@/types/categories'
import { useMutation, } from '@tanstack/vue-query'
import { AxiosError } from 'axios'

const fetch = async (payload: PostCategoryPayloadType): Promise<PostCategoryResponse> => {
    try {
        const res = await postCategoryAPI(payload)
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

export const usePostCategory = () => {
    return useMutation({
        mutationFn: (payload: PostCategoryPayloadType) => fetch(payload)
    })
}