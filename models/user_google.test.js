process.env.ENVIRONMENT = 'test';
const User = require('./user');
const UserGoogle = require('./user_google');

describe('user_google model', () => {
    beforeAll(async () => {
        const { pool } = require('../db/db')
        pool.query(
            'DELETE FROM user_google;'
        )
        pool.query(
            'DELETE FROM users;'
        )
    });

    afterEach(async () => {
        const { pool } = require('../db/db')
        pool.query(
            'DELETE FROM user_google;'
        )
        pool.query(
            'DELETE FROM users;'
        )
    })

    afterAll(async () => {
        const { pool } = require('../db/db')
        await pool.end();
    })


    test('createUser creates and returns a new UserGoogle', async () => {
        // Create a user
        const user = await User.createUser('testuser1@gmail.com', '1234', 'test', 'user1')

        const userGoogle = await UserGoogle.createUser(user.id, '123415151')
        expect(userGoogle.userId).toEqual(user.id)
        expect(userGoogle.refreshToken).toEqual('123415151')
    });

    test('getUserByEmail returns user', async () => {
        const user = await User.createUser('testuser1@gmail.com', '1234', 'test', 'user1')
        const userGoogle = await UserGoogle.createUser(user.id, '123141251')

        let resultUser = await UserGoogle.getUserByEmail(user.email);

        expect(resultUser).toEqual(userGoogle)
    });

    test('updateRefreshToken updates the refresh token', async () => {
        const user = await User.createUser('testuser1@gmail.com', '1234', 'test', 'user1')
        const userGoogle = await UserGoogle.createUser(user.id, '00000001')

        await userGoogle.updateRefreshToken('00000002')
        expect(userGoogle.refreshToken).toEqual('00000002')

        let resultUser = await UserGoogle.getUserByEmail(user.email);
        expect(resultUser.refreshToken).toEqual('00000002')
    });
});
