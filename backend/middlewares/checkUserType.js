// middlewares/checkRole.js
module.exports = function checkUserType(requiredUserType) {
    return (req, res, next) => {
      if (!req.user || req.user.userType !== requiredUserType) {
        console.log(req.user);
        return res.status(403).json({ message: 'Forbidden - insufficient permissions' });
      }
      next();
    };
};
  