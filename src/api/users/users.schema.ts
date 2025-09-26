import Joi from 'joi';

export const listUsersSchema = Joi.object({
  page: Joi.number().required(),
  per_page: Joi.number().required(),
  total: Joi.number().required(),
  total_pages: Joi.number().required(),
  data: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        avatar: Joi.string().uri().required(),
      })
    )
    .required(),
  support: Joi.object({
    url: Joi.string().uri().required(),
    text: Joi.string().required(),
  }).required(),
});

export const singleUserSchema = Joi.object({
  data: Joi.object({
    id: Joi.number().required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    avatar: Joi.string().uri().required(),
  }).required(),
  support: Joi.object({
    url: Joi.string().uri().required(),
    text: Joi.string().required(),
  }).required(),
});

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  job: Joi.string().required(),
  id: Joi.string().required(),
  createdAt: Joi.string().isoDate().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  job: Joi.string().optional(),
  updatedAt: Joi.string().isoDate().required(),
});
