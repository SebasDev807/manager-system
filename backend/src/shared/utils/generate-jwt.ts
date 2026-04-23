import jwt, { JwtPayload } from 'jsonwebtoken';
import { envs } from '../../config';

export const generateJWT = (payload: JwtPayload,) => {

    if (!envs.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
        payload,
        envs.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
}