const { verify } = require('../utils/auth');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: { message: 'Token not found' } });
  try {
    const user = verify(token);

    req.locals = { user };

    next();
  } catch (e) {
    return res.status(401).json(
      { error: { message: 'jwt malformed' } },
    );
  }
};