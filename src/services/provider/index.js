import { sendProviderConfirmRegistrationEmail } from '../email';
import { Provider } from '../../api/provider';
import uniqid from 'uniqid';

export async function register (provider) {
  const verificationKey = uniqid();
  const savedProvider = await Provider.create({
    ...provider,
    verificationKey
  });
  const response = await sendProviderConfirmRegistrationEmail(savedProvider);
  return savedProvider;
}

export async function verifyProvider (verificationKey) {
  const provider = await Provider.findOne({verificationKey}).exec();
  if (provider) {
    await provider.update({$unset: {verificationKey: ''}, active: true}).exec();
    return provider;
  }
  return Promise.reject(new Error('Verification key not found'));
}
