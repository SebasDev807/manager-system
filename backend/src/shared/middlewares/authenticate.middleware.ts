import { Request, Response, NextFunction } from 'express';

import { UnauthorizedException } from '../exceptions';
import jwt from 'jsonwebtoken';
import { Logger } from '../utils';
import { envs } from '../../config';
import { prisma } from '../lib/prisma';
import { User } from '../../auth/domain/ports/user.port.interface';



declare global {
    namespace Express {
        interface Request {
            user?:User;
        }
    }
}

export const authenticate = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const bearerToken = req.headers.authorization;
    
    if (!bearerToken) {
        throw new UnauthorizedException("No token on header");
    }

    const token = bearerToken.split(' ')[1];

    if(!token){
        throw new UnauthorizedException("Invalid token format");
    }

    try {
        
        const result = jwt.verify(token, envs.JWT_SECRET!) as User;
        
        const user = await prisma.user.findUnique({
            where: {
                id: result.id
            }
        });

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        req.user = user;
        next();

    } catch (error:any) {
        Logger.error(`"Authentication error", ${error.message})`);
        next(error)
    }
}