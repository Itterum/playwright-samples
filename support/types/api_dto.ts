import { Paths } from './paths';

export interface PetRequestDTO {
    PostPet: Paths['Pet']['PostPet'];
    PutPet: Paths['Pet']['PutPet'];
    GetPetByStatus: never;
    GetPetByTags: never;
    PostPetById: Paths['Pet']['PostPetById'];
    GetPetById: never;
    DeletePet: never;
    PostImagePet: never;
}

export interface PetResponseDTO {
    PostPet: Paths['Pet']['PostPet'];
    PutPet: Paths['Pet']['PutPet'];
    GetPetByStatus: paths['/pet/findByStatus']['get']['responses']['200']['content']['application/json'];
    GetPetByTags: paths['/pet/findByTags']['get']['responses']['200']['content']['application/json'];
    PostPetById: Paths['Pet']['PostPetById'];
    GetPetById: paths['/pet/{petId}']['get']['responses'][200]['content']['application/json'];
    DeletePet: paths['/pet/{petId}']['delete']['responses'][200]['content'];
    PostImagePet: paths['/pet/{petId}/uploadImage']['post']['responses'][200]['content']['application/json'];
}