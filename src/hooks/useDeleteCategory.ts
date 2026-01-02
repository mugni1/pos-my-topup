import { deleteCategoryAPI } from '@/api/services'
import { handleErrorResponse } from '@/lib/response'
import type { DeleteCategoryResponse } from '@/types/categories'
import type { DeleteParamsType } from '@/types/global.type'
import { useMutation } from '@tanstack/vue-query'

const fetch = async (params: DeleteParamsType): Promise<DeleteCategoryResponse> => {
    try {
        const res = await deleteCategoryAPI(params)
        return res.data
    } catch (error: unknown) {
        return handleErrorResponse(error)
    }
}

export const useDeleteCategory = () => {
    return useMutation({
        mutationFn: (params: DeleteParamsType) => fetch(params),
    })
}