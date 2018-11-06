const router = require("express-promise-router")();
const AuthController = require("../controllers/register.controller");
const {
  ValidateParams,
  validateBody,
  schemas
} = require("../helpers/route.helper");
const config = require("../../config/database");
const jwt = require("jsonwebtoken");

router.route("/authenticated").get(AuthController.authenticated);
router.route("/register").post(validateBody(schemas.auth.register), AuthController.register);
router.use((req, res, next) => {
  next();
  console.log('tokkkennenenenene', req.headers);
  const token = req.headers['authorization'];
  console.log('tokkkennenenenene', token);
  if (!token) {
    res.status(403).send("No token provided")
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(403).send("Token invalid")
      } else {
        req.decoded = decoded;
        next();
      }
    })
  }
})
router.route("/login").post(validateBody(schemas.auth.login), AuthController.login);

// router.route("/profile")
//   .get(AuthController.profile)

// router.route("/articles")
//   .get(AuthController.getUserArticles)

module.exports = router;
