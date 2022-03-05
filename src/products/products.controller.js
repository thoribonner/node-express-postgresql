const service = require("./products.service");

// * validation

// * verify product id exists
function productExists(req, res, nxt) {
  service
    .read(req.params.productId)
    .then((product) => {
      if (product) {
        res.locals.product = product;
        return nxt();
      }
      nxt({ status: 404, message: "Product cannot be found." });
    })
    .catch(nxt);
}
// * end validation

// * get product by id
function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

// * get all products
function list(req, res, nxt) {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
