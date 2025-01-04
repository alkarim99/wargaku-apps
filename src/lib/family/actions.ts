import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import {
  CreateFamilyRequest,
  FamilyResponse,
  UpdateFamilyRequest,
} from "@/types/family"

const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

const handleApiError = (error: any): never => {
  throw new Error(
    error.response?.data?.message || "An error occurred. Please try again."
  )
}

const apiCall = async <T>(
  method: AxiosRequestConfig["method"],
  url: string,
  data?: any,
  params?: any
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = { method, url, data, params }
    const response: AxiosResponse<T> = await axiosInstance.request<T>(config)
    return response.data
  } catch (error: any) {
    handleApiError(error)
  }
  return Promise.reject(new Error("Unhandled error occurred"))
}

export const getAllFamily = (): Promise<FamilyResponse> => {
  return apiCall<FamilyResponse>("get", "/api/family")
}

export const getFamilyById = (id: string): Promise<FamilyResponse> => {
  return apiCall<FamilyResponse>("get", `/family/${id}`)
}

export const createFamily = (
  data: CreateFamilyRequest
): Promise<FamilyResponse> => {
  return apiCall<FamilyResponse>("post", "/family", data)
}

export const updateFamily = (
  data: UpdateFamilyRequest
): Promise<FamilyResponse> => {
  return apiCall<FamilyResponse>("put", "/family", data)
}

export const deleteFamily = (id: string): Promise<FamilyResponse> => {
  return apiCall<FamilyResponse>("delete", `/family/${id}`)
}

export const getAllKkNumber = (): Promise<FamilyResponse> => {
  return apiCall<FamilyResponse>("get", "/family/kk-number")
}
