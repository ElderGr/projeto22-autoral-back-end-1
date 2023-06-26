import { conflictError } from "@/errors/conflictError";
import { notFoundError } from "@/errors/notFoundError";
import userRepository from "@/repositories/users.repository";

async function createUser(userFirebaseId: string) {
  const userExists = await userRepository.findUserByFirebaseId(userFirebaseId);
  console.log(userExists);
  
  if (userExists) throw conflictError();
  const new_user = await userRepository.createUser(userFirebaseId);
  return new_user;
}

async function findUserByFirebaseId(userFirebase_id: string) {
  const user = await userRepository.findUserByFirebaseId(userFirebase_id);
  if (!user) return null;
  return user;
}

const userService = {
  createUser,
  findUserByFirebaseId
};

export default userService;
