import { Grid, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import iUpdateCityDto from "../../../interfaces/iUpdateCityDto";
import { updateCityRequest } from "../../../services/api";
import "./update-cities.css";

const UpdateCities = () => {
  const { selectedCity, setRefreshCityData } = useDataControlContext();
  const {
    setIsModalActive,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
  } = useApplicationControlContext();
  const [newCityName, setNewCityName] = useState(selectedCity?.name);
  const [newCityTitle, setNewCityTitle] = useState(selectedCity?.title);
  const [newCityText, setNewCityText] = useState(selectedCity?.text);

  const handleSubmit = async () => {
    try {
      const dto: iUpdateCityDto = {
        name: newCityName,
        title: newCityTitle,
        text: newCityText,
      };

      const response = await updateCityRequest(selectedCity?.id, dto);
      setRefreshCityData((prev) => !prev);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }

    setIsModalActive(false);
  };

  return (
    <div className="update-cities-content">
      <div className="update-cities-header">
        <h1>Atualizar bairro</h1>
        <p>Edite os campos que deseja atualizar</p>
      </div>
      <div className="update-cities-form">
        <Grid container spacing={2}>
          <Grid item xs={4.5}>
            <TextField
              className="form-text-input"
              disabled
              id="outlined-basic"
              variant="outlined"
              label="ID"
              value={selectedCity?.id}
            />
          </Grid>
          <Grid item xs={7.5}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              variant="outlined"
              label="Nome"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              label="Título"
              variant="outlined"
              value={newCityTitle}
              onChange={(e) => setNewCityTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              variant="outlined"
              label="Texto"
              value={newCityText}
              onChange={(e) => setNewCityText(e.target.value)}
            />
          </Grid>
        </Grid>
        <button onClick={handleSubmit}>
          <BsCheck2 size={40} />
        </button>
      </div>
    </div>
  );
};

export default UpdateCities;
