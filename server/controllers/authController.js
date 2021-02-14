import bcryptjs from "bcryptjs";
// import { User } from "../models/User";
import Users from "../mock/Users";
import jwt from "jsonwebtoken";

import _ from "lodash";
import Joi from "joi";

exports.signIn = async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    // let user = await User.findOne({ email: req.body.email });
    const user = _.find(Users, { email: req.body.email });
    if (!user)
      return res.status(400).send({ message: "Invalid email or password" });
    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send({ message: "Invalid email or password" });

    if (!user.active)
      return res
        .status(400)
        .send({ message: "User is not confirm. Check your email." });

    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.cookie("token", token, { httpOnly: true, sameSite: true });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}
