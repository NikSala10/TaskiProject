import type { Task } from "../types/TasksType";

export const tasks: Task[] = [
    { id: '1', name: 'Make the beds', points: 20, time: '10:00 am', priority: 'Medium', isAdditional: false},
    { id: '2', name: 'Wash the dishes', points: 80, time: '1:00 pm', priority: 'High', isAdditional: false },
    { id: '3', name: 'Take out the trash', points: 20, time: '9:00 am', priority: 'Medium', isAdditional: false },
    { id: '4', name: 'Sweep the kitchen floor', points: 10, time: '12:00 am', priority: 'Low', isAdditional: false },
    { id: '5', name: 'Wipe down countertops and tables', points: 20, time: '10:00 am', priority: 'Medium', isAdditional: false },
    { id: '6', name: 'Vacuum or sweeptside', points: 10, time: '12:00 am', priority: 'Low', isAdditional: false },
    { id: '7', name: 'Organize pantry and closets', points: 20, time: '10:00 am', priority: 'Low', isAdditional: true },
    { id: '8', name: 'Vacuum or sweeptside', points: 10, time: '12:00 am', priority: 'Low', isAdditional: true },
    { id: '9', name: 'Clean windows from the outside', points: 20, time: '11:00 am', priority: 'Low', isAdditional: true },
  ];