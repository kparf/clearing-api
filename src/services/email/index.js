import { sendGridKey, confirmationUrl } from '../../config';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(sendGridKey);

export function sendProviderConfirmRegistrationEmail ({ email, verificationKey }) {
  console.log('verificationKey: ' + verificationKey);
  const msg = {
    to: email,
    from: 'kiryl.parfiankou.dev@gmail.com',
    subject: 'Welcome to SendGrid! Confirm Your Email',
    html: `Confirmation link: <a href="${confirmationUrl}/${verificationKey}">here</a>`
  };
  return sgMail.send(msg);
}
