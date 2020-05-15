import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    AvatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, AvatarFilename }: Request) : Promise<User> {

        const userReporsitory = getRepository(User);

        const user = await userReporsitory.findOne(user_id);

        if(!user) {
            throw new AppError('Only authenticated users can change avatar. ');
        }

        if(user.avatar) {

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExistes = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExistes) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
            user.avatar = AvatarFilename;

            await userReporsitory.save(user);

            return user;
    }
}
export default UpdateUserAvatarService;
