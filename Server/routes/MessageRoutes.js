import express from "express";
import { getUserForSidebar, getMessage, markMessageSeen, sendMessage } from "../controllers/MessageController.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessage);
router.put("/mark/:id", protectRoute, markMessageSeen);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
