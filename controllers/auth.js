const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModal = require("../models/user");
const checkList = require("../models/checkList");
const guest = require("../models/guest");
const budget = require("../models/budget");

const {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation,
} = require("../validation/user");
const { getCurrentUser, Roles } = require("../middleware/auth");
const { registerSupplier } = require("./supplier");
const { registerCheckList } = require("./checkList");
const { registerBudget } = require("./budget");
const { registerGuest } = require("./guest");

exports.userProfile = async (req, res, next) => {
  try {
    const user = getCurrentUser(req);
    var userId = user.id;
    const userProfileDetails = await userModal
      .findOne({ _id: userId })
      .populate("supplierId")
      .populate({
        path: "supplierId",
        populate: [
          { path: "packageId" },
          { path: "reviewId" },
          { path: "enquireId" },
        ],
      });
    if (userProfileDetails) {
      return res.json({
        success: true,
        data: userProfileDetails,
      });
    } else {
      return res.json({
        success: false,
        data: "User not available",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    await userLoginValidation.validate(req.body);
    const { email, password } = req.body;
    const findUserData = await userModal.findOne({ email: email });

    if (findUserData) {
      const passwordEncrypt = await bcrypt.compare(
        password,
        findUserData.password
      );
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
              return res.status(500).json({ error: 'Password or Email incorrect' });
            } else {
              return res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          }
        );
      }
    }
    return res.status(500).json({ error: 'Password or Email incorrect' });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const saveUser = async (data) => {
  const { name, email, password, role,eventDate,budget } = data;
  const getPassword = await bcrypt.hash(password, 12);
  const user = new userModal({
    name: name,
    email: email,
    password: getPassword,
    role: role,
    eventDate:eventDate,
    budget:budget
  });
  return user.save();
};

const updateUserData = async (userId, data) => {
  const updateUser = await userModal.findByIdAndUpdate({ _id: userId }, data, {
    new: true,
  });
  return updateUser;
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
      let supplierData = await registerSupplier(userData);
      await updateUserData(userData._id, {
        supplierId: supplierData._id,
      });
      res.json({
        success: true,
        data: userData,
      });
    } else {
      let checkListData = await registerCheckList(userData);
      let budgetData = await registerBudget(userData);
      let guestData = await registerGuest(userData);
      await updateUserData(userData._id, {
        checkListId: checkListData._id,
        budgetId: budgetData._id,
        guestId: guestData._id,
      });
      res.json({
        success: true,
        data: userData,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userUpdateValidation.validate(req.body);
    const updateUser = await updateUserData(userId, req.body);
    return res.json({
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userModal.findOneAndDelete({_id:userId})
    await checkList.findOneAndDelete({userId:userId})
    await guest.findOneAndDelete({userId:userId})
    await budget.findOneAndDelete({userId:userId})
    return res.json({
      success: true
    });
  } catch (error) {
    return res.json({
      success: false,
      data: error.message,
    });
  }
};
