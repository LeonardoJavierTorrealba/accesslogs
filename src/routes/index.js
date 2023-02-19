import express from 'express';
var router = express.Router();
import resendRoutes from '../routes/api/resend.routes.js';
import mainController from '../controllers/mainController.js'

//Al Api por otro lado
router.use('/api', resendRoutes);

router.get('/', mainController.home);
router.get('/resendPage', mainController.resendPage);
router.get('/resendResult', mainController.resendAllResults);
router.get('/resendDoc/:invoicerReference', mainController.resendDoc);

export default router;
