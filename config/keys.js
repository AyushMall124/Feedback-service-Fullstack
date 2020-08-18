//figure out what set of cred to use
// module.exports = require("./dev");
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
