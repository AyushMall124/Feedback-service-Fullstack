const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const mongoose = require("mongoose");
require("./models/User");
const keys = require("./config/keys");
require("./services/passport");
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

//to make sure this works in production
if (process.env.NODE_ENV === "production") {
  //Making sure that express will serve up production assets
  //Like main.js or main.css files
  app.use(express.static("client/build"));

  //express will serve up index.html file if it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
