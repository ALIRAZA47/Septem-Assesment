import PlanCard from "../components/PlanCard";
import * as React from "react";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import BentoIcon from "@mui/icons-material/Bento";

export default function ResponsiveStack() {
  return (
    <div style={{ padding: 8 }}>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        spacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
      >
        <PlanCard
          title="Trim"
          icon={<BentoIcon />}
          icon_color="#1C8EF9"
          price="$2.70"
          sdd_storage="10 GB"
          data_teambox="100 GB"
          web="Unlimited"
          free_domain={<CloseIcon />}
          vCPU_cores="1"
          vRAM="1 GB"
          wordpress_optimized={<DoneIcon />}
          free_ssl={<DoneIcon />}
          free_cloud_flare_cdn={<DoneIcon />}
          epanel={<DoneIcon />}
          ddos_protection={<DoneIcon />}
          website_builder={<DoneIcon />}
        />
        {/* Card 2 */}
        <PlanCard
          title="Geek"
          icon={<BentoIcon />}
          icon_color="#EC6F23"
          price="$4.95"
          sdd_storage="25 GB"
          data_teambox="Unemmited"
          web="10"
          free_domain={<DoneIcon />}
          vCPU_cores="1"
          vRAM="1 GB"
          wordpress_optimized={<DoneIcon />}
          free_ssl={<DoneIcon />}
          free_cloud_flare_cdn={<DoneIcon />}
          epanel={<DoneIcon />}
          ddos_protection={<DoneIcon />}
          website_builder={<DoneIcon />}
        />
        {/* Card 3 */}
        <PlanCard
          title="Ultra"
          icon={<BentoIcon />}
          icon_color="#1C8EF9"
          price="$8.55"
          sdd_storage="50 GB"
          data_teambox="Unemmited"
          web="Unlimited"
          free_domain={<DoneIcon />}
          vCPU_cores="3"
          vRAM="2 GB"
          wordpress_optimized={<DoneIcon />}
          free_ssl={<DoneIcon />}
          free_cloud_flare_cdn={<DoneIcon />}
          epanel={<DoneIcon />}
          ddos_protection={<DoneIcon />}
          website_builder={<DoneIcon />}
        />
      </Stack>
    </div>
  );
}
