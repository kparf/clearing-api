import { sendProviderConfirmRegistrationEmail } from '../email';
import { Provider } from '../../api/provider';
import { User } from '../../api/user';
import { registerUser } from '../user';
import uniqid from 'uniqid';

export async function register (req) {
  const verificationKey = uniqid();
  console.log('req: ' + req.password);

  const savedUser = await registerUser({
    name: req.name,
    email: req.email,
    password: req.password,
    role: 'provider',
    verificationKey
  });

  const savedProvider = await Provider.create({
    address: req.address,
    description: req.description,
    rating: req.rating,
    services: req.services
  });

  savedUser.provider = savedProvider.id;
  await savedUser.save();
  savedProvider.user = savedUser.id;
  await savedProvider.save();

  const response = await sendProviderConfirmRegistrationEmail(savedUser);
  return savedUser;
}

export async function verifyProvider (verificationKey) {
  const user = await User.findOne({verificationKey}).exec();
  if (user) {
    await user.update({$unset: {verificationKey: ''}, active: true}).exec();
    return user;
  }
  return Promise.reject(new Error('Verification key not found'));
}
