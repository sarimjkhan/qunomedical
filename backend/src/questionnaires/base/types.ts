export enum QuestionType {
    TEXT = "text",
    NUMBER = "number",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    DROPDOWN = "dropdown"
  }
  
  export interface Question {
    id: number;
    question: string;
    type: QuestionType;
    required: boolean;
    options?: string[];
    dependsOn?: {
      questionId: number;
      answer: string;
    };
  }
  