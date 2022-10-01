import { TextField, Grid, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/Loading";
import { API_URL } from "../utils/consts";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ModelsTable from "../components/ModelsTable";
import ModelForm from "../components/ModelForm";

const Models = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingModel, setEditingModel] = useState(null);
  const [filter, setFilter] = useState("");

  const handleInput = (e) => {
    setFilter(e.target.value);
  };

  const getModels = () => {
    axios
      .get(`${API_URL}/modelos`)
      .then((response) => {
        console.log(response);
        setModels(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/marcas/${id}`)
      .then((response) => {
        console.log(response.data);
        setBrand(response.data);
        getModels();
      })
      .catch((error) => console.log(error));
  }, []);

  if (!brand) {
    return <LoadingComponent />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewModel = (formData) => {
    return axios.post(`${API_URL}/modelos`, formData).then((response) => {
      getModels();
      setOpen(false);
    });
  };

  const handleEditModel = (formData) => {
    return axios
      .put(`${API_URL}/modelos/${editingModel._id}`, formData)
      .then((response) => {
        getModels();
        setOpenEdit(false);
      });
  };

  const editModel = (model) => {
    setEditingModel(model);
    setOpenEdit(true);
  };

  return (
    <Container>
      <Typography my={4} variant="h4">
        <strong>Detalle de la marca {brand?.name}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={9} xs>
          <form>
            <Grid container>
              <Grid item xs>
                <TextField
                  size="small"
                  label="Buscar por Nombre"
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
            <AddIcon /> Modelo
          </Button>
          {open && (
            <ModelForm
              open={open}
              onClose={handleClose}
              onSubmit={handleNewModel}
              submitText="Agregar"
              brandId={brand._id}
            />
          )}
        </Grid>
      </Grid>
      <ModelsTable
        models={models}
        getModels={getModels}
        onEdit={editModel}
        filter={filter}
      />
      {openEdit && (
        <ModelForm
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={handleEditModel}
          submitText="Editar"
          model={editingModel}
          brandId={brand._id}
        />
      )}
    </Container>
  );
};
export default Models;
