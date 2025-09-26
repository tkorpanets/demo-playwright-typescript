import Joi from 'joi';

export const loginSuccessSchema = Joi.object({
  token: Joi.string().required(),
});

export const registerSuccessSchema = Joi.object({
  id: Joi.number().required(),
  token: Joi.string().required(),
});

export const errorSchema = Joi.object({
  error: Joi.string().required(),
});
