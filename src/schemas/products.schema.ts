import Joi from "joi";

export const new_product_schema = Joi.object({
    name: Joi.string().min(3).required(),
    quantity: Joi.number().integer().greater(0).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().greater(0).required(),
    main_image: Joi.string().uri().required(),
    category: Joi.string().required()
})