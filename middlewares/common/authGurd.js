const jwt = require("jsonwebtoken");
require("dotenv").config();

const authGurd = async function (req, res, next) {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRATE, (err, decoded) => {
      if (!err) {
        req.body.user = decoded;
        next();
      } else {
        console.log(err);
        res.status(500).json({
          errors: {
            msg: "Authentication errors!",
          },
        });
      }
    });
  } else {
    res.status(400).json({
      errors: {
        msg: "Token is required",
      },
    });
  }
};

module.exports = authGurd;
