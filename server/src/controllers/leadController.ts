import { Request, Response, NextFunction } from "express";
import leadService from "../services/leadService";
import { LeadQuery } from "../types";

class LeadController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const lead = await leadService.create({
        ...req.body,
        assignedTo: req.user!._id,
      });

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: LeadQuery = {
        status: req.query.status as string,
        source: req.query.source as string,
        search: req.query.search as string,
        sortBy: req.query.sortBy as "latest" | "oldest",
        page: req.query.page as string,
        limit: req.query.limit as string,
      };

      const result = await leadService.getAll(
        query,
        req.user!._id,
        req.user!.role
      );

      res.status(200).json({
        success: true,
        message: "Leads fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const lead = await leadService.getById(
        req.params.id,
        req.user!._id,
        req.user!.role
      );

      res.status(200).json({
        success: true,
        message: "Lead fetched successfully",
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const lead = await leadService.update(
        req.params.id,
        req.body,
        req.user!._id,
        req.user!.role
      );

      res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await leadService.delete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Lead deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async exportCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const query: LeadQuery = {
        status: req.query.status as string,
        source: req.query.source as string,
        search: req.query.search as string,
        sortBy: req.query.sortBy as "latest" | "oldest",
      };

      const leads = await leadService.getForExport(
        query,
        req.user!._id,
        req.user!.role
      );

      const header = "Name,Email,Status,Source,Created At\n";
      const rows = leads
        .map(
          (lead) =>
            `"${lead.name}","${lead.email}","${lead.status}","${lead.source}","${new Date(lead.createdAt).toLocaleDateString()}"`
        )
        .join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=leads_export.csv"
      );
      res.status(200).send(header + rows);
    } catch (error) {
      next(error);
    }
  }
}

export default new LeadController();
