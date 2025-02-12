import { useEffect, useState } from "react";
import { fetchAvailableForms } from "../api/qService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [forms, setForms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    loadForms();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg text-center mx-auto">
        <h1 className="text-2xl font-bold mb-6">Select a Form</h1>
        {loading && <p className="text-center text-gray-500">Loading available forms...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <ul>
          {forms.map((form) => (
            <li
              key={form}
              className="cursor-pointer bg-blue-500 text-white p-4 rounded mb-2 hover:bg-blue-700 transition-all"
              onClick={() => navigate(`/form/${form}`)}
            >
              {form}
            </li>
          ))}
        </ul>
        <button
          className="w-full bg-green-500 text-white p-3 rounded mt-4 hover:bg-green-700"
          onClick={() => navigate("/answers")}
        >
          View Submitted Answers
        </button>
      </div>
    </div>
  );
};

export default HomePage;