import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}


class AuthenticateUserService {
    public async execute({ email, password }: Request) : Promise<{user: User, token: string}> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        console.log(user);
        if (!user) {
            throw new AppError('Incorrect email or password!', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email or password!', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,

        });

        return {
            token,
            user,
        };
    }
}

export default AuthenticateUserService;
