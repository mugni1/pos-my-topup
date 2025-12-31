import { getCategoriesAPI } from '@/api/services'
import type { GetCategoriesResponse } from '@/types/categories'
import type { GetParamsType } from '@/types/global.type'
import { useQuery } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import { unref, type Ref } from 'vue'

const fetch = async (params: GetParamsType): Promise<GetCategoriesResponse> => {
    try {
        const res = await getCategoriesAPI(params)
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

export const useGetCategories = (params: Ref<GetParamsType>) => {
    return useQuery({
        queryKey: ['categories', params],
        queryFn: () => fetch(unref(params)),
        staleTime: 1000 * 5,
    })
}