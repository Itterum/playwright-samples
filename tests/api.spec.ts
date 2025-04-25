import {test, expect} from '../support/fixtures/api.fixture';
import {UserRequestDTO, UserResponseDTO} from '../support/dto/api.dto';

test.describe('User', () => {
  test('CRUD user', async ({userApi}) => {
    await test.step('POST /user', async () => {
      const user: UserRequestDTO['PostUser'] = {
        id: 10,
        username: 'theUser',
        firstName: 'John',
        lastName: 'James',
        email: 'john@email.com',
        password: '12345',
        phone: '12345',
        userStatus: 1,
      };

      const response = await userApi.createUser(user);
      const responseJson: UserResponseDTO['PostUser'] = await response.json();

      expect(response.status()).toBe(200);
      // expect(response.id).toEqual(user.id);
      expect(responseJson.username).toEqual(user.username);
      expect(responseJson.firstName).toEqual(user.firstName);
      expect(responseJson.userStatus).toEqual(1);
    });
  });
});