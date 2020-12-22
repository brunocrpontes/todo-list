export const UserSchema = {
  name: 'User',
  primaryKey: 'email',
  properties: {
    name: 'string',
    email: {type: 'string', indexed: true},
    password: 'string',
  },
};
