export default function AuthError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-700">
          Sorry, we couldn't sign you in. Please try again.
        </p>
        <p className="text-gray-500 mt-2">
          If the problem persists, please contact support.
        </p>
        <a
          href="/login"
          className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}
