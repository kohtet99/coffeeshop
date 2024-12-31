const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/customError');

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return next(new CustomError('User not authenticated!', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new CustomError('Token is invalid or expired', 401));
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateUser;
