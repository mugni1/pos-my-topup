import { getItemsAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { GetParamsType } from '@/types/global.type'
import type { GetItemsResponse } from '@/types/items'
import { useQuery } from '@tanstack/vue-query'
import { unref, type Ref } from 'vue'

const fetch = async (params: GetParamsType): Promise<GetItemsResponse> => {
    try {
        const res = await getItemsAPI(params)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const useGetItems = (params: Ref<GetParamsType>) => {
    return useQuery({
        queryKey: ['items', params],
        queryFn: () => fetch(unref(params)),
        staleTime: 1000 * 5,
    })
}