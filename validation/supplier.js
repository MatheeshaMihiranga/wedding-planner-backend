const { object, string, array } = require("yup");

const supplierUpdateValidation = object({
  serviceName: string(),
  categoryType: string(),
  webLink: string(),
  location: string(),
  description: string(),
  packages: array(),
  images: array(),
});

module.exports = {
  supplierUpdateValidation,
};
