import {paths} from '../types/api';

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

export interface StoreResponseDTO {
	GetStoreInventory: paths['/store/inventory']['get']['responses'][200]['content']['application/json'];
	PostStoreOrder: paths['/store/order']['post']['responses'][200]['content']['application/json'];
	GetStoreOrderById: paths['/store/order/{orderId}']['get']['responses'][200]['content']['application/json'];
	DeleteStoreOrder: paths['/store/order/{orderId}']['delete']['responses'][200]['content'];
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