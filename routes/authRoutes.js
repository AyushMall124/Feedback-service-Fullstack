const passport = require("passport");
module.exports = (app) => {
  //Route handler
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  //Once authentication is done, the user is redirected to the dashboard
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //Return null if no current user
  app.get("/api/current_user", (req, res) => {
    // res.send(req.user);

    //Cookie session
    res.send(req.user);
  });
};
