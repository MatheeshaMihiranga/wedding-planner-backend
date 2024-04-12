const { object, string,number} = require("yup");

const userRegisterValidation = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
  role: string().default(() => "user"),
  eventDate:string(),
  budget:number()
});

const userUpdateValidation = object({
  name: string(),
  description:string(),
  location:string(),
});

const userLoginValidation = object({
  email: string(),
  password: string().required(),
});

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation
};
