export type TaskBase = {
  id: number | string;
  title: string;
  description?: string;
  completed: boolean;
  category_id: string | number;
};

export type Task = TaskBase & {
  category?: Category;
  showCheck?: boolean | null;
};
export type CreateTask = Omit<TaskBase, 'id'>;

export type TaskFormType = {
  open?: boolean;
  onClose: () => void;
  onCreate: (task: CreateTask) => void;
  categories: Category[];
};

export type Category = {
  id: number | string;
  name: string;
  color?: string | null;
};
