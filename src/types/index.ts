export interface DashboardData {
  tasks: Task[];
  weeks: Week[];
  stats: {
    timePracticed: number;
    questionsAnswered: number;
  };
  streak: number;
  lastStreakDate: string | null;
  lastTaskResetDate: string | null;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  practice_data?: PracticeData;
  advocacy_data?: AdvocacyDocuments;
  daily_tasks?: Task[];
}

export interface AdvocacyContent {
  id: string;
  title: string;
  advocateName: string;
  date: string;
  abstract: string;
  introduction: string;
  problemStatement: string;
  generalObjective: string;
  specificObjectives: string;
  significance: string;
  methodology: string;
  expectedOutcomes: string;
  conclusion: string;
  references: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdvocacyDocuments {
  [id: string]: AdvocacyContent;
}

export interface PracticeData {
  coreMessages: { id: number; text: string }[];
  customQuestions: Question[];
}

export interface PracticeState extends PracticeData {
  selectedCategory: string | null;
  selectedQuestion: Question | null;
  userAnswer: string;
}

export interface Question {
  id: number;
  text: string;
  category: string;
  sampleAnswer: string;
  timeLimit: string;
}

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
