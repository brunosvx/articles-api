import { prismaClient } from '../../prisma/client.js';

export async function deletePostService(postId) {

    await prismaClient.post.delete({
        where: {
            id: postId
        }
    })

}