const jwt = require("jsonwebtoken");
const secrets = require("../config/secretKey.js");

///  check JWT exist and still valid
function checkJWT(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          errorMessage: "provided token couldn't verify Log in Please",
        });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ errorMessage: "Token not exist" });
  }
}

module.exports = checkJWT;
