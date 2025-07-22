import { Button, styled } from '@mui/material';

export const ButtonBox = styled(Button)(({}) => ({
  borderRadius: "8px",
  padding: "0.5rem 2rem",
  textAlign: "center",
  transition: "0.3s all ease-in-out",
  fontWeight: 600,
  fontSize: "0.875rem",
  borderWidth: "1px",
  borderStyle: "solid",
  textTransform: "none",
}));
