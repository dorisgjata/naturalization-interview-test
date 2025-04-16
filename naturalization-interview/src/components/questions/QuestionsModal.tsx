import {
  Box,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { QnA } from "../../app/types/types";
import StyledButton from "../buttons/StyledButton";
import { useGetAllQuestionsQuery } from "./questionsApi";
import { toggleFavorites } from "./questionsSlice";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const QuestionModal = ({ open, onClose }: ModalProps) => {
  const dispatch = useDispatch();

  const {
    data: questions,
    isLoading,
    isError,
  } = useGetAllQuestionsQuery({
    sort: "asc", // Optional: add sorting
    limit: 100, // Optional: set a limit for the number of questions
  });
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(
    new Set()
  );

  // Toggle function for selecting/deselecting a question
  const handleToggleQuestion = (qna: QnA) => {
    setSelectedQuestions((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(qna.id)) {
        newSelected.delete(qna.id); // Deselect the question
      } else {
        newSelected.add(qna.id); // Select the question
      }
      return newSelected;
    });
  };

  const handleAddToFavorites = () => {
    const selected = questions
      ?.filter((q) => selectedQuestions.has(q.id))
      .map((q) => q.id);
    console.log(selected);
    if (selected) {
      dispatch(toggleFavorites(selected));
      onClose(); // Close the modal after adding to favorites
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <p>Error loading questions.</p>;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          maxWidth: 800,
          maxHeight: "80vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          overflow: "auto",
        }}
      >
        <h2>Select Questions to Add to Favorites</h2>
        <List>
          {questions?.map((question: QnA) => (
            <ListItem key={question.id} disablePadding>
              <Checkbox
                checked={selectedQuestions.has(question.id)}
                onChange={() => handleToggleQuestion(question)}
                color="default"
                sx={{ color: "#bf8a49" }}
              />
              <ListItemText
                primary={question.question}
                primaryTypographyProps={{
                  fontSize: 18,
                }}
              />
            </ListItem>
          ))}
        </List>
        <StyledButton
          onClick={handleAddToFavorites}
          disabled={selectedQuestions.size === 0}
          sx={{ mt: 2, mr: 2 }}
        >
          Add to Favorites
        </StyledButton>
        <StyledButton onClick={onClose} sx={{ mt: 2 }} variant="contained">
          Close
        </StyledButton>
      </Box>
    </Modal>
  );
};

export default QuestionModal;
