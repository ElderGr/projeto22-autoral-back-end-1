import prisma from "@/config/prisma";

async function createUser(userFirebaseId: string){
    return await prisma.user.create({
        data:{
            userFirebase_id: userFirebaseId
        }
    })
}

async function findUserByFirebaseId(userFirebaseId:string) {
    return await prisma.user.findUnique({
        where:{
            userFirebase_id: userFirebaseId
        }
    })
}

const userRepository = {
    findUserByFirebaseId,
    createUser
}

export default userRepository