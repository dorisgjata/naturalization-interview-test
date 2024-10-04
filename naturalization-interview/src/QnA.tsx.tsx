import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Box,
  Button,
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

export type QnAs = {
  question: string;
  answers: string[];
};
function QnA() {
  const [questions, setQuestions] = useState<QnAs[]>([]);
  const [, setAudioUrl] = useState("");
  const audioElement = useRef<HTMLAudioElement>(null);

  const [open, setOpen] = useState<{
    [index: string]: boolean;
  }>({});

  const getQuestions = () =>
    getQnA().then((response) => {
      if (response) setQuestions(response as QnAs[]);
    });
  const loadNextQuestions = () => {
    getQuestions();
    setOpen({});
  };
  useEffect(() => {
    getQuestions();
  }, []);

  const toggleCollapse = (index: number) => {
    setOpen((prevState) => ({
      ...prevState,
      [`${index}`]: !prevState[index],
    }));
  };

  const generateSpeech = async (text: string) => {
    try {
      const url = await textToSpeech(text);
      setAudioUrl(url);

      if (audioElement && audioElement.current) {
        audioElement.current.src = url;
        audioElement.current.play();
      }
    } catch (error) {
      console.log("Error generating speech.", error);
    }
  };
  const questionCards = () => {
    return (
      <List dense>
        {questions.map((question, index) => {
          return (
            <>
              <ListItem
                sx={{ display: "flex", alignItems: "center" }}
                key={`q_${index}`}
                secondaryAction={
                  <IconButton
                    style={{ color: "white" }}
                    aria-label="generate speech"
                    onClick={() => generateSpeech(question.question)}
                  >
                    <PlayCircleOutlineIcon />
                  </IconButton>
                }
                disablePadding
              >
                <IconButton
                  style={{ color: "white" }}
                  aria-label="delete"
                  onClick={() => toggleCollapse(index)}
                >
                  {open[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>

                <ListItemText
                  primary={question.question}
                  primaryTypographyProps={{
                    fontSize: 18,
                    width: "85%",
                  }}
                />
              </ListItem>
              <Collapse in={open[`${index}`]} timeout="auto" unmountOnExit>
                <List sx={{ pl: 5 }} disablePadding>
                  {question.answers.map((answer, index) => (
                    <ListItem
                      sx={{ pb: 0.5, pl: 2 }}
                      disablePadding
                      key={`a_${index}`}
                      secondaryAction={
                        <IconButton
                          style={{ color: "white" }}
                          aria-label="delete"
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
                <Divider
                  variant="middle"
                  component="li"
                  sx={{ borderColor: "#888" }}
                />
              )}
            </>
          );
        })}
      </List>
    );
  };
  return (
    <Box component="div">
      <Typography variant="h1" sx={{ fontSize: 32 }}>
        Civics Questions for the Naturalization Test
      </Typography>
      {questionCards()}
      <audio ref={audioElement} controls style={{ display: "none" }} />
      <Button
        color="inherit"
        variant="outlined"
        size="large"
        sx={{
          mt: 2,
          borderRadius: 5,
          borderColor: "#F2F2F2", //taupe
          borderWidth: "2px",
          color: "#F2F2F2",
          fontWeight: 500,
          textTransform: "none",
        }}
        onClick={() => loadNextQuestions()}
      >
        Next Questions
      </Button>
    </Box>
  );
}
export default QnA;
