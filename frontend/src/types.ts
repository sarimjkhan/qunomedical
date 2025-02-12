export enum QuestionType {
    TEXT = "text",
    NUMBER = "number",
    RADIO = "radio",
    CHECKBOX = "checkbox"
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
  
  export interface QuestionnaireSchema {
    title: string;
    steps: Question[];
  }
  