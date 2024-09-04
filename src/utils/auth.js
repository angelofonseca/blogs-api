const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verify = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return user;
};

module.exports = {
  createToken,
  verify,
}; 