import { Questionnaire } from "../base/questionnaire";
import { QuestionType } from "../base/types";

export class QRegistration extends Questionnaire {
  constructor() {
    super("User Registration Form", [
      {
        id: 1,
        question: "What is your name?",
        type: QuestionType.TEXT,
        required: true
      },
      {
        id: 2,
        question: "What is your age?",
        type: QuestionType.NUMBER,
        required: true
      }
    ]);
  }
}
