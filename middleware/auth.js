const jwt = require("jsonwebtoken");
const User = require("../mongooseModels/User");

const auth = async (req, res, next) => {
  try {
    console.log(req.path)
    var unSecuredPaths = ['/login', '/signup']
    if (unSecuredPaths.includes(req.path)) {
        return next()
    }
    if (req && req.headers && req.headers.accesstoken) {
      const decodedData = jwt.verify(req.headers.accesstoken, "jwtkey");
      if (decodedData && decodedData._id) {
        const user = await User.findOne(
          { _id: ObjectId(decodedData._id), token: req.headers.accesstoken },
          { _id: 1, email: 1, accessLevel: 1 }
        );
        console.log(user)
        if (user && user._id) {
          req.user = user;
          next();
        } else {
          throw "Unauthorized";
        }
      } else {
        throw "Unauthorized";
      }
    } else {
      throw "Unauthorized";
    }
  } catch (err) {
    res.status(401).json({ status: 401, error: "UnAuthorised" });
  }
};

module.exports = auth;
