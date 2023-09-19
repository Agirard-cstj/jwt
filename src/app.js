import express from "express";
import database from "./core/database.js";
import limitRoute from "./routes/limits.routes.js"
import accountRoutes from "./routes/accounts.routes.js";
import expressRateLimit from 'express-rate-limit';
import expressSlowDown from 'express-slow-down';
import errors from "./core/errors.js";


const app = express();
database();
app.use(express.json());


const limiter =expressRateLimit({    
    windowMs:10*60*1000,
    max:10,
    message:'Too many requests🛑'

});

app.use(limiter);


app.use('/accounts',accountRoutes);
app.use(limitRoute);

app.use(errors);
// Pour mettre un middlewae sur toutes routes

export default app;
