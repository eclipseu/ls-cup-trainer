import { useState } from "react";

interface CoreMessageBankProps {
  userName: string;
}

export default function CoreMessageBank({ userName }: CoreMessageBankProps) {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedMessages, setEditedMessages] = useState<string[]>([]);

  // Initial messages with userName placeholder replaced
  const initialMessages = [
    `I am ${userName}, a Computer Science student at De La Salle Lipa who believes in service through innovation. With this title I will launch a digital literacy program that connects students with community needs.`,
    `I am ${userName}, a problem-solver and servant leader. Combining my CS skills and Lasallian values, I aim to make technology accessible and useful to our neighbors.`,
    `I am ${userName}, driven by faith, service, and communion. As Mr. La Sallian Cup, I will lead projects that teach digital skills, protect online safety, and bring our community together.`,
  ];

  const [messages, setMessages] = useState<string[]>(initialMessages);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes when turning off edit mode
      setMessages(editedMessages.length > 0 ? editedMessages : messages);
    } else {
      // Initialize edited messages when entering edit mode
      setEditedMessages(messages);
    }
    setIsEditing(!isEditing);
  };

  const handleMessageChange = (index: number, value: string) => {
    const newMessages = [...editedMessages];
    newMessages[index] = value;
    setEditedMessages(newMessages);
  };

  const handleReset = () => {
    setMessages(initialMessages);
    setEditedMessages(initialMessages);
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
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedMessage === index
                ? "border-red-500 bg-red-50 shadow-md"
                : "border-red-100 bg-white hover:bg-red-50"
            }`}
            onClick={() => !isEditing && setSelectedMessage(index)}
          >
            <div className="flex items-start mb-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  selectedMessage === index ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                {selectedMessage === index && (
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
              <span className="text-sm font-medium text-red-800">
                Variation {index + 1}
              </span>
            </div>

            {isEditing ? (
              <textarea
                value={editedMessages[index]}
                onChange={(e) => handleMessageChange(index, e.target.value)}
                className="w-full h-40 p-2 text-sm border border-red-200 rounded 
               focus:ring-2 focus:ring-red-500 text-black bg-white"
              />
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {message}
              </p>
            )}
          </div>
        ))}
      </div>

      {selectedMessage !== null && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-800">
              Memorize This Variation
            </h3>
          </div>
          <p className="text-red-700 mb-3">
            You&apos;ve selected Variation {selectedMessage + 1} to memorize.
            Practice reciting it until it feels natural.
          </p>
          <div className="bg-white p-3 rounded border border-red-100">
            <p className="text-gray-800 whitespace-pre-wrap">
              {messages[selectedMessage]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
