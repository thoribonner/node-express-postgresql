const knex = require("../db/connection");

// * get all categories
function list() {
  return knex("categories").select("*");
}

module.exports = {
  list,
};
