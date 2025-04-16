import { List, ListItem, ListItemText, SxProps, Theme } from "@mui/material";

export default function AnswersList(props: {
  answers: string[];
  index: number;
  sx?: SxProps<Theme>;
}) {
  const { answers, index, sx } = props;
  return (
    <List sx={sx} disablePadding>
      {answers.map((answer: string, answerIndex: number) => (
        <ListItem sx={sx} disablePadding key={`answer-${index}-${answerIndex}`}>
          <ListItemText
            primary={answer}
            primaryTypographyProps={{
              fontSize: 16,
              color: "rgba(220,220,220,0.8)",
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}
