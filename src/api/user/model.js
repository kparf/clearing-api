import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { env } from '../../config';

const roles = ['client', 'provider', 'admin'];

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  },
  provider: {
    type: String
  },
  verificationKey: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1');
  }

  return email;
});

/*userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next();
  }).catch(next);
}); */

userSchema.methods = {
  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false);
  }
};

userSchema.statics = {
  roles
};

const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model;
