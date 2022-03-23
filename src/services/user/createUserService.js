import joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import { prismaClient } from '../../prisma/client.js';

const userSchema = joi.object({
    name: joi.string().trim().min(1).max(30).required(),
    password: joi.string().trim().min(6).required(),
    email: joi.string().trim().email().required()
});


function validateUser(user) {
   const { value, error } = userSchema.validate(user);

   if(error) {
       throw {
           errorMessage: error.message,
           statusCode: 400
       }
   }

   return value;

}

export async function createUserService(user) {
    const validatedUser = validateUser(user);

    try{
        const createdUser = await prismaClient.user.create({
            data: {
                ...validatedUser,
                password: bcrypt.hashSync(user.password, 10)
            },
            select: {
                id: true,
                createdAt: true,
                email: true,
                name: true
            }
        })

        const token = jwt.sign({
            id: createdUser.id,
            email: createdUser.email
        }, process.env.JWT_SECRET,{
            expiresIn: '24h'
        })
    
        return { ...createdUser, token };
        
    }catch(error) {
        if(error.code === 'P2002'){
            throw {
                errorMessage: 'Email already exists',
                statusCode: 409
            }
        }

        throw {
            errorMessage: 'Error during create user',
            statusCode: 500
        }
    }  
}