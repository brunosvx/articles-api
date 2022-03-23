import { Router } from 'express';

import { createUserController } from './controllers/user/createUserController.js';

const routes = Router();

routes.post('/user', createUserController);

export { routes }