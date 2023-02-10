export interface User{
    id: string;
    email: string;
    firstName: string;
    birth_date: Date;
    role:string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    password: string
}