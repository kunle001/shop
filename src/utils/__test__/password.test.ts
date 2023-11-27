// password.test.ts

import { Password } from '../password';
import bcrypt from "bcrypt"

jest.mock('bcrypt');

describe('Password class', () => {
  describe('toHash method', () => {
    it('should hash the password', async () => {
      const password = 'password123';
      const hashedPassword = 'mockedHashedPassword';

      const result = await Password.toHash(password);

      expect(result).toEqual(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
    });
  });

  describe('compare method', () => {
    it('should compare passwords and return true for a match', async () => {
      const hashedPassword = 'mockedHashedPassword';
      const suppliedPassword = 'password123';

      const result = await Password.compare(hashedPassword, suppliedPassword);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(suppliedPassword, hashedPassword);
    });

    it('should compare passwords and return false for a mismatch', async () => {
      const hashedPassword = 'mockedHashedPassword';
      const suppliedPassword = 'wrongPassword';

      const result = await Password.compare(hashedPassword, suppliedPassword);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(suppliedPassword, hashedPassword);
    });
  });
});
