const dotenv = require("dotenv");
const connectDB = require("../config/mongoDB");
const user = require("../models/user");
const users = require("../data/users");

dotenv.config();
connectDB();

const addAdminUsers = async () => {
  try {
    await user.insertMany(users);
  } catch (error) {
    console.log(error);
  }
};

switch (process.argv[2]) {
  case "addAdmin": {
    addAdminUsers();
    break;
  }
  default: {
    console.log("Please add correct config");
  }
}
