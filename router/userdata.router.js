import{Router} from 'express';
const userdataRouter = Router();
import { saveContent ,getContent} from '../controller/userdata.controller.js';
import authorization from '../middleware/auth.middleware.js';

userdataRouter.post('/userdata',authorization,saveContent);
userdataRouter.get('/getuserdata/:email',authorization,getContent);

export default userdataRouter;