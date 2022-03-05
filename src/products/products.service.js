const knex = require("../db/connection");

// * find product by id
function read(productId) {
  return knex("products").select("*").where({ product_id: productId }).first();
}

// * return all products
function list() {
  return knex("products").select("*");
}

module.exports = {
  list,
  read
};
