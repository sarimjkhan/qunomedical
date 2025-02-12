import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import QuestionnairePage from "./pages/qPage";
import AnswersPage from "./pages/answersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/:formId" element={<QuestionnairePage formId=""/>} />
        <Route path="/answers" element={<AnswersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
