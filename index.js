const express = require("express");
const app = express();
const router = express.Router(); //this is for router-level middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
router.use((req, res, next) => {
  console.log("Time 2: from router", Date.now());
  next();
});
//I defined the router, but I haven't actually used this router in the application.
//You need to mount the router on a path in your main application (app) using app.use().
//like app.use("/api", router);
router.use((req, res, next) => {
  console.log("This middleware is specific to the router.");
  next();
});
//-----------used the router
app.use(router); //path is optional.
//If you use app.use(router) without specifying a mount path, the router will be mounted at the root path ("/") by default.
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/error", (req, res, next) => {
  throw "Error here";
});
app.use("/user/:id", (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});
app.get("/user/:id", (req, res, next) => {
  console.log(req.params, req.body);
  //If you want to access the data sent in the request body (req.body),
  // you could use the built-in middleware called express.json() in Express.js.
  //For req.params, you don't need it
  res.send("User " + req.params.id);
});
//Middleware can also be declared in an array for reusability.
const logOriginalUrl = (req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  next();
};
const logMethod = (req, res, next) => {
  console.log("Request Type:", req.method);
  next();
};
const logStuff = [logOriginalUrl, logMethod];
app.get("/users", logStuff, (req, res, next) => {
  res.send("Users Info");
});
app.use((req, res, next) => {
  res.status(404).send("404 errors");
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("error happens");
});
app.listen(3000, () => {
  console.log("Server is working");
});
