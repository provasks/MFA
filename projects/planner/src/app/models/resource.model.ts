import { Task } from './task.model';
import { Assignment } from './assignment.model';

export class Resource {
    id: string
    displayName: string;

    email?: string;
    lateTasks?: number;
    notStartedTasks?: number;
    pendingTasks?: number;
    completedTasks?: number;
    photo?: string;
    tasks?: Task[];
    dayWiseTasks?: [Assignment]
}
