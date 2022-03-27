import { prismaClient } from "../../prisma/client.js";

import joi from 'joi';

import { ResponseError } from "../../errors/ResponseError.js";

const userIdSchema = joi.string().trim().required();

function validateUserId(userId) {
    const { value, error } = userIdSchema.validate(userId);
    
    if(error) {
        throw new ResponseError(error.message, 400);
    }
    
    return value;
}


export async function getUserPostsService(userId) {
    const validatedUserId = validateUserId(userId);

    const posts = await prismaClient.post.findMany({
        where: {
            authorId: validatedUserId
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            author: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    return posts;
   
}


