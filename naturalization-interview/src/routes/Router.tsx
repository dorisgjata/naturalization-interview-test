import { BrowserRouter, Route, Routes } from "react-router";
import CivicsQuestions from "../pages/CivicsQuestions.tsx";
import FlashCard from "../pages/FlashCard";
import QuestionsContent from "../pages/QuestionsContent";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<QuestionsContent />} />
        <Route path="favorites" element={<FlashCard />} />
        <Route path="questions" element={<CivicsQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
