
export class Assignment {
    isOffday?: boolean;
    date: string;
    dateLong?: string;
    taskCount: number;
    hourCount: number;
    tasks?: [{ title: string, hours: number }];
    assignee?: {
        name: string,
        photo: string
    }
    totalHours: number;
    click?: {
        x: number,
        y: number
    }
}
