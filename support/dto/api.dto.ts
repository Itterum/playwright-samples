import {paths} from '../types/api';

// Pet
export interface PetRequestDTO {
	PostPet: paths['/pet']['post']['requestBody']['content']['application/json'];
	PutPet: paths['/pet']['put']['requestBody']['content']['application/json'];
	GetPetByStatus: paths['/pet/findByStatus']['get']['parameters'];
	GetPetByTags: paths['/pet/findByTags']['get']['parameters'];
	PostPetById: paths['/pet/{petId}']['post']['requestBody']['content']['application/json'];
	GetPetById: paths['/pet/{petId}']['get']['parameters'];
	DeletePet: paths['/pet/{petId}']['delete']['parameters'];
	PostImagePet: paths['/pet/{petId}/uploadImage']['post']['requestBody']['content']['application/octet-stream'];
}

export interface PetResponseDTO {
	PostPet: paths['/pet']['post']['responses'][200]['content']['application/json'];
	PutPet: paths['/pet']['put']['responses'][200]['content']['application/json'];
	GetPetByStatus: paths['/pet/findByStatus']['get']['responses']['200']['content']['application/json'];
	GetPetByTags: paths['/pet/findByTags']['get']['responses']['200']['content']['application/json'];
	PostPetById: paths['/pet/{petId}']['post']['responses'][200]['content']['application/json'];
	GetPetById: paths['/pet/{petId}']['get']['responses'][200]['content']['application/json'];
	DeletePet: paths['/pet/{petId}']['delete']['responses'][200]['content'];
	PostImagePet: paths['/pet/{petId}/uploadImage']['post']['responses'][200]['content']['application/json'];
}

// Store
export interface StoreRequestDTO {
	GetInventory: paths['/store/inventory']['get']['parameters'];
	PostOrder: paths['/store/order']['post']['requestBody']['content']['application/json'];
	GetOrderById: paths['/store/order/{orderId}']['get']['parameters'];
	DeleteOrder: paths['/store/order/{orderId}']['delete']['parameters'];
}

export interface StoreResponseDTO {
	GetStoreInventory: paths['/store/inventory']['get']['responses'][200]['content']['application/json'];
	PostStoreOrder: paths['/store/order']['post']['responses'][200]['content']['application/json'];
	GetStoreOrderById: paths['/store/order/{orderId}']['get']['responses'][200]['content']['application/json'];
	DeleteStoreOrder: paths['/store/order/{orderId}']['delete']['responses'][200]['content'];
}

// User
export interface UserRequestDTO {
	PostUser: paths['/user']['post']['requestBody']['content']['application/json'];
	PostUserList: paths['/user/createWithList']['post']['requestBody']['content']['application/json'];
	GetLogin: paths['/user/login']['get']['parameters'];
	GetLogout: paths['/user/logout']['get']['parameters'];
	GetUserByName: paths['/user/{username}']['get']['parameters'];
	PutUser: paths['/user/{username}']['put']['requestBody']['content']['application/json'];
	DeleteUser: paths['/user/{username}']['delete']['parameters'];
}

export interface UserResponseDTO {
	PostUser: paths['/user']['post']['responses'][200]['content']['application/json'];
	PostUserList: paths['/user/createWithList']['post']['responses'][200]['content']['application/json'];
	GetLogin: paths['/user/login']['get']['responses'][200]['content']['application/json'];
	GetLogout: paths['/user/logout']['get']['responses'][200]['content'];
	GetUserByName: paths['/user/{username}']['get']['responses'][200]['content']['application/json'];
	PutUser: paths['/user/{username}']['put']['responses'][200]['content'];
	DeleteUser: paths['/user/{username}']['delete']['responses'][200]['content'];
}
