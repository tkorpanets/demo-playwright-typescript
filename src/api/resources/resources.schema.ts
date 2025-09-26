import Joi from 'joi';

export const listResourcesSchema = Joi.object({
  page: Joi.number().required(),
  per_page: Joi.number().required(),
  total: Joi.number().required(),
  total_pages: Joi.number().required(),
  data: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        year: Joi.number().required(),
        color: Joi.string().required(),
        pantone_value: Joi.string().required(),
      })
    )
    .required(),
  support: Joi.object({
    url: Joi.string().uri().required(),
    text: Joi.string().required(),
  }).required(),
});

export const singleResourceSchema = Joi.object({
  data: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    year: Joi.number().required(),
    color: Joi.string().required(),
    pantone_value: Joi.string().required(),
  }).required(),
  support: Joi.object({
    url: Joi.string().uri().required(),
    text: Joi.string().required(),
  }).required(),
});
