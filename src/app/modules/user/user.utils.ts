import { User } from './user.model';

export async function generateUserId(firstName: string, phoneNumber: string): Promise<string> {
  const lastThreeDigits = phoneNumber.slice(-3);
  let generatedUserId = `${firstName.toLowerCase()}-${lastThreeDigits}`;

  // Check if the generated user ID already exists
  const findExistingUserId = async (userId: string): Promise<string | undefined> => {
    const checkUserExist = await User.findOne(
      {
        // role: 'user',
        userId: userId,
      },
      {
        userId: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();

    return checkUserExist?.userId ? checkUserExist?.userId  : undefined;
  };

  let existingUser = await findExistingUserId(generatedUserId);
  while (existingUser) {
    // Append a random number to the user ID to make it unique
    const randomNumber = Math.floor(Math.random() * 1000);
    generatedUserId = `${firstName.toLowerCase()}-${randomNumber.toString().padStart(3, '0')}`;
    existingUser = await findExistingUserId(generatedUserId);
  }

  return generatedUserId;
}



