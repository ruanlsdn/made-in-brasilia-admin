import { CircularProgress, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { BsCheck2, BsSearch } from "react-icons/bs";
import { useDataControllContext } from "../../contexts/DataControllContext";
import { useStateContext } from "../../contexts/StateContext";
import iCreateCityDto from "../../dtos/iCreateCityDto";
import { createCityRequest, getCityIaTextsRequest } from "../../services/api";
import "./modal.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = () => {
  const { setRefreshCityData } = useDataControllContext();
  const { isModalActive, setIsModalActive } = useStateContext();
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
    <div>
      <Modal
        open={isModalActive}
        onClose={() => {
          setIsModalActive(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-content">
            <div className="modal-header">
              <h1>Adicionar cidade</h1>
              <p>
                Este cadastro é automatizado por inteligência artificial.
                Preencha o formulário, aguarde o resultado e confirme para
                salvar ou tente novamente para gerar um novo texto.
              </p>
            </div>
            <div className="modal-form">
              <TextField
                className="modal-form-input"
                id="outlined-basic"
                label="Nome da cidade"
                placeholder="Informe o nome da cidade..."
                variant="outlined"
                onChange={(e) => setCityName(e.target.value)}
              />
              <button
                className="gradient-bg-colorful"
                onClick={handleSearchClick}
              >
                <BsSearch size={30} />
              </button>
            </div>

            <div className="modal-ia-response">
              <CircularProgress
                style={{ display: `${isLoading ? "flex" : "none"}` }}
              />
              <h3>{cityDto?.title}</h3>
              <p>{cityDto?.text}</p>
            </div>
            <div className="modal-footer">
              <button onClick={handleSubmit}>
                <BsCheck2 size={30} />
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
