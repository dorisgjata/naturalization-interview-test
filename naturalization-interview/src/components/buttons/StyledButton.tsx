import { Button, ButtonProps as MUIButtonProps } from "@mui/material";

interface ButtonProps extends MUIButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
}

export default function StyledButton({
  isDisabled = false,
  isLoading = false,
  onClick,
  sx,
  children,
  ...props
}: ButtonProps) {
  return (
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
        ...sx,
      }}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {/* title */}
      {children}
    </Button>
  );
}
