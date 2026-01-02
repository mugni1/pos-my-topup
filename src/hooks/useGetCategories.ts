import { getCategoriesAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { GetCategoriesResponse } from '@/types/categories'
import type { GetParamsType } from '@/types/global.type'
import { useQuery } from '@tanstack/vue-query'
import { unref, type Ref } from 'vue'

const fetch = async (params: GetParamsType): Promise<GetCategoriesResponse> => {
    try {
        const res = await getCategoriesAPI(params)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const useGetCategories = (params: Ref<GetParamsType>) => {
    return useQuery({
        queryKey: ['categories', params],
        queryFn: () => fetch(unref(params)),
        staleTime: 1000 * 5,
    })
}