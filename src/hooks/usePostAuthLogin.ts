import { postLoginAPI } from '@/api/services'
import type { PostLoginPayloadType, PostLoginResponseType } from '@/types/auth'
import { useMutation, } from '@tanstack/vue-query'
import { AxiosError } from 'axios'

const fetch = async (payload: PostLoginPayloadType): Promise<PostLoginResponseType> => {
    try {
        const res = await postLoginAPI(payload)
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

export const usePostAuthLogin = () => {
    return useMutation({
        mutationFn: (payload: PostLoginPayloadType) => fetch(payload)
    })
}