import { getOrdersAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { GetParamsType } from "@/types/global.type";
import type { GetOrdersResponse } from "@/types/order";
import { useQuery } from "@tanstack/vue-query";
import { unref, type Ref } from "vue";

const fetch = async (params: GetParamsType): Promise<GetOrdersResponse> => {
    try {
        const results = await getOrdersAPI(params)
        return results.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const useGetOrders = (params: Ref<GetParamsType>) => {
    return useQuery({
        queryKey: ['orders', params],
        queryFn: () => fetch(unref(params))
    })
}