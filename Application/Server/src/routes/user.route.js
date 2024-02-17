import express from 'express';

import { validateReqData } from '../middlewares/validateReqData.js';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/me', isAuthenticated, validateReqData(), userController.getCurrentUser);
router.get('/me/fridge', isAuthenticated, validateReqData(), userController.getCurrentUserFridge);

export default router;
