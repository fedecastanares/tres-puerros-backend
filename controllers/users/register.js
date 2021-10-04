const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')
const userModel = require('../../models/user')

module.exports = (request, response) => {
    const schema = Joi.object({

        telephone: Joi.string()
            .required(),  

        email: Joi.string()
            .email()
            .required(),
    })
    const validationResult = schema.validate(request.body);

    if (!validationResult.error) {
        const passwordHash = bcrypt.hashSync(request.body.telephone, 2)

        userModel.create({
            telephone: request.body.telephone,
            email: request.body.email,
            password: passwordHash,
            role: 'ADMIN',

        }, (error, user) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo registrar el usuario',
                    error: error
                })
            } else {
                const userWithoutPassword = user.toObject()

                delete userWithoutPassword.password
                delete userWithoutPassword.email
                delete userWithoutPassword.role
                delete userWithoutPassword._id
                delete userWithoutPassword.__v
                delete userWithoutPassword.telephone

                userWithoutPassword.token = jwt.sign({
                    id: user._id,
                    role: user.role
                    }, process.env.JWT_KEY)
                
                response.json({
                    user: userWithoutPassword
                 })    
            }
        })
    } else {
        response.status(400).json({
            message: validationResult.error,
            body: request.body
        })
    }
}
