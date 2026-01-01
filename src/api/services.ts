import type { AxiosResponse } from 'axios';
import { ENDPOINT } from './endpoints'
import { httpClient } from './httpClient'
import type { DeleteParamsType, GetParamsType } from '@/types/global.type';
import type { DeleteCategoryResponse, GetCategoriesResponse, PostCategoryPayloadType, PostCategoryResponse } from '@/types/categories';
import type { PostLoginPayloadType } from '@/types/auth';

// CATEGORY SERVICES
export const getCategoriesAPI = async (params: GetParamsType): Promise<AxiosResponse<GetCategoriesResponse>> => {
  return httpClient.get(ENDPOINT.CATEGORY, { params })
}
export const deleteCategoryAPI = async (params: DeleteParamsType): Promise<AxiosResponse<DeleteCategoryResponse>> => {
  return httpClient.delete(`${ENDPOINT.CATEGORY}/${params.id}`)
}
export const postCategoryAPI = async (payload: PostCategoryPayloadType): Promise<AxiosResponse<PostCategoryResponse>> => {
  return httpClient.post(`${ENDPOINT.CATEGORY}`, payload)
}

// AUTH SERVICES
export const postLoginAPI = async (payload: PostLoginPayloadType): Promise<AxiosResponse> => {
  return httpClient.post(ENDPOINT.LOGIN, payload)
}