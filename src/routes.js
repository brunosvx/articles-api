import { Router } from 'express';

import { authenticateUserController } from './controllers/user/authenticateUserController.js';
import { createUserController } from './controllers/user/createUserController.js';

const routes = Router();

routes.post('/user', createUserController);
routes.post('/login', authenticateUserController);

export { routes }