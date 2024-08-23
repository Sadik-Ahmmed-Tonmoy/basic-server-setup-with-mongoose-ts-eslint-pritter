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

const updateUserInDB = async (objectId: string, payload: TUser) => {
  const { name, address, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdatedData[`address.${key}`] = value;
    }
  }

  // (because all are unique) Remove email, phone, and userId if they match the current user's data
  const currentUser = await User.findById(objectId);
  if (currentUser) {
    if (modifiedUpdatedData.userId === currentUser.userId) {
      delete modifiedUpdatedData.userId;
    }
    if (modifiedUpdatedData.email === currentUser.email) {
      delete modifiedUpdatedData.email;
    }
    if (modifiedUpdatedData.phone === currentUser.phone) {
      delete modifiedUpdatedData.phone;
    }
  }

  const user = await User.findByIdAndUpdate(objectId, modifiedUpdatedData, {
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
