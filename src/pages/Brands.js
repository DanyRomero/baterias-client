import * as React from "react";
import { TextField, Grid, Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState, useEffect } from "react";
import BrandsTable from "../components/BrandsTable";
import BrandForm from "../components/BrandForm";
import { API_URL } from "../utils/consts";
import ImportButton from "../components/ImportButton";

export default function Brands() {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [filter, setFilter] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const handleInput = (e) => {
    setFilter(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBrands = () => {
    axios
      .get(`${API_URL}/marcas`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBrands();
  }, []);

  const handleNewBrand = (formData) => {
    return axios.post(`${API_URL}/marcas`, formData).then((response) => {
      getBrands();
      setOpen(false);
    });
  };

  const handleEditBrand = (formData) => {
    return axios
      .put(`${API_URL}/marcas/${editingBrand._id}`, formData)
      .then((response) => {
        getBrands();
        setOpenEdit(false);
      });
  };

  const editBrand = (brand) => {
    setEditingBrand(brand);
    setOpenEdit(true);
  };

  const handleCatalogImport = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("csv", file);
    setIsImporting(true);
    axios.post(`${API_URL}/importar-catalogo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response)=>{getBrands()})
    .catch((error) => console.log(error))
    .finally(()=>{
      setIsImporting(false);
      e.target.value = null
    })
  };

  return (
    <Container>
      <Typography my={4} variant="h4" color="text.secondary">
        <strong>Listado de marcas</strong>
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
            <AddIcon /> Marca
          </Button>
          <ImportButton
            onSubmit={handleCatalogImport}
            isImporting={isImporting}
          />
          {open && (
            <BrandForm
              open={open}
              onClose={handleClose}
              onSubmit={handleNewBrand}
              submitText="Agregar"
            />
          )}
        </Grid>
      </Grid>
      <BrandsTable
        brands={brands}
        getBrands={getBrands}
        onEdit={editBrand}
        filter={filter}
      />
      {openEdit && (
        <BrandForm
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={handleEditBrand}
          submitText="Editar"
          brand={editingBrand}
        />
      )}
    </Container>
  );
}
