import type { Task } from "../types/TasksType";

export const tasks: Task[] = [
    { id: '1', name: 'Make the beds', points: 20, time: '10:00 am', priority: 'Medium', isAdditional: false},
    { id: '2', name: 'Wash the dishes', points: 80, time: '1:00 pm', priority: 'High' },
    { id: '3', name: 'Take out the trash', points: 20, time: '9:00 am', priority: 'Medium' },
    { id: '4', name: 'Sweep the kitchen floor', points: 10, time: '12:00 am', priority: 'Low' },
    { id: '5', name: 'Wipe down countertops and tables', points: 20, time: '10:00 am', priority: 'Medium' },
    { id: '6', name: 'Vacuum or sweeptside', points: 10, time: '12:00 am', priority: 'Low' },
  ];