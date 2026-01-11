import { postFileAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { PostFilePayload, PostFileResponse } from "@/types/storage";
import { useMutation } from "@tanstack/vue-query";

const fetch = async (payload: PostFilePayload): Promise<PostFileResponse> => {
    try {
        const result = await postFileAPI(payload)
        return result.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const usePostFile = () => {
    return useMutation({
        mutationFn: (payload: PostFilePayload) => fetch(payload)
    })
}