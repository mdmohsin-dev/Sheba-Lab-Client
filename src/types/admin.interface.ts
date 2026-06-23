export interface IAdmin {
    id?: string;
    email: string;
    name: string;
    profilePhoto?: string | null;
    contactNumber: string;
    isdeleted: boolean;
    createdAt: string;
    updatedAt: string;
}