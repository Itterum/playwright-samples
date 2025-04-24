import {test, expect} from '../support/fixtures/api.fixture';
import {UserResponseDTO, UserRequestDTO} from '../support/dto/api.dto';

test.describe('User', () => {
  test('CRUD user', async ({baseApi}) => {
    await test.step('POST /user', async () => {
      const user: UserRequestDTO = {};
    });
  });
});