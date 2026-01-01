import { putCategoryAPI } from '@/api/services'
import type { PutCategoryPayloadType, PutCategoryResponse } from '@/types/categories'
import { useMutation, } from '@tanstack/vue-query'
import { AxiosError } from 'axios'

const fetch = async (payload: PutCategoryPayloadType): Promise<PutCategoryResponse> => {
    try {
        const res = await putCategoryAPI(payload)
        console.log(payload)
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

export const usePutCategory = () => {
    return useMutation({
        mutationFn: (payload: PutCategoryPayloadType) => fetch(payload)
    })
}