if (process.env.NODE_ENV === "production") {
  module.exports = {
    dbstring: process.env.DBSTRING,
    cookieKey: process.env.COOKIE_KEY,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleSecretID: process.env.GOOGLE_SECRET_ID,
  };
} else {
  module.exports = require("./dev");
}
