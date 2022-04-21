import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import { Stack } from "@mui/material";

import "../App.css";
import DomainDialog from "./DomainDialog";
import { useAuth } from "../AuthContext";

export default function PlanCard({
  title,
  icon,
  icon_color,
  price,
  sdd_storage,
  data_teambox,
  web,
  free_domain,
  vCPU_cores,
  vRAM,
  wordpress_optimized,
  free_ssl,
  free_cloud_flare_cdn,
  epanel,
  ddos_protection,
  website_builder,
}) {
  const [open, setOpen] = React.useState(false);
  const [domainName, setDomainName] = React.useState("");

  const { getUser } = useAuth();
  const handleOrderClick = () => {
    // open dialog/promp
    setOpen(true);

    // add plan to firestore
  };

  React.useEffect(() => {
    console.log(domainName);
  }, [domainName]);

  return (
    <Card
      className=" justify-content-center text-center"
      sx={{
        borderRadius: 0,
        border: "2px solid",
        borderColor: icon_color,
        minWidth: 250,
        maxWidth: 350,
        margin: "auto",
      }}
    >
      <CardHeader title={<Typography variant="h5">{title}</Typography>} />
      {/* Image / Icon Here */}
      <CardContent sx={{ padding: 2, background: "#f5f5f0" }}>
        <Typography variant="h4" color="text.secondary">
          {price}
        </Typography>
        /mo
      </CardContent>

      <CardContent sx={{ padding: 2, fontSize: "small" }}>
        <div>
          <Stack
            sx={{
              padding: 1,
              height: "25px",
              marginTop: 1,
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>SSd Storage</p>
            <p>
              <b>{sdd_storage}</b>
            </p>
          </Stack>

          <Stack
            sx={{
              marginTop: 1,
              padding: 1,
              backgroundColor: "#f5f5f0",
              height: "25px",
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>Data Teambox</p>
            <p>
              <b>{data_teambox}</b>
            </p>
          </Stack>

          {/* 2nd pair */}
          <Stack
            sx={{
              padding: 1,
              height: "25px",
              marginTop: 1,
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>Web ..</p>
            <p>
              <b>{web}</b>
            </p>
          </Stack>

          <Stack
            sx={{
              marginTop: 1,
              padding: 1,
              backgroundColor: "#f5f5f0",
              height: "25px",
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>Free Domain</p>
            <p>
              <b>{free_domain}</b>
            </p>
          </Stack>

          {/* 3rd pair */}
          <Stack
            sx={{
              padding: 1,
              height: "25px",
              marginTop: 1,
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>vCPU Cores</p>
            <p>
              <b>{vCPU_cores}</b>
            </p>
          </Stack>

          <Stack
            sx={{
              marginTop: 1,
              padding: 1,
              backgroundColor: "#f5f5f0",
              height: "25px",
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>vRAM</p>
            <p>
              <b>{vRAM}</b>
            </p>
          </Stack>
          {/* 4th pair */}
          <Stack
            sx={{
              padding: 1,
              height: "25px",
              marginTop: 1,
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>Wordpress Optimized</p>
            <p>
              <b>{wordpress_optimized}</b>
            </p>
          </Stack>

          <Stack
            sx={{
              marginTop: 1,
              padding: 1,
              backgroundColor: "#f5f5f0",
              height: "25px",
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>Free SSL (Let's Encrypt)</p>
            <p>
              <b>{free_ssl}</b>
            </p>
          </Stack>

          {/* 5th pair */}
          <Stack
            sx={{
              padding: 1,
              height: "25px",
              marginTop: 1,
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>Free Cloudflare CDN</p>
            <p>
              <b>{free_cloud_flare_cdn}</b>
            </p>
          </Stack>

          <Stack
            sx={{
              marginTop: 1,
              padding: 1,
              backgroundColor: "#f5f5f0",
              height: "25px",
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>ePanel</p>
            <p>
              <b>{epanel}</b>
            </p>
          </Stack>

          {/* 6th pair */}
          <Stack
            sx={{
              padding: 1,
              height: "25px",
              marginTop: 1,
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>DDoS Protection</p>
            <p>
              <b>{ddos_protection}</b>
            </p>
          </Stack>

          <Stack
            sx={{
              marginTop: 1,
              padding: 1,
              backgroundColor: "#f5f5f0",
              height: "25px",
            }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <p>Website Builder</p>
            <p>
              <b>{website_builder}</b>
            </p>
          </Stack>
        </div>
        {/* Order Button */}
        <DomainDialog
          open={open}
          setOpen={setOpen}
          setDomainName={setDomainName}
          planDetails={{
            "Plan Start Date": "21/01/2020",
            "Plan End Date": "21/04/2021",
            "User ID": getUser().username,
            "Plan Name": title,
            "Server IP": "172.16.0.84",
            "FTP Username": "ftpuser",
            "FTP Password": "ftpuser",
          }}
        />
        <Button
          sx={{
            fontWeight: "bold",
            width: "60%",
            marginTop: 4,
            backgroundColor: icon_color,
            color: "white",
            ":hover": {
              backgroundColor: icon_color,
              color: "white",
            },
          }}
          onClick={() => {
            handleOrderClick();
          }}
        >
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
}
