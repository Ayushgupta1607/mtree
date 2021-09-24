import Joi from "joi";

export const registerDataSchema = Joi.object({
  first_name: Joi.string().trim().min(1).required(),
  last_name: Joi.string().trim().min(1).required(),
  username: Joi.string().trim().min(1).required(),
  password: Joi.string().min(8).required(),
});

export const loginDataSchema = Joi.object({
  username: Joi.string().trim().min(1).required(),
  password: Joi.string().min(8).required(),
});

export const createTranactionSchema = Joi.object({
  amount: Joi.number().greater(0).required(),
  party_name: Joi.string().trim().min(1).required(),
});
