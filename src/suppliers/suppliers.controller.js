const service = require("./suppliers.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// * valdation

// * existing columns in table
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
async function supplierExists(req, res, nxt) {
  const supplier = await service.read(req.params.supplierId);

  if (supplier) {
    res.locals.supplier = supplier;
    return nxt();
  }
  nxt({ status: 404, message: `Supplier cannot be found` });
}
// * end validation

// * add new supplier
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

// * update existing supplier
async function update(req, res) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  const data = await service.update(updatedSupplier);
  res.json({ data });
}

async function destroy(req, res) {
  await service.delete(res.locals.supplier.supplier_id);
  res.sendStatus(204);
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(supplierExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(supplierExists),
    asyncErrorBoundary(destroy)
  ],
};
