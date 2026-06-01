import Joi from 'joi';

export const loginSuccessSchema = Joi.object({
  token: Joi.string().required(),
  _meta: Joi.object().optional(),
});

export const registerSuccessSchema = Joi.object({
  id: Joi.number().required(),
  token: Joi.string().required(),
  _meta: Joi.object().optional(),
});

export const errorSchema = Joi.object({
  error: Joi.string().required(),
  _meta: Joi.object().optional(),
});
