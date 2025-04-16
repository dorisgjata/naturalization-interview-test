import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import StateSelect from "../StateSelect";

type TopNavProps = {
  title: string;
};

function TopNav({ title }: TopNavProps) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#181818",
        zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Stack
        direction="row"
        sx={{
          margin: "0 auto",
          padding: "16px 24px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          aria-label="go to home"
          sx={{
            color: "#E0E0E0",
            alignItems: "center",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          Home
        </Button>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 24, sm: 28, md: 32 },
            fontWeight: 500,
            color: "#E0E0E0",
          }}
        >
          {title}
        </Typography>
        <StateSelect />
      </Stack>
    </Box>
  );
}

export default TopNav;
