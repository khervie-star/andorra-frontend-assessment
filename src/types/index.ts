export interface ITask {
    id: string;
    title: string;
    description: string;
    status: TTaskStatus;
    dueDate: string;
    createdAt: string;
    priority: TTaskPriority;
}


export type TTaskPriority = 'low' | 'medium' | 'high';

export type TTaskStatus = 'pending' | 'completed';