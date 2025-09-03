import { Task } from "../types";
import { HiCheckCircle, HiClock } from "react-icons/hi";

interface DailyTasksProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
}

export default function DailyTasks({ tasks, toggleTask }: DailyTasksProps) {
  const tasksCompleted = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-red-100">
      <h2 className="text-xl font-semibold text-red-800 mb-4">
        Today&apos;s Tasks
      </h2>
      <p className="text-gray-600 mb-6">
        Complete your daily training to stay on track
      </p>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer ${
              task.completed
                ? "bg-red-50 border-red-200"
                : "bg-white border-gray-200 hover:border-red-300"
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <div
              className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-4 ${
                task.completed
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {task.completed && <HiCheckCircle className="text-xs" />}
            </div>
            <div className="flex-1">
              <h3
                className={`font-medium ${
                  task.completed ? "text-red-700 line-through" : "text-gray-800"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <HiClock className="mr-1" />
                <span>{task.timeEstimate} mins</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            {tasksCompleted} of {totalTasks} tasks completed
          </span>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${(tasksCompleted / totalTasks) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
