export interface ITask {
    id?: number;
    name: string;
    description: string;
    endDate: string;
    isDone: boolean;
    projectId: number;
}
