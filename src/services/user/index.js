import bcrypt from 'bcrypt';
import { User } from '../../api/user';

const ROUNDS = 9;

export async function registerUser (user) {
  const password = user.password;
  const hash = await bcrypt.hash(password, ROUNDS);

  user.password = hash;

  return User.create({
    ...user,
    password: hash
  });
}
