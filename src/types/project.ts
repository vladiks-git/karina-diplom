import { ProjectStatuses } from '../consts/common';
import { ITask } from './task';
import { IUser } from './user';

export interface IProject {
    id?: number;
    name: string;
    status: ProjectStatuses;
    employerId: number;
    counterpartyId: number;
    tasks: ITask[];
    // tasksIds: number[];
}

export interface ICreatedProject {
    id: number;
    name: string;
    status: ProjectStatuses;
    employerId: number;
    counterparty: IUser;
    tasks: ITask[];
}
