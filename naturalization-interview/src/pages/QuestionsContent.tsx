import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { CardType } from "../app/types/types.ts";
import StyledButton from "../components/buttons/StyledButton.tsx";
import TopNav from "../components/topnav/TopNav.tsx";
import QnA from "./CivicsQuestions.tsx";
import FlashCard from "./FlashCard.tsx";

function QuestionsContent() {
  const navigate = useNavigate();
  const goToPage = (path: string) => {
    navigate(`/${path}`);
  };

  const data: CardType[] = [
    {
      title: "100 Questions Civics Test",
      path: "questions",
      subtitle: "History and Government Test for the Naturalization Test",
      detail: "Practice the test with of 10 questions per round.",
      content: <QnA />,
    },
    {
      title: "Flash Cards",
      path: "favorites",
      subtitle: "History and Government Test for the Naturalization Test",
      detail: "Practice each question using flashcards.",
      content: <FlashCard />,
    },
  ];

  const cards = () => {
    return data.map((card, index) => (
      <Card
        key={`card_${index}`}
        sx={{
          borderRadius: 2,
          background: "#303030",
          minHeight: "250px",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            height: "90%",
          }}
        >
          <Typography
            sx={{
              color: "#E0E0E0",
              fontSize: 24,
              fontWeight: 500,
              lineHeight: 1.3,
            }}
          >
            {card.title}
          </Typography>
          <Typography sx={{ fontSize: 18, color: "#f3f3f3" }}>
            {card.subtitle}
          </Typography>
          <StyledButton onClick={() => goToPage(card.path)}>Start</StyledButton>
          <Typography
            sx={{
              fontSize: 16,
              color: "#f3f3f3",
            }}
          >
            {card.detail}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box component="div" width="100vw">
      <TopNav title="Naturalization Test Practice" />
      <Stack
        direction="row"
        gap={3}
        sx={{
          marginTop: "80px",
          margin: "80px auto 0",
          padding: "0 24px",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {cards()}
      </Stack>
    </Box>
  );
}

export default QuestionsContent;
