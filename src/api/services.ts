import type { AxiosResponse } from 'axios';
import { ENDPOINT } from './endpoints'
import { httpClient } from './httpClient'
import type { DeleteParamsType, GetParamsType } from '@/types/global.type';
import type { DeleteCategoryResponse, GetCategoriesResponse } from '@/types/categories';

// CATEGORY SERVICES
export const getCategoriesAPI = async (params: GetParamsType): Promise<AxiosResponse<GetCategoriesResponse>> => {
  return httpClient.get(ENDPOINT.CATEGORY, { params })
}

export const deleteCategoryAPI = async (params: DeleteParamsType): Promise<AxiosResponse<DeleteCategoryResponse>> => {
  return httpClient.delete(`${ENDPOINT.CATEGORY}/${params.id}`)
}