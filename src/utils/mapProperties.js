const lodash = require("lodash");

function mapProperties(configuration) {
  return (data) => {
    if (data) {
      return Object.entries(
        data.reduce((acc, [key, value]) => {
          return lodash.set(acc, configuration[key] || key, value);
        }, {})
      );
    }
    return data;
  };
}

module.exports = mapProperties;
