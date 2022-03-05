// * verify properies exist in request bosy

function hasProperties(...properties) {
  return function (req, res, nxt) {
    const { data = {} } = req.body;
    try {
      properties.forEach((prop) => {
        if (!data[prop]) {
          const error = new Error(`A '${prop}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      nxt();
    } catch (err) {
      nxt(err);
    }
  };
}

module.exports = hasProperties;