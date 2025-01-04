import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import {
  CreateFamilyMemberRequest,
  FamilyMemberResponse,
  UpdateFamilyMemberRequest,
} from "@/types/familyMember"

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

export const getAllFamilyMember = (): Promise<FamilyMemberResponse> => {
  return apiCall<FamilyMemberResponse>("get", "/api/family-member")
}

export const getFamilyMemberById = (
  id: string
): Promise<FamilyMemberResponse> => {
  return apiCall<FamilyMemberResponse>("get", `/family-member/${id}`)
}

export const createFamilyMember = (
  data: CreateFamilyMemberRequest
): Promise<FamilyMemberResponse> => {
  return apiCall<FamilyMemberResponse>("post", "/family-member", data)
}

export const updateFamilyMember = (
  data: UpdateFamilyMemberRequest
): Promise<FamilyMemberResponse> => {
  return apiCall<FamilyMemberResponse>("put", "/family-member", data)
}

export const deleteFamilyMember = (
  id: string
): Promise<FamilyMemberResponse> => {
  return apiCall<FamilyMemberResponse>("delete", `/family-member/${id}`)
}
