import moment from 'moment';
import User from './User';

describe('User', () => {
  it('should create new user', () => {
    const id = 'morgan';
    const expiresIn = moment().add(5, 'days');
    const user = new User(id, 'sdhayuwqdg', expiresIn);
    expect(user).toHaveProperty('id', id);
    expect(user).toHaveProperty('expiresIn', expiresIn);
    expect(user.isTokenValid).toBeTruthy();
  });
  it('should should be able to determin expit=red token', () => {
    const id = 'morgan';
    const expiresIn = moment().subtract(5, 'days');
    const user = new User(id, 'sdhayuwqdg', expiresIn);
    expect(user).toHaveProperty('id', id);
    expect(user).toHaveProperty('expiresIn', expiresIn);
    expect(user.isTokenValid).toBeFalsy();
    expect(user).toHaveProperty('accessToken', null);
  });
});
