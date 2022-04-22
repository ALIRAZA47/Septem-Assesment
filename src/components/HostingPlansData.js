import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import { db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuth } from "../AuthContext";

export default function ToolbarGrid() {
  const { navigateTo, getUser, isUser } = useAuth();
  if (!isUser()) {
    navigateTo("/welcome");
  }
  // custom toolbar
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  // data setup
  const data = {};
  const columns = [
    { field: "id", headerName: "ID", width: 50, type: "number" },
    {
      field: "domain",
      headerName: "Domain Name",
      type: "string",
      width: 200,
    },
    {
      field: "planName",
      headerName: "Plan Name",
      type: "string",
      width: 150,
    },
    {
      field: "serverIP",
      headerName: "Server IP",
      type: "string",
      width: 150,
    },
    {
      field: "userId",
      headerName: "User ID",
      type: "string",
      width: 150,
    },
    {
      field: "ftUser",
      headerName: "FTP User",
      type: "string",
      width: 150,
    },
    {
      field: "ftPass",
      headerName: "FTP Password",
      type: "string",
      width: 150,
    },
    {
      field: "planEndDate",
      headerName: "Plan End Date",
      type: "string",
      width: 150,
    },
    {
      field: "planStartDate",
      headerName: "Plan Start Date",
      type: "string",
      width: 150,
    },
  ];

  const [rows, setRows] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);

  const hosting_plans = [];
  React.useEffect(() => {
    // fetch data from firestore
    const q = query(
      collection(db, "hosting_plans"),
      where("User ID", "==", getUser().username)
    );

    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          navigateTo("/plans");
          setRows([]);
          setLoadingData(false);
        } else {
          //   console.log(querySnapshot.docs[0].data());
          for (let i = 0; i < querySnapshot.docs.length; i++) {
            hosting_plans.push({
              id: i,
              domain: querySnapshot.docs[i].data()["Domain Name"],
              planName: querySnapshot.docs[i].data()["Plan Name"],
              serverIP: querySnapshot.docs[i].data()["Server IP"],
              userId: querySnapshot.docs[i].data()["User ID"],
              ftUser: querySnapshot.docs[i].data()["FTP Username"],
              ftPass: querySnapshot.docs[i].data()["FTP Password"],
              planEndDate: querySnapshot.docs[i].data()["Plan End Date"],
              planStartDate: querySnapshot.docs[i].data()["Plan Start Date"],
            });
          }

          setRows(hosting_plans);
          setLoadingData(false);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  data.columns = columns;
  data.rows = rows;
  return (
    <div
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        columns={data.columns}
        rows={data.rows}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
        }}
        hideFooterPagination
        hideFooter
        loading={loadingData}
        rowsPerPageOptions={[data.rows.length]}
        density="comfortable"
      />
    </div>
  );
}
