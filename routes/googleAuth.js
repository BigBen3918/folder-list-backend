const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const User = require("./../model/Users");
const Folder = require("./../model/Folders");
const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleSecretID,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleID: profile.id });

      if (!user) {
        user = await User({
          name: profile._json.given_name,
          email: profile._json.email,
          photo: profile._json.picture,
          googleID: profile.id,
        }).save();

        await Folder({
          userID: user._id,
          title: "new folder",
          description:
            "this folder was created automatically when you signed in.",
          listData: [
            { status: "pending", payload: "demo item 1" },
            { status: "completed", payload: "demo item 2" },
          ],
          updatedAt: Date.now(),
        }).save();

        done(null, user);
      } else {
        done(null, user);
      }
    }
  )
);

// login
router.route("/").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback for exchanging code with data
router.route("/callback").get(passport.authenticate("google"), (req, res) => {
  res.redirect("/dashboard");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/status", (req, res) => {
  if (!req.user)
    return res.status(200).json({
      status: "Logged out!",
      message: "user is no longer logged in !",
      statusCode: 401,
    });

  return res.status(200).json({
    status: "logged in!",
    user: req.user,
    statusCode: 200,
  });
});

module.exports = router;
