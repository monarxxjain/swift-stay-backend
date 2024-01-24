const People = require("../../model/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config;

const loginControler = async function (req, res) {
  const email = process.env.EMAIL;
  const password = process.env.PASS;

  try {
    const user = await People.find();
    if (user !== null && user.length) {
      try {
        const result = await People.find({ email: req.body.email });

        if (result.length && result[0].email === req.body.email) {
          const compare = await bcrypt.compare(
            req.body.password,
            result[0].password
          );
          if (compare) {
            const userObject = {
              email: result[0].email,
              role: result[0].role,
              id: result[0]._id,
            };
            const token = jwt.sign(userObject, process.env.JWT_SECRATE);
            userObject.token = token;
            res.status(200).json({
              userObject,
            });
          } else {
            res.status(400).json({
              password: {
                msg: "Invlaid password",
              },
            });
          }
        } else {
          res.status(400).json({
            email: {
              msg: "Incorrect email",
            },
          });
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({
          errors: {
            msg: "Internal server error",
          },
        });
      }
    } else {
      const hashedPss = await bcrypt.hash(password, 10);
      const newUer = {
        email,
        password: hashedPss,
        role: "admin",
      };

      const people = new People(newUer);

      try {
        const result = await people.save();

        if (result.email === req.body.email) {
          const compare = await bcrypt.compare(
            req.body.password,
            result.password
          );
          if (compare) {
            const userObject = {
              email: result.email,
              role: result.role,
              id: result[0]._id,
            };
            const token = jwt.sign(result, process.env.JWT_SECRATE);
            userObject.token = token;
            result.password = "";
            res.status(200).json({
              result,
            });
          } else {
            res.status(400).json({
              errors: {
                password: {
                  msg: "Invlaid password",
                },
              },
            });
          }
        } else {
          res.status(400).json({
            errors: {
              email: {
                msg: "Incorrect email",
              },
            },
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          errors: {
            msg: "Internal server errors!",
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

// get single user
const getUser = async function (req, res) {
  const { email } = req.body.user;
  try {
    const result = await People.findOne({ email });
    result.password = "";
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

// get single user by body email
const getSingleUser = async function (req, res) {
  const { email } = req.query;

  try {
    const result = await People.findOne({ email });
    result.password = "";
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

// get all users

const getUsers = async function (req, res) {
  try {
    const result = await People.find();
    const modifiedResult = result.map((doc) => ({
      ...doc.toObject(),
      password: null,
    }));
    res.status(200).json(modifiedResult);
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

// add user
const addUser = async function (req, res) {
  const { email, password } = req.body;
  try {
    const result = await People.findOne({ email });

    if (result) {
      res.status(400).json({
        errors: {
          email: "L’email è già utilizzata da un altro account",
        },
      });
    } else {
      try {
        const hashedPss = await bcrypt.hash(password, 10);

        const user = new People({ ...req.body, password: hashedPss });
        const result1 = await user.save();
        res.status(200).json(result1);
      } catch (err) {
        res.status(500).json({
          errors: {
            msg: "Internal server error",
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

// update user
const updateUser = async function (req, res) {
  const { _id, password } = req.body;

  if (password) {
    const hashedPss = await bcrypt.hash(password, 10);
    req.body.password = hashedPss;
  } else {
    delete req.body.password;
  }

  try {
    const result1 = await People.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    res.status(200).json(result1);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

// delete user
const deleteUser = async function (req, res) {
  const { id } = req.query;

  try {
    const result1 = await People.deleteOne({ _id: id });
    res.status(200).json(result1);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

module.exports = {
  loginControler,
  getUser,
  getUsers,
  addUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
