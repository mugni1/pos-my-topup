import { updateItemAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { PutItemPayloadType, PutItemResponse } from "@/types/items";
import { useMutation } from "@tanstack/vue-query";

const fetch = async (payload: PutItemPayloadType): Promise<PutItemResponse> => {
    try {
        const result = await updateItemAPI(payload)
        return result.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const usePutItem = () => {
    return useMutation({
        mutationFn: (payload: PutItemPayloadType) => fetch(payload)
    })
}