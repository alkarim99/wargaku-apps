import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import {
  CreateResidentRequest,
  ResidentResponse,
  UpdateResidentRequest,
} from "@/types/resident"

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

export const getAllResident = (): Promise<ResidentResponse> => {
  return apiCall<ResidentResponse>("get", "/api/resident")
}

export const getResidentById = (id: string): Promise<ResidentResponse> => {
  return apiCall<ResidentResponse>("get", `/resident/${id}`)
}

export const createResident = (
  data: CreateResidentRequest
): Promise<ResidentResponse> => {
  return apiCall<ResidentResponse>("post", "/resident", data)
}

export const updateResident = (
  data: UpdateResidentRequest
): Promise<ResidentResponse> => {
  return apiCall<ResidentResponse>("put", "/resident", data)
}

export const deleteResident = (id: string): Promise<ResidentResponse> => {
  return apiCall<ResidentResponse>("delete", `/resident/${id}`)
}
