const jwt = require("jsonwebtoken");


const getToken = (req) => {
  if (
    req.headers?.authorization &&
    req.headers?.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

exports.authorize = function (roles = []) {
  if (!Array.isArray(roles)) roles = [roles];

  return (req, res, next) => {
    function sendError(msg) {
      return req.res.status(403).json({
        message: msg,
      });
    }

    try {
      const token =
        req.headers["Authorization"] || req.headers["authorization"];

      if (!token) return sendError("Error: No Token"); // Token does not exist
      if (token.indexOf("Bearer") !== 0)
        return sendError("Error: Token format invalid"); // Wrong format

      const tokenString = token.split(" ")[1];

      jwt.verify(tokenString, "secret", (err, decodedToken) => {
        if (err) {
          console.log("err",err);
          return sendError("Error: Broken Or Expired Token");
        }

        if (!decodedToken.role) return sendError("Error: Role missing");
        const userRole = decodedToken.role;
        if (roles.indexOf(userRole) === -1)
          return sendError("Error: User not authorized");
        req.user = decodedToken;
        next();
      });
    } catch (err) {
      return req.res.send.status(500).json({ message: "Server Error Occured" });
    }
  };
};

exports.issueToken = function (user) {
  var token = jwt.sign({ ...user, iss: "Node-Auth" }, _SecretToken, {
    expiresIn: _TokenExpiryTime,
  });
  return token;
};


exports.getCurrentUser = function (req) {
  const userDetails = jwt.verify(getToken(req), "secret");
  return userDetails;
};


exports.Roles = {
  User: ["user"],
  Admin: ["admin"],
  suppliers: ["supplier"],
  All: ["user", "admin", "supplier"],
};
