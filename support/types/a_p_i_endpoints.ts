import { components } from './components';

export interface Paths {
    Pet: {
        PostPet: components['schemas']['Pet'];
        PutPet: components['schemas']['Pet'];
        GetPetByStatus: never;
        GetPetByTags: never;
        PostPetById: components['schemas']['Pet'];
        GetPetById: never;
        DeletePet: never;
        PostImagePet: never;
    };
    Store: {
        GetInventory: never;
        PostOrder: components['schemas']['Order'];
        GetOrderById: never;
        DeleteOrder: never;
    };
    User: {
        PostUser: components['schemas']['User'];
        PostUserList: components['schemas']['UserArray'];
        GetLogin: never;
        GetLogout: never;
        GetUserByName: never;
        PutUser: components['schemas']['User'];
        DeleteUser: never;
    };
}