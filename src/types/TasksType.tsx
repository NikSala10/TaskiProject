export type Task = {
  id: string;
  name: string;
  points: number;
  time: string;
  priority: 'Low' | 'Medium' | 'High';
  isAdditional: boolean;
};

export type TaskItemProps = {
  task: Task;
};

export type TaskListProps = {
  tasks: Task[];
};
