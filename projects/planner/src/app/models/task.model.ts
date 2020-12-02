import { Assignee } from './assignee.model';

export class Task {
    id?: string;
    title: string;
    description?: string;
    bucket?: string
    bucketId?: string;
    startDate?: string;
    startMoment?: moment.Moment;
    dueDate?: string;
    dueMoment?: moment.Moment;
    assignees?: Assignee[];
    status?: string;
    progressValue?: number;
    comments?: string[];
    checklist?: string[];
    percentComplete?: number;
    subTasks?: Task[];
    hierarchy?: string; //normal, parent, child
    relation?: string;
    parentTaskId?: string;
    expanded?: boolean;
    startDateTime?: string;
    dueDateTime?: string;
    days?: number;
    hours?: number;
    totalHours?: number;
}
