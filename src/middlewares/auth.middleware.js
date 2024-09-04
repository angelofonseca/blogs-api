const { verify } = require('../utils/auth');

module.exports = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const user = verify(token);

    req.locals = { user };

    next();
  } catch (e) {
    return res.status(401).json(
      { message: 'Expired or invalid token' },
    );
  }
};