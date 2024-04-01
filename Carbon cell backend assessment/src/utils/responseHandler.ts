import { Response } from 'express';

interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
    data?: any;
}

export const sendResponse = (res: Response, statusCode: number, message: string, data?: any): void => {
    const responseData: ApiResponse = {
        success: true,
        status: statusCode,
        message: message
    };

    if (data !== undefined) {
        responseData.data = data;
    }

    res.status(statusCode).json(responseData);
}

export const sendToken = (res: Response, statusCode: number , token: string) => {
  // Check if COOKIE_EXPIRE is defined and is a number
  if (process.env.COOKIE_EXPIRE === undefined || isNaN(Number(process.env.COOKIE_EXPIRE))) {
    throw new Error('COOKIE_EXPIRE environment variable is not defined or is not a number.');
  }

  // Parse COOKIE_EXPIRE as a number
  const cookieExpire = Number(process.env.COOKIE_EXPIRE);

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + cookieExpire * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
