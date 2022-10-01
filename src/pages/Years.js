import { TextField, Grid, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/Loading";
import { API_URL } from "../utils/consts";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import YearsTable from "../components/YearsTable";
import YearsForm from "../components/YearsForm";

const Years = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingYear, setEditingYear] = useState(null);
  const [filter, setFilter] = useState("");

  const handleInput = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/modelos/${id}`)
      .then((response) => {
        setModel(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!model) {
    return <LoadingComponent />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewYear = (formData) => {
    return axios
      .post(`${API_URL}/modelos/${model._id}/rangos`, formData)
      .then((response) => {
        setModel(response.data);
        setOpen(false);
      });
  };

  const handleEditYear = (formData) => {
    return axios
      .put(
        `${API_URL}/modelos/${model._id}/rangos/${editingYear._id}`,
        formData
      )
      .then((response) => {
        setModel(response.data);
        setOpenEdit(false);
      });
  };

  const editYear = (year) => {
    setEditingYear(year);
    setOpenEdit(true);
  };

  return (
    <Container>
      <Typography mt={4} variant="body1">
        <strong>Detalle del modelo {model?.name}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={9} xs>
          <form>
            <Grid container>
              <Grid item xs>
                <TextField
                  size="small"
                  label="Buscar por Año"
                  value={filter}
                  fullWidth
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs="auto">
                <Button type="submit">
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs="auto">
          <Button variant="outlined" onClick={handleClickOpen}>
            <AddIcon /> Año
          </Button>
          {open && (
            <YearsForm
              open={open}
              onClose={handleClose}
              onSubmit={handleNewYear}
              submitText="Agregar"
            />
          )}
        </Grid>
      </Grid>
      <YearsTable
        years={model.years}
        setModel={setModel}
        onEdit={editYear}
        filter={filter}
        modelId={model._id}
      />
      {openEdit && (
        <YearsForm
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={handleEditYear}
          submitText="Editar"
          year={editingYear}
        />
      )}
    </Container>
  );
};
export default Years;
