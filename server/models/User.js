import Joi from "joi";
import jwt from "jsonwebtoken";

/**
 * @TODO
 * Adjust schema to postgress
 */
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     minlength: 3,
//     maxlength: 30,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 1024,
//   },
//   active: {
//     type: Boolean,
//     default: false,
//   },
//   accountConfirmation: {
//     type: String,
//   },
//   emailConfirmation: {
//     type: String,
//   },
//   photo: {
//     type: String,
//     default: "",
//   },
// });

// /**
//  * @Do create the token
//  * @return { string } String
//  */
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.SECRET);
//   return token;
// };
// const User = mongoose.model("User", userSchema);

// function validateUser(user) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string().min(5).max(50).required().email(),
//     password: Joi.string().min(5).max(1024).required(),
//   });
//   return schema.validate(user);
// }
// exports.User = User;
// exports.validate = validateUser;
