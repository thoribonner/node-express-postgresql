const service = require("./suppliers.service");
const hasProperties = require("../errors/hasProperties");

// * valdation

// * array of valid properties
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_nates",
  "supplier_type_of_goods",
];

// * verify only valid properties included
function hasOnlyValidProperties(req, res, nxt) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return nxt({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  nxt();
}

// * verify non nullable properties provided
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");

// * verify supplier id exists
// * ensures supplier id not overwritten
function supplierExists(req, res, nxt) {
  service
    .read(req.params.supplierId)
    .then((supplier) => {
      if (supplier) {
        res.locals.supplier = supplier;
        return nxt();
      }
      nxt({ status: 404, message: `Supplier cannot be found` });
    })
    .catch(nxt);
}

// * end validation

// * add new supplier
function create(req, res, nxt) {
  service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(nxt);
}

// * update existing supplier
function update(req, res, nxt) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  service
    .update(updatedSupplier)
    .then((data) => res.json({ data }))
    .catch(nxt);
}

async function destroy(req, res, nxt) {
  service
    .delete(res.locals.supplier.supplier_id)
    .then(() => res.sendStatus(204))
    .catch(nxt);
}

module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, create],
  update: [
    supplierExists,
    hasOnlyValidProperties,
    hasRequiredProperties,
    update,
  ],
  delete: [supplierExists, destroy],
};
