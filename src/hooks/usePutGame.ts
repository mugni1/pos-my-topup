import { putGameAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { PutGamePayload, PutGameResponse } from "@/types/game";
import { useMutation } from "@tanstack/vue-query";

const fetch = async (payload: PutGamePayload): Promise<PutGameResponse> => {
    try {
        const result = await putGameAPI(payload)
        return result.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const usePutGame = () => {
    return useMutation({
        mutationFn: (payload: PutGamePayload) => fetch(payload)
    })
}