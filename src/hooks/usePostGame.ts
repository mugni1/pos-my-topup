import { postGameAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { PostGamePayload, PostGameResponse } from "@/types/game";
import { useMutation } from "@tanstack/vue-query";

const fetch = async (payload: PostGamePayload): Promise<PostGameResponse> => {
    try {
        const result = await postGameAPI(payload)
        return result.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const usePostGame = () => {
    return useMutation({
        mutationFn: (payload: PostGamePayload) => fetch(payload)
    })
}