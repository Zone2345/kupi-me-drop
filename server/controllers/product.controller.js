const ProductModel = require("../models/product.model");

module.exports = {
  getProduct: async (req, res) => {
      const result = await ProductModel.find().populate("category");
      res.status(200).json(result);
    },
    createProduct: async (req, res) => {
        const obj = new ProductModel(req.value.body);
        const result = await obj.save();
        res.status(200).json(result);
      },
      updateProduct: async (req, res) => {
          const {
            productId
          } = req.value.params;
          const obj = await ProductModel.findOne({
            productId
          });
          if (!obj) return res.status(400).json({
            message: "Product do not exist."
          })
          var data = req.value.body;
          const result = await ProductModel.findOneAndUpdate({
            productId
          }, data);
          const user = await UserModel.findById(data.author);
          data.author = user;
          res.status(200).json(Object.assign(result, data));
        },
        removeProduct: async (req, res) => {
          const {
            productId
          } = req.value.params;
          const obj = await ProductModel.findById(productId);
          if (obj) {
            for (var comment of obj.comments) {
              var comm = await CommentModel.findOne({
                _id: comment
              });
              if (comm) {
                await comm.remove();
                let report = await ReportModel.findOne({
                  reportedOn: comment
                });
                if (report) {
                  await report.remove();
                }
              }
            }
          }
          await ProductModel.findByIdAndRemove(productId);
          res.status(200).json(obj);
        },
}
