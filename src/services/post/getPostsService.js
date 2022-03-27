import { prismaClient } from "../../prisma/client.js";

import joi from 'joi';

import { ResponseError } from "../../errors/ResponseError.js";

const filtersSchema = joi.object({
    search: joi.string(),
    orderBy: joi.string().valid('createdAt', 'updatedAt').failover('updatedAt').default('updatedAt'),
    order: joi.string().valid('asc', 'desc').failover('desc').default('desc'),
    limit: joi.number().integer().min(1).max(50).default(10)
})

function validateFilters(filters) {
    const { value, error } = filtersSchema.validate(filters);
    
    if(error) {
        throw new ResponseError(error.message, 400);
    }
    
    return value;
}


export async function getPostsService(filters) {
    const validatedFilters = validateFilters(filters);

    const posts = await prismaClient.post.findMany({
        where: {
            title: {
                contains: validatedFilters.search
            }
        },
        orderBy: { [validatedFilters.orderBy]: validatedFilters.order },
        take: validatedFilters.limit,
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