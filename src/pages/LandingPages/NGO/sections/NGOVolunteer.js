import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";

export default function NGOVolunteer() {
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
      { field: "cnic", headerName: "CNIC", width: 130 },
      { field: "contact", headerName: "Contact #", width: 130 },
      { field: "city", headerName: "City", width: 130 },
      { field: "province", headerName: "Province", width: 130 },
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
      name: "User 1",
      cnic: "42103115313",
      contact: "03123456987",
      city: "Karachi",
      province: "Sindh",
    },
    {
      id: 2,
      name: "User 2",
      cnic: "42103115313",
      contact: "03123456987",
      city: "Karachi",
      province: "Sindh",
    },
    {
      id: 3,
      name: "User 3",
      cnic: "42103115313",
      contact: "03123456987",
      city: "Lahore",
      province: "Punjab",
    },
    {
      id: 4,
      name: "User 4",
      cnic: "42103115313",
      contact: "03123456987",
      city: "Lahore",
      province: "Punjab",
    },
    {
      id: 5,
      name: "User 5",
      cnic: "42103115313",
      contact: "03123456987",
      city: "Quetta",
      province: "Balochistan",
    },
  ];
  return (
    <>
      <MKBox component="section" py={12}>
        <Container>
          <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
            <MKTypography variant="h3" mb={1}>
              Volunteers
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
