const router = require("express-promise-router")();
const CategoryController = require("../controllers/category.controller");
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/route.helper");

router.route("/")
  .get(CategoryController.getCategory);

router.route("/all-categories").get(CategoryController.getAllCategories);
router.route("/:id").get(validateParams(schemas.id, "id"), CategoryController.getCategoryById)
  .delete(validateParams(schemas.objectId, "id"), CategoryController.removeCategory)
  .put([validateParams(schemas.objectId, "id"), validateBody(schemas.category.required)], CategoryController.updateCategory);

router.route("/create")
  .post(validateBody(schemas.category.required), CategoryController.createCategory);

router.route("/:name")
  .get(validateParams(schemas.hyphen, "name"), CategoryController.getCategory);
// example how we use validators
// router.route("/:categoryId")
//  .get(validateParams(schemas.id, "categoryId"), ArticleController.getArticle)
//  .put([validateParams(schemas.id, "categoryId"), validateBody(schemas.categoryId.required)], ArticleController.updateArticle)
//  .delete(validateParams(schemas.objectId,"categoryId"),ArticleController.removeArticle);

module.exports = router;
