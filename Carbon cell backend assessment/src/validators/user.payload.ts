import Joi from 'joi';

// Joi schema for user registration payload
export const registerPayloadSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Joi schema for user login payload
export const loginPayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Joi schema for user update payload
export const updatePayloadSchema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string().min(6) // Adjust minimum password length as needed
});

