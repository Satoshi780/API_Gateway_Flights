const express=require('express');
const rateLimit=require('express-rate-limit');
const {createProxyMiddleware}=require('http-proxy-middleware');
const {ServerConfig ,Logger}=require('./config');
const apiRoutes=require('./routes');

const app=express();

const limiter=rateLimit({
    windowMs:2*60*1000,//2 minutes
    max:3,
    message:'Too many requests from this IP, please try again after 2 minutes'
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Proxy middleware for Flight Service
app.use('/flightsService', createProxyMiddleware({ 
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { '^/flightsService': '/' }
}));

// Proxy middleware for Booking Service
app.use('/bookingService', createProxyMiddleware({ 
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { '^/bookingService': '/' }
}));
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,() => {
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
});

/**
 * user
 * |
 * v
 * localhost:3001 (API Gateway) localhost:4000/api/v1/bookings
 * |
 * v
 * localhost:3000/api/users/signup
 */