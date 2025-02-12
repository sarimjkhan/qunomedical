import { useEffect, useState } from "react";
import { fetchQuestionnaire } from "../api/qService";
import { QuestionnaireSchema } from "../types";
import { useQuestionnaire } from "../hooks/useQuestionnaire";
import Question from "../components/question";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const QuestionnairePage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formId) return;

    const loadQuestionnaire = async () => {
      try {
        const data = await fetchQuestionnaire(formId);
        setQuestionnaire(data);
      } catch (error) {
        console.error("Error fetching questionnaire:", error);
        setError("Failed to load the questionnaire.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestionnaire();
  }, [formId]);

  const { currentStep, answers, errors, handleAnswerChange, nextStep, prevStep, isFinalStep } =
    useQuestionnaire(questionnaire);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/answers", {
        form: formId,
        answers,
        isFinal: true,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to submit. Please check your internet connection.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg text-center mx-auto">

        {loading && <p className="text-center text-gray-500">Loading answers...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <h1 className="text-xl font-bold mb-4">{questionnaire?.title}</h1>
        {submitted ? (
          <div>
            <p className="text-green-500 text-lg">Thank you for your submission!</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
            >
              Back to Forms
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-4">Filling out <strong>{formId}</strong></p>

            {questionnaire?.steps[currentStep] && (
              <>
                <Question
                  question={questionnaire.steps[currentStep]}
                  value={answers[questionnaire.steps[currentStep].id] || ""}
                  onChange={(value) => handleAnswerChange(questionnaire.steps[currentStep].id, value)}
                  error={errors[questionnaire.steps[currentStep].id]}
                />

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={currentStep === 0}
                  >
                    Previous
                  </button>
                  {isFinalStep() ? (
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                      Submit
                    </button>
                  ) : (
                    <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionnairePage;