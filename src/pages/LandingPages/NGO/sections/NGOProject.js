import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";

export default function NGOProject() {
  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {});
    },
    []
  );

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 130 },
      { field: "about", headerName: "About", width: 130 },
      { field: "city", headerName: "City", width: 130 },
      { field: "province", headerName: "Province", width: 130 },
      { field: "parentproject", headerName: "Parent Project", width: 130 },
      // {
      //   field: "age",
      //   headerName: "Age",
      //   type: "number",
      //   width: 90,
      // },
      // {
      //   field: "fullName",
      //   headerName: "Full name",
      //   description: "This column has a value getter and is not sortable.",
      //   sortable: false,
      //   width: 160,
      //   valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      // },
      {
        field: "actions",
        headerName: "Edit",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={deleteUser(params.id)} />,
        ],
      },
    ],
    [deleteUser]
  );

  const rows = [
    {
      id: 1,
      name: "Project 1",
      about: "Plantation drive",
      city: "Karachi",
      province: "Sindh",
      parentproject: "-",
    },
    {
      id: 2,
      name: "Project 2",
      about: "Plant Neem trees on Main road",
      city: "Karachi",
      province: "Sindh",
      parentproject: "Project 1",
    },
    {
      id: 3,
      name: "Project 3",
      about: "Blood donations",
      city: "Lahore",
      province: "Punjab",
      parentproject: "-",
    },
    {
      id: 4,
      name: "Project 4",
      about: "Blood donation for thallesemia",
      city: "Lahore",
      province: "Punjab",
      parentproject: "Project 3",
    },
    {
      id: 5,
      name: "Project 5",
      about: "Cholistan food donations",
      city: "Quetta",
      province: "Balochistan",
      parentproject: "-",
    },
  ];
  return (
    <>
      <MKBox component="section" py={12}>
        <Container>
          <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
            <MKTypography variant="h3" mb={1}>
              Projects
            </MKTypography>
          </Grid>
          <Grid container item xs={12} lg={12} sx={{ mx: "auto" }}>
            <MKBox width="100%" component="form" method="post" autocomplete="off">
              <MKBox p={3} justifyContent="center">
                <Grid container justifyContent="center" spacing={3}>
                  <Grid item xs={8}>
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                      />
                    </div>
                  </Grid>
                </Grid>
              </MKBox>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}
