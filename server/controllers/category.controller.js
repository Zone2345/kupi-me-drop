const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");
module.exports = {
  getAllCategories: async (req, res) => {
      const result = await CategoryModel.find();
      res.status(200).json(result);
    },
    getCategoriesWithArticles: async (req, res) => {
        await ProductModel.aggregate([{
            $group: {
              _id: '$category',
              articles: {
                $push: '$_id',
              }
            }
          },
          {
            $project: {
              category: '$_id',
              articles: 1,
              _id: 0,
            }
          },
          {
            $lookup: {
              from: "product",
              localField: "category",
              foreignField: "_id",
              as: 'docs',
            }
          }
        ]).exec(async (err, categories) => {
          if (err) throw err;
          var fullCategories = [];
          var c;
          for (let category of categories) {
            c = await CategoryModel.findOne(category.category);
            c.numberOfArticles = category.products.length;
            fullCategories.push(c);
          }
          res.status(200).send(fullCategories);
        })
      },
      createCategory: async (req, res) => {
          const obj = new CategoryModel(req.value.body);
          const result = await obj.save();
          res.status(200).json(result);
        },
        getCategory: async (req, res) => {
            const {
              name
            } = req.value.params;
            const result = await CategoryModel.findOne({
              hyphen: name
            });
            res.status(200).json(result);
          },
          getCategoryById: async (req, res) => {
              const {
                id
              } = req.value.params;
              const result = await CategoryModel.findOne({
                categoryId: id
              });
              res.status(200).json(result);
            },
            updateCategory: async (req, res) => {
                const {
                  id
                } = req.value.params;
                const obj = await CategoryModel.findOne({
                  _id: id
                });
                if (!obj) return res.status(404).json({
                  message: "Category do not exist."
                })
                const data = req.value.body;
                const result = await CategoryModel.findByIdAndUpdate(id, data);
                res.status(200).json(Object.assign(result, data));
              },
              removeCategory: async (req, res) => {
                const {
                  id
                } = req.value.params;
                const obj = await CategoryModel.findById(id);
                if (!obj) {
                  return res.status(404).json({
                    message: "Category does not exist."
                  });
                }
                const products = await ProductModel.find({
                  category: id
                });
                if (products && products.length) {
                  return res.status(403).json({
                    message: "This category is used in " + products.length + " products and can not be deleted."
                  });
                }
                await CategoryModel.findByIdAndRemove(id);
                res.status(200).json(obj);
              }

}
