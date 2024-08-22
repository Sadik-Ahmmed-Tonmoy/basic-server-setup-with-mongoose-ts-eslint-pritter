import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (userData : TUser) => {
// const user = new User(userData);
// await user.save();
// return user;

const user = await User.create(userData);

const finalUserData = await User.findOne(
  { _id: user._id },
  {
    password: 0,
    'name._id': 0,
    'address._id': 0,
    __v: 0,
  },
);
return finalUserData;
};

const getSingleUserByObjectIdFromDB = async (objectId: string) => {
  const user = await User.findById({_id: objectId} , {
    password: 0,
    'name._id': 0,
    'address._id': 0,
    __v: 0,
  },);
  return user;
};


const getSingleUserByGeneratedUserIdFromDB = async (userId: string) => {
  const user = await User.findOne( { userId: userId });
  return user;
};


export const UserServices = {
    createUserIntoDB,
    getSingleUserByObjectIdFromDB,
    getSingleUserByGeneratedUserIdFromDB,
  };