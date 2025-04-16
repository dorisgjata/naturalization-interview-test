import {
  Box,
  Card,
  CardActions,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import FavoriteButton from "../components/buttons/FavoritesButton";
import StyledButton from "../components/buttons/StyledButton";
import AnswersList from "../components/questions/AnswersList";
import QuestionsModal from "../components/questions/QuestionsModal";
import TopNav from "../components/topnav/TopNav";
function FlashCard() {
  const qnas = useSelector((state: RootState) => state.questions.qnas);
  const favorites = qnas.filter((questions) => questions.isFavorite);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setShowAnswer(false);
  };
  const [open, setOpen] = useState(false);

  // Toggle modal open/close
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Box component="div">
      <TopNav title="Civics Questions for the Naturalization Test" />
      <Box
        sx={{
          padding: 2,
          height: "100%",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
        }}
      >
        {favorites.length === 0 ? (
          <Box>
            <Typography>
              Start adding questions to favorites to practice with flashcards.
            </Typography>
            <StyledButton onClick={handleModalOpen}>Add questions</StyledButton>
            <QuestionsModal open={open} onClose={handleModalClose} />
          </Box>
        ) : (
          <Stack
            spacing={2}
            direction="column"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {favorites.map(
              (question, index) =>
                index === currentPage - 1 && (
                  <Card
                    variant="elevation"
                    sx={{
                      pb: 2,
                      width: "50vw",
                      display: "flex",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Typography
                          component="div"
                          variant="h6"
                          sx={{
                            alignSelf: "center",
                            pr: 2,
                          }}
                        >
                          {question.question}
                        </Typography>
                        <CardActions>
                          <FavoriteButton qna={question} />
                        </CardActions>
                      </Stack>

                      <Typography variant="subtitle1">
                        <Box
                          sx={{
                            pt: 2,
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {!showAnswer ? (
                            <StyledButton
                              onClick={() => setShowAnswer((prev) => !prev)}
                            >
                              Show Answer
                            </StyledButton>
                          ) : (
                            <AnswersList
                              answers={question.answers}
                              index={index}
                            />
                          )}
                        </Box>
                      </Typography>
                    </CardContent>
                  </Card>
                )
            )}
          </Stack>
        )}
        {favorites.length > 0 && (
          <Pagination
            sx={{ mt: 5 }}
            count={favorites.length}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  );
}

export default FlashCard;
