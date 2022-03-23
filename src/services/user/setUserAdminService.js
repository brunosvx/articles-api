import { prismaClient } from "../../prisma/client.js"


export async function setUserAdminService(userId) {
 
    await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            isAdmin: true
        }
    })

}