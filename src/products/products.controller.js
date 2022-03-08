const service = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
  res.json({ data: await service.list() });
}

// * get all out of stock products
async function listOutOfStockCount(req, res) {
  res.json({ data: await service.listOutOfStockCount() });
}

// * get price summary per product
async function listPriceSummary(req, res) {
  res.json({ data: await service.listPriceSummary() });
}

// * total weight by product quantity in stock
async function listTotalWeightByProduct(req, res) {
  res.json({ data: await service.listTotalWeightByProduct() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
  listOutOfStockCount: [asyncErrorBoundary(listOutOfStockCount)],
  listPriceSummary: [asyncErrorBoundary(listPriceSummary)],
  listTotalWeightByProduct: [asyncErrorBoundary(listTotalWeightByProduct)],
};
