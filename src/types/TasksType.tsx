export interface Task {
  id: string;
  title: string;
  groupId: string;
  assigneeId?: string | null;
  assigneeName?: string | null;
  priority: "low" | "medium" | "high";
  points: number;
  isAdditional?: boolean;
  schedule?: string;
  status: "pending" | "completed" | "additional";
}


export type TaskItemProps = {
  task: Task;
  setActiveTab?: (tab: string) => void;
};

export type TaskListProps = {
  tasks: Task[];
  setActiveTab?: (tab: string) => void;

};
