import { deleteItemAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { DeleteParamsType } from "@/types/global.type";
import type { DeleteItemResponse } from "@/types/items";
import { useMutation } from "@tanstack/vue-query";

const fetch = async (params: DeleteParamsType): Promise<DeleteItemResponse> => {
    try {
        const results = await deleteItemAPI(params)
        return results.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const useDeleteItem = () => {
    return useMutation({
        mutationFn: (params: DeleteParamsType) => fetch(params)
    })
}