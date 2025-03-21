import { CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { BsCheck2, BsSearch } from "react-icons/bs";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import iCreateCityDto from "../../../interfaces/iCreateCityDto";
import {
  createCityRequest,
  getCityIaTextsRequest,
  uploadCityImagesRequest,
} from "../../../services/api";
import "./create-cities.css";
import { AxiosError } from "axios";

const CreateCities = () => {
  const { setRefreshCityData } = useDataControlContext();
  const {
    setIsModalActive,
    setIsSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
  } = useApplicationControlContext();
  const [cityName, setCityName] = useState("");
  const [cityTitle, setCityTitle] = useState("");
  const [cityHistory, setCityHistory] = useState("");
  const [cityImages, setCityImages] = useState<FormData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const array = e.target.files;
    let images: FormData[] = [];

    for (let index = 0; index < array!.length; index++) {
      const formData = new FormData();
      formData.append("file", array![index]);
      images.push(formData);
    }

    setCityImages(images);
  };

  // const handleSearchClick = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await getCityIaTextsRequest(cityName);
  //     setCityDto({ ...response.data, name: cityName });
  //   } catch (error) {
  //     const axiosError = error as AxiosError;
  //     setIsSnackbarOpen(true);
  //     setSnackbarMessage(axiosError.message);
  //     setSnackbarSeverity("error");
  //   }
  //   setIsLoading(false);
  // };

  const upload = async (form: FormData) => {
    try {
      await uploadCityImagesRequest(form);
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
  };

  const handleSubmit = async () => {
    const cityDto: iCreateCityDto = {
      name: cityName,
      title: cityTitle,
      text: cityHistory,
    };

    try {
      const response = await createCityRequest(cityDto!);

      if (response.status == 201) {
        cityImages?.map((form) => {
          form.append("cityId", response.data.id);
          upload(form);
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
    setCityImages(null);
    setRefreshCityData((prev) => !prev);
    setIsModalActive(false);
  };

  return (
    <div className="create-cities-content">
      <div className="create-cities-header">
        <h1>Adicionar bairro</h1>
        <p>Preencha os campos abaixo com as informações da bairro</p>
      </div>
      <div className="create-cities-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <span>Local</span>
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleImageUpload} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              label="Nome"
              placeholder="Informe o nome da bairro..."
              variant="outlined"
              onChange={(e) => setCityName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <span>Glossário</span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              label="Título"
              placeholder="Informe um título para a bairro..."
              variant="outlined"
              onChange={(e) => setCityTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="form-text-input"
              id="outlined-basic"
              label="História"
              placeholder="Informe uma breve história da bairro..."
              variant="outlined"
              onChange={(e) => setCityHistory(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
      <div className="create-cities-footer">
        <button onClick={handleSubmit}>
          <BsCheck2 size={30} />
        </button>
      </div>
    </div>
  );
};

export default CreateCities;
