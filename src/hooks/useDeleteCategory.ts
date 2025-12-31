import { deleteCategoryAPI } from '@/api/services'
import type { DeleteCategoryResponse } from '@/types/categories'
import type { DeleteParamsType } from '@/types/global.type'
import { useMutation } from '@tanstack/vue-query'
import { AxiosError } from 'axios'

const fetch = async (params: DeleteParamsType): Promise<DeleteCategoryResponse> => {
    try {
        const res = await deleteCategoryAPI(params)
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

export const useDeleteCategory = () => {
    return useMutation({
        mutationFn: (params: DeleteParamsType) => fetch(params),
    })
}