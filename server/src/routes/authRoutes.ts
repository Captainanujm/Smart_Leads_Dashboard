import { Router } from "express";
import authController from "../controllers/authController";
import auth from "../middleware/auth";
import validate from "../middleware/validate";

const router = Router();

router.post(
  "/register",
  validate([
    { field: "name", required: true, type: "string", minLength: 2 },
    { field: "email", required: true, type: "string" },
    { field: "password", required: true, type: "string", minLength: 6 },
  ]),
  authController.register
);

router.post(
  "/login",
  validate([
    { field: "email", required: true, type: "string" },
    { field: "password", required: true, type: "string" },
  ]),
  authController.login
);

router.get("/me", auth, authController.me);
router.post("/logout", auth, authController.logout);

export default router;
