import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (userData : TUser) => {
// const user = new User(userData);
// await user.save();
// return user;

const user = await User.create(userData);
return user;
};


export const UserServices = {
    createUserIntoDB,
  };