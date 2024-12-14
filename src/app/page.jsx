"use client";
import React from "react";

function MainComponent() {
  const [grades, setGrades] = useState({
    prelim: "",
    midterm: "",
    prefinals: "",
    finals: "",
  });
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);
  const calculateGrade = useCallback(() => {
    const values = Object.values(grades).map(Number);
    if (values.some(isNaN)) return;

    const average = values.reduce((a, b) => a + b, 0) / 4;

    let grade = "";
    let description = "";

    if (average >= 97.5) {
      grade = "1.00";
      description = "Excellent";
    } else if (average >= 94.5) {
      grade = "1.25";
      description = "Very Good";
    } else if (average >= 91.5) {
      grade = "1.50";
      description = "Very Good";
    } else if (average >= 88.5) {
      grade = "1.75";
      description = "Very Good";
    } else if (average >= 85.5) {
      grade = "2.00";
      description = "Satisfactory";
    } else if (average >= 81.5) {
      grade = "2.25";
      description = "Satisfactory";
    } else if (average >= 77.5) {
      grade = "2.50";
      description = "Satisfactory";
    } else if (average >= 73.5) {
      grade = "2.75";
      description = "Fair";
    } else if (average >= 69.5) {
      grade = "3.00";
      description = "Fair";
    } else {
      grade = "5.00";
      description = "Failed";
    }

    setResult({ average: average.toFixed(2), grade, description });
    setAnimate(true);
  }, [grades]);
  const handleInputChange = (field, value) => {
    setGrades((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleClear = () => {
    setGrades({
      prelim: "",
      midterm: "",
      prefinals: "",
      finals: "",
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4 font-roboto">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-[1.02]">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Grade Calculator
        </h1>
        <p className="text-sm text-gray-500 text-center -mt-4 mb-6">
          By Pogi Pareng Lim
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              name="prelim"
              value={grades.prelim}
              onChange={(e) => handleInputChange("prelim", e.target.value)}
              placeholder="Prelim Grade"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              min="0"
              max="100"
            />
          </div>
          <div className="relative">
            <input
              type="number"
              name="midterm"
              value={grades.midterm}
              onChange={(e) => handleInputChange("midterm", e.target.value)}
              placeholder="Midterm Grade"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              min="0"
              max="100"
            />
          </div>
          <div className="relative">
            <input
              type="number"
              name="prefinals"
              value={grades.prefinals}
              onChange={(e) => handleInputChange("prefinals", e.target.value)}
              placeholder="Pre-Finals Grade"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              min="0"
              max="100"
            />
          </div>

          <div className="relative">
            <input
              type="number"
              name="finals"
              value={grades.finals}
              onChange={(e) => handleInputChange("finals", e.target.value)}
              placeholder="Finals Grade"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              min="0"
              max="100"
            />
          </div>
          <div className="space-y-2">
            <button
              onClick={calculateGrade}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Calculate GWA
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {result && (
          <div
            className={`mt-6 text-center ${animate ? "animate-result" : ""}`}
            onAnimationEnd={() => setAnimate(false)}
          >
            <div className="text-xl font-bold text-gray-800">
              Average: {result.average}%
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-2">
              GWA: {result.grade}
            </div>
            <div className="text-lg text-gray-600">{result.description}</div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes resultPop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-result {
          animation: resultPop 0.5s ease-out forwards;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;