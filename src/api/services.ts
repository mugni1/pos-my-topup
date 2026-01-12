import type { AxiosResponse } from 'axios';
import { ENDPOINT } from './endpoints'
import { httpClient } from './httpClient'
import type { DeleteParamsType, GetParamsType } from '@/types/global.type';
import type { DeleteCategoryResponse, GetCategoriesResponse, PostCategoryPayloadType, PostCategoryResponse, PutCategoryPayloadType, PutCategoryResponse } from '@/types/categories';
import type { PostLoginPayloadType } from '@/types/auth';
import type { DeleteItemResponse, GetItemsResponse, PostItemPayloadType, PostItemResponse, PutItemPayloadType, PutItemResponse } from '@/types/items';
import type { GetOrdersResponse } from '@/types/order';
import type { DeleteGameResponse, GetGamesResponse, PostGamePayload, PostGameResponse, PutGamePayload, PutGameResponse } from '@/types/game';
import type { PostFilePayload, PostFileResponse } from '@/types/storage';
import type { CreateCategoryPayload } from '@/validations/categories';

// CATEGORY SERVICES
export const getCategoriesAPI = async (params: GetParamsType): Promise<AxiosResponse<GetCategoriesResponse>> => {
  return httpClient.get(ENDPOINT.CATEGORY, { params })
}
export const deleteCategoryAPI = async (params: DeleteParamsType): Promise<AxiosResponse<DeleteCategoryResponse>> => {
  return httpClient.delete(`${ENDPOINT.CATEGORY}/${params.id}`)
}
export const postCategoryAPI = async (payload: CreateCategoryPayload): Promise<AxiosResponse<PostCategoryResponse>> => {
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
  return httpClient.post(ENDPOINT.ITEM, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const updateItemAPI = async (payload: PutItemPayloadType): Promise<AxiosResponse<PutItemResponse>> => {
  const formData = new FormData()
  if (payload.image) {
    formData.append('image', payload.image)
  }
  formData.append('name', payload.name)
  formData.append('price', payload.price)
  formData.append('category_id', payload.category_id)
  formData.append('merchant_name', payload.merchant_name)
  return httpClient.put(`${ENDPOINT.ITEM}/${payload.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// ORDER SERVICES
export const getOrdersAPI = async (params: GetParamsType): Promise<AxiosResponse<GetOrdersResponse>> => {
  return httpClient.get(ENDPOINT.ORDER, { params })
}

// GAMES SERVICES
export const getGamesAPI = async (params: GetParamsType): Promise<AxiosResponse<GetGamesResponse>> => {
  return httpClient.get(ENDPOINT.GAME, { params })
}
export const postGameAPI = async (payload: PostGamePayload): Promise<AxiosResponse<PostGameResponse>> => {
  return httpClient.post(ENDPOINT.GAME, payload)
}
export const putGameAPI = async (payload: PutGamePayload): Promise<AxiosResponse<PutGameResponse>> => {
  return httpClient.put(`${ENDPOINT.GAME}/${payload.id}`, payload)
}
export const deleteGameAPI = async (params: DeleteParamsType): Promise<AxiosResponse<DeleteGameResponse>> => {
  return httpClient.delete(`${ENDPOINT.GAME}/${params.id}`)
}

// STORAGE SERVICES
export const postFileAPI = async (payload: PostFilePayload): Promise<AxiosResponse<PostFileResponse>> => {
  const formData = new FormData()
  formData.append('image', payload.image)
  return httpClient.post(ENDPOINT.STORAGE, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}