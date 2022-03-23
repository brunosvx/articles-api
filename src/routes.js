import { Router } from 'express';

import { createPostController } from './controllers/post/createPostController.js';
import { authenticateUserController } from './controllers/user/authenticateUserController.js';
import { createUserController } from './controllers/user/createUserController.js';
import { setUserAdminController } from './controllers/user/setUserAdminController.js';
import { deletePostController } from './controllers/post/deletePostController.js';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js';
import { ensureAdmin } from './middlewares/ensureAdmin.js';

const routes = Router();

routes.post('/user', createUserController);
routes.post('/login', authenticateUserController);

routes.post('/post', ensureAuthenticated, createPostController);
routes.delete('/post', ensureAuthenticated, deletePostController);

routes.patch('/admin',
    ensureAuthenticated,
    ensureAdmin,
    setUserAdminController
    );

export { routes }