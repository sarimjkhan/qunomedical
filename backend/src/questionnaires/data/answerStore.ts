// Structure for storing answers in memory
interface AnswerEntry {
  form: string;
  answers: Record<number, string | string[]>; // Key is question ID
  isFinal: boolean;
}

// In-memory store for answers
const answerStore: AnswerEntry[] = [];

// Function to save an answer
export const saveAnswer = (form: string, answers: Record<number, string | string[]>, isFinal: boolean) => {
  answerStore.push({ form, answers, isFinal });
};

// Function to retrieve answers for a form
export const getAnswers = (form: string): AnswerEntry[] => {
  return answerStore.filter((entry) => entry.form === form);
};
