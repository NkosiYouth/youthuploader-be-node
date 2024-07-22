import Joi from 'joi';
import { TaskTypeEnum } from '../types';

export const uploadFilesSchema = Joi.object({
  // files: Joi.array().items(Joi.object().required()).min(1).required().messages({
  //   'array.base': 'Files should be an array.',
  //   'array.min': 'At least one file must be uploaded.',
  //   'any.required': 'Files are required.'
  // }),
  taskType: Joi.string().valid(...Object.values(TaskTypeEnum)).required().messages({
    'any.only': `Task type must be one of ${Object.values(TaskTypeEnum).join(', ')}.`,
    'any.required': 'Task type is required.'
  })
});

export const deleteFileSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'File id is required!'
  })
});