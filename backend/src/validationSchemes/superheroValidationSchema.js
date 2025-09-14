import Joi from "joi";

export const createSuperheroSchema = Joi.object({
  nickname: Joi.string().min(1).max(100).required(),
  real_name: Joi.string().min(1).max(100).required(),
  origin_description: Joi.string().max(1000).allow(''),
  superpowers: Joi.string().allow('').max(1000),
  catch_phrase: Joi.string().max(300).allow(''),
});

export const updateSuperheroSchema = Joi.object({
  nickname: Joi.string().min(1).max(100),
  real_name: Joi.string().min(1).max(100),
  origin_description: Joi.string().max(1000).allow(''),
  superpowers: Joi.string().allow('').max(1000),
  catch_phrase: Joi.string().max(300).allow(''),
  imagesToDelete: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ),
});
