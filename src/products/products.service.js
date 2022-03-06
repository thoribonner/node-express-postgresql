const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

const addCategory = mapProperties({
  category_id: "category.category_id",
  category_name: "category.category_name",
  category_description: "category.category_description",
});

// * return product by id with category information
function read(productId) {
  return knex("products as p")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "pc.category_id", "c.category_id")
    .select("p.*", "c.*")
    .where({ "p.product_id": product_id })
    .first()
    .then(addCategory);
}

// * return all products
function list() {
  return knex("products").select("*");
}

// * list out of stock items
function listOutOfStockCount() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

// * price summary per product
function listPriceSummary() {
  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

// * total weight of each product * in stock quantity
function listTotalWeightByProduct() {
  return knex("products")
    .select(
      "product_sku",
      "product_title",
      knex(
        raw(
          "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
        )
      )
    )
    .groupBy("product_title", "product_sku");
}

module.exports = {
  list,
  read,
  listOutOfStockCount,
  listPriceSummary,
  listTotalWeightByProduct,
};
