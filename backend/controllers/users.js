const userModule = require("../models/users");
const cartSchema = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const role = require("../models/role");
const IdAdmin = "6596b4d90cec78723d89954a";
const IdUser = "6596b403056735dac934cce1";
const register = (req, res) => {
  const { userName, email, password, phoneNumber, location } = req.body;
  const newUser = new userModule({
    userName,
    email,
    password,
    phoneNumber,
    location,
    role: IdUser,
  });
  newUser
    .save()
    .then((result) => {
      //   add new cart for this user  => =>
      const newCart = new cartSchema({
        products: [],
        user: result._id,
      });
      newCart
        .save()
        .then((result) => {
          res.status(202).json("successful Created");
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModule
    .findOne({ email })
    .populate("role", "-_id")
    .then(async (result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          massage:
            "The email doesn't exist or The password you’ve entered is incorrect",
        });
        return;
      }
      const valid = await bcrypt.compare(password, result.password);
      if (!valid) {
        res.status(404).json({
          success: false,
          massage:
            "The email doesn't exist or The password you’ve entered is incorrect",
        });
      }

      if (valid) {
        payload = {
          userId: result._id,
          author: result.userName,
          role: result.role,
          location: result.location,
        };
        const options = {
          expiresIn: "120m",
        };

        const token = jwt.sign(payload, process.env.SECRET , options);

        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      }
      console.log(result);
    })
    .catch((er) => console.log(er));
};

module.exports = { login, register };
