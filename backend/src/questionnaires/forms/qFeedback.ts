import { Questionnaire } from "../base/questionnaire";
import { QuestionType } from "../base/types";

export class QFeedback extends Questionnaire {
  constructor() {
    super("Customer Feedback Form", [
      {
        id: 1,
        question: "How would you rate our service?",
        type: QuestionType.RADIO,
        options: ["Excellent", "Good", "Average", "Poor"],
        required: true
      },
      {
        id: 2,
        question: "Any suggestions for improvement?",
        type: QuestionType.TEXT,
        required: false
      }
    ]);
  }
}
