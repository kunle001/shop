// __mocks__/bcrypt.js

export const hash = jest.fn().mockResolvedValue('mockedHashedPassword');
export const compare = jest.fn().mockImplementation((suppliedPassword, hashedPassword) => {
  return suppliedPassword === 'password123' && hashedPassword === 'mockedHashedPassword';
});
