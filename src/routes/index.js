import express from 'express';
import userRoute from './users.routes';
import authMiddleware from '../middlewares/auth';
import docrouter from '../LalaAPIDocs';
import propertyRoute from './property.routes';
import bookingRoute from './boooking.routes';


const routes = express.Router();

routes.use("/users",userRoute);
routes.use("/properties",authMiddleware,propertyRoute);
routes.use("/bookings",authMiddleware,bookingRoute);
routes.use("/docs", docrouter);


export default routes