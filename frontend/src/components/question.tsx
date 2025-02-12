import { Question as QuestionType } from "../types";

interface Props {
  question: QuestionType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
}

const Question = ({ question, value, onChange, error }: Props) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold">{question.question}</label>
      {question.type === "text" && (
        <input
          type="text"
          className="border p-2 w-full mt-1"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {question.type === "number" && (
        <input
          type="number"
          className="border p-2 w-full mt-1"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {question.type === "radio" &&
        question.options?.map((option) => (
          <div key={option} className="mt-1">
            <label>
              <input
                type="radio"
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          </div>
        ))}
      {question.type === "checkbox" &&
        question.options?.map((option) => (
          <div key={option} className="mt-1">
            <label>
              <input
                type="checkbox"
                value={option}
                checked={(value as string[]).includes(option)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...(value as string[]), option]
                    : (value as string[]).filter((v) => v !== option);
                  onChange(newValue);
                }}
                className="mr-2"
              />
              {option}
            </label>
          </div>
        ))}  
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Question;