const { object, string} = require("yup");

const userRegisterValidation = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
  role: string().default(() => "user"),
});

const userUpdateValidation = object({
  name: string(),
  description:string(),
  location:string(),
});

const userLoginValidation = object({
  email: string().email(),
  password: string().required(),
});

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation
};
