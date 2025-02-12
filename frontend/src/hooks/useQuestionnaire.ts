import { useState } from "react";
import { QuestionnaireSchema } from "../types";

export const useQuestionnaire = (questionnaire: QuestionnaireSchema | null) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

  const handleAnswerChange = (questionId: number, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // ✅ If user corrects the error, remove it
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    const currentQuestion = questionnaire?.steps[currentStep];

    // ✅ Validate Required Field Before Moving Forward
    if (currentQuestion?.required && !answers[currentQuestion.id]) {
      setErrors((prev) => ({
        ...prev,
        [currentQuestion.id]: "This field is required",
      }));
      return;
    }

    if (currentStep < (questionnaire?.steps.length ?? 0) - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isFinalStep = () => currentStep === (questionnaire?.steps.length ?? 1) - 1;

  return { currentStep, answers, errors, handleAnswerChange, nextStep, prevStep, isFinalStep };
};
