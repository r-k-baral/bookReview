import {rateLimit} from 'express-rate-limit'
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50,                 // Max 5 attempts,
    statusCode:429,
    message: 'Too many login attempts. Please try again in 15 minutes. '
    
});


export const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})