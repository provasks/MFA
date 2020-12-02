import { Accessor } from './accessor.model';

export class Dependency {
    id: number;
    taskId: string;         //successor id      
    parentTaskId: string;   //predecessor id
    dependencyType: string; //Start-Start / Start-Finish / Finish-Start / Finish-Finish
    typeId: number;
    drawingInfo?: {
        predecessor: Accessor, successor: Accessor
    };
    correction?: number;
    higherAccessor?: string;
    leftAccessor?: string;
    predecessorIndex?:number;
    successorIndex?:number; 
}
