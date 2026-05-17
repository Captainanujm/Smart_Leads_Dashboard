import Lead from "../models/Lead";
import { ILead, LeadQuery, PaginatedResponse } from "../types";
import { FilterQuery } from "mongoose";

class LeadService {
  async create(data: Partial<ILead>): Promise<ILead> {
    const lead = await Lead.create(data);
    return lead;
  }

  async getAll(
    query: LeadQuery,
    userId: string,
    userRole: string
  ): Promise<PaginatedResponse<ILead>> {
    const page = Math.max(1, parseInt(query.page || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || "10", 10)));
    const skip = (page - 1) * limit;

    const filter: FilterQuery<ILead> = {};

    if (userRole === "sales") {
      filter.assignedTo = userId;
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.source) {
      filter.source = query.source;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search, "i");
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const sortOrder = query.sortBy === "oldest" ? 1 : -1;

    const [leads, totalCount] = await Promise.all([
      Lead.find(filter)
        .populate("assignedTo", "name email")
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: leads as unknown as ILead[],
      page,
      totalPages,
      totalCount,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async getById(
    id: string,
    userId: string,
    userRole: string
  ): Promise<ILead | null> {
    const lead = await Lead.findById(id).populate("assignedTo", "name email");

    if (!lead) {
      const error = new Error("Lead not found") as Error & {
        statusCode: number;
      };
      error.statusCode = 404;
      throw error;
    }

    if (userRole === "sales" && lead.assignedTo.toString() !== userId) {
      const error = new Error("Not authorized to view this lead") as Error & {
        statusCode: number;
      };
      error.statusCode = 403;
      throw error;
    }

    return lead;
  }

  async update(
    id: string,
    data: Partial<ILead>,
    userId: string,
    userRole: string
  ): Promise<ILead | null> {
    const lead = await Lead.findById(id);

    if (!lead) {
      const error = new Error("Lead not found") as Error & {
        statusCode: number;
      };
      error.statusCode = 404;
      throw error;
    }

    if (userRole === "sales" && lead.assignedTo.toString() !== userId) {
      const error = new Error("Not authorized to update this lead") as Error & {
        statusCode: number;
      };
      error.statusCode = 403;
      throw error;
    }

    const updated = await Lead.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("assignedTo", "name email");

    return updated;
  }

  async delete(id: string): Promise<void> {
    const lead = await Lead.findById(id);

    if (!lead) {
      const error = new Error("Lead not found") as Error & {
        statusCode: number;
      };
      error.statusCode = 404;
      throw error;
    }

    await Lead.findByIdAndDelete(id);
  }

  async getForExport(
    query: LeadQuery,
    userId: string,
    userRole: string
  ): Promise<ILead[]> {
    const filter: FilterQuery<ILead> = {};

    if (userRole === "sales") {
      filter.assignedTo = userId;
    }

    if (query.status) filter.status = query.status;
    if (query.source) filter.source = query.source;

    if (query.search) {
      const searchRegex = new RegExp(query.search, "i");
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const sortOrder = query.sortBy === "oldest" ? 1 : -1;

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: sortOrder })
      .lean();

    return leads as unknown as ILead[];
  }
}

export default new LeadService();
