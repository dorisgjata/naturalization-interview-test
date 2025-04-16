import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Box,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { RootState } from "@reduxjs/toolkit/query";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QnA } from "../app/types/types";
import FavoriteButton from "../components/buttons/FavoritesButton";
import StyledButton from "../components/buttons/StyledButton";
import AnswersList from "../components/questions/AnswersList";
import { useGetAllQuestionsQuery } from "../components/questions/questionsApi";
import { setQuestions } from "../components/questions/questionsSlice";
import TopNav from "../components/topnav/TopNav";

const PAGE_SIZE = 10;

function CivicsQuestions() {
  // const [questions, setQuestions] = useState<QnAs[]>([]);
  const [, setAudioUrl] = useState("");
  const audioElement = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
    {}
  );
  const [page, setPage] = useState(0);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
  const qnas = useSelector((state: RootState) => state.questions.qnas);
  const shouldFetch = qnas.length === 0;
  const { data, isLoading, isError, isSuccess } = useGetAllQuestionsQuery(
    {
      sort: "asc", // Optional: add sorting
      limit: 100, // Optional: set a limit for the number of questions

      seed: seed, // Optional: provide a random seed for randomizing the questions
    },
    {
      skip: !shouldFetch,
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setQuestions(data));
    }
  }, [isSuccess, data, dispatch]);

  const paginatedQuestions = qnas?.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  const goToNextSet = () => {
    if (paginatedQuestions.length < PAGE_SIZE) {
      setPage(0);
      setSeed(Math.floor(Math.random() * 1000000));
    } else {
      setPage(page + 1);
    }
  };

  const toggleCollapse = (index: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const generateSpeech = async (text: string) => {
    console.log(text);
    try {
      // setAudioUrl(url);

      if (audioElement.current) {
        audioElement.current.src = "url";
        audioElement.current.play();
      }
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  };

  const QuestionItem = ({ qna, index }: { qna: QnA; index: number }) => (
    <Box key={`question-${index}`}>
      <ListItem
        disablePadding
        sx={{ p: 0.5, pl: 2, display: "flex", alignItems: "center" }}
        secondaryAction={
          <>
            <FavoriteButton qna={qna} />
            <IconButton
              style={{ color: "white" }}
              aria-label={`Play question ${index + 1}`}
              onClick={() => generateSpeech(qna.question)}
            >
              <PlayCircleOutlineIcon />
            </IconButton>
          </>
        }
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
          primary={qna.question}
          primaryTypographyProps={{
            fontSize: 18,
          }}
        />
      </ListItem>
      <Collapse in={openQuestions[index]} timeout="auto" unmountOnExit>
        <AnswersList answers={qna.answers} index={index} sx={{ pl: 4 }} />
      </Collapse>
      {qnas && index !== qnas.length - 1 && (
        <Divider variant="middle" component="li" sx={{ borderColor: "#888" }} />
      )}
    </Box>
  );

  if (isLoading || !qnas) {
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
  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">Unknown error</Typography>
      </Box>
    );
  }
  if (qnas && qnas.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">No questions to display</Typography>
      </Box>
    );
  }
  return (
    <Box component="div">
      <TopNav title="Civics Questions for the Naturalization Test" />
      <Box
        sx={{
          marginTop: "80px",
          margin: "80px auto 0",
          padding: "0 24px",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            margin: "80px auto 0",
            padding: 2,
            backgroundColor: "#181818",
            borderRadius: 2,
            width: "60%",
            textAlign: "center",
          }}
        >
          <List dense>
            {paginatedQuestions.map((question: QnA, index: number) => (
              <QuestionItem
                key={`question-${question.id}`}
                qna={question}
                index={index}
              />
            ))}
          </List>

          <audio ref={audioElement} controls style={{ display: "none" }} />
          <StyledButton
            onClick={goToNextSet}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Loading..." : "Next Questions"}
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
}

export default CivicsQuestions;
