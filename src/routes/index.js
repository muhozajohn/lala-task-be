import express from 'express';
import userRoute from './users.routes';
import authMiddleware from '../middlewares/auth';
import docrouter from '../LalaAPIDocs';


const routes = express.Router();

routes.use("/users",userRoute);
routes.use("/docs", docrouter);


export default routes