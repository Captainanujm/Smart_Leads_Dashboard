export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "sales";
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Website" | "Instagram" | "Referral";
  assignedTo: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  status: Lead["status"];
  source: Lead["source"];
}

export interface PaginatedLeads {
  data: Lead[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface LeadFilters {
  status: string;
  source: string;
  search: string;
  sortBy: string;
  page: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
