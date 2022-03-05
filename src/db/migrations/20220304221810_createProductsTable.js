
 exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("product_id").primary();
    table.string("product_sku");
    table.string("product_name");
    table.text("product_description");
    table.integer("product_quantity_in_stock");
    table.decimal("product_weight_in_lbs");
    table.integer("supplier_id").unsigned().notNullable(); // unsigned prevents negative values
    table
      .foreign("supplier_id") // creates foreign key
      .references("supplier_id") // from supplier_id
      .inTable("suppliers") // in suppliers_table
      .onDelete("cascade"); // if supplier deleted all related products deleted
    table.timestamps(true, true);
  });
};


 exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
