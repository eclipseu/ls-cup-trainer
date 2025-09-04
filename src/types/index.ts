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
  advocacy_data?: AdvocacyContent;
  daily_tasks?: any;
}

export interface AdvocacyContent {
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
