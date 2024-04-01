import express , {request, response} from "express";
import {getUser, login, registerUser, removeUser, updateUser, logout } from "../controllers/user.controllers";
import { isAuthenticated } from "../middleware/auth.middleware";
import { payloadValidator } from "../middleware/payload.validator";
import  { registerPayloadSchema, loginPayloadSchema, updatePayloadSchema} from "../validators/user.payload"; 
import Joi, { ValidationResult } from "joi";

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email, username, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '400':
 *         description: Error registering user.
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login user
 *     description: Login a user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Invalid username or password.
 */

/**
 * @swagger
 * /api/v1/user/logout:
 *   get:
 *     summary: Logout user
 *     description: Logout the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Logout successful.
 *       '500':
 *         description: Error logging out user.
 */

/**
 * @swagger
 * /api/v1/user/update:
 *   patch:
 *     summary: Update an existing user
 *     description: Update email, username, or password of an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - username
 *               - password
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *       '400':
 *         description: Error updating user.
 */

/**
 * @swagger
 * /api/v1/user/delete:
 *   delete:
 *     summary: Delete an existing user
 *     description: Delete an existing user by ID.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '400':
 *         description: Error deleting user.
 */

/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Get user information
 *     description: Get information about the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User information retrieved successfully.
 *       '404':
 *         description: User not found.
 */
const validateWithJoi = (schema: Joi.ObjectSchema<any>) => (value: any): ValidationResult<any> => {
    return schema.validate(value);
};

router.post("/register", payloadValidator((value: any) => validateWithJoi(registerPayloadSchema)(value).error), registerUser);
router.post("/login", payloadValidator((value: any) => validateWithJoi(loginPayloadSchema)(value).error), login);
router.patch("/update", isAuthenticated, payloadValidator((value: any) => validateWithJoi(updatePayloadSchema)(value).error), updateUser);
router.delete("/delete", isAuthenticated, removeUser);
router.get("/logout", isAuthenticated, logout);
router.get("/", isAuthenticated, getUser);



export default router;