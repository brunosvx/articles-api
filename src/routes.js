import { Router } from 'express';
/*  */
import { createPostController } from './controllers/post/createPostController.js';
import { authenticateUserController } from './controllers/user/authenticateUserController.js';
import { createUserController } from './controllers/user/createUserController.js';

/*  */
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js';

const routes = Router();

routes.post('/user', createUserController);
routes.post('/login', authenticateUserController);

routes.post('/post', ensureAuthenticated, createPostController);

export { routes }