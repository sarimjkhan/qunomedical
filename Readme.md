# Qunomedical Fullstack Assignment

## 📌 Project Overview
This is a full-stack application built using **Express (Backend) and React + Vite (Frontend)**. It provides a simple questionnaire system where users can fill out different forms, submit answers, and view previously submitted responses.

## 🚀 Technologies and Resources Used
- **Backend:** Express.js, TypeScript, Node.js
- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **State Management:** React useState & useEffect hooks
- **API Calls:** Axios
- **Containerization:** Docker & Docker-Compose
- **Online Documentation and ChatGPT**
---

## 🔧 Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone <repo-url>
cd qunomedical-task
```


### **2️⃣ Run with Docker (Recommended)**
```bash
docker-compose up --build
```
This will start both the backend and frontend services using Docker.

If you want to run them separately, follow the following steps
### **3️⃣ Run Backend**
```bash
cd backend
npm install
npm run dev
```
The backend will be available at `http://localhost:5000`

### **4️⃣ Run Frontend**
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`
---

## 📌 Features
- **List of Available Forms:** Users can select different forms.
- **Form Submission:** Users can complete forms and submit answers.
- **View Submitted Responses:** Users can view previously submitted answers.
- **Progress Tracking:** UI shows the progress of the form.
- **Clean UI with Tailwind CSS.**

---

## 🛠️ Improvements & Next Steps
This is a basic implementation with many areas for improvement:
- **Database Integration:** Currently, data is stored in memory. Using PostgreSQL or MongoDB would allow for persistence.
- **Better Type Usage:** Types and interfaces can be more structured and due to lack of time I couldn't integrate the types properly, this can be improved.
- **Error Handling:** More detailed validation & error messages are needed.
- **UI/UX Enhancements:** Styling can be improved for better usability. Currently, it is very ugly.
- **Project Structure:** Project Structure could be improved but I couldn't reach to that point.
- **More Complex Forms:** Currently, only basic input types are supported, we can integrate more complex controls.
- **Partial submissions of forms:** Currently, partial submission of the created forms is supported, due to lack of time I couldn't reach to that point.
---

## 📖 How to Add New Forms
To add a new questionnaire form, follow these steps:

### **1️ Backend - Create a New Questionnaire**
Navigate to `backend/src/questionnaires/forms` and create a new file.
```ts
import { Questionnaire } from "./base/Questionnaire";

export class QNewSurvey extends Questionnaire {
  constructor() {
    super("New Survey", [
      { id: 1, question: "What is your name?", type: "text", required: true },
      { id: 2, question: "Select your gender", type: "radio", options: ["Male", "Female", "Other"], required: true },
    ]);
  }
}
```
Then, import and register it in `backend/src/questionnaires/index.ts`
```ts
import { QNewSurvey } from "./QNewSurvey";
export const availableQuestionnaires = {
  new_survey: new QNewSurvey(),
};
```

### **2️ Frontend - Update UI**
No frontend changes are needed. The form will automatically appear in the list.

---

## How to Add New Question Types
Currently, we support `TEXT`, `NUMBER`, `RADIO`, and `CHECKBOX`. If you need new question types, follow these steps:
Lets add a `Gender` question for which we need a `DROPDOWN`.

### **1️ Update the `types.ts` File**
Modify `backend/src/questionnaires/base/types.ts` to add the new type:
```ts
export enum QuestionType {
    TEXT = "text",
    NUMBER = "number",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    DROPDOWN = "dropdown" // New question type
}
```

### **2 Update the `qRegistration.ts` form**
Modify `backend/src/questionnaires/forms/qRegistration.ts` to add a new question:
```ts
    {
      id: 3,
      question: "What is your gender",
      type: QuestionType.DROPDOWN,
      required: true,
      options: ["Male", "Femalee"]
    }
```

### **3 Update the `Question.tsx` Component**
Modify `frontend/src/components/question.tsx` to support the new type:
```tsx
    {question.type === "dropdown" && (
      <select
        className="border p-2 w-full mt-1"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Select an option</option>
        {question.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )}
```

### **4 Update the `types.ts` File at the frontend also**
Modify `frontend/src/types.ts` to add the new type:
```ts
export enum QuestionType {
    TEXT = "text",
    NUMBER = "number",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    DROPDOWN = "dropdown" // New question type
}
```

That's it! The new question type is now supported.

---

🚀 **This project is a starting point and can be improved further!**
