import { Roles } from '../consts/common';

export interface IUser {
    id: number;
    email: string;
    password: string;
    username: string;
    phone: string;
    role: Roles;
}
