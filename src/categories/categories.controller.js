const service = require("./categories.service");

// * get all categories
function list(req, res, nxt) {
  return service
    .list()
    .then((data) => res.json({ data }))
    .catch(nxt);
}

module.exports = {
  list: [list],
};
