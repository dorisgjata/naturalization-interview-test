import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import QnA from "./QnA.tsx";
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
      content: <QnA />,
    },
    {
      title: "Flash Cards",
      subtitle: "History and Government Test for the Naturalization Test",
      detail: "Practice each question using flashcards.",
      content: <QnA />,
    },
  ];
  const cards = () => {
    return data.map((card, index) => (
      <Card
        key={`card_${index}`}
        sx={{
          maxWidth: 400,
          maxHeight: 400,
          minWidth: 275,
          minHeight: 275,
          background: "#888",
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
          <Typography sx={{ fontSize: 24, fontWeight: 500, lineHeight: 1.3 }}>
            {card.title}
          </Typography>
          <Typography sx={{ fontSize: 18, color: "#353839" }}>
            {card.subtitle}
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 5,
              borderColor: "#41362D", //taupe
              borderWidth: "2px",
              color: "#41362D",
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
              color: "#353839", //Onyx
            }}
          >
            {card.detail}
          </Typography>
        </CardContent>
      </Card>
    ));
  };
  return (
    <Box
      component="div"
      width="100%"
      sx={{ display: "flex", alignContent: "center", flexDirection: "row" }}
    >
      {!showContent && (
        <Typography variant="h1"> Naturalization Test Practice</Typography>
      )}
      {showContent ? (
        <>
          <IconButton
            color="inherit"
            sx={{
              position: "absolute",
              left: 0,
              top: 5,
              right: 5,
              justifyContent: "flex-start",
            }}
            onClick={() => setShowContent(null)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          {showContent}
        </>
      ) : (
        <Stack direction="row" gap={3}>
          {cards()}
        </Stack>
      )}
    </Box>
  );
}

export default App;
