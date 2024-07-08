import Joi from 'joi';

export const createAuthUserSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').default('user')
});

export const createMagicLinkSchema = Joi.object({
  email: Joi.string().email().required()
});

export const tokenSchema = Joi.object({
  token: Joi.string().required()
});