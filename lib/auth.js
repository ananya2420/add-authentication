import { hash, compare } from 'bcrypt'; // ✅ Correct import

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12); // ✅ await is required
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword); // ✅ await is required
  return isValid;
}
