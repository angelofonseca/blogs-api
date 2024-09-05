const { verify } = require('../utils/auth');

module.exports = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return res.status(401).json({ message: 'Token not found' });
  try {
    const token = bearerToken.split(' ')[1];
    const user = verify(token);

    req.locals = { user };

    next();
  } catch (e) {
    return res.status(401).json(
      { message: 'Expired or invalid token' },
    );
  }
};