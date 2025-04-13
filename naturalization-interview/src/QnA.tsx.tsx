import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getQnA, textToSpeech } from "./api";
import TopNav from "./components/TopNav";
import { QnAs } from "./types";

type QnAProps = {
  onBack?: () => void;
};

function QnA({ onBack }: QnAProps) {
  const [questions, setQuestions] = useState<QnAs[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const audioElement = useRef<HTMLAudioElement>(null);

  const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
    {}
  );

  const getQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getQnA();
      console.log("API Response:", response);
      if (response && Array.isArray(response)) {
        setQuestions(response);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadNextQuestions = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await getQuestions();
      setOpenQuestions({});
    } catch (error) {
      console.error("Error loading next questions:", error);
      setError("Failed to load next questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current questions:", questions);
    getQuestions();
  }, []);

  const toggleCollapse = (index: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const generateSpeech = async (text: string) => {
    try {
      const url = await textToSpeech(text);
      setAudioUrl(url);

      if (audioElement.current) {
        audioElement.current.src = url;
        audioElement.current.play();
      }
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  };

  const QuestionItem = ({
    question,
    index,
  }: {
    question: QnAs;
    index: number;
  }) => (
    <Box key={`question-${index}`}>
      <ListItem
        sx={{ display: "flex", alignItems: "center" }}
        secondaryAction={
          <IconButton
            style={{ color: "white" }}
            aria-label={`Play question ${index + 1}`}
            onClick={() => generateSpeech(question.question)}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        }
        disablePadding
      >
        <IconButton
          style={{ color: "white" }}
          aria-label={`${
            openQuestions[index] ? "Hide" : "Show"
          } answers for question ${index + 1}`}
          onClick={() => toggleCollapse(index)}
        >
          {openQuestions[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>

        <ListItemText
          primary={question.question}
          primaryTypographyProps={{
            fontSize: 18,
            width: "85%",
          }}
        />
      </ListItem>
      <Collapse in={openQuestions[index]} timeout="auto" unmountOnExit>
        <List sx={{ pl: 5 }} disablePadding>
          {question.answers.map((answer, answerIndex) => (
            <ListItem
              sx={{ pb: 0.5, pl: 2 }}
              disablePadding
              key={`answer-${index}-${answerIndex}`}
              secondaryAction={
                <IconButton
                  style={{ color: "white" }}
                  aria-label={`Play answer ${answerIndex + 1}`}
                  onClick={() => generateSpeech(answer)}
                >
                  <PlayCircleOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={answer}
                primaryTypographyProps={{
                  fontSize: 16,
                  width: "60%",
                  color: "rgba(220,220,220,0.8)",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
      {index !== questions.length - 1 && (
        <Divider variant="middle" component="li" sx={{ borderColor: "#888" }} />
      )}
    </Box>
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box component="div">
      <TopNav
        title="Civics Questions for the Naturalization Test"
        onHomeClick={onBack}
      />

      <Box
        sx={{
          margin: "80px auto 0",
          padding: 2,
          backgroundColor: "#181818",
          minWidth: "70vw",
          borderRadius: 2,
        }}
      >
        {questions.length === 0 && !isLoading && !error ? (
          <Typography>No questions available</Typography>
        ) : (
          <List dense>
            {questions.map((question, index) => (
              <QuestionItem
                key={`question-${index}`}
                question={question}
                index={index}
              />
            ))}
          </List>
        )}
        <audio ref={audioElement} controls style={{ display: "none" }} />
        <Button
          color="inherit"
          variant="outlined"
          size="large"
          sx={{
            mt: 2,
            borderRadius: 5,
            borderColor: "#bf8a49",
            borderWidth: "2px",
            color: "#F2F2F2",
            fontWeight: 500,
            textTransform: "none",
          }}
          onClick={loadNextQuestions}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Next Questions"}
        </Button>
      </Box>
    </Box>
  );
}

export default QnA;
