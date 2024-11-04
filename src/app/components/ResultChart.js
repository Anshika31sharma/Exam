import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultChart({ correctAnswers, totalQuestions }) {
  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        label: 'Answers',
        data: [correctAnswers, totalQuestions - correctAnswers],
        backgroundColor: ['#4CAF50', '#F44336'],
      
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center my-8 max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your results based on your answers:</h1>
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-4xl text-center">
        <p className="text-lg mb-4">
          You are most suitable for <strong>Association of Chartered Certified Accountant (ACCA)</strong>
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Association of Chartered Certified Accountants are professionals who are responsible for financial management and other financial aspects...
        </p>

        <div className="flex justify-center items-center mb-6" style={{ width: '200px', height: '200px' }}>
          <Pie data={data} options={options} className='flex' />
        </div>

        <div className="flex justify-around gap-2">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-sm">View course details</button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-sm">Consult Assistant</button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-sm">Copy URL</button>
        </div>
      </div>
    </div>
  );
}
