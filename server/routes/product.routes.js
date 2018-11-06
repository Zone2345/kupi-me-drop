const router = require("express-promise-router")();
const ProductController = require("../controllers/product.controller");
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/route.helper");
const jwt = require("jsonwebtoken");
const config = require("../../config/database");

router.route("/")
  .get(ProductController.getProduct)


// example how we use validators
router.route("/:productId")
  .get(validateParams(schemas.id, "productId"), ProductController.getProduct)
  .put([validateParams(schemas.id, "productId"), validateBody(schemas.product.required)], ProductController.updateProduct)
  .delete(validateParams(schemas.objectId, "productId"), ProductController.removeProduct);

router.use((req, res, next) => {
  next();
  // const token = req.headers['authorization'];
  // if (!token) {
  //   res.json({
  //     success: false,
  //     message: "No token provided"
  //   });
  // } else {
  //   jwt.verify(token, config.secret, (err, decoded) => {
  //     if (err) {
  //       res.json({
  //         success: false,
  //         message: "Token invalid",
  //         err
  //       })
  //     } else {
  //       req.decoded = decoded;
  //       next();
  //     }
  //   })
  // }
});

router.route("/create")
  .post(validateBody(schemas.product.required), ProductController.createProduct);

module.exports = router;
