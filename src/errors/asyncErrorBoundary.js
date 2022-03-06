function asyncErrorBoundary(delegate, defaultStatus) {
  return (req, res, nxt) => {
    Promise.resolve()
      .then(() => delegate(req, res, nxt))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        nxt({ status, message });
      });
  };
}

module.exports = asyncErrorBoundary;
