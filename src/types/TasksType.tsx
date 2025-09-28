export type Task = {
  id: string;
  name: string;
  points: number;
  time: string;
  priority: 'Low' | 'Medium' | 'High';
}

export type TaskProps = {
  task: Task;
}