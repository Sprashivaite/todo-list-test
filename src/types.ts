export type Task = {
  id: number;
  title: string;
  createdAt: string;
  isComplete: boolean;
  isArchived?: boolean;
};
