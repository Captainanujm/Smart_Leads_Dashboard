import { Router } from "express";
import leadController from "../controllers/leadController";
import auth from "../middleware/auth";
import authorize from "../middleware/role";
import validate from "../middleware/validate";

const router = Router();

router.use(auth);

router.get("/export/csv", leadController.exportCsv);

router.get("/", leadController.getAll);
router.get("/:id", leadController.getById);

router.post(
  "/",
  validate([
    { field: "name", required: true, type: "string", minLength: 2 },
    { field: "email", required: true, type: "string" },
    {
      field: "source",
      required: true,
      enum: ["Website", "Instagram", "Referral"],
    },
    {
      field: "status",
      enum: ["New", "Contacted", "Qualified", "Lost"],
    },
  ]),
  leadController.create
);

router.put(
  "/:id",
  validate([
    {
      field: "status",
      enum: ["New", "Contacted", "Qualified", "Lost"],
    },
    {
      field: "source",
      enum: ["Website", "Instagram", "Referral"],
    },
  ]),
  leadController.update
);

router.delete("/:id", authorize("admin"), leadController.delete);

export default router;
