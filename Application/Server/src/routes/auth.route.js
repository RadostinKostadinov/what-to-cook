import express from 'express';

import * as authController from '../controllers/auth.controller.js';
import { validateReqData } from '../middlewares/validateReqData.js';
import * as userValidations from '../validations/user.validation.js';
import * as authValidations from '../validations/auth.validation.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import unifiedResponse from '../utils/unifiedResponse.js';

const router = express.Router();

router.post('/register', validateReqData(userValidations.createUser), authController.registerUser);
router.post('/refresh', authController.refresh);
router.post('/login', validateReqData(authValidations.login), authController.login);

router.get('/test', isAuthenticated, (req, res) => {
  res
    .status(200)
    .json(unifiedResponse.success(200, 'Authentication works! -> Try without access token, should get 401.'));
});

export default router;
