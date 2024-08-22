import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  // const user = new User(userData);
  // await user.save();
  // return user;

  const user = await User.create(userData);

  const resultUserData = await User.findOne(
    { _id: user._id },
    {
      password: 0,
      'name._id': 0,
      'address._id': 0,
      __v: 0,
    },
  );
  return resultUserData;
};

const getSingleUserByObjectIdFromDB = async (objectId: string) => {
  const user = await User.findById(
    { _id: objectId },
    {
      password: 0,
      'name._id': 0,
      'address._id': 0,
      __v: 0,
    },
  );
  return user;
};

const getSingleUserByGeneratedUserIdFromDB = async (userId: string) => {
  const user = await User.findOne(
    { userId: userId },
    {
      password: 0,
      'name._id': 0,
      'address._id': 0,
      __v: 0,
    },
  );
  return user;
};

const getAllUsersFromDB = async () => {
  const users = await User.find(
    {},
    { password: 0, 'name._id': 0, 'address._id': 0, __v: 0 },
  );
  return users;
};

const updateUserInDB = async (objectId: string, updatedData: TUser) => {
  const user = await User.findByIdAndUpdate(objectId, updatedData, {
    new: true,
    runValidators: true,
    fields: { password: 0, 'name._id': 0, 'address._id': 0, __v: 0 },
  });
  return user;
};

const deleteUserFromDB = async (objectId: string) => {
  const user = await User.findByIdAndUpdate(
    objectId,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return user;
};

export const UserServices = {
  createUserIntoDB,
  getSingleUserByObjectIdFromDB,
  getSingleUserByGeneratedUserIdFromDB,
  getAllUsersFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
