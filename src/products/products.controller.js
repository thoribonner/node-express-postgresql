const service = require("./products.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// * validation

// * verify product id exists
function productExists(req, res, nxt) {
  const product = await service.read(req.params.productId);

  if (product) {
    res.locals.product = product;
    return nxt();
  }
  nxt({ status: 404, message: "Product cannot be found." });
}
// * end validation

// * get product by id
function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

// * get all products
function list(req, res, nxt) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
};
