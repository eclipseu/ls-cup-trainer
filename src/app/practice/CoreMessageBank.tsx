import { useState, useEffect } from "react";

interface CoreMessage {
  id: number;
  text: string;
}

interface CoreMessageBankProps {
  coreMessages: CoreMessage[];
  onMessagesChange: (messages: CoreMessage[]) => void;
}

export default function CoreMessageBank({
  coreMessages,
  onMessagesChange,
}: CoreMessageBankProps) {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedMessages, setEditedMessages] = useState<CoreMessage[]>([]);

  useEffect(() => {
    setEditedMessages(coreMessages);
  }, [coreMessages]);

  const handleEditToggle = () => {
    if (isEditing) {
      onMessagesChange(editedMessages);
    }
    setIsEditing(!isEditing);
  };

  const handleMessageChange = (id: number, value: string) => {
    const newMessages = editedMessages.map((msg) =>
      msg.id === id ? { ...msg, text: value } : msg
    );
    setEditedMessages(newMessages);
  };

  const handleReset = () => {
    const defaultMessages = [
      {
        id: 1,
        text: "I am [name] a Computer Science student at De La Salle Lipa who believes in service through innovation. With this title I will launch a digital literacy program that connects students with community needs.",
      },
      {
        id: 2,
        text: "I am [name], a problem-solver and servant leader. Combining my CS skills and Lasallian values, I aim to make technology accessible and useful to our neighbors.",
      },
      {
        id: 3,
        text: "I am [name], driven by faith, service, and communion. As Mr. La Sallian Cup, I will lead projects that teach digital skills, protect online safety, and bring our community together.",
      },
    ];
    onMessagesChange(defaultMessages);
    setSelectedMessage(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-red-800">
          Core Message Bank
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
          >
            {isEditing ? "Save Changes" : "Edit Messages"}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-red-600 mb-6 text-center italic">
        Write 3 variations, memorize 1
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {editedMessages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedMessage === message.id
                ? "border-red-500 bg-red-50 shadow-md"
                : "border-red-100 bg-white hover:bg-red-50"
            }`}
            onClick={() => !isEditing && setSelectedMessage(message.id)}
          >
            <div className="flex items-start mb-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  selectedMessage === message.id ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                {selectedMessage === message.id && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`font-semibold ${
                  selectedMessage === message.id
                    ? "text-red-700"
                    : "text-gray-600"
                }`}
              >
                Variation {message.id}
              </span>
            </div>
            {isEditing ? (
              <textarea
                value={message.text}
                onChange={(e) =>
                  handleMessageChange(message.id, e.target.value)
                }
                className="w-full h-32 p-2 border border-red-200 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black bg-white"
              />
            ) : (
              <p
                className={`text-gray-800 ${
                  selectedMessage === message.id ? "font-medium" : ""
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
        ))}
      </div>

      {selectedMessage !== null && !isEditing && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Selected Message:
          </h3>
          <p className="text-red-900">
            {editedMessages.find((m) => m.id === selectedMessage)?.text}
          </p>
        </div>
      )}
    </div>
  );
}
