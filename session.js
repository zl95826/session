const express = require("express");
const session = require("express-session");
const app = express();
app.use(
  session({
    secret: "keyboard cat",
    name: "test", //The name of the session ID cookie to set in the response (and read from in the request).
    resave: false, //Controls if the session should be saved even if it wasn't modified.
    saveUnititialized: false,
    cookie: { maxAge: 60000 },
    // cookie: { secure: true }
    // cookie.secure:
    // true is a recommended option. However, it requires an https-enabled website,
    // i.e., HTTPS is necessary for secure cookies.
    // If secure is set, and you access your site over HTTP, the cookie will not be set.
  })
);
app.get("/", (req, res) => {
  console.log(req.session.view);
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});
app.listen(3000, () => {
  console.log("test session");
});
