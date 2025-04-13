import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import QnA from "./QnA.tsx";
import TopNav from "./components/TopNav";

type CardType = {
  title: string;
  subtitle: string;
  detail: string;
  content: JSX.Element;
};

function App() {
  const [showContent, setShowContent] = useState<JSX.Element | null>(null);
  const data: CardType[] = [
    {
      title: "100 Questions Civics Test",
      subtitle: "History and Government Test for the Naturalization Test",
      detail: "Practice the test with of 10 questions per round.",
      content: <QnA onBack={() => setShowContent(null)} />,
    },
    {
      title: "Flash Cards",
      subtitle: "History and Government Test for the Naturalization Test",
      detail: "Practice each question using flashcards.",
      content: <QnA onBack={() => setShowContent(null)} />,
    },
  ];

  const cards = () => {
    return data.map((card, index) => (
      <Card
        key={`card_${index}`}
        sx={{
          borderRadius: 2,
          maxWidth: 400,
          maxHeight: 400,
          minWidth: 275,
          minHeight: 275,
          background: "#303030",
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
          <Button
            color="inherit"
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 5,
              borderColor: "#bf8a49",
              borderWidth: "2px",
              color: "#f2f2f2",
              fontWeight: 500,
              textTransform: "none",
            }}
            onClick={() => setShowContent(card.content)}
          >
            Start
          </Button>
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
    <Box component="div" width="100%">
      {showContent ? (
        showContent
      ) : (
        <>
          <TopNav title="Naturalization Test Practice" />
          <Box
            sx={{
              marginTop: "80px",
              maxWidth: "1200px",
              margin: "80px auto 0",
              padding: "0 24px",
            }}
          >
            <Stack direction="row" gap={3}>
              {cards()}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
