const
    Joi = require( 'joi' );


const schema =
    Joi.object({
        'user': Joi.string().alphanum().max(20).min(2).valid('test').required(),
        'secret': Joi.string().alphanum().max(20).min(2).valid('123').required()
    });


module.exports = schema;