import { Router } from "express";
import {signUp, getUserId, inactiveUsers} from '../controllers/users-controllers';
const router : Router = Router();

router.post ('/signup', signUp );
router.get ('/:id', getUserId );
router.get ('/inactive', inactiveUsers );



export default router;