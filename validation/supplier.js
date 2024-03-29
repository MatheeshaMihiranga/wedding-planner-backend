const { object, string, array,number } = require("yup");

const supplierUpdateValidation = object({
  supplierName: string(),
  categoryType: string(),
  webLink: string(),
  location: string(),
  userId:string(),
  description: string(),
  packages: array(),
  images: array(),
  rating:number(),
  unavailableDates:array(),
});

module.exports = {
  supplierUpdateValidation,
};
