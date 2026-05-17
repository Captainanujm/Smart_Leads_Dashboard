import api from "./axios";
import type { ApiResponse, PaginatedLeads, Lead, LeadFormData } from "../types";

export const getLeads = async (params: Record<string, string | number>) => {
  const res = await api.get<ApiResponse<PaginatedLeads>>("/leads", { params });
  return res.data;
};

export const getLeadById = async (id: string) => {
  const res = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
  return res.data;
};

export const createLead = async (data: LeadFormData) => {
  const res = await api.post<ApiResponse<Lead>>("/leads", data);
  return res.data;
};

export const updateLead = async (id: string, data: Partial<LeadFormData>) => {
  const res = await api.put<ApiResponse<Lead>>(`/leads/${id}`, data);
  return res.data;
};

export const deleteLead = async (id: string) => {
  const res = await api.delete<ApiResponse>(`/leads/${id}`);
  return res.data;
};

export const exportLeadsCsv = async (params: Record<string, string>) => {
  const res = await api.get("/leads/export/csv", {
    params,
    responseType: "blob",
  });
  return res.data;
};
