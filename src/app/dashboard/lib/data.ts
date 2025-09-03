import { Task, Week } from "../types";

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Practice Q&A Session + Answer 3 Questions",
    completed: false,
    timeEstimate: 30,
  },
  {
    id: 2,
    title: "Breathing Exercises + Answer 3 Questions",
    completed: false,
    timeEstimate: 10,
  },
  {
    id: 3,
    title: "Speech Drills + Answer 3 Questions",
    completed: false,
    timeEstimate: 15,
  },
  {
    id: 4,
    title: "Review Advocacy Plan + Answer 3 Questions",
    completed: false,
    timeEstimate: 20,
  },
  {
    id: 5,
    title: "Watch Expert Q&A Videos + Answer 3 Questions",
    completed: false,
    timeEstimate: 25,
  },
];

export const initialWeeks: Week[] = [
  {
    number: 1,
    title: "Foundation Building",
    completed: false,
    current: true,
  },
  {
    number: 2,
    title: "Core Skills Development",
    completed: false,
    current: false,
  },
  {
    number: 3,
    title: "Advanced Techniques",
    completed: false,
    current: false,
  },
  {
    number: 4,
    title: "Mock Practice Sessions",
    completed: false,
    current: false,
  },
  {
    number: 5,
    title: "Refinement & Polish",
    completed: false,
    current: false,
  },
  { number: 6, title: "Final Preparation", completed: false, current: false },
];
