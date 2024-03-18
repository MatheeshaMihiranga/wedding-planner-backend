const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModal = require("../models/user");
const {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation,
} = require("../validation/user");
const { getCurrentUser, Roles } = require("../middleware/auth");
const { registerSupplier } = require("./supplier");

exports.userProfile = async (req, res, next) => {
  try {
    const user = getCurrentUser(req);
   var userId = user.id;
    const userProfileDetails = await userModal.findOne({ _id: userId });
    if (userProfileDetails) {
      return res.json({
        success: true,
        data: userProfileDetails,
      });
    }else{
      throw new Error("User not available");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
 await userLoginValidation.validate(req.body);
    const { email, password } = req.body;
    const findUserData = await userModal.findOne({ email: email });

    if (findUserData) {
      const passwordEncrypt = await bcrypt.compare(password, findUserData.password);
      if (passwordEncrypt) {
        const payload = {
          id: findUserData.id,
          name: findUserData.name,
          role: findUserData.role,
        };
        return await jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) {
              throw new Error("Something went wrong");
            } else {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          }
        );
      }
    }
    throw new Error("User not available");
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveUser = async (data) => {
  const { name, email, password, role } = data;
  const getPassword = await bcrypt.hash(password, 12);
  const user = new userModal({
    name: name,
    email: email,
    password: getPassword,
    role: role,
  });
  return user.save();
};

exports.signUp = async (req, res, next) => {
  const { email } = req.body;
  try {
    await userRegisterValidation.validate(req.body);
    const checkUserIsAvailable = await userModal
      .findOne({ email: email })
      .exec();

    if (checkUserIsAvailable) return res.send("User has already registered");
    const userData = await saveUser(req.body);
    if (userData.role == Roles.suppliers) {
      await registerSupplier(userData);
      res.json({
        success: true,
        data: userData,
      });
    } else {
      res.json({
        success: true,
        data: userData,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userUpdateValidation.validate(req.body);
    const updateUser = await userModal.findByIdAndUpdate(
      { _id: userId },
      req.body,
      {
        new: true,
      }
    );
    return res.json({
      success: true,
      data: updateUser,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
