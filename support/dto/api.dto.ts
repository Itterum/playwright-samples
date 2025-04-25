import {paths} from '../types/api';

type JsonContent<T> = T extends { content: { 'application/json': infer R } } ? R : undefined;

type ApiRequestType<Path extends keyof paths, Method extends keyof paths[Path]> =
  JsonContent<paths[Path][Method] extends { requestBody?: any } ? paths[Path][Method]['requestBody'] : never>;

type ApiResponseType<Path extends keyof paths, Method extends keyof paths[Path]> =
  JsonContent<paths[Path][Method] extends { responses: any }
    ? paths[Path][Method]['responses'][200]
    : never>;

type PetRequestDTO = {
  PostPet: ApiRequestType<'/pet', 'post'>;
  PutPet: ApiRequestType<'/pet', 'put'>;
  PostPetById: ApiRequestType<'/pet/{petId}', 'post'>;
  GetPetByStatus: ApiRequestType<'/pet/findByStatus', 'get'>;
  GetPetByTags: ApiRequestType<'/pet/findByTags', 'get'>;
  GetPetById: ApiRequestType<'/pet/{petId}', 'get'>;
  DeletePet: ApiRequestType<'/pet/{petId}', 'delete'>;
  PostImagePet: ApiRequestType<'/pet/{petId}/uploadImage', 'post'>;
};

type PetResponseDTO = {
  PostPet: ApiResponseType<'/pet', 'post'>;
  PutPet: ApiResponseType<'/pet', 'put'>;
  GetPetByStatus: ApiResponseType<'/pet/findByStatus', 'get'>;
  GetPetByTags: ApiResponseType<'/pet/findByTags', 'get'>;
  PostPetById: ApiResponseType<'/pet/{petId}', 'post'>;
  GetPetById: ApiResponseType<'/pet/{petId}', 'get'>;
  DeletePet: ApiResponseType<'/pet/{petId}', 'delete'>;
  PostImagePet: ApiResponseType<'/pet/{petId}/uploadImage', 'post'>;
};

type StoreRequestDTO = {
  GetInventory: ApiRequestType<'/store/inventory', 'get'>;
  PostOrder: ApiRequestType<'/store/order', 'post'>;
  GetOrderById: ApiRequestType<'/store/order/{orderId}', 'get'>;
  DeleteOrder: ApiRequestType<'/store/order/{orderId}', 'delete'>;
};

type StoreResponseDTO = {
  GetStoreInventory: ApiResponseType<'/store/inventory', 'get'>;
  PostStoreOrder: ApiResponseType<'/store/order', 'post'>;
  GetStoreOrderById: ApiResponseType<'/store/order/{orderId}', 'get'>;
  DeleteStoreOrder: ApiResponseType<'/store/order/{orderId}', 'delete'>;
};

export type UserRequestDTO = {
  PostUser: ApiRequestType<'/user', 'post'>;
  PostUserList: ApiRequestType<'/user/createWithList', 'post'>;
  GetLogin: ApiRequestType<'/user/login', 'get'>;
  GetLogout: ApiRequestType<'/user/logout', 'get'>;
  GetUserByName: ApiRequestType<'/user/{username}', 'get'>;
  PutUser: ApiRequestType<'/user/{username}', 'put'>;
  DeleteUser: ApiRequestType<'/user/{username}', 'delete'>;
};

export type UserResponseDTO = {
  PostUser: ApiResponseType<'/user', 'post'>;
  PostUserList: ApiResponseType<'/user/createWithList', 'post'>;
  GetLogin: ApiResponseType<'/user/login', 'get'>;
  GetLogout: ApiResponseType<'/user/logout', 'get'>;
  GetUserByName: ApiResponseType<'/user/{username}', 'get'>;
  PutUser: ApiResponseType<'/user/{username}', 'put'>;
  DeleteUser: ApiResponseType<'/user/{username}', 'delete'>;
};
