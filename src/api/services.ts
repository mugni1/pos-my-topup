import type { AxiosResponse } from 'axios';
import { ENDPOINT } from './endpoints'
import { httpClient } from './httpClient'
import type { DeleteParamsType, GetParamsType } from '@/types/global.type';
import type { DeleteCategoryResponse, GetCategoriesResponse, PostCategoryPayloadType, PostCategoryResponse, PutCategoryPayloadType, PutCategoryResponse } from '@/types/categories';
import type { PostLoginPayloadType } from '@/types/auth';
import type { DeleteItemResponse, GetItemsResponse, PostItemPayloadType, PostItemResponse } from '@/types/items';

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
export const putCategoryAPI = async (payload: PutCategoryPayloadType): Promise<AxiosResponse<PutCategoryResponse>> => {
  return httpClient.put(`${ENDPOINT.CATEGORY}/${payload.id}`, payload)
}

// AUTH SERVICES
export const postLoginAPI = async (payload: PostLoginPayloadType): Promise<AxiosResponse> => {
  return httpClient.post(ENDPOINT.LOGIN, payload)
}

// ITEM SERVICES
export const getItemsAPI = async (params: GetParamsType): Promise<AxiosResponse<GetItemsResponse>> => {
  return httpClient.get(ENDPOINT.ITEM, { params })
}
export const deleteItemAPI = async (params: DeleteParamsType): Promise<AxiosResponse<DeleteItemResponse>> => {
  return httpClient.delete(`${ENDPOINT.ITEM}/${params.id}`)
}
export const postItemsAPI = async (payload: PostItemPayloadType): Promise<AxiosResponse<PostItemResponse>> => {
  const formData = new FormData()
  formData.append('image', payload.image)
  formData.append('name', payload.name)
  formData.append('price', payload.price)
  formData.append('category_id', payload.category_id)
  formData.append('merchant_name', payload.merchant_name)
  return httpClient.post(ENDPOINT.ITEM, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
}