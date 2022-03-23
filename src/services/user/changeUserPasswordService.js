import joi from 'joi';
import bcrypt from 'bcrypt';

import { ResponseError } from '../../errors/ResponseError.js';

import { prismaClient } from '../../prisma/client.js';

const passwordsSchema = joi.object({
    oldPassword: joi.string().trim().required(),
    newPassword: joi.string().trim().min(6).required()
});

function validatePasswords(passwords) {
    const { error } = passwordsSchema.validate(passwords);
 
    if(error) {
        throw new ResponseError(error.message, 400);
    }
  
 }

export async function changeUserPasswordService({ oldPassword, newPassword, userId }) {
    validatePasswords({ oldPassword, newPassword });

    const user = await prismaClient.user.findFirst({
        where: {
            id: userId
        },
        select: {
            password: true
        }
    })

    if(!bcrypt.compareSync(oldPassword, user.password)){
        throw new ResponseError('Incorrect password', 400);     
    }

    await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            password: bcrypt.hashSync(newPassword, 10)
        }
    })
 
}