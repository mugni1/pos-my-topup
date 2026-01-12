import { deleteGameAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { DeleteGameResponse } from "@/types/game";
import type { DeleteParamsType } from "@/types/global.type";
import { useMutation } from "@tanstack/vue-query";

const fetch = async (params: DeleteParamsType): Promise<DeleteGameResponse> => {
    try {
        const results = await deleteGameAPI(params)
        return results.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const useDeleteGame = () => {
    return useMutation({
        mutationFn: (params: DeleteParamsType) => fetch(params)
    })
}