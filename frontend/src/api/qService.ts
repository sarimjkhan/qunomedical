import axios from "axios";
import { QuestionnaireSchema } from "../types";

const API_BASE_URL = "http://localhost:5000";

export const fetchQuestionnaire = async (form: string): Promise<QuestionnaireSchema> => {
  const response = await axios.get(`${API_BASE_URL}/schema?form=${form}`);
  return response.data;
};

export const fetchAvailableForms = async (): Promise<string[]> => {
  const response = await axios.get(`${API_BASE_URL}/forms`);
  return response.data.forms;
};