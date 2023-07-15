const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatepath = path.join(__dirname, "../templates");
const collection = require("./config");

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };
  await collection.insertMany([data]);
  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({
      email: req.body.email
    });
    if (check.password == req.body.password) {
      res.render("home");
    } else {
      res.send("your password is incorrect ");
    }
    // console.log(check.password)
    // console.log(req.body.password)
  } catch {
    res.send("the details are wrong");
  }
});

app.listen(5000, () => {
  console.log("port is connected ");
});
