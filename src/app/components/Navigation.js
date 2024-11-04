export default function Navigation({ totalQuestions, currentQuestion, onNavigate }) {
    return (
      <div className="flex space-x-2 mb-4">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-8 h-8 rounded-full ${
              currentQuestion === i ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
  