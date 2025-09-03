export interface Task {
  id: number;
  title: string;
  completed: boolean;
  timeEstimate: number;
}

export interface Week {
  number: number;
  title: string;
  completed: boolean;
  current: boolean;
}
