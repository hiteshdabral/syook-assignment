const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "token is needed" });
  }
  try {
    const tokenData = jwt.verify(token,`${process.env.SECRET_KEY}`);
    req.user = {
      id: tokenData.id,
    };
    next();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = authenticateUser;
