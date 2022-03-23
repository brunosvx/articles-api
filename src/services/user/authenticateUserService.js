import { prismaClient } from '../../prisma/client.js';

import { ResponseError } from '../../errors/ResponseError.js';

import joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const credentialsSchema = joi.object({
    password: joi.string().required(),
    email: joi.string().trim().email().required()
})

function validateCredentials(credentials) {
    const { value, error } = credentialsSchema.validate(credentials);

    if(error) {
        throw new ResponseError(error.message, 400);
    }
 
    return value;
}

export async function authenticateUserService(credentials) {
    const validatedCredentials = validateCredentials(credentials);

    const user = await prismaClient.user.findFirst({
        where: {
            email: validatedCredentials.email
        },
        select: {
            id: true,
            createdAt: true,
            email: true,
            name: true,
            password: true,
            isAdmin: true
        }
    })

    if(!user) {
        throw new ResponseError('Incorrect credentials', 400);
    }
    
    if(!bcrypt.compareSync(validatedCredentials.password, user.password)){
        throw new ResponseError('Incorrect credentials', 400);
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        admin: user.isAdmin
    }, process.env.JWT_SECRET,{
        expiresIn: '24h'
    })

    return { ...user, password: undefined, token };
}