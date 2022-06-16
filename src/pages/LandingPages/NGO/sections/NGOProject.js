import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AddCircle from "@mui/icons-material/AddCircle";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { RadioGroup, Radio, FormControl, FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export default function NGOProject() {
  const [showForm, setShow] = useState(false);
  const [operationType, setOperationType] = useState(1);
  var allProjects = [];
  const toggleForm = (value, id) => {
    if (value) {
      if (id > 0) {
        let projectObj = allProjects.find((x) => x.id == id);

        setIdOnFocus(id);
        if (projectObj.name === null) projectObj.name = "";
        if (projectObj.about === null) projectObj.about = "";
        if (projectObj.provinceId === null) projectObj.provinceId = 0;
        if (projectObj.cityId === null) projectObj.cityId = 0;
        if (projectObj.categoryId === null) projectObj.categoryId = 0;
        if (projectObj.parentProjectId === null) projectObj.parentProjectId = 0;

        setName(projectObj.name);
        setAbout(projectObj.about);
        setProvince(projectObj.provinceId);
        setCity(projectObj.cityId);
        setCategory(projectObj.categoryId);
        setParentProject(projectObj.parentProjectId);

        setOperationType(2);
      } else if (id == 0) {
        setName("");
        setAbout("");
        setProvince(0);
        setCity(0);
        setCategory(0);
        setParentProject(0);

        setOperationType(1);
      }
    } else {
      setName("");
      setAbout("");
      setProvince(0);
      setCity(0);
      setCategory(0);
      setParentProject(0);
    }
    setShow(value);
  };

  const [idOnFocus, setIdOnFocus] = useState(0);

  const [name, setName] = useState("");
  const handleNameChange = (e) => setName(e.target.value);

  const [about, setAbout] = useState("");
  const handleAboutChange = (e) => setAbout(e.target.value);

  const [province, setProvince] = useState(0);
  const handleProvinceChange = (e) => setProvince(e.target.value);

  const [city, setCity] = useState(0);
  const handleCityChange = (e) => setCity(e.target.value);

  const [categoryId, setCategory] = useState(0);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const [parentProjectId, setParentProject] = useState(0);
  const handleParentProjectChange = (e) => setParentProject(e.target.value);

  const [checked, setChecked] = useState(true);
  const handleChecked = () => setChecked(!checked);

  const theme = useTheme();

  const [rowss, setRowData] = useState([]);

  function selectProps(...props) {
    return function (obj) {
      const newObj = {};
      props.forEach((name) => {
        newObj[name] = obj[name];
      });

      return newObj;
    };
  }
  function loadProfile() {
    let entityId = window.localStorage.getItem("entityId");

    fetch("/api/Project/GetAllProjectsByNGO?ngoId=" + entityId, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if (response.status === "1") {
          allProjects = response.otherInformation;
          setRowData(
            allProjects
            //allProjects.map(selectProps("id", "name", "cnic", "gender", "contactNo", "email"))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("on load");
    loadProfile();
  }, []);

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
      { field: "about", headerName: "About", width: 170 },
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
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => toggleForm(true, params.row.id)}
          />,
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
      parentproject: "-",
    },
    {
      id: 2,
      name: "Project 2",
      about: "Plant Neem trees on Main road",
      parentproject: "Project 1",
    },
    {
      id: 3,
      name: "Project 3",
      about: "Blood donations",
      parentproject: "-",
    },
    {
      id: 4,
      name: "Project 4",
      about: "Blood donation for thallesemia",
      parentproject: "Project 3",
    },
    {
      id: 5,
      name: "Project 5",
      about: "Cholistan food donations",
      parentproject: "-",
    },
  ];

  const submitForm = () => {
    let entityId = window.localStorage.getItem("entityId");
    let api = "";
    let method = "";

    if (operationType == 1) {
      api = "AddProject";
      method = "POST";
    } else if (operationType == 2) {
      api = "UpdateProject";
      method = "PUT";
    }

    fetch("/api/Project/" + api, {
      method: method,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        id: idOnFocus,
        ngoId: entityId,
        name,
        about,
        provinceId: province,
        cityId: city,
        categoryId,
        parentProjectId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        loadProfile();
        toggleForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <MKBox component="section" py={12}>
        <Container>
          <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
            <MKTypography variant="h3" mb={1}>
              Projects
            </MKTypography>
          </Grid>
          <Grid container item justifyContent="right" xs={10} lg={7} mx="auto" textAlign="center">
            <MKButton variant="gradient" color="light" mb={1} onClick={() => toggleForm(true, 0)}>
              Add New
              <GridActionsCellItem icon={<AddCircle />} label="Add" />
            </MKButton>
          </Grid>
          <Grid container item xs={12} lg={12} sx={{ mx: "auto" }}>
            <MKBox width="100%" component="form" method="post" autocomplete="off">
              <MKBox p={3} justifyContent="center">
                <Grid container justifyContent="center" spacing={3}>
                  <Grid item xs={6}>
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
        {showForm && (
          <Container>
            <Grid container item justifyContent="right" xs={10} lg={7} mx="auto" textAlign="center">
              <MKButton variant="gradient" color="light" mb={1}>
                <GridActionsCellItem
                  icon={<CloseSharpIcon />}
                  label="Close"
                  onClick={() => toggleForm(false)}
                />
              </MKButton>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              xs={10}
              lg={7}
              mx="auto"
              textAlign="center"
            >
              <MKTypography variant="h3" mb={1}>
                Project Information
              </MKTypography>
            </Grid>
            <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
              <MKBox width="100%" component="form" method="post" autocomplete="off">
                <MKBox p={3} justifyContent="center">
                  <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={8}>
                      <MKInput
                        variant="standard"
                        label="Full Name"
                        value={name}
                        onChange={handleNameChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" spacing={3} mt={2}>
                    <Grid item xs={8}>
                      <MKInput
                        variant="standard"
                        label="About project"
                        value={about}
                        onChange={handleAboutChange}
                        InputLabelProps={{ shrink: true }}
                        multiline
                        rows={3}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" spacing={3} mt={2}>
                    <Grid item xs={8} mx={2}>
                      <MKTypography variant="body2" fontWeight="bold" mb={1}>
                        Province
                      </MKTypography>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={province}
                          onChange={handleProvinceChange}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label={<MKTypography variant="button">Punjab</MKTypography>}
                          />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label={<MKTypography variant="button">Sindh</MKTypography>}
                          />
                          <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label={<MKTypography variant="button">Balochistan</MKTypography>}
                          />
                          <FormControlLabel
                            value={4}
                            control={<Radio />}
                            label={<MKTypography variant="button">KPK</MKTypography>}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" spacing={3} mt={2}>
                    <Grid item xs={8} mx={2}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>City</InputLabel>
                        <Select
                          value={city}
                          sx={{ padding: 1.5 }}
                          label="City"
                          autoWidth
                          onChange={handleCityChange}
                        >
                          <MenuItem value="">
                            <em>Other</em>
                          </MenuItem>
                          <MenuItem value={1}>Karachi</MenuItem>
                          <MenuItem value={2}>Islamabad</MenuItem>
                          <MenuItem value={3}>Quetta</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" spacing={3} mt={2}>
                    <Grid item xs={8} mx={2}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={categoryId}
                          sx={{ padding: 1.8 }}
                          label="Category"
                          autoWidth
                          onChange={handleCategoryChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>Category 1</MenuItem>
                          <MenuItem value={2}>Category 2</MenuItem>
                          <MenuItem value={3}>Category 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" spacing={3} mt={2}>
                    <Grid item xs={8} mx={2}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Parent Project</InputLabel>
                        <Select
                          value={parentProjectId}
                          sx={{ padding: 1.8 }}
                          label="Parent Project"
                          autoWidth
                          onChange={handleParentProjectChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>Project 1</MenuItem>
                          <MenuItem value={2}>Project 2</MenuItem>
                          <MenuItem value={3}>Project 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </MKBox>
              </MKBox>
            </Grid>
            <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
              <MKBox width="100%" component="form" method="post" autocomplete="off">
                <MKBox p={3} justifyContent="center">
                  <Grid container justifyContent="center" spacing={3} mt={2}>
                    <Grid item xs={6} alignItems="center" ml={-1}>
                      <Switch checked={checked} onChange={handleChecked} />
                      <MKTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        ml={-1}
                        sx={{ cursor: "pointer", userSelect: "none" }}
                        onClick={handleChecked}
                      >
                        &nbsp;&nbsp;I agree the&nbsp;
                      </MKTypography>
                      <MKTypography
                        component="a"
                        href="#"
                        variant="button"
                        fontWeight="regular"
                        color="dark"
                      >
                        Terms and Conditions
                      </MKTypography>
                    </Grid>
                  </Grid>
                  <Grid container item justifyContent="center" xs={12} my={2}>
                    <Grid container item justifyContent="center" xs={3} my={2}>
                      <MKButton
                        type="button"
                        onClick={submitForm}
                        variant="gradient"
                        color="dark"
                        fullWidth
                      >
                        Submit
                      </MKButton>
                    </Grid>
                  </Grid>
                </MKBox>
              </MKBox>
            </Grid>
            `
          </Container>
        )}
      </MKBox>
    </>
  );
}
