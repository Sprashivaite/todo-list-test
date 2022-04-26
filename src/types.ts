export type Task = {
  id: number;
  title: string;
  createdAt: string;
  isComplete: boolean;
  isArchived?: boolean;
};

export enum SortingType {
  Asc = "Asc",
  Desc = "Desc",
}
