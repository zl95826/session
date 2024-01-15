const express = require("express");
const apiRouter = express.Router();
apiRouter.use((req, res, next) => {
  console.log("Message from apiRouter module");
  next();
});
// Middleware function for logging
const logMiddleware = (req, res, next) => {
  console.log("Request received at:", new Date());
  next();
};
// Use the logging middleware for all routes in the router
apiRouter.use(logMiddleware);

//Define a route in the router and associate the specific handler
apiRouter.get("/example", (req, res) => {
  res.send("Hello from the apiRouter example route!");
});
apiRouter.get("/test", (req, res) => {
  res.send("Hello from the apiRouter test route!");
});

module.exports = apiRouter;
//Routers are instances of express.Router()
//and can be mounted at specific paths within the main application. like:
//app.use("/api", apiRouter);

//A router is a way to modularize and organize routes and middleware in Express.
//It's like a mini Express application that can have its own routes, middleware, and even nested routers.
