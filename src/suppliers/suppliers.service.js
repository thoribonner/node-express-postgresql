const knex = require("../db/connection");

// * add new supplier
function create(supplier) {
  return knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// * get supplier by id
// * used as validation
// * prevents supplier id from being overwritten
function read(supplier_id) {
  return knex("suppliers").select("*").where({ supplier_id }).first();
}

// * update existing supplier
function update(updatedSupplier) {
  return knex("suppliers")
    .select("*")
    .where({ supplier_id: updatedSupplier.supplier_id })
    .update(updatedSupplier, "*");
}

// * delete supplier by id with cascade for dependents in other tables
function destroy(supplier_id) {
  return knex("suppliers").where({ supplier_id }).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy
};
