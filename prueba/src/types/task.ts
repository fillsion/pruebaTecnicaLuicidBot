export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: TaskPriority;
};

export type TasksDb = {
  tasks: Task[];
};
