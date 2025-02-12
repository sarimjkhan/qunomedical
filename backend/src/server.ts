import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { availableQuestionnaires } from "./questionnaires";
import { getAnswers, saveAnswer } from "./questionnaires/data/answerStore";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/schema", (req: Request, res: Response) => {
    const form = req.query.form as string;

    if (!form || !(form in availableQuestionnaires)) {
        res.status(400).json({ error: "Invalid or missing form parameter" });
        return;
    }

    res.json(availableQuestionnaires[form]);
});

app.get("/forms", (req: Request, res: Response) => {
    const forms = Object.keys(availableQuestionnaires);
    res.json({ forms });
});

app.post("/answers", (req: Request, res: Response) => {
    const { form, answers, isFinal } = req.body;

    if (!form || !(form in availableQuestionnaires)) {
        res.status(400).json({ error: "Invalid or missing form parameter" });
        return;
    }

    const questionnaire = availableQuestionnaires[form];
    const validQuestionIds = new Set(questionnaire.steps.map((q) => q.id));

    for (const questionId in answers) {
        if (!validQuestionIds.has(Number(questionId))) {
            res.status(400).json({ error: `Invalid question ID: ${questionId}` });
            return;
        }
    }

    // Save answer
    saveAnswer(form, answers, isFinal);

    res.status(200).json({ message: "Response saved successfully", isFinal });
});

// Get saved responses for a questionnaire
app.get("/answers", (req: Request, res: Response) => {
    const form = req.query.form as string;

    if (!form || !(form in availableQuestionnaires)) {
        res.status(400).json({ error: "Invalid or missing form parameter" });
        return;
    }

    const answers = getAnswers(form);
    res.json({ form, answers });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
