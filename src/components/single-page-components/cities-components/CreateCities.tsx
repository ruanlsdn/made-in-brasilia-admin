import { CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { BsCheck2, BsSearch } from "react-icons/bs";
import { useDataControlContext } from "../../../contexts/DataControlContext";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import iCreateCityDto from "../../../dtos/iCreateCityDto";
import {
  createCityRequest,
  getCityIaTextsRequest,
} from "../../../services/api";
import "./create-cities.css";

const CreateCities = () => {
  const { setRefreshCityData } = useDataControlContext();
  const { setIsModalActive } = useApplicationControlContext();
  const [cityName, setCityName] = useState("");
  const [cityDto, setCityDto] = useState<iCreateCityDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchClick = async () => {
    setIsLoading(true);
    try {
      const response = await getCityIaTextsRequest(cityName);
      setCityDto({ ...response.data, name: cityName });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    try {
      await createCityRequest(cityDto);
    } catch (err) {
      console.log(err);
    }
    setCityDto(null);
    setRefreshCityData((prev) => !prev);
    setIsModalActive(false);
  };

  return (
    <div className="create-cities-content">
      <div className="create-cities-header">
        <h1>Adicionar cidade</h1>
        <p>
          Este cadastro é automatizado por inteligência artificial. Preencha o
          formulário, aguarde o resultado e confirme para salvar ou tente
          novamente para gerar um novo texto.
        </p>
      </div>
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
