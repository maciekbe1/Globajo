import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User, validate } from "../models/User";
import Users from "../mock/Users";
import jwt from "jsonwebtoken";

import _ from "lodash";

/**
 * @Do returning user info excluding sesitive data
 * @return {photo, name}
 */
exports.me = async (req, res) => {
  const user = _.find(Users, { id: req.user.id });
  res.send({ email: user.email, id: user.id });
};

exports.signUp = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // let user = await Users.findOne({ email: req.body.email });
  const user = _.find(Users, { mail: req.body.email });
  if (user) return res.status(400).send("User already exist.");

  /**
   * @TODO add action create new user in database here
   */
  // user = new User(_.pick(req.body, ["name", "password", "email"]));

  const salt = await bcryptjs.genSalt(10);
  const random = crypto.randomBytes(20).toString("hex");
  user.password = await bcryptjs.hash(user.password, salt);
  user.accountConfirmation = random;

  /**
   * @TODO add action saving the user here
   */
  // await user.save();
  const token = jwt.sign({ id: user.id }, process.env.SECRET);
  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
  /**
   * @TODO
   * Add a method that will handle the sending of e-mails confirming registration
   */
};

/**
 * @Do verifying the user after create account or reset passowrd, getting hash from the url
 * @param {hash}
 */
exports.verify = async (req, res) => {
  const hash = req.params.hash;
  const user = await User.findOne({ accountConfirmation: hash });
  if (!user) {
    return res.status(400).send({
      type: "bad-link",
      message: "We were unable to find a user for this link.",
    });
  }
  if (user.active)
    return res.status(400).send({
      type: "already-verified",
      message: "This user has already been verified.",
    });

  user.active = true;
  user.accountConfirmation = "";
  await user.save();
  return res.status(201).json({
    message: "User confirmation successfully.",
  });
};

exports.resetPassword = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User is not exist.");
  if (!user.active) return res.status(400).send("User is not active.");
  const random = crypto.randomBytes(20).toString("hex");
  user.emailConfirmation = random;
  await user.save();

  /**
   * @TODO
   * Add a method that will handle the sending of e-mails with the link to setting new password
   */
};
exports.changePassword = async (req, res) => {
  const hash = req.body.hash;
  const password = req.body.password;
  // const user = await User.findOne({ emailConfirmation: hash });
  if (!user)
    return res.status(400).send("We were unable to find a user for this link.");
  if (password.length < 5)
    return res
      .status(400)
      .send("Password length must equal 5 character or be longer.");

  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(password, salt);
  user.emailConfirmation = "";
  await user.save();
  return res.status(200).json({
    message: "Password was changed successfuly",
  });
};
