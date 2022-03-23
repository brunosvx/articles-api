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

export async function isPostOwnerService({ userId, postId }) {
    const validatedPostId = validatePostId(postId);

    const post = await prismaClient.post.findFirst({
        where: {
            id: validatedPostId,
            authorId: userId
        },
        select:{
            id: true
        }
    })

    if(!post) {
        return false;
    }

    return true;
   
}