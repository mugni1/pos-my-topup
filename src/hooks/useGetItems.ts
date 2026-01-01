import { getItemsAPI } from '@/api/services'
import type { GetParamsType } from '@/types/global.type'
import type { GetItemsResponse } from '@/types/items'
import { useQuery } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import { unref, type Ref } from 'vue'

const fetch = async (params: GetParamsType): Promise<GetItemsResponse> => {
    try {
        const res = await getItemsAPI(params)
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

export const useGetItems = (params: Ref<GetParamsType>) => {
    return useQuery({
        queryKey: ['items', params],
        queryFn: () => fetch(unref(params)),
        staleTime: 1000 * 5,
    })
}