import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import * as DB from './db';

export { jwt };

export const JWT_SECRET = 'replaceme';

export interface Context {
  request: any;
  extid?: string;
  getUser: () => Promise<DB.UserInstance | null>;
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export function genRandomCode() {
  return parseInt(crypto.randomBytes(4).toString('hex'), 16)
    .toString()
    .slice(0, 6);
}

export function createAuth(opts: any = {}) {
  if (!opts || !opts.extid) throw new Error('Invalid');
  return jwt.sign(opts, JWT_SECRET, {
    expiresIn: '365d',
  });
}
