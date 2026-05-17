import { Request, Response, NextFunction } from "express";

interface ValidationRule {
  field: string;
  required?: boolean;
  type?: string;
  enum?: string[];
  minLength?: number;
}

const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    for (const rule of rules) {
      const value = req.body[rule.field];

      if (rule.required && (!value || (typeof value === "string" && !value.trim()))) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      if (value !== undefined && value !== null) {
        if (rule.type && typeof value !== rule.type) {
          errors.push(`${rule.field} must be a ${rule.type}`);
        }

        if (rule.enum && !rule.enum.includes(value)) {
          errors.push(`${rule.field} must be one of: ${rule.enum.join(", ")}`);
        }

        if (rule.minLength && typeof value === "string" && value.length < rule.minLength) {
          errors.push(`${rule.field} must be at least ${rule.minLength} characters`);
        }
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ success: false, message: errors.join(", ") });
      return;
    }

    next();
  };
};

export default validate;
