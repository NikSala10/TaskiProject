// src/types/TasksType.ts

export type Task = {
  id: string;
  name: string;
  points: number;
  time: string;
  priority: 'Low' | 'Medium' | 'High';
};

// Para TaskItem, se pasa un solo task.
export type TaskItemProps = {
  task: Task;
};

// Para TasksList, se pasa un array de tasks.
export type TaskListProps = {
  tasks: Task[];
};
