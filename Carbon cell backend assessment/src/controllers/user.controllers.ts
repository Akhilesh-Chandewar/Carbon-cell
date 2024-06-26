import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {sendResponse , sendToken} from '../utils/responseHandler';
import errorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            throw new Error('Missing required fields');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        sendResponse(res, 200, `${username} registered successfully`);
    } catch (err: any) {
        errorHandler({ statusCode: 400, message: err.message }, req, res, () => { });
    } finally {
        await prisma.$disconnect();
    }
};

// Login user
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const secrete_key = process.env.JWT_SECRETE
        // Check if username and password are provided
        if (!username || !password) {
            throw new Error('Missing username or password');
        }

        // Find the user by username
        const user = await prisma.user.findUnique({
            where: { username }
        });

        // Check if the user exists
        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, throw an error
        if (!passwordMatch) {
            throw new Error('Invalid username or password');
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, `${secrete_key}`, { expiresIn: '24h' });

        // Send the token in the response
        sendToken(res, 200, token);
    } catch (err: any) {
        // Handle errors
        errorHandler({ statusCode: 401, message: err.message }, req, res, () => { });
    } finally {
        // Disconnect Prisma client
        await prisma.$disconnect();
    }
};

// Logout user
export const logout = async (req: Request, res: Response) => {
    try {
        // Clear the JWT token cookie from the client
        res.clearCookie('token');
        sendResponse(res, 200, 'Logout successful');
    } catch (err: any) {
        // Handle errors
        errorHandler({ statusCode: 500, message: err.message }, req, res, () => { });
    }
};

// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const userId = parseInt(id);
        const { email, username, password } = req.body;

        if (!id) {
            throw new Error('Missing user ID');
        }

        // Find the existing user
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            throw new Error(`User with ID ${id} not found`);
        }

        // Construct the update object based on the fields passed in the request body
        const updateData: any = {};

        if (email) {
            updateData.email = email;
        }

        if (username) {
            updateData.username = username;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        // Update the user with the constructed update object
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        sendResponse(res, 200, `User ${id} updated successfully`);
    } catch (err: any) {
        errorHandler({ statusCode: 400, message: err.message }, req, res, () => { });
    } finally {
        await prisma.$disconnect();
    }
};


// Delete an existing user
export const removeUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const userId = parseInt(id);
        if (!id) {
            throw new Error('Missing user ID');
        }
        await prisma.user.delete({
            where: { id: userId }
        });
        sendResponse(res, 200, `User ${id} deleted successfully`);
    } catch (err: any) {
        errorHandler({ statusCode: 400, message: err.message }, req, res, () => { });
    } finally {
        await prisma.$disconnect();
    }
};


export const getUser = async (req: Request, res: Response) => {
    try {
        const { id, email, username } = req.user;
        sendResponse(res, 200, 'User found', { id, email, username });
    } catch (err: any) {
        // Handle errors
        errorHandler({ statusCode: 404, message: err.message }, req, res, () => { });
    } finally {
        // Disconnect Prisma client
        await prisma.$disconnect();
    }
};

