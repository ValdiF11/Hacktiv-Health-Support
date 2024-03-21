const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const session = require("express-session");
const port = 3000;


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);

app.use(require("./Routers/router"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
