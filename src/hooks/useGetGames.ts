import { getGamesAPI } from "@/api/services";
import { handleErrorResponse } from "@/lib/response";
import type { GetGamesResponse } from "@/types/game";
import type { GetParamsType } from "@/types/global.type";
import { useQuery } from "@tanstack/vue-query";
import { unref, type Ref } from "vue";

const fetch = async (params: GetParamsType): Promise<GetGamesResponse> => {
    try {
        const result = await getGamesAPI(params)
        return result.data
    } catch (err: unknown) {
        return handleErrorResponse(err)
    }
}

export const useGetGames = (params: Ref<GetParamsType>) => {
    return useQuery({
        queryKey: ['games', params],
        queryFn: () => fetch(unref(params)),
        staleTime: 1000 * 5,
    })
}