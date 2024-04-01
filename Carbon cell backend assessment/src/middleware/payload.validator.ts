import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationError } from 'joi';

type ValidatorFunction = (value: any) => ValidationError | undefined;

export const payloadValidator = (validator: ValidatorFunction) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = validator(req.body);
        if (validationResult instanceof ValidationError) {
            throw new Error(validationResult.details[0].message.replace(/"/g, ""));
        }
        next();
    } catch (error) {
        return next(error);
    }
};
