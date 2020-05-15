import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewars/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {

        const { name, email, password } = request.body;

        const userService = new CreateUserService();

        const user = await userService.execute({name, email, password});

        return response.json(user);

    } catch(error) {

        return response.status(400).json({error: error.message});
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar') , async (request, response) => {

    try {

        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
             user_id: request.user.id,
             AvatarFilename: request.file.filename,
             });

        return response.json(user);

    } catch(err) {
        return response.status(400).json({error: err.message});
    }
});

export default usersRouter;
