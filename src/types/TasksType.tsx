export interface Task {
  id: string;
  title: string;
  groupId: string;
  assigneeId?: string | null;
  assigneeName?: string | null;
  priority: "low" | "medium" | "high";
  points: number;
  creatorId: string;   
  isAdditional?: boolean;
  schedule?: string;
  status: "pending" | "completed" | "additional";
}


export type TaskItemProps = {
  task: Task;
  setActiveTab?: (tab: string) => void;
  showEditDelete?: boolean; 
};

export type TaskListProps = {
  tasks: Task[];
  setActiveTab?: (tab: string) => void;
  showEditDelete?: boolean; 
};
