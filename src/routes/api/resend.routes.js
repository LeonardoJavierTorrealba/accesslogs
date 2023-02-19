import {Router} from 'express'
import resendApiController from '../../controllers/api/resendApiController.js'
import mainController from '../../controllers/mainController.js'
const router = Router();


router.get('/getPendingDocs', resendApiController.getPendingDocs);
router.post('/resendPendings', resendApiController.resendPendings);
router.get('/showProcess', resendApiController.showProcessBySuc);
router.post('/resendAllResults', mainController.resendAllResults);



export default router;