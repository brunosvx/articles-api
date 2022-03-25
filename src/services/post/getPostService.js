import { prismaClient } from "../../prisma/client.js";

import joi from 'joi';

import { ResponseError } from "../../errors/ResponseError.js";

const postIdSchema = joi.string().trim().required();

function validatePostId(postId) {
   const { value, error } = postIdSchema.validate(postId);

   if(error) {
        throw new ResponseError(error.message, 400);
    }

   return value;

}

export async function getPostService(postId) {
    const validatedPostId = validatePostId(postId);

    const post = await prismaClient.post.findFirst({
        where: {
            id: validatedPostId
        },
        select:{
            id: true,
            title: true,
            content: true,
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

    if(!post) {
        throw new ResponseError('This post does not exist', 404);
    }

    return post;
   
}