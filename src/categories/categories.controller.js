const service = require("./categories.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// * get all categories
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
