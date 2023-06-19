import userRepository from "@/repositories/users.repository";

async function createUser(userFirebaseId:string) {
    const new_user = await userRepository.createUser(userFirebaseId);
    return new_user
}

const userService = {
    createUser
}

export default userService  