import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAvailableForms } from "../api/qService";
import { useNavigate } from "react-router-dom";

interface Answer {
  [questionId: string]: string | number | string[];
}

const AnswersPage = () => {
  const [forms, setForms] = useState<string[]>([]);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadForms = async () => {
      try {
        const data = await fetchAvailableForms();
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error);
        setError("Failed to load forms.");
      }
    };

    loadForms();
  }, []);

  const loadAnswers = async (form: string) => {
    setLoading(true);
    setError(null);
    setAnswers([]);

    try {
      const response = await axios.get<{ form: string; answers: Answer[] }>(
        `http://localhost:5000/answers?form=${form}`
      );

      const filteredAnswers = response.data.answers.map(({ isFinal, ...rest }) => rest);
      setAnswers(filteredAnswers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      setError("Failed to load answers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg text-center mx-auto">
        <h1 className="text-2xl font-bold mb-6">View Submitted Answers</h1>

        <div className="mb-6">
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedForm || ""}
            onChange={(e) => {
              const form = e.target.value;
              setSelectedForm(form);
              loadAnswers(form);
            }}
          >
            <option value="" disabled>Select a form</option>
            {forms.map((form) => (
              <option key={form} value={form}>{form}</option>
            ))}
          </select>
        </div>

        {loading && <p className="text-center text-gray-500">Loading answers...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {answers.length > 0 ? (
          <div className="overflow-x-auto">
            <table border={1} className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3">#</th>
                  {Object.keys(answers[0]).map((question) => (
                    <th key={question} className="border border-gray-300 p-3">Q{question}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {answers.map((answer, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    {Object.keys(answer).map((key, i) => (
                      <td key={i} className="border border-gray-300 p-3">
                        {typeof answer[key] === "object"
                          ? JSON.stringify(answer[key])
                          : String(answer[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          selectedForm && !loading && <p className="text-center text-gray-500">No responses found for {selectedForm}.</p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Back to Forms
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswersPage;