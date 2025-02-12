import { QRegistration } from "./forms/qRegistration";
import { QFeedback } from "./forms/qFeedback";
import { Questionnaire } from "./base/questionnaire";

// Define the available questionnaires with proper TypeScript typing
export const availableQuestionnaires: Record<string, Questionnaire> = {
  registration: new QRegistration(),
  feedback: new QFeedback()
};
