const
    Joi = require( 'joi' );

const schema = {
    mainSchema : Joi.object({
                'content-length': Joi.number().integer().positive().greater(5),
                'origin': Joi.string().regex(/^[a-zA-Z0-9]/)
                 }).unknown(),
    contentSchema : Joi.object({
                'content-type': Joi.string().valid('application/x-www-form-urlencoded').required()
                 })
    };

module.exports = schema;