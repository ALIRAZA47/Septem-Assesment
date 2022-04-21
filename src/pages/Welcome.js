import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Redirect } from "react-router-dom";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Welcome() {
  const { isUser, navigateTo } = useAuth();
  if (isUser()) {
    navigateTo("/dashboard");
  }

  const history = useHistory();
  return (
    <Card sx={{ maxWidth: "80%", maxHeight: 300, padding: 4 }}>
      <CardContent>
        <Typography
          sx={{ mb: 1.5, letterSpacing: 3 }}
          variant="h4"
          component="div"
        >
          {bull} Welcome :) {bull}
        </Typography>
        <Typography
          sx={{ mb: 1.5, letterSpacing: 3 }}
          color="text.secondary"
        ></Typography>
        <Typography sx={{ mb: 1.5, letterSpacing: 3 }} variant="body2">
          We are glad to see you here. This is a place where you can find all
          the information you need to get started with your new hosting plan.
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            mt: "5%",
            mb: "5%",
            fontWeight: "bold",
            width: "50%",
          }}
          variant="contained"
          onClick={() => {
            history.push("/signup");
          }}
        >
          Signup and Go
        </Button>
      </CardActions>
    </Card>
  );
}
