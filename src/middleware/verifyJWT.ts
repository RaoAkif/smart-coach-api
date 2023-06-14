import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    coach?: string;
    roles?: string[];
}

export const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (typeof authHeader !== 'string' && !(authHeader instanceof Array)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const headerValue = typeof authHeader === 'string' ? authHeader : authHeader[0];

    if (!headerValue.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = headerValue.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret,
        (err, decoded) => {
            if (err || !decoded || typeof decoded !== 'object' || !('CoachInfo' in decoded)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const decodedPayload = decoded as JwtPayload;
            req.coach = decodedPayload.CoachInfo.username;
            req.roles = decodedPayload.CoachInfo.roles;
            next();
        }
    );
};

module.exports = verifyJWT;
