import joi from 'joi';

import { ResponseError } from '../../errors/ResponseError.js';

import { prismaClient } from '../../prisma/client.js';

const postSchema = joi.object({
    title: joi.string().trim().min(1).max(200).required(),
    content: joi.string().trim().min(200).max(100000).required()
});


function validatePost(post) {
   const { value, error } = postSchema.validate(post, {
       allowUnknown: true,
       stripUnknown: true
   });

   if(error) {
        throw new ResponseError(error.message, 400);
    }

   return value;

}

export async function createPostService(post) {
    const validatedPost = validatePost(post);

    const createdPost = await prismaClient.post.create({
        data: {
            ...validatedPost,
            authorId: post.authorId,
            
        },
        select: {
            id: true,
            createdAt: true,
            title: true
        }
    })


    return createdPost;

}