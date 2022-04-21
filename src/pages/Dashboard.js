import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Fab } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import HostingPlansData from "../components/HostingPlansData";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Dashboard() {
  return (
    <Card sx={{ minWidth: "96%" }}>
      <CardHeader
        sx={{ backgroundColor: "#1C8EF9", color: "white" }}
        title={
          <Typography variant="h5">
            {bull} Dashboard {bull}
          </Typography>
        }
      />
      <CardContent>
        <HostingPlansData />
        <Link to="/plans">
          <Fab
            sx={{
              backgroundColor: "#1C8EF9",
              position: "fixed",
              bottom: 20,
              right: 10,
              color: "white",
              ":hover": {
                backgroundColor: "#1C8EF9",
              },
            }}
            variant="extended"
          >
            <AddIcon sx={{ mr: 1, color: "white" }} />
            Add New Plan
          </Fab>
        </Link>
      </CardContent>
    </Card>
  );
}
