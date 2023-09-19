import express from "express";
import expressRateLimit from 'express-rate-limit';
import expressSlowDown from 'express-slow-down';

const router =express.Router();

const limiter =expressRateLimit({    
    windowMs:10*60*1000,
    max:10,
    message:'Too many requests🛑'

});

const speedLimiter =expressSlowDown({
    windowMs: 10*60*1000,
    delayAfter:10,
    delayMs:500
})  

class LimitRoutes{
    constructor(){
        router.get('/rate-limit', limiter ,this.rateLimit);
        router.get('/speed-limit', speedLimiter ,this.speedLimit);
    }

    rateLimit(req,res){
        console.log(req.ip);
        res.status(200).json(req.rateLimit);
    }

    speedLimit(req,res){
        console.log(req.ip);
        res.status(200).json(req.slowDown);
    }

}
new LimitRoutes()
export default router;