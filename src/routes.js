import { Router } from 'express';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js';
import { ensureAdmin } from './middlewares/ensureAdmin.js';

import { createPostController } from './controllers/post/createPostController.js';
import { authenticateUserController } from './controllers/user/authenticateUserController.js';
import { createUserController } from './controllers/user/createUserController.js';
import { setUserAdminController } from './controllers/user/setUserAdminController.js';
import { deletePostController } from './controllers/post/deletePostController.js';
import { changeUserPasswordController } from './controllers/user/changeUserPasswordController.js';
import { editPostController } from './controllers/post/editPostController.js';
import { getPostController } from './controllers/post/getPostController.js';
import { getPostsController } from './controllers/post/getPostsController.js';


const routes = Router();

routes.post('/user', createUserController);
routes.post('/login', authenticateUserController);
routes.patch('/user/password', ensureAuthenticated, changeUserPasswordController);

routes.get('/post/:id', getPostController);
routes.get('/posts', getPostsController);
routes.post('/post', ensureAuthenticated, createPostController);
routes.delete('/post', ensureAuthenticated, deletePostController);
routes.patch('/post', ensureAuthenticated, editPostController);

routes.patch('/admin',
    ensureAuthenticated,
    ensureAdmin,
    setUserAdminController
    );

export { routes }