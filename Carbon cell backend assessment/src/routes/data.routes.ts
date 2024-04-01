import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { filterData } from "../controllers/data.controllers";
const router = express.Router();

/**
 * @openapi
 * /api/v1/data/filter:
 *   get:
 *     summary: Retrieve filtered data from public APIs
 *     description: Retrieve data from the public APIs based on provided filters. (Au)
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Category to filter the data by Category.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Limit the number of results serching title.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with filtered data.
 *       '400':
 *         description: Error response with details.
 */
router.get("/filter" ,isAuthenticated, filterData);

export default router;