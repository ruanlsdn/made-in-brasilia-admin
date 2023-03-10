import { CircularProgress, TextField } from "@mui/material";
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
  const [cityDto, setCityDto] = useState<iCreateCityDto | null>(null);
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

  const handleSearchClick = async () => {
    setIsLoading(true);
    try {
      const response = await getCityIaTextsRequest(cityName);
      setCityDto({ ...response.data, name: cityName });
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsSnackbarOpen(true);
      setSnackbarMessage(axiosError.message);
      setSnackbarSeverity("error");
    }
    setIsLoading(false);
  };

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
    setCityDto(null);
    setCityImages(null);
    setRefreshCityData((prev) => !prev);
    setIsModalActive(false);
  };

  return (
    <div className="create-cities-content">
      <div className="create-cities-header">
        <h1>Adicionar cidade</h1>
        <p>
          Este cadastro ?? automatizado por intelig??ncia artificial. Preencha o
          nome da cidade, aguarde o resultado e confirme para salvar ou tente
          novamente para gerar um novo texto.
        </p>
      </div>
      <input type="file" onChange={handleImageUpload} />
      <div className="create-cities-form">
        <TextField
          className="create-cities-form-input"
          id="outlined-basic"
          label="Nome da cidade"
          placeholder="Informe o nome da cidade..."
          variant="outlined"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button className="gradient-bg-colorful" onClick={handleSearchClick}>
          <BsSearch size={30} />
        </button>
      </div>

      <div className="create-cities-ia-response">
        <CircularProgress
          style={{ display: `${isLoading ? "flex" : "none"}` }}
        />
        <h3>{cityDto?.title}</h3>
        <p>{cityDto?.text}</p>
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
