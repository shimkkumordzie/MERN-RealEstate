import express from "express";
import {
  createListing,
  updateListing,
  deleteListing,
} from "../controllers.js/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.post("/update", verifyToken, updateListing);
router.delete("/delete", deleteListing);

export default router;
