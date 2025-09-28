export type Task = {
  id: string;
  name: string;
  points: number;
  time: string;
  priority: 'Low' | 'Medium' | 'High';
};

export type TaskItemProps = {
  task: Task;
};

export type TaskListProps = {
  tasks: Task[];
};
