import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import HostingPlansData from "../components/HostingPlansData";

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
      </CardContent>
    </Card>
  );
}
