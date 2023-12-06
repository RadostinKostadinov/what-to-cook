import express from 'express';

import { validateReqData } from '../middlewares/validateReqData.js';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/me', isAuthenticated, validateReqData(), userController.getCurrentUser);

export default router;
