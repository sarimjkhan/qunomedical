import { Question } from "./types";

// Base class for all questionnaires
export class Questionnaire {
  title: string;
  steps: Question[];

  constructor(title: string, steps: Question[]) {
    this.title = title;
    this.steps = steps;
  }
}
