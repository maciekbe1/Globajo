import Joi from "joi";

export default function userValidate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}
