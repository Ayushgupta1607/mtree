import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};

// to encrypt Password
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// to compare user entered password with stored encrypted password
export const comparePassword = async (currentPassword, databasePassword) => {
  const isMatch = await bcrypt.compare(currentPassword, databasePassword);
  if (!isMatch) {
    return false;
  }
  return true;
};

// to generate jwt token
export const generateToken = async (data) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });
  return token;
};
