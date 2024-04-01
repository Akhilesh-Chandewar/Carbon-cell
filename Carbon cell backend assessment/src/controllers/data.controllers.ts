import { Request, Response } from 'express';
import axios from 'axios';
import { sendResponse } from '../utils/responseHandler';
import errorHandler from '../utils/errorHandler';

// Cache to store responses from the public API
const cache = new Map();

export const filterData = async (req: Request, res: Response) => {
    try {
        const { category, limit } = req.query;
        let apiUrl = 'https://api.publicapis.org/entries';
    
        // Generate cache key based on query parameters
        const cacheKey = JSON.stringify({ category, limit });
    
        // Check if data exists in cache
        if (cache.has(cacheKey)) {
            const cachedData = cache.get(cacheKey);
            return sendResponse(res, 200, 'Data fetched from cache', cachedData);
        }
    
        // Apply filters if provided
        if (category) {
            apiUrl += `?category=${category}`;
        }
        if (limit) {
            apiUrl += `${category ? '&' : '?'}title=${limit}`;
        }
    
        // Fetch data from the public API
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        // Cache the response for future use
        cache.set(cacheKey, data);
        
        // Send the response
        sendResponse(res, 200, 'Data fetched', data);
    } catch (err: any) {
        errorHandler({ statusCode: 400, message: err.message }, req, res, () => { });
    }
};
